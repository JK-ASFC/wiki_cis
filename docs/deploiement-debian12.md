# Installer le wiki CIS sur Debian 12 (avec le formulaire « Votre avis »)

Le wiki est un site **statique** (HTML, CSS, JavaScript). Un seul fichier tourne côté serveur :
`api/feedback.php`, qui envoie les avis par e-mail à **kjanlin-b@cofom.org** via un serveur SMTP.

| Élément | Rôle |
|---|---|
| nginx | sert les pages du wiki |
| php8.2-fpm | exécute `api/feedback.php` |
| libphp-phpmailer | bibliothèque d'envoi d'e-mails (paquet Debian) |
| `/etc/wiki-cis/mail.php` | **le fichier à remplir** : serveur SMTP, compte d'envoi, mot de passe, destinataire |

---

## 1. Installer les paquets

```bash
sudo apt update
sudo apt install -y nginx php8.2-fpm php8.2-mbstring libphp-phpmailer git
```

## 2. Copier le wiki

```bash
sudo git clone -b refonte-wiki-wkwhp4 https://github.com/JK-ASFC/wiki_cis.git /var/www/wiki-cis
sudo chown -R root:root /var/www/wiki-cis
sudo find /var/www/wiki-cis -type d -exec chmod 755 {} \;
sudo find /var/www/wiki-cis -type f -exec chmod 644 {} \;
```

> Le dépôt est privé : Git demandera un identifiant GitHub (ou utilisez une clé de déploiement).
> Pour les mises à jour : `cd /var/www/wiki-cis && sudo git pull`.

## 3. Remplir le fichier des e-mails

```bash
sudo mkdir -p /etc/wiki-cis
sudo cp /var/www/wiki-cis/config/mail.example.php /etc/wiki-cis/mail.php
sudo nano /etc/wiki-cis/mail.php
```

Renseignez :

| Clé | Exemple | Explication |
|---|---|---|
| `to` | `['kjanlin-b@cofom.org']` | destinataire(s) des avis (déjà rempli) |
| `from` | `wiki-cis@cofom.org` | expéditeur : un compte que le serveur SMTP autorise |
| `site_url` | `https://cis.worldskills-france.org/wiki` | adresse publique du wiki (lien de la page dans le mail) |
| `smtp.host` | `smtp.office365.com` | serveur SMTP |
| `smtp.port` / `smtp.secure` | `587` / `'tls'` | 587 + `tls` (STARTTLS), 465 + `ssl`, ou 25 + `none` (relais local) |
| `smtp.username` / `smtp.password` | compte d'envoi | identifiants du compte d'envoi |

Puis protégez-le (le mot de passe n'est lisible que par PHP) :

```bash
sudo chown root:www-data /etc/wiki-cis/mail.php
sudo chmod 640 /etc/wiki-cis/mail.php
```

> **Microsoft 365** : l'authentification SMTP (« SMTP AUTH ») doit être activée pour la boîte d'envoi
> dans le centre d'administration Exchange. **Gmail** : utilisez un mot de passe d'application.
> Le serveur doit pouvoir sortir sur le port 587 (pare-feu).

## 4. Activer le site nginx

```bash
sudo cp /var/www/wiki-cis/deploy/nginx-wiki-cis.conf /etc/nginx/sites-available/wiki-cis
sudo nano /etc/nginx/sites-available/wiki-cis      # remplacer wiki-cis.exemple.fr par le vrai domaine
sudo ln -s /etc/nginx/sites-available/wiki-cis /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

Cette configuration :
- sert le wiki depuis `/var/www/wiki-cis` ;
- n'exécute **que** `api/feedback.php` (tout autre `.php` est refusé) ;
- bloque `config/`, `docs/`, `tests/`, `tools/`, `deploy/` et `.git` ;
- limite le formulaire à 6 envois par minute et par IP (le script PHP ajoute 10 envois par heure et par IP).

**Wiki dans un sous-dossier** (par exemple `https://cis.worldskills-france.org/wiki/`) : tous les liens du wiki
sont relatifs, il fonctionne tel quel. Dans le `server` existant, ajoutez par exemple :

```nginx
location /wiki/ { alias /var/www/wiki-cis/; index index.html; try_files $uri $uri/ =404; }
location ~ ^/wiki/(config|deploy|docs|tests|tools)/ { deny all; }
location = /wiki/api/feedback.php {
    include fastcgi_params;
    fastcgi_param SCRIPT_FILENAME /var/www/wiki-cis/api/feedback.php;
    fastcgi_pass unix:/run/php/php8.2-fpm.sock;
}
```

## 5. HTTPS

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d wiki-cis.exemple.fr
```

## 6. Tester

```bash
curl -s -X POST https://wiki-cis.exemple.fr/api/feedback.php \
  -H 'Content-Type: application/json' \
  -d '{"type":"avis","message":"Test d envoi depuis le serveur","page":"index.html","pageTitle":"Accueil"}'
```

Réponse attendue : `{"ok":true}` et un e-mail « [Wiki CIS] Avis – Accueil » dans la boîte de kjanlin-b@cofom.org.

| Réponse | Cause | Solution |
|---|---|---|
| `{"ok":false,"error":"config"}` | `/etc/wiki-cis/mail.php` absent ou illisible | étape 3 (droits `root:www-data`, `640`) |
| `{"ok":false,"error":"mailer"}` | PHPMailer absent | `sudo apt install libphp-phpmailer` |
| `{"ok":false,"error":"send"}` | le serveur SMTP refuse | identifiants, port, SMTP AUTH, pare-feu ; détail dans `sudo journalctl -u php8.2-fpm` ou `/var/log/nginx/error.log` |
| `{"ok":false,"error":"rate"}` | trop d'envois depuis la même IP | attendre une heure (réglage `rate_limit_per_hour`) |

## 7. Ce que reçoit kjanlin-b@cofom.org

```
Objet : [Wiki CIS] Information manquante – Ranged Score : des plages de tolérance

Type      : Information manquante
Page      : Ranged Score : des plages de tolérance — https://…/article.html?id=calc-ranged-score
Langue    : FR
Nom       : (si indiqué)
E-mail    : (si indiqué) — « Répondre » écrit directement à cette personne
Date      : 22/11/2026 08:27

Message :
…
```

## Variante Apache

```bash
sudo apt install -y apache2 libapache2-mod-php8.2 php8.2-mbstring libphp-phpmailer
```

Placez le wiki dans `/var/www/wiki-cis`, créez un VirtualHost avec `DocumentRoot /var/www/wiki-cis` et ajoutez :

```apache
<Directory /var/www/wiki-cis>
    Options -Indexes
    AllowOverride None
    Require all granted
</Directory>
<DirectoryMatch "^/var/www/wiki-cis/(config|deploy|docs|tests|tools|\.git)">
    Require all denied
</DirectoryMatch>
<FilesMatch "\.php$">
    Require all denied
</FilesMatch>
<Files "feedback.php">
    Require all granted
</Files>
```

## Tester sur un PC sans PHP

Avec `python -m http.server`, le PHP ne s'exécute pas : le formulaire affiche alors
« L'envoi automatique n'est pas disponible » et propose **Envoyer depuis ma messagerie**
(message pré-rempli vers kjanlin-b@cofom.org). C'est normal en local.
