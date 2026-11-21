# Wiki CIS — refonte

Refonte complète du wiki du **Competition Information System (CIS)** de WorldSkills France,
aujourd'hui sous DokuWiki : <https://cis.worldskills-france.org/wiki/>.

Ce dépôt contient un **prototype HTML fonctionnel** pour avoir une vue globale du projet :
site public, contenu migré, version anglaise, modes Guidé / Expert et administration.

> Vue d'ensemble de tous les écrans : ouvrir [`apercu.html`](apercu.html).

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
| Accueil | `index.html` | Recherche, parcours débutant / expert, 7 étapes de notation, signatures CNAT 48, vidéos |
| Page | `article.html?id=…` | Contenu, aide-mémoire (Expert), « Avant de commencer » (Guidé), sommaire, historique |
| Catégorie | `category.html?id=…` | Pages d'une catégorie, filtre par niveau |
| Recherche | `search.html?q=…` | Recherche plein texte (aussi via **Ctrl + K** sur toutes les pages) |
| Glossaire | `glossary.html` | 25 termes du CIS, en français et en anglais |
| Administration | `admin.html` | Pages, catégories, glossaire, utilisateurs, activité, corbeille, paramètres |
| Vue d'ensemble | `apercu.html` | Liens vers tous les écrans, migration, points à valider, feuille de route |

### Français / anglais

- Sélecteur **FR / EN** dans l'en-tête (mémorisé, ou `?lang=en` dans l'adresse).
- Interface traduite (`assets/js/i18n.js`) et contenu traduit page par page.
- Si une page n'est pas encore traduite, elle s'affiche en français avec un message.

### Débutants et experts

- Sélecteur **Guidé / Expert** dans l'en-tête (ou `?mode=expert`).
- **Guidé** : objectifs et prérequis, captures visibles, vocabulaire expliqué au survol, parcours en 7 étapes.
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
data/content.js        contenu : pages FR/EN, catégories, glossaire, utilisateurs, paramètres
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
