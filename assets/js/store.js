/*
 * CIS Wiki — couche de données du prototype.
 *
 * Le contenu de départ vient de data/content.js (window.WIKI_SEED).
 * Les modifications faites dans l'administration sont enregistrées dans le
 * navigateur (localStorage). En production, cette couche sera remplacée par
 * des appels à l'API (voir README) : les fonctions gardent la même forme.
 */
(function (global) {
  'use strict';

  var KEY = 'ciswiki:data:v1';
  var SESSION_KEY = 'ciswiki:session';
  var PREFS_KEY = 'ciswiki:prefs';
  var LANGS = ['fr', 'en'];
  var SNAP_FIELDS = ['category', 'order', 'step', 'level', 'status', 'menuPath', 'prereq', 'video', 'tags', 'fr', 'en'];

  var ROLES = {
    admin: ['page.create', 'page.edit', 'page.delete', 'page.publish', 'glossary', 'category', 'user', 'settings', 'trash'],
    editor: ['page.create', 'page.edit', 'page.delete', 'page.publish', 'glossary', 'trash'],
    translator: ['page.edit']
  };

  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function now() { return new Date().toISOString(); }
  function lsGet(k) { try { return global.localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { global.localStorage.setItem(k, v); return true; } catch (e) { return false; } }
  function lsDel(k) { try { global.localStorage.removeItem(k); } catch (e) { /* ignoré */ } }

  function snapshot(p) {
    var s = {};
    SNAP_FIELDS.forEach(function (f) { if (p[f] !== undefined) s[f] = clone(p[f]); });
    return s;
  }

  function fromSeed() {
    var seed = global.WIKI_SEED;
    var d = clone(seed);
    d.seedVersion = seed.version;
    d.trash = [];
    d.feedback = d.feedback || {};
    d.activity = [];
    d.pages.forEach(function (p) {
      p.revisions = (p.history || []).map(function (h, i) { var r = clone(h); r.rev = i + 1; return r; });
      delete p.history;
      if (!p.revisions.length) p.revisions.push({ rev: 1, at: p.updatedAt, by: p.updatedBy, note: 'Création' });
      p.revisions[p.revisions.length - 1].snapshot = snapshot(p);
      p.revisions.forEach(function (r, i) {
        d.activity.push({ at: r.at, by: r.by, action: i === 0 ? (p.source ? 'import' : 'create') : 'update', type: 'page', target: p.id, label: (p.fr && p.fr.title) || p.id, note: r.note });
      });
    });
    d.activity.sort(function (a, b) { return a.at < b.at ? 1 : -1; });
    return d;
  }

  var data = null;
  var listeners = [];

  function load() {
    var raw = lsGet(KEY);
    if (raw) { try { data = JSON.parse(raw); } catch (e) { data = null; } }
    if (!data || !Array.isArray(data.pages)) data = fromSeed();
    return data;
  }

  function persist() {
    data.savedAt = now();
    var ok = lsSet(KEY, JSON.stringify(data));
    listeners.forEach(function (fn) { fn('local'); });
    return ok;
  }

  function log(user, action, type, target, label, note) {
    data.activity.unshift({ at: now(), by: user, action: action, type: type, target: target, label: label, note: note || '' });
    if (data.activity.length > 500) data.activity.length = 500;
  }

  // ---- Lecture -----------------------------------------------------------
  function allPages() { return data.pages; }
  function livePages() { return data.pages.filter(function (p) { return !p.deleted; }); }
  function publicPages() { return livePages().filter(function (p) { return p.status === 'published'; }); }
  function page(id) { return data.pages.find(function (p) { return p.id === id; }) || null; }
  function categories() { return data.categories.slice().sort(function (a, b) { return (a.order || 0) - (b.order || 0); }); }
  function category(id) { return data.categories.find(function (c) { return c.id === id; }) || null; }
  function pagesIn(catId, includeDrafts) {
    return (includeDrafts ? livePages() : publicPages()).filter(function (p) { return p.category === catId; })
      .sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
  }
  function users() { return data.users; }
  function user(id) { return data.users.find(function (u) { return u.id === id; }) || null; }
  function userName(id) { var u = user(id); return u ? u.name : (id || '—'); }
  function glossary() { return data.glossary; }
  function settings() { return data.settings; }

  function isTranslated(p, lang) {
    var c = p && p[lang];
    return !!(c && c.title && c.title.trim() && c.body && c.body.trim());
  }

  // ---- Pages -------------------------------------------------------------
  var ID_RE = /^[a-z0-9][a-z0-9-]{1,60}$/;

  function validatePage(p, isNew) {
    var errors = [];
    if (!p.id || !ID_RE.test(p.id)) errors.push('id');
    if (isNew && page(p.id)) errors.push('id-taken');
    if (!p.fr || !p.fr.title || !p.fr.title.trim()) errors.push('title');
    if (!p.category || !category(p.category)) errors.push('category');
    return errors;
  }

  function savePage(input, by, note, isNew) {
    var errors = validatePage(input, isNew);
    if (errors.length) return { ok: false, errors: errors };
    var p = isNew ? null : page(input.id);
    var at = now();
    if (!p) {
      p = { id: input.id, createdAt: at, createdBy: by, revisions: [] };
      data.pages.push(p);
    }
    SNAP_FIELDS.forEach(function (f) { if (input[f] !== undefined) p[f] = clone(input[f]); });
    LANGS.forEach(function (l) { p[l] = p[l] || { title: '', summary: '', objectives: [], quick: [], body: '' }; });
    p.updatedAt = at;
    p.updatedBy = by;
    var rev = (p.revisions.length ? p.revisions[p.revisions.length - 1].rev : 0) + 1;
    p.revisions.push({ rev: rev, at: at, by: by, note: note || '', snapshot: snapshot(p) });
    // On conserve le contenu complet des 25 dernières révisions (taille du stockage).
    p.revisions.slice(0, -25).forEach(function (r) { delete r.snapshot; });
    log(by, isNew ? 'create' : 'update', 'page', p.id, p.fr.title, note);
    persist();
    return { ok: true, page: p, rev: rev };
  }

  function trashPage(id, by) {
    var p = page(id); if (!p || p.deleted) return false;
    p.deleted = { at: now(), by: by };
    log(by, 'delete', 'page', id, p.fr.title);
    return persist();
  }
  function restorePage(id, by) {
    var p = page(id); if (!p || !p.deleted) return false;
    delete p.deleted;
    log(by, 'restore', 'page', id, p.fr.title);
    return persist();
  }
  function purgePage(id, by) {
    var p = page(id); if (!p || !p.deleted) return false;
    data.pages = data.pages.filter(function (x) { return x.id !== id; });
    delete data.feedback[id];
    log(by, 'purge', 'page', id, p.fr.title);
    return persist();
  }
  function restoreRevision(id, rev, by, note) {
    var p = page(id); if (!p) return { ok: false };
    var r = p.revisions.find(function (x) { return x.rev === rev; });
    if (!r || !r.snapshot) return { ok: false };
    var input = clone(r.snapshot); input.id = id;
    return savePage(input, by, note, false);
  }

  // ---- Catégories, glossaire, utilisateurs ------------------------------
  function upsert(list, item, key) {
    var i = list.findIndex(function (x) { return x[key || 'id'] === item[key || 'id']; });
    if (i === -1) list.push(item); else list[i] = item;
  }

  function saveCategory(c, by, isNew) {
    if (!c.id || !ID_RE.test(c.id) || (isNew && category(c.id)) || !c.fr || !c.fr.title) return { ok: false };
    upsert(data.categories, clone(c));
    log(by, isNew ? 'create' : 'update', 'category', c.id, c.fr.title);
    persist(); return { ok: true };
  }
  function deleteCategory(id, by) {
    if (livePages().some(function (p) { return p.category === id; })) return { ok: false, reason: 'not-empty' };
    var c = category(id); if (!c) return { ok: false };
    data.categories = data.categories.filter(function (x) { return x.id !== id; });
    log(by, 'delete', 'category', id, c.fr.title);
    persist(); return { ok: true };
  }

  function saveTerm(term, by, isNew) {
    if (!term.fr || !term.fr.term || !term.fr.def) return { ok: false };
    if (isNew) term.id = term.id || ('t-' + Date.now().toString(36));
    term.updatedAt = now(); term.updatedBy = by;
    upsert(data.glossary, clone(term));
    log(by, isNew ? 'create' : 'update', 'glossary', term.id, term.fr.term);
    persist(); return { ok: true };
  }
  function deleteTerm(id, by) {
    var tItem = data.glossary.find(function (x) { return x.id === id; }); if (!tItem) return { ok: false };
    data.glossary = data.glossary.filter(function (x) { return x.id !== id; });
    log(by, 'delete', 'glossary', id, tItem.fr.term);
    persist(); return { ok: true };
  }

  function saveUser(u, by, isNew) {
    if (!u.id || !/^[a-z0-9][a-z0-9._-]{1,30}$/.test(u.id) || !u.name || !ROLES[u.role]) return { ok: false };
    if (isNew && user(u.id)) return { ok: false, reason: 'taken' };
    if (isNew) u.createdAt = now();
    upsert(data.users, clone(u));
    log(by, isNew ? 'create' : 'update', 'user', u.id, u.name);
    persist(); return { ok: true };
  }
  function deleteUser(id, by) {
    var u = user(id);
    if (!u || id === by || u.system) return { ok: false };
    data.users = data.users.filter(function (x) { return x.id !== id; });
    log(by, 'delete', 'user', id, u.name);
    persist(); return { ok: true };
  }

  function saveSettings(s, by) {
    data.settings = Object.assign({}, data.settings, s);
    log(by, 'update', 'settings', 'settings', 'Paramètres');
    persist();
  }

  // ---- Avis des lecteurs -------------------------------------------------
  function addFeedback(id, useful) {
    var f = data.feedback[id] || (data.feedback[id] = { up: 0, down: 0 });
    if (useful) f.up++; else f.down++;
    persist();
  }

  // ---- Import / export ---------------------------------------------------
  function exportData() { return clone(data); }
  function importData(obj, by) {
    if (!obj || !Array.isArray(obj.pages) || !Array.isArray(obj.categories) || !Array.isArray(obj.users)) return false;
    data = clone(obj);
    data.glossary = data.glossary || []; data.activity = data.activity || []; data.feedback = data.feedback || {};
    data.settings = data.settings || clone(global.WIKI_SEED.settings);
    log(by, 'import', 'settings', 'data', 'Import JSON');
    return persist();
  }
  function reset() { lsDel(KEY); data = fromSeed(); listeners.forEach(function (fn) { fn('reset'); }); }
  function storageSize() { var raw = lsGet(KEY); return raw ? raw.length : 0; }
  function seedOutdated() { return data.seedVersion !== global.WIKI_SEED.version; }

  // ---- Session (prototype : pas de mot de passe) ---------------------------
  function currentUser() { var id = lsGet(SESSION_KEY); var u = id && user(id); return u && !u.system ? u : null; }
  function login(id) { var u = user(id); if (!u || u.system) return false; lsSet(SESSION_KEY, id); return true; }
  function logout() { lsDel(SESSION_KEY); }
  function can(u, perm) { return !!(u && ROLES[u.role] && ROLES[u.role].indexOf(perm) !== -1); }

  // ---- Préférences lecteur -----------------------------------------------
  function prefs() { try { return JSON.parse(lsGet(PREFS_KEY) || '{}') || {}; } catch (e) { return {}; } }
  function pref(k, def) { var p = prefs(); return p[k] !== undefined ? p[k] : def; }
  function setPref(k, v) { var p = prefs(); p[k] = v; lsSet(PREFS_KEY, JSON.stringify(p)); }

  function subscribe(fn) { listeners.push(fn); }
  global.addEventListener('storage', function (e) {
    if (e.key === KEY) { load(); listeners.forEach(function (fn) { fn('remote'); }); }
  });

  load();

  global.CISStore = {
    LANGS: LANGS, ROLES: ROLES,
    data: function () { return data; },
    allPages: allPages, livePages: livePages, publicPages: publicPages, page: page,
    categories: categories, category: category, pagesIn: pagesIn,
    users: users, user: user, userName: userName, glossary: glossary, settings: settings,
    isTranslated: isTranslated, savePage: savePage, trashPage: trashPage, restorePage: restorePage,
    purgePage: purgePage, restoreRevision: restoreRevision,
    saveCategory: saveCategory, deleteCategory: deleteCategory, saveTerm: saveTerm, deleteTerm: deleteTerm,
    saveUser: saveUser, deleteUser: deleteUser, saveSettings: saveSettings, addFeedback: addFeedback,
    exportData: exportData, importData: importData, reset: reset, storageSize: storageSize, seedOutdated: seedOutdated,
    currentUser: currentUser, login: login, logout: logout, can: can,
    pref: pref, setPref: setPref, subscribe: subscribe, ID_RE: ID_RE
  };
})(window);
