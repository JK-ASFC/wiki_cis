<?php
/*
 * CIS Wiki — réglages d'envoi des e-mails du formulaire « Votre avis ».
 *
 * 1. Copiez ce fichier HORS du dossier web :
 *        sudo mkdir -p /etc/wiki-cis
 *        sudo cp config/mail.example.php /etc/wiki-cis/mail.php
 * 2. Remplissez les valeurs ci-dessous (serveur SMTP, compte d'envoi, mot de passe).
 * 3. Protégez le fichier (le mot de passe ne doit être lisible que par PHP) :
 *        sudo chown root:www-data /etc/wiki-cis/mail.php
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
    'site_url' => 'https://cis.worldskills-france.org/wiki',

    'smtp' => [
        // Exemples :
        //   Microsoft 365 / Outlook : smtp.office365.com, port 587, secure 'tls'
        //   Gmail / Google Workspace : smtp.gmail.com, port 587, secure 'tls' (mot de passe d'application)
        //   Relais local (Postfix sur le serveur) : 127.0.0.1, port 25, secure 'none', sans identifiant
        'host' => 'smtp.office365.com',
        'port' => 587,
        'secure' => 'tls',          // 'tls' (STARTTLS, port 587), 'ssl' (port 465) ou 'none'
        'username' => 'wiki-cis@cofom.org',
        'password' => 'METTRE_LE_MOT_DE_PASSE_ICI',
        'timeout' => 15,
    ],

    // Protection contre les abus : nombre maximum d'envois par adresse IP et par heure.
    'rate_limit_per_hour' => 10,

    // Facultatif : chemin de PHPMailer s'il n'est pas installé avec le paquet Debian
    // (par défaut : /usr/share/php/libphp-phpmailer/autoload.php).
    // 'phpmailer_autoload' => '/var/www/wiki-cis/vendor/autoload.php',
];
