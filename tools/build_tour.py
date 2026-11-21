#!/usr/bin/env python3
"""Génère data/tour.js (guide pas à pas) à partir des zones relevées dans le CIS.

Les zones (x, y, largeur, hauteur en pixels de la capture) viennent de captures faites avec le
compte Expert « wiki » sur la base de formation (tools/tour_boxes.json). Usage :
    python3 tools/build_tour.py
"""
import json, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
B = json.load(open(os.path.join(ROOT, 'tools', 'tour_boxes.json'), encoding='utf-8'))

CHAPTERS = [
    ('prepare', 'Préparer le fichier Excel', 'Prepare the Excel file'),
    ('import', 'Se connecter et importer', 'Log in and import'),
    ('check', 'Vérifier le barème', 'Check the marking scheme'),
    ('calc', 'Ajouter les calculs', 'Add the calculations'),
    ('plan', 'Planning et contrôles', 'Schedule and checks'),
    ('lock', 'Relire et verrouiller', 'Proofread and lock'),
]

# (chapitre, image, zone, titre FR, texte FR, titre EN, texte EN, astuce FR, astuce EN)
S = [
 ('prepare', None, None, 'Bienvenue dans le guide pas à pas',
  'Ce guide vous accompagne **de A à Z** : remplir le fichier Excel du barème, l’importer dans le CIS, le vérifier, ajouter les calculs automatiques, préparer la notation, puis faire **verrouiller** le barème.\n\nÀ chaque étape, une **capture du CIS** s’affiche : la zone importante est **entourée** et une **flèche** vous montre où cliquer. Avancez avec **Suivant** ou la flèche → du clavier.',
  'Welcome to the step-by-step guide',
  'This guide takes you **from A to Z**: fill in the marking scheme Excel file, import it into the CIS, check it, add automatic calculations, prepare marking, then have the scheme **locked**.\n\nAt each step a **CIS screenshot** is shown: the important area is **outlined** and an **arrow** shows where to click. Move on with **Next** or the → key.',
  'Prévoyez 30 à 45 minutes la première fois. Le guide retient où vous en êtes.', 'Allow 30 to 45 minutes the first time. The guide remembers where you are.'),
 ('prepare', 'login', 'user', 'Ouvrez le CIS de votre compétition',
  'Ouvrez l’adresse du CIS que l’on vous a donnée, puis tapez votre **nom d’utilisateur** ici.',
  'Open your competition CIS', 'Open the CIS address you were given, then type your **username** here.',
  'Chaque personne a son propre compte : une 2ᵉ connexion avec le même compte ferme la 1ʳᵉ.', 'Everyone has their own account: a 2nd login with the same account closes the 1st.'),
 ('prepare', 'login', 'pass', 'Le mot de passe', 'Tapez votre **mot de passe**…', 'The password', 'Type your **password**…', None, None),
 ('prepare', 'login', 'btn', 'Se connecter', '…puis cliquez sur **connexion**.', 'Log in', '…then click the login button.', None, None),
 ('prepare', 'home', 'card', 'Le tableau de bord', 'Vous arrivez sur le **tableau de bord** de votre métier. Chaque ligne passe au **vert** quand l’étape est faite. Notre objectif : tout mettre au vert avant la compétition.',
  'The dashboard', 'You land on your skill’s **dashboard**. Each line turns **green** when the step is done. Our goal: everything green before the competition.', None, None),
 ('prepare', 'menu-ms', 'ms', 'Récupérer le modèle Excel', 'Ouvrez le menu **Marking Scheme** et cliquez sur **Marking Scheme**.', 'Get the Excel template', 'Open the **Marking Scheme** menu and click **Marking Scheme**.', None, None),
 ('prepare', 'ms-export', 'format', 'Format CIS 5.0', 'En bas de la page, dans *Export Marking Scheme*, laissez le format **CIS 5.0** : c’est le seul qui contient aussi les calculs.',
  'CIS 5.0 format', 'At the bottom of the page, in *Export Marking Scheme*, keep the **CIS 5.0** format: it is the only one that also contains calculations.', None, None),
 ('prepare', 'ms-export', 'btn', 'Exporter', 'Cliquez sur **Export** : le fichier Excel de votre métier se télécharge. Vos sections WSOS y sont déjà.',
  'Export', 'Click **Export**: your skill’s Excel file downloads. Your WSOS sections are already in it.', 'Gardez une copie de ce fichier : c’est aussi votre sauvegarde.', 'Keep a copy of this file: it is also your backup.'),
 ('prepare', 'excel', 'wsos', 'Zone 1 : les sections WSOS', 'Ouvrez le fichier. En haut : les **sections WSOS** du métier et leur poids (colonne I). En général, **on n’y touche pas**.',
  'Area 1: WSOS sections', 'Open the file. At the top: the skill’s **WSOS sections** and their weight (column I). Usually **you don’t change them**.', None, None),
 ('prepare', 'excel', 'criteria', 'Zone 2 : les critères', 'Écrivez le **nom** de chaque critère (A, B, C…) en colonne B et son **total de points** en colonne K.',
  'Area 2: criteria', 'Write the **name** of each criterion (A, B, C…) in column B and its **total marks** in column K.', 'Le total des critères doit faire 100.', 'Criteria must add up to 100.'),
 ('prepare', 'excel', 'sub', 'Zone 3 : un sous-critère', 'Sous chaque en-tête bleu, une ligne par **sous-critère** : son identifiant (A1), son nom…',
  'Area 3: a sub-criterion', 'Below each blue header, one row per **sub-criterion**: its ID (A1), its name…', None, None),
 ('prepare', 'excel', 'day', 'Le jour de notation', '…et en colonne C, le **jour** où il sera noté : 1, 2 ou 3.', 'The marking day', '…and in column C, the **day** it will be marked: 1, 2 or 3.', 'Ce jour sera repris automatiquement dans le planning du CIS.', 'This day is automatically reused in the CIS schedule.'),
 ('prepare', 'excel', 'aspectM', 'Un aspect « Measurement »', 'Une ligne par aspect mesurable : **M** en colonne D, puis la description (E).', 'A “Measurement” aspect', 'One row per measurable aspect: **M** in column D, then the description (E).', None, None),
 ('prepare', 'excel', 'req', 'La valeur attendue', 'En colonne H, le **Requirement** : la valeur attendue. Écrivez **un nombre seul** (800), sans unité ni « ± ».',
  'The expected value', 'In column H, the **Requirement**: the expected value. Write **a plain number** (800), no unit or “±”.', '« 300mm +- 15mm » sera ignoré par le CIS et aucun calcul ne pourra s’en servir.', '“300mm +- 15mm” is ignored by the CIS and no calculation can use it.'),
 ('prepare', 'excel', 'wsosSec', 'La section WSOS', 'En colonne I, le **numéro de section WSOS** de l’aspect. **Obligatoire pour chaque aspect**, sinon la répartition des points sera fausse.',
  'The WSOS section', 'In column I, the aspect’s **WSOS section number**. **Required for every aspect**, otherwise the mark distribution will be wrong.', None, None),
 ('prepare', 'excel', 'max', 'La note maximale', 'En colonne K, la **note maximale** de l’aspect. La somme de toutes les notes max doit faire **100**.', 'The max mark', 'In column K, the aspect’s **max mark**. All max marks must add up to **100**.', None, None),
 ('prepare', 'excel', 'aspectJ', 'Un aspect « Judgement »', 'Pour un aspect jugé par les jurés : **J** en colonne D, puis **4 lignes** dessous avec les scores **0, 1, 2, 3** (colonne F) et leur description (colonne G).',
  'A “Judgement” aspect', 'For an aspect judged by jurors: **J** in column D, then **4 rows** below with scores **0, 1, 2, 3** (column F) and their description (column G).', None, None),
 ('import', 'menu-ms', 'ms', 'Retour au CIS', 'Votre fichier est prêt. Dans le CIS, ouvrez à nouveau **Marking Scheme** › **Marking Scheme**.', 'Back to the CIS', 'Your file is ready. In the CIS, open **Marking Scheme** › **Marking Scheme** again.', None, None),
 ('import', 'ms-import', 'file', 'Choisir le fichier', 'Dans le cadre *Import Marking Scheme*, cliquez sur **Choose File** et choisissez votre fichier Excel.', 'Choose the file', 'In the *Import Marking Scheme* box, click **Choose File** and pick your Excel file.', None, None),
 ('import', 'ms-import', 'wsos', 'Option : sections WSOS', 'Laissez **décoché** si les sections WSOS sont déjà dans le CIS (cas habituel). Cochez seulement si elles ont changé.',
  'Option: WSOS sections', 'Leave **unticked** if the WSOS sections are already in the CIS (usual case). Tick only if they changed.', None, None),
 ('import', 'ms-import', 'ms', 'Option : le barème', '**Import Marking Scheme** doit rester **coché** : c’est votre barème.', 'Option: the marking scheme', '**Import Marking Scheme** must stay **ticked**: it is your marking scheme.', None, None),
 ('import', 'ms-import', 'keep', 'Options : calculs et planning', 'Laissez cochés **Import Calculations**, **Preserve existing marking schedule** et **Clear unused calculations** : vos calculs et votre planning sont conservés.',
  'Options: calculations and schedule', 'Keep **Import Calculations**, **Preserve existing marking schedule** and **Clear unused calculations** ticked: your calculations and schedule are kept.', None, None),
 ('import', 'ms-import', 'btn', 'Importer', 'Cliquez sur **Import**.', 'Import', 'Click **Import**.', None, None),
 ('import', 'ms-confirm', 'ok', 'Confirmer', 'Le CIS prévient que le barème actuel sera **remplacé**. Cliquez sur **OK**. Le message **Import is complete** s’affiche en haut à droite.',
  'Confirm', 'The CIS warns that the current marking scheme will be **replaced**. Click **OK**. The message **Import is complete** appears at the top right.', 'Si rien ne se passe : quelqu’un d’autre modifie peut-être le barème. Rechargez la page et recommencez.', 'If nothing happens: someone else may be editing the scheme. Reload the page and retry.'),
 ('check', 'ms-criteria', 'critA', 'Vos critères sont là', 'Le haut de la page affiche maintenant vos **critères** avec leur note.', 'Your criteria are here', 'The top of the page now shows your **criteria** with their marks.', None, None),
 ('check', 'ms-criteria', 'total', 'Le total doit faire 100', 'Vérifiez le **Criterion Total** : il doit être exactement **100.00**.', 'The total must be 100', 'Check the **Criterion Total**: it must be exactly **100.00**.', None, None),
 ('check', 'ms-criteria', 'wsos', 'La répartition WSOS', 'L’encadré **WSOS Allocation** compare vos points (à gauche) au poids attendu (en gras). Les deux chiffres doivent être **proches** pour chaque section.',
  'WSOS distribution', 'The **WSOS Allocation** box compares your marks (left) with the expected weight (bold). Both figures should be **close** for each section.', 'Un écart important = des aspects sans section WSOS ou dans la mauvaise section.', 'A big gap = aspects with no WSOS section or in the wrong one.'),
 ('check', 'ms-criteria', 'arrowA', 'Ouvrir un critère', 'Cliquez sur la **flèche ›** d’un critère pour voir ses sous-critères, puis sur celle d’un sous-critère pour voir ses aspects.', 'Open a criterion', 'Click a criterion’s **arrow ›** to see its sub-criteria, then a sub-criterion’s arrow to see its aspects.', None, None),
 ('check', 'ms-aspects', 'scores', 'Les aspects Judgement', 'Les aspects **J** s’affichent en premier, avec leurs 4 descriptions de score. Relisez-les : elles seront imprimées pour les jurés.', 'Judgement aspects', '**J** aspects come first, with their 4 score descriptions. Proofread them: they will be printed for jurors.', None, None),
 ('check', 'ms-aspects', 'req', 'Les aspects Measurement', 'Puis les aspects **M**, avec leur **Requirement** et leur note max. Vérifiez que chaque valeur attendue est bien un nombre.', 'Measurement aspects', 'Then the **M** aspects, with their **Requirement** and max mark. Check that every expected value is a number.', None, None),
 ('check', 'ms-aspects', 'addM', 'Corriger sans réimporter', 'Une faute ? Cliquez dans le champ et corrigez : la sauvegarde est **automatique**. Ces boutons ajoutent un aspect.', 'Fix without re-importing', 'A typo? Click the field and fix it: saving is **automatic**. These buttons add an aspect.', 'Une seule personne peut modifier à la fois : sinon un bandeau rouge « currently being edited by… » apparaît.', 'Only one person can edit at a time: otherwise a red “currently being edited by…” banner appears.'),
 ('calc', 'menu-ms', 'calc', 'Les calculs automatiques', 'Pour que le CIS calcule les notes à partir des mesures : menu **Marking Scheme** › **Calculations**.', 'Automatic calculations', 'For the CIS to calculate marks from measurements: **Marking Scheme** › **Calculations** menu.', None, None),
 ('calc', 'calc-assign', 'sub', 'Choisir le sous-critère', 'Choisissez le **sous-critère** : ses aspects Measurement s’affichent dessous.', 'Choose the sub-criterion', 'Choose the **sub-criterion**: its Measurement aspects are listed below.', None, None),
 ('calc', 'calc-assign', 'addNew', 'Ajouter un calcul', 'Sur la ligne de l’aspect, cliquez sur **Add New**.', 'Add a calculation', 'On the aspect’s row, click **Add New**.', 'Pas sûr de la méthode ? La page « Choisir sa méthode » du wiki pose les bonnes questions.', 'Not sure which method? The wiki page “Choose your method” asks the right questions.'),
 ('calc', 'calc-modal', 'type', 'Choisir la méthode', 'Choisissez le **Calculation Type**. Ici : **Ranged Score** (une cible avec des tolérances).', 'Choose the method', 'Choose the **Calculation Type**. Here: **Ranged Score** (a target with tolerances).', None, None),
 ('calc', 'calc-modal', 'name', 'Le garder dans la bibliothèque', 'Cochez **Add to Library** et donnez un **nom clair** : vous pourrez réutiliser ce calcul sur d’autres aspects.', 'Keep it in the library', 'Tick **Add to Library** and give a **clear name**: you can reuse this calculation on other aspects.', None, None),
 ('calc', 'calc-modal', 'req', 'La cible', 'Cochez **Use Aspect Requirements** : la cible sera la valeur attendue de l’aspect (ici 150 mm).', 'The target', 'Tick **Use Aspect Requirements**: the target will be the aspect’s expected value (here 150 mm).', None, None),
 ('calc', 'calc-modal', 'ranges', 'Les plages de tolérance', 'Chaque ligne : tolérance **sous** la cible, tolérance **au-dessus**, points **retirés**. Ici : ±5 → 0 point retiré, ±10 → 1 point retiré, au-delà → 0.',
  'Tolerance ranges', 'Each row: tolerance **below** the target, tolerance **above**, marks **removed**. Here: ±5 → 0 removed, ±10 → 1 removed, beyond → 0.', 'Écrivez des nombres positifs (5 et 5), jamais −5.', 'Write positive numbers (5 and 5), never −5.'),
 ('calc', 'calc-modal', 'marks', 'Tester avant d’enregistrer', 'Dans **Test Calculation**, tapez quelques mesures : la note s’affiche dessous. Ici 150 → 2, 158 → 1, 162 → 0.', 'Test before saving', 'In **Test Calculation**, type a few measurements: the mark appears below. Here 150 → 2, 158 → 1, 162 → 0.', None, None),
 ('calc', 'calc-modal', 'save', 'Enregistrer', 'Cliquez sur **Save**.', 'Save', 'Click **Save**.', None, None),
 ('calc', 'calc-assign', 'badge', 'Le calcul est posé', 'Le nom du calcul apparaît en **badge bleu** à côté de l’aspect. **Edit** le modifie, **Copy** en fait une variante, **Remove** le retire.', 'The calculation is set', 'The calculation name appears as a **blue badge** next to the aspect. **Edit** changes it, **Copy** makes a variant, **Remove** removes it.', None, None),
 ('calc', 'calc-assign', 'addLib', 'Réutiliser un calcul', 'Pour un aspect identique (jambe gauche = jambe droite), cliquez sur **Add from Library**…', 'Reuse a calculation', 'For an identical aspect (left leg = right leg), click **Add from Library**…', None, None),
 ('calc', 'calc-addlib', 'select', 'Choisir dans la bibliothèque', '…choisissez le calcul et cliquez sur **Save**. Répétez pour chaque aspect mesuré.', 'Pick from the library', '…choose the calculation and click **Save**. Repeat for every measured aspect.', None, None),
 ('plan', 'menu-ms', 'schedule', 'Le planning de notation', 'Menu **Marking Scheme** › **Marking Schedule**.', 'The marking schedule', '**Marking Scheme** › **Marking Schedule** menu.', None, None),
 ('plan', 'schedule', 'day', 'Le jour de chaque sous-critère', 'Vérifiez le **jour** de chaque sous-critère (repris de la colonne C de l’Excel). La sauvegarde est automatique.', 'Each sub-criterion’s day', 'Check each sub-criterion’s **day** (taken from Excel column C). Saving is automatic.', None, None),
 ('plan', 'schedule', 'team', 'Les jurés', 'Choisissez un juré dans la liste…', 'Jurors', 'Choose a juror in the list…', None, None),
 ('plan', 'schedule', 'add', 'Ajouter le juré', '…et cliquez sur **Add**. Pour les aspects Judgement, il faut **3 jurés**.', 'Add the juror', '…and click **Add**. Judgement aspects need **3 jurors**.', None, None),
 ('plan', 'schedule', 'sup', 'Le superviseur', 'Choisissez une autre personne et cliquez sur **Supervisor**. Le superviseur **ne peut pas** être juré du même sous-critère.', 'The supervisor', 'Choose another person and click **Supervisor**. The supervisor **cannot** be a juror on the same sub-criterion.', None, None),
 ('plan', 'status', 'ms', 'Le bilan : Skill Status', 'Menu **Reports** › **Skill Status** : tout doit être complet. Ici, il manque les équipes (**Marking Teams Defined 0 / 10**).', 'The summary: Skill Status', '**Reports** › **Skill Status** menu: everything must be complete. Here teams are missing (**Marking Teams Defined 0 / 10**).', None, None),
 ('plan', 'status', 'wsos', 'La variance WSOS', 'Ce cadre donne la **variance** totale : elle doit être proche de **0 %**. Ici 97,5 % : des aspects n’ont pas de section WSOS.', 'WSOS variance', 'This box gives the total **variance**: it should be close to **0%**. Here 97.5%: some aspects have no WSOS section.', 'Le détail par section : Reports › WSOS Mark Allocation Table.', 'Detail per section: Reports › WSOS Mark Allocation Table.'),
 ('lock', 'forms', 'type', 'Imprimer le barème pour relecture', 'Menu **Assessment** › **Marking Forms**, type **Marking scheme**…', 'Print the scheme for proofreading', '**Assessment** › **Marking Forms** menu, type **Marking scheme**…', None, None),
 ('lock', 'forms', 'pdf', 'Créer le PDF', '…puis **Create PDF**.', 'Create the PDF', '…then **Create PDF**.', None, None),
 ('lock', 'pdf-draft', 'draft', 'Relire en équipe', 'Le PDF porte la mention **Draft** tant que le barème n’est pas verrouillé. Relisez-le en équipe : textes, points, valeurs attendues, cases grisées (= notes calculées).', 'Proofread as a team', 'The PDF shows **Draft** until the scheme is locked. Proofread it as a team: texts, marks, expected values, greyed boxes (= calculated marks).', None, None),
 ('lock', 'home', 'locked', 'Dernière étape : faire vérifier par les Team Leaders', '**Avant de verrouiller, faites vérifier le barème par les Team Leaders.** Envoyez-leur le PDF et l’export Excel. Une fois leur accord donné, le barème est verrouillé (bouton **Lock Marking Scheme** selon vos droits, sinon par le CIS Master) et cette ligne passe à **Yes**.',
  'Last step: have the Team Leaders check it', '**Before locking, have the marking scheme checked by the Team Leaders.** Send them the PDF and the Excel export. Once they agree, the scheme is locked (**Lock Marking Scheme** button depending on your rights, otherwise by the CIS Master) and this line turns **Yes**.',
  'Après verrouillage, plus aucune modification n’est possible sans déverrouillage et signature : ne verrouillez jamais sans l’accord des Team Leaders.', 'After locking, no change is possible without unlocking and a signature: never lock without the Team Leaders’ approval.'),
]

steps = []
for st in S:
    ch, img, box, tf, xf, te, xe = st[:7]
    tipf, tipe = (st[7], st[8]) if len(st) > 7 else (None, None)
    step = {'ch': ch, 'fr': {'t': tf, 'x': xf}, 'en': {'t': te, 'x': xe}}
    if tipf: step['fr']['tip'] = tipf; step['en']['tip'] = tipe
    if img:
        meta = B[img]
        b = meta['boxes'].get(box)
        if b is None: raise SystemExit(f'zone manquante : {img}.{box}')
        step['img'] = img; step['w'] = meta['w']; step['h'] = meta['h']; step['box'] = b
    steps.append(step)

js = ('/* Généré par tools/build_tour.py — ne pas modifier à la main. */\n'
      'window.WIKI_TOUR = ' + json.dumps({'chapters': [{'id': c[0], 'fr': c[1], 'en': c[2]} for c in CHAPTERS], 'steps': steps}, ensure_ascii=False, indent=1) + ';\n')
open(os.path.join(ROOT, 'data', 'tour.js'), 'w', encoding='utf-8').write(js)
print(len(steps), 'étapes')
