/* Vérifie le contenu du wiki : liens internes, images, fichiers, champs FR/EN. Lancer : node tests/content.test.js */
const fs = require('fs'), path = require('path');
global.window = global;
const root = path.join(__dirname, '..');
['data/content.js', 'data/pages/00-structure.js', 'data/pages/01-start.js', 'data/pages/02-bareme.js', 'data/pages/03-calculs.js',
 'data/pages/04-organisation.js', 'data/pages/05-notation.js', 'data/pages/06-aide.js', 'data/trades.js'].forEach(f => require(path.join(root, f)));
const S = window.WIKI_SEED;
const ids = new Set(S.pages.map(p => p.id));
const cats = new Set(S.categories.map(c => c.id));
let errors = [];
const dup = S.pages.map(p => p.id).filter((x, i, a) => a.indexOf(x) !== i);
if (dup.length) errors.push('ids en double : ' + dup.join(', '));
S.pages.forEach(p => {
  if (!cats.has(p.category)) errors.push(`${p.id} : catégorie inconnue ${p.category}`);
  (p.prereq || []).forEach(r => { if (!ids.has(r)) errors.push(`${p.id} : prérequis inconnu ${r}`); });
  if (p.video && !ids.has(p.video)) errors.push(`${p.id} : vidéo inconnue ${p.video}`);
  ['fr', 'en'].forEach(l => {
    const c = p[l];
    if (!c || !c.title || !c.body) { errors.push(`${p.id} : ${l} incomplet`); return; }
    const txt = [c.body].concat(c.quick || [], c.objectives || []).join('\n');
    (txt.match(/\[\[([a-z0-9-]+)(\|[^\]]+)?\]\]/g) || []).forEach(m => {
      const id = m.slice(2).split(/[|\]]/)[0];
      if (!ids.has(id)) errors.push(`${p.id} (${l}) : lien interne cassé ${id}`);
    });
    (txt.match(/\]\((assets\/[^)\s]+)\)/g) || []).forEach(m => {
      const f = m.slice(2, -1);
      if (!fs.existsSync(path.join(root, f))) errors.push(`${p.id} (${l}) : fichier absent ${f}`);
    });
    (txt.match(/::calc\[[a-z]+\](\{.*\})?/g) || []).forEach(m => {
      const j = m.match(/\{.*\}/); if (j) { try { JSON.parse(j[0]); } catch (e) { errors.push(`${p.id} (${l}) : JSON ::calc invalide`); } }
    });
  });
});
(S.settings.workflow || []).forEach(w => { if (!ids.has(w.page)) errors.push('parcours : page inconnue ' + w.page); });
(S.settings.popular || []).forEach(w => { if (!ids.has(w)) errors.push('populaires : page inconnue ' + w); });
S.glossary.forEach(g => { if (g.page && !ids.has(g.page)) errors.push(`glossaire ${g.id} : page inconnue ${g.page}`); });
console.log(`${S.pages.length} pages, ${S.categories.length} catégories, ${S.glossary.length} termes, ${window.WIKI_TRADES.length} métiers`);
if (errors.length) { console.log(errors.join('\n')); process.exit(1); }
console.log('OK : aucun lien, image ou champ manquant');
