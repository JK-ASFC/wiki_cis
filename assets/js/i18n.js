/*
 * CIS Wiki — textes de l'interface en français et en anglais.
 * Une valeur peut être un objet { one, other } pour gérer le pluriel (variable n).
 * Les variables s'écrivent {nom}.
 */
(function (global) {
  'use strict';

  var D = {
    fr: {
      'a11y.skip': 'Aller au contenu',
      'brand.sub': 'WorldSkills France',
      'brand.name': 'Wiki CIS', 'brand.tagline': 'Le guide de la notation',
      'nav.guide': 'Guide pas à pas',
      'feedback.open': 'Votre avis', 'feedback.missing': 'Une information manque ou est fausse ?', 'feedback.report': 'Signalez-le',
      'home.kicker': 'WorldSkills France · Wiki du CIS',
      'home.welcome': 'Bienvenue sur le wiki du CIS',
      'home.welcomeLead': 'Ici, vous apprenez à utiliser le CIS, le logiciel de notation des compétitions WorldSkills : préparer votre barème, ajouter les calculs, organiser les jurés et saisir les notes. Tout est expliqué simplement, avec des captures du vrai logiciel.',
      'home.startGuide': 'Lancer le guide pas à pas', 'home.readDocs': 'Découvrir le CIS en 5 minutes',
      'home.whatTitle': 'Le CIS, c’est quoi ?', 'home.whatText': 'Le **Competition Information System** est le site web où l’on prépare le **barème sur 100 points** de votre métier (**2 points maximum par aspect**), puis où l’on **saisit les notes** des compétiteurs. Il calcule les totaux et les résultats.',
      'home.whoTitle': 'Pour qui ?', 'home.whoText': 'Pour les **Experts** qui préparent le barème, les **jurés** qui notent et les **Team Leaders** qui vérifient. Aucune connaissance informatique n’est nécessaire pour suivre ce wiki.',
      'home.howTitle': 'Par où commencer ?', 'home.howText': 'Débutant : lancez le **guide pas à pas**, il vous montre chaque clic. Vous connaissez déjà le CIS : utilisez la **recherche** (Ctrl + K) ou les rubriques ci-dessous.',
      'home.guideTitle': 'Le guide pas à pas : du fichier Excel au barème verrouillé',
      'home.guideText': '54 étapes illustrées, avec des flèches sur les vraies captures du CIS. Le guide se souvient de l’endroit où vous vous êtes arrêté.',
      'home.help': 'Une question, un blocage ? Consultez **Messages du CIS expliqués** dans la rubrique Aide, ou écrivez à [cis@cofom.org](mailto:cis@cofom.org).',
      'article.updatedOn': 'Mis à jour le {date}',
      'footer.note': 'Wiki du Competition Information System',
      'tour.title': 'Guide pas à pas', 'tour.lead': 'Du fichier Excel au barème verrouillé, en suivant les flèches.',
      'tour.prev': 'Précédent', 'tour.next': 'Suivant', 'tour.finish': 'Terminer', 'tour.restart': 'Recommencer', 'tour.step': 'Étape {n} sur {total}',
      'tour.chapters': 'Chapitres', 'tour.tip': 'Astuce', 'tour.keys': 'Astuce : utilisez les flèches ← → du clavier.', 'tour.zoom': 'Afficher toute la capture', 'tour.done': 'Bravo, vous avez terminé le guide !',
      'tour.doneText': 'Vous savez maintenant préparer, importer, vérifier et faire verrouiller un barème. Pour aller plus loin : les pages sur les méthodes de calcul et la saisie des notes.',
      'common.close': 'Fermer', 'common.cancel': 'Annuler',

      'nav.home': 'Accueil', 'nav.guides': 'Guides', 'nav.signoff': 'Signatures', 'nav.videos': 'Vidéos',
      'nav.glossary': 'Glossaire', 'nav.admin': 'Administration', 'nav.menu': 'Menu', 'nav.main': 'Navigation principale',
      'nav.docs': 'Documentation', 'nav.breadcrumb': 'Fil d’Ariane',

      'search.title': 'Recherche', 'search.placeholder': 'Rechercher…', 'search.button': 'Rechercher',
      'search.hero': 'Rechercher : Ranged Score, import, saisie des notes…',
      'search.count': { one: '{n} résultat pour « {q} »', other: '{n} résultats pour « {q} »' },
      'search.none': 'Aucun résultat pour « {q} »', 'search.noneHint': 'Essayez un autre mot-clé, en français ou en anglais, ou parcourez le glossaire.',
      'search.empty': 'Saisissez un mot-clé pour lancer la recherche.', 'search.all': 'Tout', 'search.filter': 'Filtrer par catégorie',
      'search.inWiki': 'Rechercher « {q} » dans tout le wiki', 'search.results': 'Résultats', 'search.popular': 'Populaire',
      'palette.hint': '↑ ↓ pour naviguer · Entrée pour ouvrir · Échap pour fermer',

      'mode.label': 'Niveau d’affichage', 'mode.guided': 'Guidé', 'mode.expert': 'Expert',
      'mode.guidedHint': 'Mode guidé : explications détaillées, captures d’écran et vocabulaire expliqué.',
      'mode.expertHint': 'Mode expert : aide-mémoire, chemins de menus et captures repliées.',
      'mode.current': 'Mode {mode}', 'mode.switchTo': 'Passer en mode {mode}',
      'lang.label': 'Langue',
      'theme.label': 'Thème', 'theme.light': 'clair', 'theme.dark': 'sombre', 'theme.system': 'automatique',

      'level.beginner': 'Débutant', 'level.intermediate': 'Intermédiaire', 'level.advanced': 'Avancé', 'level.all': 'Tous les niveaux',
      'phase.before': 'Avant', 'phase.during': 'Pendant', 'phase.after': 'Après',

      'home.eyebrow': 'Documentation du CIS',
      'home.title': 'Préparer, noter et clôturer une compétition, pas à pas.',
      'home.lead': 'Le wiki du Competition Information System de WorldSkills France : guides, vidéos et aide-mémoire, en français et en anglais.',
      'home.popular': 'Populaire :',
      'home.pathGuidedTitle': 'Je découvre le CIS', 'home.pathGuidedText': 'Un parcours guidé en 8 étapes, avec explications, captures d’écran et vocabulaire.', 'home.pathGuidedCta': 'Commencer le parcours',
      'home.pathExpertTitle': 'Je connais déjà le CIS', 'home.pathExpertText': 'Aide-mémoire, chemins de menus, raccourcis et règles de calcul, sans détour.', 'home.pathExpertCta': 'Accès rapide',
      'home.workflowTitle': 'Le parcours de notation', 'home.workflowLead': 'Huit étapes, de la préparation du barème jusqu’aux résultats.',
      'home.signoffTitle': 'Signatures CNAT 48', 'home.signoffLead': 'Les étapes à valider chaque jour dans l’outil de signature.',
      'home.quickTitle': 'Aide-mémoire', 'home.quickLead': 'L’essentiel de chaque étape, en un coup d’œil.',
      'home.categoriesTitle': 'Toute la documentation', 'home.videosTitle': 'Vidéos', 'home.videosLead': 'Des tutoriels courts pour chaque étape (en français).',
      'home.updatesTitle': 'Dernières mises à jour', 'home.seeAll': 'Tout voir', 'home.step': 'Étape {n}', 'home.readGuide': 'Lire le guide',

      'cat.pages': { one: '{n} page', other: '{n} pages' }, 'cat.empty': 'Aucune page dans cette catégorie pour le moment.',
      'cat.filterLevel': 'Filtrer par niveau', 'cat.frOnly': 'En français uniquement',

      'article.notFound': 'Page introuvable', 'article.notFoundText': 'Cette page n’existe pas, a été déplacée ou n’est pas encore publiée.',
      'article.backHome': 'Retour à l’accueil',
      'article.fallback': 'Cette page n’est pas encore disponible en français.',
      'article.draft': 'Brouillon : cette page n’est visible que par les personnes connectées à l’administration.',
      'article.readTime': '{n} min de lecture', 'article.updated': 'Mis à jour le {date} par {user}',
      'article.history': { one: 'Historique ({n} version)', other: 'Historique ({n} versions)' },
      'article.edit': 'Modifier', 'article.watchVideo': 'Voir la vidéo', 'article.inCis': 'Dans le CIS :',
      'article.before': 'Avant de commencer', 'article.prereq': 'À lire d’abord', 'article.learn': 'Vous allez apprendre',
      'article.cheat': 'Aide-mémoire', 'article.toc': 'Sur cette page', 'article.prev': 'Précédent', 'article.next': 'Suivant',
      'article.nextStep': 'Étape suivante', 'article.stepOf': 'Étape {n} sur {total}', 'article.pager': 'Pages de la même catégorie',
      'article.feedback': 'Cette page vous a-t-elle été utile ?', 'article.yes': 'Oui', 'article.no': 'Non', 'article.thanks': 'Merci pour votre retour !',
      'article.historyTitle': 'Historique des modifications', 'article.legacy': 'Voir la version sur l’ancien wiki (DokuWiki)',
      'article.historyHint': 'Les comparaisons et restaurations de versions se font depuis l’administration.',
      'article.print': 'Imprimer', 'article.copyLink': 'Copier le lien', 'article.linkCopied': 'Lien copié dans le presse-papiers',

      'glossary.title': 'Glossaire', 'glossary.lead': 'Le vocabulaire du CIS et des compétitions, en français et en anglais.',
      'glossary.filter': 'Filtrer les termes…', 'glossary.see': 'Voir la page', 'glossary.none': 'Aucun terme ne correspond.',
      'glossary.more': 'Ouvrir le glossaire', 'glossary.letters': 'Index alphabétique',
      'glossary.count': { one: '{n} terme', other: '{n} termes' },

      'md.note': 'Remarque', 'md.tip': 'Astuce', 'md.warning': 'Attention', 'md.important': 'Important', 'md.details': 'Détails',
      'md.guided': 'Pour bien démarrer', 'md.expert': 'Pour les experts', 'md.screenshot': 'Capture d’écran',
      'md.zoom': 'Agrandir l’image', 'md.anchor': 'Lien vers cette section', 'md.simulator': 'Simulateur interactif (JavaScript requis)',

      'footer.about': 'Le wiki du Competition Information System (CIS) de WorldSkills France : guides de notation, méthodes de calcul et vidéos, expliqués simplement.',
      'footer.links': 'Liens utiles', 'footer.cis': 'Accéder au CIS', 'footer.signoffTool': 'Outil de signature', 'footer.contact': 'Contact',
      'footer.wiki': 'Le wiki', 'footer.overview': 'Vue d’ensemble du projet', 'footer.legacyWiki': 'Ancien wiki (DokuWiki)',
      'footer.prototype': 'Prototype : les modifications faites dans l’administration sont enregistrées dans ce navigateur uniquement.',

      'role.admin': 'Administration', 'role.editor': 'Rédaction', 'role.translator': 'Traduction',
      'role.adminDesc': 'Tous les droits : pages, catégories, glossaire, utilisateurs, paramètres et suppression définitive.',
      'role.editorDesc': 'Crée, modifie, publie et met à la corbeille les pages ; gère le glossaire.',
      'role.translatorDesc': 'Modifie le texte des pages (titre, résumé, contenu) sans changer leur classement ni les publier.',

      /* ---- Administration ---- */
      'adm.title': 'Administration', 'adm.viewSite': 'Voir le site', 'adm.logout': 'Se déconnecter', 'adm.backToSite': 'Retour au site',
      'adm.proto': 'Prototype', 'adm.protoHint': 'Les données sont enregistrées dans ce navigateur (localStorage). Exportez-les depuis Paramètres.',
      'adm.seedOutdated': 'Une version plus récente du contenu de démonstration est disponible.',
      'adm.forbidden': 'Accès refusé', 'adm.forbiddenText': 'Votre rôle ne permet pas d’accéder à cette section.',
      'adm.saved': 'Modifications enregistrées', 'adm.seeAll': 'Tout voir', 'adm.undo': 'Annuler',

      'adm.login.title': 'Connexion à l’administration',
      'adm.login.lead': 'Choisissez un compte pour tester l’administration : chaque modification est signée par son auteur.',
      'adm.login.user': 'Compte', 'adm.login.submit': 'Se connecter',
      'adm.login.demo': 'Prototype : aucun mot de passe n’est demandé. En production, la connexion passera par de vrais identifiants.',

      'adm.nav.dashboard': 'Tableau de bord', 'adm.nav.pages': 'Pages', 'adm.nav.categories': 'Catégories', 'adm.nav.glossary': 'Glossaire',
      'adm.nav.users': 'Utilisateurs', 'adm.nav.activity': 'Activité', 'adm.nav.trash': 'Corbeille', 'adm.nav.settings': 'Paramètres',

      'adm.dash.hello': 'Bonjour, {name}', 'adm.dash.lead': 'Voici l’état du wiki et ce qui a changé récemment.',
      'adm.dash.published': 'Pages publiées', 'adm.dash.drafts': 'Brouillons', 'adm.dash.missingEn': 'Traductions EN manquantes', 'adm.dash.contributors': 'Contributeurs',
      'adm.dash.activity': 'Activité récente', 'adm.dash.todo': 'À faire', 'adm.dash.todoNone': 'Rien à signaler : tout est publié et traduit.',
      'adm.dash.todoDraft': 'Publier « {title} »', 'adm.dash.todoTranslate': 'Traduire « {title} » en anglais',
      'adm.dash.todoFeedback': { one: '« {title} » : {n} avis négatif', other: '« {title} » : {n} avis négatifs' },
      'adm.dash.byCategory': 'Contenu par catégorie', 'adm.dash.enCoverage': 'Traduction EN',

      'adm.log.create': '{user} a créé {type} {target}', 'adm.log.update': '{user} a modifié {type} {target}',
      'adm.log.delete': '{user} a mis à la corbeille {type} {target}', 'adm.log.restore': '{user} a restauré {type} {target}',
      'adm.log.purge': '{user} a supprimé définitivement {type} {target}', 'adm.log.import': '{user} a importé {type} {target}',
      'adm.type.page': 'la page', 'adm.type.category': 'la catégorie', 'adm.type.glossary': 'le terme', 'adm.type.user': 'l’utilisateur', 'adm.type.settings': 'les paramètres',

      'adm.act.view': 'Voir', 'adm.act.edit': 'Modifier', 'adm.act.history': 'Historique', 'adm.act.delete': 'Supprimer',
      'adm.col.page': 'Page', 'adm.col.category': 'Catégorie', 'adm.col.level': 'Niveau', 'adm.col.status': 'Statut', 'adm.col.author': 'Auteur',
      'adm.col.updated': 'Dernière modification', 'adm.col.actions': 'Actions', 'adm.col.translation': 'Traduction',
      'adm.status.published': 'Publié', 'adm.status.draft': 'Brouillon', 'adm.status.deleted': 'Corbeille',

      'adm.pages.lead': 'Créez, modifiez et publiez les pages du wiki en français et en anglais.', 'adm.pages.new': 'Nouvelle page',
      'adm.pages.search': 'Rechercher une page (titre, identifiant, mot-clé)…', 'adm.pages.allCats': 'Toutes les catégories',
      'adm.pages.allStatus': 'Tous les statuts', 'adm.pages.allTr': 'Toutes les traductions', 'adm.pages.trMissing': 'Traduction EN manquante', 'adm.pages.trDone': 'Traduite en anglais',
      'adm.pages.sort': 'Trier', 'adm.pages.sortUpdated': 'Plus récentes d’abord', 'adm.pages.sortTitle': 'Titre (A → Z)', 'adm.pages.sortCategory': 'Ordre du wiki',
      'adm.pages.noEn': 'pas encore traduite', 'adm.pages.none': 'Aucune page ne correspond à ces filtres.',
      'adm.pages.count': '{n} page(s) affichée(s) sur {total}',

      'adm.trash.confirmTitle': 'Mettre à la corbeille', 'adm.trash.confirmText': 'La page {title} sera retirée du site. Vous pourrez la restaurer depuis la corbeille.',
      'adm.trash.confirmBtn': 'Mettre à la corbeille', 'adm.trash.done': '« {title} » est dans la corbeille', 'adm.trash.restored': 'Page restaurée',
      'adm.trash.lead': 'Les pages supprimées restent ici, avec tout leur historique, jusqu’à leur suppression définitive.',
      'adm.trash.deletedBy': 'Supprimée par', 'adm.trash.restore': 'Restaurer', 'adm.trash.purge': 'Supprimer définitivement', 'adm.trash.purgeBtn': 'Supprimer définitivement',
      'adm.trash.purgeConfirm': 'La page {title} et ses {n} révisions seront effacées. Cette action est irréversible.',
      'adm.trash.purged': 'Page supprimée définitivement', 'adm.trash.empty': 'La corbeille est vide.',
      'adm.trash.purgeAdmin': 'Seul un compte Administration peut supprimer définitivement une page.',

      'adm.editor.newTitle': 'Nouvelle page', 'adm.editor.editTitle': 'Modifier « {title} »', 'adm.editor.newLead': 'Rédigez d’abord la version française ; la version anglaise peut être ajoutée ensuite.',
      'adm.editor.save': 'Enregistrer', 'adm.editor.copyFr': 'Partir de la version française', 'adm.editor.copied': 'Contenu français copié : traduisez-le directement.',
      'adm.editor.copyConfirm': 'Le contenu anglais actuel sera remplacé par la version française. Continuer ?',
      'adm.editor.title': 'Titre', 'adm.editor.short': 'Titre court', 'adm.editor.shortHelp': 'Utilisé dans les menus et le parcours.',
      'adm.editor.slug': 'Identifiant', 'adm.editor.slugHelp': 'Utilisé dans l’adresse de la page : minuscules, chiffres et tirets.', 'adm.editor.slugLocked': 'L’identifiant ne change plus après la création (les liens restent valides).',
      'adm.editor.summary': 'Résumé', 'adm.editor.summaryHelp': 'Une ou deux phrases, affichées sous le titre et dans la recherche.',
      'adm.editor.body': 'Contenu', 'adm.editor.viewMode': 'Affichage de l’éditeur', 'adm.editor.write': 'Écrire', 'adm.editor.split': 'Côte à côte', 'adm.editor.preview': 'Aperçu',
      'adm.editor.toolbar': 'Mise en forme', 'adm.editor.syntax': 'Aide sur la syntaxe', 'adm.editor.emptyPreview': 'L’aperçu s’affichera ici.',
      'adm.editor.quick': 'Aide-mémoire (mode Expert)', 'adm.editor.quickHelp': 'Une étape par ligne. Le gras, l’italique et les liens sont acceptés.',
      'adm.editor.objectives': 'Objectifs (mode Guidé)', 'adm.editor.objectivesHelp': 'Un objectif par ligne, affiché dans « Avant de commencer ».',
      'adm.editor.publication': 'Publication', 'adm.editor.note': 'Note de révision', 'adm.editor.notePh': 'Ex. : mise à jour des captures',
      'adm.editor.noteHelp': 'Résume votre modification ; elle apparaît dans l’historique.', 'adm.editor.unsaved': 'Modifications non enregistrées',
      'adm.editor.classification': 'Classement', 'adm.editor.metaLocked': 'Votre rôle permet de modifier le texte, pas le classement.',
      'adm.editor.order': 'Ordre', 'adm.editor.step': 'Étape du parcours', 'adm.editor.noStep': 'Aucune',
      'adm.editor.menuPath': 'Chemin dans le CIS', 'adm.editor.menuPathHelp': 'Menus à suivre, séparés par « › ».',
      'adm.editor.video': 'Vidéo associée', 'adm.editor.noVideo': 'Aucune', 'adm.editor.tags': 'Mots-clés', 'adm.editor.tagsHelp': 'Séparés par des virgules ; améliorent la recherche.',
      'adm.editor.prereq': 'Prérequis', 'adm.editor.prereqHelp': 'Pages proposées dans « Avant de commencer ».',
      'adm.editor.info': 'Informations', 'adm.editor.createdBy': 'Créée par', 'adm.editor.updatedBy': 'Dernière modification', 'adm.editor.revisions': 'Révisions',
      'adm.editor.revCount': { one: '{n} révision', other: '{n} révisions' }, 'adm.editor.source': 'Page d’origine',
      'adm.editor.danger': 'Zone sensible', 'adm.editor.dangerHelp': 'La page sera retirée du site et placée dans la corbeille.',
      'adm.editor.langOk': 'Langue complète', 'adm.editor.langMissing': 'Langue incomplète (titre ou contenu manquant)',
      'adm.editor.saved': 'Enregistré (révision {n})', 'adm.editor.enIncomplete': 'version anglaise incomplète : la page s’affichera en français',
      'adm.editor.autoNote': 'Modification', 'adm.editor.autoNoteNew': 'Création de la page',
      'adm.editor.leave': 'Des modifications ne sont pas enregistrées. Quitter quand même ?',
      'adm.editor.pickPage': 'Page à lier', 'adm.editor.insert': 'Insérer',

      'tb.h2': 'Titre de section', 'tb.h3': 'Sous-titre', 'tb.bold': 'Gras (Ctrl+B)', 'tb.italic': 'Italique (Ctrl+I)', 'tb.kbd': 'Touche du clavier',
      'tb.ul': 'Liste à puces', 'tb.ol': 'Liste numérotée', 'tb.table': 'Tableau', 'tb.link': 'Lien externe', 'tb.wikilink': 'Lien vers une page du wiki',
      'tb.image': 'Image / capture d’écran', 'tb.video': 'Vidéo', 'tb.note': 'Encadré « Remarque »', 'tb.tip': 'Encadré « Astuce »', 'tb.warning': 'Encadré « Attention »',
      'tb.guided': 'Bloc visible en mode Guidé', 'tb.expert': 'Bloc visible en mode Expert',
      'tb.linkText': 'texte du lien', 'tb.calloutText': 'Votre texte', 'tb.modeText': 'Contenu réservé à ce mode',

      'adm.media.path': 'Fichier', 'adm.media.pathHelp': '« media: » pointe vers la bibliothèque {base} ; une adresse https:// complète est aussi acceptée.',
      'adm.media.caption': 'Légende', 'adm.media.captionHelp': 'Décrit l’image pour les lecteurs d’écran et s’affiche dessous.',

      'adm.syn.h2': 'Titre de section (### pour un sous-titre)', 'adm.syn.emph': 'Gras et italique', 'adm.syn.list': 'Listes à puces ou numérotées (indenter pour imbriquer)',
      'adm.syn.link': 'Lien externe', 'adm.syn.wikilink': 'Lien vers une page du wiki', 'adm.syn.image': 'Image ; plusieurs lignes d’images forment une galerie',
      'adm.syn.video': 'Vidéo', 'adm.syn.kbd': 'Touche du clavier', 'adm.syn.callout': 'Encadré (ligne suivante commençant par >)', 'adm.syn.table': 'Tableau',
      'adm.syn.guided': 'Visible uniquement en mode Guidé', 'adm.syn.expert': 'Visible uniquement en mode Expert',

      'adm.err.title': 'Le titre français est obligatoire.', 'adm.err.slug': 'Identifiant invalide : 2 à 61 caractères, minuscules, chiffres et tirets.',
      'adm.err.slugTaken': 'Cet identifiant est déjà utilisé.', 'adm.err.form': 'Vérifiez les champs signalés.', 'adm.err.required': 'Ce champ est obligatoire.',
      'adm.err.caption': 'Ajoutez une légende (accessibilité).', 'adm.err.url': 'L’adresse doit commencer par http:// ou https://.',
      'adm.err.login': 'Identifiant invalide : minuscules, chiffres, points, tirets.',

      'adm.history.title': 'Historique des révisions', 'adm.history.back': 'Retour à l’éditeur', 'adm.history.rev': 'Révision {n}', 'adm.history.current': 'Version actuelle',
      'adm.history.view': 'Voir', 'adm.history.compare': 'Comparer', 'adm.history.restore': 'Restaurer', 'adm.history.legacy': 'Voir sur DokuWiki',
      'adm.history.noSnapshot': 'Contenu non conservé', 'adm.history.pick': 'Choisissez « Comparer » sur une révision pour voir ce qui a changé depuis.',
      'adm.history.diffTitle': 'Révision {a} → version actuelle ({b})', 'adm.history.diffHint': 'lignes ajoutées / retirées',
      'adm.history.identical': 'Aucune différence dans cette langue.', 'adm.history.same': '… {n} lignes identiques …',
      'adm.history.restoreConfirm': 'Le contenu de la révision {n} deviendra la version actuelle. Une nouvelle révision sera créée : rien n’est perdu.',
      'adm.history.restoredNote': 'Restauration de la révision {n}', 'adm.history.restored': 'Révision {n} restaurée (nouvelle révision {m})',

      'adm.cat.lead': 'Les catégories organisent le menu et l’accueil du wiki.', 'adm.cat.new': 'Nouvelle catégorie', 'adm.cat.edit': 'Modifier la catégorie',
      'adm.cat.name': 'Nom', 'adm.cat.desc': 'Description', 'adm.cat.icon': 'Icône', 'adm.cat.color': 'Couleur',
      'adm.cat.notEmpty': 'Déplacez ou supprimez d’abord les pages de cette catégorie.', 'adm.cat.confirmDelete': 'La catégorie {name} sera supprimée.',
      'adm.color.blue': 'Bleu', 'adm.color.indigo': 'Indigo', 'adm.color.teal': 'Sarcelle', 'adm.color.rose': 'Rose', 'adm.color.amber': 'Ambre', 'adm.color.green': 'Vert',

      'adm.gl.lead': 'Les termes du glossaire sont expliqués au survol dans les pages, en mode Guidé.', 'adm.gl.new': 'Nouveau terme', 'adm.gl.edit': 'Modifier le terme',
      'adm.gl.term': 'Terme', 'adm.gl.aliases': 'Variantes', 'adm.gl.def': 'Définition', 'adm.gl.page': 'Page liée',
      'adm.gl.aliasesHelp': 'Variantes séparées par des virgules (pluriel, synonyme) : elles sont aussi reconnues dans les pages.',
      'adm.gl.confirmDelete': 'Le terme {term} sera supprimé du glossaire.', 'adm.gl.deleted': 'Terme supprimé',

      'adm.users.lead': 'Les comptes qui peuvent modifier le wiki. Chaque révision garde le nom de son auteur.', 'adm.users.new': 'Nouvel utilisateur', 'adm.users.edit': 'Modifier l’utilisateur',
      'adm.users.user': 'Utilisateur', 'adm.users.role': 'Rôle', 'adm.users.created': 'Pages créées', 'adm.users.revs': 'Révisions', 'adm.users.last': 'Dernière contribution',
      'adm.users.you': 'vous', 'adm.users.system': 'compte système', 'adm.users.roles': 'Rôles et droits',
      'adm.users.name': 'Nom affiché', 'adm.users.login': 'Identifiant', 'adm.users.loginHelp': 'Minuscules, chiffres, points ou tirets. Ne peut plus être changé ensuite.',
      'adm.users.selfRole': 'Vous ne pouvez pas changer votre propre rôle.', 'adm.users.confirmDelete': 'Le compte {name} sera supprimé. Ses révisions restent signées de son nom.',
      'adm.users.authHint': 'En production : authentification réelle (identifiants ou SSO), mots de passe chiffrés et journal des connexions.',

      'adm.activity.lead': 'Le journal de toutes les modifications : qui, quoi, quand.', 'adm.activity.allUsers': 'Tous les utilisateurs', 'adm.activity.allTypes': 'Tous les types',
      'adm.activity.type': 'Type', 'adm.activity.none': 'Aucune activité pour ces filtres.',

      'adm.set.lead': 'Réglages du wiki et gestion des données du prototype.', 'adm.set.general': 'Général',
      'adm.set.media': 'Bibliothèque de médias', 'adm.set.mediaHelp': 'Adresse utilisée pour les chemins « media: » (images, vidéos, fichiers).',
      'adm.set.contact': 'E-mail de contact', 'adm.set.data': 'Données',
      'adm.set.dataLead': 'Le contenu modifié est enregistré dans ce navigateur ({kb} Ko).',
      'adm.set.export': 'Exporter (JSON)', 'adm.set.import': 'Importer un export JSON', 'adm.set.reset': 'Réinitialiser le contenu de démonstration',
      'adm.set.dataHint': 'Exportez le JSON pour partager vos modifications ou les intégrer au dépôt (data/content.js).',
      'adm.set.exported': 'Export téléchargé', 'adm.set.importConfirm': 'Le contenu actuel sera remplacé par l’import ({n} pages).',
      'adm.set.imported': 'Import terminé', 'adm.set.importBad': 'Fichier invalide : ce n’est pas un export du CIS Wiki.',
      'adm.set.resetConfirm': 'Toutes les modifications faites dans ce navigateur seront perdues et le contenu d’origine rechargé.',
      'adm.set.resetDone': 'Contenu de démonstration rechargé'
    },

    en: {
      'a11y.skip': 'Skip to content',
      'brand.sub': 'WorldSkills France',
      'brand.name': 'CIS Wiki', 'brand.tagline': 'The marking guide',
      'nav.guide': 'Step-by-step guide',
      'feedback.open': 'Your feedback', 'feedback.missing': 'Something missing or wrong?', 'feedback.report': 'Tell us',
      'home.kicker': 'WorldSkills France · CIS Wiki',
      'home.welcome': 'Welcome to the CIS wiki',
      'home.welcomeLead': 'Here you learn to use the CIS, the marking software of WorldSkills competitions: prepare your marking scheme, add calculations, organise jurors and enter marks. Everything is explained simply, with screenshots of the real software.',
      'home.startGuide': 'Start the step-by-step guide', 'home.readDocs': 'Discover the CIS in 5 minutes',
      'home.whatTitle': 'What is the CIS?', 'home.whatText': 'The **Competition Information System** is the website where your skill’s **100-mark marking scheme** (**2 marks at most per aspect**) is prepared and where competitors’ **marks are entered**. It calculates totals and results.',
      'home.whoTitle': 'Who is it for?', 'home.whoText': 'For **Experts** who prepare the marking scheme, **jurors** who mark and **Team Leaders** who check. No IT knowledge is needed to follow this wiki.',
      'home.howTitle': 'Where to start?', 'home.howText': 'Beginner: start the **step-by-step guide**, it shows every click. Already know the CIS: use **search** (Ctrl + K) or the sections below.',
      'home.guideTitle': 'The step-by-step guide: from the Excel file to the locked marking scheme',
      'home.guideText': '54 illustrated steps, with arrows on real CIS screenshots. The guide remembers where you stopped.',
      'home.help': 'A question, stuck? See **CIS messages explained** in the Help section, or write to [cis@cofom.org](mailto:cis@cofom.org).',
      'article.updatedOn': 'Updated on {date}',
      'footer.note': 'Competition Information System wiki',
      'tour.title': 'Step-by-step guide', 'tour.lead': 'From the Excel file to the locked marking scheme, following the arrows.',
      'tour.prev': 'Previous', 'tour.next': 'Next', 'tour.finish': 'Finish', 'tour.restart': 'Start again', 'tour.step': 'Step {n} of {total}',
      'tour.chapters': 'Chapters', 'tour.tip': 'Tip', 'tour.keys': 'Tip: use the ← → keys on your keyboard.', 'tour.zoom': 'Show the whole screenshot', 'tour.done': 'Well done, you finished the guide!',
      'tour.doneText': 'You now know how to prepare, import, check and get a marking scheme locked. To go further: the pages on calculation methods and mark entry.',
      'common.close': 'Close', 'common.cancel': 'Cancel',

      'nav.home': 'Home', 'nav.guides': 'Guides', 'nav.signoff': 'Sign-off', 'nav.videos': 'Videos',
      'nav.glossary': 'Glossary', 'nav.admin': 'Administration', 'nav.menu': 'Menu', 'nav.main': 'Main navigation',
      'nav.docs': 'Documentation', 'nav.breadcrumb': 'Breadcrumb',

      'search.title': 'Search', 'search.placeholder': 'Search…', 'search.button': 'Search',
      'search.hero': 'Search: Ranged Score, import, mark entry…',
      'search.count': { one: '{n} result for "{q}"', other: '{n} results for "{q}"' },
      'search.none': 'No results for "{q}"', 'search.noneHint': 'Try another keyword, in English or French, or browse the glossary.',
      'search.empty': 'Type a keyword to start searching.', 'search.all': 'All', 'search.filter': 'Filter by category',
      'search.inWiki': 'Search the whole wiki for "{q}"', 'search.results': 'Results', 'search.popular': 'Popular',
      'palette.hint': '↑ ↓ to move · Enter to open · Esc to close',

      'mode.label': 'Display level', 'mode.guided': 'Guided', 'mode.expert': 'Expert',
      'mode.guidedHint': 'Guided mode: detailed explanations, screenshots and explained vocabulary.',
      'mode.expertHint': 'Expert mode: cheat sheets, menu paths and collapsed screenshots.',
      'mode.current': '{mode} mode', 'mode.switchTo': 'Switch to {mode} mode',
      'lang.label': 'Language',
      'theme.label': 'Theme', 'theme.light': 'light', 'theme.dark': 'dark', 'theme.system': 'automatic',

      'level.beginner': 'Beginner', 'level.intermediate': 'Intermediate', 'level.advanced': 'Advanced', 'level.all': 'All levels',
      'phase.before': 'Before', 'phase.during': 'During', 'phase.after': 'After',

      'home.eyebrow': 'CIS documentation',
      'home.title': 'Prepare, mark and close a competition, step by step.',
      'home.lead': 'The WorldSkills France Competition Information System wiki: guides, videos and cheat sheets, in English and French.',
      'home.popular': 'Popular:',
      'home.pathGuidedTitle': 'I’m new to the CIS', 'home.pathGuidedText': 'A guided path in 8 steps, with explanations, screenshots and vocabulary.', 'home.pathGuidedCta': 'Start the path',
      'home.pathExpertTitle': 'I already know the CIS', 'home.pathExpertText': 'Cheat sheets, menu paths, shortcuts and calculation rules, straight to the point.', 'home.pathExpertCta': 'Quick access',
      'home.workflowTitle': 'The marking path', 'home.workflowLead': 'Eight steps, from preparing the marking scheme to the results.',
      'home.signoffTitle': 'CNAT 48 sign-off', 'home.signoffLead': 'The steps to approve each day in the sign-off tool.',
      'home.quickTitle': 'Cheat sheets', 'home.quickLead': 'The essentials of each step, at a glance.',
      'home.categoriesTitle': 'All documentation', 'home.videosTitle': 'Videos', 'home.videosLead': 'Short tutorials for each step (in French).',
      'home.updatesTitle': 'Latest updates', 'home.seeAll': 'See all', 'home.step': 'Step {n}', 'home.readGuide': 'Read the guide',

      'cat.pages': { one: '{n} page', other: '{n} pages' }, 'cat.empty': 'No pages in this category yet.',
      'cat.filterLevel': 'Filter by level', 'cat.frOnly': 'French only',

      'article.notFound': 'Page not found', 'article.notFoundText': 'This page doesn’t exist, has moved or isn’t published yet.',
      'article.backHome': 'Back to home',
      'article.fallback': 'This page hasn’t been translated into English yet, so it is shown in French.',
      'article.draft': 'Draft: this page is only visible to people signed in to the administration.',
      'article.readTime': '{n} min read', 'article.updated': 'Updated on {date} by {user}',
      'article.history': { one: 'History ({n} version)', other: 'History ({n} versions)' },
      'article.edit': 'Edit', 'article.watchVideo': 'Watch the video', 'article.inCis': 'In the CIS:',
      'article.before': 'Before you start', 'article.prereq': 'Read first', 'article.learn': 'You will learn',
      'article.cheat': 'Cheat sheet', 'article.toc': 'On this page', 'article.prev': 'Previous', 'article.next': 'Next',
      'article.nextStep': 'Next step', 'article.stepOf': 'Step {n} of {total}', 'article.pager': 'Pages in the same category',
      'article.feedback': 'Was this page helpful?', 'article.yes': 'Yes', 'article.no': 'No', 'article.thanks': 'Thanks for your feedback!',
      'article.historyTitle': 'Change history', 'article.legacy': 'See the version on the old wiki (DokuWiki)',
      'article.historyHint': 'Version comparison and restore are available in the administration.',
      'article.print': 'Print', 'article.copyLink': 'Copy link', 'article.linkCopied': 'Link copied to clipboard',

      'glossary.title': 'Glossary', 'glossary.lead': 'CIS and competition vocabulary, in English and French.',
      'glossary.filter': 'Filter terms…', 'glossary.see': 'See page', 'glossary.none': 'No matching term.',
      'glossary.more': 'Open the glossary', 'glossary.letters': 'Alphabetical index',
      'glossary.count': { one: '{n} term', other: '{n} terms' },

      'md.note': 'Note', 'md.tip': 'Tip', 'md.warning': 'Warning', 'md.important': 'Important', 'md.details': 'Details',
      'md.guided': 'Getting started', 'md.expert': 'For experts', 'md.screenshot': 'Screenshot',
      'md.zoom': 'Enlarge image', 'md.anchor': 'Link to this section', 'md.simulator': 'Interactive simulator (requires JavaScript)',

      'footer.about': 'The WorldSkills France Competition Information System (CIS) wiki: marking guides, calculation methods and videos, explained simply.',
      'footer.links': 'Useful links', 'footer.cis': 'Open the CIS', 'footer.signoffTool': 'Sign-off tool', 'footer.contact': 'Contact',
      'footer.wiki': 'The wiki', 'footer.overview': 'Project overview (FR)', 'footer.legacyWiki': 'Old wiki (DokuWiki)',
      'footer.prototype': 'Prototype: changes made in the administration are saved in this browser only.',

      'role.admin': 'Administrator', 'role.editor': 'Editor', 'role.translator': 'Translator',
      'role.adminDesc': 'Full rights: pages, categories, glossary, users, settings and permanent deletion.',
      'role.editorDesc': 'Creates, edits, publishes and trashes pages; manages the glossary.',
      'role.translatorDesc': 'Edits page text (title, summary, content) without changing classification or publishing.',

      'adm.title': 'Administration', 'adm.viewSite': 'View site', 'adm.logout': 'Sign out', 'adm.backToSite': 'Back to site',
      'adm.proto': 'Prototype', 'adm.protoHint': 'Data is saved in this browser (localStorage). Export it from Settings.',
      'adm.seedOutdated': 'A newer version of the demo content is available.',
      'adm.forbidden': 'Access denied', 'adm.forbiddenText': 'Your role does not give access to this section.',
      'adm.saved': 'Changes saved', 'adm.seeAll': 'See all', 'adm.undo': 'Undo',

      'adm.login.title': 'Sign in to the administration',
      'adm.login.lead': 'Choose an account to try the administration: every change is signed by its author.',
      'adm.login.user': 'Account', 'adm.login.submit': 'Sign in',
      'adm.login.demo': 'Prototype: no password is required. In production, sign-in will use real credentials.',

      'adm.nav.dashboard': 'Dashboard', 'adm.nav.pages': 'Pages', 'adm.nav.categories': 'Categories', 'adm.nav.glossary': 'Glossary',
      'adm.nav.users': 'Users', 'adm.nav.activity': 'Activity', 'adm.nav.trash': 'Trash', 'adm.nav.settings': 'Settings',

      'adm.dash.hello': 'Hello, {name}', 'adm.dash.lead': 'Here is the state of the wiki and what changed recently.',
      'adm.dash.published': 'Published pages', 'adm.dash.drafts': 'Drafts', 'adm.dash.missingEn': 'Missing EN translations', 'adm.dash.contributors': 'Contributors',
      'adm.dash.activity': 'Recent activity', 'adm.dash.todo': 'To do', 'adm.dash.todoNone': 'All clear: everything is published and translated.',
      'adm.dash.todoDraft': 'Publish "{title}"', 'adm.dash.todoTranslate': 'Translate "{title}" into English',
      'adm.dash.todoFeedback': { one: '"{title}": {n} negative vote', other: '"{title}": {n} negative votes' },
      'adm.dash.byCategory': 'Content by category', 'adm.dash.enCoverage': 'EN translation',

      'adm.log.create': '{user} created {type} {target}', 'adm.log.update': '{user} edited {type} {target}',
      'adm.log.delete': '{user} moved {type} {target} to the trash', 'adm.log.restore': '{user} restored {type} {target}',
      'adm.log.purge': '{user} permanently deleted {type} {target}', 'adm.log.import': '{user} imported {type} {target}',
      'adm.type.page': 'page', 'adm.type.category': 'category', 'adm.type.glossary': 'term', 'adm.type.user': 'user', 'adm.type.settings': 'settings',

      'adm.act.view': 'View', 'adm.act.edit': 'Edit', 'adm.act.history': 'History', 'adm.act.delete': 'Delete',
      'adm.col.page': 'Page', 'adm.col.category': 'Category', 'adm.col.level': 'Level', 'adm.col.status': 'Status', 'adm.col.author': 'Author',
      'adm.col.updated': 'Last change', 'adm.col.actions': 'Actions', 'adm.col.translation': 'Translation',
      'adm.status.published': 'Published', 'adm.status.draft': 'Draft', 'adm.status.deleted': 'Trash',

      'adm.pages.lead': 'Create, edit and publish wiki pages in French and English.', 'adm.pages.new': 'New page',
      'adm.pages.search': 'Search pages (title, ID, keyword)…', 'adm.pages.allCats': 'All categories',
      'adm.pages.allStatus': 'All statuses', 'adm.pages.allTr': 'All translations', 'adm.pages.trMissing': 'EN translation missing', 'adm.pages.trDone': 'Translated into English',
      'adm.pages.sort': 'Sort', 'adm.pages.sortUpdated': 'Most recent first', 'adm.pages.sortTitle': 'Title (A → Z)', 'adm.pages.sortCategory': 'Wiki order',
      'adm.pages.noEn': 'not translated yet', 'adm.pages.none': 'No page matches these filters.',
      'adm.pages.count': 'Showing {n} of {total} pages',

      'adm.trash.confirmTitle': 'Move to trash', 'adm.trash.confirmText': 'The page {title} will be removed from the site. You can restore it from the trash.',
      'adm.trash.confirmBtn': 'Move to trash', 'adm.trash.done': '"{title}" moved to the trash', 'adm.trash.restored': 'Page restored',
      'adm.trash.lead': 'Deleted pages stay here, with their full history, until they are permanently deleted.',
      'adm.trash.deletedBy': 'Deleted by', 'adm.trash.restore': 'Restore', 'adm.trash.purge': 'Delete permanently', 'adm.trash.purgeBtn': 'Delete permanently',
      'adm.trash.purgeConfirm': 'The page {title} and its {n} revisions will be erased. This cannot be undone.',
      'adm.trash.purged': 'Page permanently deleted', 'adm.trash.empty': 'The trash is empty.',
      'adm.trash.purgeAdmin': 'Only an Administrator account can permanently delete a page.',

      'adm.editor.newTitle': 'New page', 'adm.editor.editTitle': 'Edit "{title}"', 'adm.editor.newLead': 'Write the French version first; the English version can be added afterwards.',
      'adm.editor.save': 'Save', 'adm.editor.copyFr': 'Start from the French version', 'adm.editor.copied': 'French content copied: translate it in place.',
      'adm.editor.copyConfirm': 'The current English content will be replaced by the French version. Continue?',
      'adm.editor.title': 'Title', 'adm.editor.short': 'Short title', 'adm.editor.shortHelp': 'Used in menus and the marking path.',
      'adm.editor.slug': 'ID', 'adm.editor.slugHelp': 'Used in the page address: lowercase letters, digits and hyphens.', 'adm.editor.slugLocked': 'The ID can’t change after creation (links stay valid).',
      'adm.editor.summary': 'Summary', 'adm.editor.summaryHelp': 'One or two sentences, shown under the title and in search.',
      'adm.editor.body': 'Content', 'adm.editor.viewMode': 'Editor layout', 'adm.editor.write': 'Write', 'adm.editor.split': 'Side by side', 'adm.editor.preview': 'Preview',
      'adm.editor.toolbar': 'Formatting', 'adm.editor.syntax': 'Syntax help', 'adm.editor.emptyPreview': 'The preview will appear here.',
      'adm.editor.quick': 'Cheat sheet (Expert mode)', 'adm.editor.quickHelp': 'One step per line. Bold, italics and links are allowed.',
      'adm.editor.objectives': 'Objectives (Guided mode)', 'adm.editor.objectivesHelp': 'One objective per line, shown in "Before you start".',
      'adm.editor.publication': 'Publishing', 'adm.editor.note': 'Revision note', 'adm.editor.notePh': 'E.g. updated screenshots',
      'adm.editor.noteHelp': 'Summarise your change; it appears in the history.', 'adm.editor.unsaved': 'Unsaved changes',
      'adm.editor.classification': 'Classification', 'adm.editor.metaLocked': 'Your role can edit the text but not the classification.',
      'adm.editor.order': 'Order', 'adm.editor.step': 'Marking path step', 'adm.editor.noStep': 'None',
      'adm.editor.menuPath': 'Path in the CIS', 'adm.editor.menuPathHelp': 'Menus to follow, separated by "›".',
      'adm.editor.video': 'Related video', 'adm.editor.noVideo': 'None', 'adm.editor.tags': 'Keywords', 'adm.editor.tagsHelp': 'Comma-separated; they improve search.',
      'adm.editor.prereq': 'Prerequisites', 'adm.editor.prereqHelp': 'Pages suggested in "Before you start".',
      'adm.editor.info': 'Information', 'adm.editor.createdBy': 'Created by', 'adm.editor.updatedBy': 'Last change', 'adm.editor.revisions': 'Revisions',
      'adm.editor.revCount': { one: '{n} revision', other: '{n} revisions' }, 'adm.editor.source': 'Original page',
      'adm.editor.danger': 'Danger zone', 'adm.editor.dangerHelp': 'The page will be removed from the site and moved to the trash.',
      'adm.editor.langOk': 'Language complete', 'adm.editor.langMissing': 'Language incomplete (title or content missing)',
      'adm.editor.saved': 'Saved (revision {n})', 'adm.editor.enIncomplete': 'English version incomplete: the page will be shown in French',
      'adm.editor.autoNote': 'Edit', 'adm.editor.autoNoteNew': 'Page created',
      'adm.editor.leave': 'You have unsaved changes. Leave anyway?',
      'adm.editor.pickPage': 'Page to link', 'adm.editor.insert': 'Insert',

      'tb.h2': 'Section heading', 'tb.h3': 'Subheading', 'tb.bold': 'Bold (Ctrl+B)', 'tb.italic': 'Italic (Ctrl+I)', 'tb.kbd': 'Keyboard key',
      'tb.ul': 'Bulleted list', 'tb.ol': 'Numbered list', 'tb.table': 'Table', 'tb.link': 'External link', 'tb.wikilink': 'Link to a wiki page',
      'tb.image': 'Image / screenshot', 'tb.video': 'Video', 'tb.note': '"Note" box', 'tb.tip': '"Tip" box', 'tb.warning': '"Warning" box',
      'tb.guided': 'Block shown in Guided mode', 'tb.expert': 'Block shown in Expert mode',
      'tb.linkText': 'link text', 'tb.calloutText': 'Your text', 'tb.modeText': 'Content for this mode only',

      'adm.media.path': 'File', 'adm.media.pathHelp': '"media:" points to the library {base}; a full https:// address also works.',
      'adm.media.caption': 'Caption', 'adm.media.captionHelp': 'Describes the image for screen readers and is shown below it.',

      'adm.syn.h2': 'Section heading (### for a subheading)', 'adm.syn.emph': 'Bold and italics', 'adm.syn.list': 'Bulleted or numbered lists (indent to nest)',
      'adm.syn.link': 'External link', 'adm.syn.wikilink': 'Link to a wiki page', 'adm.syn.image': 'Image; several image lines make a gallery',
      'adm.syn.video': 'Video', 'adm.syn.kbd': 'Keyboard key', 'adm.syn.callout': 'Box (following lines start with >)', 'adm.syn.table': 'Table',
      'adm.syn.guided': 'Shown in Guided mode only', 'adm.syn.expert': 'Shown in Expert mode only',

      'adm.err.title': 'The French title is required.', 'adm.err.slug': 'Invalid ID: 2 to 61 characters, lowercase letters, digits and hyphens.',
      'adm.err.slugTaken': 'This ID is already in use.', 'adm.err.form': 'Please check the highlighted fields.', 'adm.err.required': 'This field is required.',
      'adm.err.caption': 'Add a caption (accessibility).', 'adm.err.url': 'The address must start with http:// or https://.',
      'adm.err.login': 'Invalid ID: lowercase letters, digits, dots, hyphens.',

      'adm.history.title': 'Revision history', 'adm.history.back': 'Back to editor', 'adm.history.rev': 'Revision {n}', 'adm.history.current': 'Current version',
      'adm.history.view': 'View', 'adm.history.compare': 'Compare', 'adm.history.restore': 'Restore', 'adm.history.legacy': 'View on DokuWiki',
      'adm.history.noSnapshot': 'Content not kept', 'adm.history.pick': 'Choose "Compare" on a revision to see what changed since.',
      'adm.history.diffTitle': 'Revision {a} → current version ({b})', 'adm.history.diffHint': 'lines added / removed',
      'adm.history.identical': 'No difference in this language.', 'adm.history.same': '… {n} unchanged lines …',
      'adm.history.restoreConfirm': 'Revision {n} will become the current version. A new revision is created: nothing is lost.',
      'adm.history.restoredNote': 'Restored revision {n}', 'adm.history.restored': 'Revision {n} restored (new revision {m})',

      'adm.cat.lead': 'Categories organise the wiki menu and home page.', 'adm.cat.new': 'New category', 'adm.cat.edit': 'Edit category',
      'adm.cat.name': 'Name', 'adm.cat.desc': 'Description', 'adm.cat.icon': 'Icon', 'adm.cat.color': 'Colour',
      'adm.cat.notEmpty': 'Move or delete the pages in this category first.', 'adm.cat.confirmDelete': 'The category {name} will be deleted.',
      'adm.color.blue': 'Blue', 'adm.color.indigo': 'Indigo', 'adm.color.teal': 'Teal', 'adm.color.rose': 'Rose', 'adm.color.amber': 'Amber', 'adm.color.green': 'Green',

      'adm.gl.lead': 'Glossary terms are explained on hover in pages, in Guided mode.', 'adm.gl.new': 'New term', 'adm.gl.edit': 'Edit term',
      'adm.gl.term': 'Term', 'adm.gl.aliases': 'Variants', 'adm.gl.def': 'Definition', 'adm.gl.page': 'Linked page',
      'adm.gl.aliasesHelp': 'Comma-separated variants (plural, synonym): they are also recognised in pages.',
      'adm.gl.confirmDelete': 'The term {term} will be removed from the glossary.', 'adm.gl.deleted': 'Term deleted',

      'adm.users.lead': 'Accounts that can edit the wiki. Every revision keeps its author’s name.', 'adm.users.new': 'New user', 'adm.users.edit': 'Edit user',
      'adm.users.user': 'User', 'adm.users.role': 'Role', 'adm.users.created': 'Pages created', 'adm.users.revs': 'Revisions', 'adm.users.last': 'Last contribution',
      'adm.users.you': 'you', 'adm.users.system': 'system account', 'adm.users.roles': 'Roles and rights',
      'adm.users.name': 'Display name', 'adm.users.login': 'ID', 'adm.users.loginHelp': 'Lowercase letters, digits, dots or hyphens. Can’t be changed later.',
      'adm.users.selfRole': 'You can’t change your own role.', 'adm.users.confirmDelete': 'The account {name} will be deleted. Its revisions stay signed with its name.',
      'adm.users.authHint': 'In production: real authentication (credentials or SSO), hashed passwords and a sign-in log.',

      'adm.activity.lead': 'The log of every change: who, what, when.', 'adm.activity.allUsers': 'All users', 'adm.activity.allTypes': 'All types',
      'adm.activity.type': 'Type', 'adm.activity.none': 'No activity for these filters.',

      'adm.set.lead': 'Wiki settings and prototype data management.', 'adm.set.general': 'General',
      'adm.set.media': 'Media library', 'adm.set.mediaHelp': 'Address used for "media:" paths (images, videos, files).',
      'adm.set.contact': 'Contact email', 'adm.set.data': 'Data',
      'adm.set.dataLead': 'Edited content is saved in this browser ({kb} KB).',
      'adm.set.export': 'Export (JSON)', 'adm.set.import': 'Import a JSON export', 'adm.set.reset': 'Reset the demo content',
      'adm.set.dataHint': 'Export the JSON to share your changes or add them to the repository (data/content.js).',
      'adm.set.exported': 'Export downloaded', 'adm.set.importConfirm': 'The current content will be replaced by the import ({n} pages).',
      'adm.set.imported': 'Import complete', 'adm.set.importBad': 'Invalid file: this is not a CIS Wiki export.',
      'adm.set.resetConfirm': 'All changes made in this browser will be lost and the original content reloaded.',
      'adm.set.resetDone': 'Demo content reloaded'
    }
  };

  var warned = {};
  function t(lang, key, vars) {
    var dict = D[lang] || D.fr;
    var v = dict[key];
    if (v === undefined) v = D.fr[key];
    if (v === undefined) {
      if (!warned[key]) { warned[key] = true; if (global.console) console.warn('[i18n] clé manquante : ' + key); }
      return key;
    }
    if (typeof v === 'object') {
      var n = vars && typeof vars.n === 'number' ? vars.n : 0;
      var cat = 'other';
      try { cat = new Intl.PluralRules(lang).select(n); } catch (e) { cat = n === 1 ? 'one' : 'other'; }
      v = v[cat] || v.other;
    }
    if (vars) v = v.replace(/\{(\w+)\}/g, function (m, k) { return vars[k] !== undefined ? vars[k] : m; });
    return v;
  }

  global.CISI18n = { t: t, dict: D };
})(window);
