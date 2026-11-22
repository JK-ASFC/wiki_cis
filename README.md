# Wiki CIS — refonte

Refonte complète du wiki du **Competition Information System (CIS)** de WorldSkills France,
aujourd'hui sous DokuWiki : <https://cis.worldskills-france.org/wiki/>.

Ce dépôt contient un **prototype HTML fonctionnel** pour avoir une vue globale du projet :
site public, contenu migré, version anglaise, modes Guidé / Expert et administration.

> Vue d'ensemble de tous les écrans : ouvrir [`apercu.html`](apercu.html).

## Refonte CIS v6 (novembre 2026)

Le contenu a été réécrit en testant le CIS v6 avec un compte **Expert** sur la base de formation
(`training_604`, métier 155 `test_wiki`) : import du barème « bonhomme de neige », les 7 méthodes de calcul
(46 cas mesurés dans le CIS, rejoués par `tests/calc.test.js`), planning, équipes, feuilles PDF, rapports.

- 8 catégories, 43 pages FR/EN, captures annotées du CIS v6.
- **Simulateur interactif** sur chaque page de méthode (`::calc[...]` dans le Markdown).
- **Exemples par métier** : 57 métiers × 7 méthodes (`::trades[...]`).
- Page « Messages du CIS expliqués » : tous les messages rencontrés et leur solution.

```bash
node tests/calc.test.js      # le simulateur reproduit les 46 cas mesurés dans le CIS
node tests/content.test.js   # liens internes, images, fichiers et champs FR/EN
```

## Formulaire « Votre avis » et installation sur Debian 12

Un bouton **Votre avis** (en-tête, bas de chaque page, pied de page) ouvre un formulaire : avis, information
manquante, erreur ou suggestion. Il est envoyé par e-mail à **kjanlin-b@cofom.org** par `api/feedback.php`
(PHP 8.2 + PHPMailer, SMTP).

- Fichier à remplir : [`config/mail.example.php`](config/mail.example.php) → à copier dans `/etc/wiki-cis/mail.php`.
- Installation pas à pas (nginx, PHP, HTTPS, tests) : [`docs/deploiement-debian12.md`](docs/deploiement-debian12.md).
- Configuration nginx prête à l'emploi : [`deploy/nginx-wiki-cis.conf`](deploy/nginx-wiki-cis.conf).

Sans PHP (test local avec `python -m http.server`), le formulaire propose d'envoyer le message depuis la messagerie.

## Lancer le prototype

Aucune installation n'est nécessaire. Depuis le dossier du dépôt :

```powershell
python -m http.server 8765
```

puis ouvrir <http://localhost:8765/>. Ouvrir directement `index.html` dans le navigateur fonctionne aussi.

Le prototype peut aussi être publié tel quel avec **GitHub Pages** (Settings › Pages › branche `refonte-wiki`, dossier racine).

## Ce que contient le prototype

| Écran | Fichier | Rôle |
|---|---|---|
| Accueil | `index.html` | Message de bienvenue, explication directe, accès au guide pas à pas, parcours en 8 étapes, rubriques |
| Guide pas à pas | `guide.html` | 54 étapes illustrées (captures du CIS v6, zone surlignée + flèche), de l'Excel au verrouillage |
| Page | `article.html?id=…` | Contenu, aide-mémoire (Expert), « Avant de commencer » (Guidé), sommaire, historique |
| Catégorie | `category.html?id=…` | Pages d'une catégorie, filtre par niveau |
| Recherche | `search.html?q=…` | Recherche plein texte (aussi via **Ctrl + K** sur toutes les pages) |
| Glossaire | `glossary.html` | 32 termes du CIS, en français et en anglais |
| Administration | `admin.html` | Pages, catégories, glossaire, utilisateurs, activité, corbeille, paramètres |
| Vue d'ensemble | `apercu.html` | Liens vers tous les écrans, migration, points à valider, feuille de route |

### Français / anglais

- Sélecteur **FR / EN** dans l'en-tête (mémorisé, ou `?lang=en` dans l'adresse).
- Interface traduite (`assets/js/i18n.js`) et contenu traduit page par page.
- Si une page n'est pas encore traduite, elle s'affiche en français avec un message.

### Débutants et experts

- Sélecteur **Guidé / Expert** dans l'en-tête (ou `?mode=expert`).
- **Guidé** : objectifs et prérequis, captures visibles, vocabulaire expliqué au survol, parcours en 8 étapes.
- **Expert** : aide-mémoire en tête de page, chemin des menus du CIS, captures repliées.
- Chaque page a un niveau : Débutant, Intermédiaire, Avancé.

### Administration

Connexion de démonstration sans mot de passe (choix du compte). Fonctionnalités :

