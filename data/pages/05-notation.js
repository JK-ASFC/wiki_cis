/* CIS Wiki — Noter et contrôler (CIS v6) */
(function () {
  'use strict';
  var P = window.WIKI_PAGE;
  var V5 = '> [!NOTE] Écran à confirmer en CIS v6\n> La base de formation utilisée pour ce wiki n’avait pas de compétiteurs inscrits : l’écran de saisie ci-dessous est décrit d’après le CIS 5. Le principe reste identique ; les captures seront mises à jour lors de la prochaine compétition.';
  var V5en = '> [!NOTE] Screen to be confirmed in CIS v6\n> The training database used for this wiki had no registered competitors: the entry screen below is described from CIS 5. The principle is the same; screenshots will be updated at the next competition.';

  /* ------------------------------------------------------------------ */
  P({
    id: 'enter-marks', category: 'notation', order: 1, step: 7, level: 'intermediate',
    menuPath: 'Assessment › Enter Marks', prereq: ['lock-marking-scheme', 'marking-days', 'marking-team'], video: 'video-enter-marks',
    tags: ['saisie', 'notes', 'enter marks', 'raccourcis', 'no attempt', 'measurement', 'judgement', 'clavier'],
    fr: {
      title: 'Saisir les notes', short: 'Saisir les notes',
      summary: 'Choisir le compétiteur, le jour et le sous-critère, puis saisir mesures et notes. Raccourcis clavier, calculs automatiques et No Attempt.',
      objectives: ['Trouver le bon formulaire de saisie', 'Saisir vite et sans erreur', 'Gérer un aspect non réalisé'],
      quick: [
        '**Assessment** › saisie des notes (apparaît quand le barème est verrouillé et les compétiteurs inscrits)',
        'Choisir **compétiteur** › **jour** › **sous-critère**',
        '++y++ = note max · ++n++ = zéro · flèches et ++Tab++ pour se déplacer',
        'Aspect calculé : saisir la **mesure**, la note s’affiche',
        'Non réalisé : cocher **No Attempt** (pas 0 !)',
        'Judgement : une note 0 à 3 par juré, 1 point d’écart maximum',
        'Sauvegarde automatique'
      ],
      body: V5 + `

## Ouvrir le bon formulaire

:::steps
1. Ouvrez **Assessment** › **Enter Marks** (ou cliquez sur la ligne *Day X Marking Data* du tableau de bord).
2. Choisissez le **compétiteur**.
3. Vérifiez le **jour** : si le planning est respecté, il est déjà bon.
4. Choisissez le **sous-critère** : la liste ne montre que ceux prévus ce jour-là pour ce compétiteur.
:::

En haut à droite, un bandeau rappelle le nombre d'aspects à noter dans le sous-critère et au total.

## Saisir les aspects Measurement

Chaque ligne a deux cases : la **valeur mesurée** (pour les aspects calculés) et la **note**.

| Situation | Que saisir |
|---|---|
| Aspect **sans calcul** | Directement la note. ++y++ = note max, ++n++ = 0 |
| Aspect **calculé** (Ranged, Regular…) | La **mesure** (ex. 804) : la note se calcule |
| **Pass/Fail** ou **Choice** | Le choix dans la liste |
| Méthode **comparative** | La mesure ; une **horloge** s'affiche jusqu'à ce que tous les compétiteurs soient saisis |
| Aspect **non réalisé** | Cochez **No Attempt** |

> [!WARNING] No Attempt, pas zéro
> Pour un aspect non réalisé, cochez **No Attempt**. Saisir 0 dans une méthode comparative fausse la note des **autres** compétiteurs (voir [[calc-percent-comparison]]).

> [!TIP] Saisir vite
> - Déplacez-vous avec les **flèches** et ++Tab++.
> - Le petit triangle à côté d'un aspect affiche l'aide saisie dans le barème (colonne *Extra Description*).
> - Il n'y a **pas de bouton Enregistrer** : chaque saisie est contrôlée et sauvegardée aussitôt.

## Saisir les aspects Judgement

Chaque juré de l'équipe a sa colonne : saisissez sa note de **0 à 3**. Le CIS calcule la note dans **Mark Awarded**. Le **+** affiche la description des 4 niveaux.

> [!IMPORTANT] Un point d'écart maximum
> Entre la note la plus basse et la plus haute d'un même aspect, l'écart ne doit pas dépasser **1 point**. Sinon les jurés **revotent**. Détails : [[judgement]].

## Après la saisie

- Vérifiez les oublis avec **Reports** › **Missing Marks** et les écarts avec **Assessment** › **Invalid Judgement Scores** ([[lock-marks]]).
- Imprimez **Marking forms with completed marks** pour la relecture et la signature ([[marking-forms]]).`
    },
    en: {
      title: 'Enter marks', short: 'Enter marks',
      summary: 'Choose the competitor, day and sub-criterion, then enter measurements and marks. Keyboard shortcuts, automatic calculations and No Attempt.',
      objectives: ['Find the right entry form', 'Enter quickly and without errors', 'Handle an aspect not attempted'],
      quick: [
        '**Assessment** › mark entry (shown once the scheme is locked and competitors registered)',
        'Choose **competitor** › **day** › **sub-criterion**',
        '++y++ = max mark · ++n++ = zero · arrows and ++Tab++ to move',
        'Calculated aspect: enter the **measurement**, the mark appears',
        'Not attempted: tick **No Attempt** (not 0!)',
        'Judgement: one 0–3 score per juror, 1 point gap at most',
        'Saved automatically'
      ],
      body: V5en + `

## Open the right form

:::steps
1. Open **Assessment** › **Enter Marks** (or click the *Day X Marking Data* line on the dashboard).
2. Choose the **competitor**.
3. Check the **day**: if the schedule is followed, it is already right.
4. Choose the **sub-criterion**: the list only shows those planned that day for that competitor.
:::

At the top right, a banner shows the number of aspects to mark in the sub-criterion and in total.

## Enter Measurement aspects

Each row has two boxes: the **measured value** (for calculated aspects) and the **mark**.

| Situation | What to enter |
|---|---|
| Aspect **without calculation** | The mark directly. ++y++ = max mark, ++n++ = 0 |
| **Calculated** aspect (Ranged, Regular…) | The **measurement** (e.g. 804): the mark is calculated |
| **Pass/Fail** or **Choice** | The choice in the list |
| **Comparative** method | The measurement; a **clock** shows until all competitors are entered |
| Aspect **not attempted** | Tick **No Attempt** |

> [!WARNING] No Attempt, not zero
> For an aspect not attempted, tick **No Attempt**. Entering 0 in a comparative method distorts **other** competitors' marks (see [[calc-percent-comparison]]).

> [!TIP] Enter quickly
> - Move with the **arrows** and ++Tab++.
> - The small triangle next to an aspect shows the help written in the marking scheme (*Extra Description* column).
> - There is **no Save button**: each entry is checked and saved immediately.

## Enter Judgement aspects

Each juror in the team has a column: enter their score from **0 to 3**. The CIS calculates the mark in **Mark Awarded**. The **+** shows the 4 level descriptions.

> [!IMPORTANT] One point gap at most
> Between the lowest and highest score on an aspect, the gap must not exceed **1 point**. Otherwise jurors **re-score**. Details: [[judgement]].

## After entry

- Check for gaps with **Reports** › **Missing Marks** and for score gaps with **Assessment** › **Invalid Judgement Scores** ([[lock-marks]]).
- Print **Marking forms with completed marks** for checking and signing ([[marking-forms]]).`
    }
  });

  /* ------------------------------------------------------------------ */
  P({
    id: 'judgement', category: 'notation', order: 2, level: 'intermediate',
    menuPath: 'Assessment › Invalid Judgement Scores', prereq: ['decouvrir-le-cis'],
    tags: ['judgement', 'jugement', '0 à 3', 'jurés', 'écart', 'invalid judgement scores', 'revote', 'subjectif'],
    fr: {
      title: 'Noter au jugement (Judgement)', short: 'Notation au jugement',
      summary: 'Trois jurés notent chacun de 0 à 3, sans concertation. Le CIS fait la moyenne et contrôle que les notes ne s’écartent pas de plus d’un point.',
      objectives: ['Comprendre l’échelle 0 à 3', 'Savoir comment le CIS calcule la note', 'Trouver et corriger les écarts trop grands'],
      quick: [
        '3 jurés · notes **0, 1, 2, 3** · vote simultané',
        'Écart max **1 point** entre jurés, sinon revote',
        'Note = moyenne des scores ÷ 3 × Max Mark',
        'Contrôle : **Assessment › Invalid Judgement Scores**',
        'Rédiger 4 descriptions claires dans l’Excel (F/G)'
      ],
      body: `Les aspects **Judgement** (J) évaluent une **qualité** : apparence, finition, présentation. Plusieurs jurés donnent chacun leur avis ; le CIS en fait une note.

## L'échelle de 0 à 3

| Score | Signification générale | Exemple (apparence de la jambe) |
|:---:|---|---|
| **0** | En dessous du standard du métier | Mauvais |
| **1** | Atteint le standard, avec des défauts | Correcte avec quelques défauts |
| **2** | Atteint le standard, bon niveau | Respecte le standard |
| **3** | Excellent, au-dessus du standard | Excellent |

Ces descriptions sont écrites dans l'Excel (colonnes F et G) et imprimées sur les feuilles de notation.

## Comment se passe un vote

:::steps
1. Chaque juré observe le travail **seul**, sans en parler.
2. Les jurés montrent leur score **en même temps** (cartes, doigts…).
3. Si l'écart entre le plus haut et le plus bas dépasse **1 point**, ils échangent leurs arguments puis **revotent**.
4. Les scores sont saisis dans le CIS, un par juré.
:::

## Comment le CIS calcule la note

Note = **(somme des scores ÷ nombre de jurés) ÷ 3 × Max Mark**, avec une Max Mark de **2 points au maximum** (règle WorldSkills ; à vérifier sur votre première saisie, la base de formation n'ayant pas de compétiteurs)

| Scores des 3 jurés | Moyenne | Max Mark 2 | Max Mark 1 |
|---|---:|---:|---:|
| 3 – 3 – 3 | 3 | 2,00 | 1,00 |
| 2 – 3 – 3 | 2,67 | 1,78 | 0,89 |
| 2 – 2 – 3 | 2,33 | 1,56 | 0,78 |
| 2 – 2 – 2 | 2 | 1,33 | 0,67 |
| 1 – 2 – 2 | 1,67 | 1,11 | 0,56 |
| 1 – 3 – 3 | — | **invalide** (écart 2) | |

## Trouver les écarts trop grands

**Assessment** › **Invalid Judgement Scores** liste les aspects où l'écart entre jurés dépasse 1 point. Filtrez par jour, sous-critère ou compétiteur.

![Invalid Judgement Scores : aucun score invalide](assets/img/cis/invalid-judgement.png)

> [!TIP] Avant de verrouiller les notes du jour
> Cette page doit afficher « *There are no invalid scores for the current filter settings* ». Sinon, faites revoter les jurés concernés et corrigez la saisie.`
    },
    en: {
      title: 'Judgement marking', short: 'Judgement marking',
      summary: 'Three jurors each score 0 to 3, without discussing. The CIS averages the scores and checks they are no more than one point apart.',
      objectives: ['Understand the 0 to 3 scale', 'Know how the CIS calculates the mark', 'Find and fix gaps that are too large'],
      quick: [
        '3 jurors · scores **0, 1, 2, 3** · simultaneous vote',
        'Max gap **1 point** between jurors, otherwise re-score',
        'Mark = average score ÷ 3 × Max Mark',
        'Check: **Assessment › Invalid Judgement Scores**',
        'Write 4 clear descriptions in Excel (F/G)'
      ],
      body: `**Judgement** aspects (J) assess **quality**: appearance, finish, presentation. Several jurors each give their opinion; the CIS turns it into a mark.

## The 0 to 3 scale

| Score | General meaning | Example (leg appearance) |
|:---:|---|---|
| **0** | Below the skill standard | Poor |
| **1** | Meets the standard, with flaws | Acceptable with some flaws |
| **2** | Meets the standard, good level | Meets the standard |
| **3** | Excellent, above the standard | Excellent |

These descriptions are written in Excel (columns F and G) and printed on the marking forms.

## How a vote works

:::steps
1. Each juror looks at the work **alone**, without talking.
2. Jurors show their score **at the same time** (cards, fingers…).
3. If the gap between highest and lowest exceeds **1 point**, they discuss and **re-score**.
4. Scores are entered in the CIS, one per juror.
:::

## How the CIS calculates the mark

Mark = **(sum of scores ÷ number of jurors) ÷ 3 × Max Mark**, with a Max Mark of **2 at most** (WorldSkills rule; check it on your first entry, as the training database had no competitors)

| 3 jurors' scores | Average | Max Mark 2 | Max Mark 1 |
|---|---:|---:|---:|
| 3 – 3 – 3 | 3 | 2.00 | 1.00 |
| 2 – 3 – 3 | 2.67 | 1.78 | 0.89 |
| 2 – 2 – 3 | 2.33 | 1.56 | 0.78 |
| 2 – 2 – 2 | 2 | 1.33 | 0.67 |
| 1 – 2 – 2 | 1.67 | 1.11 | 0.56 |
| 1 – 3 – 3 | — | **invalid** (gap 2) | |

## Find gaps that are too large

**Assessment** › **Invalid Judgement Scores** lists aspects where the gap between jurors exceeds 1 point. Filter by day, sub-criterion or competitor.

![Invalid Judgement Scores: no invalid scores](assets/img/cis/invalid-judgement.png)

> [!TIP] Before locking the day's marks
> This page must show “*There are no invalid scores for the current filter settings*”. Otherwise, have the jurors re-score and fix the entry.`
    }
  });

  /* ------------------------------------------------------------------ */
  P({
    id: 'lock-marks', category: 'notation', order: 3, level: 'intermediate',
    menuPath: 'Assessment › Lock Marks', prereq: ['enter-marks'],
    tags: ['verrouiller', 'notes', 'lock marks', 'missing marks', 'oublis', 'fin de journée', 'contrôle'],
    fr: {
      title: 'Contrôler et verrouiller les notes du jour', short: 'Verrouiller les notes',
      summary: 'Chaque soir : vérifier qu’il ne manque aucune note, qu’aucun score Judgement n’est invalide, puis verrouiller les notes du jour.',
      objectives: ['Repérer les notes manquantes', 'Verrouiller les notes d’un jour', 'Savoir quoi faire en cas d’erreur'],
      quick: [
        '1. **Reports › Missing Marks** : rien ne manque',
        '2. **Assessment › Invalid Judgement Scores** : aucun écart',
        '3. **Assessment › Lock Marks** : verrouiller le jour',
        'Tableau de bord : **Day X Marks Locked = Yes**',
        'Correction après verrouillage = *Sign off form for Changed Marks*'
      ],
      body: `## La routine de fin de journée

:::steps
1. **Reports** › **Missing Marks** : le tableau liste, par compétiteur et par jour, les notes encore attendues. Il doit être vide pour le jour.
2. **Assessment** › **Invalid Judgement Scores** : aucun écart de plus d'un point ([[judgement]]).
3. Imprimez **Marking forms with completed marks** et faites relire / signer ([[marking-forms]]).
4. **Assessment** › **Lock Marks** : verrouillez les notes du jour.
5. Sur le tableau de bord, **Day X Marks Locked** passe à **Yes**.
:::

![Missing Marks : notes manquantes par compétiteur et par jour](assets/img/cis/report-missing-marks.png)

![Lock Marks : sans compétiteur inscrit, la page indique « There are no Competitors registered for this skill »](assets/img/cis/lock-marks.png)

> [!NOTE]
> Sur la base de formation (aucun compétiteur), la page **Lock Marks** affiche seulement « *There are no Competitors registered for this skill* ». En compétition, elle présente les compétiteurs et les jours à verrouiller.

## Corriger une note après verrouillage

Une note verrouillée ne se modifie plus librement. Il faut :

1. faire déverrouiller le jour (selon vos droits, ou par le CIS Master) ;
2. corriger la note ;
3. imprimer et faire signer le **Sign off form for Changed Marks** ;
4. reverrouiller.`
    },
    en: {
      title: 'Check and lock the day’s marks', short: 'Lock the marks',
      summary: 'Every evening: check no mark is missing, no Judgement score is invalid, then lock the day’s marks.',
      objectives: ['Spot missing marks', 'Lock a day’s marks', 'Know what to do in case of error'],
      quick: [
        '1. **Reports › Missing Marks**: nothing missing',
        '2. **Assessment › Invalid Judgement Scores**: no gap',
        '3. **Assessment › Lock Marks**: lock the day',
        'Dashboard: **Day X Marks Locked = Yes**',
        'Fix after locking = *Sign off form for Changed Marks*'
      ],
      body: `## End-of-day routine

:::steps
1. **Reports** › **Missing Marks**: the table lists, per competitor and day, marks still expected. It must be empty for the day.
2. **Assessment** › **Invalid Judgement Scores**: no gap above one point ([[judgement]]).
3. Print **Marking forms with completed marks** and have them checked / signed ([[marking-forms]]).
4. **Assessment** › **Lock Marks**: lock the day's marks.
5. On the dashboard, **Day X Marks Locked** turns **Yes**.
:::

![Missing Marks: missing marks per competitor and day](assets/img/cis/report-missing-marks.png)

![Lock Marks: with no registered competitor, the page says “There are no Competitors registered for this skill”](assets/img/cis/lock-marks.png)

> [!NOTE]
> On the training database (no competitors), **Lock Marks** only shows “*There are no Competitors registered for this skill*”. In a competition, it lists competitors and days to lock.

## Fix a mark after locking

A locked mark can no longer be changed freely. You need to:

1. have the day unlocked (depending on your rights, or by the CIS Master);
2. fix the mark;
3. print and have the **Sign off form for Changed Marks** signed;
4. lock again.`
    }
  });

  /* ------------------------------------------------------------------ */
  P({
    id: 'reports', category: 'notation', order: 4, level: 'beginner',
    menuPath: 'Reports', prereq: ['marking-scheme'],
    tags: ['rapports', 'skill status', 'wsos table', 'expert marking load', 'missing marks', 'tableau de bord', 'graphiques'],
    fr: {
      title: 'Les rapports pour tout contrôler', short: 'Rapports',
      summary: 'Skill Status, WSOS Mark Allocation Table, Expert Marking Load et Missing Marks : quoi regarder, et quand.',
      objectives: ['Lire le Skill Status', 'Savoir quel rapport ouvrir selon la question'],
      quick: [
        '**Skill Status** : vue d’ensemble + graphiques',
        '**WSOS Mark Allocation Table** : répartition des points',
        '**Expert Marking Load** : charge des jurés',
        '**Missing Marks** : notes manquantes'
      ],
      body: `## Quel rapport pour quelle question ?

| Je veux savoir… | Rapport |
|---|---|
| Où en est mon métier ? | **Skill Status** |
| Mes points respectent-ils les WSOS ? | **WSOS Mark Allocation Table** ([[wsos]]) |
| Le travail est-il bien réparti entre jurés ? | **Expert Marking Load** ([[marking-team]]) |
| Manque-t-il des notes ? | **Missing Marks** ([[lock-marks]]) |

## Skill Status

![Skill Status du bonhomme de neige](assets/img/cis/report-skill-status.png)

| Cadre | Contenu |
|---|---|
| **Marking Scheme** | Nombre de critères, sous-critères, aspects ; points définis / 100 ; jours et équipes définis ; compétiteurs ; verrouillage |
| **Daily Marking Load** | Nombre d'aspects à noter chaque jour (graphique) |
| **WS Occupational Standards vs Marking Scheme** | Variance totale et deux anneaux : répartition voulue / réelle |
| **Measurement vs Judgement** | Part des points et des aspects en M (jaune) et en J (bleu) |
| **Marking Progress** | Avancement de la saisie (une fois le barème verrouillé) |

> [!TIP] Lecture rapide
> Pour le bonhomme de neige : 8 critères, 10 sous-critères, 22 aspects, 100 points, 10/10 jours, **0/10 équipes**, variance **97,5 %** et presque tout en Measurement. Deux actions à mener : composer les équipes et corriger les sections WSOS.`
    },
    en: {
      title: 'Reports to check everything', short: 'Reports',
      summary: 'Skill Status, WSOS Mark Allocation Table, Expert Marking Load and Missing Marks: what to look at, and when.',
      objectives: ['Read the Skill Status', 'Know which report answers which question'],
      quick: [
        '**Skill Status**: overview + charts',
        '**WSOS Mark Allocation Table**: mark distribution',
        '**Expert Marking Load**: juror workload',
        '**Missing Marks**: missing marks'
      ],
      body: `## Which report for which question?

| I want to know… | Report |
|---|---|
| Where is my skill at? | **Skill Status** |
| Do my marks follow the WSOS? | **WSOS Mark Allocation Table** ([[wsos]]) |
| Is work well shared between jurors? | **Expert Marking Load** ([[marking-team]]) |
| Are marks missing? | **Missing Marks** ([[lock-marks]]) |

## Skill Status

![Snowman Skill Status](assets/img/cis/report-skill-status.png)

| Box | Content |
|---|---|
| **Marking Scheme** | Number of criteria, sub-criteria, aspects; marks defined / 100; days and teams defined; competitors; locking |
| **Daily Marking Load** | Number of aspects to mark each day (chart) |
| **WS Occupational Standards vs Marking Scheme** | Total variance and two rings: required / actual distribution |
| **Measurement vs Judgement** | Share of marks and aspects in M (yellow) and J (blue) |
| **Marking Progress** | Mark entry progress (once the scheme is locked) |

> [!TIP] Quick reading
> For the snowman: 8 criteria, 10 sub-criteria, 22 aspects, 100 marks, 10/10 days, **0/10 teams**, **97.5%** variance and almost everything in Measurement. Two actions: build the teams and fix the WSOS sections.`
    }
  });

  /* ------------------------------------------------------------------ */
  P({
    id: 'results', category: 'notation', order: 5, step: 8, level: 'beginner',
    menuPath: 'Assessment › Marking Forms', prereq: ['lock-marks'],
    tags: ['résultats', 'classement', 'pdf', 'completed marks', 'summary', 'fin de compétition'],
    fr: {
      title: 'Résultats : feuilles complétées et récapitulatifs', short: 'Résultats',
      summary: 'Après la saisie et le verrouillage : imprimer les feuilles complétées, les récapitulatifs par compétiteur et les formulaires de signature.',
      objectives: ['Imprimer les feuilles avec les notes', 'Imprimer le récapitulatif d’un compétiteur'],
      quick: [
        '**Assessment › Marking Forms**',
        '**Marking forms with completed marks** › Create PDF',
        '**Mark Summary form** par compétiteur',
        'Classement : publié par l’organisation (CIS Master)'
      ],
      body: `:::steps
1. Vérifiez que **tous les jours** sont verrouillés (tableau de bord : *Day X Marks Locked = Yes*).
2. **Assessment** › **Marking Forms** › **Marking forms with completed marks** › **Create PDF** : les feuilles de chaque sous-critère avec les notes saisies.
3. **Mark Summary form** : le récapitulatif d'un compétiteur, critère par critère et jour par jour, avec le total.
4. Faites signer les documents prévus par l'organisation.
:::

![Mark Summary form : récapitulatif par critère et par jour](assets/img/cis/pdf-summary.png)

> [!NOTE] Le classement
> Le classement final et la proclamation sont gérés par l'organisation (CIS Master). Les Experts n'ont pas besoin d'un menu de classement pour terminer leur notation.`
    },
    en: {
      title: 'Results: completed forms and summaries', short: 'Results',
      summary: 'After entry and locking: print completed forms, per-competitor summaries and sign-off forms.',
      objectives: ['Print forms with marks', 'Print a competitor summary'],
      quick: [
        '**Assessment › Marking Forms**',
        '**Marking forms with completed marks** › Create PDF',
        '**Mark Summary form** per competitor',
        'Ranking: published by the organisers (CIS Master)'
      ],
      body: `:::steps
1. Check that **every day** is locked (dashboard: *Day X Marks Locked = Yes*).
2. **Assessment** › **Marking Forms** › **Marking forms with completed marks** › **Create PDF**: each sub-criterion's forms with the entered marks.
3. **Mark Summary form**: a competitor's summary, criterion by criterion and day by day, with the total.
4. Have the documents required by the organisers signed.
:::

![Mark Summary form: summary per criterion and per day](assets/img/cis/pdf-summary.png)

> [!NOTE] The ranking
> The final ranking and announcement are handled by the organisers (CIS Master). Experts don't need a ranking menu to finish their marking.`
    }
  });
})();
