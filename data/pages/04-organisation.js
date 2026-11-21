/* CIS Wiki — Organiser la notation (CIS v6) */
(function () {
  'use strict';
  var P = window.WIKI_PAGE;

  /* ------------------------------------------------------------------ */
  P({
    id: 'marking-days', category: 'organisation', order: 1, step: 4, level: 'intermediate',
    menuPath: 'Marking Scheme › Marking Schedule', prereq: ['marking-scheme'], video: 'video-marking-days',
    tags: ['planning', 'jours', 'marking schedule', 'marking days', 'groupes', 'per competitor', 'any', 'day 1'],
    fr: {
      title: 'Planifier les jours de notation', short: 'Jours de notation',
      summary: 'Pour chaque sous-critère, choisir le jour où il est noté : le même jour pour tous, par groupe de compétiteurs ou par compétiteur.',
      objectives: ['Attribuer un jour à chaque sous-critère', 'Créer des groupes de compétiteurs', 'Imprimer le planning de notation'],
      quick: [
        '**Marking Scheme › Marking Schedule**',
        'Colonne *Marking Day* : **Day 1 / 2 / 3**, *Any*, *Per Competitor*, *Per Competitor Group*',
        'Les jours viennent de la colonne C de l’Excel',
        'Groupes : **Allocate Groups** › nom › **Create New Group** › **Add To Group** › **Close**',
        'Planning PDF : **Create PDF**',
        'Sauvegarde automatique · figé dès la 1ʳᵉ note saisie'
      ],
      body: `Le **jour de notation** dit au CIS quand chaque sous-critère sera noté. Il conditionne la saisie des notes et le tableau de bord (*Day 1 Marking Data*…).

## L'écran Marking Schedule

![Marking Schedule : jour (1), ajout d'un juré (2), superviseur (3), groupes (4), planning PDF (5)](assets/img/cis/schedule.png)

> [!TIP] Déjà rempli ?
> Si la colonne **Day of Marking** (C) de votre Excel était remplie, les jours sont **déjà en place** après l'import. Il suffit de vérifier.

## Choisir le jour d'un sous-critère

Dans la colonne **Marking Day**, choisissez une option pour chaque sous-critère. Chaque changement est **enregistré immédiatement**.

| Option | Quand l'utiliser |
|---|---|
| **Day 1**, **Day 2**, **Day 3** | Tous les compétiteurs sont notés **le même jour** |
| **Any** | Le sous-critère peut être noté **n'importe quel jour** |
| **Per Competitor Group** | Les compétiteurs passent **par groupes**, chaque groupe à un jour différent |
| **Per Competitor** | Chaque compétiteur a **son propre jour** (rotations individuelles) |

Avec *Per Competitor* ou *Per Competitor Group*, le bouton **Edit** de la ligne s'active : il ouvre une petite fenêtre où l'on indique le jour de chaque compétiteur ou groupe, puis **Save**.

## Créer des groupes de compétiteurs

:::steps
1. Cliquez sur **Allocate Groups** (en haut à gauche).
2. Tapez le nom du groupe (« Groupe A ») et cliquez sur **Create New Group**.
3. Sélectionnez des compétiteurs dans *Competitors not in a group*, sélectionnez le groupe, puis **Add To Group ›**.
4. Répétez pour chaque groupe. **‹ Disband Group** supprime un groupe.
5. Cliquez sur **Close**.
6. Pour les sous-critères concernés, choisissez **Per Competitor Group**, puis **Edit** pour donner un jour à chaque groupe.
:::

![La fenêtre Competitor Groups](assets/img/cis/schedule-groups.png)

> [!NOTE]
> Les groupes et l'option *Per Competitor* demandent que les compétiteurs soient **inscrits** dans le CIS. Sur un métier sans compétiteurs, la liste reste vide.

## Imprimer le planning

Le cadre **View Marking Schedule** › **Create PDF** produit un planning par jour : la date, les sous-critères et l'équipe de notation. Idéal à afficher dans l'atelier.

![Planning de notation (PDF) : jour 1](assets/img/cis/pdf-schedule.png)

> [!WARNING] Planning figé
> Dès qu'une note est saisie dans un sous-critère, son jour ne peut plus être modifié. Faites vos changements **avant** la compétition. En cas de réimport du barème, cochez **Preserve existing marking schedule** pour garder votre planning.`
    },
    en: {
      title: 'Plan the marking days', short: 'Marking days',
      summary: 'For each sub-criterion, choose the day it is marked: the same day for all, per competitor group or per competitor.',
      objectives: ['Assign a day to each sub-criterion', 'Create competitor groups', 'Print the marking schedule'],
      quick: [
        '**Marking Scheme › Marking Schedule**',
        '*Marking Day* column: **Day 1 / 2 / 3**, *Any*, *Per Competitor*, *Per Competitor Group*',
        'Days come from Excel column C',
        'Groups: **Allocate Groups** › name › **Create New Group** › **Add To Group** › **Close**',
        'Schedule PDF: **Create PDF**',
        'Saved automatically · frozen once the 1st mark is entered'
      ],
      body: `The **marking day** tells the CIS when each sub-criterion is marked. It drives mark entry and the dashboard (*Day 1 Marking Data*…).

## The Marking Schedule screen

![Marking Schedule: day (1), add a juror (2), supervisor (3), groups (4), schedule PDF (5)](assets/img/cis/schedule.png)

> [!TIP] Already filled in?
> If the **Day of Marking** column (C) of your Excel file was filled in, days are **already set** after the import. Just check them.

## Choose a sub-criterion's day

In the **Marking Day** column, choose an option for each sub-criterion. Every change is **saved immediately**.

| Option | When to use |
|---|---|
| **Day 1**, **Day 2**, **Day 3** | All competitors are marked **on the same day** |
| **Any** | The sub-criterion can be marked **on any day** |
| **Per Competitor Group** | Competitors work **in groups**, each group on a different day |
| **Per Competitor** | Each competitor has **their own day** (individual rotations) |

With *Per Competitor* or *Per Competitor Group*, the row's **Edit** button becomes active: it opens a small window to set each competitor's or group's day, then **Save**.

## Create competitor groups

:::steps
1. Click **Allocate Groups** (top left).
2. Type the group name (“Group A”) and click **Create New Group**.
3. Select competitors in *Competitors not in a group*, select the group, then **Add To Group ›**.
4. Repeat for each group. **‹ Disband Group** deletes a group.
5. Click **Close**.
6. For the relevant sub-criteria, choose **Per Competitor Group**, then **Edit** to give each group a day.
:::

![The Competitor Groups window](assets/img/cis/schedule-groups.png)

> [!NOTE]
> Groups and the *Per Competitor* option require competitors to be **registered** in the CIS. On a skill without competitors, the list stays empty.

## Print the schedule

The **View Marking Schedule** box › **Create PDF** produces a schedule per day: the date, sub-criteria and marking team. Ideal to post in the workshop.

![Marking schedule (PDF): day 1](assets/img/cis/pdf-schedule.png)

> [!WARNING] Frozen schedule
> Once a mark is entered in a sub-criterion, its day can no longer be changed. Make your changes **before** the competition. When re-importing the marking scheme, tick **Preserve existing marking schedule** to keep your schedule.`
    }
  });

  /* ------------------------------------------------------------------ */
  P({
    id: 'marking-team', category: 'organisation', order: 2, level: 'beginner',
    menuPath: 'Marking Scheme › Marking Schedule', prereq: ['marking-days'], video: 'video-marking-team',
    tags: ['jurés', 'équipe', 'marking team', 'superviseur', 'supervisor', 'expert marking load', 'charge'],
    fr: {
      title: 'Composer les équipes de notation', short: 'Équipes de notation',
      summary: 'Pour chaque sous-critère, choisir les jurés qui notent et le superviseur. Vérifier ensuite la charge de chaque juré.',
      objectives: ['Ajouter des jurés à un sous-critère', 'Désigner un superviseur', 'Équilibrer la charge des jurés'],
      quick: [
        '**Marking Scheme › Marking Schedule**',
        'Liste *Marking Team* › choisir un juré › **Add** (3 jurés pour le Judgement)',
        '**Supervisor** : choisir dans la liste › **Supervisor**',
        'Le superviseur **ne peut pas** faire partie de l’équipe',
        'Croix rouge = retirer un juré',
        'Contrôle : **Reports › Expert Marking Load**'
      ],
      body: `Chaque sous-critère est noté par une **équipe** (*Marking Team*). Pour les aspects **Judgement**, il faut **3 jurés** (leurs noms s'impriment sur les feuilles). Un **superviseur** contrôle la notation du sous-critère.

## Ajouter les jurés

:::steps
1. Ouvrez **Marking Scheme** › **Marking Schedule**.
2. Sur la ligne du sous-critère, cliquez dans la liste de la colonne **Marking Team** et choisissez un juré.
3. Cliquez sur **Add** : son nom s'affiche au-dessus de la liste.
4. Recommencez pour les autres jurés. La **croix rouge** retire un juré.
:::

![Équipe ajoutée sur le sous-critère A1](assets/img/cis/schedule.png)

> [!NOTE]
> La liste propose les comptes rattachés à votre métier. Un juré absent de la liste n'a pas de compte : demandez-le au CIS Master.

## Désigner le superviseur

Choisissez la personne dans la liste, puis cliquez sur **Supervisor** : son nom apparaît dans la colonne *Supervisor*.

> [!WARNING] Règle vérifiée
> Le superviseur **ne peut pas** être aussi juré du même sous-critère. Sinon, le CIS refuse avec le message « *The marking supervisor cannot also be part of the marking team* ».

## Vérifier la charge de chaque juré

**Reports** › **Expert Marking Load** compte, pour chaque juré, le nombre de sous-critères et d'aspects à noter, et le nombre de supervisions. Utile pour répartir équitablement le travail.

![Expert Marking Load](assets/img/cis/report-expert-load.png)

Le tableau de bord **Skill Status** indique aussi *Marking Teams Defined* (ex. 0 / 10) : toutes les lignes doivent avoir une équipe.

> [!TIP]
> Les noms des jurés sont imprimés dans les cases *Expert Score* des feuilles de notation : composez les équipes **avant** d'imprimer.`
    },
    en: {
      title: 'Build the marking teams', short: 'Marking teams',
      summary: 'For each sub-criterion, choose the jurors who mark and the supervisor. Then check each juror’s workload.',
      objectives: ['Add jurors to a sub-criterion', 'Appoint a supervisor', 'Balance jurors’ workload'],
      quick: [
        '**Marking Scheme › Marking Schedule**',
        '*Marking Team* list › choose a juror › **Add** (3 jurors for Judgement)',
        '**Supervisor**: pick in the list › **Supervisor**',
        'The supervisor **cannot** be in the team',
        'Red cross = remove a juror',
        'Check: **Reports › Expert Marking Load**'
      ],
      body: `Each sub-criterion is marked by a **team** (*Marking Team*). **Judgement** aspects need **3 jurors** (their names are printed on the forms). A **supervisor** oversees the sub-criterion's marking.

## Add jurors

:::steps
1. Open **Marking Scheme** › **Marking Schedule**.
2. On the sub-criterion row, click the **Marking Team** list and choose a juror.
3. Click **Add**: the name appears above the list.
4. Repeat for the other jurors. The **red cross** removes a juror.
:::

![Team added on sub-criterion A1](assets/img/cis/schedule.png)

> [!NOTE]
> The list shows accounts linked to your skill. A juror missing from the list has no account: ask the CIS Master.

## Appoint the supervisor

Choose the person in the list, then click **Supervisor**: the name appears in the *Supervisor* column.

> [!WARNING] Checked rule
> The supervisor **cannot** also be a juror on the same sub-criterion. Otherwise the CIS refuses with “*The marking supervisor cannot also be part of the marking team*”.

## Check each juror's workload

**Reports** › **Expert Marking Load** counts, for each juror, the sub-criteria and aspects to mark and the number of supervisions. Useful to share the work fairly.

![Expert Marking Load](assets/img/cis/report-expert-load.png)

The **Skill Status** dashboard also shows *Marking Teams Defined* (e.g. 0 / 10): every row needs a team.

> [!TIP]
> Juror names are printed in the *Expert Score* boxes of marking forms: build the teams **before** printing.`
    }
  });

  /* ------------------------------------------------------------------ */
  P({
    id: 'marking-forms', category: 'organisation', order: 3, step: 6, level: 'beginner',
    menuPath: 'Assessment › Marking Forms', prereq: ['lock-marking-scheme', 'marking-days'], video: 'video-marking-forms',
    tags: ['pdf', 'impression', 'feuilles de notation', 'marking forms', 'summary', 'sign off', 'draft', 'hand-written'],
    fr: {
      title: 'Imprimer les feuilles de notation', short: 'Feuilles de notation',
      summary: 'Les 8 types de documents PDF du CIS : barème à relire, récapitulatif, feuilles pour les jurés, feuilles complétées et formulaires de signature.',
      objectives: ['Choisir le bon type de feuille', 'Filtrer par sous-critère, compétiteur ou jour', 'Comprendre le filigrane Draft'],
      quick: [
        '**Assessment › Marking Forms** › *Form Type* › **Create PDF**',
        'Relecture : **Marking scheme** + **Mark Summary form** (possibles avant verrouillage)',
        'Notation : **Marking forms for hand-written marks** (barème verrouillé + compétiteurs)',
        'Après saisie : **Marking forms with completed marks**',
        '4 formulaires **Sign off** (barème, saisie, modifications)',
        'Option : *Hide Requirements for Measurement Aspects*'
      ],
      body: `## Générer un document

:::steps
1. Ouvrez **Assessment** › **Marking Forms**.
2. Choisissez le **Form Type**.
3. Réglez les filtres s'ils s'affichent (sous-critère, compétiteur, jour…).
4. Cliquez sur **Create PDF** : le fichier se télécharge.
:::

![Marking Forms : type « hand-written » et ses filtres](assets/img/cis/forms-panel.png)

## Les 8 types de documents

| Form Type | À quoi ça sert | Quand | Conditions |
|---|---|---|---|
| **Marking scheme** | Tout le barème, sous-critère par sous-critère, au format feuille de notation | Relecture avant verrouillage | Aucune (filigrane *Draft* tant que non verrouillé) |
| **Mark Summary form** | Récapitulatif d'un compétiteur : chaque critère et sous-critère par jour | Relecture, puis bilan | Aucune |
| **Marking forms for hand-written marks** | Les feuilles des **jurés**, à remplir à la main | Avant chaque jour de notation | Barème **verrouillé** + compétiteurs inscrits |
| **Marking forms with completed marks** | Les mêmes feuilles avec les **notes saisies** | Après la saisie, pour contrôle et signature | Notes saisies |
| **Sign off form for Marking Scheme** | Signature d'acceptation du barème | C-1 | Barème verrouillé |
| **Sign off form for Mark Entry** | Signature de la saisie d'un jour | Chaque soir | Choisir le jour |
| **Sign off form for Changed Marks** | Signature des notes modifiées | En cas de correction | Choisir le jour |
| **Sign off form for Changed Marking Scheme** | Signature d'une modification du barème | En cas de modification | Barème verrouillé |

## Lire une feuille de notation

![Feuille de notation du sous-critère A1 (barème non verrouillé : filigrane Draft)](assets/img/cis/pdf-marking-form.png)

- En haut : métier, sous-critère, compétiteur, équipe, jour, et deux cases de signature (*Marking Scheme Lock*, *Mark Entry Lock*).
- **JUDGEMENT MARKING** : les descriptions 0 à 3 et une case par juré (*Expert Score 0 to 3*).
- **MEASUREMENT MARKING** : le *Requirement*, une case **Result or Actual Value** pour la mesure et une case **Mark Awarded**.
- Une case *Mark Awarded* **grisée** signale un aspect **calculé** : le juré note la mesure, le CIS calcule la note.

> [!TIP] Masquer les valeurs attendues
> Cochez **Hide Requirements for Measurement Aspects** pour imprimer des feuilles sans la colonne *Requirement* (utile si les compétiteurs peuvent voir les feuilles).

![Mark Summary form : la grille par jour](assets/img/cis/pdf-summary.png)

> [!WARNING] Filigrane « Draft »
> Tant que le barème n'est pas verrouillé, chaque page porte un grand **Draft** en travers. Ces feuilles servent à **relire**, pas à noter. Voir [[lock-marking-scheme]].

## Messages fréquents

| Message | Signification |
|---|---|
| *Please select a marking form type* | Aucun type choisi |
| *Please select a day* | Ce formulaire (signature de saisie…) demande un jour |
| *This form cannot be generated when there are no Competitors for this skill* | Aucun compétiteur inscrit |
| *Cannot create the selected type of marking form for this Skill because the marking scheme has not been locked* | Verrouillez d'abord le barème |`
    },
    en: {
      title: 'Print the marking forms', short: 'Marking forms',
      summary: 'The 8 types of CIS PDF documents: marking scheme for proofreading, summary, juror forms, completed forms and sign-off forms.',
      objectives: ['Choose the right form type', 'Filter by sub-criterion, competitor or day', 'Understand the Draft watermark'],
      quick: [
        '**Assessment › Marking Forms** › *Form Type* › **Create PDF**',
        'Proofreading: **Marking scheme** + **Mark Summary form** (possible before locking)',
        'Marking: **Marking forms for hand-written marks** (locked scheme + competitors)',
        'After entry: **Marking forms with completed marks**',
        '4 **Sign off** forms (scheme, entry, changes)',
        'Option: *Hide Requirements for Measurement Aspects*'
      ],
      body: `## Generate a document

:::steps
1. Open **Assessment** › **Marking Forms**.
2. Choose the **Form Type**.
3. Set the filters if shown (sub-criterion, competitor, day…).
4. Click **Create PDF**: the file downloads.
:::

![Marking Forms: “hand-written” type and its filters](assets/img/cis/forms-panel.png)

## The 8 document types

| Form Type | Purpose | When | Conditions |
|---|---|---|---|
| **Marking scheme** | The whole marking scheme, sub-criterion by sub-criterion, as marking forms | Proofreading before locking | None (*Draft* watermark until locked) |
| **Mark Summary form** | A competitor summary: each criterion and sub-criterion per day | Proofreading, then results | None |
| **Marking forms for hand-written marks** | **Jurors'** forms, filled in by hand | Before each marking day | Scheme **locked** + registered competitors |
| **Marking forms with completed marks** | The same forms with the **entered marks** | After entry, for checking and signing | Marks entered |
| **Sign off form for Marking Scheme** | Marking scheme acceptance signature | C-1 | Scheme locked |
| **Sign off form for Mark Entry** | Signature of a day's mark entry | Each evening | Choose the day |
| **Sign off form for Changed Marks** | Signature of changed marks | When correcting | Choose the day |
| **Sign off form for Changed Marking Scheme** | Signature of a marking scheme change | When changing | Scheme locked |

## Read a marking form

![Marking form for sub-criterion A1 (scheme not locked: Draft watermark)](assets/img/cis/pdf-marking-form.png)

- Top: skill, sub-criterion, competitor, team, day, and two signature boxes (*Marking Scheme Lock*, *Mark Entry Lock*).
- **JUDGEMENT MARKING**: score descriptions 0 to 3 and one box per juror (*Expert Score 0 to 3*).
- **MEASUREMENT MARKING**: the *Requirement*, a **Result or Actual Value** box for the measurement and a **Mark Awarded** box.
- A **greyed** *Mark Awarded* box means a **calculated** aspect: the juror writes the measurement, the CIS calculates the mark.

> [!TIP] Hide expected values
> Tick **Hide Requirements for Measurement Aspects** to print forms without the *Requirement* column (useful if competitors can see the forms).

![Mark Summary form: the grid per day](assets/img/cis/pdf-summary.png)

> [!WARNING] “Draft” watermark
> Until the marking scheme is locked, every page shows a large **Draft** across it. These forms are for **proofreading**, not marking. See [[lock-marking-scheme]].

## Common messages

| Message | Meaning |
|---|---|
| *Please select a marking form type* | No type chosen |
| *Please select a day* | This form (entry sign-off…) needs a day |
| *This form cannot be generated when there are no Competitors for this skill* | No competitor registered |
| *Cannot create the selected type of marking form for this Skill because the marking scheme has not been locked* | Lock the marking scheme first |`
    }
  });
})();
