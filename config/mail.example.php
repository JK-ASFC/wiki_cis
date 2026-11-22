<?php
/*
 * CIS Wiki — réglages d'envoi des e-mails du formulaire « Votre avis ».
 *
 * 1. Copiez ce fichier HORS du dossier web :
 *        sudo mkdir -p /etc/wiki-cis
 *        sudo cp config/mail.example.php /etc/wiki-cis/mail.php
 * 2. Remplissez les valeurs ci-dessous (serveur SMTP, compte d'envoi, mot de passe).
 * 3. Protégez le fichier (lisible seulement par le pool PHP du wiki) :
 *        sudo chown root:wikicis /etc/wiki-cis/mail.php
 *        sudo chmod 640 /etc/wiki-cis/mail.php
 *
 * Ne versionnez jamais le fichier rempli (config/mail.php est ignoré par Git).
 */
return [
    // Destinataire(s) des avis
    'to' => ['kjanlin-b@cofom.org'],

    // Expéditeur affiché. Doit être une adresse que le serveur SMTP autorise à envoyer
    // (en général le même compte que 'username' ci-dessous).
    'from' => 'wiki-cis@cofom.org',
    'from_name' => 'Wiki CIS',

    // Adresse publique du wiki : sert à construire le lien de la page dans le mail.
    'site_url' => 'https://cis.worldskills-france.org/wiki-cis',

    'smtp' => [
        // ---- Option A (RECOMMANDÉE) : AUCUN MOT DE PASSE --------------------------------------
        // Microsoft 365 « Direct Send » : le serveur dépose le mail directement dans la messagerie
        // de cofom.org (possible car le destinataire est dans le même domaine).
        // Adresse = l'enregistrement MX du domaine (commande : dig +short MX cofom.org).
        'host' => 'cofom-org.mail.protection.outlook.com',
        'port' => 25,
        'secure' => 'tls',          // STARTTLS : la connexion reste chiffrée
        'username' => '',           // vide = pas d'authentification, donc pas de mot de passe
        'password' => '',
        'timeout' => 15,

        // ---- Option B : compte d'envoi avec mot de passe ---------------------------------------
        // À utiliser seulement si l'option A est impossible (port 25 sortant bloqué, Direct Send
        // désactivé). Prenez un compte DÉDIÉ qui ne sert qu'à envoyer, pas une boîte personnelle.
        // 'host' => 'smtp.office365.com',
        // 'port' => 587,
        // 'secure' => 'tls',
        // 'username' => 'wiki-cis@cofom.org',
        // 'password' => 'METTRE_LE_MOT_DE_PASSE_ICI',
        // 'timeout' => 15,
    ],

    // Sites autorisés à envoyer le formulaire (adresse du wiki, sans chemin). Laisser vide pour ne pas filtrer.
    'allowed_origins' => ['https://cis.worldskills-france.org'],

    // Protection contre les abus : nombre maximum d'envois par adresse IP et par heure.
    'rate_limit_per_hour' => 10,

    // Facultatif : chemin de PHPMailer s'il n'est pas installé avec le paquet Debian
    // (par défaut : /usr/share/php/libphp-phpmailer/autoload.php).
    // 'phpmailer_autoload' => '/var/www/wiki-cis/vendor/autoload.php',
];
