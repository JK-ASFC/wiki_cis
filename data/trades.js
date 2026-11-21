/*
 * CIS Wiki — exemples de méthodes de calcul par métier (liste des métiers WorldSkills France).
 *
 * Chaque exemple : [aspect FR, réglage FR, aspect EN, réglage EN].
 * Clés : pf = Pass/Fail, ch = Choice, nc = Number Completed, rg = Ranged Score,
 *        rd = Regular Difference Deduction, ps = Percent Score Comparison, ss = Stepped Score Comparison.
 * Les valeurs sont des exemples pédagogiques : chaque Expert adapte cibles, tolérances et points
 * à son sujet et à son Marking Scheme.
 */
(function (global) {
  'use strict';
  var KEYS = { pf: 'passfail', ch: 'choice', nc: 'completed', rg: 'ranged', rd: 'regular', ps: 'percent', ss: 'stepped' };
  function T(fr, en, ex) {
    var out = { fr: fr, en: en, ex: {} };
    Object.keys(ex).forEach(function (k) {
      var e = ex[k];
      out.ex[KEYS[k]] = { fr: [e[0], e[1]], en: [e[2] || e[0], e[3] || e[1]] };
    });
    return out;
  }

  global.WIKI_TRADES = [
    T('Administration des Systèmes et des Réseaux Informatiques', 'IT Network Systems Administration', {
      pf: ['Le serveur DNS résout le nom demandé', 'Pass = note max, Fail = 0', 'DNS server resolves the requested name', 'Pass = max mark, Fail = 0'],
      ch: ['Sauvegarde : complète / partielle / absente', 'Déduction 0 % / 50 % / 100 %', 'Backup: complete / partial / missing', 'Deduction 0% / 50% / 100%'],
      nc: ['Tests de connectivité réussis', 'Number Possible = 10 (10 tests prévus)', 'Successful connectivity tests', 'Number Possible = 10 (10 planned tests)'],
      ps: ['Temps de restauration d’un service', 'Highest Mark to Lowest Value (le plus rapide gagne)', 'Service restore time', 'Highest Mark to Lowest Value (fastest wins)']
    }),
    T('Aide à la Personne', 'Health and Social Care', {
      pf: ['Hygiène des mains réalisée avant le soin', 'Pass / Fail', 'Hand hygiene performed before care', 'Pass / Fail'],
      ch: ['Installation du patient : sécurisée / à reprendre / dangereuse', 'Déduction 0 / 1 / 2 points', 'Patient positioning: safe / needs correction / unsafe', 'Deduction 0 / 1 / 2 marks'],
      nc: ['Étapes du protocole de toilette respectées', 'Number Possible = 8', 'Hygiene care protocol steps followed', 'Number Possible = 8'],
      rg: ['Température de l’eau du bain', 'Cible 37 °C ; ±1 → 0 ; ±2 → −0,5', 'Bath water temperature', 'Target 37 °C; ±1 → 0; ±2 → −0.5']
    }),
    T('Art Floral', 'Floristry', {
      pf: ['Le bouquet tient seul debout', 'Pass / Fail', 'The bouquet stands on its own', 'Pass / Fail'],
      ch: ['Fraîcheur des fleurs : parfaite / quelques défauts / fanées', 'Déduction 0 % / 40 % / 100 %', 'Flower freshness: perfect / some flaws / wilted', 'Deduction 0% / 40% / 100%'],
      nc: ['Variétés imposées utilisées', 'Number Possible = 5', 'Required varieties used', 'Number Possible = 5'],
      rg: ['Hauteur totale de la composition', 'Cible 600 mm ; ±20 → 0 ; ±40 → −1', 'Total height of the arrangement', 'Target 600 mm; ±20 → 0; ±40 → −1'],
      rd: ['Diamètre du bouquet rond', 'Cible 350 mm ; −0,5 point par pas de 10 mm', 'Round bouquet diameter', 'Target 350 mm; −0.5 mark per 10 mm step']
    }),
    T('Bijouterie-Joaillerie', 'Jewellery', {
      pf: ['Le fermoir s’ouvre et se ferme correctement', 'Pass / Fail', 'The clasp opens and closes correctly', 'Pass / Fail'],
      nc: ['Pierres serties solidement', 'Number Possible = 12', 'Stones set securely', 'Number Possible = 12'],
      rg: ['Diamètre intérieur de la bague', 'Cible 17,20 mm ; ±0,05 → 0 ; ±0,10 → −0,5 ; ±0,20 → −1', 'Ring inner diameter', 'Target 17.20 mm; ±0.05 → 0; ±0.10 → −0.5; ±0.20 → −1'],
      rd: ['Épaisseur de l’anneau', 'Cible 1,5 mm ; −0,25 point par pas de 0,05 mm', 'Band thickness', 'Target 1.5 mm; −0.25 mark per 0.05 mm step'],
      ss: ['Poids de métal économisé (le plus léger gagne)', 'Lowest Value, palier 0,5 g, −0,5 point', 'Metal weight saved (lightest wins)', 'Lowest Value, 0.5 g step, −0.5 mark']
    }),
    T('Boucherie', 'Butchery', {
      pf: ['Chaîne du froid respectée (produit < 4 °C)', 'Pass / Fail', 'Cold chain respected (product < 4 °C)', 'Pass / Fail'],
      ch: ['Parage du morceau : net / quelques défauts / à refaire', 'Déduction 0 / 0,5 / 1,5 point', 'Trimming: clean / some flaws / redo', 'Deduction 0 / 0.5 / 1.5 marks'],
      nc: ['Pièces de découpe conformes à la commande', 'Number Possible = 10', 'Cuts matching the order', 'Number Possible = 10'],
      rg: ['Poids d’une portion de steak', 'Cible 180 g ; ±5 → 0 ; ±10 → −0,5 ; ±15 → −1', 'Steak portion weight', 'Target 180 g; ±5 → 0; ±10 → −0.5; ±15 → −1'],
      ps: ['Rendement de la carcasse (%)', 'Highest Mark to Highest Value', 'Carcass yield (%)', 'Highest Mark to Highest Value']
    }),
    T('Boulangerie', 'Bakery', {
      pf: ['Le pain est cuit à cœur', 'Pass / Fail', 'The bread is baked through', 'Pass / Fail'],
      ch: ['Grigne : régulière / irrégulière / absente', 'Déduction 0 % / 50 % / 100 %', 'Scoring: regular / irregular / missing', 'Deduction 0% / 50% / 100%'],
      nc: ['Baguettes conformes au poids sur la fournée', 'Number Possible = 12', 'Baguettes within weight in the batch', 'Number Possible = 12'],
      rg: ['Poids d’une baguette cuite', 'Cible 250 g ; ±5 → 0 ; ±10 → −0,5 ; ±20 → −1', 'Baked baguette weight', 'Target 250 g; ±5 → 0; ±10 → −0.5; ±20 → −1'],
      rd: ['Longueur de la baguette', 'Cible 650 mm ; −0,25 point par pas de 10 mm', 'Baguette length', 'Target 650 mm; −0.25 mark per 10 mm step']
    }),
    T('CAO-Ingénierie Mécanique', 'Mechanical Engineering CAD', {
      pf: ['La mise en plan est exportée au format demandé', 'Pass / Fail', 'The drawing is exported in the required format', 'Pass / Fail'],
      ch: ['Cotation : complète / incomplète / absente', 'Déduction 0 % / 50 % / 100 %', 'Dimensioning: complete / incomplete / missing', 'Deduction 0% / 50% / 100%'],
      nc: ['Pièces modélisées de l’assemblage', 'Number Possible = 15', 'Assembly parts modelled', 'Number Possible = 15'],
      rg: ['Masse de la pièce calculée par le logiciel', 'Cible 1,250 kg ; ±0,005 → 0 ; ±0,010 → −0,5', 'Part mass computed by the software', 'Target 1.250 kg; ±0.005 → 0; ±0.010 → −0.5']
    }),
    T('Carrelage', 'Wall and Floor Tiling', {
      pf: ['Le carrelage sonne plein (pas de carreau creux)', 'Pass / Fail', 'Tiles sound solid (no hollow tile)', 'Pass / Fail'],
      ch: ['Jointoiement : régulier / quelques défauts / irrégulier', 'Déduction 0 / 0,5 / 1 point', 'Grouting: even / some flaws / uneven', 'Deduction 0 / 0.5 / 1 mark'],
      rg: ['Planéité (écart sous la règle de 2 m)', 'Cible 0 mm ; +1 → 0 ; +2 → −0,5 ; +3 → −1', 'Flatness (gap under 2 m straightedge)', 'Target 0 mm; +1 → 0; +2 → −0.5; +3 → −1'],
      rd: ['Cote d’implantation du motif', 'Cible 450 mm ; −0,5 point par pas de 1 mm', 'Pattern set-out dimension', 'Target 450 mm; −0.5 mark per 1 mm step']
    }),
    T('Charpente', 'Carpentry', {
      pf: ['L’assemblage s’emboîte sans forcer', 'Pass / Fail', 'The joint fits without forcing', 'Pass / Fail'],
      nc: ['Assemblages réalisés', 'Number Possible = 6', 'Joints completed', 'Number Possible = 6'],
      rg: ['Longueur de l’arbalétrier', 'Cible 2 450 mm ; ±1 → 0 ; ±2 → −0,5 ; ±3 → −1', 'Rafter length', 'Target 2,450 mm; ±1 → 0; ±2 → −0.5; ±3 → −1'],
      rd: ['Angle de coupe', 'Cible 45° ; −0,5 point par pas de 0,5°', 'Cutting angle', 'Target 45°; −0.5 mark per 0.5° step'],
      ss: ['Jeu dans l’assemblage (le plus faible gagne)', 'Lowest Value, palier 0,5 mm, −0,5 point', 'Gap in the joint (smallest wins)', 'Lowest Value, 0.5 mm step, −0.5 mark']
    }),
    T('Chaudronnerie', 'Boilermaking (Metal Fabrication)', {
      pf: ['L’ouvrage est étanche au test', 'Pass / Fail', 'The work is leak-tight under test', 'Pass / Fail'],
      ch: ['Aspect des soudures : conforme / défauts mineurs / non conforme', 'Déduction 0 % / 30 % / 100 %', 'Weld appearance: compliant / minor defects / non-compliant', 'Deduction 0% / 30% / 100%'],
      rg: ['Diamètre de la virole', 'Cible 400 mm ; ±1 → 0 ; ±2 → −0,5 ; ±3 → −1', 'Shell diameter', 'Target 400 mm; ±1 → 0; ±2 → −0.5; ±3 → −1'],
      rd: ['Équerrage de la piquage', 'Cible 90° ; −0,5 point par pas de 0,5°', 'Squareness of the branch', 'Target 90°; −0.5 mark per 0.5° step']
    }),
    T('Coiffure', 'Hairdressing', {
      pf: ['Le client est protégé (cape, serviette)', 'Pass / Fail', 'The client is protected (cape, towel)', 'Pass / Fail'],
      ch: ['Couleur obtenue : conforme / proche / hors demande', 'Déduction 0 / 1 / 2 points', 'Colour result: as requested / close / off', 'Deduction 0 / 1 / 2 marks'],
      nc: ['Éléments de la coupe imposée réalisés', 'Number Possible = 6', 'Required haircut elements completed', 'Number Possible = 6'],
      rg: ['Longueur de coupe à la nuque', 'Cible 30 mm ; ±3 → 0 ; ±6 → −0,5', 'Cut length at the nape', 'Target 30 mm; ±3 → 0; ±6 → −0.5'],
      ps: ['Temps de réalisation du chignon', 'Highest Mark to Lowest Value, Maximum Value = 45 min', 'Time to complete the updo', 'Highest Mark to Lowest Value, Maximum Value = 45 min']
    }),
    T('Construction Béton Armé', 'Concrete Construction Work', {
      pf: ['Le coffrage est stable avant coulage', 'Pass / Fail', 'The formwork is stable before pouring', 'Pass / Fail'],
      nc: ['Armatures correctement positionnées', 'Number Possible = 20', 'Reinforcement bars correctly positioned', 'Number Possible = 20'],
      rg: ['Hauteur du voile', 'Cible 1 200 mm ; ±3 → 0 ; ±6 → −0,5 ; ±10 → −1', 'Wall height', 'Target 1,200 mm; ±3 → 0; ±6 → −0.5; ±10 → −1'],
      rd: ['Enrobage des aciers', 'Cible 30 mm ; −0,5 point par pas de 5 mm', 'Concrete cover', 'Target 30 mm; −0.5 mark per 5 mm step']
    }),
    T('Construction Digitale', 'Digital Construction', {
      pf: ['La maquette BIM s’ouvre sans erreur dans la visionneuse', 'Pass / Fail', 'The BIM model opens without errors in the viewer', 'Pass / Fail'],
      ch: ['Nomenclature des objets : conforme / partielle / absente', 'Déduction 0 % / 50 % / 100 %', 'Object naming: compliant / partial / missing', 'Deduction 0% / 50% / 100%'],
      nc: ['Conflits (clashes) résolus', 'Number Possible = 10', 'Clashes resolved', 'Number Possible = 10'],
      rg: ['Surface de plancher calculée', 'Cible 125,0 m² ; ±0,5 → 0 ; ±1 → −0,5', 'Calculated floor area', 'Target 125.0 m²; ±0.5 → 0; ±1 → −0.5']
    }),
    T('Couverture Métallique', 'Metal Roofing', {
      pf: ['Le relevé est étanche à l’arrosage', 'Pass / Fail', 'The upstand is watertight when sprayed', 'Pass / Fail'],
      ch: ['Agrafures : régulières / quelques défauts / non conformes', 'Déduction 0 / 0,5 / 1,5 point', 'Seams: even / some flaws / non-compliant', 'Deduction 0 / 0.5 / 1.5 marks'],
      rg: ['Largeur de la bande', 'Cible 500 mm ; ±1 → 0 ; ±2 → −0,5 ; ±3 → −1', 'Strip width', 'Target 500 mm; ±1 → 0; ±2 → −0.5; ±3 → −1'],
      rd: ['Hauteur de l’agrafure', 'Cible 25 mm ; −0,25 point par pas de 1 mm', 'Seam height', 'Target 25 mm; −0.25 mark per 1 mm step']
    }),
    T('Cuisine', 'Cooking', {
      pf: ['Plat servi dans le créneau horaire', 'Pass / Fail', 'Dish served within the time slot', 'Pass / Fail'],
      ch: ['Cuisson de la viande : à point / trop / pas assez', 'Déduction 0 % / 50 % / 50 %', 'Meat cooking: as requested / over / under', 'Deduction 0% / 50% / 50%'],
      nc: ['Assiettes dressées à l’identique', 'Number Possible = 6', 'Identical plates presented', 'Number Possible = 6'],
      rg: ['Poids de la portion de garniture', 'Cible 120 g ; ±5 → 0 ; ±10 → −0,5', 'Side dish portion weight', 'Target 120 g; ±5 → 0; ±10 → −0.5'],
      rd: ['Température à cœur du plat', 'Cible 63 °C ; −0,5 point par pas de 2 °C', 'Core temperature of the dish', 'Target 63 °C; −0.5 mark per 2 °C step']
    }),
    T('Cyber Sécurité', 'Cyber Security', {
      pf: ['Le flag de l’épreuve est trouvé', 'Pass / Fail', 'The challenge flag is found', 'Pass / Fail'],
      ch: ['Rapport d’incident : complet / incomplet / absent', 'Déduction 0 % / 50 % / 100 %', 'Incident report: complete / incomplete / missing', 'Deduction 0% / 50% / 100%'],
      nc: ['Vulnérabilités corrigées', 'Number Possible = 8', 'Vulnerabilities fixed', 'Number Possible = 8'],
      ps: ['Temps de détection de l’intrusion', 'Highest Mark to Lowest Value', 'Time to detect the intrusion', 'Highest Mark to Lowest Value']
    }),
    T('Design graphique', 'Graphic Design Technology', {
      pf: ['Le fichier est livré en PDF/X avec fonds perdus', 'Pass / Fail', 'File delivered as PDF/X with bleed', 'Pass / Fail'],
      ch: ['Respect de la charte : total / partiel / non respecté', 'Déduction 0 % / 50 % / 100 %', 'Brand guidelines: fully / partly / not followed', 'Deduction 0% / 50% / 100%'],
      nc: ['Déclinaisons livrées', 'Number Possible = 4', 'Variants delivered', 'Number Possible = 4'],
      rg: ['Fonds perdus du document', 'Cible 3 mm ; ±0 → 0 ; ±1 → −0,5', 'Document bleed', 'Target 3 mm; ±0 → 0; ±1 → −0.5']
    }),
    T('Ébénisterie', 'Cabinetmaking', {
      pf: ['Le tiroir coulisse sans point dur', 'Pass / Fail', 'The drawer slides smoothly', 'Pass / Fail'],
      ch: ['Finition : parfaite / traces légères / défauts visibles', 'Déduction 0 / 0,5 / 1 point', 'Finish: perfect / light marks / visible defects', 'Deduction 0 / 0.5 / 1 mark'],
      rg: ['Hauteur du caisson', 'Cible 720 mm ; ±0,5 → 0 ; ±1 → −0,5 ; ±1,5 → −1', 'Cabinet height', 'Target 720 mm; ±0.5 → 0; ±1 → −0.5; ±1.5 → −1'],
      rd: ['Diagonales du cadre (écart)', 'Cible 0 mm ; −0,5 point par pas de 0,5 mm', 'Frame diagonals (difference)', 'Target 0 mm; −0.5 mark per 0.5 mm step'],
      ss: ['Jeu des portes (le plus régulier gagne)', 'Lowest Value, palier 0,5 mm, −0,25 point', 'Door gaps (most even wins)', 'Lowest Value, 0.5 mm step, −0.25 mark']
    }),
    T('Électronique', 'Electronics', {
      pf: ['La carte fonctionne à la mise sous tension', 'Pass / Fail', 'The board works at power-up', 'Pass / Fail'],
      ch: ['Qualité des soudures : IPC classe 3 / classe 2 / non conforme', 'Déduction 0 % / 40 % / 100 %', 'Solder quality: IPC class 3 / class 2 / non-compliant', 'Deduction 0% / 40% / 100%'],
      nc: ['Composants correctement implantés', 'Number Possible = 40', 'Components correctly placed', 'Number Possible = 40'],
      rg: ['Tension de sortie de l’alimentation', 'Cible 5,00 V ; ±0,05 → 0 ; ±0,10 → −0,5 ; ±0,20 → −1', 'Power supply output voltage', 'Target 5.00 V; ±0.05 → 0; ±0.10 → −0.5; ±0.20 → −1'],
      rd: ['Fréquence de l’oscillateur', 'Cible 1 000 Hz ; écart en % : −0,5 point par pas de 1 %', 'Oscillator frequency', 'Target 1,000 Hz; percentage difference: −0.5 mark per 1% step']
    }),
    T('Electrotechnique et automatismes industriels', 'Industrial Control', {
      pf: ['Le programme démarre le cycle automatique', 'Pass / Fail', 'The program starts the automatic cycle', 'Pass / Fail'],
      ch: ['Repérage des fils : complet / partiel / absent', 'Déduction 0 % / 50 % / 100 %', 'Wire marking: complete / partial / missing', 'Deduction 0% / 50% / 100%'],
      nc: ['Fonctions du cahier des charges réalisées', 'Number Possible = 12', 'Specified functions working', 'Number Possible = 12'],
      rg: ['Hauteur de pose de la goulotte', 'Cible 1 100 mm ; ±2 → 0 ; ±5 → −0,5', 'Trunking installation height', 'Target 1,100 mm; ±2 → 0; ±5 → −0.5']
    }),
    T('Fabrication Additive', 'Additive Manufacturing', {
      pf: ['La pièce imprimée s’assemble avec la pièce de référence', 'Pass / Fail', 'The printed part fits the reference part', 'Pass / Fail'],
      nc: ['Fonctions de la pièce validées', 'Number Possible = 5', 'Part features validated', 'Number Possible = 5'],
      rg: ['Cote critique de la pièce', 'Cible 25,00 mm ; ±0,10 → 0 ; ±0,20 → −0,5 ; ±0,30 → −1', 'Critical part dimension', 'Target 25.00 mm; ±0.10 → 0; ±0.20 → −0.5; ±0.30 → −1'],
      ps: ['Masse de matière utilisée', 'Highest Mark to Lowest Value', 'Material mass used', 'Highest Mark to Lowest Value'],
      ss: ['Temps d’impression (le plus court gagne)', 'Lowest Value, palier 10 %, −0,5 point', 'Print time (shortest wins)', 'Lowest Value, 10% step, −0.5 mark']
    }),
    T('Fraisage', 'CNC Milling', {
      pf: ['La pièce est complète (toutes les opérations)', 'Pass / Fail', 'The part is complete (all operations)', 'Pass / Fail'],
      nc: ['Cotes fonctionnelles dans la tolérance', 'Number Possible = 20', 'Functional dimensions within tolerance', 'Number Possible = 20'],
      rg: ['Cote 40 h7', 'Cible 39,988 mm ; ±0,012 → 0 ; ±0,025 → −0,5 ; ±0,050 → −1', 'Dimension 40 h7', 'Target 39.988 mm; ±0.012 → 0; ±0.025 → −0.5; ±0.050 → −1'],
      rd: ['Rugosité Ra', 'Cible 0,8 µm ; −0,5 point par pas de 0,4 µm', 'Surface roughness Ra', 'Target 0.8 µm; −0.5 mark per 0.4 µm step']
    }),
    T('Horticulture', 'Horticulture', {
      pf: ['Les plants sont arrosés après plantation', 'Pass / Fail', 'Plants are watered after planting', 'Pass / Fail'],
      ch: ['Identification des végétaux : correcte / partielle / fausse', 'Déduction 0 / 0,5 / 1 point', 'Plant identification: correct / partial / wrong', 'Deduction 0 / 0.5 / 1 mark'],
      nc: ['Végétaux correctement nommés', 'Number Possible = 20', 'Plants correctly named', 'Number Possible = 20'],
      rg: ['Espacement des plants', 'Cible 300 mm ; ±10 → 0 ; ±20 → −0,5', 'Plant spacing', 'Target 300 mm; ±10 → 0; ±20 → −0.5']
    }),
    T('Imprimerie', 'Print Media Technology', {
      pf: ['Le BAT est validé avant tirage', 'Pass / Fail', 'The proof is approved before printing', 'Pass / Fail'],
      ch: ['Repérage des couleurs : parfait / léger décalage / hors tolérance', 'Déduction 0 % / 40 % / 100 %', 'Colour registration: perfect / slight shift / out of tolerance', 'Deduction 0% / 40% / 100%'],
      nc: ['Exemplaires conformes sur le tirage', 'Number Possible = 50', 'Compliant copies in the run', 'Number Possible = 50'],
      rg: ['Densité du noir', 'Cible 1,80 ; ±0,05 → 0 ; ±0,10 → −0,5', 'Black ink density', 'Target 1.80; ±0.05 → 0; ±0.10 → −0.5'],
      ps: ['Temps de calage de la presse', 'Highest Mark to Lowest Value', 'Press make-ready time', 'Highest Mark to Lowest Value']
    }),
    T('Installation Électrique', 'Electrical Installations', {
      pf: ['Le différentiel déclenche au test', 'Pass / Fail', 'The RCD trips at test', 'Pass / Fail'],
      ch: ['Raccordement des conducteurs : conforme / à reprendre / dangereux', 'Déduction 0 / 1 / 2 points', 'Conductor connections: compliant / to redo / dangerous', 'Deduction 0 / 1 / 2 marks'],
      nc: ['Circuits fonctionnels', 'Number Possible = 10', 'Working circuits', 'Number Possible = 10'],
      rg: ['Hauteur de l’interrupteur', 'Cible 1 100 mm ; ±3 → 0 ; ±6 → −0,5 ; ±10 → −1', 'Switch height', 'Target 1,100 mm; ±3 → 0; ±6 → −0.5; ±10 → −1'],
      rd: ['Entraxe des boîtiers', 'Cible 71 mm ; −0,25 point par pas de 1 mm', 'Box centre distance', 'Target 71 mm; −0.25 mark per 1 mm step']
    }),
    T('Intégration Robotique', 'Robot Systems Integration', {
      pf: ['Le robot s’arrête à l’ouverture de la porte de sécurité', 'Pass / Fail', 'The robot stops when the safety door opens', 'Pass / Fail'],
      nc: ['Pièces correctement palettisées', 'Number Possible = 16', 'Parts correctly palletised', 'Number Possible = 16'],
      rg: ['Précision de dépose', 'Cible 0 mm ; +0,5 → 0 ; +1 → −0,5 ; +2 → −1', 'Placement accuracy', 'Target 0 mm; +0.5 → 0; +1 → −0.5; +2 → −1'],
      ps: ['Temps de cycle', 'Highest Mark to Lowest Value, Maximum Value = 60 s', 'Cycle time', 'Highest Mark to Lowest Value, Maximum Value = 60 s'],
      ss: ['Temps de cycle (variante par paliers)', 'Lowest Value, palier 2 s, −0,5 point', 'Cycle time (stepped variant)', 'Lowest Value, 2 s step, −0.5 mark']
    }),
    T('Jardinier-Paysagiste', 'Landscape Gardening', {
      pf: ['Le bassin est étanche après remplissage', 'Pass / Fail', 'The pond is watertight after filling', 'Pass / Fail'],
      ch: ['Joints du pavage : réguliers / irréguliers / non remplis', 'Déduction 0 % / 50 % / 100 %', 'Paving joints: even / uneven / unfilled', 'Deduction 0% / 50% / 100%'],
      rg: ['Niveau fini de la terrasse', 'Cible 0 mm (repère) ; ±2 → 0 ; ±5 → −0,5 ; ±8 → −1', 'Finished terrace level', 'Target 0 mm (datum); ±2 → 0; ±5 → −0.5; ±8 → −1'],
      rd: ['Pente d’écoulement', 'Cible 2 % ; −0,5 point par pas de 0,5 %', 'Drainage slope', 'Target 2%; −0.5 mark per 0.5% step']
    }),
    T('Maçonnerie', 'Bricklaying', {
      pf: ['Le mur est d’aplomb au contrôle', 'Pass / Fail', 'The wall is plumb when checked', 'Pass / Fail'],
      ch: ['Remplissage des joints : plein / partiel / vide', 'Déduction 0 / 0,5 / 1 point', 'Joint filling: full / partial / empty', 'Deduction 0 / 0.5 / 1 mark'],
      rg: ['Hauteur du mur', 'Cible 1 000 mm ; ±1 → 0 ; ±2 → −0,5 ; ±3 → −1', 'Wall height', 'Target 1,000 mm; ±1 → 0; ±2 → −0.5; ±3 → −1'],
      rd: ['Niveau d’une assise', 'Cible 0 mm ; −0,5 point par pas de 1 mm', 'Course level', 'Target 0 mm; −0.5 mark per 1 mm step']
    }),
    T('Maintenance Aéronautique', 'Aircraft Maintenance', {
      pf: ['Le freinage au fil est conforme', 'Pass / Fail', 'Safety wiring is compliant', 'Pass / Fail'],
      ch: ['Documentation de maintenance : complète / incomplète / absente', 'Déduction 0 % / 50 % / 100 %', 'Maintenance records: complete / incomplete / missing', 'Deduction 0% / 50% / 100%'],
      nc: ['Points de la check-list réalisés', 'Number Possible = 25', 'Checklist items completed', 'Number Possible = 25'],
      rg: ['Couple de serrage', 'Cible 25 N·m ; ±0,5 → 0 ; ±1 → −0,5 ; ±2 → −1', 'Tightening torque', 'Target 25 N·m; ±0.5 → 0; ±1 → −0.5; ±2 → −1']
    }),
    T('Maintenance des Matériels', 'Agricultural and Construction Machinery Maintenance', {
      pf: ['Le moteur démarre après intervention', 'Pass / Fail', 'The engine starts after the repair', 'Pass / Fail'],
      ch: ['Diagnostic : juste / partiel / faux', 'Déduction 0 / 1 / 2 points', 'Diagnosis: correct / partial / wrong', 'Deduction 0 / 1 / 2 marks'],
      nc: ['Pannes identifiées', 'Number Possible = 4', 'Faults identified', 'Number Possible = 4'],
      rg: ['Pression hydraulique réglée', 'Cible 180 bar ; ±2 → 0 ; ±5 → −0,5', 'Set hydraulic pressure', 'Target 180 bar; ±2 → 0; ±5 → −0.5'],
      ps: ['Temps de diagnostic', 'Highest Mark to Lowest Value', 'Diagnosis time', 'Highest Mark to Lowest Value']
    }),
    T('Maintenance Industrielle', 'Industrial Mechanic Millwright', {
      pf: ['La machine redémarre sans défaut', 'Pass / Fail', 'The machine restarts without fault', 'Pass / Fail'],
      nc: ['Étapes de consignation respectées', 'Number Possible = 6', 'Lock-out steps followed', 'Number Possible = 6'],
      rg: ['Alignement des arbres', 'Cible 0 mm ; +0,05 → 0 ; +0,10 → −0,5 ; +0,20 → −1', 'Shaft alignment', 'Target 0 mm; +0.05 → 0; +0.10 → −0.5; +0.20 → −1'],
      rd: ['Tension de courroie (flèche)', 'Cible 8 mm ; −0,5 point par pas de 1 mm', 'Belt tension (deflection)', 'Target 8 mm; −0.5 mark per 1 mm step'],
      ps: ['Temps de remise en service', 'Highest Mark to Lowest Value', 'Time back in service', 'Highest Mark to Lowest Value']
    }),
    T('Maroquinerie', 'Leather Goods', {
      pf: ['La fermeture éclair fonctionne', 'Pass / Fail', 'The zip works', 'Pass / Fail'],
      ch: ['Couture : régulière / quelques points irréguliers / irrégulière', 'Déduction 0 / 0,5 / 1 point', 'Stitching: even / some uneven stitches / uneven', 'Deduction 0 / 0.5 / 1 mark'],
      nc: ['Pièces découpées conformes au gabarit', 'Number Possible = 12', 'Pieces cut to template', 'Number Possible = 12'],
      rg: ['Largeur de la sangle', 'Cible 30 mm ; ±0,5 → 0 ; ±1 → −0,5', 'Strap width', 'Target 30 mm; ±0.5 → 0; ±1 → −0.5'],
      rd: ['Pas de couture (points par 10 cm)', 'Cible 30 ; −0,25 point par pas de 2 points', 'Stitch pitch (stitches per 10 cm)', 'Target 30; −0.25 mark per 2-stitch step']
    }),
    T('Mécatronique', 'Mechatronics', {
      pf: ['Le poste fonctionne en mode automatique', 'Pass / Fail', 'The station runs in automatic mode', 'Pass / Fail'],
      nc: ['Fonctions du cahier des charges validées', 'Number Possible = 10', 'Specified functions validated', 'Number Possible = 10'],
      rg: ['Pression réglée sur le régulateur', 'Cible 6 bar ; ±0,2 → 0 ; ±0,5 → −0,5', 'Regulator pressure setting', 'Target 6 bar; ±0.2 → 0; ±0.5 → −0.5'],
      ps: ['Temps de mise en service', 'Highest Mark to Lowest Value', 'Commissioning time', 'Highest Mark to Lowest Value'],
      ss: ['Temps de dépannage (le plus rapide gagne)', 'Lowest Value, palier 1 min, −0,5 point', 'Troubleshooting time (fastest wins)', 'Lowest Value, 1 min step, −0.5 mark']
    }),
    T('Menuiserie', 'Joinery', {
      pf: ['La fenêtre s’ouvre et se ferme sans forcer', 'Pass / Fail', 'The window opens and closes freely', 'Pass / Fail'],
      ch: ['Assemblage tenon-mortaise : serré / léger jeu / jeu visible', 'Déduction 0 / 0,5 / 1 point', 'Mortise and tenon joint: tight / slight gap / visible gap', 'Deduction 0 / 0.5 / 1 mark'],
      rg: ['Largeur du dormant', 'Cible 900 mm ; ±0,5 → 0 ; ±1 → −0,5 ; ±2 → −1', 'Frame width', 'Target 900 mm; ±0.5 → 0; ±1 → −0.5; ±2 → −1'],
      rd: ['Équerrage (écart des diagonales)', 'Cible 0 mm ; −0,5 point par pas de 0,5 mm', 'Squareness (diagonal difference)', 'Target 0 mm; −0.5 mark per 0.5 mm step']
    }),
    T('Métallerie', 'Construction Metal Work', {
      pf: ['Le garde-corps résiste à la poussée d’essai', 'Pass / Fail', 'The railing withstands the test push', 'Pass / Fail'],
      ch: ['Soudures : continues / quelques défauts / non conformes', 'Déduction 0 % / 30 % / 100 %', 'Welds: continuous / some defects / non-compliant', 'Deduction 0% / 30% / 100%'],
      rg: ['Hauteur du garde-corps', 'Cible 1 000 mm ; ±1 → 0 ; ±2 → −0,5 ; ±3 → −1', 'Railing height', 'Target 1,000 mm; ±1 → 0; ±2 → −0.5; ±3 → −1'],
      rd: ['Espacement des barreaux', 'Cible 110 mm ; −0,25 point par pas de 1 mm', 'Baluster spacing', 'Target 110 mm; −0.25 mark per 1 mm step']
    }),
    T('Métiers de la Propreté', 'Cleaning Services', {
      pf: ['Le balisage de sécurité est installé', 'Pass / Fail', 'Safety signage is in place', 'Pass / Fail'],
      ch: ['État de la surface : propre / traces / sale', 'Déduction 0 % / 50 % / 100 %', 'Surface condition: clean / streaks / dirty', 'Deduction 0% / 50% / 100%'],
      nc: ['Zones du plan de nettoyage traitées', 'Number Possible = 8', 'Cleaning plan areas done', 'Number Possible = 8'],
      rg: ['Dosage du produit (ml pour 5 l)', 'Cible 25 ml ; ±2 → 0 ; ±5 → −0,5', 'Product dosage (ml per 5 l)', 'Target 25 ml; ±2 → 0; ±5 → −0.5'],
      ps: ['Temps de nettoyage de la pièce', 'Highest Mark to Lowest Value', 'Room cleaning time', 'Highest Mark to Lowest Value']
    }),
    T('Miroiterie', 'Glazing', {
      pf: ['Le vitrage est posé sans casse', 'Pass / Fail', 'The glass is fitted without breakage', 'Pass / Fail'],
      ch: ['Joint silicone : lisse / irrégulier / discontinu', 'Déduction 0 / 0,5 / 1 point', 'Silicone joint: smooth / uneven / broken', 'Deduction 0 / 0.5 / 1 mark'],
      rg: ['Dimension du verre découpé', 'Cible 600 mm ; ±0,5 → 0 ; ±1 → −0,5 ; ±2 → −1', 'Cut glass dimension', 'Target 600 mm; ±0.5 → 0; ±1 → −0.5; ±2 → −1'],
      rd: ['Jeu périphérique', 'Cible 3 mm ; −0,25 point par pas de 0,5 mm', 'Edge clearance', 'Target 3 mm; −0.25 mark per 0.5 mm step']
    }),
    T('Mode et Création', 'Fashion Technology', {
      pf: ['Le vêtement s’enfile sans gêne sur le mannequin', 'Pass / Fail', 'The garment fits on the mannequin', 'Pass / Fail'],
      ch: ['Finitions intérieures : propres / quelques fils / non finies', 'Déduction 0 / 0,5 / 1 point', 'Inside finish: clean / some threads / unfinished', 'Deduction 0 / 0.5 / 1 mark'],
      nc: ['Éléments du dossier technique livrés', 'Number Possible = 6', 'Tech pack items delivered', 'Number Possible = 6'],
      rg: ['Longueur de la jupe', 'Cible 600 mm ; ±3 → 0 ; ±6 → −0,5 ; ±10 → −1', 'Skirt length', 'Target 600 mm; ±3 → 0; ±6 → −0.5; ±10 → −1'],
      rd: ['Largeur de l’ourlet', 'Cible 30 mm ; −0,25 point par pas de 2 mm', 'Hem width', 'Target 30 mm; −0.25 mark per 2 mm step']
    }),
    T('Patisserie confiserie', 'Pastry and Confectionery', {
      pf: ['Le chocolat est tempéré (brillant, cassant)', 'Pass / Fail', 'The chocolate is tempered (glossy, snaps)', 'Pass / Fail'],
      ch: ['Glaçage : lisse / quelques défauts / irrégulier', 'Déduction 0 % / 40 % / 100 %', 'Glaze: smooth / some flaws / uneven', 'Deduction 0% / 40% / 100%'],
      nc: ['Pièces identiques présentées', 'Number Possible = 10', 'Identical pieces presented', 'Number Possible = 10'],
      rg: ['Poids d’un bonbon de chocolat', 'Cible 10 g ; ±0,5 → 0 ; ±1 → −0,5', 'Chocolate bonbon weight', 'Target 10 g; ±0.5 → 0; ±1 → −0.5'],
      rd: ['Hauteur de l’entremets', 'Cible 50 mm ; −0,5 point par pas de 2 mm', 'Entremets height', 'Target 50 mm; −0.5 mark per 2 mm step'],
      ss: ['Hauteur de la pièce artistique (la plus haute gagne)', 'Highest Value, palier 50 mm, −0,5 point', 'Showpiece height (tallest wins)', 'Highest Value, 50 mm step, −0.5 mark']
    }),
    T('Peinture Automobile', 'Car Painting', {
      pf: ['Le masquage protège toutes les zones', 'Pass / Fail', 'Masking protects all areas', 'Pass / Fail'],
      ch: ['Teinte : identique / légère différence / différente', 'Déduction 0 % / 50 % / 100 %', 'Colour match: identical / slight difference / different', 'Deduction 0% / 50% / 100%'],
      nc: ['Défauts de peinture corrigés', 'Number Possible = 5', 'Paint defects repaired', 'Number Possible = 5'],
      rg: ['Épaisseur du film (µm)', 'Cible 120 µm ; ±10 → 0 ; ±20 → −0,5 ; ±30 → −1', 'Film thickness (µm)', 'Target 120 µm; ±10 → 0; ±20 → −0.5; ±30 → −1'],
      ps: ['Quantité de peinture consommée', 'Highest Mark to Lowest Value', 'Paint quantity used', 'Highest Mark to Lowest Value']
    }),
    T('Peinture et Décoration', 'Painting and Decorating', {
      pf: ['Le support est protégé (bâches, adhésif)', 'Pass / Fail', 'The area is protected (sheets, tape)', 'Pass / Fail'],
      ch: ['Rechampi : net / quelques bavures / irrégulier', 'Déduction 0 / 0,5 / 1 point', 'Cutting-in: sharp / some smudges / uneven', 'Deduction 0 / 0.5 / 1 mark'],
      rg: ['Position du filet décoratif', 'Cible 1 200 mm ; ±1 → 0 ; ±2 → −0,5 ; ±3 → −1', 'Decorative line position', 'Target 1,200 mm; ±1 → 0; ±2 → −0.5; ±3 → −1'],
      rd: ['Largeur du filet', 'Cible 10 mm ; −0,25 point par pas de 0,5 mm', 'Line width', 'Target 10 mm; −0.25 mark per 0.5 mm step']
    }),
    T('Plâtrerie et Constructions Sèches', 'Plastering and Drywall Systems', {
      pf: ['La cloison est d’aplomb au contrôle', 'Pass / Fail', 'The partition is plumb when checked', 'Pass / Fail'],
      ch: ['Bandes : invisibles / légèrement visibles / visibles', 'Déduction 0 / 0,5 / 1 point', 'Joint tape: invisible / slightly visible / visible', 'Deduction 0 / 0.5 / 1 mark'],
      rg: ['Hauteur de l’ouverture', 'Cible 2 040 mm ; ±2 → 0 ; ±4 → −0,5 ; ±6 → −1', 'Opening height', 'Target 2,040 mm; ±2 → 0; ±4 → −0.5; ±6 → −1'],
      rd: ['Entraxe des montants', 'Cible 600 mm ; −0,25 point par pas de 2 mm', 'Stud spacing', 'Target 600 mm; −0.25 mark per 2 mm step']
    }),
    T('Plomberie et Chauffage', 'Plumbing and Heating', {
      pf: ['L’installation est étanche à l’essai de pression', 'Pass / Fail', 'The installation is leak-tight under pressure test', 'Pass / Fail'],
      ch: ['Cintrage : régulier / légèrement ovalisé / écrasé', 'Déduction 0 % / 40 % / 100 %', 'Pipe bend: smooth / slightly oval / crushed', 'Deduction 0% / 40% / 100%'],
      nc: ['Raccords réalisés sans fuite', 'Number Possible = 12', 'Joints made without leaks', 'Number Possible = 12'],
      rg: ['Cote d’axe du robinet', 'Cible 150 mm ; ±1 → 0 ; ±2 → −0,5 ; ±3 → −1', 'Tap centre dimension', 'Target 150 mm; ±1 → 0; ±2 → −0.5; ±3 → −1'],
      rd: ['Pente de l’évacuation', 'Cible 2 % ; −0,5 point par pas de 0,5 %', 'Waste pipe slope', 'Target 2%; −0.5 mark per 0.5% step']
    }),
    T('Radioprotection en environnement nucléaire', 'Radiation Protection in Nuclear Environment', {
      pf: ['Le contrôle de non-contamination est réalisé en sortie', 'Pass / Fail', 'Exit contamination check is performed', 'Pass / Fail'],
      ch: ['Habillage de la tenue : conforme / écart mineur / écart majeur', 'Déduction 0 / 1 / 2 points', 'Protective suit dressing: compliant / minor deviation / major deviation', 'Deduction 0 / 1 / 2 marks'],
      nc: ['Points de mesure du plan de zonage relevés', 'Number Possible = 10', 'Zoning plan measuring points recorded', 'Number Possible = 10'],
      rg: ['Débit de dose mesuré', 'Cible 25 µSv/h ; ±1 → 0 ; ±3 → −0,5', 'Measured dose rate', 'Target 25 µSv/h; ±1 → 0; ±3 → −0.5'],
      ps: ['Dose reçue pendant l’intervention', 'Highest Mark to Lowest Value', 'Dose received during the task', 'Highest Mark to Lowest Value']
    }),
    T('Réfrigération Technique', 'Refrigeration and Air Conditioning', {
      pf: ['Le circuit tient le vide', 'Pass / Fail', 'The circuit holds vacuum', 'Pass / Fail'],
      ch: ['Brasures : propres / quelques excès / non conformes', 'Déduction 0 / 0,5 / 1,5 point', 'Brazing: clean / some excess / non-compliant', 'Deduction 0 / 0.5 / 1.5 marks'],
      nc: ['Brasures étanches', 'Number Possible = 10', 'Leak-free brazed joints', 'Number Possible = 10'],
      rg: ['Surchauffe réglée', 'Cible 6 K ; ±1 → 0 ; ±2 → −0,5 ; ±3 → −1', 'Superheat setting', 'Target 6 K; ±1 → 0; ±2 → −0.5; ±3 → −1'],
      rd: ['Charge en fluide', 'Cible 1 200 g ; −0,5 point par pas de 20 g', 'Refrigerant charge', 'Target 1,200 g; −0.5 mark per 20 g step']
    }),
    T('Service en Restaurant', 'Restaurant Service', {
      pf: ['Le vin est servi à la bonne température', 'Pass / Fail', 'Wine served at the right temperature', 'Pass / Fail'],
      ch: ['Mise en place de la table : parfaite / 1-2 oublis / incomplète', 'Déduction 0 / 0,5 / 1,5 point', 'Table setting: perfect / 1–2 items missing / incomplete', 'Deduction 0 / 0.5 / 1.5 marks'],
      nc: ['Cocktails conformes à la recette', 'Number Possible = 4', 'Cocktails matching the recipe', 'Number Possible = 4'],
      rg: ['Dose servie (cl)', 'Cible 12 cl ; ±0,5 → 0 ; ±1 → −0,5', 'Serving size (cl)', 'Target 12 cl; ±0.5 → 0; ±1 → −0.5'],
      ps: ['Temps de dressage de la table', 'Highest Mark to Lowest Value', 'Table set-up time', 'Highest Mark to Lowest Value']
    }),
    T('Soins Esthétiques', 'Beauty Therapy', {
      pf: ['Le poste est désinfecté avant le soin', 'Pass / Fail', 'The station is disinfected before treatment', 'Pass / Fail'],
      ch: ['Pose de vernis : nette / débords légers / débords visibles', 'Déduction 0 % / 40 % / 100 %', 'Nail polish: clean / slight overspill / visible overspill', 'Deduction 0% / 40% / 100%'],
      nc: ['Étapes du protocole de soin respectées', 'Number Possible = 10', 'Treatment protocol steps followed', 'Number Possible = 10'],
      ps: ['Temps du maquillage', 'Highest Mark to Lowest Value, Maximum Value = 60 min', 'Make-up time', 'Highest Mark to Lowest Value, Maximum Value = 60 min']
    }),
    T('Soins Infirmiers', 'Nursing', {
      pf: ['L’identité du patient est vérifiée avant le soin', 'Pass / Fail', 'Patient identity is checked before care', 'Pass / Fail'],
      ch: ['Calcul de dose : juste / erreur corrigée / erreur', 'Déduction 0 % / 50 % / 100 %', 'Dose calculation: correct / corrected error / error', 'Deduction 0% / 50% / 100%'],
      nc: ['Étapes de l’asepsie respectées', 'Number Possible = 8', 'Aseptic steps followed', 'Number Possible = 8'],
      rg: ['Débit de perfusion réglé', 'Cible 21 gouttes/min ; ±1 → 0 ; ±2 → −0,5', 'Infusion rate set', 'Target 21 drops/min; ±1 → 0; ±2 → −0.5']
    }),
    T('Solier', 'Floor Laying', {
      pf: ['Le revêtement adhère sur toute la surface', 'Pass / Fail', 'The covering adheres over the whole surface', 'Pass / Fail'],
      ch: ['Soudure à chaud : régulière / quelques défauts / irrégulière', 'Déduction 0 / 0,5 / 1 point', 'Hot weld: even / some flaws / uneven', 'Deduction 0 / 0.5 / 1 mark'],
      rg: ['Position du motif incrusté', 'Cible 500 mm ; ±1 → 0 ; ±2 → −0,5 ; ±3 → −1', 'Inlaid pattern position', 'Target 500 mm; ±1 → 0; ±2 → −0.5; ±3 → −1'],
      rd: ['Jeu en périphérie', 'Cible 0 mm ; −0,25 point par pas de 0,5 mm', 'Perimeter gap', 'Target 0 mm; −0.25 mark per 0.5 mm step']
    }),
    T('Soudage', 'Welding', {
      pf: ['L’éprouvette est étanche au test', 'Pass / Fail', 'The test piece is leak-tight', 'Pass / Fail'],
      ch: ['Contrôle radio : sans défaut / défaut acceptable / défaut rédhibitoire', 'Déduction 0 % / 50 % / 100 %', 'X-ray test: no defect / acceptable defect / rejectable defect', 'Deduction 0% / 50% / 100%'],
      rg: ['Gorge de la soudure d’angle', 'Cible 5 mm ; ±0,5 → 0 ; ±1 → −0,5 ; ±1,5 → −1', 'Fillet weld throat', 'Target 5 mm; ±0.5 → 0; ±1 → −0.5; ±1.5 → −1'],
      rd: ['Déformation angulaire', 'Cible 0° ; −0,5 point par pas de 1°', 'Angular distortion', 'Target 0°; −0.5 mark per 1° step']
    }),
    T('Taille de Pierre', 'Stonemasonry', {
      pf: ['Les arêtes sont vives (pas d’épaufrure)', 'Pass / Fail', 'Edges are sharp (no chipping)', 'Pass / Fail'],
      ch: ['Parement : régulier / quelques traces / irrégulier', 'Déduction 0 / 0,5 / 1 point', 'Face finish: even / some marks / uneven', 'Deduction 0 / 0.5 / 1 mark'],
      rg: ['Longueur du bloc', 'Cible 400 mm ; ±0,5 → 0 ; ±1 → −0,5 ; ±2 → −1', 'Block length', 'Target 400 mm; ±0.5 → 0; ±1 → −0.5; ±2 → −1'],
      rd: ['Planéité d’une face', 'Cible 0 mm ; −0,5 point par pas de 0,5 mm', 'Face flatness', 'Target 0 mm; −0.5 mark per 0.5 mm step']
    }),
    T('Technologie Automobile', 'Automobile Technology', {
      pf: ['Le véhicule démarre après réparation', 'Pass / Fail', 'The vehicle starts after repair', 'Pass / Fail'],
      ch: ['Diagnostic : complet / partiel / erroné', 'Déduction 0 / 1 / 2 points', 'Diagnosis: complete / partial / wrong', 'Deduction 0 / 1 / 2 marks'],
      nc: ['Pannes trouvées sur le véhicule', 'Number Possible = 3', 'Faults found on the vehicle', 'Number Possible = 3'],
      rg: ['Couple de serrage de la culasse', 'Cible 90 N·m ; ±2 → 0 ; ±5 → −0,5', 'Cylinder head torque', 'Target 90 N·m; ±2 → 0; ±5 → −0.5'],
      ps: ['Temps de diagnostic', 'Highest Mark to Lowest Value, Maximum Value = 30 min', 'Diagnosis time', 'Highest Mark to Lowest Value, Maximum Value = 30 min']
    }),
    T('Technologie des Véhicules Industriels', 'Heavy Vehicle Technology', {
      pf: ['Le circuit de freinage pneumatique est étanche', 'Pass / Fail', 'The air brake circuit is leak-tight', 'Pass / Fail'],
      ch: ['Rapport d’intervention : complet / incomplet / absent', 'Déduction 0 % / 50 % / 100 %', 'Job report: complete / incomplete / missing', 'Deduction 0% / 50% / 100%'],
      nc: ['Points de contrôle réalisés', 'Number Possible = 15', 'Inspection points done', 'Number Possible = 15'],
      rg: ['Pression de coupure du compresseur', 'Cible 8,5 bar ; ±0,1 → 0 ; ±0,3 → −0,5', 'Compressor cut-out pressure', 'Target 8.5 bar; ±0.1 → 0; ±0.3 → −0.5']
    }),
    T('Technologie Motocycle', 'Motorcycle Technology', {
      pf: ['La moto démarre après intervention', 'Pass / Fail', 'The motorcycle starts after the repair', 'Pass / Fail'],
      nc: ['Réglages de la check-list effectués', 'Number Possible = 8', 'Checklist adjustments done', 'Number Possible = 8'],
      rg: ['Jeu aux soupapes', 'Cible 0,15 mm ; ±0,02 → 0 ; ±0,04 → −0,5', 'Valve clearance', 'Target 0.15 mm; ±0.02 → 0; ±0.04 → −0.5'],
      rd: ['Tension de chaîne (flèche)', 'Cible 30 mm ; −0,5 point par pas de 5 mm', 'Chain slack', 'Target 30 mm; −0.5 mark per 5 mm step']
    }),
    T('Tôlerie-Carrosserie', 'Autobody Repair', {
      pf: ['L’élément remplacé est aligné avec la carrosserie', 'Pass / Fail', 'The replaced panel is aligned with the body', 'Pass / Fail'],
      ch: ['Planage : invisible / légère ondulation / défaut visible', 'Déduction 0 % / 40 % / 100 %', 'Panel beating: invisible / slight ripple / visible defect', 'Deduction 0% / 40% / 100%'],
      nc: ['Points de soudure réalisés', 'Number Possible = 20', 'Spot welds completed', 'Number Possible = 20'],
      rg: ['Jeu entre portière et aile', 'Cible 4 mm ; ±0,5 → 0 ; ±1 → −0,5 ; ±1,5 → −1', 'Door-to-wing gap', 'Target 4 mm; ±0.5 → 0; ±1 → −0.5; ±1.5 → −1'],
      rd: ['Cote de soubassement', 'Cible 1 250 mm ; −0,5 point par pas de 1 mm', 'Underbody dimension', 'Target 1,250 mm; −0.5 mark per 1 mm step']
    }),
    T('Tournage', 'CNC Turning', {
      pf: ['Le filetage accepte la bague de contrôle', 'Pass / Fail', 'The thread accepts the ring gauge', 'Pass / Fail'],
      nc: ['Cotes fonctionnelles dans la tolérance', 'Number Possible = 15', 'Functional dimensions within tolerance', 'Number Possible = 15'],
      rg: ['Diamètre Ø 30 g6', 'Cible 29,986 mm ; ±0,007 → 0 ; ±0,015 → −0,5 ; ±0,030 → −1', 'Diameter Ø 30 g6', 'Target 29.986 mm; ±0.007 → 0; ±0.015 → −0.5; ±0.030 → −1'],
      rd: ['Longueur totale', 'Cible 120 mm ; −0,5 point par pas de 0,05 mm', 'Overall length', 'Target 120 mm; −0.5 mark per 0.05 mm step']
    }),
    T('Web Technologies', 'Web Technologies', {
      pf: ['Le site passe le validateur HTML sans erreur', 'Pass / Fail', 'The site passes the HTML validator without errors', 'Pass / Fail'],
      ch: ['Affichage mobile : parfait / défauts mineurs / cassé', 'Déduction 0 % / 50 % / 100 %', 'Mobile layout: perfect / minor issues / broken', 'Deduction 0% / 50% / 100%'],
      nc: ['Tests automatisés réussis', 'Number Possible = 20', 'Automated tests passed', 'Number Possible = 20'],
      ps: ['Score de performance (Lighthouse)', 'Highest Mark to Highest Value, Minimum Value = 50', 'Performance score (Lighthouse)', 'Highest Mark to Highest Value, Minimum Value = 50'],
      ss: ['Poids de la page (le plus léger gagne)', 'Lowest Value, palier 10 %, −0,5 point', 'Page weight (lightest wins)', 'Lowest Value, 10% step, −0.5 mark']
    })
  ];
  /* Exemples complémentaires pour les méthodes comparatives (épreuves chronométrées, consommation, production). */
  var MORE = [
    ['Boulangerie', 'ps', 'Speed test : pâtons façonnés en 10 min', 'Highest Mark to Highest Value', 'Speed test: dough pieces shaped in 10 min', 'Highest Mark to Highest Value'],
    ['Cuisine', 'ps', 'Perte de matière à l’épluchage (g)', 'Highest Mark to Lowest Value', 'Peeling waste (g)', 'Highest Mark to Lowest Value'],
    ['Fraisage', 'ps', 'Temps d’usinage de la pièce', 'Highest Mark to Lowest Value, Maximum Value = temps alloué', 'Part machining time', 'Highest Mark to Lowest Value, Maximum Value = allotted time'],
    ['Tournage', 'ps', 'Temps d’usinage de la pièce', 'Highest Mark to Lowest Value, Maximum Value = temps alloué', 'Part machining time', 'Highest Mark to Lowest Value, Maximum Value = allotted time'],
    ['Maçonnerie', 'ps', 'Speed test : briques posées en 30 min', 'Highest Mark to Highest Value', 'Speed test: bricks laid in 30 min', 'Highest Mark to Highest Value'],
    ['Carrelage', 'ps', 'Speed test : temps de pose du panneau', 'Highest Mark to Lowest Value', 'Speed test: panel tiling time', 'Highest Mark to Lowest Value'],
    ['Électronique', 'ps', 'Temps de dépannage de la carte', 'Highest Mark to Lowest Value', 'Board troubleshooting time', 'Highest Mark to Lowest Value'],
    ['Patisserie confiserie', 'ps', 'Speed test : pièces dressées en 20 min', 'Highest Mark to Highest Value', 'Speed test: pieces piped in 20 min', 'Highest Mark to Highest Value'],
    ['Métallerie', 'ps', 'Chutes de matière (kg)', 'Highest Mark to Lowest Value', 'Material offcuts (kg)', 'Highest Mark to Lowest Value'],
    ['Horticulture', 'ps', 'Speed test : boutures réalisées en 15 min', 'Highest Mark to Highest Value', 'Speed test: cuttings made in 15 min', 'Highest Mark to Highest Value'],
    ['Technologie des Véhicules Industriels', 'ps', 'Temps d’intervention', 'Highest Mark to Lowest Value', 'Job time', 'Highest Mark to Lowest Value'],
    ['Technologie Motocycle', 'ps', 'Temps de réglage du carburateur', 'Highest Mark to Lowest Value', 'Carburettor tuning time', 'Highest Mark to Lowest Value'],
    ['Tôlerie-Carrosserie', 'ps', 'Temps de remplacement de l’élément', 'Highest Mark to Lowest Value', 'Panel replacement time', 'Highest Mark to Lowest Value'],
    ['CAO-Ingénierie Mécanique', 'ps', 'Temps de modélisation de la pièce imposée', 'Highest Mark to Lowest Value', 'Modelling time of the set part', 'Highest Mark to Lowest Value'],
    ['Charpente', 'ps', 'Chutes de bois (kg)', 'Highest Mark to Lowest Value', 'Timber offcuts (kg)', 'Highest Mark to Lowest Value'],
    ['Jardinier-Paysagiste', 'ps', 'Speed test : bordures posées en 20 min (m)', 'Highest Mark to Highest Value', 'Speed test: edging laid in 20 min (m)', 'Highest Mark to Highest Value'],
    ['Plomberie et Chauffage', 'ss', 'Temps de mise en eau (le plus rapide gagne)', 'Lowest Value, palier 5 min, −0,5 point', 'Time to fill and test (fastest wins)', 'Lowest Value, 5 min step, −0.5 mark'],
    ['Design graphique', 'ss', 'Poids du PDF livré (le plus léger gagne)', 'Lowest Value, palier 20 %, −0,5 point', 'Delivered PDF size (smallest wins)', 'Lowest Value, 20% step, −0.5 mark'],
    ['Service en Restaurant', 'ss', 'Temps d’envoi du plat (le plus rapide gagne)', 'Lowest Value, palier 30 s, −0,25 point', 'Dish service time (fastest wins)', 'Lowest Value, 30 s step, −0.25 mark'],
    ['Coiffure', 'ss', 'Temps de coupe (le plus rapide gagne)', 'Lowest Value, palier 5 min, −0,5 point', 'Haircut time (fastest wins)', 'Lowest Value, 5 min step, −0.5 mark'],
    ['Cyber Sécurité', 'ss', 'Temps de résolution du challenge', 'Lowest Value, palier 5 min, −0,5 point', 'Challenge solving time', 'Lowest Value, 5 min step, −0.5 mark'],
    ['Administration des Systèmes et des Réseaux Informatiques', 'ss', 'Temps de déploiement du serveur', 'Lowest Value, palier 5 min, −0,5 point', 'Server deployment time', 'Lowest Value, 5 min step, −0.5 mark'],
    ['Peinture Automobile', 'ss', 'Peinture consommée (g)', 'Lowest Value, palier 10 %, −0,5 point', 'Paint used (g)', 'Lowest Value, 10% step, −0.5 mark'],
    ['Maintenance Industrielle', 'ss', 'Temps d’arrêt machine', 'Lowest Value, palier 5 min, −0,5 point', 'Machine downtime', 'Lowest Value, 5 min step, −0.5 mark'],
    ['Technologie Automobile', 'ss', 'Temps de remplacement de l’embrayage', 'Lowest Value, palier 5 min, −0,5 point', 'Clutch replacement time', 'Lowest Value, 5 min step, −0.5 mark'],
    ['Métiers de la Propreté', 'ss', 'Eau consommée (l)', 'Lowest Value, palier 1 l, −0,25 point', 'Water used (l)', 'Lowest Value, 1 l step, −0.25 mark'],
    ['Boucherie', 'ss', 'Temps de désossage de l’épaule', 'Lowest Value, palier 1 min, −0,5 point', 'Shoulder boning time', 'Lowest Value, 1 min step, −0.5 mark'],
    ['Imprimerie', 'ss', 'Gâche papier (feuilles)', 'Lowest Value, palier 10 feuilles, −0,5 point', 'Paper waste (sheets)', 'Lowest Value, 10-sheet step, −0.5 mark'],
    ['Soudage', 'ss', 'Temps de soudage de l’éprouvette', 'Lowest Value, palier 2 min, −0,25 point, proportionnel', 'Test piece welding time', 'Lowest Value, 2 min step, −0.25 mark, proportional'],
    ['Maroquinerie', 'ss', 'Cuir consommé (dm²)', 'Lowest Value, palier 5 %, −0,25 point', 'Leather used (dm²)', 'Lowest Value, 5% step, −0.25 mark'],
    ['Cuisine', 'ss', 'Temps d’envoi des assiettes', 'Lowest Value, palier 1 min, −0,5 point', 'Plate send-out time', 'Lowest Value, 1 min step, −0.5 mark'],
    ['Horticulture', 'ss', 'Plants rempotés en 15 min (le plus grand nombre gagne)', 'Highest Value, palier 2 plants, −0,5 point', 'Plants potted in 15 min (most wins)', 'Highest Value, 2-plant step, −0.5 mark']
  ];
  MORE.forEach(function (m) {
    var tr = global.WIKI_TRADES.find(function (x) { return x.fr === m[0]; });
    if (tr) tr.ex[KEYS[m[1]]] = { fr: [m[2], m[3]], en: [m[4], m[5]] };
  });
})(window);
