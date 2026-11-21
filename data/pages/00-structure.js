/*
 * CIS Wiki — structure de la refonte CIS v6 (catégories, parcours, glossaire complémentaire).
 *
 * Chargé après data/content.js. Les pages sont ajoutées par les fichiers data/pages/*.js
 * avec WIKI_PAGE({...}), qui complète les champs communs (dates, historique, statut).
 */
(function (S) {
  'use strict';
  S.version = '2026-11-21.6';

  var NOW = '2026-11-21T18:00:00+01:00';
  window.WIKI_PAGE = function (p) {
    var page = Object.assign({
      status: 'published', level: 'beginner', menuPath: '', prereq: [], video: '', tags: [],
      createdAt: NOW, createdBy: 'admin', updatedAt: NOW, updatedBy: 'admin'
    }, p);
    page.history = p.history || [
      { at: NOW, by: 'admin', note: 'Refonte CIS v6 : contenu vérifié sur l’instance de formation (métier 155 test_wiki)' }
    ];
    S.pages.push(page);
    return page;
  };

  S.categories = [
    { id: 'start', order: 1, icon: 'flag', color: 'blue',
      fr: { title: 'Prise en main', desc: 'Comprendre le CIS, se connecter et trouver son chemin dans les menus.' },
      en: { title: 'Getting started', desc: 'Understand the CIS, log in and find your way around the menus.' } },
    { id: 'bareme', order: 2, icon: 'table', color: 'indigo',
      fr: { title: 'Préparer le barème', desc: 'Remplir le fichier Excel, l’importer, vérifier les WSOS et verrouiller.' },
      en: { title: 'Prepare the marking scheme', desc: 'Fill in the Excel file, import it, check the WSOS and lock it.' } },
    { id: 'calculs', order: 3, icon: 'sliders', color: 'teal',
      fr: { title: 'Méthodes de calcul', desc: 'Les 7 calculs automatiques du CIS, testés, avec simulateur et exemples par métier.' },
      en: { title: 'Calculation methods', desc: 'The 7 automatic CIS calculations, tested, with a simulator and examples per skill.' } },
    { id: 'organisation', order: 4, icon: 'calendar', color: 'amber',
      fr: { title: 'Organiser la notation', desc: 'Jours de notation, équipes de jurés et feuilles de notation.' },
      en: { title: 'Organise marking', desc: 'Marking days, marking teams and marking forms.' } },
    { id: 'notation', order: 5, icon: 'keyboard', color: 'green',
      fr: { title: 'Noter et contrôler', desc: 'Saisir les notes, noter au jugement, suivre l’avancement et verrouiller.' },
      en: { title: 'Mark and check', desc: 'Enter marks, judgement marking, track progress and lock.' } },
    { id: 'aide', order: 6, icon: 'info', color: 'rose',
      fr: { title: 'Aide et dépannage', desc: 'Les messages du CIS expliqués et les questions fréquentes.' },
      en: { title: 'Help and troubleshooting', desc: 'CIS messages explained and frequently asked questions.' } },
    { id: 'signoff', order: 7, icon: 'signature', color: 'teal',
      fr: { title: 'Signatures CNAT 48', desc: 'L’outil de signature dématérialisé de la Compétition Nationale Marseille 2025.' },
      en: { title: 'CNAT 48 sign-off', desc: 'The digital sign-off tool of the Marseille 2025 National Competition.' } },
    { id: 'videos', order: 8, icon: 'video', color: 'rose',
      fr: { title: 'Vidéos', desc: 'Des tutoriels vidéo (CIS 5) pour chaque étape de la notation.' },
      en: { title: 'Videos', desc: 'Video tutorials (CIS 5) for each marking step.' } }
  ];

  S.settings.popular = ['excel-marking-scheme', 'marking-types', 'calc-ranged-score', 'enter-marks', 'messages-erreurs'];
  S.settings.workflow = [
    { step: 1, page: 'excel-marking-scheme', phase: 'before', icon: 'table' },
    { step: 2, page: 'marking-scheme', phase: 'before', icon: 'upload' },
    { step: 3, page: 'marking-types', phase: 'before', icon: 'sliders' },
    { step: 4, page: 'marking-days', phase: 'before', icon: 'calendar' },
    { step: 5, page: 'lock-marking-scheme', phase: 'before', icon: 'lock' },
    { step: 6, page: 'marking-forms', phase: 'before', icon: 'printer' },
    { step: 7, page: 'enter-marks', phase: 'during', icon: 'keyboard' },
    { step: 8, page: 'results', phase: 'after', icon: 'award' }
  ];

  // Glossaire : liens mis à jour + nouveaux termes CIS v6
  var relink = { measurement: 'marking-types', 'marking-type': 'marking-types', requirement: 'excel-marking-scheme', judgement: 'judgement', 'no-attempt': 'enter-marks', wsss: 'wsos', aspect: 'excel-marking-scheme', 'sous-critere': 'excel-marking-scheme' };
  S.glossary.forEach(function (g) { if (relink[g.id]) g.page = relink[g.id]; });
  S.glossary.forEach(function (g) {
    if (g.id === 'marking-type') {
      g.fr.def = 'Méthode de calcul automatique d’une note Measurement. Le CIS v6 en propose 7 : Pass/Fail, Choice, Number Completed, Ranged Score, Regular Difference Deduction, Percent Score Comparison et Stepped Score Comparison.';
      g.en.def = 'Automatic calculation method for a Measurement mark. CIS v6 offers 7: Pass/Fail, Choice, Number Completed, Ranged Score, Regular Difference Deduction, Percent Score Comparison and Stepped Score Comparison.';
      g.fr.aliases = ['Marking Types', 'Calculation', 'Calculations'];
      g.en.aliases = ['Marking Types', 'Calculation', 'Calculations'];
    }
    if (g.id === 'requirement') {
      g.fr.def = 'Colonne « Requirement » d’un aspect Measurement : la valeur attendue. Pour servir de cible à un calcul, elle doit contenir un nombre seul (800 et non « 800 mm ± 5 »).';
      g.en.def = '“Requirement” column of a Measurement aspect: the expected value. To be used as a calculation target, it must contain a number only (800, not “800 mm ± 5”).';
    }
    if (g.id === 'wsss') {
      g.fr.def = 'WorldSkills Occupational Standards (anciennement WSSS) : le référentiel du métier découpé en sections avec un poids en %. Chaque aspect du barème est rattaché à une section.';
      g.en.def = 'WorldSkills Occupational Standards (formerly WSSS): the skill’s framework split into weighted sections (%). Every aspect of the marking scheme is linked to one section.';
      g.fr.term = 'WSOS'; g.en.term = 'WSOS'; g.fr.aliases = ['WSSS', 'WS Occupational Standards']; g.en.aliases = ['WSSS', 'WS Occupational Standards'];
    }
  });
  [
    { id: 'pass-fail', page: 'calc-pass-fail',
      fr: { term: 'Pass/Fail', aliases: [], def: 'Méthode de calcul « tout ou rien » : Réussi = note maximale, Échoué = 0.' },
      en: { term: 'Pass/Fail', aliases: [], def: 'All-or-nothing calculation method: Pass = max mark, Fail = 0.' } },
    { id: 'choice', page: 'calc-choice',
      fr: { term: 'Choice', aliases: [], def: 'Méthode de calcul à choix : le juré choisit une option (jusqu’à 5) et le CIS retire la déduction liée à cette option.' },
      en: { term: 'Choice', aliases: [], def: 'Choice calculation method: the juror picks an option (up to 5) and the CIS subtracts the deduction linked to it.' } },
    { id: 'calc-library', page: 'marking-types',
      fr: { term: 'Calculation Library', aliases: ['bibliothèque de calculs'], def: 'Bibliothèque des calculs du métier : un calcul enregistré une fois peut être réutilisé sur plusieurs aspects avec « Add from Library ».' },
      en: { term: 'Calculation Library', aliases: [], def: 'The skill’s library of calculations: a calculation saved once can be reused on several aspects with “Add from Library”.' } },
    { id: 'competitor-group', page: 'marking-days',
      fr: { term: 'Competitor Group', aliases: ['groupe de compétiteurs'], def: 'Groupe de compétiteurs notés le même jour pour un sous-critère (option « Per Competitor Group »).' },
      en: { term: 'Competitor Group', aliases: [], def: 'A group of competitors marked on the same day for a sub-criterion (“Per Competitor Group” option).' } },
    { id: 'variance', page: 'wsos',
      fr: { term: 'Variance WSOS', aliases: ['variance'], def: 'Écart entre la répartition des points voulue par les WSOS et celle du barème. L’objectif est une variance proche de 0 %.' },
      en: { term: 'WSOS variance', aliases: ['variance'], def: 'Difference between the mark distribution required by the WSOS and the one in the marking scheme. The goal is a variance close to 0%.' } },
    { id: 'max-mark', page: 'excel-marking-scheme',
      fr: { term: 'Max Mark', aliases: [], def: 'Note maximale d’un aspect. La somme des Max Mark de tous les aspects doit faire 100.' },
      en: { term: 'Max Mark', aliases: [], def: 'Maximum mark of an aspect. The Max Marks of all aspects must add up to 100.' } },
    { id: 'draft', page: 'lock-marking-scheme',
      fr: { term: 'Draft', aliases: [], def: 'Filigrane « Draft » imprimé sur les feuilles de notation tant que le barème n’est pas verrouillé.' },
      en: { term: 'Draft', aliases: [], def: '“Draft” watermark printed on marking forms as long as the marking scheme is not locked.' } }
  ].forEach(function (g) { S.glossary.push(g); });

  // Les anciennes pages de version passent en fin de « Prise en main »
  S.pages.forEach(function (p) {
    if (p.id === 'cis-505') { p.order = 8; }
    if (p.id === 'cis-412') { p.order = 9; }
  });
})(window.WIKI_SEED);
