# Audit de sécurité — cis.worldskills-france.org (23/11/2026)

**Périmètre** : `https://cis.worldskills-france.org/` (portail et liens directs : instances CIS, `/signoff`, `/wiki`),
`/wiki-cis/`, `/cis2/`.

**Méthode** : tests externes **non destructifs**, faible volume (≈ 150 requêtes en lecture), sans compte, sans force
brute, sans test de charge, sans envoi de formulaire réel. Chaque correctif a été **rejoué sur une réplique locale**
(Apache 2.4 + PHP + faux CIS Jetty derrière Apache) avant d'être proposé.

## Synthèse

| # | Gravité | Constat | Correctif | État |
|---|---|---|---|---|
| 1 | **Élevée** | Listes de fichiers visibles : `/signoff/config/` (révèle `config.php`), `/signoff/includes/` (`queries.php`), `/signoff/css/`, `/signoff/js/` | `Options -Indexes` sur `/var/www` | fichier prêt, **à appliquer** |
| 2 | **Élevée** | Fichiers PHP internes de l'outil de signature joignables directement (`/signoff/includes/queries.php` → erreur 500, `/signoff/config/config.php` exécuté) | accès refusé à `config/` et `includes/` | fichier prêt, **à appliquer** |
| 3 | **Élevée** | Cookie de session de l'outil de signature `PHPSESSID` sans `Secure`, `HttpOnly`, `SameSite` (page de connexion) | attributs ajoutés (PHP + Apache) | fichier prêt, **à appliquer** |
| 4 | Moyenne | Cookie de session du CIS `JSESSIONID` sans `HttpOnly` ni `SameSite` | attributs ajoutés par Apache | fichier prêt, **à appliquer** |
| 5 | Moyenne | Identifiant de session du CIS dans l'adresse (`…/login;jsessionid=…`) : il peut fuiter (historique, journaux, liens copiés) | réglage du CIS (`tracking-mode COOKIE`) | **à demander** à l'éditeur / CIS Master |
| 6 | Moyenne | Version **Jetty 11.0.22** annoncée par le CIS ; la branche Jetty 11 n'est plus maintenue par la communauté depuis janvier 2025 | version masquée par Apache ; mise à jour du CIS | masquage prêt ; **mise à jour à planifier** |
| 7 | Moyenne | Pas de protection anti-« clickjacking » ni de `Referrer-Policy` sur le portail, `/cis2/`, `/signoff`, `/wiki` | en-têtes ajoutés partout, sans doublon | fichier prêt, **à appliquer** |
| 8 | Faible | `/wiki-cis/admin.html` (prototype d'administration, connexion sans mot de passe) et `/wiki-cis/apercu.html` (notes internes du projet) publics | accès refusé | **corrigé dans le dépôt** (`deploy/apache-wiki-cis.conf`) |
| 9 | Info | Ancien DokuWiki : « No ACL setup yet! Denying access to everyone » — contenu inaccessible, formulaire de connexion exposé | rediriger `/wiki` vers `/wiki-cis` puis retirer DokuWiki | à décider |
| 10 | Info | Pas de fichier `/.well-known/security.txt` (contact sécurité) | modèle fourni ci-dessous | optionnel |

**Points vérifiés et sains** : TLS 1.2 et 1.3 uniquement (TLS 1.0/1.1 refusés), certificat Let's Encrypt valide
jusqu'au 05/02/2027, HSTS actif, `X-Content-Type-Options` présent, version d'Apache masquée, méthode TRACE refusée,
aucune autorisation CORS, `.git` / `.env` / `server-status` / sauvegardes non exposés, dossiers `data/` et `conf/` de
DokuWiki protégés, `config.php` de l'outil de signature exécuté sans rien afficher, page 404 du CIS sans trace
technique, JavaScript de `/cis2/` sans faille XSS (texte inséré par `textContent`), **toutes les protections de
`/wiki-cis/` actives en production** (dossiers internes 403, formulaire : autre origine refusée, faux formulaire 415,
`PATH_INFO` refusé, envoi de 100 Ko refusé 413).

## Appliquer les correctifs (≈ 5 minutes, réversible)

### A. Durcissement global — constats 1, 2, 3, 4, 6, 7

```bash
cd /var/www/wiki-cis && sudo git pull
sudo cp deploy/apache-durcissement-global.conf /etc/apache2/conf-available/durcissement-cis.conf
sudo a2enmod headers
sudo a2enconf durcissement-cis
sudo apache2ctl configtest && sudo systemctl reload apache2
```

Le fichier [`deploy/apache-durcissement-global.conf`](../deploy/apache-durcissement-global.conf) :
- désactive les listes de fichiers sur tout `/var/www` ;
- refuse les fichiers cachés et de sauvegarde (`.bak`, `.old`, `.swp`, `.sql`, `.log`…), **sauf** `/.well-known/`
  (renouvellement Let's Encrypt vérifié) ;
- ferme `/signoff/config/` et `/signoff/includes/` au navigateur (PHP continue de les lire sur le disque) ;
- sécurise les cookies `PHPSESSID`, `JSESSIONID` et `DokuWiki` (ajoute `Secure`, `HttpOnly`, `SameSite=Lax`
  seulement s'ils manquent) ;
- ajoute `X-Frame-Options`, `Referrer-Policy`, `X-Content-Type-Options`, `Permissions-Policy` **seulement s'ils
  manquent** (aucun doublon avec le CIS ni avec `/wiki-cis`) ;
- remplace `Server: Jetty(11.0.22)` par `Server: CIS`, masque `X-Powered-By`, désactive TRACE.

Retour arrière : `sudo a2disconf durcissement-cis && sudo systemctl reload apache2`.

### B. Nouveau wiki — constat 8

```bash
sudo cp /var/www/wiki-cis/deploy/apache-wiki-cis.conf /etc/apache2/conf-available/wiki-cis.conf
sudo apache2ctl configtest && sudo systemctl reload apache2
```

### C. Vérifier en production

```bash
S=https://cis.worldskills-france.org
for u in /signoff/config/ /signoff/includes/ /signoff/css/ /signoff/includes/queries.php /wiki-cis/admin.html /wiki-cis/apercu.html; do
  printf "%-34s %s (attendu 403)\n" $u "$(curl -s -o /dev/null -w '%{http_code}' $S$u)"; done
for u in / /signoff/ /wiki-cis/ /cis2/; do printf "%-34s %s (attendu 200)\n" $u "$(curl -s -o /dev/null -w '%{http_code}' $S$u)"; done
curl -s -D - -o /dev/null $S/signoff/ | grep -i -E '^(set-cookie|x-frame-options)'
curl -s -D - -o /dev/null $S/training_604/login | grep -i -E '^(set-cookie|server|x-frame-options)'
```

Attendu : cookies avec `Secure; HttpOnly; SameSite=Lax`, `Server: CIS`, un seul `X-Frame-Options: SAMEORIGIN`.
Puis se connecter une fois à l'outil de signature et à une instance CIS pour vérifier que tout fonctionne.

> **À vérifier sur le serveur** : si un autre site de `/var/www` a **besoin** d'afficher une liste de fichiers
> (rare), ajoutez pour son dossier `Options +Indexes` dans sa propre configuration.

## À traiter avec l'éditeur du CIS (WorldSkills) ou le CIS Master

- **Constat 5 — identifiant de session dans l'adresse** : configurer l'application pour n'utiliser que le cookie
  (`<session-config><tracking-mode>COOKIE</tracking-mode></session-config>` dans le `web.xml`, ou l'équivalent
  dans la configuration Jetty du CIS).
- **Constat 6 — Jetty 11.0.22** : demander une version du CIS basée sur un serveur maintenu (Jetty 12), ou à défaut
  la dernière 11.0.x. Dans la configuration Jetty, `jetty.httpConfig.sendServerVersion=false` masque aussi la version
  à la source.

## Recommandations complémentaires (non testées, faute d'accès)

| Sujet | Recommandation |
|---|---|
| Connexion de l'outil de signature | limiter les essais de mot de passe (fail2ban sur les échecs de connexion), jeton anti-CSRF sur le formulaire |
| Code de l'outil de signature | revue du code (`includes/queries.php` : requêtes préparées contre l'injection SQL) — je peux la faire si le code m'est transmis |
| Mises à jour | `unattended-upgrades` actif sur le serveur (correctifs de sécurité Debian automatiques) |
| Ancien DokuWiki | une fois `/wiki-cis` validé : `RedirectMatch 301 ^/wiki/?$ /wiki-cis/`, puis retirer DokuWiki |
| Contact sécurité | publier `/.well-known/security.txt` (modèle ci-dessous) |

Modèle `/var/www/.well-known/security.txt` (adapter le dossier au `DocumentRoot`) :

```
Contact: mailto:cis@cofom.org
Expires: 2027-11-23T00:00:00.000Z
Preferred-Languages: fr, en
```

## Limites de l'audit

- Port 80 (redirection HTTP → HTTPS) non joignable depuis l'environnement de test : à vérifier avec
  `curl -I http://cis.worldskills-france.org/` (attendu : 301 vers https).
- Aucun test authentifié (pages derrière connexion), aucun test d'injection sur les formulaires de connexion.
- Le système (SSH, pare-feu, versions installées) n'a pas été audité : seule la partie web visible depuis Internet.
