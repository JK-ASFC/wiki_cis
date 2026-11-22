# Plan d'installation — Apache 2 sur Debian 12, à côté de l'ancien `/wiki`

## Ce que l'on va obtenir

| Adresse | Dossier | Changement |
|---|---|---|
| `https://VOTRE-SERVEUR/wiki/` | `/var/www/wiki` (ancien DokuWiki) | **aucun** : il continue de fonctionner comme avant |
| `https://VOTRE-SERVEUR/wiki-cis/` | `/var/www/wiki-cis` (nouveau wiki) | **nouveau** |

Le nouveau wiki est un site statique. Seul le formulaire « Votre avis » utilise PHP : un unique fichier,
`api/feedback.php`, exécuté par un **pool PHP-FPM isolé** (utilisateur dédié `wikicis`), séparé du PHP de DokuWiki.
Toutes les règles Apache ajoutées ne concernent **que** `/var/www/wiki-cis`.

> Ce plan a été testé sur un Apache 2.4 + PHP-FPM reproduisant cette situation : l'ancien `/wiki` (PHP via
> `mod_php`) a continué de fonctionner, le nouveau wiki a été servi sous `/wiki-cis/` (47 pages, aucune erreur)
> et le formulaire a envoyé ses e-mails.

Dans les commandes, remplacez **`VOTRE-SERVEUR`** par le nom du serveur (par exemple `cis.worldskills-france.org`).
Toutes les commandes se lancent avec un compte ayant `sudo`.

---

## Étape 0 — Faire l'état des lieux (2 min, rien n'est modifié)

```bash
apache2 -v                                   # Apache 2.4.x
a2query -M                                   # MPM utilisé (prefork si DokuWiki utilise mod_php)
ls /etc/apache2/mods-enabled | grep -i php   # php8.2.load = mod_php actif pour DokuWiki : on n'y touche pas
ls -ld /var/www/wiki /var/www/wiki-cis       # /var/www/wiki-cis ne doit pas encore exister
sudo apache2ctl -S                           # liste des sites (VirtualHost) actifs
```

Sauvegarde de la configuration Apache actuelle (pour pouvoir revenir en arrière) :

```bash
sudo tar czf /root/apache2-avant-wiki-cis-$(date +%F).tgz /etc/apache2
```

## Étape 1 — Installer les paquets

```bash
sudo apt update
sudo apt install -y php8.2-fpm php8.2-mbstring libphp-phpmailer git unattended-upgrades
```

> `php8.2-fpm` s'installe **à côté** de `mod_php` : DokuWiki n'est pas modifié.
> **Ne désactivez pas** `mod_php` (`a2dismod php8.2`) : cela casserait l'ancien wiki.

## Étape 2 — Copier le nouveau wiki dans `/var/www/wiki-cis`

```bash
sudo git clone -b refonte-wiki-wkwhp4 https://github.com/JK-ASFC/wiki_cis.git /var/www/wiki-cis
sudo chown -R root:root /var/www/wiki-cis
sudo find /var/www/wiki-cis -type d -exec chmod 755 {} \;
sudo find /var/www/wiki-cis -type f -exec chmod 644 {} \;
sudo chmod 700 /var/www/wiki-cis      # dossier FERMÉ tant qu'Apache n'est pas configuré (étape 6)
```

> **Pourquoi fermer le dossier ?** Si la racine du site Apache est `/var/www`, tout nouveau dossier de
> `/var/www` est publié immédiatement, sans les protections de l'étape 6 (le dossier `.git` serait lisible).
> Il sera ouvert à la fin de l'étape 6.

> Le dépôt est privé : `git clone` demande un identifiant GitHub et un **jeton d'accès** (pas le mot de passe),
> ou utilisez une clé de déploiement. Sans accès Git sur le serveur : téléchargez le ZIP de la branche depuis
> GitHub, copiez-le (`scp`) et décompressez-le dans `/var/www/wiki-cis`.

## Étape 3 — Créer l'utilisateur dédié au formulaire

```bash
sudo useradd --system --no-create-home --shell /usr/sbin/nologin wikicis
sudo mkdir -p /var/log/wiki-cis
sudo chown wikicis:wikicis /var/log/wiki-cis
```

## Étape 4 — Remplir le fichier des e-mails

