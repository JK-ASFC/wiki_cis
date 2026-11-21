/*
 * CIS Wiki — administration (application monopage, routes en #/…).
 * Pages : créer, modifier (FR/EN), publier, mettre à la corbeille, restaurer une révision.
 * Chaque enregistrement crée une révision avec son auteur, sa date et une note.
 */
(function () {
  'use strict';

  var S = window.CISStore, I = window.CISI18n, MD = window.CISMarkdown, icon = window.CISIcons.icon;
  var esc = MD.escape;
  var lang = S.pref('lang', 'fr');
  var theme = S.pref('theme', 'system');
  var me = null, view = null, dirty = false, lastHash = location.hash;

  function t(k, v) { return I.t(lang, k, v); }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function applyPrefs() {
    document.documentElement.lang = lang;
    if (theme === 'system') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', theme);
  }

  // ---- Helpers d'affichage --------------------------------------------------
  var LOCALE = { fr: 'fr-FR', en: 'en-GB' };
  function fmtDate(iso) { try { return new Intl.DateTimeFormat(LOCALE[lang], { dateStyle: 'medium' }).format(new Date(iso)); } catch (e) { return iso; } }
  function fmtDateTime(iso) { try { return new Intl.DateTimeFormat(LOCALE[lang], { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso)); } catch (e) { return iso; } }
  function fmtDay(iso) { try { return new Intl.DateTimeFormat(LOCALE[lang], { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso)); } catch (e) { return iso.slice(0, 10); } }
  function relDate(iso) {
    var diff = (new Date(iso) - Date.now()) / 1000;
    var units = [['year', 31536000], ['month', 2592000], ['week', 604800], ['day', 86400], ['hour', 3600], ['minute', 60]];
    try {
      var rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });
      for (var i = 0; i < units.length; i++) if (Math.abs(diff) >= units[i][1]) return rtf.format(Math.round(diff / units[i][1]), units[i][0]);
      return rtf.format(0, 'minute');
    } catch (e) { return fmtDate(iso); }
  }
  function hash(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; }
  function avatar(uid) {
    var name = S.userName(uid);
    var ini = name.split(/\s+/).map(function (w) { return w.charAt(0); }).join('').slice(0, 2).toUpperCase();
    return '<span class="avatar" style="--h:' + (hash(uid || '?') % 360) + '" aria-hidden="true">' + esc(ini) + '</span>';
  }
  function userCell(uid, extra) { return '<span class="cell-user">' + avatar(uid) + '<span><span>' + esc(S.userName(uid)) + '</span>' + (extra ? '<span class="sub">' + extra + '</span>' : '') + '</span></span>'; }
  var LEVEL_ICON = { beginner: 'cap', intermediate: 'layers', advanced: 'zap' };
  function levelBadge(l) { return '<span class="badge badge--' + esc(l) + '">' + icon(LEVEL_ICON[l] || 'layers') + esc(t('level.' + l)) + '</span>'; }
  function statusBadge(p) {
    if (p.deleted) return '<span class="badge badge--danger">' + icon('trash') + esc(t('adm.status.deleted')) + '</span>';
    return p.status === 'published' ? '<span class="badge badge--ok">' + icon('check') + esc(t('adm.status.published')) + '</span>' : '<span class="badge badge--warn">' + icon('edit') + esc(t('adm.status.draft')) + '</span>';
  }
  function L(obj, field) { return (obj && obj[lang] && obj[lang][field]) || (obj && obj.fr && obj.fr[field]) || ''; }
  function pageTitle(p) { return (lang === 'en' && S.isTranslated(p, 'en') ? p.en.title : p.fr.title) || p.id; }
  function catName(id) { var c = S.category(id); return c ? L(c, 'title') : id; }
  function can(perm) { return S.can(me, perm); }
  function opt(value, label, selected) { return '<option value="' + esc(value) + '"' + (selected ? ' selected' : '') + '>' + esc(label) + '</option>'; }
  function lines(text) { return String(text || '').split('\n').map(function (s) { return s.trim(); }).filter(Boolean); }

  function mdOpts() {
    return {
      mediaBase: S.settings().mediaBase, icon: icon,
      labels: { note: t('md.note'), tip: t('md.tip'), warning: t('md.warning'), important: t('md.important'), details: t('md.details'),
        guided: t('md.guided'), expert: t('md.expert'), screenshot: t('md.screenshot'), zoom: t('md.zoom'), anchor: t('md.anchor') },
      resolveLink: function (id) { var p = S.page(id); return { href: 'article.html?id=' + id, title: p ? p.fr.title : id, missing: !p || !!p.deleted }; }
    };
  }

  // ---- Notifications et fenêtres ----------------------------------------------
  function toast(msg, type, action) {
    var box = document.getElementById('toasts');
    if (!box) return;
    var el = document.createElement('div');
    el.className = 'toast' + (type ? ' toast--' + type : '');
    el.innerHTML = msg;
    if (action) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'toast-action'; b.textContent = action.label;
      b.addEventListener('click', function () { action.fn(); el.remove(); });
      el.appendChild(b);
    }
    box.appendChild(el);
    var life = action ? 6000 : 3200;
    setTimeout(function () { el.classList.add('out'); }, life - 300);
    setTimeout(function () { el.remove(); }, life);
  }

  function modal(o) {
    var d = document.createElement('dialog');
    d.className = 'modal' + (o.wide ? ' modal--wide' : '');
    d.setAttribute('aria-labelledby', 'modal-title');
    d.innerHTML = '<form class="modal-form" novalidate><header class="modal-head"><h2 id="modal-title">' + o.title + '</h2><button type="button" class="icon-btn" data-close aria-label="' + esc(t('common.close')) + '">' + icon('x') + '</button></header>' +
      '<div class="modal-body">' + o.body + '</div><footer class="modal-foot"><button type="button" class="btn btn--ghost" data-close>' + esc(o.cancel || t('common.cancel')) + '</button>' +
      (o.submit ? '<button type="submit" class="btn ' + (o.danger ? 'btn--danger' : 'btn--primary') + '">' + esc(o.submit) + '</button>' : '') + '</footer></form>';
    document.body.appendChild(d);
    d.querySelectorAll('[data-close]').forEach(function (b) { b.addEventListener('click', function () { d.close(); }); });
    d.addEventListener('close', function () { d.remove(); });
    d.querySelector('form').addEventListener('submit', function (e) {
      e.preventDefault();
      if (!o.onSubmit || o.onSubmit(d.querySelector('form'), d) !== false) d.close();
    });
    d.showModal();
    var first = d.querySelector('.modal-body input:not([readonly]):not([type=hidden]), .modal-body select, .modal-body textarea');
    if (first) first.focus();
    if (o.onOpen) o.onOpen(d);
    return d;
  }
  function confirmBox(title, message, label, danger) {
    return new Promise(function (resolve) {
      var ok = false;
      var d = modal({ title: title, body: '<p>' + message + '</p>', submit: label, danger: danger, onSubmit: function () { ok = true; } });
      d.addEventListener('close', function () { resolve(ok); });
    });
  }
  function fieldError(form, name, msg) {
    var el = form.querySelector('[name="' + name + '"]');
    if (!el) return;
    el.classList.add('is-invalid');
    el.setAttribute('aria-invalid', 'true');
    var p = document.createElement('p');
    p.className = 'field-error'; p.textContent = msg;
    el.insertAdjacentElement('afterend', p);
    el.focus();
  }
  function clearErrors(form) {
    form.querySelectorAll('.field-error').forEach(function (e) { e.remove(); });
    form.querySelectorAll('.is-invalid').forEach(function (e) { e.classList.remove('is-invalid'); e.removeAttribute('aria-invalid'); });
  }

  // ---- Coquille ------------------------------------------------------------------
  function brand(sub) {
    return '<a class="brand" href="index.html"><span class="brand-mark" aria-hidden="true">CIS</span><span class="brand-text"><strong>CIS Wiki</strong><small>' + esc(sub) + '</small></span></a>';
  }
  function langSeg() {
    return '<div class="seg seg--lang" role="group" aria-label="' + esc(t('lang.label')) + '"><button type="button" data-lang="fr" aria-pressed="' + (lang === 'fr') + '">FR</button><button type="button" data-lang="en" aria-pressed="' + (lang === 'en') + '">EN</button></div>';
  }
  function themeBtn() {
    return '<button type="button" class="icon-btn" data-action="theme" aria-label="' + esc(t('theme.label') + ' : ' + t('theme.' + theme)) + '" title="' + esc(t('theme.label') + ' : ' + t('theme.' + theme)) + '">' + icon(theme === 'dark' ? 'moon' : theme === 'light' ? 'sun' : 'monitor') + '</button>';
  }

  function navHTML(section) {
    var trash = S.allPages().filter(function (p) { return p.deleted; }).length;
    var nav = [
      ['dashboard', 'dashboard', t('adm.nav.dashboard'), null, null],
      ['pages', 'file', t('adm.nav.pages'), S.livePages().length, null],
      ['categories', 'folder', t('adm.nav.categories'), S.categories().length, 'category'],
      ['glossary', 'glossary', t('adm.nav.glossary'), S.glossary().length, 'glossary'],
      ['users', 'users', t('adm.nav.users'), S.users().filter(function (u) { return !u.system; }).length, 'user'],
      ['activity', 'activity', t('adm.nav.activity'), null, null],
      ['trash', 'trash', t('adm.nav.trash'), trash || null, 'trash'],
      ['settings', 'sliders', t('adm.nav.settings'), null, 'settings']
    ];
    return nav.filter(function (n) { return !n[4] || can(n[4]); }).map(function (n) {
      var on = section === n[0];
      return '<a href="#/' + n[0] + '"' + (on ? ' class="active" aria-current="page"' : '') + '>' + icon(n[1]) + '<span>' + esc(n[2]) + '</span>' + (n[3] ? '<span class="count">' + n[3] + '</span>' : '') + '</a>';
    }).join('');
  }

  function renderChrome(section) {
    document.getElementById('app').innerHTML =
      '<a class="skip-link" href="#view">' + esc(t('a11y.skip')) + '</a>' +
      '<div class="adm">' +
        '<aside class="adm-nav" id="adm-nav">' + brand(t('adm.title')) +
          '<nav id="adm-menu" aria-label="' + esc(t('adm.title')) + '">' + navHTML(section) + '</nav>' +
          '<div class="adm-nav-foot"><a class="btn btn--ghost btn--block" href="index.html">' + icon('eye') + esc(t('adm.viewSite')) + '</a>' +
          '<div class="adm-prefs">' + langSeg() + themeBtn() + '</div></div>' +
        '</aside>' +
        '<div class="backdrop" data-action="close-nav"></div>' +
        '<div class="adm-main">' +
          '<header class="adm-top"><button type="button" class="icon-btn menu-btn" data-action="open-nav" aria-label="' + esc(t('nav.menu')) + '">' + icon('menu') + '</button>' +
            '<span class="proto-pill" title="' + esc(t('adm.protoHint')) + '">' + esc(t('adm.proto')) + '</span>' +
            '<div class="adm-user"><span class="adm-user-id">' + avatar(me.id) + '<span><strong>' + esc(me.name) + '</strong><small>' + esc(t('role.' + me.role)) + '</small></span></span>' +
            '<button type="button" class="icon-btn" data-action="logout" aria-label="' + esc(t('adm.logout')) + '" title="' + esc(t('adm.logout')) + '">' + icon('logout') + '</button></div></header>' +
          (S.seedOutdated() ? '<div class="adm-banner">' + icon('info') + '<span>' + esc(t('adm.seedOutdated')) + '</span><a href="#/settings">' + esc(t('adm.nav.settings')) + '</a></div>' : '') +
          '<main class="adm-content" id="view" tabindex="-1"></main>' +
        '</div>' +
      '</div><div class="toasts" id="toasts" role="status" aria-live="polite"></div>';
    view = document.getElementById('view');
  }

  function viewHead(title, lead, actions, back) {
    return '<div class="view-head"><div>' + (back ? '<a class="back" href="' + back[0] + '">' + icon('arrowLeft') + esc(back[1]) + '</a>' : '') + '<h1>' + title + '</h1>' + (lead ? '<p>' + lead + '</p>' : '') + '</div>' + (actions ? '<div class="view-actions">' + actions + '</div>' : '') + '</div>';
  }
  function forbidden() { document.title = t('adm.forbidden') + ' · CIS Wiki'; view.innerHTML = '<div class="empty-state">' + icon('lock', 'big') + '<h1>' + esc(t('adm.forbidden')) + '</h1><p>' + esc(t('adm.forbiddenText')) + '</p><a class="btn btn--primary" href="#/dashboard">' + esc(t('adm.nav.dashboard')) + '</a></div>'; }
  function notFound() { view.innerHTML = '<div class="empty-state">' + icon('search', 'big') + '<h1>' + esc(t('article.notFound')) + '</h1><a class="btn btn--primary" href="#/pages">' + esc(t('adm.nav.pages')) + '</a></div>'; }

  // ---- Connexion ----------------------------------------------------------------
  function renderLogin() {
    document.title = t('adm.login.title') + ' · CIS Wiki';
    var users = S.users().filter(function (u) { return !u.system; });
    document.getElementById('app').innerHTML = '<main class="login"><div class="login-card">' + brand(t('adm.title')) +
      '<h1>' + esc(t('adm.login.title')) + '</h1><p>' + esc(t('adm.login.lead')) + '</p>' +
      '<form id="login-form"><label for="login-user">' + esc(t('adm.login.user')) + '</label><select id="login-user" name="user">' +
        users.map(function (u) { return opt(u.id, u.name + ' — ' + t('role.' + u.role), u.id === 'admin'); }).join('') +
      '</select><button type="submit" class="btn btn--primary btn--block">' + icon('lock') + esc(t('adm.login.submit')) + '</button></form>' +
      '<p class="hint">' + icon('info') + '<span>' + esc(t('adm.login.demo')) + '</span></p>' +
      '<div class="login-foot"><a href="index.html">' + icon('arrowLeft') + esc(t('adm.backToSite')) + '</a>' + langSeg() + '</div></div></main>' +
      '<div class="toasts" id="toasts" role="status" aria-live="polite"></div>';
    document.getElementById('login-form').addEventListener('submit', function (e) {
      e.preventDefault();
      if (S.login(document.getElementById('login-user').value)) { location.hash = '#/dashboard'; route(); }
    });
  }

  // ---- Tableau de bord ------------------------------------------------------------
  var ACTION_ICON = { create: 'plus', update: 'edit', delete: 'trash', restore: 'restore', purge: 'trash', import: 'upload' };
  function activityItem(a) {
    var target = a.type === 'page' && S.page(a.target) && !S.page(a.target).deleted
      ? '<a href="#/pages/' + esc(a.target) + '/edit">' + esc(a.label) + '</a>' : '<strong>' + esc(a.label) + '</strong>';
    return '<li><span class="act-icon act-icon--' + esc(a.action) + '">' + icon(ACTION_ICON[a.action] || 'edit') + '</span><div><p>' +
      t('adm.log.' + a.action, { user: '<strong>' + esc(S.userName(a.by)) + '</strong>', type: esc(t('adm.type.' + a.type)), target: target }) + '</p>' +
      (a.note ? '<p class="act-note">« ' + esc(a.note) + ' »</p>' : '') +
      '<span class="sub"><time datetime="' + esc(a.at) + '" title="' + esc(fmtDateTime(a.at)) + '">' + esc(relDate(a.at)) + '</time></span></div></li>';
  }
  function kpi(ico, value, label, href, tone) {
    return '<a class="kpi' + (tone ? ' kpi--' + tone : '') + '" href="' + href + '"><span class="kpi-icon">' + icon(ico) + '</span><span><strong>' + value + '</strong><span>' + esc(label) + '</span></span></a>';
  }
  function viewDashboard() {
    document.title = t('adm.nav.dashboard') + ' · CIS Wiki';
    var pages = S.livePages();
    var pub = pages.filter(function (p) { return p.status === 'published'; });
    var drafts = pages.filter(function (p) { return p.status !== 'published'; });
    var missing = pages.filter(function (p) { return !S.isTranslated(p, 'en'); });
    var contributors = {};
    pages.forEach(function (p) { p.revisions.forEach(function (r) { var u = S.user(r.by); if (u && !u.system) contributors[r.by] = true; }); });
    var fb = S.data().feedback || {};
    var unhelpful = pages.filter(function (p) { return fb[p.id] && fb[p.id].down > 0; }).sort(function (a, b) { return fb[b.id].down - fb[a.id].down; });

    var todo = [];
    drafts.forEach(function (p) { todo.push('<li><a href="#/pages/' + esc(p.id) + '/edit">' + icon('edit') + '<span>' + esc(t('adm.dash.todoDraft', { title: pageTitle(p) })) + '</span>' + statusBadge(p) + '</a></li>'); });
    missing.forEach(function (p) { todo.push('<li><a href="#/pages/' + esc(p.id) + '/edit?lang=en">' + icon('translate') + '<span>' + esc(t('adm.dash.todoTranslate', { title: p.fr.title })) + '</span><span class="flag flag--missing">EN</span></a></li>'); });
    unhelpful.forEach(function (p) { todo.push('<li><a href="#/pages/' + esc(p.id) + '/edit">' + icon('thumbDown') + '<span>' + esc(t('adm.dash.todoFeedback', { title: pageTitle(p), n: fb[p.id].down })) + '</span></a></li>'); });

    var cats = S.categories().map(function (c) {
      var ps = pages.filter(function (p) { return p.category === c.id; });
      var tr = ps.filter(function (p) { return S.isTranslated(p, 'en'); }).length;
      var pct = ps.length ? Math.round(tr / ps.length * 100) : 0;
      return '<tr><td><span class="cell-user"><span class="side-ico cat--' + esc(c.color) + '">' + icon(c.icon) + '</span>' + esc(L(c, 'title')) + '</span></td><td>' + ps.length + '</td><td>' + ps.filter(function (p) { return p.status === 'published'; }).length + '</td>' +
        '<td><span class="cov"><span class="bar" role="img" aria-label="' + pct + ' %"><span style="width:' + pct + '%"></span></span><span>' + tr + '/' + ps.length + '</span></span></td></tr>';
    }).join('');

    view.innerHTML = '<div class="adm-hello"><div><h1>' + esc(t('adm.dash.hello', { name: me.name })) + '</h1><p>' + esc(t('adm.dash.lead')) + '</p></div>' +
      (can('page.create') ? '<a class="btn btn--primary" href="#/pages/new">' + icon('plus') + esc(t('adm.pages.new')) + '</a>' : '') + '</div>' +
      '<div class="kpis">' + kpi('file', pub.length, t('adm.dash.published'), '#/pages?status=published') + kpi('edit', drafts.length, t('adm.dash.drafts'), '#/pages?status=draft', drafts.length ? 'warn' : '') +
        kpi('translate', missing.length, t('adm.dash.missingEn'), '#/pages?tr=missing', missing.length ? 'warn' : 'ok') + kpi('users', Object.keys(contributors).length, t('adm.dash.contributors'), can('user') ? '#/users' : '#/activity') + '</div>' +
      '<div class="adm-grid"><section class="panel"><header class="panel-head"><h2>' + icon('activity') + esc(t('adm.dash.activity')) + '</h2><a href="#/activity">' + esc(t('adm.seeAll')) + '</a></header><ul class="feed">' + S.data().activity.slice(0, 7).map(activityItem).join('') + '</ul></section>' +
      '<section class="panel"><header class="panel-head"><h2>' + icon('listChecks') + esc(t('adm.dash.todo')) + '</h2></header>' + (todo.length ? '<ul class="todo">' + todo.slice(0, 8).join('') + '</ul>' : '<p class="empty">' + icon('check') + ' ' + esc(t('adm.dash.todoNone')) + '</p>') + '</section></div>' +
      '<section class="panel"><header class="panel-head"><h2>' + icon('layers') + esc(t('adm.dash.byCategory')) + '</h2></header><div class="tbl-wrap tbl-wrap--flat"><table class="tbl"><thead><tr><th>' + esc(t('adm.col.category')) + '</th><th>' + esc(t('adm.nav.pages')) + '</th><th>' + esc(t('adm.status.published')) + '</th><th>' + esc(t('adm.dash.enCoverage')) + '</th></tr></thead><tbody>' + cats + '</tbody></table></div></section>';
  }

  // ---- Liste des pages ---------------------------------------------------------------
  function viewPages(m, q) {
    document.title = t('adm.nav.pages') + ' · CIS Wiki';
    var f = { q: q.get('q') || '', cat: q.get('cat') || '', status: q.get('status') || '', tr: q.get('tr') || '', sort: q.get('sort') || 'updated' };
    view.innerHTML = viewHead(esc(t('adm.nav.pages')), esc(t('adm.pages.lead')), can('page.create') ? '<a class="btn btn--primary" href="#/pages/new">' + icon('plus') + esc(t('adm.pages.new')) + '</a>' : '') +
      '<div class="toolbar"><div class="input-icon">' + icon('search') + '<input type="search" id="f-q" placeholder="' + esc(t('adm.pages.search')) + '" aria-label="' + esc(t('adm.pages.search')) + '" value="' + esc(f.q) + '"></div>' +
        '<select id="f-cat" aria-label="' + esc(t('adm.col.category')) + '">' + opt('', t('adm.pages.allCats'), !f.cat) + S.categories().map(function (c) { return opt(c.id, L(c, 'title'), f.cat === c.id); }).join('') + '</select>' +
        '<select id="f-status" aria-label="' + esc(t('adm.col.status')) + '">' + opt('', t('adm.pages.allStatus'), !f.status) + opt('published', t('adm.status.published'), f.status === 'published') + opt('draft', t('adm.status.draft'), f.status === 'draft') + '</select>' +
        '<select id="f-tr" aria-label="' + esc(t('adm.col.translation')) + '">' + opt('', t('adm.pages.allTr'), !f.tr) + opt('missing', t('adm.pages.trMissing'), f.tr === 'missing') + opt('done', t('adm.pages.trDone'), f.tr === 'done') + '</select>' +
        '<select id="f-sort" aria-label="' + esc(t('adm.pages.sort')) + '">' + opt('updated', t('adm.pages.sortUpdated'), f.sort === 'updated') + opt('title', t('adm.pages.sortTitle'), f.sort === 'title') + opt('category', t('adm.pages.sortCategory'), f.sort === 'category') + '</select>' +
      '</div><div class="tbl-wrap"><table class="tbl"><thead><tr><th>' + esc(t('adm.col.page')) + '</th><th>' + esc(t('adm.col.category')) + '</th><th>' + esc(t('adm.col.level')) + '</th><th>' + esc(t('adm.col.status')) + '</th><th>' + esc(t('adm.col.author')) + '</th><th>' + esc(t('adm.col.updated')) + '</th><th><span class="sr-only">' + esc(t('adm.col.actions')) + '</span></th></tr></thead><tbody id="pages-body"></tbody></table></div><p class="tbl-foot" id="pages-count"></p>';

    var fbAll = S.data().feedback || {};
    function draw() {
      var ws = f.q.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
      var rows = S.livePages().filter(function (p) {
        if (f.cat && p.category !== f.cat) return false;
        if (f.status && (f.status === 'published') !== (p.status === 'published')) return false;
        if (f.tr === 'missing' && S.isTranslated(p, 'en')) return false;
        if (f.tr === 'done' && !S.isTranslated(p, 'en')) return false;
        if (ws) {
          var hay = (p.id + ' ' + p.fr.title + ' ' + (p.en && p.en.title || '') + ' ' + (p.tags || []).join(' ')).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
          if (hay.indexOf(ws) === -1) return false;
        }
        return true;
      });
      rows.sort(function (a, b) {
        if (f.sort === 'title') return a.fr.title.localeCompare(b.fr.title, 'fr');
        if (f.sort === 'category') return (S.category(a.category) || {}).order - (S.category(b.category) || {}).order || (a.order || 0) - (b.order || 0);
        return a.updatedAt < b.updatedAt ? 1 : -1;
      });
      document.getElementById('pages-body').innerHTML = rows.length ? rows.map(function (p) {
        var fb = fbAll[p.id];
        return '<tr><td class="cell-title"><a href="#/pages/' + esc(p.id) + '/edit">' + esc(p.fr.title) + '</a>' +
          '<span class="sub">' + (S.isTranslated(p, 'en') ? '<span class="flag flag--ok">EN</span>' + esc(p.en.title) : '<span class="flag flag--missing">EN</span>' + esc(t('adm.pages.noEn'))) + '</span>' +
          '<span class="sub"><code>' + esc(p.id) + '</code>' + (fb ? ' · ' + icon('thumbUp') + fb.up + ' ' + icon('thumbDown') + fb.down : '') + '</span></td>' +
          '<td>' + esc(catName(p.category)) + '</td><td>' + levelBadge(p.level) + '</td><td>' + statusBadge(p) + '</td>' +
          '<td>' + userCell(p.createdBy, esc(fmtDate(p.createdAt))) + '</td>' +
          '<td>' + userCell(p.updatedBy, '<time datetime="' + esc(p.updatedAt) + '" title="' + esc(fmtDateTime(p.updatedAt)) + '">' + esc(relDate(p.updatedAt)) + '</time>') + '</td>' +
          '<td class="cell-actions"><a class="icon-btn" href="article.html?id=' + encodeURIComponent(p.id) + '" target="_blank" rel="noopener" title="' + esc(t('adm.act.view')) + '" aria-label="' + esc(t('adm.act.view') + ' : ' + p.fr.title) + '">' + icon('eye') + '</a>' +
            '<a class="icon-btn" href="#/pages/' + esc(p.id) + '/edit" title="' + esc(t('adm.act.edit')) + '" aria-label="' + esc(t('adm.act.edit') + ' : ' + p.fr.title) + '">' + icon('edit') + '</a>' +
            '<a class="icon-btn" href="#/pages/' + esc(p.id) + '/history" title="' + esc(t('adm.act.history')) + '" aria-label="' + esc(t('adm.act.history') + ' : ' + p.fr.title) + '">' + icon('history') + '</a>' +
            (can('page.delete') ? '<button type="button" class="icon-btn icon-btn--danger" data-trash="' + esc(p.id) + '" title="' + esc(t('adm.act.delete')) + '" aria-label="' + esc(t('adm.act.delete') + ' : ' + p.fr.title) + '">' + icon('trash') + '</button>' : '') + '</td></tr>';
      }).join('') : '<tr><td colspan="7" class="empty">' + esc(t('adm.pages.none')) + '</td></tr>';
      document.getElementById('pages-count').textContent = t('adm.pages.count', { n: rows.length, total: S.livePages().length });
      var qs = new URLSearchParams();
      Object.keys(f).forEach(function (k) { if (f[k] && !(k === 'sort' && f[k] === 'updated')) qs.set(k, f[k]); });
      history.replaceState(null, '', '#/pages' + (qs.toString() ? '?' + qs.toString() : ''));
      lastHash = location.hash;
    }
    [['f-q', 'q', 'input'], ['f-cat', 'cat', 'change'], ['f-status', 'status', 'change'], ['f-tr', 'tr', 'change'], ['f-sort', 'sort', 'change']].forEach(function (x) {
      document.getElementById(x[0]).addEventListener(x[2], function (e) { f[x[1]] = e.target.value; draw(); });
    });
    view.addEventListener('click', function (e) {
      var b = e.target.closest('[data-trash]');
      if (b) trashFlow(b.getAttribute('data-trash'), draw);
    });
    draw();
  }

  function trashFlow(id, after) {
    var p = S.page(id);
    confirmBox(icon('trash') + esc(t('adm.trash.confirmTitle')), t('adm.trash.confirmText', { title: '<strong>' + esc(p.fr.title) + '</strong>' }), t('adm.trash.confirmBtn'), true).then(function (ok) {
      if (!ok) return;
      S.trashPage(id, me.id);
      refreshNav();
      toast(icon('trash') + esc(t('adm.trash.done', { title: p.fr.title })), '', { label: t('adm.undo'), fn: function () { S.restorePage(id, me.id); refreshNav(); after && after(); toast(icon('restore') + esc(t('adm.trash.restored'))); } });
      after && after();
    });
  }
  // Met à jour les compteurs du menu sans reconstruire la vue (les écouteurs restent en place).
  function refreshNav() {
    var section = (location.hash.split('?')[0].split('/')[1]) || 'dashboard';
    var menu = document.getElementById('adm-menu');
    if (menu) menu.innerHTML = navHTML(section);
  }

  // ---- Éditeur de page --------------------------------------------------------------
  function emptyLang() { return { title: '', short: '', summary: '', objectives: [], quick: [], body: '' }; }
  var TOOLBAR = [
    ['h2', 'H2', 'tb.h2'], ['h3', 'H3', 'tb.h3'], ['|'],
    ['bold', '<b>B</b>', 'tb.bold'], ['italic', '<i>I</i>', 'tb.italic'], ['kbd', icon('keyboard'), 'tb.kbd'], ['|'],
    ['ul', icon('list'), 'tb.ul'], ['ol', icon('listOrdered'), 'tb.ol'], ['table', icon('table'), 'tb.table'], ['|'],
    ['link', icon('link'), 'tb.link'], ['wikilink', icon('file'), 'tb.wikilink'], ['image', icon('image'), 'tb.image'], ['video', icon('video'), 'tb.video'], ['|'],
    ['note', icon('info'), 'tb.note'], ['tip', icon('bulb'), 'tb.tip'], ['warning', icon('warning'), 'tb.warning'], ['|'],
    ['guided', icon('compass'), 'tb.guided'], ['expert', icon('zap'), 'tb.expert']
  ];

  function viewEditor(id, q) {
    var isNew = !id;
    var src = id ? S.page(id) : null;
    if (id && (!src || src.deleted)) { notFound(); return; }
    if ((isNew && !can('page.create')) || !can('page.edit')) { forbidden(); return; }
    var metaLocked = me.role === 'translator';
    var d;
    if (src) {
      d = clone(src);
      delete d.revisions; delete d.deleted;
    } else {
      d = { id: '', category: q.get('cat') || 'cis', order: 99, step: null, level: 'beginner', status: 'draft', menuPath: '', prereq: [], video: '', tags: [], fr: emptyLang(), en: emptyLang() };
    }
    S.LANGS.forEach(function (l) { d[l] = Object.assign(emptyLang(), d[l] || {}); });
    var cur = q.get('lang') === 'en' ? 'en' : 'fr';
    var slugTouched = !isNew;
    var viewMode = S.pref('editorView', window.innerWidth < 900 ? 'write' : 'split');
    document.title = (isNew ? t('adm.editor.newTitle') : t('adm.editor.editTitle', { title: d.fr.title })) + ' · CIS Wiki';

    var others = S.livePages().filter(function (p) { return p.id !== id; }).sort(function (a, b) { return (S.category(a.category) || {}).order - (S.category(b.category) || {}).order || a.order - b.order; });
    var videos = S.livePages().filter(function (p) { return p.category === 'videos'; });
    var maxStep = Math.max.apply(null, [7].concat(S.livePages().map(function (p) { return p.step || 0; })));

    var dis = metaLocked ? ' disabled' : '';
    view.innerHTML = '<form class="editor" id="editor" novalidate>' +
      viewHead(isNew ? esc(t('adm.editor.newTitle')) : esc(t('adm.editor.editTitle', { title: d.fr.title })), isNew ? esc(t('adm.editor.newLead')) : '<code>' + esc(d.id) + '</code> · ' + statusBadge(src),
        (src ? '<a class="btn btn--ghost" href="article.html?id=' + encodeURIComponent(d.id) + '" target="_blank" rel="noopener">' + icon('eye') + esc(t('adm.act.view')) + '</a><a class="btn btn--ghost" href="#/pages/' + esc(d.id) + '/history">' + icon('history') + esc(t('adm.act.history')) + '</a>' : '') +
        '<button type="submit" class="btn btn--primary">' + icon('save') + esc(t('adm.editor.save')) + '</button>', ['#/pages', t('adm.nav.pages')]) +
      '<div class="editor-grid"><div class="editor-main">' +
        '<div class="tabs" role="tablist" aria-label="' + esc(t('lang.label')) + '">' +
          '<button type="button" class="tab" role="tab" data-tab="fr" id="tab-fr" aria-controls="lang-panel">FR · Français <span class="tab-state" id="state-fr"></span></button>' +
          '<button type="button" class="tab" role="tab" data-tab="en" id="tab-en" aria-controls="lang-panel">EN · English <span class="tab-state" id="state-en"></span></button>' +
          '<button type="button" class="btn btn--ghost btn--sm tabs-action" data-action="copy-fr" id="copy-fr">' + icon('copy') + esc(t('adm.editor.copyFr')) + '</button>' +
        '</div>' +
        '<div class="panel panel--tabbed" id="lang-panel" role="tabpanel">' +
          '<div class="field"><label for="f-title">' + esc(t('adm.editor.title')) + ' <span class="req" id="title-req">*</span></label><input id="f-title" name="title" autocomplete="off"></div>' +
          '<div class="field-row"><div class="field"><label for="f-short">' + esc(t('adm.editor.short')) + '</label><input id="f-short" name="short" autocomplete="off"><p class="help">' + esc(t('adm.editor.shortHelp')) + '</p></div>' +
          '<div class="field"><label for="f-slug">' + esc(t('adm.editor.slug')) + ' <span class="req">*</span></label><input id="f-slug" name="slug" autocomplete="off" spellcheck="false"' + (isNew ? '' : ' readonly') + ' value="' + esc(d.id) + '"><p class="help">' + esc(isNew ? t('adm.editor.slugHelp') : t('adm.editor.slugLocked')) + '</p></div></div>' +
          '<div class="field"><label for="f-summary">' + esc(t('adm.editor.summary')) + '</label><textarea id="f-summary" name="summary" rows="2"></textarea><p class="help">' + esc(t('adm.editor.summaryHelp')) + '</p></div>' +
          '<div class="field"><div class="md-head"><label for="f-body">' + esc(t('adm.editor.body')) + '</label>' +
            '<div class="seg seg--sm" role="group" aria-label="' + esc(t('adm.editor.viewMode')) + '"><button type="button" data-view="write">' + esc(t('adm.editor.write')) + '</button><button type="button" data-view="split">' + icon('columns') + '<span>' + esc(t('adm.editor.split')) + '</span></button><button type="button" data-view="preview">' + icon('eye') + '<span>' + esc(t('adm.editor.preview')) + '</span></button></div></div>' +
            '<div class="md-toolbar" role="toolbar" aria-label="' + esc(t('adm.editor.toolbar')) + '">' + TOOLBAR.map(function (b) {
              return b[0] === '|' ? '<span class="sep" aria-hidden="true"></span>' : '<button type="button" data-md="' + b[0] + '" title="' + esc(t(b[2])) + '" aria-label="' + esc(t(b[2])) + '">' + b[1] + '</button>';
            }).join('') + '</div>' +
            '<div class="md-area" id="md-area" data-view="' + viewMode + '"><textarea id="f-body" name="body" class="mono" spellcheck="true"></textarea><div class="md-preview prose" id="f-preview"></div></div>' +
            '<details class="md-help"><summary>' + icon('info') + esc(t('adm.editor.syntax')) + '</summary>' + syntaxHelp() + '</details></div>' +
          '<div class="field-row"><div class="field"><label for="f-quick">' + icon('zap') + esc(t('adm.editor.quick')) + '</label><textarea id="f-quick" name="quick" rows="6"></textarea><p class="help">' + esc(t('adm.editor.quickHelp')) + '</p></div>' +
          '<div class="field"><label for="f-objectives">' + icon('compass') + esc(t('adm.editor.objectives')) + '</label><textarea id="f-objectives" name="objectives" rows="6"></textarea><p class="help">' + esc(t('adm.editor.objectivesHelp')) + '</p></div></div>' +
        '</div></div>' +
        '<aside class="editor-side">' +
          '<section class="panel"><h2 class="panel-title">' + esc(t('adm.editor.publication')) + '</h2>' +
            '<div class="field"><label for="f-status">' + esc(t('adm.col.status')) + '</label><select id="f-status" name="status"' + (can('page.publish') ? '' : ' disabled') + '>' + opt('published', t('adm.status.published'), d.status === 'published') + opt('draft', t('adm.status.draft'), d.status !== 'published') + '</select></div>' +
            '<div class="field"><label for="f-note">' + esc(t('adm.editor.note')) + '</label><input id="f-note" name="note" placeholder="' + esc(t('adm.editor.notePh')) + '" autocomplete="off"><p class="help">' + esc(t('adm.editor.noteHelp')) + '</p></div>' +
            '<button type="submit" class="btn btn--primary btn--block">' + icon('save') + esc(t('adm.editor.save')) + '</button>' +
            '<p class="help center" id="dirty-flag" hidden>' + esc(t('adm.editor.unsaved')) + '</p></section>' +
          '<section class="panel"><h2 class="panel-title">' + esc(t('adm.editor.classification')) + '</h2>' +
            (metaLocked ? '<p class="help">' + icon('lock') + esc(t('adm.editor.metaLocked')) + '</p>' : '') +
            '<div class="field"><label for="f-category">' + esc(t('adm.col.category')) + '</label><select id="f-category" name="category"' + dis + '>' + S.categories().map(function (c) { return opt(c.id, L(c, 'title'), d.category === c.id); }).join('') + '</select></div>' +
            '<div class="field-row"><div class="field"><label for="f-order">' + esc(t('adm.editor.order')) + '</label><input id="f-order" name="order" type="number" min="0" max="999" value="' + esc(d.order) + '"' + dis + '></div>' +
            '<div class="field"><label for="f-step">' + esc(t('adm.editor.step')) + '</label><select id="f-step" name="step"' + dis + '>' + opt('', t('adm.editor.noStep'), !d.step) + Array.from({ length: maxStep + 1 }, function (_, i) { return i + 1; }).map(function (n) { return opt(n, t('home.step', { n: n }), d.step === n); }).join('') + '</select></div></div>' +
            '<div class="field"><label for="f-level">' + esc(t('adm.col.level')) + '</label><select id="f-level" name="level"' + dis + '>' + ['beginner', 'intermediate', 'advanced'].map(function (l) { return opt(l, t('level.' + l), d.level === l); }).join('') + '</select></div>' +
            '<div class="field"><label for="f-menupath">' + esc(t('adm.editor.menuPath')) + '</label><input id="f-menupath" name="menuPath" value="' + esc(d.menuPath) + '" placeholder="Marking Scheme › Marking Schedule"' + dis + '><p class="help">' + esc(t('adm.editor.menuPathHelp')) + '</p></div>' +
            '<div class="field"><label for="f-video">' + esc(t('adm.editor.video')) + '</label><select id="f-video" name="video"' + dis + '>' + opt('', t('adm.editor.noVideo'), !d.video) + videos.map(function (v) { return opt(v.id, v.fr.title, d.video === v.id); }).join('') + '</select></div>' +
            '<div class="field"><label for="f-tags">' + esc(t('adm.editor.tags')) + '</label><input id="f-tags" name="tags" value="' + esc((d.tags || []).join(', ')) + '"' + dis + '><p class="help">' + esc(t('adm.editor.tagsHelp')) + '</p></div>' +
            '<fieldset class="field"' + dis + '><legend>' + esc(t('adm.editor.prereq')) + '</legend><div class="check-list">' + others.map(function (p) {
              return '<label><input type="checkbox" name="prereq" value="' + esc(p.id) + '"' + ((d.prereq || []).indexOf(p.id) !== -1 ? ' checked' : '') + '> ' + esc(p.fr.short || p.fr.title) + ' <span class="sub">' + esc(catName(p.category)) + '</span></label>';
            }).join('') + '</div><p class="help">' + esc(t('adm.editor.prereqHelp')) + '</p></fieldset>' +
          '</section>' +
          (src ? '<section class="panel"><h2 class="panel-title">' + esc(t('adm.editor.info')) + '</h2><dl class="meta-list">' +
            '<div><dt>' + esc(t('adm.editor.createdBy')) + '</dt><dd>' + userCell(src.createdBy, esc(fmtDateTime(src.createdAt))) + '</dd></div>' +
            '<div><dt>' + esc(t('adm.editor.updatedBy')) + '</dt><dd>' + userCell(src.updatedBy, esc(fmtDateTime(src.updatedAt))) + '</dd></div>' +
            '<div><dt>' + esc(t('adm.editor.revisions')) + '</dt><dd><a href="#/pages/' + esc(src.id) + '/history">' + esc(t('adm.editor.revCount', { n: src.revisions.length })) + '</a></dd></div>' +
            (src.source ? '<div><dt>' + esc(t('adm.editor.source')) + '</dt><dd><a href="' + esc(S.settings().legacyBase + src.source) + '" target="_blank" rel="noopener">' + icon('external') + 'DokuWiki · ' + esc(src.source) + '</a></dd></div>' : '') +
            '</dl></section>' +
            (can('page.delete') ? '<section class="panel danger-zone"><h2 class="panel-title">' + esc(t('adm.editor.danger')) + '</h2><p class="help">' + esc(t('adm.editor.dangerHelp')) + '</p><button type="button" class="btn btn--ghost btn--block btn--danger-ghost" data-action="trash-page">' + icon('trash') + esc(t('adm.act.delete')) + '</button></section>' : '') : '') +
        '</aside></div></form>';

    var form = document.getElementById('editor');
    var fTitle = document.getElementById('f-title'), fShort = document.getElementById('f-short'), fSummary = document.getElementById('f-summary');
    var fBody = document.getElementById('f-body'), fQuick = document.getElementById('f-quick'), fObj = document.getElementById('f-objectives');
    var fSlug = document.getElementById('f-slug'), preview = document.getElementById('f-preview'), area = document.getElementById('md-area');

    function fill() {
      var c = d[cur];
      fTitle.value = c.title || ''; fShort.value = c.short || ''; fSummary.value = c.summary || '';
      fBody.value = c.body || ''; fQuick.value = (c.quick || []).join('\n'); fObj.value = (c.objectives || []).join('\n');
      document.querySelectorAll('.tab').forEach(function (b) { b.setAttribute('aria-selected', b.getAttribute('data-tab') === cur); b.tabIndex = b.getAttribute('data-tab') === cur ? 0 : -1; });
      document.getElementById('copy-fr').hidden = cur !== 'en';
      document.getElementById('title-req').hidden = cur !== 'fr';
      document.getElementById('lang-panel').setAttribute('aria-labelledby', 'tab-' + cur);
      fBody.setAttribute('lang', cur); fTitle.setAttribute('lang', cur); fSummary.setAttribute('lang', cur);
      updatePreview(); updateStates();
    }
    function read() {
      var c = d[cur];
      c.title = fTitle.value.trim(); c.short = fShort.value.trim(); c.summary = fSummary.value.trim();
      c.body = fBody.value; c.quick = lines(fQuick.value); c.objectives = lines(fObj.value);
    }
    function readMeta() {
      if (isNew) d.id = fSlug.value.trim();
      if (metaLocked) return;
      d.status = document.getElementById('f-status').value;
      d.category = document.getElementById('f-category').value;
      d.order = parseInt(document.getElementById('f-order').value, 10) || 0;
      var st = document.getElementById('f-step').value; d.step = st ? parseInt(st, 10) : null;
      d.level = document.getElementById('f-level').value;
      d.menuPath = document.getElementById('f-menupath').value.trim();
      d.video = document.getElementById('f-video').value;
      d.tags = document.getElementById('f-tags').value.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
      d.prereq = Array.prototype.map.call(form.querySelectorAll('input[name=prereq]:checked'), function (c) { return c.value; });
    }
    function updateStates() {
      S.LANGS.forEach(function (l) {
        var ok = S.isTranslated(d, l);
        var el = document.getElementById('state-' + l);
        el.className = 'tab-state' + (ok ? ' tab-state--ok' : '');
        el.title = ok ? t('adm.editor.langOk') : t('adm.editor.langMissing');
        el.setAttribute('aria-label', el.title);
      });
    }
    var pvTimer;
    function updatePreview() {
      clearTimeout(pvTimer);
      pvTimer = setTimeout(function () {
        if (area.getAttribute('data-view') === 'write') return;
        var c = d[cur];
        preview.innerHTML = (c.title ? '<h1 class="pv-title">' + esc(c.title) + '</h1>' : '') + (c.summary ? '<p class="lead">' + esc(c.summary) + '</p>' : '') +
          (MD.render(fBody.value, mdOpts()).html || '<p class="empty">' + esc(t('adm.editor.emptyPreview')) + '</p>');
      }, 120);
    }
    function setDirty(v) { dirty = v; var fl = document.getElementById('dirty-flag'); if (fl) fl.hidden = !v; }
    function setView(v) {
      viewMode = v; area.setAttribute('data-view', v); S.setPref('editorView', v);
      document.querySelectorAll('[data-view]').forEach(function (b) { if (b.tagName === 'BUTTON') b.setAttribute('aria-pressed', b.getAttribute('data-view') === v); });
      updatePreview();
    }

    form.addEventListener('input', function (e) {
      setDirty(true);
      if (e.target === fTitle && isNew && cur === 'fr' && !slugTouched) fSlug.value = MD.slugify(fTitle.value).slice(0, 60);
      if (e.target === fSlug) slugTouched = true;
      if ([fTitle, fShort, fSummary, fBody, fQuick, fObj].indexOf(e.target) !== -1) { read(); updateStates(); }
      if (e.target === fBody || e.target === fTitle || e.target === fSummary) updatePreview();
    });
    form.addEventListener('change', function () { setDirty(true); });

    form.addEventListener('click', function (e) {
      var tab = e.target.closest('[data-tab]');
      if (tab) { read(); cur = tab.getAttribute('data-tab'); fill(); return; }
      var vb = e.target.closest('button[data-view]');
      if (vb) { setView(vb.getAttribute('data-view')); return; }
      var mdb = e.target.closest('[data-md]');
      if (mdb) { toolbarAction(mdb.getAttribute('data-md'), fBody); return; }
      var act = e.target.closest('[data-action]');
      if (!act) return;
      if (act.getAttribute('data-action') === 'copy-fr') {
        var go = function () { read(); var keep = d.en.title; d.en = clone(d.fr); if (keep) d.en.title = keep; fill(); setDirty(true); toast(icon('copy') + esc(t('adm.editor.copied'))); };
        if (d.en.body.trim()) confirmBox(esc(t('adm.editor.copyFr')), esc(t('adm.editor.copyConfirm')), t('adm.editor.copyFr')).then(function (ok) { if (ok) go(); });
        else go();
      }
      if (act.getAttribute('data-action') === 'trash-page') trashFlow(d.id, function () { dirty = false; location.hash = '#/pages'; });
    });
    document.querySelector('.tabs').addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      if (!e.target.closest('[data-tab]')) return;
      e.preventDefault(); read(); cur = cur === 'fr' ? 'en' : 'fr'; fill(); document.getElementById('tab-' + cur).focus();
    });
    fBody.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey) {
        var k = e.key.toLowerCase();
        if (k === 'b') { e.preventDefault(); toolbarAction('bold', fBody); }
        if (k === 'i') { e.preventDefault(); toolbarAction('italic', fBody); }
      }
    });
    form.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') { e.preventDefault(); save(); }
    });
    form.addEventListener('submit', function (e) { e.preventDefault(); save(); });

    function save() {
      read(); readMeta(); clearErrors(form);
      var errs = [];
      if (!d.fr.title) errs.push(['title', t('adm.err.title')]);
      if (isNew && !S.ID_RE.test(d.id)) errs.push(['slug', t('adm.err.slug')]);
      else if (isNew && S.page(d.id)) errs.push(['slug', t('adm.err.slugTaken')]);
      var enStarted = d.en.title || d.en.body.trim();
      if (errs.length) {
        if (errs[0][0] === 'title' && cur !== 'fr') { cur = 'fr'; fill(); }
        errs.forEach(function (er) { fieldError(form, er[0], er[1]); });
        toast(icon('warning') + esc(t('adm.err.form')), 'error');
        return;
      }
      var note = document.getElementById('f-note').value.trim() || (isNew ? t('adm.editor.autoNoteNew') : t('adm.editor.autoNote'));
      var res = S.savePage(d, me.id, note, isNew);
      if (!res.ok) { toast(icon('warning') + esc(t('adm.err.form')), 'error'); return; }
      setDirty(false);
      toast(icon('check') + esc(t('adm.editor.saved', { n: res.rev })) + (enStarted && !S.isTranslated(d, 'en') ? ' · ' + esc(t('adm.editor.enIncomplete')) : ''), 'ok');
      if (isNew) location.hash = '#/pages/' + d.id + '/edit';
      else { document.getElementById('f-note').value = ''; refreshNav(); viewEditor(d.id, new URLSearchParams('lang=' + cur)); }
    }

    setView(viewMode);
    fill();
    setDirty(false);
    if (!isNew) fTitle.focus(); else fTitle.focus();
  }

  function syntaxHelp() {
    var rows = [
      ['## Titre', t('adm.syn.h2')], ['**gras** / *italique*', t('adm.syn.emph')], ['- élément / 1. élément', t('adm.syn.list')],
      ['[texte](https://…)', t('adm.syn.link')], ['[[marking-days|Marking Days]]', t('adm.syn.wikilink')], ['![Légende](media:dossier/image.png)', t('adm.syn.image')],
      ['::video[Titre](media:videos/x.mp4)', t('adm.syn.video')], ['++Tab++', t('adm.syn.kbd')], ['> [!NOTE] / [!TIP] / [!WARNING] / [!IMPORTANT]', t('adm.syn.callout')],
      ['| A | B |\n|---|---|\n| 1 | 2 |', t('adm.syn.table')], [':::guided … :::', t('adm.syn.guided')], [':::expert … :::', t('adm.syn.expert')]
    ];
    return '<div class="tbl-wrap tbl-wrap--flat"><table class="tbl tbl--compact"><tbody>' + rows.map(function (r) { return '<tr><td><code>' + esc(r[0]).replace(/\n/g, '<br>') + '</code></td><td>' + esc(r[1]) + '</td></tr>'; }).join('') + '</tbody></table></div>';
  }

  // Actions de la barre d'outils Markdown
  function toolbarAction(kind, ta) {
    var s = ta.selectionStart, e = ta.selectionEnd, v = ta.value, sel = v.slice(s, e);
    function emit() { ta.dispatchEvent(new Event('input', { bubbles: true })); ta.focus(); }
    function wrap(before, after, ph) {
      var txt = sel || ph;
      ta.setRangeText(before + txt + after, s, e, 'end');
      ta.setSelectionRange(s + before.length, s + before.length + txt.length);
      emit();
    }
    function lineStart(pos) { return v.lastIndexOf('\n', pos - 1) + 1; }
    function prefix(fn) {
      var ls = lineStart(s), le = v.indexOf('\n', e); if (le === -1) le = v.length;
      var block = v.slice(ls, le).split('\n').map(function (l, i) { return fn(i) + l.replace(/^(#{1,4}\s+|[-*]\s+|\d+[.)]\s+)/, ''); }).join('\n');
      ta.setRangeText(block, ls, le, 'select');
      emit();
    }
    function block(text, selectFrom, selectLen) {
      var before = v.slice(0, s), after = v.slice(e);
      var pre = !before || /\n\n$/.test(before) ? '' : (/\n$/.test(before) ? '\n' : '\n\n');
      var post = !after || /^\n\n/.test(after) ? '' : (/^\n/.test(after) ? '\n' : '\n\n');
      ta.setRangeText(pre + text + post, s, e, 'end');
      var start = s + pre.length + (selectFrom || 0);
      ta.setSelectionRange(start, start + (selectLen != null ? selectLen : text.length - (selectFrom || 0)));
      emit();
    }
    switch (kind) {
      case 'h2': prefix(function () { return '## '; }); break;
      case 'h3': prefix(function () { return '### '; }); break;
      case 'bold': wrap('**', '**', t('tb.bold')); break;
      case 'italic': wrap('*', '*', t('tb.italic')); break;
      case 'kbd': wrap('++', '++', 'Tab'); break;
      case 'ul': prefix(function () { return '- '; }); break;
      case 'ol': prefix(function (i) { return (i + 1) + '. '; }); break;
      case 'table': block('| Colonne 1 | Colonne 2 |\n|---|---|\n| … | … |', 2, 9); break;
      case 'link': wrap('[', '](https://)', sel || t('tb.linkText')); break;
      case 'note': case 'tip': case 'warning':
        var tag = '> [!' + kind.toUpperCase() + ']\n> ';
        var body = (sel || t('tb.calloutText')).split('\n').join('\n> ');
        block(tag + body, tag.length, body.length); break;
      case 'guided': case 'expert':
        var inner = sel || t('tb.modeText');
        block(':::' + kind + '\n' + inner + '\n:::', kind.length + 4, inner.length); break;
      case 'wikilink': pickPage(function (p) { ta.focus(); ta.setSelectionRange(s, e); wrap('[[' + p.id + '|', ']]', sel || p.fr.title); }); break;
      case 'image': mediaDialog('image', function (path, caption) { ta.focus(); ta.setSelectionRange(s, e); block('![' + caption + '](' + path + ')'); }); break;
      case 'video': mediaDialog('video', function (path, caption) { ta.focus(); ta.setSelectionRange(s, e); block('::video[' + caption + '](' + path + ')'); }); break;
    }
  }
  function pickPage(cb) {
    modal({
      title: icon('file') + esc(t('tb.wikilink')),
      body: '<div class="field"><label for="pick-page">' + esc(t('adm.editor.pickPage')) + '</label><select id="pick-page" name="page">' +
        S.categories().map(function (c) { return '<optgroup label="' + esc(L(c, 'title')) + '">' + S.pagesIn(c.id, true).map(function (p) { return opt(p.id, p.fr.title, false); }).join('') + '</optgroup>'; }).join('') + '</select></div>',
      submit: t('adm.editor.insert'),
      onSubmit: function (form) { var p = S.page(form.elements['page'].value); if (p) setTimeout(function () { cb(p); }, 0); }
    });
  }
  function mediaDialog(kind, cb) {
    modal({
      title: icon(kind) + esc(t(kind === 'image' ? 'tb.image' : 'tb.video')),
      body: '<div class="field"><label for="m-path">' + esc(t('adm.media.path')) + '</label><input id="m-path" name="path" value="media:' + (kind === 'video' ? 'videos/' : '') + '" spellcheck="false"><p class="help">' + esc(t('adm.media.pathHelp', { base: S.settings().mediaBase })) + '</p></div>' +
        '<div class="field"><label for="m-caption">' + esc(t('adm.media.caption')) + '</label><input id="m-caption" name="caption"><p class="help">' + esc(t('adm.media.captionHelp')) + '</p></div>',
      submit: t('adm.editor.insert'),
      onSubmit: function (form) {
        clearErrors(form);
        var path = form.elements['path'].value.trim(), cap = form.elements['caption'].value.trim();
        if (!path || path === 'media:' || path === 'media:videos/') { fieldError(form, 'path', t('adm.err.required')); return false; }
        if (kind === 'image' && !cap) { fieldError(form, 'caption', t('adm.err.caption')); return false; }
        setTimeout(function () { cb(path, cap.replace(/[\[\]]/g, '')); }, 0);
      }
    });
  }

  // ---- Historique -------------------------------------------------------------------
  function diffLines(a, b) {
    var A = a.split('\n'), B = b.split('\n'), n = A.length, m = B.length, i, j;
    var dp = new Array(n + 1);
    dp[n] = new Uint16Array(m + 1);
    for (i = n - 1; i >= 0; i--) {
      dp[i] = new Uint16Array(m + 1);
      for (j = m - 1; j >= 0; j--) dp[i][j] = A[i] === B[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
    var out = []; i = 0; j = 0;
    while (i < n && j < m) {
      if (A[i] === B[j]) { out.push([' ', A[i]]); i++; j++; }
      else if (dp[i + 1][j] >= dp[i][j + 1]) out.push(['-', A[i++]]);
      else out.push(['+', B[j++]]);
    }
    while (i < n) out.push(['-', A[i++]]);
    while (j < m) out.push(['+', B[j++]]);
    return out;
  }
  function snapText(s, l) {
    var c = (s && s[l]) || {};
    var meta = [t('adm.col.status') + ' : ' + (s.status || ''), t('adm.col.category') + ' : ' + (s.category || ''), t('adm.col.level') + ' : ' + (s.level || '')];
    return ['# ' + (c.title || ''), c.summary || '', ''].concat(meta, ['', '— ' + t('adm.editor.body') + ' —', c.body || '', '', '— ' + t('adm.editor.quick') + ' —'], c.quick || []).join('\n');
  }
  function renderDiff(oldS, newS, l) {
    var ops = diffLines(snapText(oldS, l), snapText(newS, l));
    var add = ops.filter(function (o) { return o[0] === '+'; }).length, del = ops.filter(function (o) { return o[0] === '-'; }).length;
    var html = '', run = [];
    function flush(final) {
      if (!run.length) return;
      if (run.length > 6) {
        html += run.slice(0, 2).map(line).join('') + '<div class="skip">' + esc(t('adm.history.same', { n: run.length - 4 })) + '</div>' + run.slice(-2).map(line).join('');
      } else html += run.map(line).join('');
      run = [];
    }
    function line(o) { return '<div class="' + (o[0] === '+' ? 'add' : o[0] === '-' ? 'del' : 'ctx') + '">' + (esc(o[1]) || '&nbsp;') + '</div>'; }
    ops.forEach(function (o) { if (o[0] === ' ') run.push(o); else { flush(); html += line(o); } });
    flush(true);
    return { html: html, add: add, del: del };
  }

  function viewHistory(id) {
    var p = S.page(id);
    if (!p) { notFound(); return; }
    document.title = t('adm.history.title') + ' · ' + p.fr.title;
    var base = S.settings().legacyBase;
    var revs = p.revisions.slice().reverse();
    var current = revs[0];
    var diffLang = 'fr';
    view.innerHTML = viewHead(esc(t('adm.history.title')), esc(p.fr.title) + ' · ' + esc(t('adm.editor.revCount', { n: p.revisions.length })),
      '<a class="btn btn--ghost" href="article.html?id=' + encodeURIComponent(p.id) + '" target="_blank" rel="noopener">' + icon('eye') + esc(t('adm.act.view')) + '</a>' + (p.deleted ? '' : '<a class="btn btn--primary" href="#/pages/' + esc(p.id) + '/edit">' + icon('edit') + esc(t('adm.act.edit')) + '</a>'),
      [p.deleted ? '#/trash' : '#/pages/' + p.id + '/edit', p.deleted ? t('adm.nav.trash') : t('adm.history.back')]) +
      '<div class="history-grid"><ol class="rev-list" id="rev-list">' + revs.map(function (r, i) {
        var actions = '';
        if (r.snapshot) {
          actions += '<button type="button" class="btn btn--ghost btn--sm" data-view-rev="' + r.rev + '">' + icon('eye') + esc(t('adm.history.view')) + '</button>';
          if (i > 0) actions += '<button type="button" class="btn btn--ghost btn--sm" data-diff="' + r.rev + '">' + icon('columns') + esc(t('adm.history.compare')) + '</button>';
          if (i > 0 && can('page.edit') && !p.deleted) actions += '<button type="button" class="btn btn--ghost btn--sm" data-restore="' + r.rev + '">' + icon('restore') + esc(t('adm.history.restore')) + '</button>';
        } else if (r.legacy) {
          actions += '<a class="btn btn--ghost btn--sm" href="' + esc(base + r.legacy) + '" target="_blank" rel="noopener">' + icon('external') + esc(t('adm.history.legacy')) + '</a>';
        } else actions += '<span class="sub">' + esc(t('adm.history.noSnapshot')) + '</span>';
        return '<li class="rev' + (i === 0 ? ' rev--current' : '') + '" data-rev="' + r.rev + '"><div class="rev-head">' + avatar(r.by) + '<div><strong>' + esc(S.userName(r.by)) + '</strong><span class="sub"><time datetime="' + esc(r.at) + '">' + esc(fmtDateTime(r.at)) + '</time> · ' + esc(t('adm.history.rev', { n: r.rev })) + '</span></div>' +
          (i === 0 ? '<span class="badge badge--ok">' + esc(t('adm.history.current')) + '</span>' : '') + '</div>' +
          (r.note ? '<p class="rev-note">' + esc(r.note) + '</p>' : '') + '<div class="rev-actions">' + actions + '</div></li>';
      }).join('') + '</ol><section class="panel diff-panel" id="diff-panel" aria-live="polite"><div class="empty">' + icon('columns', 'big') + '<p>' + esc(t('adm.history.pick')) + '</p></div></section></div>';

    var panel = document.getElementById('diff-panel');
    var shown = null;
    function showDiff(rev) {
      var r = p.revisions.find(function (x) { return x.rev === rev; });
      shown = rev;
      document.querySelectorAll('.rev').forEach(function (li) { li.classList.toggle('is-selected', +li.getAttribute('data-rev') === rev); });
      var res = renderDiff(r.snapshot, current.snapshot, diffLang);
      panel.innerHTML = '<header class="panel-head"><h2>' + icon('columns') + esc(t('adm.history.diffTitle', { a: rev, b: current.rev })) + '</h2>' +
        '<div class="seg seg--sm" role="group" aria-label="' + esc(t('lang.label')) + '"><button type="button" data-dl="fr" aria-pressed="' + (diffLang === 'fr') + '">FR</button><button type="button" data-dl="en" aria-pressed="' + (diffLang === 'en') + '">EN</button></div></header>' +
        '<p class="diff-stats"><span class="plus">+' + res.add + '</span><span class="minus">−' + res.del + '</span><span class="sub">' + esc(t('adm.history.diffHint')) + '</span></p>' +
        (res.add || res.del ? '<div class="diff">' + res.html + '</div>' : '<p class="empty">' + esc(t('adm.history.identical')) + '</p>');
    }
    view.addEventListener('click', function (e) {
      var b;
      if ((b = e.target.closest('[data-diff]'))) showDiff(+b.getAttribute('data-diff'));
      else if ((b = e.target.closest('[data-dl]'))) { diffLang = b.getAttribute('data-dl'); if (shown) showDiff(shown); }
      else if ((b = e.target.closest('[data-view-rev]'))) {
        var r = p.revisions.find(function (x) { return x.rev === +b.getAttribute('data-view-rev'); });
        var vl = 'fr';
        var d = modal({
          wide: true, title: icon('eye') + esc(t('adm.history.rev', { n: r.rev })) + ' · ' + esc(S.userName(r.by)) + ' · ' + esc(fmtDateTime(r.at)), cancel: t('common.close'),
          body: '<div class="seg seg--sm" role="group" aria-label="' + esc(t('lang.label')) + '"><button type="button" data-vl="fr" aria-pressed="true">FR</button><button type="button" data-vl="en" aria-pressed="false">EN</button></div><div class="prose rev-preview" id="rev-preview"></div>'
        });
        var draw = function () {
          var c = r.snapshot[vl] || {};
          d.querySelector('#rev-preview').innerHTML = c.body ? '<h1 class="pv-title">' + esc(c.title || '') + '</h1>' + (c.summary ? '<p class="lead">' + esc(c.summary) + '</p>' : '') + MD.render(c.body, mdOpts()).html : '<p class="empty">' + esc(t('adm.editor.langMissing')) + '</p>';
          d.querySelectorAll('[data-vl]').forEach(function (x) { x.setAttribute('aria-pressed', x.getAttribute('data-vl') === vl); });
        };
        d.addEventListener('click', function (ev) { var x = ev.target.closest('[data-vl]'); if (x) { vl = x.getAttribute('data-vl'); draw(); } });
        draw();
      } else if ((b = e.target.closest('[data-restore]'))) {
        var rev = +b.getAttribute('data-restore');
        confirmBox(icon('restore') + esc(t('adm.history.restore')), esc(t('adm.history.restoreConfirm', { n: rev })), t('adm.history.restore')).then(function (ok) {
          if (!ok) return;
          var res = S.restoreRevision(p.id, rev, me.id, t('adm.history.restoredNote', { n: rev }));
          if (res.ok) { toast(icon('check') + esc(t('adm.history.restored', { n: rev, m: res.rev })), 'ok'); viewHistory(p.id); }
        });
      }
    });
  }

  // ---- Catégories -------------------------------------------------------------------
  var CAT_ICONS = ['flag', 'clipboard', 'signature', 'video', 'book', 'folder', 'award', 'users', 'calendar', 'layers', 'printer', 'keyboard'];
  var CAT_COLORS = ['blue', 'indigo', 'teal', 'rose', 'amber', 'green'];
  function viewCategories() {
    if (!can('category')) { forbidden(); return; }
    document.title = t('adm.nav.categories') + ' · CIS Wiki';
    view.innerHTML = viewHead(esc(t('adm.nav.categories')), esc(t('adm.cat.lead')), '<button type="button" class="btn btn--primary" data-action="new-cat">' + icon('plus') + esc(t('adm.cat.new')) + '</button>') +
      '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>' + esc(t('adm.cat.name')) + '</th><th>' + esc(t('adm.cat.desc')) + '</th><th>' + esc(t('adm.nav.pages')) + '</th><th>' + esc(t('adm.editor.order')) + '</th><th><span class="sr-only">' + esc(t('adm.col.actions')) + '</span></th></tr></thead><tbody>' +
      S.categories().map(function (c) {
        var n = S.livePages().filter(function (p) { return p.category === c.id; }).length;
        return '<tr><td class="cell-title"><span class="cell-user"><span class="side-ico cat--' + esc(c.color) + '">' + icon(c.icon) + '</span><span><a href="category.html?id=' + encodeURIComponent(c.id) + '" target="_blank" rel="noopener">' + esc(c.fr.title) + '</a><span class="sub">EN · ' + esc((c.en && c.en.title) || '—') + ' · <code>' + esc(c.id) + '</code></span></span></span></td>' +
          '<td class="cell-desc">' + esc(L(c, 'desc')) + '</td><td>' + n + '</td><td>' + esc(c.order) + '</td>' +
          '<td class="cell-actions"><button type="button" class="icon-btn" data-edit-cat="' + esc(c.id) + '" aria-label="' + esc(t('adm.act.edit') + ' : ' + c.fr.title) + '" title="' + esc(t('adm.act.edit')) + '">' + icon('edit') + '</button>' +
          '<button type="button" class="icon-btn icon-btn--danger" data-del-cat="' + esc(c.id) + '"' + (n ? ' aria-disabled="true" title="' + esc(t('adm.cat.notEmpty')) + '"' : ' title="' + esc(t('adm.act.delete')) + '"') + ' aria-label="' + esc(t('adm.act.delete') + ' : ' + c.fr.title) + '">' + icon('trash') + '</button></td></tr>';
      }).join('') + '</tbody></table></div>';
    view.onclick = function (e) {
      var b;
      if (e.target.closest('[data-action=new-cat]')) catForm(null);
      else if ((b = e.target.closest('[data-edit-cat]'))) catForm(S.category(b.getAttribute('data-edit-cat')));
      else if ((b = e.target.closest('[data-del-cat]'))) {
        var c = S.category(b.getAttribute('data-del-cat'));
        if (b.getAttribute('aria-disabled') === 'true') { toast(icon('info') + esc(t('adm.cat.notEmpty')), 'error'); return; }
        confirmBox(icon('trash') + esc(t('adm.act.delete')), t('adm.cat.confirmDelete', { name: '<strong>' + esc(c.fr.title) + '</strong>' }), t('adm.act.delete'), true).then(function (ok) {
          if (ok && S.deleteCategory(c.id, me.id).ok) { toast(icon('check') + esc(t('adm.saved')), 'ok'); refreshNav(); viewCategories(); }
        });
      }
    };
  }
  function catForm(c) {
    var isNew = !c;
    c = c ? clone(c) : { id: '', order: S.categories().length + 1, icon: 'folder', color: 'blue', fr: { title: '', desc: '' }, en: { title: '', desc: '' } };
    modal({
      title: icon('folder') + esc(isNew ? t('adm.cat.new') : t('adm.cat.edit')), submit: t('adm.editor.save'),
      body: '<div class="field-row"><div class="field"><label for="c-fr">' + esc(t('adm.cat.name')) + ' (FR) <span class="req">*</span></label><input id="c-fr" name="frTitle" value="' + esc(c.fr.title) + '"></div><div class="field"><label for="c-en">' + esc(t('adm.cat.name')) + ' (EN)</label><input id="c-en" name="enTitle" value="' + esc(c.en ? c.en.title : '') + '"></div></div>' +
        '<div class="field-row"><div class="field"><label for="c-frd">' + esc(t('adm.cat.desc')) + ' (FR)</label><textarea id="c-frd" name="frDesc" rows="2">' + esc(c.fr.desc) + '</textarea></div><div class="field"><label for="c-end">' + esc(t('adm.cat.desc')) + ' (EN)</label><textarea id="c-end" name="enDesc" rows="2">' + esc(c.en ? c.en.desc : '') + '</textarea></div></div>' +
        '<div class="field-row"><div class="field"><label for="c-id">' + esc(t('adm.editor.slug')) + ' <span class="req">*</span></label><input id="c-id" name="id" value="' + esc(c.id) + '"' + (isNew ? '' : ' readonly') + ' spellcheck="false"></div><div class="field"><label for="c-order">' + esc(t('adm.editor.order')) + '</label><input id="c-order" name="order" type="number" min="0" value="' + esc(c.order) + '"></div></div>' +
        '<div class="field-row"><div class="field"><label for="c-icon">' + esc(t('adm.cat.icon')) + '</label><select id="c-icon" name="icon">' + CAT_ICONS.map(function (x) { return opt(x, x, c.icon === x); }).join('') + '</select></div><div class="field"><label for="c-color">' + esc(t('adm.cat.color')) + '</label><select id="c-color" name="color">' + CAT_COLORS.map(function (x) { return opt(x, t('adm.color.' + x), c.color === x); }).join('') + '</select></div></div>',
      onOpen: function (d) {
        var fr = d.querySelector('[name=frTitle]'), idf = d.querySelector('[name=id]');
        if (isNew) fr.addEventListener('input', function () { if (!idf.dataset.touched) idf.value = MD.slugify(fr.value).slice(0, 40); });
        idf.addEventListener('input', function () { idf.dataset.touched = '1'; });
      },
      onSubmit: function (form) {
        clearErrors(form);
        var item = { id: form.elements['id'].value.trim(), order: parseInt(form.elements['order'].value, 10) || 0, icon: form.elements['icon'].value, color: form.elements['color'].value,
          fr: { title: form.elements['frTitle'].value.trim(), desc: form.elements['frDesc'].value.trim() }, en: { title: form.elements['enTitle'].value.trim(), desc: form.elements['enDesc'].value.trim() } };
        if (!item.fr.title) { fieldError(form, 'frTitle', t('adm.err.required')); return false; }
        if (isNew && (!S.ID_RE.test(item.id) || S.category(item.id))) { fieldError(form, 'id', S.category(item.id) ? t('adm.err.slugTaken') : t('adm.err.slug')); return false; }
        S.saveCategory(item, me.id, isNew);
        toast(icon('check') + esc(t('adm.saved')), 'ok');
        refreshNav(); viewCategories();
      }
    });
  }

  // ---- Glossaire --------------------------------------------------------------------
  function viewGlossary() {
    if (!can('glossary')) { forbidden(); return; }
    document.title = t('adm.nav.glossary') + ' · CIS Wiki';
    view.innerHTML = viewHead(esc(t('adm.nav.glossary')), esc(t('adm.gl.lead')), '<a class="btn btn--ghost" href="glossary.html" target="_blank" rel="noopener">' + icon('eye') + esc(t('adm.act.view')) + '</a><button type="button" class="btn btn--primary" data-action="new-term">' + icon('plus') + esc(t('adm.gl.new')) + '</button>') +
      '<div class="toolbar"><div class="input-icon">' + icon('search') + '<input type="search" id="g-q" placeholder="' + esc(t('glossary.filter')) + '" aria-label="' + esc(t('glossary.filter')) + '"></div></div>' +
      '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>' + esc(t('adm.gl.term')) + ' (FR)</th><th>' + esc(t('adm.gl.term')) + ' (EN)</th><th>' + esc(t('adm.gl.def')) + '</th><th>' + esc(t('adm.gl.page')) + '</th><th><span class="sr-only">' + esc(t('adm.col.actions')) + '</span></th></tr></thead><tbody id="g-body"></tbody></table></div><p class="tbl-foot" id="g-count"></p>';
    function draw() {
      var q = document.getElementById('g-q').value.toLowerCase();
      var items = S.glossary().filter(function (g) { return !q || (g.fr.term + ' ' + (g.en && g.en.term) + ' ' + g.fr.def + ' ' + (g.en && g.en.def)).toLowerCase().indexOf(q) !== -1; })
        .sort(function (a, b) { return a.fr.term.localeCompare(b.fr.term, 'fr'); });
      document.getElementById('g-body').innerHTML = items.map(function (g) {
        var p = g.page && S.page(g.page);
        return '<tr><td><strong>' + esc(g.fr.term) + '</strong>' + ((g.fr.aliases || []).length ? '<span class="sub">' + esc(g.fr.aliases.join(', ')) + '</span>' : '') + '</td><td>' + esc((g.en && g.en.term) || '—') + '</td><td class="cell-desc">' + esc(L(g, 'def')) + '</td>' +
          '<td>' + (p ? '<a href="article.html?id=' + encodeURIComponent(p.id) + '" target="_blank" rel="noopener">' + esc(p.fr.short || p.fr.title) + '</a>' : '—') + '</td>' +
          '<td class="cell-actions"><button type="button" class="icon-btn" data-edit-term="' + esc(g.id) + '" title="' + esc(t('adm.act.edit')) + '" aria-label="' + esc(t('adm.act.edit') + ' : ' + g.fr.term) + '">' + icon('edit') + '</button>' +
          '<button type="button" class="icon-btn icon-btn--danger" data-del-term="' + esc(g.id) + '" title="' + esc(t('adm.act.delete')) + '" aria-label="' + esc(t('adm.act.delete') + ' : ' + g.fr.term) + '">' + icon('trash') + '</button></td></tr>';
      }).join('') || '<tr><td colspan="5" class="empty">' + esc(t('glossary.none')) + '</td></tr>';
      document.getElementById('g-count').textContent = t('glossary.count', { n: items.length });
    }
    document.getElementById('g-q').addEventListener('input', draw);
    view.onclick = function (e) {
      var b;
      if (e.target.closest('[data-action=new-term]')) termForm(null, draw);
      else if ((b = e.target.closest('[data-edit-term]'))) termForm(S.glossary().find(function (g) { return g.id === b.getAttribute('data-edit-term'); }), draw);
      else if ((b = e.target.closest('[data-del-term]'))) {
        var g = S.glossary().find(function (x) { return x.id === b.getAttribute('data-del-term'); });
        confirmBox(icon('trash') + esc(t('adm.act.delete')), t('adm.gl.confirmDelete', { term: '<strong>' + esc(g.fr.term) + '</strong>' }), t('adm.act.delete'), true).then(function (ok) {
          if (ok && S.deleteTerm(g.id, me.id).ok) { toast(icon('check') + esc(t('adm.gl.deleted')), 'ok'); refreshNav(); viewGlossary(); }
        });
      }
    };
    draw();
  }
  function termForm(g, after) {
    var isNew = !g;
    g = g ? clone(g) : { id: '', page: '', fr: { term: '', aliases: [], def: '' }, en: { term: '', aliases: [], def: '' } };
    g.en = g.en || { term: '', aliases: [], def: '' };
    modal({
      title: icon('glossary') + esc(isNew ? t('adm.gl.new') : t('adm.gl.edit')), submit: t('adm.editor.save'),
      body: '<div class="field-row"><fieldset class="field"><legend>Français</legend>' +
          '<label for="g-fr">' + esc(t('adm.gl.term')) + ' <span class="req">*</span></label><input id="g-fr" name="frTerm" value="' + esc(g.fr.term) + '">' +
          '<label for="g-fra">' + esc(t('adm.gl.aliases')) + '</label><input id="g-fra" name="frAliases" value="' + esc((g.fr.aliases || []).join(', ')) + '">' +
          '<label for="g-frd">' + esc(t('adm.gl.def')) + ' <span class="req">*</span></label><textarea id="g-frd" name="frDef" rows="4">' + esc(g.fr.def) + '</textarea></fieldset>' +
        '<fieldset class="field"><legend>English</legend>' +
          '<label for="g-en">' + esc(t('adm.gl.term')) + '</label><input id="g-en" name="enTerm" value="' + esc(g.en.term) + '">' +
          '<label for="g-ena">' + esc(t('adm.gl.aliases')) + '</label><input id="g-ena" name="enAliases" value="' + esc((g.en.aliases || []).join(', ')) + '">' +
          '<label for="g-end">' + esc(t('adm.gl.def')) + '</label><textarea id="g-end" name="enDef" rows="4">' + esc(g.en.def) + '</textarea></fieldset></div>' +
        '<p class="help">' + esc(t('adm.gl.aliasesHelp')) + '</p>' +
        '<div class="field"><label for="g-page">' + esc(t('adm.gl.page')) + '</label><select id="g-page" name="page">' + opt('', '—', !g.page) + S.livePages().map(function (p) { return opt(p.id, p.fr.title, g.page === p.id); }).join('') + '</select></div>',
      onSubmit: function (form) {
        clearErrors(form);
        var split = function (s) { return s.split(',').map(function (x) { return x.trim(); }).filter(Boolean); };
        var item = { id: g.id, page: form.elements['page'].value,
          fr: { term: form.elements['frTerm'].value.trim(), aliases: split(form.elements['frAliases'].value), def: form.elements['frDef'].value.trim() },
          en: { term: form.elements['enTerm'].value.trim(), aliases: split(form.elements['enAliases'].value), def: form.elements['enDef'].value.trim() } };
        if (!item.fr.term) { fieldError(form, 'frTerm', t('adm.err.required')); return false; }
        if (!item.fr.def) { fieldError(form, 'frDef', t('adm.err.required')); return false; }
        S.saveTerm(item, me.id, isNew);
        toast(icon('check') + esc(t('adm.saved')), 'ok');
        refreshNav(); viewGlossary();
      }
    });
  }

  // ---- Utilisateurs --------------------------------------------------------------------
  function viewUsers() {
    if (!can('user')) { forbidden(); return; }
    document.title = t('adm.nav.users') + ' · CIS Wiki';
    var stats = {};
    S.allPages().forEach(function (p) {
      (stats[p.createdBy] = stats[p.createdBy] || { created: 0, revs: 0, last: '' }).created++;
      p.revisions.forEach(function (r) { var s = stats[r.by] = stats[r.by] || { created: 0, revs: 0, last: '' }; s.revs++; if (r.at > s.last) s.last = r.at; });
    });
    view.innerHTML = viewHead(esc(t('adm.nav.users')), esc(t('adm.users.lead')), '<button type="button" class="btn btn--primary" data-action="new-user">' + icon('plus') + esc(t('adm.users.new')) + '</button>') +
      '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>' + esc(t('adm.users.user')) + '</th><th>' + esc(t('adm.users.role')) + '</th><th>' + esc(t('adm.users.created')) + '</th><th>' + esc(t('adm.users.revs')) + '</th><th>' + esc(t('adm.users.last')) + '</th><th><span class="sr-only">' + esc(t('adm.col.actions')) + '</span></th></tr></thead><tbody>' +
      S.users().map(function (u) {
        var s = stats[u.id] || { created: 0, revs: 0, last: '' };
        var self = u.id === me.id;
        return '<tr><td>' + userCell(u.id, '<code>' + esc(u.id) + '</code>' + (self ? ' · ' + esc(t('adm.users.you')) : '') + (u.system ? ' · ' + esc(t('adm.users.system')) : '')) + '</td>' +
          '<td><span class="badge badge--role-' + esc(u.role) + '">' + esc(t('role.' + u.role)) + '</span></td><td>' + s.created + '</td><td>' + s.revs + '</td>' +
          '<td>' + (s.last ? '<time datetime="' + esc(s.last) + '" title="' + esc(fmtDateTime(s.last)) + '">' + esc(relDate(s.last)) + '</time>' : '—') + '</td>' +
          '<td class="cell-actions">' + (u.system ? '' : '<button type="button" class="icon-btn" data-edit-user="' + esc(u.id) + '" title="' + esc(t('adm.act.edit')) + '" aria-label="' + esc(t('adm.act.edit') + ' : ' + u.name) + '">' + icon('edit') + '</button>' +
            (self ? '' : '<button type="button" class="icon-btn icon-btn--danger" data-del-user="' + esc(u.id) + '" title="' + esc(t('adm.act.delete')) + '" aria-label="' + esc(t('adm.act.delete') + ' : ' + u.name) + '">' + icon('trash') + '</button>')) + '</td></tr>';
      }).join('') + '</tbody></table></div>' +
      '<section class="panel roles-panel"><h2 class="panel-title">' + esc(t('adm.users.roles')) + '</h2><div class="roles">' + ['admin', 'editor', 'translator'].map(function (r) {
        return '<div class="role-card"><h3><span class="badge badge--role-' + r + '">' + esc(t('role.' + r)) + '</span></h3><p>' + esc(t('role.' + r + 'Desc')) + '</p></div>';
      }).join('') + '</div><p class="hint">' + icon('info') + '<span>' + esc(t('adm.users.authHint')) + '</span></p></section>';
    view.onclick = function (e) {
      var b;
      if (e.target.closest('[data-action=new-user]')) userForm(null);
      else if ((b = e.target.closest('[data-edit-user]'))) userForm(S.user(b.getAttribute('data-edit-user')));
      else if ((b = e.target.closest('[data-del-user]'))) {
        var u = S.user(b.getAttribute('data-del-user'));
        confirmBox(icon('trash') + esc(t('adm.act.delete')), t('adm.users.confirmDelete', { name: '<strong>' + esc(u.name) + '</strong>' }), t('adm.act.delete'), true).then(function (ok) {
          if (ok && S.deleteUser(u.id, me.id).ok) { toast(icon('check') + esc(t('adm.saved')), 'ok'); refreshNav(); viewUsers(); }
        });
      }
    };
  }
  function userForm(u) {
    var isNew = !u;
    u = u ? clone(u) : { id: '', name: '', role: 'editor' };
    modal({
      title: icon('user') + esc(isNew ? t('adm.users.new') : t('adm.users.edit')), submit: t('adm.editor.save'),
      body: '<div class="field"><label for="u-name">' + esc(t('adm.users.name')) + ' <span class="req">*</span></label><input id="u-name" name="name" value="' + esc(u.name) + '" autocomplete="off"></div>' +
        '<div class="field"><label for="u-id">' + esc(t('adm.users.login')) + ' <span class="req">*</span></label><input id="u-id" name="id" value="' + esc(u.id) + '"' + (isNew ? '' : ' readonly') + ' spellcheck="false" autocomplete="off"><p class="help">' + esc(t('adm.users.loginHelp')) + '</p></div>' +
        '<div class="field"><label for="u-role">' + esc(t('adm.users.role')) + '</label><select id="u-role" name="role"' + (u.id === me.id ? ' disabled' : '') + '>' + ['admin', 'editor', 'translator'].map(function (r) { return opt(r, t('role.' + r), u.role === r); }).join('') + '</select>' + (u.id === me.id ? '<p class="help">' + esc(t('adm.users.selfRole')) + '</p>' : '') + '</div>',
      onOpen: function (d) {
        var n = d.querySelector('[name=name]'), idf = d.querySelector('[name=id]');
        if (isNew) n.addEventListener('input', function () { if (!idf.dataset.touched) idf.value = MD.slugify(n.value).replace(/-/g, '.').slice(0, 30); });
        idf.addEventListener('input', function () { idf.dataset.touched = '1'; });
      },
      onSubmit: function (form) {
        clearErrors(form);
        var item = Object.assign({}, u, { id: form.elements['id'].value.trim().toLowerCase(), name: form.elements['name'].value.trim(), role: u.id === me.id ? u.role : form.elements['role'].value });
        if (!item.name) { fieldError(form, 'name', t('adm.err.required')); return false; }
        var res = S.saveUser(item, me.id, isNew);
        if (!res.ok) { fieldError(form, 'id', res.reason === 'taken' ? t('adm.err.slugTaken') : t('adm.err.login')); return false; }
        toast(icon('check') + esc(t('adm.saved')), 'ok');
        refreshNav(); viewUsers();
      }
    });
  }

  // ---- Activité -------------------------------------------------------------------------
  function viewActivity(m, q) {
    document.title = t('adm.nav.activity') + ' · CIS Wiki';
    var fUser = q.get('user') || '', fType = q.get('type') || '';
    view.innerHTML = viewHead(esc(t('adm.nav.activity')), esc(t('adm.activity.lead'))) +
      '<div class="toolbar"><select id="a-user" aria-label="' + esc(t('adm.users.user')) + '">' + opt('', t('adm.activity.allUsers'), !fUser) + S.users().map(function (u) { return opt(u.id, u.name, fUser === u.id); }).join('') + '</select>' +
      '<select id="a-type" aria-label="' + esc(t('adm.activity.type')) + '">' + opt('', t('adm.activity.allTypes'), !fType) + ['page', 'category', 'glossary', 'user', 'settings'].map(function (x) { return opt(x, t('adm.type.' + x), fType === x); }).join('') + '</select></div><div id="a-list"></div>';
    function draw() {
      var u = document.getElementById('a-user').value, ty = document.getElementById('a-type').value;
      var items = S.data().activity.filter(function (a) { return (!u || a.by === u) && (!ty || a.type === ty); });
      var groups = [], last = '';
      items.slice(0, 200).forEach(function (a) { var k = a.at.slice(0, 10); if (k !== last) { groups.push({ day: a.at, items: [] }); last = k; } groups[groups.length - 1].items.push(a); });
      document.getElementById('a-list').innerHTML = groups.length ? groups.map(function (g) { return '<section class="day-group"><h2>' + esc(fmtDay(g.day)) + '</h2><ul class="feed panel">' + g.items.map(activityItem).join('') + '</ul></section>'; }).join('') : '<p class="empty">' + esc(t('adm.activity.none')) + '</p>';
    }
    document.getElementById('a-user').addEventListener('change', draw);
    document.getElementById('a-type').addEventListener('change', draw);
    draw();
  }

  // ---- Corbeille ----------------------------------------------------------------------
  function viewTrash() {
    if (!can('trash')) { forbidden(); return; }
    document.title = t('adm.nav.trash') + ' · CIS Wiki';
    var items = S.allPages().filter(function (p) { return p.deleted; }).sort(function (a, b) { return a.deleted.at < b.deleted.at ? 1 : -1; });
    var purge = can('page.delete') && me.role === 'admin';
    view.innerHTML = viewHead(esc(t('adm.nav.trash')), esc(t('adm.trash.lead'))) +
      (items.length ? '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>' + esc(t('adm.col.page')) + '</th><th>' + esc(t('adm.col.category')) + '</th><th>' + esc(t('adm.trash.deletedBy')) + '</th><th><span class="sr-only">' + esc(t('adm.col.actions')) + '</span></th></tr></thead><tbody>' +
        items.map(function (p) {
          return '<tr><td class="cell-title"><strong>' + esc(p.fr.title) + '</strong><span class="sub"><code>' + esc(p.id) + '</code> · <a href="#/pages/' + esc(p.id) + '/history">' + esc(t('adm.editor.revCount', { n: p.revisions.length })) + '</a></span></td><td>' + esc(catName(p.category)) + '</td>' +
            '<td>' + userCell(p.deleted.by, '<time datetime="' + esc(p.deleted.at) + '">' + esc(fmtDateTime(p.deleted.at)) + '</time>') + '</td>' +
            '<td class="cell-actions"><button type="button" class="btn btn--ghost btn--sm" data-restore-page="' + esc(p.id) + '">' + icon('restore') + esc(t('adm.trash.restore')) + '</button>' +
            (purge ? '<button type="button" class="btn btn--sm btn--danger-ghost" data-purge="' + esc(p.id) + '">' + icon('trash') + esc(t('adm.trash.purge')) + '</button>' : '') + '</td></tr>';
        }).join('') + '</tbody></table></div>' + (purge ? '' : '<p class="hint">' + icon('info') + '<span>' + esc(t('adm.trash.purgeAdmin')) + '</span></p>')
      : '<div class="empty-state">' + icon('trash', 'big') + '<p>' + esc(t('adm.trash.empty')) + '</p></div>');
    view.onclick = function (e) {
      var b;
      if ((b = e.target.closest('[data-restore-page]'))) {
        S.restorePage(b.getAttribute('data-restore-page'), me.id);
        toast(icon('restore') + esc(t('adm.trash.restored')), 'ok'); refreshNav(); viewTrash();
      } else if ((b = e.target.closest('[data-purge]'))) {
        var p = S.page(b.getAttribute('data-purge'));
        confirmBox(icon('warning') + esc(t('adm.trash.purge')), t('adm.trash.purgeConfirm', { title: '<strong>' + esc(p.fr.title) + '</strong>', n: p.revisions.length }), t('adm.trash.purgeBtn'), true).then(function (ok) {
          if (ok) { S.purgePage(p.id, me.id); toast(icon('check') + esc(t('adm.trash.purged')), 'ok'); refreshNav(); viewTrash(); }
        });
      }
    };
  }

  // ---- Paramètres ----------------------------------------------------------------------
  function viewSettings() {
    if (!can('settings')) { forbidden(); return; }
    document.title = t('adm.nav.settings') + ' · CIS Wiki';
    var st = S.settings();
    var kb = Math.round(S.storageSize() / 1024);
    view.innerHTML = viewHead(esc(t('adm.nav.settings')), esc(t('adm.set.lead'))) +
      '<div class="settings-grid"><form class="panel" id="set-form" novalidate><h2 class="panel-title">' + esc(t('adm.set.general')) + '</h2>' +
        '<div class="field"><label for="s-media">' + esc(t('adm.set.media')) + '</label><input id="s-media" name="mediaBase" value="' + esc(st.mediaBase) + '" spellcheck="false"><p class="help">' + esc(t('adm.set.mediaHelp')) + '</p></div>' +
        '<div class="field"><label for="s-contact">' + esc(t('adm.set.contact')) + '</label><input id="s-contact" name="contact" type="email" value="' + esc(st.contact) + '"></div>' +
        '<div class="field"><label for="s-cis">' + esc(t('footer.cis')) + '</label><input id="s-cis" name="cisUrl" value="' + esc(st.cisUrl) + '" spellcheck="false"></div>' +
        '<button type="submit" class="btn btn--primary">' + icon('save') + esc(t('adm.editor.save')) + '</button></form>' +
      '<section class="panel"><h2 class="panel-title">' + esc(t('adm.set.data')) + '</h2><p>' + esc(t('adm.set.dataLead', { kb: kb })) + '</p>' +
        '<div class="stack"><button type="button" class="btn btn--ghost" data-action="export">' + icon('download') + esc(t('adm.set.export')) + '</button>' +
        '<label class="btn btn--ghost file-btn">' + icon('upload') + esc(t('adm.set.import')) + '<input type="file" accept="application/json,.json" id="import-file" class="sr-only"></label>' +
        '<button type="button" class="btn btn--ghost btn--danger-ghost" data-action="reset">' + icon('restore') + esc(t('adm.set.reset')) + '</button></div>' +
        '<p class="hint">' + icon('info') + '<span>' + esc(t('adm.set.dataHint')) + '</span></p></section></div>';
    document.getElementById('set-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var f = e.target;
      clearErrors(f);
      var mb = f.elements['mediaBase'].value.trim();
      if (!/^https?:\/\//.test(mb) && mb !== '') { fieldError(f, 'mediaBase', t('adm.err.url')); return; }
      if (mb && !/\/$/.test(mb)) mb += '/';
      S.saveSettings({ mediaBase: mb, contact: f.elements['contact'].value.trim(), cisUrl: f.elements['cisUrl'].value.trim() }, me.id);
      toast(icon('check') + esc(t('adm.saved')), 'ok');
    });
    view.onclick = function (e) {
      var b = e.target.closest('[data-action]');
      if (!b) return;
      if (b.getAttribute('data-action') === 'export') {
        var blob = new Blob([JSON.stringify(S.exportData(), null, 2)], { type: 'application/json' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'cis-wiki-' + new Date().toISOString().slice(0, 10) + '.json';
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
        toast(icon('download') + esc(t('adm.set.exported')), 'ok');
      }
      if (b.getAttribute('data-action') === 'reset') {
        confirmBox(icon('warning') + esc(t('adm.set.reset')), esc(t('adm.set.resetConfirm')), t('adm.set.reset'), true).then(function (ok) {
          if (!ok) return;
          S.reset();
          if (!S.login(me.id)) { S.logout(); }
          toast(icon('check') + esc(t('adm.set.resetDone')), 'ok');
          route();
        });
      }
    };
    document.getElementById('import-file').addEventListener('change', function (e) {
      var file = e.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        var obj;
        try { obj = JSON.parse(reader.result); } catch (err) { toast(icon('warning') + esc(t('adm.set.importBad')), 'error'); return; }
        confirmBox(icon('upload') + esc(t('adm.set.import')), esc(t('adm.set.importConfirm', { n: (obj.pages || []).length })), t('adm.set.import'), true).then(function (ok) {
          if (!ok) return;
          if (S.importData(obj, me.id)) { toast(icon('check') + esc(t('adm.set.imported')), 'ok'); if (!S.currentUser()) S.logout(); route(); }
          else toast(icon('warning') + esc(t('adm.set.importBad')), 'error');
        });
      };
      reader.readAsText(file);
      e.target.value = '';
    });
  }

  // ---- Routage --------------------------------------------------------------------------
  var ROUTES = [
    [/^\/?(dashboard)?$/, viewDashboard],
    [/^\/pages$/, viewPages],
    [/^\/pages\/new$/, function (m, q) { viewEditor(null, q); }],
    [/^\/pages\/([a-z0-9-]+)\/edit$/, function (m, q) { viewEditor(m[1], q); }],
    [/^\/pages\/([a-z0-9-]+)\/history$/, function (m) { viewHistory(m[1]); }],
    [/^\/categories$/, viewCategories],
    [/^\/glossary$/, viewGlossary],
    [/^\/users$/, viewUsers],
    [/^\/activity$/, viewActivity],
    [/^\/trash$/, viewTrash],
    [/^\/settings$/, viewSettings]
  ];
  function route() {
    applyPrefs();
    me = S.currentUser();
    if (!me) { renderLogin(); return; }
    var raw = location.hash.replace(/^#/, '') || '/dashboard';
    var parts = raw.split('?');
    var path = parts[0], q = new URLSearchParams(parts[1] || '');
    var section = path.split('/')[1] || 'dashboard';
    renderChrome(section);
    document.body.classList.remove('nav-open');
    for (var i = 0; i < ROUTES.length; i++) {
      var m = path.match(ROUTES[i][0]);
      if (m) { ROUTES[i][1](m, q); window.scrollTo(0, 0); return; }
    }
    notFound();
  }

  window.addEventListener('hashchange', function () {
    if (dirty && !window.confirm(t('adm.editor.leave'))) { history.replaceState(null, '', lastHash || '#/dashboard'); return; }
    dirty = false;
    lastHash = location.hash;
    route();
  });
  window.addEventListener('beforeunload', function (e) { if (dirty) { e.preventDefault(); e.returnValue = ''; } });
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-action], button[data-lang]');
    if (!b) return;
    if (b.hasAttribute('data-lang')) {
      var l = b.getAttribute('data-lang');
      if (l === lang) return;
      if (dirty && !window.confirm(t('adm.editor.leave'))) return;
      dirty = false; lang = l; S.setPref('lang', l); route(); return;
    }
    switch (b.getAttribute('data-action')) {
      case 'logout':
        if (dirty && !window.confirm(t('adm.editor.leave'))) return;
        dirty = false; S.logout(); location.hash = ''; route(); break;
      case 'open-nav': document.body.classList.add('nav-open'); break;
      case 'close-nav': document.body.classList.remove('nav-open'); break;
      case 'theme':
        theme = theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system';
        S.setPref('theme', theme); applyPrefs();
        b.innerHTML = icon(theme === 'dark' ? 'moon' : theme === 'light' ? 'sun' : 'monitor');
        b.title = t('theme.label') + ' : ' + t('theme.' + theme); b.setAttribute('aria-label', b.title);
        break;
    }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') document.body.classList.remove('nav-open'); });
  S.subscribe(function (src) { if (src === 'remote' && !dirty) route(); });

  route();
})();
