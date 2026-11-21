/* CIS Wiki — Prise en main (CIS v6) */
(function () {
  'use strict';
  var P = window.WIKI_PAGE;

  /* ------------------------------------------------------------------ */
  P({
    id: 'decouvrir-le-cis', category: 'start', order: 1, level: 'beginner', video: 'video-intro',
    tags: ['introduction', 'débuter', 'vocabulaire', 'parcours', 'getting started', 'barème'],
    fr: {
      title: 'Découvrir le CIS en 5 minutes', short: 'Découvrir le CIS',
      summary: 'Ce qu’est le CIS, le vocabulaire indispensable et les 8 étapes de la notation, de l’Excel aux résultats.',
      objectives: ['Comprendre à quoi sert le CIS', 'Connaître les mots Critère, Sous-critère, Aspect, Measurement, Judgement', 'Savoir dans quel ordre travailler'],
      quick: [
        'Adresse : **cis.worldskills-france.org** › choisir sa compétition',
        'Barème = Critères (A, B…) › Sous-critères (A1…) › Aspects (A1.M1, A1.J1…)',
        'M = Measurement (objectif, calcul possible) · J = Judgement (0 à 3 par juré)',
        'Total du barème = **100 points**',
        'Ordre : Excel › Import › Calculs › Planning › Verrouillage › Formulaires › Saisie › Résultats'
      ],
      body: `Le **CIS** (*Competition Information System*) est le logiciel de WorldSkills International utilisé par WorldSkills France pour **toute la notation** d'une compétition. Il sert à préparer le barème, organiser les jurés, imprimer les feuilles de notation, saisir les notes et produire les résultats.

> [!TIP] Vous débutez ?
> Lisez cette page, puis suivez le **parcours en 8 étapes** affiché sur la page d'accueil. Chaque page se termine par un bouton « Étape suivante ».

## Le barème en 3 niveaux

Le barème (*Marking Scheme*) est noté sur **100 points**. Il se découpe toujours en trois niveaux :

| Niveau | Exemple (bonhomme de neige) | À retenir |
|---|---|---|
| **Critère** | A – Mesure et précision des éléments principaux | Une grande partie de l'épreuve (A, B, C…) |
| **Sous-critère** | A1 – Mesure et précision des jambes | Un groupe d'aspects notés **le même jour, par la même équipe** |
| **Aspect** | A1.M1 – Longueur de la jambe droite | La ligne qui reçoit une note |

![Le barème importé dans le CIS : critères A à H, chacun avec sa note](assets/img/cis/ms-criteria.png)

## Deux façons de noter un aspect

| | **Measurement** (M) | **Judgement** (J) |
|---|---|---|
| Principe | On **mesure** : une longueur, un temps, une quantité, oui/non | Les jurés donnent leur **avis** sur la qualité |
| Saisie | Une note, ou une valeur que le CIS **calcule** | Chaque juré donne une note de **0 à 3** |
| Exemple | Longueur de la jambe : 800 mm attendus | Apparence de la jambe : 0 = mauvais … 3 = excellent |
| En savoir plus | [[marking-types|Méthodes de calcul]] | [[judgement|Notation au jugement]] |

## Les 8 étapes de la notation

:::steps
1. **Remplir le fichier Excel** du barème — [[excel-marking-scheme|le fichier Excel pas à pas]].
2. **L'importer dans le CIS** et le vérifier — [[marking-scheme|importer et vérifier]].
3. **Ajouter les calculs automatiques** sur les aspects mesurés — [[marking-types|choisir la bonne méthode]].
4. **Planifier** les jours de notation et les équipes de jurés — [[marking-days|Marking Schedule]].
5. **Verrouiller** le barème — [[lock-marking-scheme|verrouillage]].
6. **Imprimer** les feuilles de notation — [[marking-forms|Marking Forms]].
7. **Saisir les notes** pendant la compétition — [[enter-marks|saisie des notes]].
8. **Contrôler et publier** les résultats — [[results|résultats]].
:::

> [!NOTE] Qui fait quoi ?
> L'**Expert** du métier prépare le barème, les calculs et le planning, puis saisit les notes avec son équipe. Le **CIS Master** (organisation) crée les comptes, inscrit les compétiteurs et verrouille. Un terme inconnu ? Consultez le [glossaire](glossary.html).

## Pour s'entraîner

Une **base de formation** est disponible : *Base de Training / Formation CIS (v6)*, reconnaissable au logo rouge « TEST ». Vous pouvez y tester sans risque l'import d'un barème et les calculs. Demandez vos identifiants à l'équipe CIS ([cis@cofom.org](mailto:cis@cofom.org)).`
    },
    en: {
      title: 'Discover the CIS in 5 minutes', short: 'Discover the CIS',
      summary: 'What the CIS is, the essential vocabulary and the 8 marking steps, from the Excel file to the results.',
      objectives: ['Understand what the CIS is for', 'Know the words Criterion, Sub-criterion, Aspect, Measurement, Judgement', 'Know in which order to work'],
      quick: [
        'Address: **cis.worldskills-france.org** › choose your competition',
        'Marking scheme = Criteria (A, B…) › Sub-criteria (A1…) › Aspects (A1.M1, A1.J1…)',
        'M = Measurement (objective, can be calculated) · J = Judgement (0 to 3 per juror)',
        'Marking scheme total = **100 marks**',
        'Order: Excel › Import › Calculations › Schedule › Lock › Forms › Mark entry › Results'
      ],
      body: `The **CIS** (*Competition Information System*) is the WorldSkills International software used by WorldSkills France for **all marking** in a competition: preparing the marking scheme, organising jurors, printing marking forms, entering marks and producing results.

> [!TIP] New to the CIS?
> Read this page, then follow the **8-step path** shown on the home page. Each page ends with a “Next step” button.

## The marking scheme in 3 levels

The *Marking Scheme* totals **100 marks** and is always split into three levels:

| Level | Example (snowman) | Remember |
|---|---|---|
| **Criterion** | A – Measurement and accuracy of the main parts | A major part of the test project (A, B, C…) |
| **Sub-criterion** | A1 – Legs measurement and accuracy | A group of aspects marked **on the same day, by the same team** |
| **Aspect** | A1.M1 – Right leg length | The line that receives a mark |

![The marking scheme imported into the CIS: criteria A to H, each with its mark](assets/img/cis/ms-criteria.png)

## Two ways to mark an aspect

| | **Measurement** (M) | **Judgement** (J) |
|---|---|---|
| Principle | You **measure**: a length, a time, a quantity, yes/no | Jurors give their **opinion** on quality |
| Entry | A mark, or a value the CIS **calculates** | Each juror scores **0 to 3** |
| Example | Leg length: 800 mm expected | Leg appearance: 0 = poor … 3 = excellent |
| Learn more | [[marking-types|Calculation methods]] | [[judgement|Judgement marking]] |

## The 8 marking steps

:::steps
1. **Fill in the Excel file** of the marking scheme — [[excel-marking-scheme|the Excel file step by step]].
2. **Import it into the CIS** and check it — [[marking-scheme|import and check]].
3. **Add automatic calculations** to measured aspects — [[marking-types|choose the right method]].
4. **Plan** marking days and juror teams — [[marking-days|Marking Schedule]].
5. **Lock** the marking scheme — [[lock-marking-scheme|locking]].
6. **Print** the marking forms — [[marking-forms|Marking Forms]].
7. **Enter marks** during the competition — [[enter-marks|mark entry]].
8. **Check and publish** the results — [[results|results]].
:::

> [!NOTE] Who does what?
> The skill **Expert** prepares the marking scheme, calculations and schedule, then enters marks with the team. The **CIS Master** (organisers) creates accounts, registers competitors and locks. Unknown word? See the [glossary](glossary.html).

## Practising

A **training database** is available: *Base de Training / Formation CIS (v6)*, recognisable by its red “TEST” logo. You can safely test importing a marking scheme and calculations there. Ask the CIS team for credentials ([cis@cofom.org](mailto:cis@cofom.org)).`
    }
  });

  /* ------------------------------------------------------------------ */
  P({
    id: 'se-connecter', category: 'start', order: 2, level: 'beginner', menuPath: '',
    prereq: ['decouvrir-le-cis'],
    tags: ['connexion', 'login', 'menus', 'accueil', 'tableau de bord', 'langue', 'messages', 'mot de passe'],
    fr: {
      title: 'Se connecter et se repérer dans le CIS', short: 'Se connecter et se repérer',
      summary: 'La page de connexion, le tableau de bord d’accueil, la carte des menus et le panneau des messages.',
      objectives: ['Se connecter sans perdre sa session', 'Lire le tableau de bord de son métier', 'Savoir où se trouve chaque fonction', 'Retrouver les messages d’erreur'],
      quick: [
        'Connexion : nom d’utilisateur + mot de passe › **connexion**',
        '**Une seule session par compte** : une 2ᵉ connexion ferme la 1ʳᵉ',
        'Accueil = tableau d’avancement (vert = fait, jaune = à faire)',
        '4 menus : **Competition** · **Marking Scheme** · **Assessment** · **Reports**',
        'Menu à votre nom › **Preferences** : langue, mot de passe',
        'Icône liste (en haut à droite) = **historique des messages**'
      ],
      body: `## 1. Se connecter

:::steps
1. Ouvrez l'adresse du CIS de votre compétition (par exemple *cis.worldskills-france.org/…*).
2. Saisissez votre **nom d'utilisateur** et votre **mot de passe**.
3. Cliquez sur **connexion**.
:::

![Page de connexion du CIS de formation](assets/img/cis/login.png)

> [!WARNING] Un compte = une seule session
> Si vous vous connectez avec le même compte sur un deuxième ordinateur ou un deuxième navigateur, la première session est **fermée automatiquement**. Le CIS affiche alors « *Another open session for this user was detected. It has now been invalidated.* ». Chaque juré doit donc avoir **son propre compte**.

## 2. Lire le tableau de bord

La page d'accueil (icône maison) affiche l'avancement de votre métier. Chaque ligne passe au **vert** quand l'étape est faite :

![Tableau de bord : avancement du métier test_wiki](assets/img/cis/home-dashboard.png)

| Ligne | Ce qu'elle vérifie | Page utile |
|---|---|---|
| Marking Scheme Defined | Le barème totalise 100 points | [[marking-scheme]] |
| Marking Scheme Locked | Le barème est verrouillé | [[lock-marking-scheme]] |
| Marking Days Set | Chaque sous-critère a un jour de notation | [[marking-days]] |
| Day X Marking Data | Nombre de notes saisies / attendues ce jour | [[enter-marks]] |
| Day X Marks Locked | Les notes du jour sont verrouillées | [[lock-marks]] |

Les lignes en bleu sont des **liens** : un clic ouvre directement la page concernée.

## 3. La carte des menus

| Menu | Contenu | Captures |
|---|---|---|
| **Competition** | *Import Data*, *Export Data* | ![Menu Competition](assets/img/cis/menu-competition.png) |
| **Marking Scheme** | *WS Occupational Standards*, *Marking Scheme*, *Calculations*, *Marking Schedule* | ![Menu Marking Scheme](assets/img/cis/menu-marking-scheme.png) |
| **Assessment** | *Marking Forms*, *Invalid Judgement Scores*, *Lock Marks* (+ saisie des notes quand des compétiteurs sont inscrits) | ![Menu Assessment](assets/img/cis/menu-assessment.png) |
| **Reports** | *Skill Status*, *WSOS Mark Allocation Table*, *Expert Marking Load*, *Missing Marks* | ![Menu Reports](assets/img/cis/menu-reports.png) |

:::guided
> [!TIP] Où est quoi ? Le résumé en une phrase
> **Marking Scheme** = tout ce qui se prépare *avant* la compétition. **Assessment** = tout ce qui se fait *pendant*. **Reports** = tout ce qui sert à *contrôler*.
:::

## 4. Vos préférences

Le menu à votre nom (en haut à droite) › **Preferences** permet de changer la **langue de l'interface** et votre **mot de passe**.

![Menu utilisateur](assets/img/cis/menu-user.png)

![Préférences : langue et mot de passe](assets/img/cis/preferences.png)

> [!NOTE] Quelle langue choisir ?
> La traduction française du CIS est **incomplète** : certains menus restent en anglais (« Calculations », « Skill Status »…) et d'autres sont traduits approximativement. Ce wiki utilise l'**interface anglaise**, identique pour tous : les noms de menus correspondent donc exactement à ce que vous voyez.

## 5. Le panneau des messages

Chaque action du CIS affiche un message en haut à droite : vert/bleu = réussite, jaune = avertissement, rouge = erreur. Ces messages disparaissent vite, mais l'**icône liste** (tout à droite de la barre de menus) ouvre l'**historique** avec l'heure de chaque message.

![Historique des messages du CIS](assets/img/cis/messages.png)

Un message incompris ? Cherchez-le sur la page [[messages-erreurs|Messages du CIS expliqués]].`
    },
    en: {
      title: 'Log in and find your way around the CIS', short: 'Log in and get around',
      summary: 'The login page, the home dashboard, the menu map and the message panel.',
      objectives: ['Log in without losing your session', 'Read your skill dashboard', 'Know where each feature is', 'Find error messages again'],
      quick: [
        'Login: username + password › **log in**',
        '**One session per account**: a 2nd login closes the 1st',
        'Home = progress dashboard (green = done, yellow = to do)',
        '4 menus: **Competition** · **Marking Scheme** · **Assessment** · **Reports**',
        'Menu with your name › **Preferences**: language, password',
        'List icon (top right) = **message history**'
      ],
      body: `## 1. Log in

:::steps
1. Open the CIS address of your competition (for example *cis.worldskills-france.org/…*).
2. Enter your **username** and **password**.
3. Click the login button.
:::

![CIS training database login page](assets/img/cis/login.png)

> [!WARNING] One account = one session
> If you log in with the same account on a second computer or browser, the first session is **closed automatically**. The CIS then shows “*Another open session for this user was detected. It has now been invalidated.*”. Every juror therefore needs **their own account**.

## 2. Read the dashboard

The home page (house icon) shows your skill's progress. Each line turns **green** when the step is done:

![Dashboard: progress of skill test_wiki](assets/img/cis/home-dashboard.png)

| Line | What it checks | Useful page |
|---|---|---|
| Marking Scheme Defined | The marking scheme totals 100 marks | [[marking-scheme]] |
| Marking Scheme Locked | The marking scheme is locked | [[lock-marking-scheme]] |
| Marking Days Set | Every sub-criterion has a marking day | [[marking-days]] |
| Day X Marking Data | Marks entered / expected that day | [[enter-marks]] |
| Day X Marks Locked | The day's marks are locked | [[lock-marks]] |

Blue lines are **links**: one click opens the related page.

## 3. The menu map

| Menu | Content | Screenshots |
|---|---|---|
| **Competition** | *Import Data*, *Export Data* | ![Competition menu](assets/img/cis/menu-competition.png) |
| **Marking Scheme** | *WS Occupational Standards*, *Marking Scheme*, *Calculations*, *Marking Schedule* | ![Marking Scheme menu](assets/img/cis/menu-marking-scheme.png) |
| **Assessment** | *Marking Forms*, *Invalid Judgement Scores*, *Lock Marks* (+ mark entry once competitors are registered) | ![Assessment menu](assets/img/cis/menu-assessment.png) |
| **Reports** | *Skill Status*, *WSOS Mark Allocation Table*, *Expert Marking Load*, *Missing Marks* | ![Reports menu](assets/img/cis/menu-reports.png) |

:::guided
> [!TIP] Where is what? The one-line summary
> **Marking Scheme** = everything prepared *before* the competition. **Assessment** = everything done *during* it. **Reports** = everything used to *check*.
:::

## 4. Your preferences

The menu with your name (top right) › **Preferences** lets you change the **interface language** and your **password**.

![User menu](assets/img/cis/menu-user.png)

![Preferences: language and password](assets/img/cis/preferences.png)

> [!NOTE] Which language?
> The French translation of the CIS is **incomplete**: some menus stay in English and others are loosely translated. This wiki uses the **English interface**, which is the same for everyone, so menu names match exactly what you see.

## 5. The message panel

Every CIS action shows a message at the top right: green/blue = success, yellow = warning, red = error. These messages disappear quickly, but the **list icon** (far right of the menu bar) opens the **history** with the time of each message.

![CIS message history](assets/img/cis/messages.png)

A message you don't understand? Look it up on [[messages-erreurs|CIS messages explained]].`
    }
  });

  /* ------------------------------------------------------------------ */
  P({
    id: 'nouveautes-cis6', category: 'start', order: 3, level: 'intermediate',
    tags: ['version', 'nouveautés', 'cis 6', 'v6', 'release notes', 'changements'],
    fr: {
      title: 'Nouveautés du CIS v6', short: 'Nouveautés CIS v6',
      summary: 'Ce qui change par rapport au CIS 5 : deux nouvelles méthodes de calcul, une bibliothèque partagée, un testeur intégré et un historique des messages.',
      objectives: ['Repérer les nouveautés utiles pour votre métier', 'Savoir ce qui a été renommé'],
      quick: [
        '2 nouvelles méthodes : **Pass/Fail** et **Choice**',
        '**Calculation Library** partagée : *Add from Library*, *Copy*, *Edit*',
        'Testeur **Test Calculation** dans chaque fenêtre de calcul',
        'Plus de « Direct Mark Entry » : un aspect sans calcul = saisie directe',
        'Import : options WSOS / calculs / planning / bibliothèque',
        'Historique des messages (icône liste)'
      ],
      body: `Le CIS v6 a été testé de bout en bout sur l'instance de formation pour rédiger ce wiki. Voici ce qui change pour vous.

## Les nouveautés qui comptent

| Nouveauté | Ce que ça change | Page |
|---|---|---|
| **Pass/Fail** | Calcul « tout ou rien » : réussi = note max, échoué = 0 | [[calc-pass-fail]] |
| **Choice** | Le juré choisit une option (jusqu'à 5), chacune avec sa déduction | [[calc-choice]] |
| **Calculation Library** | Un calcul enregistré une fois se réutilise sur d'autres aspects | [[marking-types]] |
| **Test Calculation** | Chaque fenêtre de calcul contient un testeur : 5 valeurs, résultat immédiat | [[marking-types]] |
| **Options d'import** | Choix d'importer ou non les WSOS, les calculs, de garder le planning | [[marking-scheme]] |
| **Import des calculs depuis Excel** | L'export contient un onglet *Calculations* réimportable | [[excel-marking-scheme]] |
| **Historique des messages** | Tous les messages de la session, horodatés | [[se-connecter]] |
| **Groupes de compétiteurs** | Un jour de notation différent par groupe | [[marking-days]] |

## Ce qui a disparu ou changé de nom

- **Direct Mark Entry** n'existe plus en tant que méthode : un aspect sans calcul se saisit directement.
- Les **WSSS** s'appellent désormais **WSOS** (*WorldSkills Occupational Standards*).
- Les feuilles **paysage** pour plusieurs candidats ne figurent plus dans la liste ; on trouve à la place des formulaires de **signature** (*Sign off form*).
- Le format d'export propose **CIS 5.0**, **CIS 4.1** et **CIS 4.0** : gardez **CIS 5.0**, seul format qui contient les calculs.

> [!NOTE]
> Les vidéos de la rubrique [Vidéos](category.html?id=videos) ont été tournées sous CIS 5 : l'apparence diffère un peu, mais la logique reste la même.`
    },
    en: {
      title: 'What’s new in CIS v6', short: 'What’s new in CIS v6',
      summary: 'What changed since CIS 5: two new calculation methods, a shared library, a built-in tester and a message history.',
      objectives: ['Spot the changes useful for your skill', 'Know what was renamed'],
      quick: [
        '2 new methods: **Pass/Fail** and **Choice**',
        'Shared **Calculation Library**: *Add from Library*, *Copy*, *Edit*',
        '**Test Calculation** panel in every calculation window',
        'No more “Direct Mark Entry”: an aspect without calculation = direct entry',
        'Import: WSOS / calculations / schedule / library options',
        'Message history (list icon)'
      ],
      body: `CIS v6 was tested end to end on the training database to write this wiki. Here is what changes for you.

## The changes that matter

| Change | What it means | Page |
|---|---|---|
| **Pass/Fail** | All-or-nothing: pass = max mark, fail = 0 | [[calc-pass-fail]] |
| **Choice** | The juror picks an option (up to 5), each with its deduction | [[calc-choice]] |
| **Calculation Library** | A calculation saved once can be reused on other aspects | [[marking-types]] |
| **Test Calculation** | Every calculation window has a tester: 5 values, instant result | [[marking-types]] |
| **Import options** | Choose whether to import WSOS, calculations, keep the schedule | [[marking-scheme]] |
| **Calculations imported from Excel** | The export contains a re-importable *Calculations* sheet | [[excel-marking-scheme]] |
| **Message history** | All session messages, time-stamped | [[se-connecter]] |
| **Competitor groups** | A different marking day per group | [[marking-days]] |

## What disappeared or was renamed

- **Direct Mark Entry** is no longer a method: an aspect without a calculation is entered directly.
- **WSSS** are now called **WSOS** (*WorldSkills Occupational Standards*).
- **Landscape** forms for several competitors are no longer listed; **sign-off forms** are available instead.
- The export offers **CIS 5.0**, **CIS 4.1** and **CIS 4.0**: keep **CIS 5.0**, the only format including calculations.

> [!NOTE]
> The [Videos](category.html?id=videos) were recorded with CIS 5: the look differs slightly, but the logic is the same.`
    }
  });
})();
