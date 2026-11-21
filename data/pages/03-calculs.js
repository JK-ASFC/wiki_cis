/* CIS Wiki — Méthodes de calcul (CIS v6). Tous les exemples chiffrés ont été vérifiés dans le CIS. */
(function () {
  'use strict';
  var P = window.WIKI_PAGE;
  var MENU = 'Marking Scheme › Calculations';

  /* ------------------------------------------------------------------ */
  P({
    id: 'marking-types', category: 'calculs', order: 1, step: 3, level: 'intermediate',
    menuPath: MENU, prereq: ['marking-scheme'],
    tags: ['calculs', 'calculations', 'marking types', 'méthode', 'bibliothèque', 'library', 'add new', 'test calculation', 'formules'],
    fr: {
      title: 'Calculs automatiques : choisir la bonne méthode', short: 'Choisir sa méthode',
      summary: 'Le CIS v6 sait calculer une note à partir d’une mesure. Voici les 7 méthodes, comment choisir la vôtre et comment la poser sur un aspect.',
      objectives: ['Choisir la méthode adaptée à chaque aspect mesuré', 'Ajouter, réutiliser, modifier et supprimer un calcul', 'Tester un calcul avant la compétition'],
      quick: [
        '**Marking Scheme › Calculations** › choisir le *Sub Criterion*',
        'Par aspect M : **Add New** ou **Add from Library (shared)**',
        'Fenêtre : *Calculation Type* › *Add to Library* + *Name* › paramètres › **Test Calculation** › **Save**',
        'Aspect calculé : badge bleu + **Edit** / **Copy** / **Remove**',
        'Calculs : aspects **Measurement** uniquement',
        'Comparatives (Percent, Stepped) : notes calculées quand **toutes** les valeurs sont saisies'
      ],
      body: `Un **calcul** transforme une **valeur saisie** (une longueur, un temps, un choix…) en **note**. Les jurés saisissent ce qu'ils mesurent, le CIS fait le calcul : moins d'erreurs et une notation identique pour tous.

> [!NOTE]
> Les calculs ne concernent que les aspects **Measurement** (M). Un aspect M sans calcul se note directement (note saisie à la main). Les aspects **Judgement** (J) se notent de 0 à 3 : voir [[judgement]].

## Les 7 méthodes en un coup d'œil

| Méthode | Le juré saisit… | Le CIS donne… | Compare les compétiteurs ? |
|---|---|---|:---:|
| [[calc-pass-fail|Pass/Fail]] | Réussi ou Échoué | tout ou rien | Non |
| [[calc-choice|Choice]] | une option parmi 5 maximum | la note moins la déduction de l'option | Non |
| [[calc-number-completed|Number Completed]] | un nombre réalisé | la proportion de la note | Non |
| [[calc-ranged-score|Ranged Score]] | une mesure | une déduction selon la plage de tolérance | Non |
| [[calc-regular-difference|Regular Difference Deduction]] | une mesure | une déduction à chaque pas d'écart | Non |
| [[calc-percent-comparison|Percent Score Comparison]] | une mesure | une note proportionnelle entre le meilleur et le moins bon | **Oui** |
| [[calc-stepped-comparison|Stepped Score Comparison]] | une mesure | une déduction par palier d'écart avec le meilleur | **Oui** |

## Quelle méthode pour mon aspect ?

Répondez aux questions dans l'ordre :

:::steps
1. **C'est oui ou non ?** (ça fonctionne / ça ne fonctionne pas) → [[calc-pass-fail|Pass/Fail]].
2. **Le juré choisit entre quelques niveaux** (conforme, défaut mineur, défaut majeur…) → [[calc-choice|Choice]].
3. **On compte des éléments réalisés** sur un total connu (8 tests sur 10) → [[calc-number-completed|Number Completed]].
4. **Il y a une cote cible avec des tolérances** (800 mm ± 5) → [[calc-ranged-score|Ranged Score]] si vous voulez des plages libres, [[calc-regular-difference|Regular Difference Deduction]] si la déduction est régulière (−0,5 point tous les 5 mm).
5. **Il n'y a pas de cible : le meilleur gagne** (le plus rapide, le plus grand nombre, le moins de matière) → [[calc-percent-comparison|Percent Score Comparison]] pour une note proportionnelle, [[calc-stepped-comparison|Stepped Score Comparison]] pour des paliers.
:::

> [!TIP] Des exemples pour votre métier
> La page [[calc-exemples-metiers|Exemples par métier]] propose un exemple par méthode pour chacun des 57 métiers.

## Poser un calcul sur un aspect

:::steps
1. Ouvrez **Marking Scheme** › **Calculations**.
2. Dans **Sub Criterion**, choisissez le sous-critère (1) : ses aspects Measurement s'affichent.
3. Sur la ligne de l'aspect, cliquez sur **Add New** (4) pour créer un calcul, ou sur **Add from Library (shared)** pour réutiliser un calcul existant.
4. Dans la fenêtre, choisissez le **Calculation Type**, cochez **Add to Library** et donnez un **Name** clair si vous voulez le réutiliser.
5. Remplissez les paramètres, puis **testez** dans le cadre *Test Calculation* (voir plus bas).
6. Cliquez sur **Save** : le nom du calcul apparaît en **badge bleu** (2) à côté de l'aspect.
:::

![Page Calculations : choix du sous-critère (1), calcul posé (2), boutons Edit / Copy / Remove (3), boutons d'ajout (4)](assets/img/cis/calc-assign.png)

| Bouton | Effet |
|---|---|
| **Edit** | Modifie le calcul de l'aspect |
| **Copy** | Crée une copie modifiable (pratique pour une variante) |
| **Remove** | Retire le calcul : l'aspect redevient en saisie directe |

> [!TIP] Remplissage automatique
> Ouverte depuis un aspect, la fenêtre reprend automatiquement le **Requirement** et la **Max Mark** de l'aspect dans le testeur.

## Réutiliser un calcul : la bibliothèque

Un calcul enregistré avec **Add to Library** rejoint la **Calculation Library** (en bas de la page). Pour l'appliquer à un autre aspect : **Add from Library (shared)** › choisissez le calcul › **Save**.

![Ajout depuis la bibliothèque](assets/img/cis/calc-add-from-library.png)

![La Calculation Library du bonhomme de neige : un calcul par méthode](assets/img/cis/calc-library.png)

> [!WARNING] Bibliothèque partagée
> Modifier un calcul de la bibliothèque (bouton **Edit** de la bibliothèque) le modifie **pour tous les aspects** qui l'utilisent. Pour un seul aspect, utilisez plutôt **Copy**.

Exemple : *Longueur jambe 800 mm (±5 / ±10 / ±15)* est utilisé sur A1.M1 (jambe droite) **et** A1.M4 (jambe gauche). Avec **Use Aspect Requirements for Target Value**, le même calcul sert pour des aspects de cibles différentes.

## Tester avant la compétition

Chaque fenêtre de calcul contient le cadre **Test Calculation (Optional)** : saisissez une **Max Mark** et jusqu'à **5 valeurs**, la note apparaît en dessous. C'est le meilleur moyen de vérifier vos réglages.

![Le testeur intégré : 5 valeurs et la note obtenue](assets/img/cis/calc-ranged-score.png)

Ce wiki propose aussi un **simulateur** sur chaque page de méthode : il reproduit les calculs du CIS (vérifiés sur 46 cas) et accepte plus de 5 valeurs.

## Les règles vérifiées dans le CIS

> [!IMPORTANT] À retenir
> - **Un aspect vaut 2 points maximum** (Max Mark ≤ 2). Pour un élément plus important, découpez-le en plusieurs aspects.
> - Les notes sont **arrondies à 2 décimales** (1,875 → 1,88).
> - Une note n'est jamais **négative** ni supérieure à la Max Mark.
> - Pour utiliser le **Requirement** comme cible, il doit contenir un **nombre seul**. « 300mm +- 15mm » est ignoré : le calcul ne donne rien et le message « *Target value missing from calculation* » apparaît.
> - Méthodes **comparatives** : si **une seule** valeur manque ou n'est pas un nombre, **aucune** note n'est calculée. Un **0** est une vraie valeur (il compte dans la comparaison).`
    },
    en: {
      title: 'Automatic calculations: choose the right method', short: 'Choose your method',
      summary: 'CIS v6 can calculate a mark from a measurement. Here are the 7 methods, how to choose yours and how to set it on an aspect.',
      objectives: ['Choose the right method for each measured aspect', 'Add, reuse, edit and remove a calculation', 'Test a calculation before the competition'],
      quick: [
        '**Marking Scheme › Calculations** › choose the *Sub Criterion*',
        'For each M aspect: **Add New** or **Add from Library (shared)**',
        'Window: *Calculation Type* › *Add to Library* + *Name* › settings › **Test Calculation** › **Save**',
        'Calculated aspect: blue badge + **Edit** / **Copy** / **Remove**',
        'Calculations: **Measurement** aspects only',
        'Comparative (Percent, Stepped): marks calculated when **all** values are entered'
      ],
      body: `A **calculation** turns an **entered value** (a length, a time, a choice…) into a **mark**. Jurors enter what they measure, the CIS does the maths: fewer errors and the same marking for everyone.

> [!NOTE]
> Calculations only apply to **Measurement** (M) aspects. An M aspect without a calculation is marked directly (mark typed in). **Judgement** (J) aspects are scored 0 to 3: see [[judgement]].

## The 7 methods at a glance

| Method | The juror enters… | The CIS gives… | Compares competitors? |
|---|---|---|:---:|
| [[calc-pass-fail|Pass/Fail]] | Pass or Fail | all or nothing | No |
| [[calc-choice|Choice]] | one option out of up to 5 | the mark minus the option's deduction | No |
| [[calc-number-completed|Number Completed]] | a number achieved | the matching share of the mark | No |
| [[calc-ranged-score|Ranged Score]] | a measurement | a deduction depending on the tolerance range | No |
| [[calc-regular-difference|Regular Difference Deduction]] | a measurement | a deduction for each step of difference | No |
| [[calc-percent-comparison|Percent Score Comparison]] | a measurement | a proportional mark between best and worst | **Yes** |
| [[calc-stepped-comparison|Stepped Score Comparison]] | a measurement | a deduction per step away from the best | **Yes** |

## Which method for my aspect?

Answer the questions in order:

:::steps
1. **Is it yes or no?** (works / doesn't work) → [[calc-pass-fail|Pass/Fail]].
2. **The juror picks between a few levels** (compliant, minor defect, major defect…) → [[calc-choice|Choice]].
3. **You count items completed** out of a known total (8 tests out of 10) → [[calc-number-completed|Number Completed]].
4. **There is a target with tolerances** (800 mm ± 5) → [[calc-ranged-score|Ranged Score]] for free ranges, [[calc-regular-difference|Regular Difference Deduction]] for a regular deduction (−0.5 mark every 5 mm).
5. **No target: the best wins** (fastest, most items, least material) → [[calc-percent-comparison|Percent Score Comparison]] for a proportional mark, [[calc-stepped-comparison|Stepped Score Comparison]] for steps.
:::

> [!TIP] Examples for your skill
> The [[calc-exemples-metiers|Examples per skill]] page gives one example per method for each of the 57 skills.

## Set a calculation on an aspect

:::steps
1. Open **Marking Scheme** › **Calculations**.
2. In **Sub Criterion**, choose the sub-criterion (1): its Measurement aspects are listed.
3. On the aspect's row, click **Add New** (4) to create a calculation, or **Add from Library (shared)** to reuse an existing one.
4. In the window, choose the **Calculation Type**, tick **Add to Library** and give a clear **Name** if you want to reuse it.
5. Fill in the settings, then **test** in the *Test Calculation* box (see below).
6. Click **Save**: the calculation name appears as a **blue badge** (2) next to the aspect.
:::

![Calculations page: sub-criterion choice (1), calculation set (2), Edit / Copy / Remove buttons (3), add buttons (4)](assets/img/cis/calc-assign.png)

| Button | Effect |
|---|---|
| **Edit** | Changes the aspect's calculation |
| **Copy** | Creates an editable copy (handy for a variant) |
| **Remove** | Removes the calculation: the aspect goes back to direct entry |

> [!TIP] Automatic pre-fill
> When opened from an aspect, the window automatically copies the aspect's **Requirement** and **Max Mark** into the tester.

## Reuse a calculation: the library

A calculation saved with **Add to Library** joins the **Calculation Library** (bottom of the page). To apply it to another aspect: **Add from Library (shared)** › choose the calculation › **Save**.

![Adding from the library](assets/img/cis/calc-add-from-library.png)

![The snowman Calculation Library: one calculation per method](assets/img/cis/calc-library.png)

> [!WARNING] Shared library
> Editing a library calculation (library **Edit** button) changes it **for every aspect** using it. For a single aspect, use **Copy** instead.

Example: *Longueur jambe 800 mm (±5 / ±10 / ±15)* is used on A1.M1 (right leg) **and** A1.M4 (left leg). With **Use Aspect Requirements for Target Value**, the same calculation works for aspects with different targets.

## Test before the competition

Every calculation window has a **Test Calculation (Optional)** box: enter a **Max Mark** and up to **5 values**, the mark appears underneath. It is the best way to check your settings.

![The built-in tester: 5 values and the resulting mark](assets/img/cis/calc-ranged-score.png)

This wiki also offers a **simulator** on each method page: it reproduces CIS calculations (checked on 46 cases) and accepts more than 5 values.

## Rules checked in the CIS

> [!IMPORTANT] Remember
> - **An aspect is worth 2 marks at most** (Max Mark ≤ 2). For a bigger item, split it into several aspects.
> - Marks are **rounded to 2 decimals** (1.875 → 1.88).
> - A mark is never **negative** nor above the Max Mark.
> - To use the **Requirement** as target, it must be a **plain number**. “300mm +- 15mm” is ignored: the calculation gives nothing and “*Target value missing from calculation*” appears.
> - **Comparative** methods: if **a single** value is missing or not a number, **no** mark is calculated. A **0** is a real value (it counts in the comparison).`
    }
  });

  /* ------------------------------------------------------------------ */
  P({
    id: 'calc-pass-fail', category: 'calculs', order: 2, level: 'beginner',
    menuPath: MENU, prereq: ['marking-types'],
    tags: ['pass/fail', 'pass fail', 'réussi', 'échoué', 'oui non', 'tout ou rien', 'binaire'],
    fr: {
      title: 'Pass/Fail : tout ou rien', short: 'Pass/Fail',
      summary: 'Le juré indique Réussi ou Échoué : la note est la note maximale ou zéro. Aucun paramètre.',
      objectives: ['Reconnaître un aspect « tout ou rien »', 'Poser un calcul Pass/Fail'],
      quick: ['Calculation Type : **Pass/Fail**', 'Aucun paramètre', 'Pass = **Max Mark** · Fail = **0**'],
      body: `**En une phrase** : la fonction marche ou ne marche pas, l'élément est présent ou absent.

| | |
|---|---|
| **Quand l'utiliser** | Un critère binaire : « le circuit est étanche », « le programme démarre », « l'hygiène des mains est faite » |
| **Paramètres** | Aucun (*There are no configuration options for this calculation type*) |
| **Formule** | Pass → **Max Mark** · Fail → **0** |
| **Compare les compétiteurs** | Non |

![Pass/Fail dans le CIS : testé avec une Max Mark de 2](assets/img/cis/calc-pass-fail.png)

## Exemple vérifié dans le CIS

Bonhomme de neige, *H1 – Les concurrents ont utilisé les vêtements chauds appropriés à tout moment*, Max Mark = 2 :

| Compétiteur | Saisie | Note CIS |
|---|---|---:|
| 1 | Pass | 2,00 |
| 2 | Fail | 0,00 |
| 3 | Pass | 2,00 |

::calc[passfail]{"max":2,"values":["pass","fail","pass"]}

> [!TIP] Pass/Fail ou saisie directe ?
> Sans calcul, un aspect M se note aussi en tapant ++y++ (note max) ou ++n++ (zéro). Pass/Fail rend le choix **explicite** pour le juré et sur les feuilles, ce qui évite les erreurs de frappe.

## Exemples par métier

::trades[passfail]`
    },
    en: {
      title: 'Pass/Fail: all or nothing', short: 'Pass/Fail',
      summary: 'The juror chooses Pass or Fail: the mark is the max mark or zero. No settings.',
      objectives: ['Recognise an all-or-nothing aspect', 'Set a Pass/Fail calculation'],
      quick: ['Calculation Type: **Pass/Fail**', 'No settings', 'Pass = **Max Mark** · Fail = **0**'],
      body: `**In one sentence**: the function works or doesn't, the item is there or not.

| | |
|---|---|
| **When to use** | A binary criterion: “the circuit is leak-tight”, “the program starts”, “hand hygiene is done” |
| **Settings** | None (*There are no configuration options for this calculation type*) |
| **Formula** | Pass → **Max Mark** · Fail → **0** |
| **Compares competitors** | No |

![Pass/Fail in the CIS: tested with a Max Mark of 2](assets/img/cis/calc-pass-fail.png)

## Example checked in the CIS

Snowman, *H1 – Competitors wore appropriate warm clothing at all times*, Max Mark = 2:

| Competitor | Entry | CIS mark |
|---|---|---:|
| 1 | Pass | 2.00 |
| 2 | Fail | 0.00 |
| 3 | Pass | 2.00 |

::calc[passfail]{"max":2,"values":["pass","fail","pass"]}

> [!TIP] Pass/Fail or direct entry?
> Without a calculation, an M aspect can also be marked by typing ++y++ (max mark) or ++n++ (zero). Pass/Fail makes the choice **explicit** for the juror and on the forms, which avoids typing errors.

## Examples per skill

::trades[passfail]`
    }
  });

  /* ------------------------------------------------------------------ */
  P({
    id: 'calc-choice', category: 'calculs', order: 3, level: 'beginner',
    menuPath: MENU, prereq: ['marking-types'],
    tags: ['choice', 'choix', 'niveaux', 'conforme', 'défaut', 'déduction', 'liste'],
    fr: {
      title: 'Choice : choisir un niveau', short: 'Choice',
      summary: 'Le juré choisit une option dans une liste (5 au maximum). Chaque option retire un nombre de points ou un pourcentage de la note.',
      objectives: ['Définir des niveaux clairs', 'Choisir entre déduction en points ou en %'],
      quick: ['Calculation Type : **Choice**', '**Mark Deduction Type** : *Number of Marks* ou *Percentage of Marks*', 'Jusqu’à **5 choix** : libellé + déduction', 'Note = Max Mark − déduction (jamais < 0)'],
      body: `**En une phrase** : le juré choisit le niveau qui correspond à ce qu'il voit, le CIS retire la déduction associée.

| | |
|---|---|
| **Quand l'utiliser** | Quelques niveaux bien décrits : conforme / défaut mineur / défaut majeur / absent |
| **Paramètres** | *Mark Deduction Type* (points ou %), puis **Choice 1 à 5** : un libellé et une déduction |
| **Formule** | Note = Max Mark − déduction (en %, déduction = Max Mark × % ÷ 100) |
| **Compare les compétiteurs** | Non |

![Choice dans le CIS : 4 niveaux en pourcentage, Max Mark 2](assets/img/cis/calc-choice.png)

## Exemple vérifié dans le CIS

Bonhomme de neige, *C1 – Veste adaptée*, Max Mark = 2, déduction en **pourcentage** :

| Choix | Déduction | Calcul | Note CIS |
|---|---:|---|---:|
| Conforme | 0 % | 2 − 0 | 2,00 |
| Défaut mineur | 25 % | 2 − 0,5 | 1,50 |
| Défaut majeur | 50 % | 2 − 1 | 1,00 |
| Absente | 100 % | 2 − 2 | 0,00 |

Le même principe en **nombre de points** (Max Mark = 2 ; déductions 0 / 0,5 / 1 / 2) donne 2,00 / 1,50 / 1,00 / 0,00.

::calc[choice]{"max":2,"dtype":"percent","choices":[["Conforme",0],["Défaut mineur",25],["Défaut majeur",50],["Absente",100]],"values":["Conforme","Défaut mineur","Défaut majeur","Absente"]}

> [!TIP] Bien rédiger les choix
> - Gardez des libellés **courts et observables** : « 1 à 2 défauts visibles » plutôt que « moyen ».
> - Préférez le **pourcentage** si le calcul sert à plusieurs aspects de notes différentes (bibliothèque).
> - Une option sans libellé n'apparaît pas dans la liste.

## Choice ou Judgement ?

**Choice** sert à constater un **fait** (présent, conforme, nombre de défauts). Pour une appréciation de **qualité** par plusieurs jurés, utilisez un aspect [[judgement|Judgement]].

## Exemples par métier

::trades[choice]`
    },
    en: {
      title: 'Choice: pick a level', short: 'Choice',
      summary: 'The juror picks an option from a list (up to 5). Each option removes a number of marks or a percentage of the mark.',
      objectives: ['Define clear levels', 'Choose between marks or % deduction'],
      quick: ['Calculation Type: **Choice**', '**Mark Deduction Type**: *Number of Marks* or *Percentage of Marks*', 'Up to **5 choices**: label + deduction', 'Mark = Max Mark − deduction (never < 0)'],
      body: `**In one sentence**: the juror picks the level matching what they see, the CIS removes the related deduction.

| | |
|---|---|
| **When to use** | A few well-described levels: compliant / minor defect / major defect / missing |
| **Settings** | *Mark Deduction Type* (marks or %), then **Choice 1 to 5**: a label and a deduction |
| **Formula** | Mark = Max Mark − deduction (in %, deduction = Max Mark × % ÷ 100) |
| **Compares competitors** | No |

![Choice in the CIS: 4 levels in percentage, Max Mark 2](assets/img/cis/calc-choice.png)

## Example checked in the CIS

Snowman, *C1 – Suitable jacket*, Max Mark = 2, **percentage** deduction:

| Choice | Deduction | Calculation | CIS mark |
|---|---:|---|---:|
| Compliant | 0% | 2 − 0 | 2.00 |
| Minor defect | 25% | 2 − 0.5 | 1.50 |
| Major defect | 50% | 2 − 1 | 1.00 |
| Missing | 100% | 2 − 2 | 0.00 |

The same idea in **number of marks** (Max Mark = 2; deductions 0 / 0.5 / 1 / 2) gives 2.00 / 1.50 / 1.00 / 0.00.

::calc[choice]{"max":2,"dtype":"percent","choices":[["Compliant",0],["Minor defect",25],["Major defect",50],["Missing",100]],"values":["Compliant","Minor defect","Major defect","Missing"]}

> [!TIP] Writing good choices
> - Keep labels **short and observable**: “1 to 2 visible defects” rather than “average”.
> - Prefer **percentage** if the calculation is used on several aspects with different marks (library).
> - An option without a label is not listed.

## Choice or Judgement?

**Choice** records a **fact** (present, compliant, number of defects). For a **quality** assessment by several jurors, use a [[judgement|Judgement]] aspect.

## Examples per skill

::trades[choice]`
    }
  });

  /* ------------------------------------------------------------------ */
  P({
    id: 'calc-number-completed', category: 'calculs', order: 4, level: 'beginner',
    menuPath: MENU, prereq: ['marking-types'],
    tags: ['number completed', 'nombre', 'proportion', 'quantité', 'réalisé', 'number possible'],
    fr: {
      title: 'Number Completed : la part réalisée', short: 'Number Completed',
      summary: 'Le juré saisit un nombre d’éléments réalisés : la note est proportionnelle au nombre possible.',
      objectives: ['Compter des éléments réalisés', 'Régler le Number Possible'],
      quick: ['Calculation Type : **Number Completed**', 'Paramètre : **Number Possible**', 'Note = valeur ÷ Number Possible × Max Mark', 'Valeur > Number Possible = pas de note'],
      body: `**En une phrase** : 6 éléments réussis sur 8 donnent 6/8 de la note.

| | |
|---|---|
| **Quand l'utiliser** | On compte des éléments réalisés sur un total connu : tests réussis, pièces conformes, étapes respectées |
| **Paramètre** | **Number Possible** : le nombre maximum |
| **Formule** | Note = **valeur ÷ Number Possible × Max Mark** |
| **Compare les compétiteurs** | Non |

![Number Completed dans le CIS : 6 possibles, Max Mark 2](assets/img/cis/calc-number-completed.png)

## Exemple vérifié dans le CIS

*F1 – Nombre de boutons posés sur la veste*, Number Possible = 6, Max Mark = 2 :

| Compétiteur | Boutons posés | Calcul | Note CIS |
|---|---:|---|---:|
| 1 | 6 | 6 ÷ 6 × 2 | 2,00 |
| 2 | 5 | 5 ÷ 6 × 2 | 1,67 |
| 3 | 4 | 4 ÷ 6 × 2 | 1,33 |
| 4 | 3 | 3 ÷ 6 × 2 | 1,00 |
| 5 | 0 | 0 ÷ 6 × 2 | 0,00 |

::calc[completed]{"max":2,"possible":6,"values":[6,5,4,3,0]}

> [!WARNING] Valeur trop grande
> Une valeur **supérieure** au Number Possible ne donne **aucune note** (testé : 10 pour 8 possibles → case vide, message « *Value should be in range from 0 to 8* »). Vérifiez le Number Possible avant la compétition.

## Exemples par métier

::trades[completed]`
    },
    en: {
      title: 'Number Completed: the share achieved', short: 'Number Completed',
      summary: 'The juror enters a number of items completed: the mark is proportional to the number possible.',
      objectives: ['Count completed items', 'Set the Number Possible'],
      quick: ['Calculation Type: **Number Completed**', 'Setting: **Number Possible**', 'Mark = value ÷ Number Possible × Max Mark', 'Value > Number Possible = no mark'],
      body: `**In one sentence**: 6 items done out of 8 give 6/8 of the mark.

| | |
|---|---|
| **When to use** | Counting completed items out of a known total: tests passed, compliant parts, steps followed |
| **Setting** | **Number Possible**: the maximum number |
| **Formula** | Mark = **value ÷ Number Possible × Max Mark** |
| **Compares competitors** | No |

![Number Completed in the CIS: 6 possible, Max Mark 2](assets/img/cis/calc-number-completed.png)

## Example checked in the CIS

*F1 – Number of buttons sewn on the jacket*, Number Possible = 6, Max Mark = 2:

| Competitor | Buttons | Calculation | CIS mark |
|---|---:|---|---:|
| 1 | 6 | 6 ÷ 6 × 2 | 2.00 |
| 2 | 5 | 5 ÷ 6 × 2 | 1.67 |
| 3 | 4 | 4 ÷ 6 × 2 | 1.33 |
| 4 | 3 | 3 ÷ 6 × 2 | 1.00 |
| 5 | 0 | 0 ÷ 6 × 2 | 0.00 |

::calc[completed]{"max":2,"possible":6,"values":[6,5,4,3,0]}

> [!WARNING] Value too high
> A value **above** the Number Possible gives **no mark** (tested: 10 out of 8 possible → empty, message “*Value should be in range from 0 to 8*”). Check the Number Possible before the competition.

## Examples per skill

::trades[completed]`
    }
  });

  /* ------------------------------------------------------------------ */
  P({
    id: 'calc-ranged-score', category: 'calculs', order: 5, level: 'intermediate',
    menuPath: MENU, prereq: ['marking-types'],
    tags: ['ranged score', 'plages', 'tolérance', 'cible', 'target', 'requirement', 'diff', 'cote'],
    fr: {
      title: 'Ranged Score : des plages de tolérance', short: 'Ranged Score',
      summary: 'Jusqu’à 10 plages autour d’une valeur cible. Chaque plage indique la tolérance sous la cible, au-dessus, et la déduction.',
      objectives: ['Remplir correctement les colonnes − Diff et + Diff', 'Ordonner les plages', 'Utiliser le Requirement comme cible'],
      quick: [
        'Calculation Type : **Ranged Score**',
        '**Target Value** ou ☑ **Use Aspect Requirements**',
        'Plage = **− Diff** (sous la cible) · **+ Diff** (au-dessus) · **Deduct**',
        'Écarts en **nombres positifs** : 5 / 5, et non −5 / +5',
        'Plages de la plus serrée à la plus large ; la **1ʳᵉ qui convient** s’applique',
        'Valeur = cible → note max ; hors plages → **0**'
      ],
      body: `**En une phrase** : plus la mesure est proche de la cible, moins on perd de points, avec des plages que vous définissez librement.

| | |
|---|---|
| **Quand l'utiliser** | Une cote cible avec des tolérances : 800 mm ± 5 = tous les points, ± 10 = −0,5… |
| **Paramètres** | **Target Value** *ou* **Use Aspect Requirements for Target Value** · **Mark Deduction Type** (points ou %) · **Range 1 à 10** |
| **Compare les compétiteurs** | Non |

![Ranged Score dans le CIS : cible 800, trois plages, Max Mark 1,5](assets/img/cis/calc-ranged-score.png)

## Comment remplir une plage

Chaque ligne **Range** a trois cases, nommées dans le CIS **− Diff**, **+ Diff** et **Deduct** :

| Case | Signification | Exemple |
|---|---|---|
| **− Diff** | Tolérance **sous** la cible (nombre positif) | 5 = jusqu'à 795 |
| **+ Diff** | Tolérance **au-dessus** de la cible (nombre positif) | 5 = jusqu'à 805 |
| **Deduct** | Points (ou %) retirés si la valeur tombe dans cette plage | 0,5 |

> [!WARNING] Le piège n° 1 : les signes moins
> Saisissez des écarts **positifs**. Avec « −5 » dans *− Diff*, le CIS ne reconnaît plus les valeurs sous la cible : testé, **797 donne 0** au lieu de la note maximale. Écrivez **5** dans les deux cases pour « ± 5 ».

## Comment le CIS calcule

:::steps
1. Si la valeur est **exactement** la cible → **note maximale**.
2. Sinon, le CIS parcourt les plages **dans l'ordre** (Range 1, puis 2…) et prend la **première** qui contient l'écart. Les bornes sont **incluses** (805 est dans « + Diff = 5 »).
3. Note = Max Mark − Deduct.
4. Si aucune plage ne convient → **0**.
:::

> [!TIP] Ordonnez de la plus serrée à la plus large
> Comme la première plage qui convient l'emporte, une plage large placée en premier « avale » les autres. Testé : avec Range 1 = ±10 (−0,5) puis Range 2 = ±5 (0), la valeur 803 reçoit **1,50** au lieu de 2,00.

## Exemple vérifié dans le CIS

*A1.M1 – Longueur de la jambe droite*, cible **800 mm** (Requirement), Max Mark = 1,5 :

| Plage | − Diff | + Diff | Deduct |
|---|---:|---:|---:|
| Range 1 | 5 | 5 | 0 |
| Range 2 | 10 | 10 | 0,5 |
| Range 3 | 15 | 15 | 1 |

| Mesure | Écart | Plage | Note CIS |
|---:|---:|---|---:|
| 800 | 0 | cible exacte | 1,50 |
| 804 | +4 | Range 1 | 1,50 |
| 808 | +8 | Range 2 | 1,00 |
| 813 | +13 | Range 3 | 0,50 |
| 790 | −10 | Range 2 | 1,00 |
| 820 | +20 | aucune | 0,00 |

::calc[ranged]{"max":1.5,"target":800,"dtype":"marks","ranges":[[5,5,0],[10,10,0.5],[15,15,1]],"values":[800,804,808,813,790,820]}

## Plages asymétriques

Les deux cases sont indépendantes : *− Diff = 0* et *+ Diff = 5* signifie « rien en dessous, jusqu'à 5 au-dessus ». Testé (cible 800, Max 2, déduction 0,5) : 803 → **1,50**, **797 → 0,00**.

## Déduction en pourcentage

Avec **Percentage of Marks**, *Deduct* est un % de la Max Mark. Testé (Max Mark 2) : plages ±5 → 0 %, ±10 → 25 %, ±15 → 50 % ; 808 → **1,50**, 812 → **1,00**, 816 → **0,00**.

## Utiliser le Requirement comme cible

Cochez **Use Aspect Requirements for Target Value** : la cible devient la colonne *Requirement* de chaque aspect. Un seul calcul sert alors pour plusieurs aspects (jambe droite et jambe gauche à 800 mm, mollets à 100 mm…).

> [!IMPORTANT]
> Le Requirement doit être un **nombre seul**. Testé avec « 300mm +- 15mm » : le CIS ne lit aucune cible, aucune note n'est calculée et le message « *Target value missing from calculation* » apparaît.

## Exemples par métier

::trades[ranged]`
    },
    en: {
      title: 'Ranged Score: tolerance ranges', short: 'Ranged Score',
      summary: 'Up to 10 ranges around a target value. Each range gives the tolerance below the target, above it, and the deduction.',
      objectives: ['Fill in the − Diff and + Diff columns correctly', 'Order the ranges', 'Use the Requirement as target'],
      quick: [
        'Calculation Type: **Ranged Score**',
        '**Target Value** or ☑ **Use Aspect Requirements**',
        'Range = **− Diff** (below target) · **+ Diff** (above) · **Deduct**',
        'Gaps as **positive numbers**: 5 / 5, not −5 / +5',
        'Ranges from tightest to widest; the **first match** applies',
        'Value = target → max mark; outside all ranges → **0**'
      ],
      body: `**In one sentence**: the closer the measurement is to the target, the fewer marks are lost, with ranges you define freely.

| | |
|---|---|
| **When to use** | A target dimension with tolerances: 800 mm ± 5 = full marks, ± 10 = −0.5… |
| **Settings** | **Target Value** *or* **Use Aspect Requirements for Target Value** · **Mark Deduction Type** (marks or %) · **Range 1 to 10** |
| **Compares competitors** | No |

![Ranged Score in the CIS: target 800, three ranges, Max Mark 1.5](assets/img/cis/calc-ranged-score.png)

## How to fill in a range

Each **Range** row has three boxes, labelled in the CIS **− Diff**, **+ Diff** and **Deduct**:

| Box | Meaning | Example |
|---|---|---|
| **− Diff** | Tolerance **below** the target (positive number) | 5 = down to 795 |
| **+ Diff** | Tolerance **above** the target (positive number) | 5 = up to 805 |
| **Deduct** | Marks (or %) removed if the value falls in this range | 0.5 |

> [!WARNING] Trap no. 1: minus signs
> Enter **positive** gaps. With “−5” in *− Diff*, the CIS no longer recognises values below the target: tested, **797 gives 0** instead of the max mark. Write **5** in both boxes for “± 5”.

## How the CIS calculates

:::steps
1. If the value is **exactly** the target → **max mark**.
2. Otherwise the CIS goes through the ranges **in order** (Range 1, then 2…) and takes the **first** one containing the gap. Limits are **inclusive** (805 is inside “+ Diff = 5”).
3. Mark = Max Mark − Deduct.
4. If no range matches → **0**.
:::

> [!TIP] Order from tightest to widest
> As the first matching range wins, a wide range placed first “swallows” the others. Tested: with Range 1 = ±10 (−0.5) then Range 2 = ±5 (0), the value 803 gets **1.50** instead of 2.00.

## Example checked in the CIS

*A1.M1 – Right leg length*, target **800 mm** (Requirement), Max Mark = 1.5:

| Range | − Diff | + Diff | Deduct |
|---|---:|---:|---:|
| Range 1 | 5 | 5 | 0 |
| Range 2 | 10 | 10 | 0.5 |
| Range 3 | 15 | 15 | 1 |

| Measurement | Gap | Range | CIS mark |
|---:|---:|---|---:|
| 800 | 0 | exact target | 1.50 |
| 804 | +4 | Range 1 | 1.50 |
| 808 | +8 | Range 2 | 1.00 |
| 813 | +13 | Range 3 | 0.50 |
| 790 | −10 | Range 2 | 1.00 |
| 820 | +20 | none | 0.00 |

::calc[ranged]{"max":1.5,"target":800,"dtype":"marks","ranges":[[5,5,0],[10,10,0.5],[15,15,1]],"values":[800,804,808,813,790,820]}

## Asymmetric ranges

The two boxes are independent: *− Diff = 0* and *+ Diff = 5* means “nothing below, up to 5 above”. Tested (target 800, Max 2, deduction 0.5): 803 → **1.50**, **797 → 0.00**.

## Percentage deduction

With **Percentage of Marks**, *Deduct* is a % of the Max Mark. Tested (Max Mark 2): ranges ±5 → 0%, ±10 → 25%, ±15 → 50%; 808 → **1.50**, 812 → **1.00**, 816 → **0.00**.

## Use the Requirement as target

Tick **Use Aspect Requirements for Target Value**: the target becomes each aspect's *Requirement* column. One calculation then serves several aspects (right and left leg at 800 mm, calves at 100 mm…).

> [!IMPORTANT]
> The Requirement must be a **plain number**. Tested with “300mm +- 15mm”: the CIS reads no target, no mark is calculated and “*Target value missing from calculation*” appears.

## Examples per skill

::trades[ranged]`
    }
  });

  /* ------------------------------------------------------------------ */
  P({
    id: 'calc-regular-difference', category: 'calculs', order: 6, level: 'intermediate',
    menuPath: MENU, prereq: ['marking-types'],
    tags: ['regular difference deduction', 'déduction régulière', 'pas', 'écart', 'tolérance', 'cible', 'pourcentage'],
    fr: {
      title: 'Regular Difference Deduction : une déduction par pas', short: 'Regular Difference',
      summary: 'Le CIS retire la même quantité de points à chaque pas d’écart avec la cible. Simple à régler, idéal pour une tolérance régulière.',
      objectives: ['Régler le pas et la déduction', 'Comprendre l’arrondi par pas entiers'],
      quick: [
        'Calculation Type : **Regular Difference Deduction**',
        '**Target Value** ou ☑ **Use Aspect Requirements**',
        '**Measurement Difference Type** : unité ou %',
        '**Difference Amount** = taille d’un pas · **Deduction Amount** = points (ou %) par pas',
        'Note = Max − ENT(|écart| ÷ pas) × déduction, minimum 0'
      ],
      body: `**En une phrase** : « −0,5 point par tranche complète de 5 mm d'écart ».

| | |
|---|---|
| **Quand l'utiliser** | Une cible et une pénalité régulière, au-dessus comme en dessous |
| **Paramètres** | **Target Value** *ou* **Use Aspect Requirements** · **Measurement Difference Type** (*Unit of Measurement* / *Percentage Difference*) · **Difference Amount** · **Mark Deduction Type** (points / %) · **Deduction Amount** |
| **Formule** | Note = Max Mark − **ENT**(\|valeur − cible\| ÷ pas) × déduction, jamais sous 0 |
| **Compare les compétiteurs** | Non |

**ENT** = partie entière : on ne compte que les **pas complets**. 4,9 mm d'écart avec un pas de 5 = 0 pas.

![Regular Difference Deduction dans le CIS : cible 100, pas 5, −0,25 point](assets/img/cis/calc-regular-difference.png)

## Exemple vérifié dans le CIS

Cible **800 mm**, pas de **5 mm**, **−0,5 point** par pas, Max Mark = 2 :

| Mesure | Écart | Pas complets | Calcul | Note CIS |
|---:|---:|---:|---|---:|
| 800 | 0 | 0 | 2 − 0 | 2,00 |
| 804,9 | 4,9 | 0 | 2 − 0 | 2,00 |
| 805 | 5 | 1 | 2 − 0,5 | 1,50 |
| 809,99 | 9,99 | 1 | 2 − 0,5 | 1,50 |
| 790 | 10 | 2 | 2 − 1 | 1,00 |
| 815 | 15 | 3 | 2 − 1,5 | 0,50 |
| 830 | 30 | 6 | 2 − 3 → 0 | 0,00 |

::calc[regular]{"max":2,"target":800,"diffType":"unit","difference":5,"dtype":"marks","deduction":0.5,"values":[800,804.9,805,809.99,790,815,830]}

## Les variantes

| Réglage | Effet | Testé (cible 800, Max 2) |
|---|---|---|
| *Percentage Difference*, pas 1 | Le pas est un **% de la cible** (1 % de 800 = 8 mm) | 804 → 2,00 · 808 → 1,50 · 790 → 1,50 |
| *Percentage of Marks*, 10 | Chaque pas retire **10 % de la Max Mark** (0,2 pt) | 805 → 1,80 · 825 → 1,00 · 851 → 0,00 |

> [!TIP] Ranged Score ou Regular Difference ?
> Si votre barème dit « −X points tous les Y mm », prenez **Regular Difference** : un seul réglage. Si les tolérances sont irrégulières (0 jusqu'à 5, puis −1 jusqu'à 8, puis tout), prenez [[calc-ranged-score|Ranged Score]].

## Exemples par métier

::trades[regular]`
    },
    en: {
      title: 'Regular Difference Deduction: one deduction per step', short: 'Regular Difference',
      summary: 'The CIS removes the same amount of marks for each step away from the target. Simple to set, ideal for a regular tolerance.',
      objectives: ['Set the step and the deduction', 'Understand rounding down to whole steps'],
      quick: [
        'Calculation Type: **Regular Difference Deduction**',
        '**Target Value** or ☑ **Use Aspect Requirements**',
        '**Measurement Difference Type**: unit or %',
        '**Difference Amount** = step size · **Deduction Amount** = marks (or %) per step',
        'Mark = Max − INT(|gap| ÷ step) × deduction, minimum 0'
      ],
      body: `**In one sentence**: “−0.5 mark for every full 5 mm of difference”.

| | |
|---|---|
| **When to use** | A target and a regular penalty, above or below |
| **Settings** | **Target Value** *or* **Use Aspect Requirements** · **Measurement Difference Type** (*Unit of Measurement* / *Percentage Difference*) · **Difference Amount** · **Mark Deduction Type** (marks / %) · **Deduction Amount** |
| **Formula** | Mark = Max Mark − **INT**(\|value − target\| ÷ step) × deduction, never below 0 |
| **Compares competitors** | No |

**INT** = whole part: only **full steps** count. A 4.9 mm gap with a 5 mm step = 0 steps.

![Regular Difference Deduction in the CIS: target 100, step 5, −0.25 mark](assets/img/cis/calc-regular-difference.png)

## Example checked in the CIS

Target **800 mm**, **5 mm** step, **−0.5 mark** per step, Max Mark = 2:

| Measurement | Gap | Full steps | Calculation | CIS mark |
|---:|---:|---:|---|---:|
| 800 | 0 | 0 | 2 − 0 | 2.00 |
| 804.9 | 4.9 | 0 | 2 − 0 | 2.00 |
| 805 | 5 | 1 | 2 − 0.5 | 1.50 |
| 809.99 | 9.99 | 1 | 2 − 0.5 | 1.50 |
| 790 | 10 | 2 | 2 − 1 | 1.00 |
| 815 | 15 | 3 | 2 − 1.5 | 0.50 |
| 830 | 30 | 6 | 2 − 3 → 0 | 0.00 |

::calc[regular]{"max":2,"target":800,"diffType":"unit","difference":5,"dtype":"marks","deduction":0.5,"values":[800,804.9,805,809.99,790,815,830]}

## Variants

| Setting | Effect | Tested (target 800, Max 2) |
|---|---|---|
| *Percentage Difference*, step 1 | The step is a **% of the target** (1% of 800 = 8 mm) | 804 → 2.00 · 808 → 1.50 · 790 → 1.50 |
| *Percentage of Marks*, 10 | Each step removes **10% of the Max Mark** (0.2) | 805 → 1.80 · 825 → 1.00 · 851 → 0.00 |

> [!TIP] Ranged Score or Regular Difference?
> If your marking scheme says “−X marks every Y mm”, use **Regular Difference**: one setting. If tolerances are irregular (0 up to 5, then −1 up to 8, then everything), use [[calc-ranged-score|Ranged Score]].

## Examples per skill

::trades[regular]`
    }
  });

  /* ------------------------------------------------------------------ */
  P({
    id: 'calc-percent-comparison', category: 'calculs', order: 7, level: 'advanced',
    menuPath: MENU, prereq: ['marking-types'],
    tags: ['percent score comparison', 'comparaison', 'proportionnel', 'meilleur', 'chronomètre', 'temps', 'speed', 'minimum value', 'maximum value'],
    fr: {
      title: 'Percent Score Comparison : proportionnel entre le meilleur et le moins bon', short: 'Percent Score Comparison',
      summary: 'Le meilleur compétiteur obtient la note maximale, le moins bon zéro, les autres une note proportionnelle. Bornes Min/Max optionnelles.',
      objectives: ['Choisir Highest ou Lowest Value', 'Comprendre les bornes Minimum et Maximum', 'Éviter les pièges des méthodes comparatives'],
      quick: [
        'Calculation Type : **Percent Score Comparison**',
        '**Highest Mark to** : *Highest Value* (le plus grand gagne) ou *Lowest Value* (le plus petit gagne)',
        '**Minimum / Maximum Value** : bornes optionnelles',
        'Note = (écart avec le moins bon ÷ écart total) × Max Mark',
        'Calcul quand **toutes** les valeurs sont saisies'
      ],
      body: `**En une phrase** : on classe les compétiteurs entre le meilleur (note max) et le moins bon (0), proportionnellement.

| | |
|---|---|
| **Quand l'utiliser** | Pas de cible : le plus rapide, le plus grand nombre, la plus petite consommation… |
| **Paramètres** | **Highest Mark to** : *Highest Value* / *Lowest Value* · **Minimum Value** (optionnel) · **Maximum Value** (optionnel) · *Exclude Non-Attempts* |
| **Compare les compétiteurs** | **Oui** |

![Percent Score Comparison dans le CIS : le plus rapide gagne](assets/img/cis/calc-percent-comparison.png)

## La formule

Avec **M** = Max Mark, **meilleur** et **moins bon** = les valeurs extrêmes :

- *Lowest Value* (le plus petit gagne) : note = (moins bon − valeur) ÷ (moins bon − meilleur) × M
- *Highest Value* (le plus grand gagne) : note = (valeur − moins bon) ÷ (meilleur − moins bon) × M

## Exemple 1 vérifié : le plus rapide gagne

*Speed module : faire cinq boules de neige*, Max Mark = 2, **Lowest Value** :

| Compétiteur | Temps (s) | Calcul | Note CIS |
|---|---:|---|---:|
| 1 | 30 | (90 − 30) ÷ 60 × 2 | 2,00 |
| 2 | 45 | (90 − 45) ÷ 60 × 2 | 1,50 |
| 3 | 50 | (90 − 50) ÷ 60 × 2 | 1,33 |
| 4 | 60 | (90 − 60) ÷ 60 × 2 | 1,00 |
| 5 | 90 | (90 − 90) ÷ 60 × 2 | 0,00 |

::calc[percent]{"max":2,"best":"lowest","min":"","max_value":"","values":[30,45,50,60,90]}

## Exemple 2 vérifié : le plus grand nombre gagne

*Faire un maximum de boules en 15 minutes*, Max Mark = 2, **Highest Value** : 30 → 2,00 · 25 → 1,33 · 22 → 0,93 · 20 → 0,67 · 15 → 0,00.

## Les bornes Minimum et Maximum

Les bornes **plafonnent** les valeurs extrêmes, pour qu'un compétiteur exceptionnel (ou très faible) n'écrase pas les autres.

| Réglage | Effet | Testé (Max Mark 2) |
|---|---|---|
| *Lowest*, **Maximum Value = 60** | Toute valeur ≥ 60 vaut 0 ; 60 devient le « moins bon » | 30 → 2,00 · 45 → 1,00 · 50 → 0,67 · 60 et 90 → 0 |
| *Lowest*, **Minimum Value = 40** | Toute valeur ≤ 40 vaut la note max ; 40 devient le « meilleur » | 30 → 2,00 · 45 → 1,80 · 50 → 1,60 · 60 → 1,20 |
| *Highest*, **Minimum Value = 20** | Toute valeur ≤ 20 vaut 0 | 25 → 1,00 · 22 → 0,40 · 20 et 15 → 0 |
| *Highest*, **Maximum Value = 28** | Toute valeur ≥ 28 vaut la note max | 30 → 2,00 · 25 → 1,54 · 20 → 0,77 |

> [!NOTE] Une borne qui n'est pas atteinte ne sert à rien
> Testé : *Highest*, Maximum Value = 40 alors que le meilleur a fait 30 → les notes sont **identiques** à celles sans borne. Le CIS prend la borne seulement si une valeur l'atteint ou la dépasse.

::calc[percent]{"max":2,"best":"lowest","min":"","max_value":60,"values":[30,45,50,60,90]}

## Les pièges des méthodes comparatives

> [!WARNING] À connaître avant la compétition
> - **Toutes les valeurs** doivent être saisies : avec une case vide ou un texte (« NA », « - »), **aucune note** n'est calculée. Pendant la saisie, une icône d'horloge s'affiche en attendant le dernier compétiteur.
> - Un **0** est une valeur : en *Lowest Value*, un 0 saisi par erreur devient **le meilleur** et fait baisser tout le monde (testé : 30 passe de 2,00 à 1,33). Pour un compétiteur qui n'a pas réalisé l'épreuve, utilisez **No Attempt** à la saisie, pas 0.
> - Si tous les compétiteurs ont la **même valeur**, tous ont la note maximale.
> - L'option **Exclude Non-Attempts** sert, d'après son nom, à retirer de la comparaison les compétiteurs marqués *No Attempt* (non vérifiable sans compétiteurs inscrits ; elle ne change rien pour une valeur 0).

## Exemples par métier

::trades[percent]`
    },
    en: {
      title: 'Percent Score Comparison: proportional between best and worst', short: 'Percent Score Comparison',
      summary: 'The best competitor gets the max mark, the worst zero, the others a proportional mark. Optional Min/Max limits.',
      objectives: ['Choose Highest or Lowest Value', 'Understand the Minimum and Maximum limits', 'Avoid the traps of comparative methods'],
      quick: [
        'Calculation Type: **Percent Score Comparison**',
        '**Highest Mark to**: *Highest Value* (largest wins) or *Lowest Value* (smallest wins)',
        '**Minimum / Maximum Value**: optional limits',
        'Mark = (gap from worst ÷ total gap) × Max Mark',
        'Calculated once **all** values are entered'
      ],
      body: `**In one sentence**: competitors are ranked between the best (max mark) and the worst (0), proportionally.

| | |
|---|---|
| **When to use** | No target: fastest, most items, lowest consumption… |
| **Settings** | **Highest Mark to**: *Highest Value* / *Lowest Value* · **Minimum Value** (optional) · **Maximum Value** (optional) · *Exclude Non-Attempts* |
| **Compares competitors** | **Yes** |

![Percent Score Comparison in the CIS: fastest wins](assets/img/cis/calc-percent-comparison.png)

## The formula

With **M** = Max Mark, **best** and **worst** = the extreme values:

- *Lowest Value* (smallest wins): mark = (worst − value) ÷ (worst − best) × M
- *Highest Value* (largest wins): mark = (value − worst) ÷ (best − worst) × M

## Example 1 checked: fastest wins

*Speed module: make five snowballs*, Max Mark = 2, **Lowest Value**:

| Competitor | Time (s) | Calculation | CIS mark |
|---|---:|---|---:|
| 1 | 30 | (90 − 30) ÷ 60 × 2 | 2.00 |
| 2 | 45 | (90 − 45) ÷ 60 × 2 | 1.50 |
| 3 | 50 | (90 − 50) ÷ 60 × 2 | 1.33 |
| 4 | 60 | (90 − 60) ÷ 60 × 2 | 1.00 |
| 5 | 90 | (90 − 90) ÷ 60 × 2 | 0.00 |

::calc[percent]{"max":2,"best":"lowest","min":"","max_value":"","values":[30,45,50,60,90]}

## Example 2 checked: most items wins

*Make as many snowballs as possible in 15 minutes*, Max Mark = 2, **Highest Value**: 30 → 2.00 · 25 → 1.33 · 22 → 0.93 · 20 → 0.67 · 15 → 0.00.

## Minimum and Maximum limits

Limits **cap** extreme values, so that an exceptional (or very weak) competitor doesn't crush the others.

| Setting | Effect | Tested (Max Mark 2) |
|---|---|---|
| *Lowest*, **Maximum Value = 60** | Any value ≥ 60 is worth 0; 60 becomes the “worst” | 30 → 2.00 · 45 → 1.00 · 50 → 0.67 · 60 and 90 → 0 |
| *Lowest*, **Minimum Value = 40** | Any value ≤ 40 gets the max mark; 40 becomes the “best” | 30 → 2.00 · 45 → 1.80 · 50 → 1.60 · 60 → 1.20 |
| *Highest*, **Minimum Value = 20** | Any value ≤ 20 is worth 0 | 25 → 1.00 · 22 → 0.40 · 20 and 15 → 0 |
| *Highest*, **Maximum Value = 28** | Any value ≥ 28 gets the max mark | 30 → 2.00 · 25 → 1.54 · 20 → 0.77 |

> [!NOTE] A limit that is not reached does nothing
> Tested: *Highest*, Maximum Value = 40 while the best did 30 → marks are **identical** to those without a limit. The CIS uses the limit only if a value reaches or exceeds it.

::calc[percent]{"max":2,"best":"lowest","min":"","max_value":60,"values":[30,45,50,60,90]}

## Traps of comparative methods

> [!WARNING] Know these before the competition
> - **All values** must be entered: with an empty box or text (“NA”, “-”), **no mark** is calculated. During entry, a clock icon shows while waiting for the last competitor.
> - A **0** is a value: with *Lowest Value*, a 0 entered by mistake becomes **the best** and lowers everyone (tested: 30 drops from 2.00 to 1.33). For a competitor who didn't do the task, use **No Attempt** at entry, not 0.
> - If all competitors have the **same value**, all get the max mark.
> - **Exclude Non-Attempts** is meant, as its name says, to leave competitors marked *No Attempt* out of the comparison (not testable without registered competitors; it changes nothing for a value of 0).

## Examples per skill

::trades[percent]`
    }
  });

  /* ------------------------------------------------------------------ */
  P({
    id: 'calc-stepped-comparison', category: 'calculs', order: 8, level: 'advanced',
    menuPath: MENU, prereq: ['marking-types'],
    tags: ['stepped score comparison', 'paliers', 'comparaison', 'meilleur', 'intervalle', 'proportionnel', 'pourcentage'],
    fr: {
      title: 'Stepped Score Comparison : des paliers à partir du meilleur', short: 'Stepped Score Comparison',
      summary: 'Le meilleur compétiteur obtient la note maximale ; les autres perdent des points par palier d’écart avec lui, en valeur ou en pourcentage.',
      objectives: ['Régler l’intervalle et la déduction', 'Choisir entre paliers et déduction proportionnelle', 'Utiliser l’écart en pourcentage'],
      quick: [
        'Calculation Type : **Stepped Score Comparison**',
        '**Highest Mark to** : *Highest Value* / *Lowest Value*',
        '**Results Based On** : *Value Difference* / *Percentage Difference*',
        '**Interval** + **Marks Deducted per Difference**',
        'Paliers : M − ENT(écart ÷ intervalle) × D · ☑ *Proportional* : M − écart ÷ intervalle × D'
      ],
      body: `**En une phrase** : le meilleur a tout, puis on retire D points par palier d'écart avec lui.

| | |
|---|---|
| **Quand l'utiliser** | Le meilleur gagne, mais vous voulez une pénalité **fixe par palier** (−0,5 pt tous les 50 mm de moins que le meilleur) |
| **Paramètres** | **Highest Mark to** · **Results Based On** (*Value Difference* / *Percentage Difference*) · **Value or Percentage Interval** · **Marks Deducted per Difference** · ☑ *Deductions are Proportional* |
| **Compare les compétiteurs** | **Oui** |

![Stepped Score Comparison dans le CIS : la plus grande valeur gagne, paliers de 50](assets/img/cis/calc-stepped-comparison.png)

## Les formules

Avec **M** = Max Mark, **D** = points par palier, **I** = intervalle, **écart** = distance avec le meilleur :

| Option | Formule |
|---|---|
| Paliers (par défaut) | M − **ENT**(écart ÷ I) × D |
| ☑ *Deductions are Proportional* | M − (écart ÷ I) × D |
| *Percentage Difference* | l'écart est exprimé en **% de la meilleure valeur** |

La note ne descend jamais sous 0.

## Exemple vérifié : hauteur du bonhomme de neige

*Mesurer la hauteur*, Max Mark = 2, **Highest Value**, intervalle **50 mm**, **−0,5 point** par palier. Meilleur = 1 700 mm.

| Hauteur | Écart | Paliers | Paliers : note CIS | Proportionnel : note CIS |
|---:|---:|---:|---:|---:|
| 1 700 | 0 | 0 | 2,00 | 2,00 |
| 1 650 | 50 | 1 | 1,50 | 1,50 |
| 1 637 | 63 | 1 | 1,50 | 1,37 |
| 1 587 | 113 | 2 | 1,00 | 0,87 |
| 1 498 | 202 | 4 | 0,00 | 0,00 |

::calc[stepped]{"max":2,"best":"highest","basis":"value","interval":50,"deduction":0.5,"proportional":false,"values":[1700,1650,1637,1587,1498]}

## En pourcentage

Avec *Percentage Difference* et un intervalle de **10 %**, l'écart se mesure en % du meilleur (1 700) : 1 637 = 3,7 % de moins, 1 498 = 11,9 % de moins. Testé : 1 637 → **2,00** · 1 587 → **2,00** · 1 498 → **1,50** (un seul palier de 10 % franchi). En proportionnel : 1 637 → **1,81** · 1 498 → **1,41**.

## Le plus petit gagne

*Lowest Value* inverse le sens. Testé (intervalle 10, −0,5, Max 2) : 120 → 2,00 · 125 → 2,00 · 130 → 1,50 · 141 → 1,00 · 160 → 0,00.

::calc[stepped]{"max":2,"best":"lowest","basis":"value","interval":10,"deduction":0.5,"proportional":false,"values":[120,125,130,141,160]}

> [!TIP] Stepped ou Percent ?
> **Percent Score Comparison** donne 0 au moins bon, quoi qu'il arrive. **Stepped** ne retire des points qu'en fonction de l'**écart réel** : si tout le monde est proche du meilleur, tout le monde garde une bonne note.

> [!WARNING]
> Comme toute méthode comparative, **toutes les valeurs** doivent être saisies pour que les notes apparaissent, et un 0 compte comme une vraie valeur. Voir les pièges sur [[calc-percent-comparison]].

## Exemples par métier

::trades[stepped]`
    },
    en: {
      title: 'Stepped Score Comparison: steps from the best', short: 'Stepped Score Comparison',
      summary: 'The best competitor gets the max mark; others lose marks per step away from them, in value or percentage.',
      objectives: ['Set the interval and deduction', 'Choose between steps and proportional deduction', 'Use percentage difference'],
      quick: [
        'Calculation Type: **Stepped Score Comparison**',
        '**Highest Mark to**: *Highest Value* / *Lowest Value*',
        '**Results Based On**: *Value Difference* / *Percentage Difference*',
        '**Interval** + **Marks Deducted per Difference**',
        'Steps: M − INT(gap ÷ interval) × D · ☑ *Proportional*: M − gap ÷ interval × D'
      ],
      body: `**In one sentence**: the best gets everything, then D marks are removed per step away from them.

| | |
|---|---|
| **When to use** | The best wins, but you want a **fixed penalty per step** (−0.5 mark every 50 mm less than the best) |
| **Settings** | **Highest Mark to** · **Results Based On** (*Value Difference* / *Percentage Difference*) · **Value or Percentage Interval** · **Marks Deducted per Difference** · ☑ *Deductions are Proportional* |
| **Compares competitors** | **Yes** |

![Stepped Score Comparison in the CIS: highest value wins, 50 steps](assets/img/cis/calc-stepped-comparison.png)

## The formulas

With **M** = Max Mark, **D** = marks per step, **I** = interval, **gap** = distance from the best:

| Option | Formula |
|---|---|
| Steps (default) | M − **INT**(gap ÷ I) × D |
| ☑ *Deductions are Proportional* | M − (gap ÷ I) × D |
| *Percentage Difference* | the gap is expressed as a **% of the best value** |

The mark never goes below 0.

## Example checked: snowman height

*Measure the height*, Max Mark = 2, **Highest Value**, **50 mm** interval, **−0.5 mark** per step. Best = 1,700 mm.

| Height | Gap | Steps | Steps: CIS mark | Proportional: CIS mark |
|---:|---:|---:|---:|---:|
| 1,700 | 0 | 0 | 2.00 | 2.00 |
| 1,650 | 50 | 1 | 1.50 | 1.50 |
| 1,637 | 63 | 1 | 1.50 | 1.37 |
| 1,587 | 113 | 2 | 1.00 | 0.87 |
| 1,498 | 202 | 4 | 0.00 | 0.00 |

::calc[stepped]{"max":2,"best":"highest","basis":"value","interval":50,"deduction":0.5,"proportional":false,"values":[1700,1650,1637,1587,1498]}

## In percentage

With *Percentage Difference* and a **10%** interval, the gap is measured as a % of the best (1,700): 1,637 = 3.7% less, 1,498 = 11.9% less. Tested: 1,637 → **2.00** · 1,587 → **2.00** · 1,498 → **1.50** (only one 10% step crossed). Proportional: 1,637 → **1.81** · 1,498 → **1.41**.

## Smallest wins

*Lowest Value* reverses the direction. Tested (interval 10, −0.5, Max 2): 120 → 2.00 · 125 → 2.00 · 130 → 1.50 · 141 → 1.00 · 160 → 0.00.

::calc[stepped]{"max":2,"best":"lowest","basis":"value","interval":10,"deduction":0.5,"proportional":false,"values":[120,125,130,141,160]}

> [!TIP] Stepped or Percent?
> **Percent Score Comparison** always gives 0 to the worst. **Stepped** only removes marks according to the **actual gap**: if everyone is close to the best, everyone keeps a good mark.

> [!WARNING]
> As with any comparative method, **all values** must be entered for marks to appear, and a 0 counts as a real value. See the traps on [[calc-percent-comparison]].

## Examples per skill

::trades[stepped]`
    }
  });

  /* ------------------------------------------------------------------ */
  P({
    id: 'calc-exemples-metiers', category: 'calculs', order: 9, level: 'beginner',
    menuPath: MENU, prereq: ['marking-types'],
    tags: ['exemples', 'métiers', 'skills', 'cuisine', 'soudage', 'électricité', 'coiffure', 'menuiserie', 'idées'],
    fr: {
      title: 'Exemples de calculs pour chaque métier', short: 'Exemples par métier',
      summary: 'Choisissez votre métier : un exemple concret par méthode de calcul, pour les 57 métiers WorldSkills France.',
      objectives: ['Trouver des idées de calculs pour son métier', 'Comparer les méthodes sur un même métier'],
      quick: ['Choisir son métier dans la liste', '7 cartes = 7 méthodes', 'Adapter cibles, tolérances et points à son sujet'],
      body: `Choisissez votre métier dans la liste : chaque carte montre un **aspect possible** et le **réglage correspondant** dans le CIS. Le lien « Voir la méthode » ouvre la page détaillée avec le simulateur.

::trades[]

> [!NOTE] Ce sont des exemples
> Les valeurs (cibles, tolérances, points) sont **pédagogiques**. Chaque Expert les adapte à son sujet d'épreuve, à ses WSOS et à son barème. Une carte grisée signifie que la méthode est rarement utile pour ce métier.

## Les grandes familles de métiers

| Famille | Méthodes les plus utiles | Pourquoi |
|---|---|---|
| Usinage, mécanique, métallerie | Ranged Score, Regular Difference | Cotes et tolérances précises |
| Bâtiment et second œuvre | Ranged Score, Regular Difference, Choice | Niveaux, aplombs, cotes d'implantation, aspect des joints |
| Alimentation et service | Choice, Ranged Score (poids, températures), Percent (speed tests) | Portions, cuissons, temps |
| Électricité, électronique, automatisme | Pass/Fail, Number Completed | Ça fonctionne ou non, nombre de fonctions validées |
| Numérique et cyber | Pass/Fail, Number Completed, Percent / Stepped (temps) | Tests automatisés, flags, temps de résolution |
| Soins et services à la personne | Pass/Fail (protocoles), Number Completed (étapes), Choice | Sécurité et respect des étapes |
| Maintenance et véhicules | Pass/Fail, Choice (diagnostic), Ranged Score (couples, pressions) | Réglages normés et diagnostic |`
    },
    en: {
      title: 'Calculation examples for every skill', short: 'Examples per skill',
      summary: 'Choose your skill: one practical example per calculation method, for the 57 WorldSkills France skills.',
      objectives: ['Find calculation ideas for your skill', 'Compare methods on the same skill'],
      quick: ['Choose your skill in the list', '7 cards = 7 methods', 'Adapt targets, tolerances and marks to your test project'],
      body: `Choose your skill in the list: each card shows a **possible aspect** and the **matching CIS setting**. The “See the method” link opens the detailed page with the simulator.

::trades[]

> [!NOTE] These are examples
> Values (targets, tolerances, marks) are **for teaching**. Each Expert adapts them to the test project, WSOS and marking scheme. A greyed card means the method is rarely useful for that skill.

## Skill families

| Family | Most useful methods | Why |
|---|---|---|
| Machining, mechanics, metalwork | Ranged Score, Regular Difference | Precise dimensions and tolerances |
| Construction and finishing trades | Ranged Score, Regular Difference, Choice | Levels, plumb, set-out dimensions, joint appearance |
| Food and service | Choice, Ranged Score (weights, temperatures), Percent (speed tests) | Portions, cooking, time |
| Electrical, electronics, automation | Pass/Fail, Number Completed | Works or not, number of functions validated |
| Digital and cyber | Pass/Fail, Number Completed, Percent / Stepped (time) | Automated tests, flags, solving time |
| Care and personal services | Pass/Fail (protocols), Number Completed (steps), Choice | Safety and following steps |
| Maintenance and vehicles | Pass/Fail, Choice (diagnosis), Ranged Score (torques, pressures) | Standard settings and diagnosis |`
    }
  });
})();