```bash
sudo mkdir -p /etc/wiki-cis
sudo cp /var/www/wiki-cis/config/mail.example.php /etc/wiki-cis/mail.php
sudo nano /etc/wiki-cis/mail.php
```

À modifier dans le fichier :

| Clé | Valeur pour votre installation |
|---|---|
| `to` | `['kjanlin-b@cofom.org']` (déjà rempli) |
| `from` | le compte d'envoi, par exemple `wiki-cis@cofom.org` |
| `site_url` | `https://VOTRE-SERVEUR/wiki-cis` |
| `allowed_origins` | `['https://VOTRE-SERVEUR']` (sans `/wiki-cis`) |
| `smtp` | serveur, port, sécurité, identifiant et mot de passe du compte d'envoi |

Protéger le fichier (seul le pool du wiki peut lire le mot de passe) :

```bash
sudo chown root:wikicis /etc/wiki-cis/mail.php
sudo chmod 640 /etc/wiki-cis/mail.php
```

## Étape 5 — Activer le pool PHP isolé

```bash
sudo cp /var/www/wiki-cis/deploy/php-fpm-wiki-cis.conf /etc/php/8.2/fpm/pool.d/wiki-cis.conf
sudo php-fpm8.2 -t
sudo systemctl enable --now php8.2-fpm
sudo systemctl restart php8.2-fpm
ls -l /run/php/wiki-cis.sock          # doit exister (propriétaire www-data)
```

## Étape 6 — Brancher `/wiki-cis` dans Apache

```bash
sudo cp /var/www/wiki-cis/deploy/apache-wiki-cis.conf /etc/apache2/conf-available/wiki-cis.conf
sudo a2enmod proxy_fcgi headers alias
sudo a2enconf wiki-cis
sudo apache2ctl configtest            # doit afficher « Syntax OK »
sudo systemctl reload apache2
sudo chmod 755 /var/www/wiki-cis      # ouverture du dossier, maintenant protégé par la configuration
```

Le fichier [`deploy/apache-wiki-cis.conf`](../deploy/apache-wiki-cis.conf) :
- crée l'adresse `/wiki-cis/` vers `/var/www/wiki-cis/` (`Alias`), quel que soit le `DocumentRoot` du site ;
- n'exécute **aucun** PHP dans `/var/www/wiki-cis`, sauf `api/feedback.php`, en POST, via le pool isolé ;
- bloque `.git`, `config/`, `docs/`, `tests/`, `tools/`, `deploy/`, les fichiers `.md` et les fichiers cachés ;
- refuse les envois de plus de 32 Ko avant qu'ils n'atteignent PHP ;
- ajoute des en-têtes de sécurité **uniquement** pour le wiki CIS.

> **Plusieurs sites (VirtualHost) sur le serveur ?** `a2enconf` rend `/wiki-cis` disponible sur tous.
> Pour le limiter à un seul site : ne faites pas `a2enconf`, et ajoutez dans le bon `<VirtualHost>` (fichier de
> `/etc/apache2/sites-available/`) la ligne `Include /etc/apache2/conf-available/wiki-cis.conf`,
> puis `sudo apache2ctl configtest && sudo systemctl reload apache2`.

**Recommandé (réglage global, sans effet sur le fonctionnement)** : ne plus afficher la version d'Apache.

```bash
sudo sed -i 's/^ServerTokens .*/ServerTokens Prod/; s/^ServerSignature .*/ServerSignature Off/' /etc/apache2/conf-available/security.conf
sudo systemctl reload apache2
```

## Étape 7 — Vérifier

Dans un navigateur :
1. `https://VOTRE-SERVEUR/wiki/` : l'ancien wiki s'affiche **comme avant** ;
2. `https://VOTRE-SERVEUR/wiki-cis/` : le nouveau wiki s'affiche (logo, guide pas à pas, recherche) ;
3. bouton **Votre avis** › envoyer un message de test › « Merci ! Votre message a bien été envoyé. »
   et le mail arrive chez kjanlin-b@cofom.org.

En ligne de commande :

