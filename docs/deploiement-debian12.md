# Installer le wiki CIS sur Debian 12 avec nginx (avec le formulaire « Votre avis »)

> **Serveur Apache 2 qui sert déjà `/wiki` ?** Suivez plutôt [installation-apache2.md](installation-apache2.md).

Le wiki est un site **statique** (HTML, CSS, JavaScript). Un seul fichier tourne côté serveur :
`api/feedback.php`, qui envoie les avis par e-mail à **kjanlin-b@cofom.org** via un serveur SMTP.

| Élément | Rôle |
|---|---|
| nginx | sert les pages du wiki |
| php8.2-fpm | exécute `api/feedback.php`, dans un **pool isolé** (utilisateur dédié `wikicis`) |
| libphp-phpmailer | bibliothèque d'envoi d'e-mails (paquet Debian) |
| `/etc/wiki-cis/mail.php` | **le fichier à remplir** : serveur SMTP, compte d'envoi, mot de passe, destinataire |

---

## 1. Installer les paquets

```bash
sudo apt update
sudo apt install -y nginx php8.2-fpm php8.2-mbstring libphp-phpmailer git unattended-upgrades

# Utilisateur système dédié, sans connexion possible, qui exécutera le script PHP
sudo useradd --system --no-create-home --shell /usr/sbin/nologin wikicis
sudo mkdir -p /var/log/wiki-cis && sudo chown wikicis:wikicis /var/log/wiki-cis
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

Renseignez aussi `allowed_origins` avec l'adresse du wiki (par exemple `https://cis.worldskills-france.org`) :
un navigateur venant d'un autre site sera refusé.

