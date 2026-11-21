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
