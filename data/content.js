/*
 * CIS Wiki — contenu de départ (migration du DokuWiki https://cis.worldskills-france.org/wiki/).
 *
 * Chaque page existe en français (fr) et en anglais (en) :
 *   title    titre complet          short      titre court (menus, parcours)
 *   summary  résumé (chapeau)       objectives « Vous allez apprendre » (mode Guidé)
 *   quick    aide-mémoire (mode Expert), une étape par ligne
 *   body     contenu en Markdown (voir assets/js/markdown.js pour la syntaxe)
 *
 * Les images et vidéos utilisent le préfixe « media: », résolu avec settings.mediaBase.
 */
window.WIKI_SEED = {
  version: '2026-11-21.1',

  settings: {
    siteName: 'CIS Wiki',
    mediaBase: 'https://cis.worldskills-france.org/wiki/_media/',
    legacyBase: 'https://cis.worldskills-france.org/wiki/',
    cisUrl: 'https://cis.worldskills-france.org/',
    signoffUrl: 'https://cis.worldskills-france.org/signoff/index.php',
    contact: 'cis@cofom.org',
    popular: ['marking-scheme', 'enter-marks', 'marking-types', 'signoff'],
    workflow: [
      { step: 1, page: 'marking-scheme', phase: 'before', icon: 'table' },
      { step: 2, page: 'lock-marking-scheme', phase: 'before', icon: 'lock' },
      { step: 3, page: 'marking-days', phase: 'before', icon: 'calendar' },
      { step: 4, page: 'marking-team', phase: 'before', icon: 'users' },
      { step: 5, page: 'marking-forms', phase: 'before', icon: 'printer' },
      { step: 6, page: 'enter-marks', phase: 'during', icon: 'keyboard' },
      { step: 7, page: 'results', phase: 'after', icon: 'award' }
    ],
    signoffTimeline: [
      { day: 'C-2', items: [{ page: 'so-identity', fr: 'Identités équipe métier', en: 'Skill team identities' }] },
      { day: 'C-1', items: [
        { page: 'so-daily-signoff', fr: 'Émargement équipe métier', en: 'Skill team sign-in' },
        { page: 'so-identity', fr: 'Identités jurés et compétiteurs', en: 'Juror & competitor identities' },
        { page: 'so-marking-scheme', fr: 'Marking Scheme Acceptance', en: 'Marking Scheme Acceptance' }] },
      { day: 'C1 · C2 · C3', items: [
        { page: 'so-daily-signoff', fr: 'Émargements', en: 'Daily sign-in' },
        { page: 'so-closing', fr: 'Notation du jour', en: 'Daily marks sign-off' }] }
    ]
  },

  categories: [
    { id: 'start', order: 1, icon: 'flag', color: 'blue',
      fr: { title: 'Prise en main', desc: 'Découvrir le CIS et les nouveautés de chaque version.' },
      en: { title: 'Getting started', desc: 'Discover the CIS and what is new in each version.' } },
    { id: 'cis', order: 2, icon: 'clipboard', color: 'indigo',
      fr: { title: 'Notation avec le CIS', desc: 'Du barème aux résultats : toutes les étapes de la notation, dans l’ordre.' },
      en: { title: 'Marking with the CIS', desc: 'From marking scheme to results: every marking step, in order.' } },
    { id: 'signoff', order: 3, icon: 'signature', color: 'teal',
      fr: { title: 'Signatures CNAT 48', desc: 'L’outil de signature dématérialisé de la Compétition Nationale Marseille 2025.' },
      en: { title: 'CNAT 48 sign-off', desc: 'The digital sign-off tool of the Marseille 2025 National Competition.' } },
    { id: 'videos', order: 4, icon: 'video', color: 'rose',
      fr: { title: 'Vidéos', desc: 'Des tutoriels vidéo pour chaque étape de la notation.' },
      en: { title: 'Videos', desc: 'Video tutorials for each marking step.' } }
  ],

  users: [
    { id: 'admin', name: 'Administrateur CIS', role: 'admin', createdAt: '2026-11-21T09:00:00+01:00' },
    { id: 'anthony', name: 'Anthony', role: 'admin', createdAt: '2020-09-06T06:59:00+02:00' },
    { id: 'marie', name: 'Marie', role: 'editor', createdAt: '2020-09-06T06:59:00+02:00' },
    { id: 'alberic', name: 'Alberic', role: 'editor', createdAt: '2020-09-06T06:59:00+02:00' },
    { id: 'traduction', name: 'Équipe traduction', role: 'translator', createdAt: '2026-11-21T09:00:00+01:00' },
    { id: 'import', name: 'Import DokuWiki', role: 'editor', system: true, createdAt: '2020-09-06T06:59:00+02:00' }
  ],

  glossary: [
    { id: 'cis', page: 'decouvrir-le-cis',
      fr: { term: 'CIS', aliases: [], def: 'Competition Information System : l’application web qui gère la notation d’une compétition (barème, jurés, saisie des notes, résultats).' },
      en: { term: 'CIS', aliases: [], def: 'Competition Information System: the web application that manages competition marking (marking scheme, jurors, mark entry, results).' } },
    { id: 'marking-scheme', page: 'marking-scheme',
      fr: { term: 'Marking Scheme', aliases: ['barème', 'grille de notation'], def: 'Le barème de notation d’un métier : critères, sous-critères et aspects, pour un total de 100 points.' },
      en: { term: 'Marking Scheme', aliases: ['marking grid'], def: 'The marking grid of a skill: criteria, sub-criteria and aspects, totalling 100 marks.' } },
    { id: 'critere', page: 'decouvrir-le-cis',
      fr: { term: 'Critère', aliases: ['critères'], def: 'Grande partie du barème (A, B, C…) qui regroupe plusieurs sous-critères.' },
      en: { term: 'Criterion', aliases: ['criteria'], def: 'A major part of the marking scheme (A, B, C…) grouping several sub-criteria.' } },
    { id: 'sous-critere', page: 'marking-days',
      fr: { term: 'Sous-critère', aliases: ['sous-critères'], def: 'Groupe d’aspects notés en même temps. C’est à ce niveau que se planifient le Marking Days et le Marking Team.' },
      en: { term: 'Sub-criterion', aliases: ['sub-criteria'], def: 'A group of aspects marked at the same time. Marking Days and Marking Team are planned at this level.' } },
    { id: 'aspect', page: 'decouvrir-le-cis',
      fr: { term: 'Aspect', aliases: ['aspects'], def: 'Élément du barème noté individuellement. Un aspect est de type Measurement ou Judgement.' },
      en: { term: 'Aspect', aliases: ['aspects'], def: 'An item of the marking scheme marked individually. An aspect is either Measurement or Judgement.' } },
    { id: 'measurement', page: 'marking-types',
      fr: { term: 'Measurement', aliases: [], def: 'Aspect objectif dont la note dépend d’une mesure (longueur, temps, quantité…). Le CIS peut calculer la note grâce aux Marking Types.' },
      en: { term: 'Measurement', aliases: [], def: 'An objective aspect whose mark depends on a measured value (length, time, quantity…). The CIS can calculate it with Marking Types.' } },
    { id: 'judgement', page: 'enter-marks',
      fr: { term: 'Judgement', aliases: [], def: 'Aspect subjectif : chaque juré attribue une note de 0 à 3 et le CIS calcule la note finale. L’écart entre jurés ne peut pas dépasser 1 point.' },
      en: { term: 'Judgement', aliases: [], def: 'A subjective aspect: each juror scores from 0 to 3 and the CIS calculates the final mark. Jurors’ scores may differ by 1 point at most.' } },
    { id: 'marking-type', page: 'marking-types',
      fr: { term: 'Marking Type', aliases: ['Marking Types'], def: 'Règle de calcul automatique d’une note Measurement : Ranged Score, Number Completed, Percent Score Comparison, etc.' },
      en: { term: 'Marking Type', aliases: ['Marking Types'], def: 'An automatic calculation rule for a Measurement mark: Ranged Score, Number Completed, Percent Score Comparison, etc.' } },
    { id: 'marking-days', page: 'marking-days',
      fr: { term: 'Marking Days', aliases: ['Marking Schedule'], def: 'Le planning de notation : le jour où chaque sous-critère est noté, pour tous les candidats, par groupe ou par candidat.' },
      en: { term: 'Marking Days', aliases: ['Marking Schedule'], def: 'The marking schedule: the day each sub-criterion is marked, for all competitors, per group or per competitor.' } },
    { id: 'marking-team', page: 'marking-team',
      fr: { term: 'Marking Team', aliases: [], def: 'L’équipe chargée de noter un sous-critère : trois jurés et un superviseur.' },
      en: { term: 'Marking Team', aliases: [], def: 'The team in charge of marking a sub-criterion: three jurors and one supervisor.' } },
    { id: 'marking-forms', page: 'marking-forms',
      fr: { term: 'Marking Forms', aliases: [], def: 'Les feuilles de notation imprimables destinées aux jurés, générées en PDF par le CIS.' },
      en: { term: 'Marking Forms', aliases: [], def: 'Printable marking sheets for jurors, generated as PDF by the CIS.' } },
    { id: 'requirement', page: 'marking-types',
      fr: { term: 'Requirement', aliases: [], def: 'Colonne du Marking Scheme qui indique la valeur attendue d’un aspect. Elle peut servir de valeur cible dans les règles de calcul.' },
      en: { term: 'Requirement', aliases: [], def: 'Marking Scheme column giving the expected value of an aspect. It can be used as the target value in calculation rules.' } },
    { id: 'no-attempt', page: 'enter-marks',
      fr: { term: 'No Attempt', aliases: [], def: 'Option à cocher lors de la saisie quand un aspect n’a pas pu être évalué (non réalisé).' },
      en: { term: 'No Attempt', aliases: [], def: 'Option to tick during mark entry when an aspect could not be assessed (not attempted).' } },
    { id: 'jure', page: 'marking-team',
      fr: { term: 'Juré', aliases: ['jurés'], def: 'Personne qui évalue les candidats et attribue les notes.' },
      en: { term: 'Juror', aliases: ['jurors'], def: 'A person who assesses competitors and awards marks.' } },
    { id: 'superviseur', page: 'marking-team',
      fr: { term: 'Superviseur', aliases: [], def: 'Membre du Marking Team qui supervise la notation d’un sous-critère.' },
      en: { term: 'Supervisor', aliases: [], def: 'Member of the Marking Team who supervises the marking of a sub-criterion.' } },
    { id: 'expert', page: 'signoff',
      fr: { term: 'Expert', aliases: [], def: 'Responsable du métier pendant la compétition. Il valide le barème et clôture les étapes de signature.' },
      en: { term: 'Expert', aliases: [], def: 'The person in charge of the skill during the competition. Approves the marking scheme and closes sign-off steps.' } },
    { id: 'expert-adjoint', page: 'so-competition-steps',
      fr: { term: 'Expert adjoint', aliases: [], def: 'Assiste l’Expert : il peut recueillir les signatures, mais seul l’Expert clôture les étapes.' },
      en: { term: 'Deputy Expert', aliases: [], def: 'Assists the Expert: can collect signatures, but only the Expert closes steps.' } },
    { id: 'team-leader', page: 'so-connect',
      fr: { term: 'Team Leader', aliases: [], def: 'Interlocuteur de l’Expert au sein de l’organisation, à contacter en cas de difficulté.' },
      en: { term: 'Team Leader', aliases: [], def: 'The Expert’s point of contact in the organisation, to call on in case of difficulty.' } },
    { id: 'secretariat', page: 'so-competition-steps',
      fr: { term: 'Secrétariat de compétition', aliases: [], def: 'Équipe d’organisation qui centralise les identités, plannings et documents de la compétition.' },
      en: { term: 'Competition secretariat', aliases: [], def: 'The organising team that centralises identities, schedules and documents for the competition.' } },
    { id: 'jours-c', page: 'signoff',
      fr: { term: 'C-2, C-1, C1…', aliases: ['C-2', 'C-1'], def: 'Jours relatifs à la compétition : C-2 et C-1 sont les jours de préparation avant les épreuves, C1, C2 et C3 les jours d’épreuve.' },
      en: { term: 'C-2, C-1, C1…', aliases: ['C-2', 'C-1'], def: 'Days relative to the competition: C-2 and C-1 are preparation days before the test, C1, C2 and C3 are competition days.' } },
    { id: 'classeur-metier', page: 'signoff',
      fr: { term: 'Classeur Métier', aliases: [], def: 'Le classeur de référence du métier pendant la compétition, tenu par l’Expert. Il contient notamment le PV journalier.' },
      en: { term: 'Skill workbook', aliases: ['Classeur Métier'], def: 'The skill’s reference binder during the competition, kept by the Expert. It includes the daily report.' } },
    { id: 'pv-journalier', page: 'so-closing',
      fr: { term: 'PV journalier', aliases: [], def: 'Procès-verbal quotidien du Classeur Métier, où sont consignés les événements du jour (absence, refus de signer…).' },
      en: { term: 'Daily report', aliases: [], def: 'The daily record in the skill workbook, logging the day’s events (absence, refusal to sign…).' } },
    { id: 'emargement', page: 'so-daily-signoff',
      fr: { term: 'Émargement', aliases: ['émargements', 'émarger'], def: 'Signature quotidienne attestant de la présence d’un participant.' },
      en: { term: 'Attendance sign-in', aliases: ['sign-in'], def: 'Daily signature confirming that a participant is present.' } },
    { id: 'wsss', page: 'marking-scheme',
      fr: { term: 'WSSS / WSOS', aliases: ['WSSS'], def: 'WorldSkills Standards Specification / Occupational Standards : le référentiel de compétences du métier, dont les sections peuvent être importées avec le barème.' },
      en: { term: 'WSSS / WSOS', aliases: ['WSSS'], def: 'WorldSkills Standards Specification / Occupational Standards: the skill’s competency framework, whose sections can be imported with the marking scheme.' } },
    { id: 'cnat', page: 'signoff',
      fr: { term: 'CNAT 48', aliases: ['CNAT48'], def: '48ᵉ Compétition Nationale WorldSkills France, organisée à Marseille en 2025.' },
      en: { term: 'CNAT 48', aliases: ['CNAT48'], def: 'The 48th WorldSkills France National Competition, held in Marseille in 2025.' } }
  ],

  pages: [
    /* ================================================================== */
    /*  PRISE EN MAIN                                                      */
    /* ================================================================== */
    {
      id: 'decouvrir-le-cis', category: 'start', order: 1, level: 'beginner', status: 'published',
      menuPath: '', prereq: [], video: 'video-intro', tags: ['introduction', 'débuter', 'vocabulaire', 'getting started'],
      createdAt: '2026-11-21T09:00:00+01:00', createdBy: 'admin', updatedAt: '2026-11-21T09:00:00+01:00', updatedBy: 'admin',
      history: [{ at: '2026-11-21T09:00:00+01:00', by: 'admin', note: 'Nouvelle page d’accueil pour les débutants (FR + EN)' }],
      fr: {
        title: 'Découvrir le CIS', short: 'Découvrir le CIS',
        summary: 'Ce qu’est le CIS, à quoi il sert et comment se déroule la notation d’une compétition, étape par étape.',
        objectives: ['Comprendre à quoi sert le CIS', 'Connaître les 7 étapes de la notation', 'Maîtriser le vocabulaire de base du barème'],
        quick: [
          'Barème › Verrouillage › Marking Days › Marking Team › Marking Forms › Saisie › Résultats',
          'Barème = critères › sous-critères › aspects, total **100 points**',
          '*Measurement* = objectif, calculable · *Judgement* = 0 à 3 par juré',
          'Accès : [cis.worldskills-france.org](https://cis.worldskills-france.org/) avec les identifiants de votre compétition'
        ],
        body: `Le **CIS** (*Competition Information System*) est l'outil utilisé par WorldSkills France pour gérer la notation des compétitions : création du barème, organisation des jurés, saisie des notes et édition des résultats.

## Les grandes étapes

La notation d'un métier suit toujours le même ordre. Chaque étape dépend de la précédente :

1. [[marking-scheme|Créer le Marking Scheme]] — le barème de notation, sur 100 points.
2. [[lock-marking-scheme|Verrouiller le Marking Scheme]] — plus aucune modification n'est possible.
3. [[marking-days|Planifier les Marking Days]] — quel jour chaque sous-critère est noté.
4. [[marking-team|Composer le Marking Team]] — quels jurés notent chaque sous-critère.
5. [[marking-forms|Imprimer les Marking Forms]] — les feuilles de notation des jurés.
6. [[enter-marks|Saisir les notes]] — pendant la compétition.
7. [[results|Éditer les résultats]] — feuilles complétées et classement.

![Schéma de fonctionnement du CIS](media:start/cis.png)

## Le vocabulaire à connaître

Le barème est organisé en trois niveaux :

| Niveau | Exemple | Rôle |
|---|---|---|
| Critère | A – Préparation | Grande partie de l'épreuve |
| Sous-critère | A1 – Organisation du poste | Groupe d'aspects notés **en même temps** |
| Aspect | A1.3 – Poste rangé en fin de journée | Élément noté individuellement |

Il existe deux types d'aspects :

- **Measurement** (objectif) : la note se mesure — une longueur, un temps, un nombre… Le CIS peut la calculer automatiquement grâce aux [[marking-types|Marking Types]].
- **Judgement** (subjectif) : chaque juré attribue une note de 0 à 3, puis le CIS calcule la note finale.

> [!TIP]
> Un terme vous est inconnu ? Consultez le [glossaire](glossary.html) ou survolez les mots soulignés en pointillés.

## Accéder au CIS

Rendez-vous sur [cis.worldskills-france.org](https://cis.worldskills-france.org/) et connectez-vous au CIS de votre compétition avec les identifiants qui vous ont été fournis.

:::guided
**Conseil pour bien démarrer** : suivez les pages dans l'ordre du parcours. En bas de chaque page, le bouton « Étape suivante » vous emmène directement à la suite.
:::`
      },
      en: {
        title: 'Discover the CIS', short: 'Discover the CIS',
        summary: 'What the CIS is, what it is for, and how competition marking works, step by step.',
        objectives: ['Understand what the CIS is for', 'Know the 7 marking steps', 'Learn the basic marking scheme vocabulary'],
        quick: [
          'Marking scheme › Lock › Marking Days › Marking Team › Marking Forms › Mark entry › Results',
          'Marking scheme = criteria › sub-criteria › aspects, **100 marks** in total',
          '*Measurement* = objective, can be calculated · *Judgement* = 0 to 3 per juror',
          'Access: [cis.worldskills-france.org](https://cis.worldskills-france.org/) with your competition credentials'
        ],
        body: `The **CIS** (*Competition Information System*) is the tool used by WorldSkills France to manage competition marking: building the marking scheme, organising jurors, entering marks and producing results.

## The main steps

Marking for a skill always follows the same order. Each step depends on the previous one:

1. [[marking-scheme|Create the Marking Scheme]] — the marking grid, out of 100 marks.
2. [[lock-marking-scheme|Lock the Marking Scheme]] — no further changes are possible.
3. [[marking-days|Plan the Marking Days]] — which day each sub-criterion is marked.
4. [[marking-team|Set up the Marking Team]] — which jurors mark each sub-criterion.
5. [[marking-forms|Print the Marking Forms]] — the jurors' marking sheets.
6. [[enter-marks|Enter the marks]] — during the competition.
7. [[results|Produce the results]] — completed forms and rankings.

![How the CIS works](media:start/cis.png)

## Key vocabulary

The marking scheme has three levels:

| Level | Example | Purpose |
|---|---|---|
| Criterion | A – Preparation | A major part of the test project |
| Sub-criterion | A1 – Workstation organisation | A group of aspects marked **at the same time** |
| Aspect | A1.3 – Workstation tidy at the end of the day | An item marked individually |

There are two kinds of aspects:

- **Measurement** (objective): the mark is measured — a length, a time, a count… The CIS can calculate it automatically with [[marking-types|Marking Types]].
- **Judgement** (subjective): each juror gives a score from 0 to 3, then the CIS calculates the final mark.

> [!TIP]
> Don't know a term? Check the [glossary](glossary.html) or hover over words with a dotted underline.

## Accessing the CIS

Go to [cis.worldskills-france.org](https://cis.worldskills-france.org/) and sign in to your competition's CIS with the credentials you were given.

:::guided
**Getting started tip**: follow the pages in order. At the bottom of each page, the "Next step" button takes you straight to what comes next.
:::`
      }
    },

    {
      id: 'cis-505', category: 'start', order: 2, level: 'beginner', status: 'published',
      menuPath: '', prereq: [], video: '', tags: ['version', 'nouveautés', 'release notes', '5.0.5'],
      source: 'cis_505', createdAt: '2025-03-08T14:03:00+01:00', createdBy: 'import', updatedAt: '2026-11-21T09:00:00+01:00', updatedBy: 'admin',
      history: [
        { at: '2025-03-08T14:03:00+01:00', by: 'import', note: 'Dernière version sur DokuWiki (page « cis_505 »)', legacy: 'cis_505' },
        { at: '2026-11-21T09:00:00+01:00', by: 'admin', note: 'Refonte : nouvelle mise en page et traduction anglaise' }
      ],
      fr: {
        title: 'CIS 5.0.5 : nouveautés', short: 'Nouveautés 5.0.5',
        summary: 'La liste des changements apportés par la version 5.0.5 du CIS.',
        objectives: ['Connaître les nouvelles fonctions de la version 5.0.5'],
        quick: ['Marking Scheme modifiable en ligne', 'Dates de compétition par métier', 'Saisie des notes suspendable par métier', 'Photos par aspect noté'],
        body: `La liste des changements dans la version 5.0.5 :

- La modification du Marking Scheme peut se faire dans l'interface web.
- Les dates de compétition peuvent être définies pour chaque métier.
- La saisie des notes peut être suspendue pour chaque métier, dans le cas où le CIS est accessible en dehors du site de compétition.
- Il est possible de prendre des photos pour chaque aspect noté.

> [!TIP]
> Pour modifier le barème en ligne, consultez la section « Créer ou modifier le Marking Scheme en ligne » de la page [[marking-scheme|Marking Scheme]].`
      },
      en: {
        title: 'CIS 5.0.5: what’s new', short: 'What’s new in 5.0.5',
        summary: 'The list of changes introduced in CIS version 5.0.5.',
        objectives: ['Know the new features of version 5.0.5'],
        quick: ['Marking Scheme can be edited online', 'Competition dates per skill', 'Mark entry can be suspended per skill', 'Photos for each marked aspect'],
        body: `Changes in version 5.0.5:

- The Marking Scheme can be edited in the web interface.
- Competition dates can be set for each skill.
- Mark entry can be suspended for each skill, in case the CIS is reachable from outside the competition venue.
- Photos can be taken for each marked aspect.

> [!TIP]
> To edit the marking scheme online, see the "Create or edit the Marking Scheme online" section of the [[marking-scheme|Marking Scheme]] page.`
      }
    },

    {
      id: 'cis-412', category: 'start', order: 3, level: 'intermediate', status: 'published',
      menuPath: '', prereq: [], video: '', tags: ['version', 'archive', 'release notes', '4.1.2'],
      source: 'cis_412', createdAt: '2020-09-06T06:59:00+02:00', createdBy: 'import', updatedAt: '2026-11-21T09:00:00+01:00', updatedBy: 'admin',
      history: [
        { at: '2020-09-06T06:59:00+02:00', by: 'import', note: 'Dernière version sur DokuWiki (page « cis_412 »)', legacy: 'cis_412' },
        { at: '2026-11-21T09:00:00+01:00', by: 'admin', note: 'Refonte : nouvelle mise en page et traduction anglaise' }
      ],
      fr: {
        title: 'CIS 4.1.2 : nouveautés (archive)', short: 'Nouveautés 4.1.2',
        summary: 'Les changements de la version 4.1.2, conservés pour référence.',
        objectives: ['Connaître les fonctions apparues en version 4.1.2'],
        quick: ['Export/import WSSS et règles de calcul', 'Marking Day depuis Excel', 'Requirement utilisable dans les calculs', 'Nouvelle règle Regular Difference Deduction', 'Option No Attempt'],
        body: `> [!NOTE] Ancienne version
> Cette page concerne une ancienne version du CIS. La version actuelle est décrite dans [[cis-505|CIS 5.0.5 : nouveautés]].

La liste des changements dans la version 4.1.2 :

- La modification du Marking Scheme peut se faire dans l'interface web.
- Exportation et importation de la *WorldSkills Standards Specification*.
- Exportation et importation des règles de calcul du Marking Scheme.
- Affectation du *Marking Day* depuis le fichier Excel (exportation et importation possibles).
- Les valeurs de la colonne *Requirement* du Marking Scheme peuvent être utilisées dans les règles de calcul.
- Nouvelle règle de calcul [[marking-types|Regular Difference Deduction]] : déductions de points régulières.
- Nouveau Marking Form pour les modifications de points : *Sign off form for Changed Marks*.
- Possibilité de masquer les valeurs *Requirement* sur les feuilles de notation manuscrites.
- Si un aspect *Measurement* ne peut pas être évalué (non réalisé), l'option *No Attempt* peut être sélectionnée lors de la saisie des notes.`
      },
      en: {
        title: 'CIS 4.1.2: what’s new (archive)', short: 'What’s new in 4.1.2',
        summary: 'Changes in version 4.1.2, kept for reference.',
        objectives: ['Know the features introduced in version 4.1.2'],
        quick: ['WSSS and calculation rules export/import', 'Marking Day from Excel', 'Requirement usable in calculations', 'New Regular Difference Deduction rule', 'No Attempt option'],
        body: `> [!NOTE] Older version
> This page covers an older version of the CIS. The current version is described in [[cis-505|CIS 5.0.5: what's new]].

Changes in version 4.1.2:

- The Marking Scheme can be edited in the web interface.
- Export and import of the *WorldSkills Standards Specification*.
- Export and import of Marking Scheme calculation rules.
- *Marking Day* assignment from the Excel file (export and import available).
- Values in the Marking Scheme *Requirement* column can be used in calculation rules.
- New calculation rule [[marking-types|Regular Difference Deduction]]: regular mark deductions.
- New Marking Form for mark changes: *Sign off form for Changed Marks*.
- *Requirement* values can be hidden on hand-written marking forms.
- If a *Measurement* aspect cannot be assessed (not attempted), the *No Attempt* option can be selected during mark entry.`
      }
    },

    /* ================================================================== */
    /*  NOTATION AVEC LE CIS                                               */
    /* ================================================================== */
    {
      id: 'marking-scheme', category: 'cis', order: 1, step: 1, level: 'beginner', status: 'published',
      menuPath: 'Marking Scheme › Marking Scheme', prereq: ['decouvrir-le-cis'], video: 'video-marking-scheme',
      tags: ['barème', 'excel', 'import', 'wsss', 'template'],
      source: 'marking_scheme', createdAt: '2025-03-14T16:41:00+01:00', createdBy: 'import', updatedAt: '2026-11-21T09:00:00+01:00', updatedBy: 'admin',
      history: [
        { at: '2025-03-14T16:41:00+01:00', by: 'marie', note: 'Dernière version sur DokuWiki (page « marking_scheme »)', legacy: 'marking_scheme' },
        { at: '2026-11-21T09:00:00+01:00', by: 'admin', note: 'Refonte : nouvelle mise en page et traduction anglaise' }
      ],
      fr: {
        title: 'Marking Scheme : la grille de notation', short: 'Marking Scheme',
        summary: 'Télécharger le modèle Excel, le compléter, l’importer dans le CIS — ou créer et modifier le barème directement en ligne.',
        objectives: ['Préparer le fichier Excel du barème', 'Importer le barème dans le CIS', 'Comprendre et corriger les erreurs d’import'],
        quick: [
          'Télécharger [cis_marking_scheme_template_v5.0.xlsx](media:marking_scheme/cis_marking_scheme_template_v5.0.xlsx)',
          'Regrouper dans un même sous-critère les aspects notés en même temps',
          'Total = **100 points**, structure du fichier inchangée',
          '**Marking Scheme** › **Marking Scheme** › *Import Marking Scheme* › fichier › **Import** › **OK**',
          'Décocher *Import the WorldSkills Occupational Standard sections*, sauf si la section WSSS est remplie',
          'Modifiable en ligne jusqu’à la première note saisie'
        ],
        body: `## 1. Télécharger le fichier Excel

Téléchargez le modèle officiel : [cis_marking_scheme_template_v5.0.xlsx](media:marking_scheme/cis_marking_scheme_template_v5.0.xlsx)

## 2. Compléter le fichier

> [!IMPORTANT]
> Regroupez dans un même **sous-critère** les aspects qui pourront être corrigés en même temps : le Marking Days se fait au niveau du sous-critère, et non de l'aspect.

![Critères et sous-critères dans le modèle Excel](media:marking_scheme/marking_scheme_part1.png)
![Aspects dans le modèle Excel](media:marking_scheme/marking_scheme_part2.png)

> [!WARNING] Règles à respecter
> - Complétez le fichier avec tous les critères.
> - Ne modifiez pas la structure du fichier : ne supprimez ni n'ajoutez d'information dans les colonnes non exploitées.
> - La somme des points doit être égale à **100**.
> - Un critère ne peut pas faire plus de **2 points**.

## 3. Importer le fichier dans le CIS

Allez sur [cis.worldskills-france.org](https://cis.worldskills-france.org/) et connectez-vous au CIS correspondant à votre compétition avec les identifiants fournis :

![Page de connexion du CIS](media:marking_scheme/marking_scheme_part3.png)

1. Cliquez sur **Marking Scheme**.
2. Puis sur **Marking Scheme**.
3. Dans la partie *Import Marking Scheme*, sélectionnez le fichier Excel complété.
4. Si vous avez déjà effectué un import, vous pouvez conserver les règles de calcul et le Marking Days en cochant les options correspondantes. **Attention à bien décocher la case *Import the WorldSkills Occupational Standard sections*.**
5. Cliquez sur **Import**.
6. Un message vous informe que l'importation écrasera le Marking Scheme existant : cliquez sur **OK**.

> [!NOTE]
> Si vous avez rempli la section *WorldSkills Standards Specification* et la colonne *WSSS Section* dans votre fichier Excel, cochez bien la case **Import the WorldSkills Standards Specification sections** pour que l'importation fonctionne sans erreur.

> [!WARNING]
> Si des critères et aspects sont déjà présents dans le CIS, ils seront **complètement écrasés** par l'importation.

![Formulaire d'import du Marking Scheme](media:marking_scheme/marking_scheme_part4.png)
![Options d'import du Marking Scheme](media:marking_scheme/marking_scheme_part4b.png)

À la fin de l'importation, un message en haut à droite de la fenêtre vous indique le résultat. S'il n'y a pas d'erreur :

![Message de confirmation d'un import réussi](media:marking_scheme/marking_scheme_part5.png)

En cas d'erreur, le message vous donne une information pour corriger le fichier :

![Message d'erreur d'import](media:marking_scheme/marking_scheme_part6.png)
![Détail d'une erreur d'import](media:marking_scheme/marking_scheme_part7.png)

> [!TIP]
> Au besoin, envoyez votre fichier Excel par e-mail à [cis@cofom.org](mailto:cis@cofom.org).

## 4. Créer ou modifier le Marking Scheme en ligne

Depuis le menu **Marking Scheme**, vous pouvez créer ou modifier le barème directement dans le CIS.

![Édition du Marking Scheme en ligne](media:marking_scheme/marking_scheme_part8.png)

> [!NOTE]
> Les données saisies sont validées automatiquement lorsque vous changez de champ ou appuyez sur ++Entrée++ : il n'y a pas de bouton d'enregistrement.

> [!WARNING]
> Dès la saisie d'une première note, vous ne pourrez plus modifier votre Marking Scheme.

:::expert
**Pour aller plus loin** : automatisez le calcul des notes *Measurement* avec les [[marking-types|Marking Types]].
:::`
      },
      en: {
        title: 'Marking Scheme: the marking grid', short: 'Marking Scheme',
        summary: 'Download the Excel template, fill it in and import it into the CIS — or create and edit the marking scheme directly online.',
        objectives: ['Prepare the marking scheme Excel file', 'Import the marking scheme into the CIS', 'Understand and fix import errors'],
        quick: [
          'Download [cis_marking_scheme_template_v5.0.xlsx](media:marking_scheme/cis_marking_scheme_template_v5.0.xlsx)',
          'Group aspects marked at the same time in one sub-criterion',
          'Total = **100 marks**, file structure unchanged',
          '**Marking Scheme** › **Marking Scheme** › *Import Marking Scheme* › file › **Import** › **OK**',
          'Untick *Import the WorldSkills Occupational Standard sections*, unless the WSSS section is filled in',
          'Editable online until the first mark is entered'
        ],
        body: `## 1. Download the Excel file

Download the official template: [cis_marking_scheme_template_v5.0.xlsx](media:marking_scheme/cis_marking_scheme_template_v5.0.xlsx)

## 2. Fill in the file

> [!IMPORTANT]
> Group into one **sub-criterion** the aspects that can be marked at the same time: Marking Days are set per sub-criterion, not per aspect.

![Criteria and sub-criteria in the Excel template](media:marking_scheme/marking_scheme_part1.png)
![Aspects in the Excel template](media:marking_scheme/marking_scheme_part2.png)

> [!WARNING] Rules to follow
> - Fill in the file with all criteria.
> - Do not change the file structure: do not delete or add information in unused columns.
> - The total must equal **100** marks.
> - A criterion cannot be worth more than **2 marks**.

## 3. Import the file into the CIS

Go to [cis.worldskills-france.org](https://cis.worldskills-france.org/) and sign in to your competition's CIS with the credentials provided:

![CIS sign-in page](media:marking_scheme/marking_scheme_part3.png)

1. Click **Marking Scheme**.
2. Then click **Marking Scheme**.
3. In the *Import Marking Scheme* section, select the completed Excel file.
4. If you have already imported once, you can keep the calculation rules and Marking Days by ticking the matching options. **Make sure to untick *Import the WorldSkills Occupational Standard sections*.**
5. Click **Import**.
6. A message warns that the import will overwrite the existing Marking Scheme: click **OK**.

> [!NOTE]
> If you filled in the *WorldSkills Standards Specification* section and the *WSSS Section* column in your Excel file, tick **Import the WorldSkills Standards Specification sections** so the import runs without errors.

> [!WARNING]
> Any criteria and aspects already in the CIS will be **completely overwritten** by the import.

![Marking Scheme import form](media:marking_scheme/marking_scheme_part4.png)
![Marking Scheme import options](media:marking_scheme/marking_scheme_part4b.png)

When the import finishes, a message at the top right of the window shows the result. If there are no errors:

![Successful import message](media:marking_scheme/marking_scheme_part5.png)

If there are errors, the message tells you how to fix the file:

![Import error message](media:marking_scheme/marking_scheme_part6.png)
![Import error details](media:marking_scheme/marking_scheme_part7.png)

> [!TIP]
> If needed, email your Excel file to [cis@cofom.org](mailto:cis@cofom.org).

## 4. Create or edit the Marking Scheme online

From the **Marking Scheme** menu, you can create or edit the marking scheme directly in the CIS.

![Editing the Marking Scheme online](media:marking_scheme/marking_scheme_part8.png)

> [!NOTE]
> Entries are saved automatically when you move to another field or press ++Enter++: there is no save button.

> [!WARNING]
> Once the first mark has been entered, you can no longer change your Marking Scheme.

:::expert
**Going further**: automate *Measurement* marks with [[marking-types|Marking Types]].
:::`
      }
    },

    {
      id: 'marking-types', category: 'cis', order: 2, level: 'advanced', status: 'published',
      menuPath: 'Marking Scheme › Calculations', prereq: ['marking-scheme'], video: '',
      tags: ['calculs', 'formules', 'ranged score', 'percent score comparison', 'stepped score comparison', 'number completed', 'regular difference deduction'],
      source: 'marking_type', createdAt: '2020-09-06T06:59:00+02:00', createdBy: 'import', updatedAt: '2026-11-21T09:00:00+01:00', updatedBy: 'admin',
      history: [
        { at: '2020-09-06T06:59:00+02:00', by: 'import', note: 'Dernière version sur DokuWiki (page « marking_type »)', legacy: 'marking_type' },
        { at: '2026-11-21T09:00:00+01:00', by: 'admin', note: 'Refonte : nouvelle mise en page et traduction anglaise' }
      ],
      fr: {
        title: 'Marking Types : les règles de calcul', short: 'Marking Types (calculs)',
        summary: 'Les six règles de calcul automatique des aspects Measurement, avec leurs paramètres et des exemples chiffrés.',
        objectives: ['Créer une règle de calcul sur un aspect', 'Choisir le bon Marking Type', 'Lire et vérifier les formules de calcul'],
        quick: [
          '**Marking Scheme** › **Calculations** › sous-critère › **Add New** (au niveau de l’aspect)',
          '*Direct Mark Entry* : saisie directe (par défaut)',
          '*Ranged Score* : jusqu’à 10 plages autour d’une cible (valeur fixe ou colonne *Requirement*)',
          '*Number Completed* : valeur ÷ *Maximum Number Possible* × note max',
          '*Regular Difference Deduction* : déduction fixe par pas de *Difference Amount*',
          '*Percent Score Comparison* : (écart au moins bon ÷ écart total) × M, bornes *Min/Max Value* optionnelles',
          '*Stepped Score Comparison* : M − ENT(écart ÷ V) × D, ou proportionnel',
          'Les comparaisons sont calculées à la saisie du dernier candidat'
        ],
        body: `Le CIS peut effectuer divers calculs sur les valeurs saisies pour un aspect afin de générer automatiquement une note.

Par exemple, un aspect peut consister à chronométrer le temps de réalisation d'une tâche et à attribuer une note en fonction de ce temps. Il suffit alors de saisir le temps chronométré : le CIS calcule les notes des candidats.

## Créer une règle de calcul

Cliquez sur **Marking Scheme** puis **Calculations** :

![Menu Marking Scheme › Calculations](media:marking_type/marking_type_part00.png)

Choisissez le sous-critère puis, au niveau de l'aspect, cliquez sur **Add New** :

![Bouton Add New au niveau de l'aspect](media:marking_type/marking_type_part0.png)

Il existe actuellement six *Marking Types* :

| Marking Type | Principe | Compare les candidats |
|---|---|:---:|
| Direct Mark Entry | Saisie directe de la note (par défaut) | Non |
| Ranged Score | Plages de tolérance autour d'une valeur cible | Non |
| Number Completed | Proportion réalisée par rapport à un maximum | Non |
| Regular Difference Deduction | Déduction régulière selon l'écart à la cible | Non |
| Percent Score Comparison | Note proportionnelle entre le meilleur et le moins bon | Oui |
| Stepped Score Comparison | Déduction par paliers à partir du meilleur | Oui |

:::guided
> [!TIP]
> Les exemples de cette page utilisent un sujet fictif : la réalisation d'un bonhomme de neige. Les valeurs sont volontairement simples pour faciliter la lecture des formules.
:::

## Direct Mark Entry

C'est le *Marking Type* par défaut : pas de calcul, les notes sont saisies directement dans le CIS.

## Ranged Score

Ce *Marking Type* calcule la note à partir de la différence entre la valeur du candidat et la valeur cible. Vous pouvez définir jusqu'à dix plages de valeurs, avec le nombre de points à déduire pour chacune. Si la valeur n'est dans aucune plage, la note est de zéro.

La valeur cible peut être la valeur saisie dans la colonne *Requirement* du Marking Scheme.

Paramètres :

- **Target Value** : la valeur que le candidat doit atteindre, **ou**
- **Use Aspect Requirements for Target Value** : utilise comme valeur cible la colonne *Requirement* du Marking Scheme.
- **Mark Deduction Type** : *Number of Marks* (un nombre de points) ou *Percentage of Max Marks* (un pourcentage de la note maximale).
- **Range 1 … 10** : les plages, avec le nombre ou le pourcentage de points déduits pour les valeurs comprises dans chaque plage.

**Exemple** : l'aspect est *Longueur de la jambe droite du bonhomme de neige, du bassin à la cheville*, noté sur 1,50 point.

- La valeur idéale est de 800 mm.
- Tolérance de −5 mm / +5 mm : la première plage déduit zéro point ⇒ 1,5 − 0 = **1,5 point**.
- Entre ±5 mm et ±10 mm : déduction de 0,5 point ⇒ 1,5 − 0,5 = **1,0 point**.
- Entre ±10 mm et ±15 mm : déduction de 1 point ⇒ 1,5 − 1,0 = **0,5 point**.
- Au-delà de ±15 mm : **zéro point**.

![Ranged Score avec déduction en nombre de points](media:marking_type/marking_type_part1.png)

Le même exemple, en déduisant un pourcentage de la note maximale, donne le même résultat :

![Ranged Score avec déduction en pourcentage](media:marking_type/marking_type_part2.png)

## Number Completed

Ce *Marking Type* calcule le rapport entre la valeur saisie et le nombre maximum possible, puis en déduit la note.

Le seul paramètre requis est **Maximum Number Possible**.

![Paramétrage Number Completed](media:marking_type/marking_type_part3.png)

**Exemple** : l'aspect est *Nombre d'accessoires vestimentaires sur le bonhomme de neige*, noté sur 2,00 points. Si le candidat a placé 4 accessoires sur 8, il obtient 50 % de la note maximale ⇒ 2,00 × 50 % = **1,00 point**.

## Regular Difference Deduction

Ce *Marking Type* calcule la note à partir de la différence entre la valeur du candidat et la valeur cible. La tolérance et le nombre de points déduits sont proportionnels.

La valeur cible peut être la valeur saisie dans la colonne *Requirement* du Marking Scheme.

Paramètres :

- **Target Value** : la valeur que le candidat doit atteindre, **ou**
- **Use Aspect Requirements for Target Value** : utilise comme valeur cible la colonne *Requirement* du Marking Scheme.
- **Measurement Difference Type** : *Unit of Measurement* (unité de mesure) ou *Percentage Difference* (écart en pourcentage).
- **Difference Amount** : le pas entre chaque déduction de points.
- **Mark Deduction Type** : *Number of Marks* ou *Percentage of Max Marks*.

**Exemple** : l'aspect est *Longueur de la jambe droite du bonhomme de neige*, noté sur 1,50 point. La valeur idéale est de 800 mm, avec une tolérance de 5 mm et une déduction de 0,5 point par pas.

![Paramétrage Regular Difference Deduction](media:marking_type/marking_type_part10.png)

## Percent Score Comparison

Ce *Marking Type* compare les résultats de tous les candidats pour un aspect. Il attribue la note maximale au candidat ayant la meilleure valeur et zéro au candidat ayant la moins bonne. Les autres candidats reçoivent un pourcentage de la note maximale selon l'écart entre leur valeur et la meilleure valeur.

Paramètres (un obligatoire, deux optionnels) :

- **Highest Mark to Highest Value / Lowest Value** : indique si la meilleure valeur est la plus élevée ou la plus faible.
- **Minimum Value** (optionnel) : borne minimum. Les candidats dont la valeur est égale ou inférieure à *Minimum Value* reçoivent la note maximale (avec *Lowest Value*) ou zéro (avec *Highest Value*).
- **Maximum Value** (optionnel) : borne maximum. Les candidats dont la valeur est égale ou supérieure à *Maximum Value* reçoivent la note maximale (avec *Highest Value*) ou zéro (avec *Lowest Value*).

![Paramétrage Percent Score Comparison](media:marking_type/marking_type_part4.png)

### Exemple 1 : le plus rapide gagne

L'aspect est *Speed module : faire cinq boules de neige*, noté sur 2,00 points. Le paramètre *Highest Mark to* est réglé sur **Lowest Value**.

Le meilleur candidat a réalisé la tâche en 30 secondes, le moins bon en 90 secondes, soit un écart de 60 secondes. Une fois le temps de tous les candidats saisi, les points sont calculés ainsi :

**M** = note max = 2 · **T** = résultat max = 90 · **t** = résultat min = 30 · **A** = résultat du candidat

| Candidat | Temps (A) | Écart avec le moins bon (T − A) | Formule (T − A) / (T − t) × M | Points |
|---|---:|---:|---|---:|
| 1 | **30** | 90 − 30 = **60** | 60 / 60 × 2 | 2 |
| 2 | **50** | 90 − 50 = **40** | 40 / 60 × 2 | 1,33 |
| 3 | **60** | 90 − 60 = **30** | 30 / 60 × 2 | 1 |
| 4 | **90** | 90 − 90 = **0** | 0 / 60 × 2 | 0 |

Le même exemple avec l'option *Maximum Value* = 60 :

| Candidat | Temps (A) | Écart avec la borne (60 − A) | Formule | Points |
|---|---:|---:|---|---:|
| 1 | **30** | 60 − 30 = **30** | 30 / 30 × 2 | 2 |
| 2 | **50** | 60 − 50 = **10** | 10 / 30 × 2 | 0,67 |
| 3 | 60 (max 60) | 0 | 0 / 30 × 2 | 0 |
| 4 | 90 (max 60) | 0 | 0 / 30 × 2 | 0 |

### Exemple 2 : le plus grand nombre gagne

L'aspect est *Speed module : faire un maximum de boules de neige en 15 minutes*, noté sur 2,00 points. Le paramètre *Highest Mark to* est réglé sur **Highest Value**.

Le meilleur candidat a réalisé 30 boules, le moins bon 15, soit un écart de 15 :

**M** = note max = 2 · **T** = résultat max = 30 · **t** = résultat min = 15 · **A** = résultat du candidat

| Candidat | Boules (A) | Écart avec le moins bon (A − t) | Formule (A − t) / (T − t) × M | Points |
|---|---:|---:|---|---:|
| 1 | **30** | 30 − 15 = **15** | 15 / 15 × 2 | 2 |
| 2 | **25** | 25 − 15 = **10** | 10 / 15 × 2 | 1,33 |
| 3 | **20** | 20 − 15 = **5** | 5 / 15 × 2 | 0,67 |
| 4 | **15** | 15 − 15 = **0** | 0 / 15 × 2 | 0 |

Le même exemple avec l'option *Minimum Value* = 20 :

| Candidat | Boules (A) | Écart avec la borne (A − 20) | Formule | Points |
|---|---:|---:|---|---:|
| 1 | **30** | 30 − 20 = **10** | 10 / 10 × 2 | 2 |
| 2 | **25** | 25 − 20 = **5** | 5 / 10 × 2 | 1 |
| 3 | 20 (min 20) | 0 | 0 / 10 × 2 | 0 |
| 4 | 15 (min 20) | 0 | 0 / 10 × 2 | 0 |

## Stepped Score Comparison

Ce *Marking Type* compare les résultats de tous les candidats pour un aspect et attribue la note maximale au candidat ayant la meilleure valeur (la plus élevée ou la plus faible). Les points des autres candidats sont calculés à partir de leur écart avec la meilleure valeur. Si le nombre de points à déduire dépasse la note maximale de l'aspect, le candidat obtient 0 point.

Paramètres :

- **Highest Mark to Highest Value / Lowest Value** : indique si la meilleure valeur est la plus élevée ou la plus faible.
- **Results Based On Value Difference / Percentage Difference** : la taille des intervalles est une valeur fixe ou un pourcentage.
- **Value or Percentage Interval** : valeur ou pourcentage de l'intervalle.
- **Marks Deducted per Difference** : nombre de points déduits par intervalle.
- **Deductions are Proportional** : à cocher si la déduction est proportionnelle ; sinon, elle se fait par paliers.

![Paramétrage Stepped Score Comparison](media:marking_type/marking_type_part5.png)

### Exemple 1 : paliers de 50 mm

L'aspect est *Mesurer la hauteur du bonhomme de neige*, noté sur 2,00 points. *Highest Mark to* est réglé sur **Highest Value**, avec une déduction de 0,5 point par intervalle de 50 mm.

![Paliers de 50 mm](media:marking_type/marking_type_part6.png)

Le meilleur candidat a réalisé un bonhomme de 1 700 mm. Il y a donc 4 paliers jusqu'à 1 500 mm, valeur à partir de laquelle la note est de 0 point :

**M** = note max = 2 · **D** = déduction = 0,5 · **V** = intervalle = 50 · **T** = résultat max = 1 700 · **A** = résultat du candidat · **ENT()** = arrondi à l'entier inférieur

| Candidat | Mesure (A) | Intervalles entiers ENT((T − A) / V) | Formule M − ENT((T − A) / V) × D | Points |
|---|---:|---:|---|---:|
| 1 | 1 700 | **0** | 2 − 0 × 0,5 | 2 |
| 2 | 1 637 | **1** | 2 − 1 × 0,5 | 1,5 |
| 3 | 1 587 | **2** | 2 − 2 × 0,5 | 1 |
| 4 | 1 498 | **4** | 2 − 4 × 0,5 | 0 |

### Exemple 2 : déduction proportionnelle

Le même exemple avec une déduction proportionnelle (toute mesure inférieure ou égale à 1 500 mm donne 0 point) :

![Déduction proportionnelle](media:marking_type/marking_type_part7.png)

| Candidat | Mesure (A) | Écart avec le meilleur (T − A) | Formule M − (T − A) / V × D | Points |
|---|---:|---:|---|---:|
| 1 | 1 700 | **0** | 2 − 0 / 50 × 0,5 | 2 |
| 2 | 1 637 | **63** | 2 − 63 / 50 × 0,5 | 1,37 |
| 3 | 1 587 | **113** | 2 − 113 / 50 × 0,5 | 0,87 |
| 4 | 1 498 | **202** | 2 − 202 / 50 × 0,5 | 0 |

### Exemple 3 : paliers en pourcentage

Déduction par paliers de 0,5 point, l'intervalle étant de 10 % de la meilleure valeur (la mesure la plus grande) :

![Paliers en pourcentage](media:marking_type/marking_type_part8.png)

**V** = intervalle = 10 % · **ENT()** = arrondi à l'entier inférieur

| Candidat | Mesure (A) | % de moins que le meilleur (T − A) / T × 100 | Formule M − ENT(% / V) × D | Points |
|---|---:|---:|---|---:|
| 1 | 1 700 | **0** | 2 − ENT(0 / 10) × 0,5 | 2 |
| 2 | 1 637 | **3,706** | 2 − ENT(3,706 / 10) × 0,5 | 2 |
| 3 | 1 587 | **6,647** | 2 − ENT(6,647 / 10) × 0,5 | 2 |
| 4 | 1 498 | **11,882** | 2 − ENT(11,882 / 10) × 0,5 | 1,5 |

### Exemple 4 : pourcentage et déduction proportionnelle

![Pourcentage avec déduction proportionnelle](media:marking_type/marking_type_part9.png)

| Candidat | Mesure (A) | % de moins que le meilleur | Formule M − % / V × D | Points |
|---|---:|---:|---|---:|
| 1 | 1 700 | **0** | 2 − 0 / 10 × 0,5 | 2 |
| 2 | 1 637 | **3,706** | 2 − 3,706 / 10 × 0,5 | 1,81 |
| 3 | 1 587 | **6,647** | 2 − 6,647 / 10 × 0,5 | 1,67 |
| 4 | 1 498 | **11,882** | 2 − 11,882 / 10 × 0,5 | 1,41 |

> [!TIP] Fichier de calcul
> Un fichier Excel présentant les formules de chaque *Marking Type* est disponible : [cis_marking_types.xls](media:marking_type/cis_marking_types.xls)`
      },
      en: {
        title: 'Marking Types: calculation rules', short: 'Marking Types (calculations)',
        summary: 'The six automatic calculation rules for Measurement aspects, with their parameters and worked examples.',
        objectives: ['Create a calculation rule on an aspect', 'Choose the right Marking Type', 'Read and check the calculation formulas'],
        quick: [
          '**Marking Scheme** › **Calculations** › sub-criterion › **Add New** (on the aspect)',
          '*Direct Mark Entry*: marks typed in directly (default)',
          '*Ranged Score*: up to 10 ranges around a target (fixed value or *Requirement* column)',
          '*Number Completed*: value ÷ *Maximum Number Possible* × max mark',
          '*Regular Difference Deduction*: fixed deduction per *Difference Amount* step',
          '*Percent Score Comparison*: (gap to worst ÷ total gap) × M, optional *Min/Max Value* bounds',
          '*Stepped Score Comparison*: M − INT(gap ÷ V) × D, or proportional',
          'Comparisons are calculated when the last competitor’s value is entered'
        ],
        body: `The CIS can run various calculations on the values entered for an aspect to generate a mark automatically.

For example, an aspect may consist of timing how long a task takes and awarding a mark based on that time. You simply enter the measured time and the CIS calculates the competitors' marks.

## Create a calculation rule

Click **Marking Scheme** then **Calculations**:

![Marking Scheme › Calculations menu](media:marking_type/marking_type_part00.png)

Choose the sub-criterion, then click **Add New** on the aspect:

![Add New button on the aspect](media:marking_type/marking_type_part0.png)

There are currently six *Marking Types*:

| Marking Type | Principle | Compares competitors |
|---|---|:---:|
| Direct Mark Entry | Mark typed in directly (default) | No |
| Ranged Score | Tolerance ranges around a target value | No |
| Number Completed | Share completed out of a maximum | No |
| Regular Difference Deduction | Regular deduction based on the gap to the target | No |
| Percent Score Comparison | Proportional mark between best and worst | Yes |
| Stepped Score Comparison | Stepped deduction from the best value | Yes |

:::guided
> [!TIP]
> The examples on this page use a fictional test project: building a snowman. Values are kept simple to make the formulas easy to follow.
:::

## Direct Mark Entry

This is the default *Marking Type*: no calculation, marks are entered directly in the CIS.

## Ranged Score

This *Marking Type* calculates the mark from the difference between the competitor's value and the target value. You can define up to ten ranges, each with the number of marks to deduct. If the value falls outside every range, the mark is zero.

The target value can be the value entered in the Marking Scheme *Requirement* column.

Parameters:

- **Target Value**: the value the competitor must achieve, **or**
- **Use Aspect Requirements for Target Value**: uses the Marking Scheme *Requirement* column as the target value.
- **Mark Deduction Type**: *Number of Marks* or *Percentage of Max Marks*.
- **Range 1 … 10**: the ranges, with the number or percentage of marks deducted for values within each range.

**Example**: the aspect is *Length of the snowman's right leg, from pelvis to ankle*, worth 1.50 marks.

- The ideal value is 800 mm.
- Tolerance of −5 mm / +5 mm: the first range deducts nothing ⇒ 1.5 − 0 = **1.5 marks**.
- Between ±5 mm and ±10 mm: 0.5 deducted ⇒ 1.5 − 0.5 = **1.0 mark**.
- Between ±10 mm and ±15 mm: 1 deducted ⇒ 1.5 − 1.0 = **0.5 mark**.
- Beyond ±15 mm: **zero**.

![Ranged Score with deductions in marks](media:marking_type/marking_type_part1.png)

The same example, deducting a percentage of the maximum mark, gives the same result:

![Ranged Score with deductions in percent](media:marking_type/marking_type_part2.png)

## Number Completed

This *Marking Type* calculates the ratio between the value entered and the maximum possible number, then derives the mark.

The only required parameter is **Maximum Number Possible**.

![Number Completed settings](media:marking_type/marking_type_part3.png)

**Example**: the aspect is *Number of clothing accessories on the snowman*, worth 2.00 marks. If the competitor placed 4 of the 8 accessories, they get 50% of the maximum mark ⇒ 2.00 × 50% = **1.00 mark**.

## Regular Difference Deduction

This *Marking Type* calculates the mark from the difference between the competitor's value and the target value. Tolerance and deducted marks are proportional.

The target value can be the value entered in the Marking Scheme *Requirement* column.

Parameters:

- **Target Value**: the value the competitor must achieve, **or**
- **Use Aspect Requirements for Target Value**: uses the Marking Scheme *Requirement* column as the target value.
- **Measurement Difference Type**: *Unit of Measurement* or *Percentage Difference*.
- **Difference Amount**: the step between each deduction.
- **Mark Deduction Type**: *Number of Marks* or *Percentage of Max Marks*.

**Example**: the aspect is *Length of the snowman's right leg*, worth 1.50 marks. The ideal value is 800 mm, with a 5 mm tolerance and 0.5 mark deducted per step.

![Regular Difference Deduction settings](media:marking_type/marking_type_part10.png)

## Percent Score Comparison

This *Marking Type* compares all competitors' results for an aspect. It awards the maximum mark to the competitor with the best value and zero to the one with the worst. Other competitors receive a percentage of the maximum mark based on the gap between their value and the best value.

Parameters (one required, two optional):

- **Highest Mark to Highest Value / Lowest Value**: whether the best value is the highest or the lowest.
- **Minimum Value** (optional): lower bound. Competitors whose value is equal to or below *Minimum Value* get the maximum mark (with *Lowest Value*) or zero (with *Highest Value*).
- **Maximum Value** (optional): upper bound. Competitors whose value is equal to or above *Maximum Value* get the maximum mark (with *Highest Value*) or zero (with *Lowest Value*).

![Percent Score Comparison settings](media:marking_type/marking_type_part4.png)

### Example 1: fastest wins

The aspect is *Speed module: make five snowballs*, worth 2.00 marks. *Highest Mark to* is set to **Lowest Value**.

The best competitor finished in 30 seconds and the slowest in 90 seconds — a 60-second gap. Once all times are entered, marks are calculated as follows:

**M** = max mark = 2 · **T** = highest result = 90 · **t** = lowest result = 30 · **A** = competitor's result

| Competitor | Time (A) | Gap to worst (T − A) | Formula (T − A) / (T − t) × M | Marks |
|---|---:|---:|---|---:|
| 1 | **30** | 90 − 30 = **60** | 60 / 60 × 2 | 2 |
| 2 | **50** | 90 − 50 = **40** | 40 / 60 × 2 | 1.33 |
| 3 | **60** | 90 − 60 = **30** | 30 / 60 × 2 | 1 |
| 4 | **90** | 90 − 90 = **0** | 0 / 60 × 2 | 0 |

The same example with *Maximum Value* = 60:

| Competitor | Time (A) | Gap to bound (60 − A) | Formula | Marks |
|---|---:|---:|---|---:|
| 1 | **30** | 60 − 30 = **30** | 30 / 30 × 2 | 2 |
| 2 | **50** | 60 − 50 = **10** | 10 / 30 × 2 | 0.67 |
| 3 | 60 (max 60) | 0 | 0 / 30 × 2 | 0 |
| 4 | 90 (max 60) | 0 | 0 / 30 × 2 | 0 |

### Example 2: highest count wins

The aspect is *Speed module: make as many snowballs as possible in 15 minutes*, worth 2.00 marks. *Highest Mark to* is set to **Highest Value**.

The best competitor made 30 snowballs and the lowest 15 — a gap of 15:

**M** = max mark = 2 · **T** = highest result = 30 · **t** = lowest result = 15 · **A** = competitor's result

| Competitor | Snowballs (A) | Gap to worst (A − t) | Formula (A − t) / (T − t) × M | Marks |
|---|---:|---:|---|---:|
| 1 | **30** | 30 − 15 = **15** | 15 / 15 × 2 | 2 |
| 2 | **25** | 25 − 15 = **10** | 10 / 15 × 2 | 1.33 |
| 3 | **20** | 20 − 15 = **5** | 5 / 15 × 2 | 0.67 |
| 4 | **15** | 15 − 15 = **0** | 0 / 15 × 2 | 0 |

The same example with *Minimum Value* = 20:

| Competitor | Snowballs (A) | Gap to bound (A − 20) | Formula | Marks |
|---|---:|---:|---|---:|
| 1 | **30** | 30 − 20 = **10** | 10 / 10 × 2 | 2 |
| 2 | **25** | 25 − 20 = **5** | 5 / 10 × 2 | 1 |
| 3 | 20 (min 20) | 0 | 0 / 10 × 2 | 0 |
| 4 | 15 (min 20) | 0 | 0 / 10 × 2 | 0 |

## Stepped Score Comparison

This *Marking Type* compares all competitors' results for an aspect and awards the maximum mark to the competitor with the best value (highest or lowest). Other competitors' marks are calculated from their gap to the best value. If the marks to deduct exceed the aspect's maximum, the competitor gets 0.

Parameters:

- **Highest Mark to Highest Value / Lowest Value**: whether the best value is the highest or the lowest.
- **Results Based On Value Difference / Percentage Difference**: interval size is a fixed value or a percentage.
- **Value or Percentage Interval**: the interval value or percentage.
- **Marks Deducted per Difference**: marks deducted per interval.
- **Deductions are Proportional**: tick for proportional deductions; otherwise they are stepped.

![Stepped Score Comparison settings](media:marking_type/marking_type_part5.png)

### Example 1: 50 mm steps

The aspect is *Measure the snowman's height*, worth 2.00 marks. *Highest Mark to* is set to **Highest Value**, with 0.5 mark deducted per 50 mm interval.

![50 mm steps](media:marking_type/marking_type_part6.png)

The best competitor built a 1,700 mm snowman. There are therefore 4 steps down to 1,500 mm, at which point the mark is 0:

**M** = max mark = 2 · **D** = deduction = 0.5 · **V** = interval = 50 · **T** = highest result = 1,700 · **A** = competitor's result · **INT()** = round down to the nearest integer

| Competitor | Measure (A) | Whole intervals INT((T − A) / V) | Formula M − INT((T − A) / V) × D | Marks |
|---|---:|---:|---|---:|
| 1 | 1,700 | **0** | 2 − 0 × 0.5 | 2 |
| 2 | 1,637 | **1** | 2 − 1 × 0.5 | 1.5 |
| 3 | 1,587 | **2** | 2 − 2 × 0.5 | 1 |
| 4 | 1,498 | **4** | 2 − 4 × 0.5 | 0 |

### Example 2: proportional deduction

The same example with proportional deduction (any measure of 1,500 mm or less gives 0):

![Proportional deduction](media:marking_type/marking_type_part7.png)

| Competitor | Measure (A) | Gap to best (T − A) | Formula M − (T − A) / V × D | Marks |
|---|---:|---:|---|---:|
| 1 | 1,700 | **0** | 2 − 0 / 50 × 0.5 | 2 |
| 2 | 1,637 | **63** | 2 − 63 / 50 × 0.5 | 1.37 |
| 3 | 1,587 | **113** | 2 − 113 / 50 × 0.5 | 0.87 |
| 4 | 1,498 | **202** | 2 − 202 / 50 × 0.5 | 0 |

### Example 3: percentage steps

Stepped deduction of 0.5 mark, with an interval of 10% of the best value (the largest measure):

![Percentage steps](media:marking_type/marking_type_part8.png)

**V** = interval = 10% · **INT()** = round down to the nearest integer

| Competitor | Measure (A) | % below best (T − A) / T × 100 | Formula M − INT(% / V) × D | Marks |
|---|---:|---:|---|---:|
| 1 | 1,700 | **0** | 2 − INT(0 / 10) × 0.5 | 2 |
| 2 | 1,637 | **3.706** | 2 − INT(3.706 / 10) × 0.5 | 2 |
| 3 | 1,587 | **6.647** | 2 − INT(6.647 / 10) × 0.5 | 2 |
| 4 | 1,498 | **11.882** | 2 − INT(11.882 / 10) × 0.5 | 1.5 |

### Example 4: percentage with proportional deduction

![Percentage with proportional deduction](media:marking_type/marking_type_part9.png)

| Competitor | Measure (A) | % below best | Formula M − % / V × D | Marks |
|---|---:|---:|---|---:|
| 1 | 1,700 | **0** | 2 − 0 / 10 × 0.5 | 2 |
| 2 | 1,637 | **3.706** | 2 − 3.706 / 10 × 0.5 | 1.81 |
| 3 | 1,587 | **6.647** | 2 − 6.647 / 10 × 0.5 | 1.67 |
| 4 | 1,498 | **11.882** | 2 − 11.882 / 10 × 0.5 | 1.41 |

> [!TIP] Calculation workbook
> An Excel file showing the formulas for each *Marking Type* is available: [cis_marking_types.xls](media:marking_type/cis_marking_types.xls)`
      }
    },

    {
      id: 'lock-marking-scheme', category: 'cis', order: 3, step: 2, level: 'beginner', status: 'published',
      menuPath: 'Marking Scheme › Marking Scheme › Lock Marking Scheme', prereq: ['marking-scheme'], video: '',
      tags: ['verrouillage', 'lock', 'barème'],
      source: 'lock_marking_scheme', createdAt: '2020-09-06T06:59:00+02:00', createdBy: 'import', updatedAt: '2026-11-21T09:00:00+01:00', updatedBy: 'admin',
      history: [
        { at: '2020-09-06T06:59:00+02:00', by: 'import', note: 'Dernière version sur DokuWiki (page « lock_marking_scheme »)', legacy: 'lock_marking_scheme' },
        { at: '2026-11-21T09:00:00+01:00', by: 'admin', note: 'Refonte : nouvelle mise en page et traduction anglaise' }
      ],
      fr: {
        title: 'Lock Marking Scheme : verrouiller le barème', short: 'Verrouiller le barème',
        summary: 'Verrouiller le barème de notation pour empêcher toute modification avant la compétition.',
        objectives: ['Verrouiller le barème', 'Savoir pourquoi le verrouillage est nécessaire'],
        quick: ['**Marking Scheme** › **Marking Scheme** › **Lock Marking Scheme**', 'Obligatoire avant de générer les Marking Forms'],
        body: `Pour éviter toute modification, il faut verrouiller le barème de notation. Rendez-vous dans **Marking Scheme** › **Marking Scheme** :

![Menu Marking Scheme](media:lock_marking_scheme/lock_marking_scheme_part1.png)

Cliquez sur **Lock Marking Scheme** :

![Bouton Lock Marking Scheme](media:lock_marking_scheme/lock_marking_scheme_part2.png)

:::guided
> [!NOTE] Pourquoi verrouiller ?
> Le verrouillage est indispensable pour générer les [[marking-forms|Marking Forms]]. Vérifiez donc soigneusement votre barème avant de le verrouiller.
:::`
      },
      en: {
        title: 'Lock Marking Scheme: lock the marking grid', short: 'Lock the marking scheme',
        summary: 'Lock the marking scheme to prevent any change before the competition.',
        objectives: ['Lock the marking scheme', 'Understand why locking is required'],
        quick: ['**Marking Scheme** › **Marking Scheme** › **Lock Marking Scheme**', 'Required before generating Marking Forms'],
        body: `To prevent any change, the marking scheme must be locked. Go to **Marking Scheme** › **Marking Scheme**:

![Marking Scheme menu](media:lock_marking_scheme/lock_marking_scheme_part1.png)

Click **Lock Marking Scheme**:

![Lock Marking Scheme button](media:lock_marking_scheme/lock_marking_scheme_part2.png)

:::guided
> [!NOTE] Why lock it?
> Locking is required to generate the [[marking-forms|Marking Forms]]. Check your marking scheme carefully before locking it.
:::`
      }
    },

    {
      id: 'marking-days', category: 'cis', order: 4, step: 3, level: 'intermediate', status: 'published',
      menuPath: 'Marking Scheme › Marking Schedule', prereq: ['marking-scheme'], video: 'video-marking-days',
      tags: ['planning', 'groupes', 'marking schedule', 'jours'],
      source: 'marking_days', createdAt: '2020-09-06T06:59:00+02:00', createdBy: 'import', updatedAt: '2026-11-21T09:00:00+01:00', updatedBy: 'admin',
      history: [
        { at: '2020-09-06T06:59:00+02:00', by: 'import', note: 'Dernière version sur DokuWiki (page « marking_days »)', legacy: 'marking_days' },
        { at: '2026-11-21T09:00:00+01:00', by: 'admin', note: 'Refonte : nouvelle mise en page et traduction anglaise' }
      ],
      fr: {
        title: 'Marking Days : planifier la notation', short: 'Marking Days',
        summary: 'Définir, pour chaque sous-critère, le jour de notation : pour tous les candidats, par groupe ou par candidat.',
        objectives: ['Attribuer un jour de notation à chaque sous-critère', 'Créer des groupes de candidats', 'Planifier candidat par candidat'],
        quick: [
          '**Marking Scheme** › **Marking Schedule**',
          'Tous les candidats ensemble : choisir **Day 1 / 2 / 3**',
          'Par groupe : **Allocate Groups** › **Create New Group** › **Add To Group** › **Close**, puis **Per competitor Group** › jour par groupe › **Save**',
          'Par candidat : **Per competitor** › jour par candidat › **Save**',
          'Enregistrement automatique · bloqué dès la première note'
        ],
        body: `> [!IMPORTANT]
> Le Marking Days doit être complété **après vérification du Marking Scheme**. En cas de réimportation du Marking Scheme avec beaucoup de modifications, le Marking Days sera à refaire.

1. Cliquez sur **Marking Scheme**.
2. Puis sur **Marking Schedule**.
3. Pour chaque sous-critère, sélectionnez :
   1. le jour (**Day 1** / **Day 2** / **Day 3**) si tous les candidats sont évalués en même temps ;
   2. [Per competitor group](#par-groupe-de-candidats) si vous pouvez regrouper les candidats et assigner un jour de notation à chaque groupe ;
   3. [Per competitor](#par-candidat) si les candidats ne peuvent pas être regroupés.

> [!NOTE]
> Chaque modification est prise en compte immédiatement : il n'y a pas de bouton pour enregistrer.

![Écran Marking Schedule](media:marking_days/marking_days_part1.png)

## Par groupe de candidats

Option *Per competitor group* :

1. Créez les groupes de candidats en cliquant sur **Allocate Groups**.
2. Nommez un premier groupe.
3. Cliquez sur **Create New Group**.
4. Sélectionnez les candidats souhaités et le groupe.
5. Ajoutez les candidats au groupe avec **Add To Group**.
6. Nommez un deuxième groupe.
7. Cliquez sur **Create New Group**.
8. Sélectionnez les candidats souhaités et le groupe.
9. Ajoutez les candidats au groupe avec **Add To Group**, et répétez l'opération pour obtenir le nombre de groupes nécessaires.
10. Une fois tous les candidats placés dans un groupe, fermez la fenêtre avec le bouton **Close**.
11. Pour le sous-critère souhaité, sélectionnez **Per competitor Group**.
12. Dans la petite fenêtre qui s'ouvre, définissez le jour de notation de chaque groupe.
13. Enregistrez avec le bouton **Save**, puis répétez les étapes 11 à 13 pour chaque sous-critère pouvant être évalué par groupe.

![Per competitor group – capture 1/8](media:marking_days/marking_days_part2.png)
![Per competitor group – capture 2/8](media:marking_days/marking_days_part3.png)
![Per competitor group – capture 3/8](media:marking_days/marking_days_part4.png)
![Per competitor group – capture 4/8](media:marking_days/marking_days_part5.png)
![Per competitor group – capture 5/8](media:marking_days/marking_days_part6.png)
![Per competitor group – capture 6/8](media:marking_days/marking_days_part7.png)
![Per competitor group – capture 7/8](media:marking_days/marking_days_part8.png)
![Per competitor group – capture 8/8](media:marking_days/marking_days_part9.png)

## Par candidat

Option *Per competitor* :

1. Pour le sous-critère souhaité, sélectionnez **Per competitor**.
2. Dans la petite fenêtre qui s'ouvre, définissez le jour de notation de chaque candidat.
3. Enregistrez avec le bouton **Save**, puis répétez les étapes 1 à 3 pour chaque sous-critère devant être évalué par candidat.

![Per competitor – capture 1/2](media:marking_days/marking_days_part10.png)
![Per competitor – capture 2/2](media:marking_days/marking_days_part11.png)

> [!WARNING]
> Dès la saisie d'une première note, vous ne pourrez plus modifier votre Marking Days.`
      },
      en: {
        title: 'Marking Days: plan the marking', short: 'Marking Days',
        summary: 'Set the marking day for each sub-criterion: for all competitors, per group or per competitor.',
        objectives: ['Assign a marking day to each sub-criterion', 'Create competitor groups', 'Plan competitor by competitor'],
        quick: [
          '**Marking Scheme** › **Marking Schedule**',
          'All competitors together: choose **Day 1 / 2 / 3**',
          'Per group: **Allocate Groups** › **Create New Group** › **Add To Group** › **Close**, then **Per competitor Group** › day per group › **Save**',
          'Per competitor: **Per competitor** › day per competitor › **Save**',
          'Saved automatically · locked once the first mark is entered'
        ],
        body: `> [!IMPORTANT]
> Marking Days must be completed **after the Marking Scheme has been checked**. If you re-import the Marking Scheme with many changes, Marking Days will have to be redone.

1. Click **Marking Scheme**.
2. Then click **Marking Schedule**.
3. For each sub-criterion, select:
   1. the day (**Day 1** / **Day 2** / **Day 3**) if all competitors are assessed at the same time;
   2. [Per competitor group](#per-competitor-group) if competitors can be grouped and each group given a marking day;
   3. [Per competitor](#per-competitor) if competitors cannot be grouped.

> [!NOTE]
> Every change is applied immediately: there is no save button.

![Marking Schedule screen](media:marking_days/marking_days_part1.png)

## Per competitor group

1. Create competitor groups by clicking **Allocate Groups**.
2. Name a first group.
3. Click **Create New Group**.
4. Select the competitors and the group.
5. Add the competitors to the group with **Add To Group**.
6. Name a second group.
7. Click **Create New Group**.
8. Select the competitors and the group.
9. Add the competitors to the group with **Add To Group**, and repeat until you have all the groups you need.
10. Once every competitor is in a group, close the window with **Close**.
11. For the sub-criterion, select **Per competitor Group**.
12. In the small window that opens, set the marking day for each group.
13. Save with **Save**, then repeat steps 11 to 13 for each sub-criterion that can be marked by group.

![Per competitor group – screenshot 1/8](media:marking_days/marking_days_part2.png)
![Per competitor group – screenshot 2/8](media:marking_days/marking_days_part3.png)
![Per competitor group – screenshot 3/8](media:marking_days/marking_days_part4.png)
![Per competitor group – screenshot 4/8](media:marking_days/marking_days_part5.png)
![Per competitor group – screenshot 5/8](media:marking_days/marking_days_part6.png)
![Per competitor group – screenshot 6/8](media:marking_days/marking_days_part7.png)
![Per competitor group – screenshot 7/8](media:marking_days/marking_days_part8.png)
![Per competitor group – screenshot 8/8](media:marking_days/marking_days_part9.png)

## Per competitor

1. For the sub-criterion, select **Per competitor**.
2. In the small window that opens, set the marking day for each competitor.
3. Save with **Save**, then repeat steps 1 to 3 for each sub-criterion to be marked per competitor.

![Per competitor – screenshot 1/2](media:marking_days/marking_days_part10.png)
![Per competitor – screenshot 2/2](media:marking_days/marking_days_part11.png)

> [!WARNING]
> Once the first mark has been entered, you can no longer change your Marking Days.`
      }
    },

    {
      id: 'marking-team', category: 'cis', order: 5, step: 4, level: 'beginner', status: 'published',
      menuPath: 'Marking Scheme › Marking Schedule', prereq: ['marking-scheme'], video: 'video-marking-team',
      tags: ['jurés', 'superviseur', 'équipe', 'jury'],
      source: 'marking_team', createdAt: '2020-09-06T06:59:00+02:00', createdBy: 'import', updatedAt: '2026-11-21T09:00:00+01:00', updatedBy: 'admin',
      history: [
        { at: '2020-09-06T06:59:00+02:00', by: 'import', note: 'Dernière version sur DokuWiki (page « marking_team »)', legacy: 'marking_team' },
        { at: '2026-11-21T09:00:00+01:00', by: 'admin', note: 'Refonte : nouvelle mise en page et traduction anglaise' }
      ],
      fr: {
        title: 'Marking Team : composer les équipes de jurés', short: 'Marking Team',
        summary: 'Affecter trois jurés et un superviseur à chaque sous-critère.',
        objectives: ['Affecter jurés et superviseur à un sous-critère', 'Réutiliser une équipe', 'Modifier une équipe'],
        quick: [
          '**Marking Scheme** › **Marking Schedule**',
          'Par sous-critère : 3 jurés (**Add**) + 1 superviseur (**Supervisor**)',
          '**Same as Ax** pour reprendre une équipe existante',
          'Croix rouge pour modifier',
          'Même équipe pour tous les candidats · bloquée dès la première note du sous-critère'
        ],
        body: `> [!IMPORTANT]
> Le Marking Team doit être complété **après vérification du Marking Scheme**. En cas de réimportation du Marking Scheme avec beaucoup de modifications, le Marking Team sera à refaire.

1. Cliquez sur **Marking Scheme**.
2. Puis sur **Marking Schedule**.
3. Pour chaque sous-critère, sélectionnez :
   1. trois jurés, en cliquant sur **Add** ;
   2. un superviseur, en cliquant sur **Supervisor**.

> [!NOTE]
> Chaque modification est prise en compte immédiatement : il n'y a pas de bouton pour enregistrer.

![Sélection des jurés et du superviseur](media:marking_team/marking_team_part1.png)

## Réutiliser une équipe

À partir du deuxième sous-critère, vous pouvez reprendre la même équipe de jurés et le même superviseur en choisissant **Same as Ax** :

![Option Same as Ax](media:marking_team/marking_team_part2.png)

## Modifier une équipe

Pour modifier une équipe, cliquez sur la croix rouge : vous pourrez à nouveau choisir les jurés et/ou le superviseur.

![Modification avec la croix rouge](media:marking_team/marking_team_part3.png)

> [!WARNING]
> - Le Marking Team est le même pour tous les candidats.
> - Le Marking Team ne peut plus être modifié après la saisie de la première note dans le sous-critère correspondant.`
      },
      en: {
        title: 'Marking Team: set up the juror teams', short: 'Marking Team',
        summary: 'Assign three jurors and one supervisor to each sub-criterion.',
        objectives: ['Assign jurors and a supervisor to a sub-criterion', 'Reuse a team', 'Change a team'],
        quick: [
          '**Marking Scheme** › **Marking Schedule**',
          'Per sub-criterion: 3 jurors (**Add**) + 1 supervisor (**Supervisor**)',
          '**Same as Ax** to reuse an existing team',
          'Red cross to change',
          'Same team for all competitors · locked once the sub-criterion’s first mark is entered'
        ],
        body: `> [!IMPORTANT]
> The Marking Team must be completed **after the Marking Scheme has been checked**. If you re-import the Marking Scheme with many changes, the Marking Team will have to be redone.

1. Click **Marking Scheme**.
2. Then click **Marking Schedule**.
3. For each sub-criterion, select:
   1. three jurors, by clicking **Add**;
   2. one supervisor, by clicking **Supervisor**.

> [!NOTE]
> Every change is applied immediately: there is no save button.

![Selecting jurors and the supervisor](media:marking_team/marking_team_part1.png)

## Reuse a team

From the second sub-criterion onwards, you can reuse the same jurors and supervisor by choosing **Same as Ax**:

![Same as Ax option](media:marking_team/marking_team_part2.png)

## Change a team

To change a team, click the red cross: you can then choose the jurors and/or supervisor again.

![Changing a team with the red cross](media:marking_team/marking_team_part3.png)

> [!WARNING]
> - The Marking Team is the same for all competitors.
> - The Marking Team can no longer be changed once the first mark has been entered in that sub-criterion.`
      }
    },

    {
      id: 'marking-forms', category: 'cis', order: 6, step: 5, level: 'beginner', status: 'published',
      menuPath: 'Assessment › Marking Forms', prereq: ['lock-marking-scheme', 'marking-days'], video: 'video-marking-forms',
      tags: ['pdf', 'impression', 'feuilles de notation', 'portrait', 'paysage'],
      source: 'marking_forms', createdAt: '2020-09-06T06:59:00+02:00', createdBy: 'import', updatedAt: '2026-11-21T09:00:00+01:00', updatedBy: 'admin',
      history: [
        { at: '2020-09-06T06:59:00+02:00', by: 'import', note: 'Dernière version sur DokuWiki (page « marking_forms »)', legacy: 'marking_forms' },
        { at: '2026-11-21T09:00:00+01:00', by: 'admin', note: 'Refonte : nouvelle mise en page et traduction anglaise' }
      ],
      fr: {
        title: 'Marking Forms : générer les feuilles de notation', short: 'Marking Forms',
        summary: 'Générer en PDF les feuilles de notation destinées aux jurés, au format portrait ou paysage.',
        objectives: ['Générer les feuilles de notation des jurés', 'Choisir entre format portrait et paysage', 'Masquer les valeurs attendues'],
        quick: [
          'Prérequis : barème verrouillé + Marking Days complété',
          '**Assessment** › **Marking Forms**',
          'Portrait (1 feuille / candidat) : *Marking forms for hand-written marks*',
          'Paysage (plusieurs candidats) : *Landscape forms for hand-written marks*',
          'Option : **Hide Requirements for Measurement Aspects**',
          '**Create PDF**'
        ],
        body: `Pour utiliser les feuilles de notation du CIS, vous devez d'abord avoir [[lock-marking-scheme|verrouillé le Marking Scheme]] et complété le [[marking-days|Marking Days]].

Cliquez ensuite sur **Assessment** › **Marking Forms** :

![Menu Assessment › Marking Forms](media:marking_forms/marking_forms_part1.png)

## Format portrait : une feuille par candidat

Dans la liste déroulante **Form Type**, choisissez **Marking forms for hand-written marks** :

![Form Type : Marking forms for hand-written marks](media:marking_forms/marking_forms_part2.png)

> [!TIP]
> Vous pouvez masquer les mesures attendues (colonne *Requirement* du Marking Scheme) en cochant **Hide Requirements for Measurement Aspects**.

![Exemple de feuille au format portrait](media:marking_forms/marking_forms_part4.png)

## Format paysage : une feuille pour plusieurs candidats

Choisissez **Landscape forms for hand-written marks** :

![Form Type : Landscape forms for hand-written marks](media:marking_forms/marking_forms_part3.png)
![Exemple de feuille au format paysage](media:marking_forms/marking_forms_part5.png)

## Générer le PDF

Pour terminer, cliquez sur **Create PDF**.`
      },
      en: {
        title: 'Marking Forms: generate the marking sheets', short: 'Marking Forms',
        summary: 'Generate the jurors’ marking sheets as PDF, in portrait or landscape format.',
        objectives: ['Generate the jurors’ marking sheets', 'Choose between portrait and landscape', 'Hide expected values'],
        quick: [
          'Prerequisites: marking scheme locked + Marking Days completed',
          '**Assessment** › **Marking Forms**',
          'Portrait (1 sheet / competitor): *Marking forms for hand-written marks*',
          'Landscape (several competitors): *Landscape forms for hand-written marks*',
          'Option: **Hide Requirements for Measurement Aspects**',
          '**Create PDF**'
        ],
        body: `To use the CIS marking sheets, you must first have [[lock-marking-scheme|locked the Marking Scheme]] and completed the [[marking-days|Marking Days]].

Then click **Assessment** › **Marking Forms**:

![Assessment › Marking Forms menu](media:marking_forms/marking_forms_part1.png)

## Portrait: one sheet per competitor

In the **Form Type** drop-down list, choose **Marking forms for hand-written marks**:

![Form Type: Marking forms for hand-written marks](media:marking_forms/marking_forms_part2.png)

> [!TIP]
> You can hide the expected measurements (Marking Scheme *Requirement* column) by ticking **Hide Requirements for Measurement Aspects**.

![Portrait sheet example](media:marking_forms/marking_forms_part4.png)

## Landscape: one sheet for several competitors

Choose **Landscape forms for hand-written marks**:

![Form Type: Landscape forms for hand-written marks](media:marking_forms/marking_forms_part3.png)
![Landscape sheet example](media:marking_forms/marking_forms_part5.png)

## Generate the PDF

Finally, click **Create PDF**.`
      }
    },

    {
      id: 'enter-marks', category: 'cis', order: 7, step: 6, level: 'intermediate', status: 'published',
      menuPath: 'Assessment › Enter Marks', prereq: ['marking-days', 'marking-team'], video: 'video-enter-marks',
      tags: ['saisie', 'notes', 'raccourcis', 'judgement', 'measurement', 'no attempt'],
      source: 'enter_marks', createdAt: '2020-09-06T06:59:00+02:00', createdBy: 'import', updatedAt: '2026-11-21T09:00:00+01:00', updatedBy: 'admin',
      history: [
        { at: '2020-09-06T06:59:00+02:00', by: 'import', note: 'Dernière version sur DokuWiki (page « enter_marks »)', legacy: 'enter_marks' },
        { at: '2026-11-21T09:00:00+01:00', by: 'admin', note: 'Refonte : nouvelle mise en page et traduction anglaise' }
      ],
      fr: {
        title: 'Enter Marks : saisir les notes', short: 'Saisie des notes',
        summary: 'Saisir les notes des aspects Measurement et Judgement, avec les raccourcis clavier et les calculs automatiques.',
        objectives: ['Choisir le candidat, le jour et le sous-critère', 'Saisir rapidement les notes objectives', 'Saisir les notes Judgement des jurés'],
        quick: [
          '**Assessment** › **Enter Marks**',
          'Choisir candidat › jour › sous-critère',
          '++y++ = note max · ++n++ = zéro · flèches et ++Tab++ pour naviguer',
          'Avec calcul : saisir la valeur mesurée ; comparaisons calculées au dernier candidat (icône horloge)',
          '**No Attempt** si l’aspect n’est pas réalisé',
          'Judgement : 0 à 3 par juré, 1 point d’écart maximum, sinon nouveau vote',
          'Enregistrement automatique'
        ],
        body: `Cliquez sur **Assessment** puis **Enter Marks** :

![Menu Assessment › Enter Marks](media:enter_marks/enter_marks_part1.png)

## Informations candidat et choix du sous-critère

En haut à droite de la page, vous trouverez un résumé des informations liées au candidat sélectionné :

![Bandeau d'informations candidat](media:enter_marks/enter_marks_part2.png)

1. Nombre d'aspects devant recevoir une note dans le sous-critère sélectionné.
2. Nombre total d'aspects, tous critères confondus.
3. Choix du candidat.
4. Choix du jour de compétition (si vous respectez le [[marking-days|Marking Days]], aucune modification n'est nécessaire).
5. Choix du sous-critère : cette liste dépend des deux listes précédentes et change en fonction du jour et du candidat.

## Saisie des notes objectives

Le formulaire suivant permet de saisir les notes des aspects objectifs (*Measurement*) :

![Formulaire de saisie des aspects Measurement](media:enter_marks/enter_marks_part4.png)

1. Valeur mesurée pour chaque aspect (ce champ peut rester vide si vous n'utilisez pas les notes calculées).
2. Note de l'aspect.

> [!TIP] Raccourcis de saisie
> - Note maximale pour un aspect : tapez simplement ++y++
> - Note de zéro pour un aspect : tapez simplement ++n++
> - Déplacez-vous avec les flèches ++↑++ ++↓++ ++←++ ++→++ et la touche ++Tab++.

Le petit triangle affiché à côté d'un aspect permet de lire les informations complémentaires ajoutées dans le Marking Scheme pour aider à la notation.

### Avec les calculs automatiques

Si une règle de calcul ([[marking-types|Marking Type]]) est définie, saisissez simplement la valeur mesurée : les points sont calculés automatiquement d'après la règle du Marking Scheme.

Si la règle dépend des résultats des autres candidats (*Stepped Score Comparison* ou *Percent Score Comparison*), les points sont calculés pour tous les candidats au moment de la saisie du dernier candidat. En attendant, une icône d'horloge reste affichée.

Si un aspect ne peut pas être évalué, cochez la case **No Attempt** :

![Saisie avec calcul automatique et option No Attempt](media:enter_marks/enter_marks_part5.png)

> [!NOTE]
> Les saisies sont contrôlées et sauvegardées automatiquement : il n'y a aucun bouton pour enregistrer.

## Saisie des notes Judgement

Le formulaire suivant permet de saisir la note de 0 à 3 de chaque juré pour les aspects *Judgement*. Une fois les valeurs saisies, le CIS calcule la note correspondante dans la colonne **Mark Awarded** :

![Formulaire de saisie des aspects Judgement](media:enter_marks/enter_marks_part11.png)

Cliquez sur le petit **+** pour afficher la description des quatre valeurs, de 0 à 3.

> [!WARNING]
> Il ne peut pas y avoir plus d'**un point d'écart** entre la note la plus faible et la plus élevée sur un même aspect. Si c'est le cas, les jurés doivent revoter.

> [!NOTE]
> Les jurés sont déjà identifiés grâce au [[marking-team|Marking Team]]. Les saisies sont contrôlées et sauvegardées automatiquement.`
      },
      en: {
        title: 'Enter Marks: enter the marks', short: 'Mark entry',
        summary: 'Enter marks for Measurement and Judgement aspects, using keyboard shortcuts and automatic calculations.',
        objectives: ['Choose the competitor, day and sub-criterion', 'Enter objective marks quickly', 'Enter the jurors’ Judgement scores'],
        quick: [
          '**Assessment** › **Enter Marks**',
          'Choose competitor › day › sub-criterion',
          '++y++ = max mark · ++n++ = zero · arrows and ++Tab++ to move',
          'With calculations: enter the measured value; comparisons are calculated with the last competitor (clock icon)',
          '**No Attempt** if the aspect was not attempted',
          'Judgement: 0 to 3 per juror, 1 point gap at most, otherwise re-vote',
          'Saved automatically'
        ],
        body: `Click **Assessment** then **Enter Marks**:

![Assessment › Enter Marks menu](media:enter_marks/enter_marks_part1.png)

## Competitor information and sub-criterion selection

At the top right of the page you will find a summary of the selected competitor's information:

![Competitor information panel](media:enter_marks/enter_marks_part2.png)

1. Number of aspects to be marked in the selected sub-criterion.
2. Total number of aspects, across all criteria.
3. Competitor selection.
4. Competition day selection (if you follow the [[marking-days|Marking Days]], no change is needed).
5. Sub-criterion selection: this list depends on the two previous ones and changes with the day and competitor.

## Entering objective marks

The following form is used to enter marks for objective aspects (*Measurement*):

![Measurement aspects entry form](media:enter_marks/enter_marks_part4.png)

1. Measured value for each aspect (can stay empty if you don't use calculated marks).
2. Aspect mark.

> [!TIP] Entry shortcuts
> - Maximum mark for an aspect: just type ++y++
> - Zero for an aspect: just type ++n++
> - Move around with the arrow keys ++↑++ ++↓++ ++←++ ++→++ and the ++Tab++ key.

The small triangle next to an aspect shows the additional information added in the Marking Scheme to help with marking.

### With automatic calculations

If a calculation rule ([[marking-types|Marking Type]]) is set, just enter the measured value: marks are calculated automatically from the Marking Scheme rule.

If the rule depends on other competitors' results (*Stepped Score Comparison* or *Percent Score Comparison*), marks are calculated for all competitors when the last competitor's value is entered. Until then, a clock icon is displayed.

If an aspect cannot be assessed, tick **No Attempt**:

![Automatic calculation and No Attempt option](media:enter_marks/enter_marks_part5.png)

> [!NOTE]
> Entries are checked and saved automatically: there is no save button.

## Entering Judgement marks

The following form is used to enter each juror's score from 0 to 3 for *Judgement* aspects. Once the scores are entered, the CIS calculates the mark in the **Mark Awarded** column:

![Judgement aspects entry form](media:enter_marks/enter_marks_part11.png)

Click the small **+** to show the description of the four values, from 0 to 3.

> [!WARNING]
> There cannot be more than **one point** between the lowest and highest score on the same aspect. If there is, the jurors must vote again.

> [!NOTE]
> Jurors are already identified through the [[marking-team|Marking Team]]. Entries are checked and saved automatically.`
      }
    },

    {
      id: 'results', category: 'cis', order: 8, step: 7, level: 'beginner', status: 'published',
      menuPath: 'Assessment › Marking Forms / View Marks', prereq: ['enter-marks'], video: '',
      tags: ['résultats', 'classement', 'pdf', 'view marks'],
      source: 'results', createdAt: '2020-09-06T06:59:00+02:00', createdBy: 'import', updatedAt: '2026-11-21T09:00:00+01:00', updatedBy: 'admin',
      history: [
        { at: '2020-09-06T06:59:00+02:00', by: 'import', note: 'Dernière version sur DokuWiki (page « results »)', legacy: 'results' },
        { at: '2026-11-21T09:00:00+01:00', by: 'admin', note: 'Refonte : nouvelle mise en page et traduction anglaise' }
      ],
      fr: {
        title: 'Résultats : feuilles complétées et classement', short: 'Résultats',
        summary: 'Générer les feuilles de notation complétées avec les notes, puis le classement final.',
        objectives: ['Imprimer les feuilles complétées', 'Générer le classement'],
        quick: [
          'Feuilles notées : **Assessment** › **Marking Forms** › *Marking forms with completed marks* › **Create PDF**',
          'Classement : **Assessment** › **View Marks** › **Create PDF**'
        ],
        body: `## Générer les feuilles de notation avec les notes

Cliquez sur **Assessment** › **Marking Forms** :

![Menu Assessment › Marking Forms](media:marking_forms/marking_forms_part1.png)

Dans la liste déroulante **Form Type**, choisissez **Marking forms with completed marks** :

![Form Type : Marking forms with completed marks](media:results/marking_forms_part2.png)

Pour terminer, cliquez sur **Create PDF**.

## Générer le classement

Cliquez sur **Assessment** › **View Marks** :

![Menu Assessment › View Marks](media:results/marking_forms_part3.png)

Pour terminer, cliquez sur **Create PDF**.`
      },
      en: {
        title: 'Results: completed sheets and rankings', short: 'Results',
        summary: 'Generate the marking sheets completed with marks, then the final ranking.',
        objectives: ['Print the completed sheets', 'Generate the ranking'],
        quick: [
          'Marked sheets: **Assessment** › **Marking Forms** › *Marking forms with completed marks* › **Create PDF**',
          'Ranking: **Assessment** › **View Marks** › **Create PDF**'
        ],
        body: `## Generate the marking sheets with marks

Click **Assessment** › **Marking Forms**:

![Assessment › Marking Forms menu](media:marking_forms/marking_forms_part1.png)

In the **Form Type** drop-down list, choose **Marking forms with completed marks**:

![Form Type: Marking forms with completed marks](media:results/marking_forms_part2.png)

Finally, click **Create PDF**.

## Generate the ranking

Click **Assessment** › **View Marks**:

![Assessment › View Marks menu](media:results/marking_forms_part3.png)

Finally, click **Create PDF**.`
      }
    },

    /* ================================================================== */
    /*  SIGNATURES CNAT 48                                                 */
    /* ================================================================== */
    {
      id: 'signoff', category: 'signoff', order: 1, level: 'beginner', status: 'published',
      menuPath: '', prereq: [], video: '', tags: ['signature', 'cnat48', 'marseille 2025', 'étapes', 'sign-off'],
      source: 'signoff', createdAt: '2025-08-26T14:32:00+02:00', createdBy: 'import', updatedAt: '2026-11-21T09:00:00+01:00', updatedBy: 'admin',
      history: [
        { at: '2025-08-26T14:32:00+02:00', by: 'marie', note: 'Dernière version sur DokuWiki (page « signoff »)', legacy: 'signoff' },
        { at: '2026-11-21T09:00:00+01:00', by: 'admin', note: 'Refonte : nouvelle mise en page et traduction anglaise' }
      ],
      fr: {
        title: 'Outil de signature – CNAT 48 Marseille 2025', short: 'Outil de signature',
        summary: 'L’outil de signature dématérialisé et les étapes à valider chaque jour de compétition.',
        objectives: ['Comprendre le rôle de l’outil de signature', 'Connaître les étapes de C-2 à C3', 'Savoir valider une étape en 3 temps'],
        quick: [
          'Complète le Classeur Métier · sous la responsabilité de l’Expert',
          'C-2 : identités équipe métier',
          'C-1 : émargement équipe, identités jurés et compétiteurs, Marking Scheme Acceptance',
          'C1 à C3 : émargements + validation des notes du jour',
          'Chaque étape : signatures › validation Expert + adjoint › export PDF'
        ],
        body: `Un outil de signature dématérialisé a été mis en place pour la Compétition Nationale Marseille 2025.

Il permet aux jurés, aux compétiteurs et à l'équipe métier de valider les différentes étapes de la compétition au fil des jours.

> [!IMPORTANT]
> Cet outil est complémentaire au **Classeur Métier** et son remplissage est sous la responsabilité de l'**Expert**. Toutes les observations complémentaires à ces formulaires de signature doivent être formalisées dans le **PV journalier** du Classeur Métier (absence d'un participant, refus de signer d'un juré, etc.).

## Les étapes de compétition

| Jour | Étape | Description |
|---|---|---|
| C-2 | [[so-identity|Identités équipe métier]] | Identification de tous les intervenants sur l'espace (hors jurés et compétiteurs) : chef d'atelier et adjoint, assistants montage/démontage, partenaires (formateur, technicien spécialisé, etc.) |
| C-1 | [[so-daily-signoff|Émargement équipe métier]] | Signature de présence de l'équipe métier |
| C-1 | [[so-identity|Identités jurés]] | Vérification des identités et prise de connaissance des règlements, règles de sécurité, etc. |
| C-1 | [[so-identity|Identités compétiteurs]] | Vérification des identités et des dates de naissance, prise de connaissance des règlements, règles de sécurité, etc. |
| C-1 | [[so-marking-scheme|Marking Scheme Acceptance]] | Validation par l'Expert du barème et de la planification associée, après information des jurés |
| C1, C2, C3 | [[so-daily-signoff|Émargements]] | Émargement de l'équipe métier, des compétiteurs et des jurés |
| C1, C2, C3 | [[so-closing|Notation du jour]] | Validation par les jurés de la ressaisie des notes du jour |

## Valider une étape en trois temps

Chaque étape de compétition doit être validée en trois temps :

![Les trois temps de validation d'une étape](media:signoff/so_steps.png)

1. **Signature** des participants (et éventuellement complétion des informations).
2. **Validation** par l'Expert et l'Expert adjoint.
3. **Export PDF**.

:::guided
> [!TIP] Première utilisation ?
> Suivez les pages dans l'ordre : [[so-connect|connexion]], [[so-competition-steps|étapes de compétition]], puis chaque étape du jour.
:::`
      },
      en: {
        title: 'Sign-off tool – CNAT 48 Marseille 2025', short: 'Sign-off tool',
        summary: 'The digital sign-off tool and the steps to approve on each competition day.',
        objectives: ['Understand what the sign-off tool is for', 'Know the steps from C-2 to C3', 'Approve a step in 3 stages'],
        quick: [
          'Complements the skill workbook · the Expert is responsible for it',
          'C-2: skill team identities',
          'C-1: team sign-in, juror and competitor identities, Marking Scheme Acceptance',
          'C1 to C3: daily sign-in + approval of the day’s marks',
          'Each step: signatures › Expert + deputy approval › PDF export'
        ],
        body: `A digital sign-off tool was introduced for the Marseille 2025 National Competition.

It lets jurors, competitors and the skill team approve each competition step as the days go by.

> [!IMPORTANT]
> This tool complements the **skill workbook** (*Classeur Métier*) and the **Expert** is responsible for filling it in. Any additional observations on these sign-off forms must be recorded in the workbook's **daily report** (participant absence, a juror refusing to sign, etc.).

## Competition steps

| Day | Step | Description |
|---|---|---|
| C-2 | [[so-identity|Skill team identities]] | Identify everyone working in the skill area (other than jurors and competitors): workshop manager and deputy, set-up/dismantling assistants, partners (trainer, specialist technician, etc.) |
| C-1 | [[so-daily-signoff|Skill team sign-in]] | Attendance signature of the skill team |
| C-1 | [[so-identity|Juror identities]] | Identity check and acknowledgement of rules, safety rules, etc. |
| C-1 | [[so-identity|Competitor identities]] | Identity and date-of-birth check, acknowledgement of rules, safety rules, etc. |
| C-1 | [[so-marking-scheme|Marking Scheme Acceptance]] | The Expert approves the marking scheme and its schedule, after briefing the jurors |
| C1, C2, C3 | [[so-daily-signoff|Daily sign-in]] | Sign-in of the skill team, competitors and jurors |
| C1, C2, C3 | [[so-closing|Daily marks]] | Jurors confirm the day's marks were correctly entered |

## Approving a step in three stages

Each competition step is approved in three stages:

![The three approval stages of a step](media:signoff/so_steps.png)

1. **Signature** by participants (and completing information if needed).
2. **Approval** by the Expert and Deputy Expert.
3. **PDF export**.

:::guided
> [!TIP] First time?
> Follow the pages in order: [[so-connect|signing in]], [[so-competition-steps|competition steps]], then each step of the day.
:::`
      }
    },

    {
      id: 'so-connect', category: 'signoff', order: 2, level: 'beginner', status: 'published',
      menuPath: '', prereq: ['signoff'], video: '', tags: ['connexion', 'login', 'identifiants'],
      source: 'so_connect', createdAt: '2025-08-22T16:03:00+02:00', createdBy: 'import', updatedAt: '2026-11-21T09:00:00+01:00', updatedBy: 'admin',
      history: [
        { at: '2025-08-22T16:03:00+02:00', by: 'anthony', note: 'Dernière version sur DokuWiki (page « so_connect »)', legacy: 'so_connect' },
        { at: '2026-11-21T09:00:00+01:00', by: 'admin', note: 'Refonte : nouvelle mise en page et traduction anglaise' }
      ],
      fr: {
        title: 'Se connecter à l’outil de signature', short: 'Connexion',
        summary: 'L’adresse de l’outil et la connexion avec vos identifiants CIS CNAT 48.',
        objectives: ['Accéder à l’outil de signature', 'Se connecter avec ses identifiants'],
        quick: ['[cis.worldskills-france.org/signoff](https://cis.worldskills-france.org/signoff/index.php)', 'Identifiants CIS CNAT 48', 'Problème : Team Leader ou secrétariat de compétition'],
        body: `## 1. Accéder à l'outil

Rendez-vous à l'adresse suivante : [cis.worldskills-france.org/signoff](https://cis.worldskills-france.org/signoff/index.php)

## 2. Se connecter avec ses identifiants CIS CNAT 48

![Écran de connexion de l'outil de signature](media:signoff/so_login.png)

> [!NOTE]
> En cas de difficulté pour vous connecter, contactez votre Team Leader ou le secrétariat de compétition.`
      },
      en: {
        title: 'Sign in to the sign-off tool', short: 'Signing in',
        summary: 'The tool’s address and how to sign in with your CIS CNAT 48 credentials.',
        objectives: ['Open the sign-off tool', 'Sign in with your credentials'],
        quick: ['[cis.worldskills-france.org/signoff](https://cis.worldskills-france.org/signoff/index.php)', 'CIS CNAT 48 credentials', 'Problem: Team Leader or competition secretariat'],
        body: `## 1. Open the tool

Go to: [cis.worldskills-france.org/signoff](https://cis.worldskills-france.org/signoff/index.php)

## 2. Sign in with your CIS CNAT 48 credentials

![Sign-off tool sign-in screen](media:signoff/so_login.png)

> [!NOTE]
> If you have trouble signing in, contact your Team Leader or the competition secretariat.`
      }
    },

    {
      id: 'so-competition-steps', category: 'signoff', order: 3, level: 'beginner', status: 'published',
      menuPath: '', prereq: ['so-connect'], video: '', tags: ['étapes', 'pdf', 'clôture'],
      source: 'so_competitionstep', createdAt: '2025-08-27T09:08:00+02:00', createdBy: 'import', updatedAt: '2026-11-21T09:00:00+01:00', updatedBy: 'admin',
      history: [
        { at: '2025-08-27T09:08:00+02:00', by: 'marie', note: 'Dernière version sur DokuWiki (page « so_competitionstep »)', legacy: 'so_competitionstep' },
        { at: '2026-11-21T09:00:00+01:00', by: 'admin', note: 'Refonte : nouvelle mise en page et traduction anglaise' }
      ],
      fr: {
        title: 'Les étapes de compétition', short: 'Étapes de compétition',
        summary: 'Retrouver les étapes à réaliser dans la journée et celles déjà validées.',
        objectives: ['Trouver les étapes du jour', 'Retrouver les PDF des étapes validées', 'Savoir qui peut clôturer une étape'],
        quick: ['Liste des étapes du jour après connexion', 'Étapes validées + PDF en bas de page', 'Expert et adjoint recueillent les signatures, **seul l’Expert clôture**'],
        body: `## 1. Liste des étapes du jour

Chaque jour de compétition, une fois connecté, vous voyez toutes les étapes à compléter dans la journée pour le secrétariat de compétition.

Cliquez sur l'étape que vous souhaitez réaliser :

![Liste des étapes de compétition](media:signoff/so_competition.png)

## 2. Étapes déjà validées

En bas de page, vous retrouvez toutes les étapes que vous avez déjà validées, avec un accès au fichier PDF :

![Étapes de compétition validées](media:signoff/so_completedsteps.png)

> [!IMPORTANT] Qui peut clôturer ?
> L'Expert et l'Expert adjoint peuvent procéder sur leur PC aux contrôles d'identité, émargements et notations. En revanche, **seul l'Expert valide la clôture des étapes**. Pour les épreuves multisites, l'Expert et l'adjoint doivent donc se coordonner pour collecter l'ensemble des éléments avant que l'Expert procède à la clôture.`
      },
      en: {
        title: 'Competition steps', short: 'Competition steps',
        summary: 'Find the steps to complete today and those already approved.',
        objectives: ['Find today’s steps', 'Get the PDFs of approved steps', 'Know who can close a step'],
        quick: ['Today’s steps are listed after signing in', 'Approved steps + PDFs at the bottom of the page', 'Expert and deputy collect signatures, **only the Expert closes**'],
        body: `## 1. Today's steps

On each competition day, once signed in, you see every step to complete that day for the competition secretariat.

Click the step you want to carry out:

![List of competition steps](media:signoff/so_competition.png)

## 2. Steps already approved

At the bottom of the page you will find all the steps you have already approved, with access to the PDF file:

![Approved competition steps](media:signoff/so_completedsteps.png)

> [!IMPORTANT] Who can close a step?
> The Expert and Deputy Expert can both carry out identity checks, sign-ins and mark approvals on their PC. However, **only the Expert closes steps**. For multi-site tests, the Expert and deputy must coordinate to collect everything before the Expert closes the step.`
      }
    },

    {
      id: 'so-identity', category: 'signoff', order: 4, level: 'intermediate', status: 'published',
      menuPath: '', prereq: ['so-competition-steps'], video: '', tags: ['identités', 'jurés', 'compétiteurs', 'équipe métier', 'sécurité', 'c-2', 'c-1'],
      source: 'so_identity', createdAt: '2025-08-27T09:11:00+02:00', createdBy: 'import', updatedAt: '2026-11-21T09:00:00+01:00', updatedBy: 'admin',
      history: [
        { at: '2025-08-27T09:11:00+02:00', by: 'marie', note: 'Dernière version sur DokuWiki (page « so_identity »)', legacy: 'so_identity' },
        { at: '2026-11-21T09:00:00+01:00', by: 'admin', note: 'Refonte : nouvelle mise en page et traduction anglaise' }
      ],
      fr: {
        title: 'Vérification des identités', short: 'Vérification des identités',
        summary: 'Identités de l’équipe métier (C-2), des jurés et des compétiteurs (C-1), puis clôture de l’étape.',
        objectives: ['Ajouter et faire signer l’équipe métier', 'Faire vérifier leur identité aux jurés et compétiteurs', 'Signaler une erreur ou une absence', 'Clôturer l’étape'],
        quick: [
          'C-2 équipe métier : nom, prénom, rôle, structure › **Ajouter un membre** › **Signature**',
          'Liste = référence sécurité : noter toutes les personnes prévues, « absentes » si besoin',
          'C-1 jurés et compétiteurs : listes pré-remplies › **Signature** (date de naissance pour les compétiteurs)',
          '**Signaler une erreur** pour corriger nom/prénom · **Absent** en cas d’absence',
          '**Clôturer l’étape** › signatures Expert + adjoint'
        ],
        body: `## Identités équipe métier

L'étape **[C-2] Identités équipe métier** permet d'ajouter les membres de l'équipe métier présents sur l'espace de compétition : tous les intervenants (hors jurés et compétiteurs), dont le chef d'atelier et son adjoint, les assistants montage/démontage et les partenaires sur l'espace métier (formateur, technicien spécialisé, etc.).

Ajoutez d'abord chaque membre avec ses nom, prénom, rôle et, éventuellement, sa société ou structure d'appartenance, puis cliquez sur **Ajouter un membre** :

![Ajout d'un membre de l'équipe métier](media:signoff/so_smt_addmember.png)

Faites ensuite signer chaque membre en cliquant sur **Signature**.

> [!IMPORTANT] Listing sécurité
> Ces émargements constituent la **référence en termes de listing sécurité** sur l'espace métier : toute personne présente doit y figurer. Notez donc les personnes prévues et indiquez-les « absentes » si besoin. Une fois initialisée, cette liste sera proposée chaque jour pour l'émargement de l'équipe métier.

![Signature des membres de l'équipe métier](media:signoff/so_smt_signoff.png)

Une fois que tous les membres de l'équipe métier ont été ajoutés et ont signé, vous pouvez passer à la clôture de l'étape.

## Identités jurés

À C-1, lors de la vérification de l'identité des jurés, tous les jurés inscrits à la compétition apparaissent automatiquement dans la liste.

Utilisez le bouton **Signature** pour que chaque juré valide que son identité est correcte et atteste de sa présence sur le site :

![Signature des jurés](media:signoff/so_signoffjury.png)

> [!WARNING]
> - En cas d'erreur, utilisez le bouton **Signaler une erreur** pour transmettre au secrétariat de compétition les corrections à apporter au nom et/ou au prénom du participant, puis validez.
> - En cas d'absence du juré, utilisez le bouton **Absent**.

Une fois que tous les jurés ont signé, vous pouvez passer à la validation pour clôturer l'étape.

## Identités compétiteurs

À C-1, lors de la vérification de l'identité des compétiteurs, tous les inscrits à la compétition apparaissent automatiquement dans la liste.

Utilisez le bouton **Signature** pour que chaque compétiteur valide que son identité est correcte, **confirme sa date de naissance** et atteste de sa présence sur le site :

![Signature des compétiteurs](media:signoff/so_signoffcompetitor.png)

> [!WARNING]
> - En cas d'erreur, utilisez le bouton **Signaler une erreur** pour transmettre au secrétariat de compétition les corrections à apporter au nom et/ou au prénom du participant, puis validez.
> - En cas d'absence du compétiteur, utilisez le bouton **Absent**.

Une fois que tous les compétiteurs ont signé, vous pouvez passer à la validation pour clôturer l'étape.

## Vérification des signatures et clôture de l'étape

Une fois les identités vérifiées, assurez-vous que toutes les signatures ont bien été enregistrées.

Vous pouvez ensuite clôturer l'étape avec le bouton **Clôturer l'étape**. L'Expert et l'Expert adjoint doivent alors signer le document pour valider l'étape :

![Clôture et validation de l'étape](media:signoff/so_validation.png)

> [!NOTE]
> En cas d'erreur, contactez votre Team Leader ou le secrétariat de compétition.`
      },
      en: {
        title: 'Identity checks', short: 'Identity checks',
        summary: 'Skill team identities (C-2), juror and competitor identities (C-1), then closing the step.',
        objectives: ['Add the skill team and collect their signatures', 'Have jurors and competitors check their identity', 'Report an error or an absence', 'Close the step'],
        quick: [
          'C-2 skill team: last name, first name, role, organisation › **Ajouter un membre** › **Signature**',
          'This list is the safety reference: record everyone expected, mark as absent if needed',
          'C-1 jurors and competitors: pre-filled lists › **Signature** (date of birth for competitors)',
          '**Signaler une erreur** to correct names · **Absent** for absences',
          '**Clôturer l’étape** › Expert + deputy signatures'
        ],
        body: `> [!NOTE] Button labels
> The sign-off tool is in French. Button names are shown as they appear on screen, with a translation in brackets.

## Skill team identities

The **[C-2] Identités équipe métier** step is used to add the skill team members present in the competition area: everyone working there (other than jurors and competitors), including the workshop manager and deputy, set-up/dismantling assistants and partners in the skill area (trainer, specialist technician, etc.).

First add each member with their last name, first name, role and, if relevant, company or organisation, then click **Ajouter un membre** (*Add a member*):

![Adding a skill team member](media:signoff/so_smt_addmember.png)

Then have each member sign by clicking **Signature**.

> [!IMPORTANT] Safety list
> These sign-ins are the **reference safety list** for the skill area: everyone present must be on it. Record everyone expected and mark them as absent if needed. Once set up, this list is offered every day for the skill team sign-in.

![Skill team members signing](media:signoff/so_smt_signoff.png)

Once all skill team members have been added and have signed, you can close the step.

## Juror identities

On C-1, when checking juror identities, all jurors registered for the competition appear automatically in the list.

Use the **Signature** button so that each juror confirms their identity is correct and that they are present on site:

![Jurors signing](media:signoff/so_signoffjury.png)

> [!WARNING]
> - If something is wrong, use **Signaler une erreur** (*Report an error*) to send the competition secretariat the corrections to the participant's last and/or first name, then confirm.
> - If a juror is absent, use the **Absent** button.

Once all jurors have signed, you can move on to approval to close the step.

## Competitor identities

On C-1, when checking competitor identities, all registered competitors appear automatically in the list.

Use the **Signature** button so that each competitor confirms their identity is correct, **confirms their date of birth** and that they are present on site:

![Competitors signing](media:signoff/so_signoffcompetitor.png)

> [!WARNING]
> - If something is wrong, use **Signaler une erreur** (*Report an error*) to send the competition secretariat the corrections to the participant's last and/or first name, then confirm.
> - If a competitor is absent, use the **Absent** button.

Once all competitors have signed, you can move on to approval to close the step.

## Checking signatures and closing the step

Once identities have been checked, make sure all signatures have been recorded.

You can then close the step with **Clôturer l'étape** (*Close step*). The Expert and Deputy Expert must then sign the document to approve the step:

![Closing and approving the step](media:signoff/so_validation.png)

> [!NOTE]
> If something goes wrong, contact your Team Leader or the competition secretariat.`
      }
    },

    {
      id: 'so-marking-scheme', category: 'signoff', order: 5, level: 'beginner', status: 'published',
      menuPath: '', prereq: ['so-competition-steps', 'marking-scheme'], video: '', tags: ['barème', 'validation', 'c-1', 'acceptance'],
      source: 'so_markingscheme', createdAt: '2025-08-27T09:03:00+02:00', createdBy: 'import', updatedAt: '2026-11-21T09:00:00+01:00', updatedBy: 'admin',
      history: [
        { at: '2025-08-27T09:03:00+02:00', by: 'marie', note: 'Dernière version sur DokuWiki (page « so_markingscheme »)', legacy: 'so_markingscheme' },
        { at: '2026-11-21T09:00:00+01:00', by: 'admin', note: 'Refonte : nouvelle mise en page et traduction anglaise' }
      ],
      fr: {
        title: 'Marking Scheme Acceptance : validation du barème', short: 'Validation du barème',
        summary: 'À C-1, l’Expert valide le barème intégré dans le CIS et atteste l’avoir partagé avec les jurés.',
        objectives: ['Signer la validation du barème', 'Clôturer l’étape', 'Savoir quoi faire ensuite au secrétariat'],
        quick: ['C-1 · Expert : signer le formulaire *Marking Scheme Acceptance*', '**Clôturer l’étape** › signature de l’Expert', 'Puis au secrétariat : identités, Marking Schedule, groupes de notation'],
        body: `À C-1, l'Expert doit valider le barème intégré dans le CIS et attester l'avoir partagé avec les jurés. Pour cela, il signe le formulaire dédié.

## Vérification et clôture de l'étape

Assurez-vous que votre signature a bien été enregistrée.

Vous pouvez ensuite clôturer l'étape avec le bouton **Clôturer l'étape**. L'Expert doit alors signer le document pour valider l'étape.

> [!IMPORTANT] Ensuite
> Rendez-vous au secrétariat de compétition pour vérifier la bonne correction des identités, finaliser votre [[marking-days|Marking Schedule]] et vos groupes de notation, puis confirmer que tout est prêt pour le début des épreuves.

![Clôture et validation de l'étape](media:signoff/so_validation.png)

> [!NOTE]
> En cas d'erreur, contactez votre Team Leader ou le secrétariat de compétition.`
      },
      en: {
        title: 'Marking Scheme Acceptance: approving the marking scheme', short: 'Marking scheme approval',
        summary: 'On C-1, the Expert approves the marking scheme in the CIS and confirms it was shared with the jurors.',
        objectives: ['Sign the marking scheme approval', 'Close the step', 'Know what to do next at the secretariat'],
        quick: ['C-1 · Expert: sign the *Marking Scheme Acceptance* form', '**Clôturer l’étape** (*Close step*) › Expert signature', 'Then at the secretariat: identities, Marking Schedule, marking groups'],
        body: `On C-1, the Expert must approve the marking scheme in the CIS and confirm it has been shared with the jurors, by signing the dedicated form.

## Checking and closing the step

Make sure your signature has been recorded.

You can then close the step with **Clôturer l'étape** (*Close step*). The Expert must then sign the document to approve the step.

> [!IMPORTANT] Next
> Go to the competition secretariat to check that identities have been corrected, finalise your [[marking-days|Marking Schedule]] and marking groups, then confirm everything is ready for the test to start.

![Closing and approving the step](media:signoff/so_validation.png)

> [!NOTE]
> If something goes wrong, contact your Team Leader or the competition secretariat.`
      }
    },

    {
      id: 'so-daily-signoff', category: 'signoff', order: 6, level: 'beginner', status: 'published',
      menuPath: '', prereq: ['so-competition-steps'], video: '', tags: ['émargement', 'présence', 'quotidien', 'sign-in'],
      source: 'so_signoff', createdAt: '2025-08-27T08:07:00+02:00', createdBy: 'import', updatedAt: '2026-11-21T09:00:00+01:00', updatedBy: 'admin',
      history: [
        { at: '2025-08-27T08:07:00+02:00', by: 'marie', note: 'Dernière version sur DokuWiki (page « so_signoff »)', legacy: 'so_signoff' },
        { at: '2026-11-21T09:00:00+01:00', by: 'admin', note: 'Refonte : nouvelle mise en page et traduction anglaise' }
      ],
      fr: {
        title: 'Émargements quotidiens', short: 'Émargements',
        summary: 'Chaque matin, l’équipe métier, les jurés et les compétiteurs émargent sur le PC de l’Expert.',
        objectives: ['Recueillir les émargements du matin', 'Clôturer l’étape'],
        quick: ['Chaque matin : équipe métier, jurés et compétiteurs signent sur le PC de l’Expert', 'Vérifier les signatures', '**Clôturer l’étape** › signatures Expert + adjoint'],
        body: `Chaque matin, l'équipe métier, les jurés et les compétiteurs doivent émarger. L'Expert invite chaque participant à venir signer sur son PC :

![Émargement des participants](media:signoff/so_signoff.png)

## Vérification des signatures et clôture de l'étape

Assurez-vous que toutes les signatures ont bien été enregistrées.

Vous pouvez ensuite clôturer l'étape avec le bouton **Clôturer l'étape**. L'Expert et l'Expert adjoint doivent alors signer le document pour valider l'étape :

![Clôture et validation de l'étape](media:signoff/so_validation.png)

> [!NOTE]
> En cas d'erreur, contactez votre Team Leader ou le secrétariat de compétition.`
      },
      en: {
        title: 'Daily sign-in', short: 'Daily sign-in',
        summary: 'Every morning, the skill team, jurors and competitors sign in on the Expert’s PC.',
        objectives: ['Collect the morning sign-ins', 'Close the step'],
        quick: ['Every morning: skill team, jurors and competitors sign on the Expert’s PC', 'Check the signatures', '**Clôturer l’étape** (*Close step*) › Expert + deputy signatures'],
        body: `Every morning, the skill team, jurors and competitors must sign in. The Expert invites each participant to come and sign on their PC:

![Participants signing in](media:signoff/so_signoff.png)

## Checking signatures and closing the step

Make sure all signatures have been recorded.

You can then close the step with **Clôturer l'étape** (*Close step*). The Expert and Deputy Expert must then sign the document to approve the step:

![Closing and approving the step](media:signoff/so_validation.png)

> [!NOTE]
> If something goes wrong, contact your Team Leader or the competition secretariat.`
      }
    },

    {
      id: 'so-closing', category: 'signoff', order: 7, level: 'intermediate', status: 'published',
      menuPath: '', prereq: ['so-competition-steps', 'enter-marks'], video: '', tags: ['notation', 'mark entry acceptance', 'refus de signer', 'fin de journée'],
      source: 'so_closing', createdAt: '2025-08-27T08:14:00+02:00', createdBy: 'import', updatedAt: '2026-11-21T09:00:00+01:00', updatedBy: 'admin',
      history: [
        { at: '2025-08-27T08:14:00+02:00', by: 'marie', note: 'Dernière version sur DokuWiki (page « so_closing »)', legacy: 'so_closing' },
        { at: '2026-11-21T09:00:00+01:00', by: 'admin', note: 'Refonte : nouvelle mise en page et traduction anglaise' }
      ],
      fr: {
        title: 'Notation : validation de la saisie des notes', short: 'Notation du jour',
        summary: 'En fin de journée, les jurés valident la bonne ressaisie des notes dans le CIS (Mark entry acceptance form).',
        objectives: ['Faire valider la saisie des notes par les jurés', 'Gérer une absence ou un refus de signer', 'Clôturer la journée'],
        quick: [
          'Fin de journée : chaque juré signe le *Mark entry acceptance form* sur le PC de l’Expert',
          '**Absent** ou **Refus de signer** › à consigner dans le PV journalier + Team Leader',
          '**Clôturer l’étape** › signatures Expert + adjoint',
          'Rendre le Classeur Métier et les formulaires papier au secrétariat'
        ],
        body: `À la fin de chaque jour d'épreuve, les jurés doivent valider la bonne ressaisie des notes dans le CIS (*Mark entry acceptance form*). L'Expert invite chaque juré à venir signer sur son PC.

> [!WARNING] Absence ou refus de signer
> - En cas d'absence du juré, utilisez le bouton **Absent**.
> - En cas de refus de signer (contestation des notes, et non de la conformité de la ressaisie par exemple), utilisez le bouton **Refus de signer**.
>
> Dans les deux cas, formalisez la situation dans le PV journalier du Classeur Métier pour justifier l'absence de signature, et partagez le sujet avec votre Team Leader.

![Signature des jurés pour la saisie des notes](media:signoff/so_signoff.png)

## Vérification des signatures et clôture de l'étape

Assurez-vous que toutes les signatures ont bien été enregistrées.

Vous pouvez ensuite clôturer l'étape avec le bouton **Clôturer l'étape**. L'Expert et l'Expert adjoint doivent alors signer le document pour valider l'étape.

> [!IMPORTANT] Ensuite
> Rendez-vous au secrétariat de compétition pour remettre le Classeur Métier à votre Team Leader et déposer les formulaires de notation papier.

![Clôture et validation de l'étape](media:signoff/so_validation.png)

> [!NOTE]
> En cas d'erreur, contactez votre Team Leader ou le secrétariat de compétition.`
      },
      en: {
        title: 'Marks: approving the mark entry', short: 'Daily marks',
        summary: 'At the end of the day, jurors confirm the marks were correctly entered in the CIS (Mark entry acceptance form).',
        objectives: ['Have jurors approve the mark entry', 'Handle an absence or refusal to sign', 'Close the day'],
        quick: [
          'End of day: each juror signs the *Mark entry acceptance form* on the Expert’s PC',
          '**Absent** or **Refus de signer** (*Refuse to sign*) › record in the daily report + tell the Team Leader',
          '**Clôturer l’étape** (*Close step*) › Expert + deputy signatures',
          'Return the skill workbook and paper forms to the secretariat'
        ],
        body: `At the end of each competition day, jurors must confirm that the marks were correctly entered in the CIS (*Mark entry acceptance form*). The Expert invites each juror to come and sign on their PC.

> [!WARNING] Absence or refusal to sign
> - If a juror is absent, use the **Absent** button.
> - If a juror refuses to sign (for example disputing the marks rather than how they were entered), use **Refus de signer** (*Refuse to sign*).
>
> In both cases, record the situation in the skill workbook's daily report to explain the missing signature, and raise it with your Team Leader.

![Jurors signing the mark entry](media:signoff/so_signoff.png)

## Checking signatures and closing the step

Make sure all signatures have been recorded.

You can then close the step with **Clôturer l'étape** (*Close step*). The Expert and Deputy Expert must then sign the document to approve the step.

> [!IMPORTANT] Next
> Go to the competition secretariat to hand the skill workbook to your Team Leader and drop off the paper marking forms.

![Closing and approving the step](media:signoff/so_validation.png)

> [!NOTE]
> If something goes wrong, contact your Team Leader or the competition secretariat.`
      }
    },

    {
      id: 'so-export', category: 'signoff', order: 8, level: 'beginner', status: 'published',
      menuPath: '', prereq: ['so-competition-steps'], video: '', tags: ['pdf', 'export', 'archive'],
      source: 'so_export', createdAt: '2025-08-22T16:03:00+02:00', createdBy: 'import', updatedAt: '2026-11-21T09:00:00+01:00', updatedBy: 'admin',
      history: [
        { at: '2025-08-22T16:03:00+02:00', by: 'anthony', note: 'Dernière version sur DokuWiki (page « so_export »)', legacy: 'so_export' },
        { at: '2026-11-21T09:00:00+01:00', by: 'admin', note: 'Refonte : nouvelle mise en page et traduction anglaise' }
      ],
      fr: {
        title: 'Export PDF d’une étape', short: 'Export PDF',
        summary: 'Exporter et conserver le PDF d’une étape clôturée, avec toutes les signatures.',
        objectives: ['Exporter le PDF d’une étape clôturée'],
        quick: ['Étape clôturée › générer le PDF', 'Rien à envoyer au secrétariat : transmission automatique'],
        body: `Lorsque l'étape de compétition a été clôturée, vous pouvez en faire un export PDF et le conserver :

![Bouton de génération du PDF](media:signoff/so_generatepdf.png)

> [!NOTE]
> Le fichier PDF n'a pas besoin d'être transmis au secrétariat de compétition : les informations sont transmises automatiquement.

Le PDF fait apparaître toutes les informations de l'étape de compétition et les signatures des différents participants :

![Exemple de PDF exporté](media:signoff/so_pdf.png)`
      },
      en: {
        title: 'Exporting a step to PDF', short: 'PDF export',
        summary: 'Export and keep the PDF of a closed step, with all signatures.',
        objectives: ['Export the PDF of a closed step'],
        quick: ['Closed step › generate the PDF', 'Nothing to send to the secretariat: it is transmitted automatically'],
        body: `Once a competition step has been closed, you can export it to PDF and keep it:

![PDF generation button](media:signoff/so_generatepdf.png)

> [!NOTE]
> You don't need to send the PDF to the competition secretariat: the information is transmitted automatically.

The PDF shows all the information for the competition step and every participant's signature:

![Example of an exported PDF](media:signoff/so_pdf.png)`
      }
    },

    /* ================================================================== */
    /*  VIDÉOS                                                             */
    /* ================================================================== */
    { id: 'video-intro', category: 'videos', order: 1, level: 'beginner', status: 'published', menuPath: '', prereq: [], video: '', tags: ['vidéo', 'introduction'],
      source: 'videos/intro', createdAt: '2021-03-20T14:14:00+01:00', createdBy: 'import', updatedAt: '2026-11-21T09:00:00+01:00', updatedBy: 'admin',
      history: [
        { at: '2021-03-20T14:14:00+01:00', by: 'alberic', note: 'Dernière version sur DokuWiki (page « videos/intro »)', legacy: 'videos/intro' },
        { at: '2026-11-21T09:00:00+01:00', by: 'admin', note: 'Refonte : nouvelle mise en page et traduction anglaise' }
      ],
      fr: { title: 'Vidéo : introduction au CIS', short: 'Introduction', summary: 'Mots clés, étapes et accès au CIS.', objectives: [], quick: [],
        body: `::video[Introduction : mots clés, étapes, accès](media:videos/intro.mp4)

Sujet de la vidéo : les mots clés, les étapes et l'accès au CIS.

Pour aller plus loin : [[decouvrir-le-cis|Découvrir le CIS]].` },
      en: { title: 'Video: introduction to the CIS', short: 'Introduction', summary: 'Key terms, steps and access to the CIS.', objectives: [], quick: [],
        body: `::video[Introduction: key terms, steps, access](media:videos/intro.mp4)

Video topic: key terms, the marking steps and how to access the CIS. *Video in French.*

Learn more: [[decouvrir-le-cis|Discover the CIS]].` } },

    { id: 'video-marking-scheme', category: 'videos', order: 2, level: 'beginner', status: 'published', menuPath: '', prereq: [], video: '', tags: ['vidéo', 'barème'],
      source: 'videos/markingscheme', createdAt: '2021-03-20T14:41:00+01:00', createdBy: 'import', updatedAt: '2026-11-21T09:00:00+01:00', updatedBy: 'admin',
      history: [
        { at: '2021-03-20T14:41:00+01:00', by: 'alberic', note: 'Dernière version sur DokuWiki (page « videos/markingscheme »)', legacy: 'videos/markingscheme' },
        { at: '2026-11-21T09:00:00+01:00', by: 'admin', note: 'Refonte : nouvelle mise en page et traduction anglaise' }
      ],
      fr: { title: 'Vidéo : Marking Scheme', short: 'Marking Scheme', summary: 'Préparer et importer le barème de notation.', objectives: [], quick: [],
        body: `::video[Marking Scheme](media:videos/markingscheme.mp4)

Le guide écrit : [[marking-scheme|Marking Scheme : la grille de notation]].` },
      en: { title: 'Video: Marking Scheme', short: 'Marking Scheme', summary: 'Prepare and import the marking scheme.', objectives: [], quick: [],
        body: `::video[Marking Scheme](media:videos/markingscheme.mp4)

*Video in French.* Written guide: [[marking-scheme|Marking Scheme: the marking grid]].` } },

    { id: 'video-export-import', category: 'videos', order: 3, level: 'intermediate', status: 'published', menuPath: '', prereq: [], video: '', tags: ['vidéo', 'export', 'import', 'barème'],
      source: 'videos/exportimportmarkingscheme', createdAt: '2021-03-20T16:57:00+01:00', createdBy: 'import', updatedAt: '2026-11-21T09:00:00+01:00', updatedBy: 'admin',
      history: [
        { at: '2021-03-20T16:57:00+01:00', by: 'alberic', note: 'Dernière version sur DokuWiki (page « videos/exportimportmarkingscheme »)', legacy: 'videos/exportimportmarkingscheme' },
        { at: '2026-11-21T09:00:00+01:00', by: 'admin', note: 'Refonte : nouvelle mise en page et traduction anglaise' }
      ],
      fr: { title: 'Vidéo : exporter et importer le Marking Scheme', short: 'Exporter / importer', summary: 'Exporter le barème depuis le CIS et le réimporter.', objectives: [], quick: [],
        body: `::video[Exporter / importer le Marking Scheme](media:videos/exportimportmarkingscheme.mp4)

Le guide écrit : [[marking-scheme|Marking Scheme : la grille de notation]].` },
      en: { title: 'Video: export and import the Marking Scheme', short: 'Export / import', summary: 'Export the marking scheme from the CIS and import it back.', objectives: [], quick: [],
        body: `::video[Export / import the Marking Scheme](media:videos/exportimportmarkingscheme.mp4)

*Video in French.* Written guide: [[marking-scheme|Marking Scheme: the marking grid]].` } },

    { id: 'video-marking-days', category: 'videos', order: 4, level: 'beginner', status: 'published', menuPath: '', prereq: [], video: '', tags: ['vidéo', 'planning'],
      source: 'videos/markingdays', createdAt: '2021-03-20T15:34:00+01:00', createdBy: 'import', updatedAt: '2026-11-21T09:00:00+01:00', updatedBy: 'admin',
      history: [
        { at: '2021-03-20T15:34:00+01:00', by: 'alberic', note: 'Dernière version sur DokuWiki (page « videos/markingdays »)', legacy: 'videos/markingdays' },
        { at: '2026-11-21T09:00:00+01:00', by: 'admin', note: 'Refonte : nouvelle mise en page et traduction anglaise' }
      ],
      fr: { title: 'Vidéo : Marking Days', short: 'Marking Days', summary: 'Planifier le jour de notation de chaque sous-critère.', objectives: [], quick: [],
        body: `::video[Marking Days](media:videos/markingday.mp4)

Le guide écrit : [[marking-days|Marking Days : planifier la notation]].` },
      en: { title: 'Video: Marking Days', short: 'Marking Days', summary: 'Plan the marking day for each sub-criterion.', objectives: [], quick: [],
        body: `::video[Marking Days](media:videos/markingday.mp4)

*Video in French.* Written guide: [[marking-days|Marking Days: plan the marking]].` } },

    { id: 'video-marking-team', category: 'videos', order: 5, level: 'beginner', status: 'published', menuPath: '', prereq: [], video: '', tags: ['vidéo', 'jurés'],
      source: 'videos/markingteam', createdAt: '2021-03-20T15:34:00+01:00', createdBy: 'import', updatedAt: '2026-11-21T09:00:00+01:00', updatedBy: 'admin',
      history: [
        { at: '2021-03-20T15:34:00+01:00', by: 'alberic', note: 'Dernière version sur DokuWiki (page « videos/markingteam »)', legacy: 'videos/markingteam' },
        { at: '2026-11-21T09:00:00+01:00', by: 'admin', note: 'Refonte : nouvelle mise en page et traduction anglaise' }
      ],
      fr: { title: 'Vidéo : Marking Team', short: 'Marking Team', summary: 'Composer les équipes de jurés et superviseurs.', objectives: [], quick: [],
        body: `::video[Marking Team](media:videos/markingteam.mp4)

Le guide écrit : [[marking-team|Marking Team : composer les équipes de jurés]].` },
      en: { title: 'Video: Marking Team', short: 'Marking Team', summary: 'Set up the juror and supervisor teams.', objectives: [], quick: [],
        body: `::video[Marking Team](media:videos/markingteam.mp4)

*Video in French.* Written guide: [[marking-team|Marking Team: set up the juror teams]].` } },

    { id: 'video-marking-forms', category: 'videos', order: 6, level: 'beginner', status: 'published', menuPath: '', prereq: [], video: '', tags: ['vidéo', 'pdf'],
      source: 'videos/markingforms', createdAt: '2021-03-20T16:10:00+01:00', createdBy: 'import', updatedAt: '2026-11-21T09:00:00+01:00', updatedBy: 'admin',
      history: [
        { at: '2021-03-20T16:10:00+01:00', by: 'alberic', note: 'Dernière version sur DokuWiki (page « videos/markingforms »)', legacy: 'videos/markingforms' },
        { at: '2026-11-21T09:00:00+01:00', by: 'admin', note: 'Refonte : nouvelle mise en page et traduction anglaise' }
      ],
      fr: { title: 'Vidéo : Marking Forms', short: 'Marking Forms', summary: 'Générer les feuilles de notation.', objectives: [], quick: [],
        body: `::video[Marking Forms](media:videos/markingfroms.mp4)

Le guide écrit : [[marking-forms|Marking Forms : générer les feuilles de notation]].` },
      en: { title: 'Video: Marking Forms', short: 'Marking Forms', summary: 'Generate the marking sheets.', objectives: [], quick: [],
        body: `::video[Marking Forms](media:videos/markingfroms.mp4)

*Video in French.* Written guide: [[marking-forms|Marking Forms: generate the marking sheets]].` } },

    { id: 'video-enter-marks', category: 'videos', order: 7, level: 'beginner', status: 'published', menuPath: '', prereq: [], video: '', tags: ['vidéo', 'saisie'],
      source: 'videos/entermarks', createdAt: '2021-03-27T11:17:00+01:00', createdBy: 'import', updatedAt: '2026-11-21T09:00:00+01:00', updatedBy: 'admin',
      history: [
        { at: '2021-03-27T11:17:00+01:00', by: 'alberic', note: 'Dernière version sur DokuWiki (page « videos/entermarks »)', legacy: 'videos/entermarks' },
        { at: '2026-11-21T09:00:00+01:00', by: 'admin', note: 'Refonte : nouvelle mise en page et traduction anglaise' }
      ],
      fr: { title: 'Vidéo : Enter Marks', short: 'Enter Marks', summary: 'Saisir les notes pendant la compétition.', objectives: [], quick: [],
        body: `::video[Enter Marks](media:videos/entermarks.mp4)

Le guide écrit : [[enter-marks|Enter Marks : saisir les notes]].` },
      en: { title: 'Video: Enter Marks', short: 'Enter Marks', summary: 'Enter marks during the competition.', objectives: [], quick: [],
        body: `::video[Enter Marks](media:videos/entermarks.mp4)

*Video in French.* Written guide: [[enter-marks|Enter Marks: enter the marks]].` } }
  ]
};