Puis protégez-le (le mot de passe n'est lisible que par le pool PHP du wiki, pas par nginx ni par les autres sites) :

```bash
sudo chown root:wikicis /etc/wiki-cis/mail.php
sudo chmod 640 /etc/wiki-cis/mail.php
```

## 3 bis. Activer le pool PHP isolé

```bash
sudo cp /var/www/wiki-cis/deploy/php-fpm-wiki-cis.conf /etc/php/8.2/fpm/pool.d/wiki-cis.conf
sudo php-fpm8.2 -t && sudo systemctl restart php8.2-fpm
ls -l /run/php/wiki-cis.sock        # doit exister, propriétaire www-data
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
- n'exécute **que** `api/feedback.php`, en POST uniquement, via le pool isolé (tout autre `.php` est refusé) ;
- n'annonce ni la version de nginx ni celle de PHP, et ajoute des en-têtes de sécurité (CSP, etc.) ;
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
    fastcgi_pass unix:/run/php/wiki-cis.sock;
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
  -H 'Content-Type: application/json' -H 'Origin: https://wiki-cis.exemple.fr' \
  -d '{"type":"avis","message":"Test d envoi depuis le serveur","page":"index.html","pageTitle":"Accueil"}'
```

Réponse attendue : `{"ok":true}` et un e-mail « [Wiki CIS] Avis – Accueil » dans la boîte de kjanlin-b@cofom.org.

| Réponse | Cause | Solution |
|---|---|---|
| `{"ok":false,"error":"config"}` | `/etc/wiki-cis/mail.php` absent ou illisible | étape 3 (droits `root:wikicis`, `640`) |
| `{"ok":false,"error":"origin"}` | le formulaire vient d'une adresse absente de `allowed_origins` | ajouter l'adresse exacte du wiki (https://…) |
| `{"ok":false,"error":"mailer"}` | PHPMailer absent | `sudo apt install libphp-phpmailer` |
| `{"ok":false,"error":"send"}` | le serveur SMTP refuse | identifiants, port, SMTP AUTH, pare-feu ; détail dans `/var/log/wiki-cis/php-error.log` |
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

## 8. Sécurité : ce qui protège le serveur

Le PHP du wiki tient en **un seul fichier** (`api/feedback.php`, environ 150 lignes) : pas de base de données,
pas de comptes, pas de sessions, pas d'envoi de fichiers. La surface d'attaque est donc très réduite, et elle
est entourée de plusieurs barrières indépendantes :

| Barrière | Ce qu'elle empêche |
|---|---|
| **Mises à jour de sécurité Debian automatiques** (`unattended-upgrades`) | les failles connues de PHP, nginx et PHPMailer sont corrigées sans attendre |
| nginx n'exécute que `/api/feedback.php`, en POST, sans `PATH_INFO` | exécution d'un autre fichier PHP ; failles de type CVE-2019-11043 (nginx + PHP-FPM) |
| Pool PHP-FPM isolé (`deploy/php-fpm-wiki-cis.conf`) sous l'utilisateur `wikicis` | même en cas de faille, le script n'a aucun droit sur le reste du serveur |
| `open_basedir` | lecture de fichiers hors du script, de ses réglages, de PHPMailer et de `/tmp` |
| `disable_functions` (exec, system, proc_open, popen, mail…) | lancement de commandes système |
| `allow_url_fopen` / `allow_url_include` désactivés, pas d'upload | inclusion de code distant, dépôt de fichiers |
| Limites de taille (32 Ko nginx, 64 Ko PHP) et de durée (30 s) | saturation du serveur |
| Type `application/json` exigé + contrôle `Origin` | envois forgés depuis un autre site (CSRF) |
| Limite d'envois : 6/min (nginx) et 10/h (PHP) par IP + piège à robots | spam et inondation de la boîte mail |
| Champs nettoyés (une ligne pour le nom, le titre, l'objet) | injection d'en-têtes mail (`Bcc:`…) |
| Envoi en SMTP (pas de `mail()`), PHPMailer du paquet Debian | les anciennes failles PHPMailer liées à `mail()`/sendmail |
| Mot de passe SMTP hors du dossier web, lisible par `wikicis` seulement, jamais dans Git | fuite du mot de passe par le site ou le dépôt |
| `server_tokens off`, `X-Powered-By` masqué | annonce des versions aux robots qui cherchent des failles |

Ces protections ont été vérifiées sur une installation de test (nginx + PHP-FPM, même configuration) :
GET → 403, `feedback.php/x.php` → 403, autre `.php` → 403, envoi de 100 Ko → 413, formulaire forgé → 415,
autre origine → refusée, en-têtes sans version, envoi normal → reçu.

**Les failles PHP très médiatisées en 2024** (CVE-2024-4577 et sa suite CVE-2024-8926) visent PHP en mode **CGI sous
Windows** : elles ne concernent pas Debian avec PHP-FPM.

### Vérifier les mises à jour automatiques

```bash
sudo dpkg-reconfigure -plow unattended-upgrades     # répondre « Oui »
sudo unattended-upgrade --dry-run --debug | tail -5  # test
apt list --upgradable                                 # mises à jour en attente
```

PHP 8.2 de Debian 12 reçoit les correctifs de sécurité de l'équipe Debian. Pensez aussi à faire `sudo git pull`
dans `/var/www/wiki-cis` quand le wiki évolue.

### Si vous préférez zéro PHP

Le formulaire peut aussi fonctionner avec un petit service Python (bibliothèque standard uniquement) derrière nginx,
ou être désactivé : sans `api/feedback.php`, le formulaire propose automatiquement d'envoyer le message depuis la
messagerie du visiteur.

## Variante Apache 2

Voir le plan dédié, testé, pour un serveur Apache qui sert déjà l'ancien wiki sous `/wiki` :
**[installation-apache2.md](installation-apache2.md)** (nouveau wiki sous `/wiki-cis`, dossier `/var/www/wiki-cis`,
configuration prête à l'emploi [`deploy/apache-wiki-cis.conf`](../deploy/apache-wiki-cis.conf)).

> Ne désactivez jamais `mod_php` sur un serveur qui héberge aussi DokuWiki : le formulaire du nouveau wiki passe
> par son propre pool PHP-FPM, les deux cohabitent.

## Tester sur un PC sans PHP

Avec `python -m http.server`, le PHP ne s'exécute pas : le formulaire affiche alors
« L'envoi automatique n'est pas disponible » et propose **Envoyer depuis ma messagerie**
(message pré-rempli vers kjanlin-b@cofom.org). C'est normal en local.
