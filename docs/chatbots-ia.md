# Chatbots IA pour le wiki et le CIS — proposition

Deux assistants, un socle commun. Ce document s'appuie sur ce qui a été vérifié sur l'instance de
formation `training_604` (métier 155 `test_wiki`) : import du barème, 7 méthodes de calcul
(46 cas testés, voir `tests/calc.test.js`), format d'export CIS 5.0.

---

## 1. Assistant du wiki : « Pose ta question sur le CIS »

**But** : répondre en langage simple, en français ou en anglais, et toujours renvoyer vers la page du wiki.

| Brique | Choix proposé |
|---|---|
| Connaissances | Le contenu du wiki (`data/content.js`, `data/pages/*.js`, `data/trades.js`), découpé par section (titre `##`) |
| Recherche | Index des sections (mots-clés + glossaire) ; plus tard des embeddings si le volume grossit |
| Modèle | Claude (`claude-haiku-5-5` pour le coût, `claude-sonnet-5-5` pour les questions difficiles) |
| Outil « calcul » | Le moteur `assets/js/calc.js` exposé comme outil : le bot **calcule** au lieu d'estimer (« avec ±5 / ±10, 808 donne combien ? ») |
| Interface | Bulle en bas à droite du wiki ; réponse + liens « Voir la page » ; bouton « Ce n'est pas ça » |
| Serveur | Petit point d'accès (PHP 8 ou Node) qui garde la clé API côté serveur, limite le débit et journalise les questions sans réponse |

**Règles du bot** : ne répondre qu'à partir des sections fournies ; citer la page ; dire « je ne sais pas »
plutôt qu'inventer ; utiliser les noms de menus anglais exacts du CIS (`Marking Scheme › Calculations`).

**Bénéfice en plus** : les questions sans réponse indiquent les pages à écrire.

---

## 2. Assistant de remplissage du CIS : « De mon Excel au CIS »

**But** : partir du fichier de l'Expert (quel que soit son format), produire un fichier d'import CIS **complet**
(barème + calculs), le faire **vérifier par l'Expert**, puis l'importer.

### Étapes

1. **Lecture** : l'Expert dépose son Excel (ou PDF / Word). Le modèle extrait une structure JSON :
   critères › sous-critères (jour) › aspects (M/J, description, requirement, section WSOS, note max, scores J, calcul).
2. **Contrôles automatiques** (code, pas IA) — les 7 règles d'or du wiki :
   total = 100 ; section WSOS sur chaque aspect ; jour sur chaque sous-critère ; Requirement **numérique** si utilisé
   comme cible ; **2 points maximum par aspect** ; 4 scores J ; identifiants A1, A2… ; variance WSOS calculée.
3. **Proposition de calculs** : pour chaque aspect M, le modèle propose une méthode et ses paramètres
   (s'appuie sur `data/trades.js`), testée avec `calc.js` sur des valeurs types.
4. **Écran de vérification** pour l'Expert : tableau critère par critère, alertes en rouge, variance WSOS,
   aperçu des notes calculées ; chaque ligne est modifiable ; rien ne part sans le bouton « Je valide ».
5. **Génération** du fichier `.xlsx` au format **CIS 5.0** (onglet *CIS Marking Scheme Import* + onglet *Calculations*).
6. **Import** :
   - **recommandé** : l'Expert importe lui-même le fichier (2 minutes, voir la page « Importer le barème ») ;
   - **automatisé** (option) : un navigateur piloté (Playwright) importe avec les options choisies, puis
     **réexporte** et compare l'export au fichier envoyé (contrôle ligne à ligne).

### Points d'attention

- **Une session par compte** : si le robot se connecte avec le compte de l'Expert, il **déconnecte** l'Expert.
  Prévoir un compte dédié par métier, ou laisser l'Expert importer.
- **Un seul éditeur à la fois** : l'import échoue silencieusement si le barème est ouvert par quelqu'un d'autre.
- Les identifiants ne sont jamais stockés en clair ; travailler d'abord sur la base de formation.
- L'import **remplace** le barème : toujours exporter une sauvegarde avant.

---

## 3. Format d'import décodé (CIS 5.0)

### Onglet `CIS Marking Scheme Import`

| Col. | Ligne de sous-critère | Ligne d'aspect |
|---|---|---|
| A | ID (`A1`) | — |
| B | nom | — |
| C | jour (`1`, `2`, `3`) | — |
| D | — | `M` ou `J` |
| E | — | description |
| F | — | score J (0…3, une ligne par score) |
| G | — | aide / description du score J |
| H | — | Requirement (M) |
| I | — | section WSOS |
| J | — | **ligne du calcul** dans l'onglet *Calculations* (numérotée à partir de 1) |
| K | — | note max |

Zone WSOS en haut (section, nom, poids en colonne I), puis zone *Criteria* (lettre, nom, note en K),
puis un bloc par critère introduit par la ligne d'en-tête « Sub Criterion ID… ».

### Onglet `Calculations`

Une ligne par calcul : `A` = nom, `B` = type, `C` = dans la bibliothèque (`True`), `D` = paramètres.

Types observés : `PASS_FAIL`, `CHOICE`, `NUMBER_COMPLETED`, `RANGED_SCORE`,
`REGULAR_DIFFERENCE_DEDUCTION`, `PERCENTAGE_COMPARISON`, `STEPPED_SCORE_COMPARISON`.

Paramètres : `CLÉ:::#x~x#VALEUR` séparés par `#-#`. Les nombres sont écrits avec 8 décimales
(`5.00000000`, zéro = `0E-8`) ; les textes et booléens après `#x~x#`.

| Type | Clés observées |
|---|---|
| RANGED_SCORE | `DEDUCTION_TYPE` (`UNIT`/`PERCENT`), `TARGET_VAL_FROM_REQ` (`true`) ou valeur cible, `RANGEn_LOWER`, `RANGEn_UPPER`, `RANGEn_DEDUCTION` |
| REGULAR_DIFFERENCE_DEDUCTION | `DEDUCTION_TYPE`, `TARGET_VAL_FROM_REQ`, `DIFFERENCE`, `DIFFERENCE_TYPE` (`UNIT`), `DEDUCTION` |
| CHOICE | `DEDUCTION_TYPE`, `CHOICEn_LABEL`, `CHOICEn_DEDUCTION` |
| NUMBER_COMPLETED | `NUM_POSSIBLE` |
| PERCENTAGE_COMPARISON | `LOWEST_VAL_MAX_MARK` (`TRUE`/`FALSE`), `MIN_VALUE` (+ max, exclusion à confirmer) |
| STEPPED_SCORE_COMPARISON | `SCORE_DIFF_TYPE` (`UNIT`), `SCORE_DIFFERENCE`, `LOWEST_VAL_MAX_MARK`, `MARK_DEDUCTION` (+ proportionnel à confirmer) |
| PASS_FAIL | aucun |

Exemple réel : `assets/files/exemple-bonhomme-de-neige-avec-calculs.xlsx`.
Les clés « à confirmer » se relèvent en exportant un calcul réglé avec ces options.

---

## 4. Ordre de réalisation proposé

1. **Vérificateur d'Excel** dans le wiki (sans IA, 100 % navigateur) : l'Expert dépose son fichier et voit
   les erreurs des 7 règles d'or + la variance WSOS. Utile tout de suite, et brique n° 2 du chatbot CIS.
2. **Assistant du wiki** (questions / réponses + outil calcul).
3. **Assistant de remplissage** : extraction IA › écran de vérification › génération du `.xlsx`.
4. Import automatisé (optionnel), seulement après validation sur la base de formation.
