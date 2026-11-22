<?php
/*
 * CIS Wiki — réception du formulaire « Votre avis » et envoi par e-mail (SMTP).
 *
 * Requiert : PHP 8.2+ et PHPMailer (Debian 12 : apt install libphp-phpmailer).
 * Réglages : fichier /etc/wiki-cis/mail.php (modèle : config/mail.example.php).
 *
 * Entrée  : POST JSON {type, page, pageTitle, message, name, email, lang, website}
 * Sortie  : JSON {ok: true} ou {ok: false, error: "code"}
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function reply(int $status, array $body): never
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    reply(405, ['ok' => false, 'error' => 'method']);
}

// ---- Réglages ------------------------------------------------------------
$configFiles = [getenv('WIKI_CIS_MAIL_CONFIG') ?: '', '/etc/wiki-cis/mail.php', __DIR__ . '/../config/mail.php'];
$config = null;
foreach ($configFiles as $f) {
    if ($f !== '' && is_readable($f)) { $config = require $f; break; }
}
if (!is_array($config) || empty($config['to']) || empty($config['smtp']['host'])) {
    error_log('wiki-cis feedback: fichier de configuration mail introuvable ou incomplet');
    reply(500, ['ok' => false, 'error' => 'config']);
}

// ---- Requête venant bien du wiki ------------------------------------------
// Un formulaire HTML d'un autre site ne peut pas envoyer de JSON sans autorisation du navigateur :
// exiger ce type bloque les envois forgés depuis d'autres sites (CSRF).
if (stripos((string) ($_SERVER['CONTENT_TYPE'] ?? ''), 'application/json') !== 0) {
    reply(415, ['ok' => false, 'error' => 'format']);
}
// Si des origines sont déclarées, un navigateur venant d'un autre site est refusé.
$origins = array_map(fn ($o) => rtrim((string) $o, '/'), (array) ($config['allowed_origins'] ?? []));
$origin = rtrim((string) ($_SERVER['HTTP_ORIGIN'] ?? ''), '/');
if ($origins && $origin !== '' && !in_array($origin, $origins, true)) {
    reply(403, ['ok' => false, 'error' => 'origin']);
}

// ---- Lecture et contrôle des données -------------------------------------
$raw = file_get_contents('php://input', false, null, 0, 20000);
$in = json_decode($raw ?: '', true);
if (!is_array($in)) reply(400, ['ok' => false, 'error' => 'format']);

// Piège à robots : ce champ est invisible pour les humains.
if (!empty($in['website'])) reply(200, ['ok' => true]);

function clean(mixed $v, int $max, bool $multiline = false): string
{
    $s = is_string($v) ? $v : '';
    $s = str_replace("\0", '', $s);
    $s = $multiline ? preg_replace("/\r\n?/", "\n", $s) : preg_replace('/[\r\n\t]+/', ' ', $s);
    $s = trim((string) $s);
    return mb_substr($s, 0, $max);
}

$types = ['avis' => 'Avis', 'manque' => 'Information manquante', 'erreur' => 'Erreur dans le wiki', 'idee' => 'Suggestion'];
$type = array_key_exists($in['type'] ?? '', $types) ? $in['type'] : 'avis';
$message = clean($in['message'] ?? '', 5000, true);
$name = clean($in['name'] ?? '', 100);
$email = clean($in['email'] ?? '', 200);
$page = clean($in['page'] ?? '', 300);
$pageTitle = clean($in['pageTitle'] ?? '', 200);
$lang = ($in['lang'] ?? '') === 'en' ? 'en' : 'fr';

if (mb_strlen($message) < 5) reply(422, ['ok' => false, 'error' => 'message']);
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) reply(422, ['ok' => false, 'error' => 'email']);
// L'adresse de la page doit rester un chemin du wiki (pas de lien externe dans le mail).
if ($page !== '' && !preg_match('#^/?[A-Za-z0-9._/?=&%\-\#]*$#', $page)) $page = '';

// ---- Limite d'envois par adresse IP --------------------------------------
$limit = (int) ($config['rate_limit_per_hour'] ?? 10);
$ip = $_SERVER['REMOTE_ADDR'] ?? 'inconnue';
$dir = rtrim($config['rate_limit_dir'] ?? sys_get_temp_dir(), '/') . '/wiki-cis-feedback';
if (!is_dir($dir)) @mkdir($dir, 0700, true);
$stamp = $dir . '/' . hash('sha256', $ip) . '.json';
$now = time();
$hits = is_readable($stamp) ? (json_decode((string) file_get_contents($stamp), true) ?: []) : [];
$hits = array_values(array_filter($hits, fn ($t) => is_int($t) && $t > $now - 3600));
if (count($hits) >= $limit) reply(429, ['ok' => false, 'error' => 'rate']);
$hits[] = $now;
@file_put_contents($stamp, json_encode($hits), LOCK_EX);

// ---- Composition du message ----------------------------------------------
$base = rtrim((string) ($config['site_url'] ?? ''), '/');
$pageUrl = $page !== '' ? $base . '/' . ltrim($page, '/') : '(page non précisée)';
$subject = sprintf('[Wiki CIS] %s%s', $types[$type], $pageTitle !== '' ? ' – ' . $pageTitle : '');
$body = "Nouveau retour sur le wiki CIS\n"
    . "==============================\n\n"
    . "Type      : {$types[$type]}\n"
    . 'Page      : ' . ($pageTitle !== '' ? $pageTitle . ' — ' : '') . $pageUrl . "\n"
    . 'Langue    : ' . strtoupper($lang) . "\n"
    . 'Nom       : ' . ($name !== '' ? $name : '(non indiqué)') . "\n"
    . 'E-mail    : ' . ($email !== '' ? $email : '(non indiqué)') . "\n"
    . 'Date      : ' . date('d/m/Y H:i') . "\n\n"
    . "Message :\n---------\n{$message}\n";

// ---- Envoi SMTP (PHPMailer) ------------------------------------------------
$autoloads = [
    (string) ($config['phpmailer_autoload'] ?? ''),
    '/usr/share/php/libphp-phpmailer/autoload.php',   // paquet Debian libphp-phpmailer
    __DIR__ . '/../vendor/autoload.php',               // installation Composer
];
$loaded = false;
foreach ($autoloads as $a) {
    if ($a !== '' && is_readable($a)) { require_once $a; $loaded = true; break; }
}
if (!$loaded || !class_exists(\PHPMailer\PHPMailer\PHPMailer::class)) {
    error_log('wiki-cis feedback: PHPMailer introuvable (apt install libphp-phpmailer)');
    reply(500, ['ok' => false, 'error' => 'mailer']);
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as MailException;

$smtp = $config['smtp'];
$mail = new PHPMailer(true);
try {
    $mail->CharSet = 'UTF-8';
    $mail->isSMTP();
    $mail->Host = (string) $smtp['host'];
    $mail->Port = (int) ($smtp['port'] ?? 587);
    $secure = strtolower((string) ($smtp['secure'] ?? 'tls'));
    $mail->SMTPSecure = $secure === 'ssl' ? PHPMailer::ENCRYPTION_SMTPS : ($secure === 'tls' ? PHPMailer::ENCRYPTION_STARTTLS : '');
    $mail->SMTPAutoTLS = $secure !== 'none';
    $mail->SMTPAuth = ($smtp['username'] ?? '') !== '';
    if ($mail->SMTPAuth) {
        $mail->Username = (string) $smtp['username'];
        $mail->Password = (string) ($smtp['password'] ?? '');
    }
    $mail->Timeout = (int) ($smtp['timeout'] ?? 15);
    $mail->setFrom((string) ($config['from'] ?? $smtp['username']), (string) ($config['from_name'] ?? 'Wiki CIS'));
    foreach ((array) $config['to'] as $to) $mail->addAddress((string) $to);
    if ($email !== '') $mail->addReplyTo($email, $name);
    $mail->Subject = $subject;
    $mail->Body = $body;
    $mail->isHTML(false);
    $mail->send();
} catch (MailException $e) {
    error_log('wiki-cis feedback: envoi impossible : ' . $mail->ErrorInfo);
    reply(502, ['ok' => false, 'error' => 'send']);
}

reply(200, ['ok' => true]);
