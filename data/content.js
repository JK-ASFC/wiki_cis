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
    contact: 'cis@cofom.org',
    popular: ['marking-scheme', 'enter-marks', 'marking-types'],
    workflow: [
      { step: 1, page: 'marking-scheme', phase: 'before', icon: 'table' },
      { step: 2, page: 'lock-marking-scheme', phase: 'before', icon: 'lock' },
      { step: 3, page: 'marking-days', phase: 'before', icon: 'calendar' },
      { step: 4, page: 'marking-team', phase: 'before', icon: 'users' },
      { step: 5, page: 'marking-forms', phase: 'before', icon: 'printer' },
      { step: 6, page: 'enter-marks', phase: 'during', icon: 'keyboard' },
      { step: 7, page: 'results', phase: 'after', icon: 'award' }
    ],
  },

  categories: [
    { id: 'start', order: 1, icon: 'flag', color: 'blue',
      fr: { title: 'Prise en main', desc: 'Découvrir le CIS et les nouveautés de chaque version.' },
      en: { title: 'Getting started', desc: 'Discover the CIS and what is new in each version.' } },
    { id: 'cis', order: 2, icon: 'clipboard', color: 'indigo',
      fr: { title: 'Notation avec le CIS', desc: 'Du barème aux résultats : toutes les étapes de la notation, dans l’ordre.' },
      en: { title: 'Marking with the CIS', desc: 'From marking scheme to results: every marking step, in order.' } },
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
      fr: { term: 'Aspect', aliases: ['aspects'], def: 'Élément du barème noté individuellement, sur 2 points au maximum. Un aspect est de type Measurement ou Judgement.' },
      en: { term: 'Aspect', aliases: ['aspects'], def: 'An item of the marking scheme marked individually, worth 2 marks at most. An aspect is either Measurement or Judgement.' } },
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
    { id: 'expert', page: 'decouvrir-le-cis',
      fr: { term: 'Expert', aliases: [], def: 'Responsable du métier : il prépare le barème, les calculs et le planning dans le CIS, puis encadre la notation avec les jurés.' },
      en: { term: 'Expert', aliases: [], def: 'The person in charge of the skill: prepares the marking scheme, calculations and schedule in the CIS, then leads marking with the jurors.' } },
    { id: 'team-leader', page: 'lock-marking-scheme',
      fr: { term: 'Team Leader', aliases: [], def: 'Responsable WorldSkills France qui accompagne les Experts. Avant le verrouillage, il vérifie le barème (points, WSOS, calculs) et donne son accord.' },
      en: { term: 'Team Leader', aliases: [], def: 'WorldSkills France officer who supports the Experts. Before locking, they check the marking scheme (marks, WSOS, calculations) and give their approval.' } },
    { id: 'jours-c', page: 'decouvrir-le-cis',
      fr: { term: 'C-2, C-1, C1…', aliases: ['C-2', 'C-1'], def: 'Jours relatifs à la compétition : C-2 et C-1 sont les jours de préparation avant les épreuves, C1, C2 et C3 les jours d’épreuve.' },
      en: { term: 'C-2, C-1, C1…', aliases: ['C-2', 'C-1'], def: 'Days relative to the competition: C-2 and C-1 are preparation days before the test, C1, C2 and C3 are competition days.' } },
    { id: 'wsss', page: 'marking-scheme',
      fr: { term: 'WSSS / WSOS', aliases: ['WSSS'], def: 'WorldSkills Standards Specification / Occupational Standards : le référentiel de compétences du métier, dont les sections peuvent être importées avec le barème.' },
      en: { term: 'WSSS / WSOS', aliases: ['WSSS'], def: 'WorldSkills Standards Specification / Occupational Standards: the skill’s competency framework, whose sections can be imported with the marking scheme.' } },
  ],

  pages: [
    /* ================================================================== */
    /*  PRISE EN MAIN                                                      */
    /* ================================================================== */

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
