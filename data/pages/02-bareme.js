/* CIS Wiki — Préparer le barème (CIS v6) */
(function () {
  'use strict';
  var P = window.WIKI_PAGE;

  /* ------------------------------------------------------------------ */
  P({
    id: 'excel-marking-scheme', category: 'bareme', order: 1, step: 1, level: 'beginner',
    menuPath: 'Marking Scheme › Marking Scheme › Export (modèle vide)', prereq: ['decouvrir-le-cis'], video: 'video-export-import',
    tags: ['excel', 'fichier', 'modèle', 'template', 'colonnes', 'requirement', 'wsos section', 'day of marking', 'max mark', 'judgement score', 'xlsx'],
    fr: {
      title: 'Remplir le fichier Excel du barème', short: 'Le fichier Excel',
      summary: 'La structure du fichier, colonne par colonne, avec l’exemple du bonhomme de neige et les 7 règles qui évitent les erreurs à l’import.',
      objectives: ['Récupérer le bon modèle de fichier', 'Remplir chaque colonne sans erreur', 'Vérifier son fichier avant de l’importer'],
      quick: [
        'Modèle : **Marking Scheme › Marking Scheme › Export** (format **CIS 5.0**)',
        'Onglet **CIS Marking Scheme Import** : WSOS › Critères › Sous-critères',
        'Sous-critère : A = ID, B = nom, C = **jour** (1, 2, 3)',
        'Aspect : D = **M** ou **J**, E = description, I = **section WSOS**, K = **Max Mark**',
        'Measurement : H = Requirement en **nombre seul**',
        'Judgement : 4 lignes F = 0, 1, 2, 3 + description en G',
        'Total des Max Mark = **100**'
      ],
      body: `Le barème se prépare dans **Excel**, puis s'importe dans le CIS. Un fichier bien rempli = un import sans surprise.

## 1. Récupérer le modèle

:::steps
1. Dans le CIS, ouvrez **Marking Scheme** › **Marking Scheme**.
2. En bas de la page, dans *Export Marking Scheme*, gardez le format **CIS 5.0**.
3. Cliquez sur **Export** : vous obtenez le fichier de votre métier, avec vos sections WSOS déjà remplies.
:::

![Export du barème : format (1) et bouton Export (2)](assets/img/cis/ms-export-panel.png)

Fichiers d'exemple à télécharger :

- [Modèle vide exporté du CIS v6](assets/files/modele-marking-scheme-cis-vide.xlsx)
- [Exemple « bonhomme de neige » (barème seul)](assets/files/exemple-bonhomme-de-neige.xlsx)
- [Exemple « bonhomme de neige » avec les 7 méthodes de calcul](assets/files/exemple-bonhomme-de-neige-avec-calculs.xlsx)

## 2. Les 4 zones du fichier

Le premier onglet, **CIS Marking Scheme Import**, contient tout le barème :

![Structure du fichier Excel (exemple bonhomme de neige)](assets/img/cis/excel-structure.png)

| Zone | Lignes | Ce qu'on y met |
|---|---|---|
| 1. **WSOS** | haut du fichier | N° de section (A), nom (B), poids en % (I). Les colonnes J et K se calculent seules. |
| 2. **Critères** | sous « Criteria » | Lettre (A), nom (B), total du critère (K). |
| 3. **En-tête de critère** | ligne bleue | Ne pas modifier : elle annonce le tableau d'un critère. |
| 4. **Sous-critères et aspects** | sous chaque en-tête | Une ligne par sous-critère, puis une ligne par aspect. |

## 3. Les colonnes, une par une

| Col. | Nom | Ligne de sous-critère | Ligne d'aspect |
|---|---|---|---|
| **A** | Sub Criterion ID | **A1**, A2… | vide |
| **B** | Sub Criterion Name | nom du sous-critère | vide |
| **C** | Day of Marking | **jour** : 1, 2 ou 3 | vide |
| **D** | Aspect Type | vide | **M** (Measurement) ou **J** (Judgement) |
| **E** | Aspect – Description | vide | ce qui est noté |
| **F** | Judg Score | vide | J seulement : 0, 1, 2, 3 (une ligne chacun) |
| **G** | Extra Description | vide | aide pour le juré, ou description du score J |
| **H** | Requirement | vide | M seulement : valeur attendue (**nombre seul**) |
| **I** | WSOS Section | vide | **n° de section WSOS** (1, 2, 3…) |
| **J** | Calculation Row | vide | rempli par le CIS à l'export (ne pas toucher) |
| **K** | Max Mark | vide | **note maximale** de l'aspect |

### Un aspect Measurement

Une seule ligne : **D = M**, la description, le Requirement si besoin, la section WSOS et la note max.

| D | E | H | I | K |
|---|---|---|---|---|
| M | Longueur de la jambe droite du bassin à la cheville | 800 | 1 | 1,5 |

### Un aspect Judgement

Une ligne pour l'aspect (**D = J**), puis **quatre lignes** pour les scores 0 à 3 avec leur description en G :

| D | E | F | G | I | K |
|---|---|---|---|---|---|
| J | Apparence de la jambe droite | | | 1 | 3 |
| | | 0 | Mauvais | | |
| | | 1 | Correcte avec quelques défauts | | |
| | | 2 | Respecte le standard | | |
| | | 3 | Excellent | | |

## 4. Les 7 règles d'or

> [!IMPORTANT] Vérifiez ces points avant chaque import
> 1. Le total des **Max Mark** fait exactement **100**.
> 2. **Chaque aspect** a un numéro de **section WSOS** en colonne I.
> 3. **Chaque sous-critère** a un **jour** en colonne C.
> 4. Le **Requirement** d'un aspect qui sera calculé contient un **nombre seul** : 800, et non « 800 mm » ni « 300mm +- 15mm ».
> 5. Chaque aspect **J** a ses **4 lignes** de score 0, 1, 2, 3.
> 6. Les identifiants se suivent : A1, A2… dans le critère A ; B1… dans le critère B.
> 7. On ne modifie ni les en-têtes, ni les formules des colonnes J et K de la zone WSOS.

:::guided
### Ce que nous avons constaté en important le bonhomme de neige

- Les aspects des critères B à H n'avaient **pas de section WSOS** : l'import a fonctionné, mais le CIS affiche une **variance de 97,5 %** (voir [[wsos]]).
- Les Requirements du sous-critère A2 étaient écrits « 300mm +- 15mm » : le CIS les **ignore** et aucun calcul ne peut s'appuyer dessus (voir [[calc-ranged-score]]).
- La cellule A1 contenait « 99 Construction Bonhomme de Neige » alors que le métier est « 155 test_wiki » : le CIS **ne vérifie pas** ce titre, l'import s'est fait quand même. Gardez quand même le bon nom pour vous y retrouver.
:::

## 5. L'onglet « Calculations »

Un fichier exporté depuis le CIS contient un second onglet, **Calculations**, qui décrit les méthodes de calcul (une ligne par calcul). La colonne **J** (*Calculation Row*) de chaque aspect indique la ligne du calcul utilisé. Si vous cochez **Import Calculations** à l'import, ces calculs sont recréés automatiquement.

> [!TIP]
> Le plus simple : créez vos calculs une première fois dans le CIS ([[marking-types]]), exportez, puis travaillez sur ce fichier. Vos calculs suivront à chaque réimport.`
    },
    en: {
      title: 'Fill in the marking scheme Excel file', short: 'The Excel file',
      summary: 'The file structure, column by column, with the snowman example and the 7 rules that prevent import errors.',
      objectives: ['Get the right template', 'Fill in each column without errors', 'Check your file before importing'],
      quick: [
        'Template: **Marking Scheme › Marking Scheme › Export** (format **CIS 5.0**)',
        '**CIS Marking Scheme Import** sheet: WSOS › Criteria › Sub-criteria',
        'Sub-criterion: A = ID, B = name, C = **day** (1, 2, 3)',
        'Aspect: D = **M** or **J**, E = description, I = **WSOS section**, K = **Max Mark**',
        'Measurement: H = Requirement as a **plain number**',
        'Judgement: 4 rows F = 0, 1, 2, 3 + description in G',
        'Total of Max Marks = **100**'
      ],
      body: `The marking scheme is prepared in **Excel**, then imported into the CIS. A well-filled file = an import without surprises.

## 1. Get the template

:::steps
1. In the CIS, open **Marking Scheme** › **Marking Scheme**.
2. At the bottom of the page, in *Export Marking Scheme*, keep the **CIS 5.0** format.
3. Click **Export**: you get your skill's file, with your WSOS sections already filled in.
:::

![Marking scheme export: format (1) and Export button (2)](assets/img/cis/ms-export-panel.png)

Example files to download:

- [Empty template exported from CIS v6](assets/files/modele-marking-scheme-cis-vide.xlsx)
- [“Snowman” example (marking scheme only)](assets/files/exemple-bonhomme-de-neige.xlsx)
- [“Snowman” example with the 7 calculation methods](assets/files/exemple-bonhomme-de-neige-avec-calculs.xlsx)

## 2. The 4 areas of the file

The first sheet, **CIS Marking Scheme Import**, holds the whole marking scheme:

![Excel file structure (snowman example)](assets/img/cis/excel-structure.png)

| Area | Rows | What goes there |
|---|---|---|
| 1. **WSOS** | top of the file | Section no. (A), name (B), weight in % (I). Columns J and K are calculated. |
| 2. **Criteria** | below “Criteria” | Letter (A), name (B), criterion total (K). |
| 3. **Criterion header** | dark blue row | Do not change: it opens a criterion table. |
| 4. **Sub-criteria and aspects** | below each header | One row per sub-criterion, then one row per aspect. |

## 3. The columns, one by one

| Col. | Name | Sub-criterion row | Aspect row |
|---|---|---|---|
| **A** | Sub Criterion ID | **A1**, A2… | empty |
| **B** | Sub Criterion Name | sub-criterion name | empty |
| **C** | Day of Marking | **day**: 1, 2 or 3 | empty |
| **D** | Aspect Type | empty | **M** (Measurement) or **J** (Judgement) |
| **E** | Aspect – Description | empty | what is marked |
| **F** | Judg Score | empty | J only: 0, 1, 2, 3 (one row each) |
| **G** | Extra Description | empty | help for the juror, or J score description |
| **H** | Requirement | empty | M only: expected value (**plain number**) |
| **I** | WSOS Section | empty | **WSOS section number** (1, 2, 3…) |
| **J** | Calculation Row | empty | filled by the CIS on export (do not touch) |
| **K** | Max Mark | empty | aspect **maximum mark** |

### A Measurement aspect

A single row: **D = M**, the description, the Requirement if needed, the WSOS section and the max mark.

| D | E | H | I | K |
|---|---|---|---|---|
| M | Right leg length, hip to ankle | 800 | 1 | 1.5 |

### A Judgement aspect

One row for the aspect (**D = J**), then **four rows** for scores 0 to 3 with their description in G:

| D | E | F | G | I | K |
|---|---|---|---|---|---|
| J | Right leg appearance | | | 1 | 3 |
| | | 0 | Poor | | |
| | | 1 | Acceptable with some flaws | | |
| | | 2 | Meets the standard | | |
| | | 3 | Excellent | | |

## 4. The 7 golden rules

> [!IMPORTANT] Check these points before every import
> 1. The **Max Marks** total exactly **100**.
> 2. **Every aspect** has a **WSOS section** number in column I.
> 3. **Every sub-criterion** has a **day** in column C.
> 4. The **Requirement** of an aspect that will be calculated is a **plain number**: 800, not “800 mm” or “300mm +- 15mm”.
> 5. Every **J** aspect has its **4 score rows** 0, 1, 2, 3.
> 6. IDs follow each other: A1, A2… in criterion A; B1… in criterion B.
> 7. Do not change the headers or the formulas in columns J and K of the WSOS area.

:::guided
### What we found when importing the snowman

- Aspects in criteria B to H had **no WSOS section**: the import worked, but the CIS shows a **97.5% variance** (see [[wsos]]).
- Requirements in sub-criterion A2 were written “300mm +- 15mm”: the CIS **ignores** them and no calculation can use them (see [[calc-ranged-score]]).
- Cell A1 said “99 Construction Bonhomme de Neige” while the skill is “155 test_wiki”: the CIS **does not check** this title, the import still worked. Keep the right name anyway, to find your way around.
:::

## 5. The “Calculations” sheet

A file exported from the CIS has a second sheet, **Calculations**, describing the calculation methods (one row per calculation). Column **J** (*Calculation Row*) of each aspect gives the row of the calculation used. If you tick **Import Calculations** when importing, these calculations are recreated automatically.

> [!TIP]
> The easiest way: create your calculations once in the CIS ([[marking-types]]), export, then work on that file. Your calculations will follow at every re-import.`
    }
  });

  /* ------------------------------------------------------------------ */
  P({
    id: 'marking-scheme', category: 'bareme', order: 2, step: 2, level: 'beginner',
    menuPath: 'Marking Scheme › Marking Scheme', prereq: ['excel-marking-scheme'], video: 'video-marking-scheme',
    tags: ['import', 'export', 'barème', 'vérifier', 'modifier', 'aspect', 'critère', 'wsos allocation', 'marking scheme'],
    fr: {
      title: 'Importer, vérifier et modifier le barème', short: 'Importer le barème',
      summary: 'Importer le fichier Excel dans le CIS, comprendre les 5 options, contrôler le résultat et faire de petites corrections directement en ligne.',
      objectives: ['Importer un barème sans écraser son travail', 'Lire le barème dans le CIS', 'Corriger un aspect directement dans le CIS', 'Exporter une sauvegarde'],
      quick: [
        '**Marking Scheme › Marking Scheme** › *Import Marking Scheme*',
        '**Choose File** › cocher les options › **Import** › **OK**',
        'Message attendu : **Import is complete**',
        'Contrôler : *Criterion Total* = 100 et encadré *WSOS Allocation*',
        'Flèche **›** = déplier un critère / sous-critère',
        'Un seul éditeur à la fois : « *currently being edited by…* »',
        'Sauvegarde : **Export** au format **CIS 5.0**'
      ],
      body: `## Importer le fichier

:::steps
1. Ouvrez **Marking Scheme** › **Marking Scheme**.
2. Dans le cadre *Import Marking Scheme*, cliquez sur **Choose File** et choisissez votre fichier Excel.
3. Cochez les options utiles (voir le tableau ci-dessous).
4. Cliquez sur **Import**.
5. Confirmez avec **OK** : le barème existant est **remplacé**.
6. Le message **Import is complete** s'affiche et le barème apparaît en haut de la page.
:::

![Le cadre d'import et ses options numérotées](assets/img/cis/ms-import-panel.png)

| N° | Option | Cocher ? |
|---|---|---|
| 1 | **Choose File** : le fichier .xlsx | — |
| 2 | **Import the WorldSkills Occupational Standard sections** | Seulement si vos sections WSOS ne sont **pas encore** dans le CIS, ou si elles ont changé |
| 3 | **Import Marking Scheme** | **Oui** (c'est le barème) |
| 4 | **Import Calculations** | Oui si votre fichier contient l'onglet *Calculations* |
| 5 | **Preserve existing marking schedule where possible** | **Oui** : garde les jours et équipes déjà saisis quand c'est possible |
| 6 | **Clear unused calculations from the Calculation Library** | Oui pour garder une bibliothèque propre |
| 7 | **Import** | Lance l'import |

![Confirmation : tout le barème existant sera effacé](assets/img/cis/ms-import-confirm.png)

> [!WARNING] L'import remplace tout
> Le barème présent dans le CIS est **entièrement effacé**. Avant de réimporter, faites un **Export** de sauvegarde. Si des notes ont déjà été saisies ou si le barème est verrouillé, l'import n'est plus possible.

## Vérifier le résultat

Après l'import, le haut de la page affiche les critères et leur note. Le **Criterion Total** doit être **100.00**.

![Barème importé : critères A à H](assets/img/cis/ms-criteria.png)

Cliquez sur la **flèche ›** d'un critère, puis d'un sous-critère, pour voir ses aspects :

![Sous-critère A1 déplié : aspects J (1) avec leurs scores (2), aspects M (3) avec leur Requirement (4), boutons d'ajout (5, 6)](assets/img/cis/ms-aspects.png)

- Les aspects **Judgement** (A1.J1, A1.J2…) s'affichent en premier, avec leurs 4 descriptions de score.
- Les aspects **Measurement** (A1.M1…) suivent, avec la colonne **Requirements** et la note max.
- Le petit champ **WSOS** de chaque aspect indique sa section.

À droite, l'encadré **WSOS Allocation** compare les points du barème (à gauche) au poids attendu (en gras) :

![Encadré WSOS Allocation](assets/img/cis/ms-wsos-allocation.png)

> [!TIP]
> Si un chiffre de gauche est très différent du chiffre en gras, des aspects ne sont pas rattachés à la bonne section WSOS. Voir [[wsos]].

## Corriger directement dans le CIS

Pour une petite correction, inutile de réimporter : quand vous êtes l'éditeur du barème, les champs sont **modifiables** en ligne.

- Modifier un texte ou une note : cliquez dans le champ et tapez, la sauvegarde est automatique.
- **Add Judgement Aspect** / **Add Measurement Aspect** : ajoute un aspect au sous-critère.
- **Croix rouge** : supprime l'aspect, le sous-critère ou le critère.

> [!NOTE] Un seul éditeur à la fois
> Si quelqu'un d'autre modifie déjà le barème, un bandeau rouge indique « *This marking scheme is currently being edited by …* » et les champs sont **grisés**. Attendez qu'il ait terminé, ou demandez-lui de quitter la page.

## Exporter une sauvegarde

En bas de la page, *Export Marking Scheme* : gardez le format **CIS 5.0** (le seul qui contient les calculs) et cliquez sur **Export**. Conservez ce fichier : c'est votre sauvegarde.

![Export du barème](assets/img/cis/ms-export-panel.png)`
    },
    en: {
      title: 'Import, check and edit the marking scheme', short: 'Import the marking scheme',
      summary: 'Import the Excel file into the CIS, understand the 5 options, check the result and make small corrections directly online.',
      objectives: ['Import a marking scheme without overwriting your work', 'Read the marking scheme in the CIS', 'Fix an aspect directly in the CIS', 'Export a backup'],
      quick: [
        '**Marking Scheme › Marking Scheme** › *Import Marking Scheme*',
        '**Choose File** › tick the options › **Import** › **OK**',
        'Expected message: **Import is complete**',
        'Check: *Criterion Total* = 100 and the *WSOS Allocation* box',
        'Arrow **›** = expand a criterion / sub-criterion',
        'One editor at a time: “*currently being edited by…*”',
        'Backup: **Export** in **CIS 5.0** format'
      ],
      body: `## Import the file

:::steps
1. Open **Marking Scheme** › **Marking Scheme**.
2. In the *Import Marking Scheme* box, click **Choose File** and pick your Excel file.
3. Tick the useful options (see the table below).
4. Click **Import**.
5. Confirm with **OK**: the existing marking scheme is **replaced**.
6. The message **Import is complete** appears and the marking scheme shows at the top of the page.
:::

![The import box and its numbered options](assets/img/cis/ms-import-panel.png)

| No. | Option | Tick? |
|---|---|---|
| 1 | **Choose File**: the .xlsx file | — |
| 2 | **Import the WorldSkills Occupational Standard sections** | Only if your WSOS sections are **not yet** in the CIS, or have changed |
| 3 | **Import Marking Scheme** | **Yes** (that's the marking scheme) |
| 4 | **Import Calculations** | Yes if your file contains the *Calculations* sheet |
| 5 | **Preserve existing marking schedule where possible** | **Yes**: keeps days and teams already set when possible |
| 6 | **Clear unused calculations from the Calculation Library** | Yes, to keep a clean library |
| 7 | **Import** | Starts the import |

![Confirmation: the whole existing marking scheme will be erased](assets/img/cis/ms-import-confirm.png)

> [!WARNING] Import replaces everything
> The marking scheme in the CIS is **entirely erased**. Before re-importing, make a backup **Export**. Once marks have been entered or the marking scheme is locked, import is no longer possible.

## Check the result

After the import, the top of the page lists the criteria and their marks. The **Criterion Total** must be **100.00**.

![Imported marking scheme: criteria A to H](assets/img/cis/ms-criteria.png)

Click the **arrow ›** of a criterion, then of a sub-criterion, to see its aspects:

![Sub-criterion A1 expanded: J aspects (1) with their scores (2), M aspects (3) with their Requirement (4), add buttons (5, 6)](assets/img/cis/ms-aspects.png)

- **Judgement** aspects (A1.J1, A1.J2…) come first, with their 4 score descriptions.
- **Measurement** aspects (A1.M1…) follow, with the **Requirements** column and max mark.
- The small **WSOS** field of each aspect shows its section.

On the right, the **WSOS Allocation** box compares the marking scheme marks (left) with the expected weight (bold):

![WSOS Allocation box](assets/img/cis/ms-wsos-allocation.png)

> [!TIP]
> If a left-hand figure is very different from the bold one, some aspects are not linked to the right WSOS section. See [[wsos]].

## Fix directly in the CIS

For a small fix, no need to re-import: when you are the marking scheme editor, fields are **editable** online.

- Change a text or mark: click the field and type; saving is automatic.
- **Add Judgement Aspect** / **Add Measurement Aspect**: adds an aspect to the sub-criterion.
- **Red cross**: deletes the aspect, sub-criterion or criterion.

> [!NOTE] One editor at a time
> If someone else is already editing the marking scheme, a red banner says “*This marking scheme is currently being edited by …*” and fields are **greyed out**. Wait until they finish, or ask them to leave the page.

## Export a backup

At the bottom of the page, *Export Marking Scheme*: keep the **CIS 5.0** format (the only one including calculations) and click **Export**. Keep this file: it is your backup.

![Marking scheme export](assets/img/cis/ms-export-panel.png)`
    }
  });

  /* ------------------------------------------------------------------ */
  P({
    id: 'wsos', category: 'bareme', order: 3, level: 'intermediate',
    menuPath: 'Marking Scheme › WS Occupational Standards', prereq: ['marking-scheme'],
    tags: ['wsos', 'wsss', 'standards', 'variance', 'répartition', 'sections', 'mark allocation'],
    fr: {
      title: 'WSOS : répartir les points selon le référentiel', short: 'WSOS et variance',
      summary: 'Les sections WSOS fixent le poids de chaque compétence. Le CIS compare votre barème à ces poids : la variance doit être proche de 0 %.',
      objectives: ['Comprendre ce que sont les sections WSOS', 'Lire la variance', 'Corriger un barème mal réparti'],
      quick: [
        'Sections : **Marking Scheme › WS Occupational Standards** (Edit / Remove / Add Section)',
        'Total des poids = **100**',
        'Chaque aspect → une section (colonne I de l’Excel)',
        'Contrôle : **Reports › WSOS Mark Allocation Table**',
        'Variance = somme des écarts entre poids voulu et points du barème',
        'Objectif : variance ≈ **0 %**'
      ],
      body: `Les **WSOS** (*WorldSkills Occupational Standards*) découpent le métier en **sections** (organisation du travail, communication, réalisation…). Chaque section a un **poids en %**. Le barème doit respecter ces poids.

## Voir et modifier les sections

**Marking Scheme** › **WS Occupational Standards** affiche les sections et leur importance. Les boutons **Edit**, **Remove** et **Add Section** permettent de les modifier. Le total doit faire **100**.

![Les 6 sections WSOS du métier test_wiki](assets/img/cis/wsos.png)

## Comment le CIS contrôle

Chaque aspect du barème est rattaché à une section (colonne **I** de l'Excel). Le CIS additionne les points des aspects de chaque section et les compare au poids attendu.

**Reports** › **WSOS Mark Allocation Table** montre le détail par critère :

![WSOS Mark Allocation Table du bonhomme de neige](assets/img/cis/report-wsos-table.png)

| Colonne | Signification |
|---|---|
| A, B, C… | Points de chaque critère attribués à la section |
| Total Marks Per Section | Total réel du barème pour la section |
| WSOS Marks Per Section | Poids attendu |
| **Variance** | Écart entre les deux (toujours positif) |

## Exemple : la variance de 97,5 % du bonhomme de neige

| Section | Attendu | Barème | Écart |
|---|---:|---:|---:|
| 1 – Organisation du travail | 7 | 10,5 | 3,5 |
| 2 – Communication | 3 | 5,5 | 2,5 |
| 3 – Interprétation des dessins | 5,5 | 18,5 | 13 |
| 4 – Modèles complexes | 4 | 3,5 | 0,5 |
| 5 – Conception de l'ouvrage | 75 | 0,5 | **74,5** |
| 6 – Finalisation | 5,5 | 2 | 3,5 |
| **Total** | 100 | 40,5 | **97,5** |

Pourquoi ? Seuls **40,5 points** sur 100 sont rattachés à une section : les aspects des critères C à H n'avaient **pas de numéro de section** dans l'Excel. Et la section 5, qui pèse 75 %, ne reçoit presque rien.

> [!TIP] Corriger en 3 étapes
> 1. Dans l'Excel, renseignez la colonne **I** de **chaque** aspect.
> 2. Répartissez les points pour que chaque section approche son poids (ici : beaucoup plus d'aspects en section 5).
> 3. Réimportez, puis vérifiez que la variance est proche de **0 %**.

Le rapport **Reports** › **Skill Status** affiche aussi la variance totale et deux graphiques côte à côte (WSOS voulu / barème réel) : voir [[reports]].`
    },
    en: {
      title: 'WSOS: distribute marks according to the standards', short: 'WSOS and variance',
      summary: 'WSOS sections set the weight of each competence. The CIS compares your marking scheme to these weights: the variance should be close to 0%.',
      objectives: ['Understand WSOS sections', 'Read the variance', 'Fix a poorly distributed marking scheme'],
      quick: [
        'Sections: **Marking Scheme › WS Occupational Standards** (Edit / Remove / Add Section)',
        'Total weight = **100**',
        'Each aspect → one section (column I in Excel)',
        'Check: **Reports › WSOS Mark Allocation Table**',
        'Variance = sum of the gaps between required weight and actual marks',
        'Target: variance ≈ **0%**'
      ],
      body: `The **WSOS** (*WorldSkills Occupational Standards*) split the skill into **sections** (work organisation, communication, production…). Each section has a **weight in %**. The marking scheme must respect these weights.

## See and edit sections

**Marking Scheme** › **WS Occupational Standards** lists the sections and their importance. **Edit**, **Remove** and **Add Section** let you change them. The total must be **100**.

![The 6 WSOS sections of skill test_wiki](assets/img/cis/wsos.png)

## How the CIS checks

Every aspect is linked to a section (column **I** in Excel). The CIS adds up the marks of each section's aspects and compares them with the expected weight.

**Reports** › **WSOS Mark Allocation Table** shows the detail per criterion:

![Snowman WSOS Mark Allocation Table](assets/img/cis/report-wsos-table.png)

| Column | Meaning |
|---|---|
| A, B, C… | Marks of each criterion given to the section |
| Total Marks Per Section | Actual marking scheme total for the section |
| WSOS Marks Per Section | Expected weight |
| **Variance** | Gap between the two (always positive) |

## Example: the snowman's 97.5% variance

| Section | Expected | Marking scheme | Gap |
|---|---:|---:|---:|
| 1 – Work organisation | 7 | 10.5 | 3.5 |
| 2 – Communication | 3 | 5.5 | 2.5 |
| 3 – Drawing interpretation | 5.5 | 18.5 | 13 |
| 4 – Complex models | 4 | 3.5 | 0.5 |
| 5 – Snow structure design | 75 | 0.5 | **74.5** |
| 6 – Finishing | 5.5 | 2 | 3.5 |
| **Total** | 100 | 40.5 | **97.5** |

Why? Only **40.5 marks** out of 100 are linked to a section: aspects in criteria C to H had **no section number** in Excel. And section 5, weighing 75%, gets almost nothing.

> [!TIP] Fix it in 3 steps
> 1. In Excel, fill in column **I** for **every** aspect.
> 2. Distribute marks so each section approaches its weight (here: many more aspects in section 5).
> 3. Re-import, then check the variance is close to **0%**.

**Reports** › **Skill Status** also shows the total variance and two side-by-side charts (required WSOS / actual marking scheme): see [[reports]].`
    }
  });

  /* ------------------------------------------------------------------ */
  P({
    id: 'lock-marking-scheme', category: 'bareme', order: 4, step: 5, level: 'beginner',
    menuPath: 'Marking Scheme › Marking Scheme', prereq: ['marking-scheme', 'marking-types', 'marking-days'],
    tags: ['verrouillage', 'lock', 'barème', 'draft', 'sign off'],
    fr: {
      title: 'Verrouiller le barème', short: 'Verrouiller le barème',
      summary: 'Le verrouillage fige le barème. Il est indispensable pour imprimer les feuilles de notation définitives et commencer la saisie.',
      objectives: ['Savoir quand verrouiller', 'Savoir ce que le verrouillage bloque', 'Vérifier que le barème est verrouillé'],
      quick: [
        'Avant : barème = 100, WSOS vérifiés, calculs testés, jours et équipes saisis',
        '**Accord des Team Leaders** obligatoire avant verrouillage',
        'Verrouillage : bouton **Lock Marking Scheme** (selon vos droits) ou CIS Master',
        'Contrôle : accueil › **Marking Scheme Locked = Yes**',
        'Après : plus d’import ni de modification',
        'Feuilles sans filigrane **Draft**'
      ],
      body: `Le **verrouillage** fige le barème : plus aucune modification n'est possible. C'est le feu vert pour imprimer les feuilles de notation et saisir les notes.

## Avant de verrouiller : la check-list

:::steps
1. Le barème totalise **100 points** (*Criterion Total* = 100.00).
2. La **variance WSOS** est proche de 0 % ([[wsos]]).
3. Les **calculs** sont posés et testés ([[marking-types]]).
4. Chaque sous-critère a un **jour** et une **équipe** ([[marking-days]], [[marking-team]]).
5. Une feuille *Marking scheme* a été imprimée et **relue** par l'équipe ([[marking-forms]]).
6. **Les Team Leaders ont vérifié le barème et donné leur accord.** Envoyez-leur le PDF *Marking scheme* et l'export Excel.
:::

## Verrouiller

Selon les droits de votre compte, le bouton **Lock Marking Scheme** apparaît sur la page **Marking Scheme** › **Marking Scheme**. Sur les compétitions WorldSkills France, le verrouillage est souvent fait par le **CIS Master**, une fois le barème relu par l'équipe **et validé par les Team Leaders**.

> [!IMPORTANT] Toujours faire vérifier par les Team Leaders
> Ne verrouillez **jamais** sans l'accord des Team Leaders : ils contrôlent les points, la répartition WSOS et les calculs. Après verrouillage, toute correction demande un déverrouillage et une signature.

> [!NOTE] Compte Expert de la base de formation
> Avec un compte Expert, nous n'avons pas trouvé de bouton de verrouillage : demandez au CIS Master de verrouiller votre métier.

## Vérifier que c'est fait

Sur la page d'accueil, la ligne **Marking Scheme Locked** passe à **Yes** (vert). Dans **Reports** › **Skill Status**, le cadre *Marking Progress* n'affiche plus « Marking scheme is not locked ».

![Avant verrouillage : Marking Scheme Locked = No](assets/img/cis/home-dashboard.png)

## Ce que le verrouillage change

| Avant | Après |
|---|---|
| Import et modifications possibles | Plus d'import ni de modification |
| Feuilles imprimées avec le filigrane **Draft** | Feuilles définitives |
| Feuilles « hand-written » refusées : « *Cannot create the selected type of marking form… has not been locked* » | Toutes les feuilles disponibles |
| Pas de saisie de notes | Saisie possible les jours de notation |

> [!WARNING]
> Une erreur découverte après le verrouillage nécessite un **déverrouillage** par le CIS Master et, souvent, une signature de modification (*Sign off form for Changed Marking Scheme*). Prenez le temps de relire avant !`
    },
    en: {
      title: 'Lock the marking scheme', short: 'Lock the marking scheme',
      summary: 'Locking freezes the marking scheme. It is required to print final marking forms and start mark entry.',
      objectives: ['Know when to lock', 'Know what locking blocks', 'Check that the marking scheme is locked'],
      quick: [
        'Before: scheme = 100, WSOS checked, calculations tested, days and teams set',
        '**Team Leaders’ approval** required before locking',
        'Locking: **Lock Marking Scheme** button (depending on rights) or CIS Master',
        'Check: home › **Marking Scheme Locked = Yes**',
        'After: no more import or editing',
        'Forms without the **Draft** watermark'
      ],
      body: `**Locking** freezes the marking scheme: no more changes are possible. It is the green light to print marking forms and enter marks.

## Before locking: the checklist

:::steps
1. The marking scheme totals **100 marks** (*Criterion Total* = 100.00).
2. The **WSOS variance** is close to 0% ([[wsos]]).
3. **Calculations** are set and tested ([[marking-types]]).
4. Every sub-criterion has a **day** and a **team** ([[marking-days]], [[marking-team]]).
5. A *Marking scheme* form was printed and **proofread** by the team ([[marking-forms]]).
6. **The Team Leaders have checked the marking scheme and approved it.** Send them the *Marking scheme* PDF and the Excel export.
:::

## Lock

Depending on your account rights, the **Lock Marking Scheme** button appears on **Marking Scheme** › **Marking Scheme**. At WorldSkills France competitions, locking is often done by the **CIS Master**, once the marking scheme has been proofread by the team **and approved by the Team Leaders**.

> [!IMPORTANT] Always have the Team Leaders check it
> **Never** lock without the Team Leaders' approval: they check marks, WSOS distribution and calculations. After locking, any correction requires unlocking and a signature.

> [!NOTE] Expert account on the training database
> With an Expert account we found no lock button: ask the CIS Master to lock your skill.

## Check that it's done

On the home page, the **Marking Scheme Locked** line turns **Yes** (green). In **Reports** › **Skill Status**, the *Marking Progress* box no longer says “Marking scheme is not locked”.

![Before locking: Marking Scheme Locked = No](assets/img/cis/home-dashboard.png)

## What locking changes

| Before | After |
|---|---|
| Import and edits possible | No more import or edits |
| Forms printed with the **Draft** watermark | Final forms |
| “Hand-written” forms refused: “*Cannot create the selected type of marking form… has not been locked*” | All forms available |
| No mark entry | Mark entry possible on marking days |

> [!WARNING]
> An error found after locking requires **unlocking** by the CIS Master and often a change sign-off (*Sign off form for Changed Marking Scheme*). Take time to proofread first!`
    }
  });
})();