```bash
S=https://VOTRE-SERVEUR
curl -s -o /dev/null -w "ancien wiki        %{http_code} (attendu 200)\n" $S/wiki/
curl -s -o /dev/null -w "nouveau wiki       %{http_code} (attendu 200)\n" $S/wiki-cis/
curl -s -o /dev/null -w "formulaire en GET  %{http_code} (attendu 403)\n" $S/wiki-cis/api/feedback.php
curl -s -o /dev/null -w ".git               %{http_code} (attendu 403)\n" $S/wiki-cis/.git/config
curl -s -o /dev/null -w "documentation      %{http_code} (attendu 403)\n" $S/wiki-cis/docs/installation-apache2.md
curl -s -o /dev/null -w "config             %{http_code} (attendu 403)\n" $S/wiki-cis/config/mail.example.php
curl -s -X POST $S/wiki-cis/api/feedback.php -H 'Content-Type: application/json' -H "Origin: $S" \
  -d '{"type":"avis","message":"Test installation Apache","page":"index.html","pageTitle":"Accueil"}'; echo
```

La dernière commande doit répondre `{"ok":true}`.

## Étape 8 — HTTPS

Si le site est déjà en HTTPS, `/wiki-cis` l'est automatiquement. Sinon :

```bash
sudo apt install -y certbot python3-certbot-apache
sudo certbot --apache -d VOTRE-SERVEUR
```

## Étape 9 — Mises à jour

- **Sécurité** (PHP, Apache, PHPMailer) : automatiques avec `unattended-upgrades`.
  Vérifier : `sudo dpkg-reconfigure -plow unattended-upgrades` (répondre « Oui »).
- **Contenu du wiki** : `cd /var/www/wiki-cis && sudo git pull`, puis remettre les droits (étape 2, lignes `find`,
  **sans** le `chmod 700` puisque la configuration est déjà active).
- **Réglages Apache ou PHP du wiki** modifiés dans le dépôt : refaire la copie des étapes 5 et 6.

## Dépannage

| Symptôme | Cause probable | Solution |
|---|---|---|
| `/wiki-cis/` affiche « Not Found » | configuration non activée | `sudo a2enconf wiki-cis && sudo systemctl reload apache2` |
| `/wiki-cis/` affiche « Forbidden » | droits des fichiers | refaire les commandes `find … chmod` de l'étape 2 |
| Pages sans style ni logo | droits des fichiers ou cache | étape 2, puis Ctrl + F5 |
| Formulaire : « L'envoi automatique n'est pas disponible » | pool PHP absent ou socket introuvable | étape 5 ; `ls -l /run/php/wiki-cis.sock` ; `sudo journalctl -u php8.2-fpm` |
| Réponse `{"ok":false,"error":"config"}` | `/etc/wiki-cis/mail.php` absent ou illisible | étape 4 (droits `root:wikicis` et `640`) |
| Réponse `{"ok":false,"error":"origin"}` | adresse du site absente de `allowed_origins` | mettre exactement `https://VOTRE-SERVEUR` |
| Réponse `{"ok":false,"error":"send"}` | le serveur SMTP refuse | identifiants, port, « SMTP AUTH » (Microsoft 365), pare-feu port 587 ; détail : `sudo tail /var/log/wiki-cis/php-error.log` |
| L'ancien `/wiki` ne marche plus | `mod_php` désactivé par erreur | `sudo a2enmod php8.2 && sudo systemctl restart apache2` |

Journaux utiles : `/var/log/apache2/error.log`, `/var/log/wiki-cis/php-error.log`, `sudo journalctl -u php8.2-fpm`.

## Revenir en arrière

```bash
sudo chmod 700 /var/www/wiki-cis                              # ferme immédiatement le dossier
sudo a2disconf wiki-cis && sudo systemctl reload apache2      # /wiki n'a jamais été touché
sudo rm /etc/php/8.2/fpm/pool.d/wiki-cis.conf && sudo systemctl restart php8.2-fpm
```

## Plus tard : remplacer l'ancien wiki

Quand le nouveau wiki est validé, on peut rediriger les anciennes adresses vers le nouveau, par exemple dans
`/etc/apache2/conf-available/wiki-cis.conf` :

```apache
RedirectMatch 301 ^/wiki/?$ /wiki-cis/
```

La table de correspondance page par page (anciennes adresses DokuWiki → nouvelles pages) est dans `apercu.html`.
À faire seulement après accord : l'ancien DokuWiki reste accessible tant que cette ligne n'est pas ajoutée.