- **Ajout, modification, suppression** de pages ; statut brouillon / publié.
- Éditeur **FR / EN** avec barre d'outils Markdown, aperçu en direct et aide sur la syntaxe.
- **Auteur** et **date** de création et de dernière modification sur chaque page.
- **Révisions** : note de révision, comparaison ligne à ligne, restauration d'une ancienne version.
- **Corbeille** avec restauration ; suppression définitive réservée au rôle Administration.
- **Rôles** : Administration (tout), Rédaction (pages et glossaire), Traduction (texte uniquement).
- Gestion des **catégories**, du **glossaire** et des **utilisateurs** ; **journal d'activité**.
- Export / import JSON du contenu.

> Dans le prototype, les modifications sont enregistrées **dans le navigateur** (localStorage).
> Pour les partager : Administration › Paramètres › Exporter (JSON).

## Organisation des fichiers

```
index.html, article.html, category.html, search.html, glossary.html   site public
admin.html                                                            administration
apercu.html                                                           vue d'ensemble du projet
data/content.js        base : paramètres, utilisateurs, glossaire, pages Vidéos / archives
data/tour.js           étapes du guide pas à pas (généré par tools/build_tour.py)
assets/js/tour.js      moteur du guide pas à pas
data/pages/00-structure.js  catégories, parcours en 8 étapes, glossaire CIS v6
data/pages/01…06-*.js  pages CIS v6 par catégorie (prise en main, barème, calculs, organisation, notation, aide)
data/trades.js         exemples de calcul pour les 57 métiers (7 méthodes, FR/EN)
assets/js/calc.js      simulateur des 7 méthodes de calcul (formules vérifiées dans le CIS)
assets/img/cis/        captures du CIS v6 (instance de formation, métier 155 test_wiki)
assets/files/          fichiers Excel d'exemple (modèle vide, bonhomme de neige avec et sans calculs)
docs/chatbots-ia.md    proposition des deux assistants IA + format d'import CIS décodé
tests/                 tests : node tests/calc.test.js · node tests/content.test.js
assets/js/markdown.js  moteur Markdown sécurisé (aucun HTML brut accepté)
assets/js/store.js     couche de données (localStorage) — à remplacer par l'API en production
assets/js/i18n.js      textes de l'interface FR / EN
assets/js/app.js       site public
assets/js/admin.js     administration
assets/js/icons.js     icônes SVG
assets/css/            styles (thème clair / sombre, responsive)
```

## Syntaxe des pages

Le contenu est écrit en Markdown, avec quelques ajouts :

| Syntaxe | Résultat |
|---|---|
| `## Titre` / `### Sous-titre` | Sections (alimentent le sommaire) |
| `[[marking-days]]` / `[[marking-days\|texte]]` | Lien vers une page du wiki |
| `![Légende](media:dossier/image.png)` | Image de la bibliothèque de médias (plusieurs lignes = galerie) |
| `::video[Titre](media:videos/x.mp4)` | Vidéo |
| `> [!NOTE]`, `[!TIP]`, `[!WARNING]`, `[!IMPORTANT]` | Encadrés |
| `++Tab++` | Touche du clavier |
| `:::guided` … `:::` / `:::expert` … `:::` | Bloc visible dans un seul mode |
| `:::steps` … `:::` | Liste numérotée affichée en étapes illustrées |
| `:::details Question` … `:::` | Bloc repliable (FAQ) |
| `::calc[ranged]{"max":1.5,"target":800,…}` | Simulateur d'une méthode de calcul (`passfail`, `choice`, `completed`, `ranged`, `regular`, `percent`, `stepped`) |
| `::trades[ranged]` / `::trades[]` | Exemples par métier pour une méthode / explorateur par métier |
| `![Légende](assets/img/cis/x.png)` | Capture locale |

Les chemins `media:` pointent vers `settings.mediaBase` (pour l'instant les médias de l'ancien wiki).

## Migration depuis DokuWiki

Les 28 pages du DokuWiki (dont 7 pages vidéo) ont été reprises : 25 pages de contenu, la page d'accueil,
le menu latéral et l'index des vidéos étant remplacés par la nouvelle navigation. Une page d'introduction
« Découvrir le CIS » a été ajoutée. L'historique de chaque page garde le dernier auteur et la date de la
version DokuWiki, avec un lien vers l'ancienne page. La table de correspondance (pour les redirections)
est dans `apercu.html`.

## Prochaines étapes vers la production

1. API serveur + base de données (par exemple PHP 8 + SQLite, compatible avec l'hébergement actuel) à la place de `store.js`.
2. Authentification réelle et vérification des droits côté serveur.
3. Copie du dossier `_media` et envoi de médias depuis l'éditeur.
4. Redirections des anciennes adresses `/wiki/…`.
5. Rendu HTML côté serveur (référencement, affichage sans JavaScript).
