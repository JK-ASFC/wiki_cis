/*
 * CIS Wiki — site public (accueil, page, catégorie, recherche, glossaire).
 * Chaque fichier HTML porte data-page="…" sur <body> ; ce script construit la page.
 */
(function () {
  'use strict';

  var S = window.CISStore, I = window.CISI18n, MD = window.CISMarkdown, icon = window.CISIcons.icon;
  var esc = MD.escape;
  var params = new URLSearchParams(location.search);
  var page = document.body.getAttribute('data-page') || 'home';
  var lang, mode, theme;

  // ---- Préférences ------------------------------------------------------
  function initPrefs() {
    var qLang = params.get('lang'), qMode = params.get('mode');
    if (qLang === 'fr' || qLang === 'en') S.setPref('lang', qLang);
    if (qMode === 'guided' || qMode === 'expert') S.setPref('mode', qMode);
    var nav = (navigator.language || 'fr').slice(0, 2).toLowerCase();
    lang = S.pref('lang', nav === 'en' ? 'en' : 'fr');
    mode = 'guided'; // un seul mode d'affichage : tout est expliqué pour les débutants
    theme = S.pref('theme', 'system');
  }
  function t(k, v) { return I.t(lang, k, v); }
  function applyPrefs() {
    var html = document.documentElement;
    html.lang = lang;
    html.removeAttribute('data-theme'); // charte WorldSkills France : toujours en clair, lisible partout
    document.body.setAttribute('data-mode', mode);
  }

  // ---- Helpers de contenu --------------------------------------------------
  function C(p) {
    if (S.isTranslated(p, lang)) return { c: p[lang], fallback: false, lang: lang };
    return { c: p.fr, fallback: lang !== 'fr', lang: 'fr' };
  }
  function title(p) { return C(p).c.title; }
  function shortTitle(p) { var c = C(p).c; return c.short || c.title; }
  function L(obj, field) { return (obj[lang] && obj[lang][field]) || (obj.fr && obj.fr[field]) || ''; }
  function visible(p) { return !!(p && !p.deleted && p.status === 'published'); }
  function articleUrl(id, hash) { return 'article.html?id=' + encodeURIComponent(id) + (hash ? '#' + hash : ''); }
  function categoryUrl(id) { return 'category.html?id=' + encodeURIComponent(id); }

  function mdOpts() {
    return {
      mediaBase: S.settings().mediaBase,
      icon: icon,
      labels: {
        note: t('md.note'), tip: t('md.tip'), warning: t('md.warning'), important: t('md.important'),
        details: t('md.details'), guided: t('md.guided'), expert: t('md.expert'),
        screenshot: t('md.screenshot'), zoom: t('md.zoom'), anchor: t('md.anchor'), simulator: t('md.simulator')
      },
      resolveLink: function (id) {
        var p = S.page(id);
        return { href: articleUrl(id), title: visible(p) ? title(p) : id, missing: !visible(p) };
      }
    };
  }

  function steps() {
    var meta = S.settings().workflow || [];
    return S.publicPages().filter(function (p) { return p.step; })
      .sort(function (a, b) { return a.step - b.step || (a.order || 0) - (b.order || 0); })
      .map(function (p) {
        var w = meta.find(function (x) { return x.step === p.step; }) || {};
        return { p: p, step: p.step, phase: w.phase || 'before', icon: w.icon || 'file' };
      });
  }

  var LOCALE = { fr: 'fr-FR', en: 'en-GB' };
  function fmtDate(iso) {
    try { return new Intl.DateTimeFormat(LOCALE[lang], { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso)); } catch (e) { return iso; }
  }
  function fmtDateTime(iso) {
    try { return new Intl.DateTimeFormat(LOCALE[lang], { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso)); } catch (e) { return iso; }
  }
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
  var LEVEL_ICON = { beginner: 'cap', intermediate: 'layers', advanced: 'zap' };
  function levelBadge(l) { return '<span class="badge badge--' + esc(l) + '">' + icon(LEVEL_ICON[l] || 'layers') + esc(t('level.' + l)) + '</span>'; }
  function menuPath(path) {
    return '<span class="menupath-chips">' + path.split('›').map(function (s) { return '<kbd class="ui">' + esc(s.trim()) + '</kbd>'; }).join('<span class="sep" aria-hidden="true">›</span>') + '</span>';
  }
  function breadcrumb(items) {
    return '<nav class="breadcrumb" aria-label="' + esc(t('nav.breadcrumb')) + '"><ol>' + items.map(function (it, i) {
      var last = i === items.length - 1;
      return '<li>' + (it[1] && !last ? '<a href="' + it[1] + '">' + esc(it[0]) + '</a>' : '<span' + (last ? ' aria-current="page"' : '') + '>' + esc(it[0]) + '</span>') + '</li>';
    }).join('') + '</ol></nav>';
  }

  // ---- Recherche -------------------------------------------------------------
  function norm(s) {
    return String(s || '').split('').map(function (c) {
      var d = c.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
      return d.charAt(0) || c;
    }).join('');
  }
  var _index = null;
  function buildIndex() {
    if (_index) return _index;
    _index = S.publicPages().map(function (p) {
      var c = C(p).c, cat = S.category(p.category);
      var body = MD.toPlain(c.body);
      var quick = (c.quick || []).map(MD.toPlain).join(' ');
      return {
        p: p, title: c.title, summary: c.summary || '', body: body, cat: cat ? L(cat, 'title') : '',
        nTitle: norm(c.title + ' ' + (c.short || '')), nSummary: norm(c.summary), nBody: norm(body + ' ' + quick),
        nTags: norm((p.tags || []).join(' ') + ' ' + (p.menuPath || ''))
      };
    });
    return _index;
  }
  function count(hay, w) { var n = 0, i = 0; while ((i = hay.indexOf(w, i)) !== -1) { n++; i += w.length; } return n; }
  function terms(q) { return norm(q).split(/[\s,;]+/).filter(function (w) { return w.length > 1; }); }
  function search(q) {
    var ws = terms(q);
    if (!ws.length) return [];
    var res = [];
    buildIndex().forEach(function (e) {
      var score = 0, all = true;
      ws.forEach(function (w) {
        var s = 0;
        if (e.nTitle.indexOf(w) !== -1) s += 10;
        if (e.nTags.indexOf(w) !== -1) s += 5;
        if (e.nSummary.indexOf(w) !== -1) s += 3;
        s += Math.min(count(e.nBody, w), 5);
        if (!s) all = false;
        score += s;
      });
      if (all && score) res.push({ e: e, score: score, terms: ws });
    });
    return res.sort(function (a, b) { return b.score - a.score; });
  }
  function searchTerms(q) {
    var ws = terms(q);
    if (!ws.length) return [];
    return S.glossary().filter(function (g) {
      var e = g[lang] && g[lang].term ? g[lang] : g.fr;
      var hay = norm([e.term].concat(e.aliases || []).join(' ') + ' ' + (g.fr.term || '') + ' ' + ((g.en && g.en.term) || ''));
      return ws.every(function (w) { return hay.indexOf(w) !== -1; });
    });
  }
  function highlight(s, ws) {
    var n = norm(s), marks = [];
    ws.forEach(function (w) { var i = 0; while ((i = n.indexOf(w, i)) !== -1) { marks.push([i, i + w.length]); i += w.length; } });
    if (!marks.length) return esc(s);
    marks.sort(function (a, b) { return a[0] - b[0]; });
    var merged = [marks[0]];
    marks.slice(1).forEach(function (m) { var last = merged[merged.length - 1]; if (m[0] <= last[1]) last[1] = Math.max(last[1], m[1]); else merged.push(m); });
    var out = '', pos = 0;
    merged.forEach(function (m) { out += esc(s.slice(pos, m[0])) + '<mark>' + esc(s.slice(m[0], m[1])) + '</mark>'; pos = m[1]; });
    return out + esc(s.slice(pos));
  }
  function snippet(text, ws, len) {
    var n = norm(text), pos = -1;
    ws.some(function (w) { pos = n.indexOf(w); return pos !== -1; });
    if (pos === -1) return esc(text.slice(0, len)) + (text.length > len ? '…' : '');
    var start = Math.max(0, pos - Math.floor(len / 3));
    var end = Math.min(text.length, start + len);
    return (start > 0 ? '…' : '') + highlight(text.slice(start, end), ws) + (end < text.length ? '…' : '');
  }

  // ---- Coquille commune -------------------------------------------------------
  function segBtn(kind, val, label, on, tip) {
    return '<button type="button" data-' + kind + '="' + val + '" aria-pressed="' + on + '" title="' + esc(tip) + '">' + label + '</button>';
  }
  function logo(cls) {
    return '<img class="' + cls + '" src="assets/img/logo-worldskills-france.png" alt="WorldSkills France" width="160" height="150">';
  }
  function header() {
    var catId = page === 'category' ? params.get('id') : (page === 'article' && S.page(params.get('id')) ? S.page(params.get('id')).category : '');
    function nav(href, label, on) { return '<a href="' + href + '"' + (on ? ' aria-current="page" class="active"' : '') + '>' + esc(label) + '</a>'; }
    return '<div class="tricolor" aria-hidden="true"><i></i><i></i><i></i></div>' +
      '<header class="site-header"><div class="header-inner">' +
      '<button class="icon-btn menu-btn" type="button" data-action="open-sidebar" aria-label="' + esc(t('nav.menu')) + '" aria-controls="sidebar" aria-expanded="false">' + icon('menu') + '</button>' +
      '<a class="brand" href="index.html">' + logo('brand-logo') + '<span class="brand-sep" aria-hidden="true"></span><span class="brand-text"><strong>' + esc(t('brand.name')) + '</strong><small>' + esc(t('brand.tagline')) + '</small></span></a>' +
      '<nav class="header-nav" aria-label="' + esc(t('nav.main')) + '">' +
        nav('guide.html', t('nav.guide'), page === 'guide') +
        nav(categoryUrl('start'), t('nav.guides'), ['start', 'bareme', 'calculs', 'organisation', 'notation', 'aide'].indexOf(catId) !== -1) +
        nav(categoryUrl('videos'), t('nav.videos'), catId === 'videos') +
        nav('glossary.html', t('nav.glossary'), page === 'glossary') +
      '</nav>' +
      '<button class="search-trigger" type="button" data-action="open-palette">' + icon('search') + '<span>' + esc(t('search.placeholder')) + '</span><kbd>Ctrl K</kbd></button>' +
      '<div class="header-tools">' +
        '<button type="button" class="btn btn--ghost btn--sm fb-open" data-feedback-open="avis">' + icon('edit') + '<span>' + esc(t('feedback.open')) + '</span></button>' +
        '<div class="seg seg--lang" role="group" aria-label="' + esc(t('lang.label')) + '">' +
          segBtn('lang', 'fr', 'FR', lang === 'fr', 'Français') + segBtn('lang', 'en', 'EN', lang === 'en', 'English') +
        '</div>' +
      '</div></div></header>';
  }

  function sidebar() {
    var current = page === 'article' ? S.page(params.get('id')) : null;
    var currentCat = page === 'category' ? params.get('id') : (current && current.category);
    var html = '<div class="sidebar-head"><strong>' + esc(t('nav.docs')) + '</strong><button class="icon-btn" type="button" data-action="close-sidebar" aria-label="' + esc(t('common.close')) + '">' + icon('x') + '</button></div>' +
      '<nav class="side-nav" aria-label="' + esc(t('nav.docs')) + '">' +
      '<a class="side-link side-link--home" href="index.html">' + icon('book') + '<span>' + esc(t('nav.home')) + '</span></a>' +
      '<a class="side-link' + (page === 'guide' ? ' active" aria-current="page"' : '"') + ' href="guide.html">' + icon('compass') + '<span>' + esc(t('nav.guide')) + '</span></a>';
    S.categories().forEach(function (cat) {
      var pages = S.pagesIn(cat.id);
      if (!pages.length) return;
      var open = !currentCat || cat.id === currentCat || (currentCat === 'start' && cat.id === 'bareme');
      html += '<details class="side-group"' + (open ? ' open' : '') + '><summary><span class="side-ico cat--' + esc(cat.color) + '">' + icon(cat.icon) + '</span><span>' + esc(L(cat, 'title')) + '</span>' + icon('chevronDown', 'chev') + '</summary><ul>';
      pages.forEach(function (p) {
        var active = current && current.id === p.id;
        html += '<li><a href="' + articleUrl(p.id) + '"' + (active ? ' aria-current="page" class="active"' : '') + '>' +
          (p.step ? '<span class="step-dot">' + p.step + '</span>' : '<span class="dot" aria-hidden="true"></span>') +
          '<span class="side-label">' + esc(shortTitle(p)) + '</span>' +
          (S.isTranslated(p, lang) ? '' : '<span class="tr-flag" title="' + esc(t('cat.frOnly')) + '">FR</span>') + '</a></li>';
      });
      html += '</ul></details>';
    });
    html += '<a class="side-link' + (page === 'glossary' ? ' active" aria-current="page"' : '"') + ' href="glossary.html">' + icon('glossary') + '<span>' + esc(t('nav.glossary')) + '</span></a></nav>' +
      '';
    return html;
  }
  function sideCard() {
    var other = mode === 'guided' ? 'expert' : 'guided';
    return '<p class="side-card-title">' + icon(mode === 'guided' ? 'compass' : 'zap') + esc(t('mode.current', { mode: t('mode.' + mode) })) + '</p>' +
      '<p>' + esc(t(mode === 'guided' ? 'mode.guidedHint' : 'mode.expertHint')) + '</p>' +
      '<button type="button" class="btn btn--ghost btn--sm" data-mode="' + other + '">' + icon(other === 'guided' ? 'compass' : 'zap') + esc(t('mode.switchTo', { mode: t('mode.' + other) })) + '</button>';
  }

  function footer() {
    var st = S.settings();
    return '<footer class="site-footer"><div class="container footer-inner">' +
      '<div class="footer-brand"><a href="index.html" class="footer-logo-link">' + logo('footer-logo') + '</a><p>' + esc(t('footer.about')) + '</p></div>' +
      '<nav class="footer-links" aria-label="' + esc(t('footer.links')) + '">' +
        '<a class="pill" href="guide.html">' + esc(t('nav.guide')) + '</a>' +
        '<a class="pill" href="' + categoryUrl('start') + '">' + esc(t('nav.guides')) + '</a>' +
        '<a class="pill" href="glossary.html">' + esc(t('nav.glossary')) + '</a>' +
        '<a class="pill" href="' + esc(st.cisUrl) + '" target="_blank" rel="noopener">' + esc(t('footer.cis')) + '</a>' +
        '<button type="button" class="pill pill--gold" data-feedback-open="avis">' + esc(t('feedback.open')) + '</button>' +
        '<a class="pill" href="mailto:' + esc(st.contact) + '">' + esc(t('footer.contact')) + '</a>' +
      '</nav></div>' +
      '<div class="container footer-note"><span>© WorldSkills France · ' + esc(t('footer.note')) + '</span><a href="mailto:' + esc(st.contact) + '">' + esc(st.contact) + '</a></div></footer>';
  }


  function paletteHTML() {
    return '<div class="palette-wrap" id="palette" hidden><div class="palette" role="dialog" aria-modal="true" aria-label="' + esc(t('search.title')) + '">' +
      '<div class="palette-input">' + icon('search') + '<input id="palette-input" type="text" autocomplete="off" spellcheck="false" placeholder="' + esc(t('search.placeholder')) + '" role="combobox" aria-expanded="true" aria-controls="palette-list" aria-autocomplete="list"><kbd>Esc</kbd></div>' +
      '<ul id="palette-list" class="palette-list" role="listbox" aria-label="' + esc(t('search.results')) + '"></ul>' +
      '<p class="palette-foot">' + esc(t('palette.hint')) + '</p></div></div>';
  }

  function shell(withSidebar) {
    var app = document.getElementById('app');
    app.innerHTML =
      '<a class="skip-link" href="#main">' + esc(t('a11y.skip')) + '</a>' + header() +
      '<div class="layout' + (withSidebar ? ' layout--sidebar' : '') + '">' +
        '<aside class="sidebar" id="sidebar" aria-label="' + esc(t('nav.docs')) + '">' + sidebar() + '</aside>' +
        '<div class="backdrop" data-action="close-sidebar"></div>' +
        '<main id="main" class="main" tabindex="-1"></main>' +
      '</div>' + footer() + paletteHTML() +
      '<div class="term-pop" id="term-pop" role="tooltip" hidden></div>' +
      '<dialog class="lightbox" id="lightbox" aria-label="' + esc(t('md.zoom')) + '"><button type="button" class="icon-btn lightbox-close" data-action="close-lightbox" aria-label="' + esc(t('common.close')) + '">' + icon('x') + '</button><img alt=""><p class="lightbox-cap"></p></dialog>' +
      '<dialog class="modal" id="modal"></dialog>' +
      '<div class="toasts" id="toasts" role="status" aria-live="polite"></div>';
    return document.getElementById('main');
  }

  // ---- Accueil --------------------------------------------------------------
  function renderHome(main) {
    document.title = t('brand.name') + ' · WorldSkills France';
    var wf = steps();
    var hero = '<section class="welcome"><div class="container welcome-inner">' +
      '<p class="welcome-kicker">' + esc(t('home.kicker')) + '</p>' +
      '<h1>' + esc(t('home.welcome')) + '</h1>' +
      '<p class="welcome-lead">' + esc(t('home.welcomeLead')) + '</p>' +
      '<div class="welcome-actions"><a class="btn btn--gold btn--lg" href="guide.html">' + icon('compass') + esc(t('home.startGuide')) + '</a>' +
        '<a class="btn btn--outline-light btn--lg" href="' + articleUrl('decouvrir-le-cis') + '">' + esc(t('home.readDocs')) + '</a></div>' +
      '<form class="welcome-search" action="search.html" role="search"><label class="sr-only" for="hero-q">' + esc(t('search.title')) + '</label>' + icon('search') +
        '<input id="hero-q" name="q" type="search" placeholder="' + esc(t('search.hero')) + '" autocomplete="off"><button class="btn btn--primary" type="submit">' + esc(t('search.button')) + '</button></form>' +
      '</div></section>';

    var explain = '<section class="container section intro3">' +
      ['what', 'who', 'how'].map(function (k, i) {
        return '<div class="intro3-item"><span class="intro3-num">' + (i + 1) + '</span><h2>' + esc(t('home.' + k + 'Title')) + '</h2><p>' + MD.inline(t('home.' + k + 'Text'), mdOpts()) + '</p></div>';
      }).join('') + '</section>';

    var guideBand = '<section class="container section"><a class="guide-band" href="guide.html"><span class="guide-band-icon">' + icon('compass') + '</span>' +
      '<span class="guide-band-text"><strong>' + esc(t('home.guideTitle')) + '</strong><span>' + esc(t('home.guideText')) + '</span></span><span class="btn btn--primary">' + esc(t('home.startGuide')) + icon('arrowRight') + '</span></a></section>';

    var workflow = '<section class="container section" id="workflow"><h2 class="section-title">' + esc(t('home.workflowTitle')) + '</h2><p class="section-lead">' + esc(t('home.workflowLead')) + '</p>' +
      '<ol class="path-list">' + wf.map(function (x) {
        return '<li><a href="' + articleUrl(x.p.id) + '"><span class="path-num">' + x.step + '</span><span class="path-text"><strong>' + esc(shortTitle(x.p)) + '</strong><small>' + esc(C(x.p).c.summary) + '</small></span>' + icon('chevronRight') + '</a></li>';
      }).join('') + '</ol></section>';

    var cats = '<section class="container section"><h2 class="section-title">' + esc(t('home.categoriesTitle')) + '</h2><div class="cat-list">' +
      S.categories().filter(function (cat) { return S.pagesIn(cat.id).length; }).map(function (cat) {
        return '<a class="cat-item" href="' + categoryUrl(cat.id) + '"><span class="cat-item-icon">' + icon(cat.icon) + '</span><span><strong>' + esc(L(cat, 'title')) + '</strong><small>' + esc(L(cat, 'desc')) + '</small></span></a>';
      }).join('') + '</div></section>';

    var help = '<section class="container section"><div class="help-box">' + icon('info') + '<p>' + MD.inline(t('home.help'), mdOpts()) + '</p></div></section>';

    main.innerHTML = hero + explain + guideBand + workflow + cats + help;
  }

  function renderGuide(main) {
    document.title = t('nav.guide') + ' · ' + t('brand.name');
    main.innerHTML = '<div class="tour" id="tour"></div>';
    if (window.CISTour) window.CISTour.mount(document.getElementById('tour'), lang, mdOpts());
  }

  function videoCard(p) {
    return '<a class="video-card" href="' + articleUrl(p.id) + '"><span class="video-thumb">' + icon('play') + '</span><strong>' + esc(shortTitle(p)) + '</strong><span>' + esc(C(p).c.summary) + '</span></a>';
  }

  // ---- Page (article) -----------------------------------------------------------
  function renderArticle(main) {
    var id = params.get('id');
    var p = id && S.page(id);
    var canPreview = p && !p.deleted && S.currentUser();
    if (!p || p.deleted || (p.status !== 'published' && !canPreview)) { notFound(main); return; }
    var r = C(p), c = r.c, cat = S.category(p.category);
    var res = MD.render(c.body, mdOpts());
    var wf = steps();
    var wfIdx = wf.findIndex(function (x) { return x.p.id === p.id; });
    var wfNext = wfIdx !== -1 && wf[wfIdx + 1] ? wf[wfIdx + 1] : null;
    var siblings = S.pagesIn(p.category);
    var idx = siblings.findIndex(function (x) { return x.id === p.id; });
    var prev = idx > 0 ? siblings[idx - 1] : null, next = idx !== -1 ? siblings[idx + 1] : null;
    var minutes = Math.max(1, Math.round(MD.toPlain(c.body).split(/\s+/).length / 200));
    var vid = p.video && S.page(p.video);
    document.title = c.title + ' · CIS Wiki';

    var html = '<div class="article-layout"><article class="article" lang="' + r.lang + '">' +
      breadcrumb([[t('nav.home'), 'index.html'], [cat ? L(cat, 'title') : '', cat ? categoryUrl(cat.id) : ''], [c.short || c.title]]) +
      (r.fallback ? '<p class="notice notice--lang">' + icon('translate') + '<span>' + esc(t('article.fallback')) + '</span></p>' : '') +
      (p.status !== 'published' ? '<p class="notice notice--draft">' + icon('edit') + '<span>' + esc(t('article.draft')) + '</span></p>' : '') +
      '<header class="article-head"><div class="badges">' + levelBadge(p.level) +
        (p.step ? '<span class="badge badge--step">' + icon('map') + esc(t('article.stepOf', { n: p.step, total: wf.length })) + '</span>' : '') +
        '<span class="badge badge--plain">' + icon('clock') + esc(t('article.readTime', { n: minutes })) + '</span></div>' +
        '<h1>' + esc(c.title) + '</h1>' + (c.summary ? '<p class="lead">' + esc(c.summary) + '</p>' : '') +
        (p.menuPath ? '<p class="menupath">' + icon('map') + '<span class="menupath-label">' + esc(t('article.inCis')) + '</span>' + menuPath(p.menuPath) + '</p>' : '') +
        '<p class="article-date">' + icon('clock') + esc(t('article.updatedOn', { date: fmtDate(p.updatedAt) })) + '</p>' +
      '</header>' +
      guidedIntro(p, c) + expertCheat(c) +
      '<div class="prose" id="article-body">' + res.html + '</div>' +
      articleFoot(p, prev, next, wfNext) +
      '</article>' + toc(res.headings) + '</div>';
    main.innerHTML = html;
    highlightTerms(document.getElementById('article-body'));
    if (window.CISCalc) window.CISCalc.mount(document.getElementById('article-body'), lang);
    initScrollSpy();
    if (location.hash) { var target = document.getElementById(decodeURIComponent(location.hash.slice(1))); if (target) setTimeout(function () { target.scrollIntoView(); }, 0); }
  }

  function guidedIntro(p, c) {
    var pre = (p.prereq || []).map(S.page).filter(visible);
    var obj = c.objectives || [];
    if (!pre.length && !obj.length) return '';
    return '<section class="intro-box only-guided" aria-labelledby="intro-title"><h2 class="box-title" id="intro-title">' + icon('compass') + esc(t('article.before')) + '</h2><div class="intro-grid">' +
      (obj.length ? '<div><h3>' + icon('target') + esc(t('article.learn')) + '</h3><ul class="checks">' + obj.map(function (o) { return '<li>' + icon('check') + '<span>' + MD.inline(o, mdOpts()) + '</span></li>'; }).join('') + '</ul></div>' : '') +
      (pre.length ? '<div><h3>' + icon('listChecks') + esc(t('article.prereq')) + '</h3><ul class="prereq">' + pre.map(function (x) {
        return '<li><a href="' + articleUrl(x.id) + '">' + (x.step ? '<span class="step-dot">' + x.step + '</span>' : icon('file')) + '<span>' + esc(shortTitle(x)) + '</span></a></li>';
      }).join('') + '</ul></div>' : '') +
      '</div></section>';
  }
  function expertCheat(c) {
    var q = c.quick || [];
    if (!q.length) return '';
    return '<details class="cheat"><summary>' + icon('zap') + esc(t('article.cheat')) + '</summary><ol class="cheat-list">' +
      q.map(function (s) { return '<li><span>' + MD.inline(s, mdOpts()) + '</span></li>'; }).join('') + '</ol></details>';
  }
  function articleFoot(p, prev, next, wfNext) {
    var fb = S.pref('fb:' + p.id);
    return '<footer class="article-foot">' +
      (wfNext ? '<a class="next-step only-guided" href="' + articleUrl(wfNext.p.id) + '"><span class="ns-label">' + esc(t('article.nextStep')) + ' · ' + esc(t('home.step', { n: wfNext.step })) + '</span><strong>' + esc(title(wfNext.p)) + '</strong>' + icon('arrowRight', 'ns-arrow') + '</a>' : '') +
      '<div class="feedback" id="feedback">' + (fb ? '<p>' + icon('check') + esc(t('article.thanks')) + '</p>' :
        '<p>' + esc(t('article.feedback')) + '</p><div class="fb-btns"><button type="button" class="btn btn--ghost btn--sm" data-feedback="1">' + icon('thumbUp') + esc(t('article.yes')) + '</button><button type="button" class="btn btn--ghost btn--sm" data-feedback="0">' + icon('thumbDown') + esc(t('article.no')) + '</button></div>') +
        '<p class="fb-report">' + esc(t('feedback.missing')) + ' <button type="button" class="link-btn" data-feedback-open="manque">' + icon('edit') + esc(t('feedback.report')) + '</button></p></div>' +
      '<nav class="pager" aria-label="' + esc(t('article.pager')) + '">' +
        (prev ? '<a class="pager-link pager-link--prev" href="' + articleUrl(prev.id) + '"><span>' + icon('arrowLeft') + esc(t('article.prev')) + '</span><strong>' + esc(shortTitle(prev)) + '</strong></a>' : '<span></span>') +
        (next ? '<a class="pager-link pager-link--next" href="' + articleUrl(next.id) + '"><span>' + esc(t('article.next')) + icon('arrowRight') + '</span><strong>' + esc(shortTitle(next)) + '</strong></a>' : '') +
      '</nav></footer>';
  }
  function toc(headings) {
    var hs = headings.filter(function (h) { return h.level <= 3; });
    var actions = '<div class="toc-actions"><button type="button" class="link-btn" data-action="copy-link">' + icon('link') + esc(t('article.copyLink')) + '</button><button type="button" class="link-btn" data-action="print">' + icon('printer') + esc(t('article.print')) + '</button></div>';
    return '<aside class="toc" aria-label="' + esc(t('article.toc')) + '"><div class="toc-inner">' +
      (hs.length >= 2 ? '<p class="toc-title">' + esc(t('article.toc')) + '</p><ul>' + hs.map(function (h) {
        return '<li class="lvl-' + h.level + '"><a href="#' + h.id + '" data-toc="' + h.id + '">' + esc(h.text) + '</a></li>';
      }).join('') + '</ul>' : '') + actions + '</div></aside>';
  }

  function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function highlightTerms(root) {
    if (!root) return;
    var list = [];
    S.glossary().forEach(function (g) {
      var e = g[lang] && g[lang].term ? g[lang] : g.fr;
      [e.term].concat(e.aliases || []).forEach(function (w) { if (w && w.length > 1 && !/[,…]/.test(w)) list.push({ w: w, id: g.id }); });
    });
    list.sort(function (a, b) { return b.w.length - a.w.length; });
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var el = n.parentElement;
        if (!el || el.closest('a, code, kbd, h1, h2, h3, h4, strong, summary, figcaption, th, button, .term, .mode-flag, .callout-title, .shot')) return NodeFilter.FILTER_REJECT;
        return n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    var done = {};
    list.forEach(function (tm) {
      if (done[tm.id]) return;
      var re = new RegExp('(^|[^\\p{L}\\p{N}])(' + escapeRe(tm.w) + ')(?![\\p{L}\\p{N}])', 'iu');
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i], m = re.exec(n.nodeValue);
        if (!m) continue;
        var hit = n.splitText(m.index + m[1].length);
        var rest = hit.splitText(m[2].length);
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'term'; b.setAttribute('data-term', tm.id); b.textContent = hit.nodeValue;
        hit.parentNode.replaceChild(b, hit);
        nodes.splice(i, 1, n, rest);
        done[tm.id] = true;
        break;
      }
    });
  }

  function initScrollSpy() {
    var links = document.querySelectorAll('[data-toc]');
    if (!links.length || !('IntersectionObserver' in window)) return;
    var map = {};
    links.forEach(function (l) { map[l.getAttribute('data-toc')] = l; });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          links.forEach(function (l) { l.classList.remove('active'); });
          map[en.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-90px 0px -65% 0px' });
    Object.keys(map).forEach(function (id) { var h = document.getElementById(id); if (h) obs.observe(h); });
  }

  // ---- Catégorie ----------------------------------------------------------------
  function renderCategory(main) {
    var cat = S.category(params.get('id'));
    if (!cat) { notFound(main); return; }
    var pages = S.pagesIn(cat.id);
    document.title = L(cat, 'title') + ' · CIS Wiki';
    var isVideo = cat.id === 'videos';
    var levels = ['beginner', 'intermediate', 'advanced'].filter(function (l) { return pages.some(function (p) { return p.level === l; }); });
    var body;
    if (!pages.length) body = '<p class="empty">' + esc(t('cat.empty')) + '</p>';
    else if (isVideo) body = '<div class="video-grid">' + pages.map(function (p) { return '<div data-page-level="' + esc(p.level) + '">' + videoCard(p) + '</div>'; }).join('') + '</div>';
    else body = '<ol class="doc-list">' + pages.map(function (p) {
      var c = C(p).c;
      return '<li data-page-level="' + esc(p.level) + '"><a class="doc-card" href="' + articleUrl(p.id) + '">' +
        (p.step ? '<span class="doc-num" aria-label="' + esc(t('home.step', { n: p.step })) + '">' + p.step + '</span>' : '<span class="doc-icon">' + icon('file') + '</span>') +
        '<span class="doc-body"><strong>' + esc(c.title) + '</strong><span class="doc-sum">' + esc(c.summary) + '</span><span class="doc-meta">' + levelBadge(p.level) +
        (p.menuPath ? '<span class="doc-path">' + icon('map') + esc(p.menuPath) + '</span>' : '') +
        (S.isTranslated(p, lang) ? '' : '<span class="badge badge--warn">' + esc(t('cat.frOnly')) + '</span>') + '</span></span>' + icon('chevronRight', 'doc-chev') + '</a></li>';
    }).join('') + '</ol>';

    main.innerHTML = '<div class="page-wrap">' + breadcrumb([[t('nav.home'), 'index.html'], [L(cat, 'title')]]) +
      '<header class="page-head"><span class="cat-icon cat-icon--lg cat--' + esc(cat.color) + '">' + icon(cat.icon) + '</span><div><h1>' + esc(L(cat, 'title')) + '</h1><p class="lead">' + esc(L(cat, 'desc')) + '</p><p class="page-count">' + esc(t('cat.pages', { n: pages.length })) + '</p></div></header>' +
      (levels.length > 1 ? '<div class="filters" role="group" aria-label="' + esc(t('cat.filterLevel')) + '">' + [''].concat(levels).map(function (l) {
        return '<button type="button" class="chip" data-level="' + l + '" aria-pressed="' + (l === '') + '">' + esc(l ? t('level.' + l) : t('level.all')) + '</button>';
      }).join('') + '</div>' : '') + body + '</div>';
  }

  // ---- Recherche ----------------------------------------------------------------
  function renderSearch(main) {
    var q = params.get('q') || '';
    document.title = t('search.title') + ' · CIS Wiki';
    main.innerHTML = '<div class="page-wrap">' + breadcrumb([[t('nav.home'), 'index.html'], [t('search.title')]]) +
      '<h1>' + esc(t('search.title')) + '</h1>' +
      '<form class="search-form" role="search" action="search.html" id="search-form">' + icon('search') + '<label class="sr-only" for="search-q">' + esc(t('search.title')) + '</label><input id="search-q" name="q" type="search" value="' + esc(q) + '" placeholder="' + esc(t('search.hero')) + '" autocomplete="off"><button class="btn btn--primary" type="submit">' + esc(t('search.button')) + '</button></form>' +
      '<div id="search-out" aria-live="polite"></div></div>';
    var input = document.getElementById('search-q');
    var timer;
    input.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        var url = new URL(location.href); url.searchParams.set('q', input.value); history.replaceState(null, '', url);
        drawSearch(input.value);
      }, 150);
    });
    drawSearch(q);
    if (!q) input.focus();
  }
  function drawSearch(q) {
    var out = document.getElementById('search-out');
    q = q.trim();
    if (!q) { out.innerHTML = '<p class="empty">' + esc(t('search.empty')) + '</p>'; return; }
    var res = search(q), ts = searchTerms(q), ws = terms(q);
    var cats = {};
    res.forEach(function (r) { cats[r.e.p.category] = (cats[r.e.p.category] || 0) + 1; });
    var html = '<p class="search-count">' + esc(t('search.count', { n: res.length, q: q })) + '</p>';
    if (Object.keys(cats).length > 1) {
      html += '<div class="filters" role="group" aria-label="' + esc(t('search.filter')) + '"><button type="button" class="chip" data-cat="" aria-pressed="true">' + esc(t('search.all')) + ' · ' + res.length + '</button>' +
        S.categories().filter(function (c) { return cats[c.id]; }).map(function (c) { return '<button type="button" class="chip" data-cat="' + esc(c.id) + '" aria-pressed="false">' + esc(L(c, 'title')) + ' · ' + cats[c.id] + '</button>'; }).join('') + '</div>';
    }
    if (ts.length) {
      html += '<div class="term-hits">' + ts.slice(0, 4).map(function (g) {
        var e = g[lang] && g[lang].term ? g[lang] : g.fr;
        return '<a class="term-hit" href="glossary.html#term-' + esc(g.id) + '">' + icon('glossary') + '<span><strong>' + highlight(e.term, ws) + '</strong><span>' + esc(e.def) + '</span></span></a>';
      }).join('') + '</div>';
    }
    if (!res.length) html += '<div class="empty-state">' + icon('search', 'big') + '<p><strong>' + esc(t('search.none', { q: q })) + '</strong></p><p>' + esc(t('search.noneHint')) + '</p><a class="btn btn--ghost" href="glossary.html">' + esc(t('nav.glossary')) + '</a></div>';
    else html += '<ol class="results">' + res.map(function (r) {
      return '<li data-cat="' + esc(r.e.p.category) + '"><a href="' + articleUrl(r.e.p.id) + '"><span class="res-cat">' + esc(r.e.cat) + '</span><strong>' + highlight(r.e.title, ws) + '</strong><span class="res-snippet">' + snippet(r.e.summary + ' — ' + r.e.body, ws, 220) + '</span><span class="res-meta">' + levelBadge(r.e.p.level) + '</span></a></li>';
    }).join('') + '</ol>';
    out.innerHTML = html;
  }

  // ---- Glossaire ----------------------------------------------------------------
  function renderGlossary(main) {
    document.title = t('glossary.title') + ' · CIS Wiki';
    var other = lang === 'fr' ? 'en' : 'fr';
    var items = S.glossary().map(function (g) {
      return { g: g, e: g[lang] && g[lang].term ? g[lang] : g.fr, o: g[other] };
    }).sort(function (a, b) { return a.e.term.localeCompare(b.e.term, lang, { sensitivity: 'base' }); });
    var groups = {};
    items.forEach(function (it) { var k = norm(it.e.term).charAt(0).toUpperCase(); (groups[k] = groups[k] || []).push(it); });
    var letters = Object.keys(groups).sort();
    main.innerHTML = '<div class="page-wrap">' + breadcrumb([[t('nav.home'), 'index.html'], [t('glossary.title')]]) +
      '<header class="page-head"><span class="cat-icon cat-icon--lg cat--amber">' + icon('glossary') + '</span><div><h1>' + esc(t('glossary.title')) + '</h1><p class="lead">' + esc(t('glossary.lead')) + '</p><p class="page-count">' + esc(t('glossary.count', { n: items.length })) + '</p></div></header>' +
      '<div class="gloss-tools"><label class="sr-only" for="gloss-filter">' + esc(t('glossary.filter')) + '</label><div class="input-icon">' + icon('search') + '<input id="gloss-filter" type="search" placeholder="' + esc(t('glossary.filter')) + '" autocomplete="off"></div>' +
      '<nav class="letters" aria-label="' + esc(t('glossary.letters')) + '">' + letters.map(function (k) { return '<a href="#letter-' + k + '">' + k + '</a>'; }).join('') + '</nav></div>' +
      '<div class="gloss-list">' + letters.map(function (k) {
        return '<section class="gloss-group" id="letter-' + k + '"><h2>' + k + '</h2><dl>' + groups[k].map(function (it) {
          var g = it.g, p = g.page && S.page(g.page);
          var hay = norm([it.e.term, it.e.def].concat(it.e.aliases || []).concat(it.o ? [it.o.term] : []).join(' '));
          return '<div class="gloss-item" id="term-' + esc(g.id) + '" data-search="' + esc(hay) + '"><dt>' + esc(it.e.term) +
            (it.o && it.o.term && it.o.term !== it.e.term ? '<span class="other-lang" lang="' + other + '">' + other.toUpperCase() + ' · ' + esc(it.o.term) + '</span>' : '') + '</dt>' +
            '<dd><p>' + esc(it.e.def) + '</p>' + (visible(p) ? '<a class="link-more" href="' + articleUrl(p.id) + '">' + esc(t('glossary.see')) + ' : ' + esc(shortTitle(p)) + icon('arrowRight') + '</a>' : '') + '</dd></div>';
        }).join('') + '</dl></section>';
      }).join('') + '<p class="empty" id="gloss-empty" hidden>' + esc(t('glossary.none')) + '</p></div></div>';
    var f = document.getElementById('gloss-filter');
    f.addEventListener('input', function () {
      var ws = terms(f.value), any = false;
      document.querySelectorAll('.gloss-item').forEach(function (el) {
        var hay = el.getAttribute('data-search');
        var ok = !ws.length || ws.every(function (w) { return hay.indexOf(w) !== -1; });
        el.hidden = !ok; if (ok) any = true;
      });
      document.querySelectorAll('.gloss-group').forEach(function (s) { s.hidden = !s.querySelector('.gloss-item:not([hidden])'); });
      document.getElementById('gloss-empty').hidden = any;
    });
    if (location.hash) { var el = document.getElementById(decodeURIComponent(location.hash.slice(1))); if (el) setTimeout(function () { el.scrollIntoView({ block: 'center' }); el.classList.add('flash'); }, 0); }
  }

  function notFound(main) {
    document.title = t('article.notFound') + ' · CIS Wiki';
    main.innerHTML = '<div class="page-wrap empty-state">' + icon('search', 'big') + '<h1>' + esc(t('article.notFound')) + '</h1><p>' + esc(t('article.notFoundText')) + '</p><a class="btn btn--primary" href="index.html">' + esc(t('article.backHome')) + '</a></div>';
  }

  // ---- Palette de recherche (Ctrl K) ------------------------------------------------
  var pal = { items: [], index: 0, opener: null };
  function openPalette(initial) {
    var wrap = document.getElementById('palette'), input = document.getElementById('palette-input');
    pal.opener = document.activeElement;
    wrap.hidden = false;
    document.body.classList.add('no-scroll');
    input.value = initial || '';
    pal.index = 0;
    drawPalette();
    input.focus();
  }
  function closePalette() {
    var wrap = document.getElementById('palette');
    if (!wrap || wrap.hidden) return;
    wrap.hidden = true;
    document.body.classList.remove('no-scroll');
    if (pal.opener && pal.opener.focus) pal.opener.focus();
  }
  function drawPalette() {
    var q = document.getElementById('palette-input').value.trim();
    var items = [];
    if (!q) {
      steps().slice(0, 4).forEach(function (x) { items.push({ href: articleUrl(x.p.id), ico: 'map', title: esc(shortTitle(x.p)), meta: t('home.step', { n: x.step }) }); });
      (S.settings().popular || []).map(S.page).filter(visible).forEach(function (p) {
        if (!items.some(function (i) { return i.href === articleUrl(p.id); })) items.push({ href: articleUrl(p.id), ico: 'file', title: esc(shortTitle(p)), meta: t('search.popular') });
      });
      items.push({ href: 'glossary.html', ico: 'glossary', title: esc(t('nav.glossary')), meta: '' });
    } else {
      var ws = terms(q);
      search(q).slice(0, 7).forEach(function (r) {
        items.push({ href: articleUrl(r.e.p.id), ico: r.e.p.category === 'videos' ? 'video' : 'file', title: highlight(r.e.title, ws), snippet: snippet(r.e.body, ws, 90), meta: r.e.cat });
      });
      searchTerms(q).slice(0, 3).forEach(function (g) {
        var e = g[lang] && g[lang].term ? g[lang] : g.fr;
        items.push({ href: 'glossary.html#term-' + g.id, ico: 'glossary', title: highlight(e.term, ws), snippet: esc(e.def), meta: t('nav.glossary') });
      });
      items.push({ href: 'search.html?q=' + encodeURIComponent(q), ico: 'search', title: esc(t('search.inWiki', { q: q })), meta: '' });
    }
    pal.items = items;
    if (pal.index >= items.length) pal.index = 0;
    var list = document.getElementById('palette-list');
    list.innerHTML = items.map(function (it, i) {
      return '<li role="option" id="pal-' + i + '" aria-selected="' + (i === pal.index) + '"><a href="' + esc(it.href) + '" tabindex="-1">' + icon(it.ico) +
        '<span class="pal-main"><span class="pal-title">' + it.title + '</span>' + (it.snippet ? '<span class="pal-snippet">' + it.snippet + '</span>' : '') + '</span>' +
        (it.meta ? '<span class="pal-meta">' + esc(it.meta) + '</span>' : '') + '</a></li>';
    }).join('');
    document.getElementById('palette-input').setAttribute('aria-activedescendant', 'pal-' + pal.index);
  }
  function movePalette(d) {
    if (!pal.items.length) return;
    pal.index = (pal.index + d + pal.items.length) % pal.items.length;
    document.querySelectorAll('#palette-list [role=option]').forEach(function (li, i) { li.setAttribute('aria-selected', i === pal.index); });
    var cur = document.getElementById('pal-' + pal.index);
    if (cur) cur.scrollIntoView({ block: 'nearest' });
    document.getElementById('palette-input').setAttribute('aria-activedescendant', 'pal-' + pal.index);
  }

  // ---- Bulle du glossaire --------------------------------------------------------
  var popTimer;
  function showTerm(el) {
    if (mode !== 'guided') return;
    var g = S.glossary().find(function (x) { return x.id === el.getAttribute('data-term'); });
    if (!g) return;
    clearTimeout(popTimer);
    var e = g[lang] && g[lang].term ? g[lang] : g.fr;
    var pop = document.getElementById('term-pop');
    pop.innerHTML = '<strong>' + esc(e.term) + '</strong><p>' + esc(e.def) + '</p><a href="glossary.html#term-' + esc(g.id) + '">' + esc(t('glossary.more')) + ' →</a>';
    pop.hidden = false;
    var r = el.getBoundingClientRect(), pw = pop.offsetWidth, ph = pop.offsetHeight;
    var left = Math.min(Math.max(8, r.left + r.width / 2 - pw / 2), document.documentElement.clientWidth - pw - 8);
    var top = r.bottom + 8;
    if (top + ph > window.innerHeight - 8) top = r.top - ph - 8;
    pop.style.left = (left + window.scrollX) + 'px';
    pop.style.top = (top + window.scrollY) + 'px';
    el.setAttribute('aria-describedby', 'term-pop');
  }
  function hideTerm(delay) {
    clearTimeout(popTimer);
    popTimer = setTimeout(function () { var pop = document.getElementById('term-pop'); if (pop) pop.hidden = true; }, delay || 0);
  }

  // ---- Fenêtres ----------------------------------------------------------------
  function openModal(titleHtml, bodyHtml) {
    var d = document.getElementById('modal');
    d.innerHTML = '<div class="modal-form"><header class="modal-head"><h2>' + titleHtml + '</h2><button type="button" class="icon-btn" data-action="close-modal" aria-label="' + esc(t('common.close')) + '">' + icon('x') + '</button></header><div class="modal-body">' + bodyHtml + '</div></div>';
    d.showModal();
  }
  function showHistory() {
    var p = S.page(params.get('id'));
    if (!p) return;
    var base = S.settings().legacyBase;
    var rows = p.revisions.slice().reverse().map(function (r) {
      return '<li class="rev">' + avatar(r.by) + '<div><p><strong>' + esc(S.userName(r.by)) + '</strong> · <time datetime="' + esc(r.at) + '">' + esc(fmtDateTime(r.at)) + '</time></p>' +
        (r.note ? '<p class="rev-note">' + esc(r.note) + '</p>' : '') +
        (r.legacy ? '<a class="link-more" href="' + esc(base + r.legacy) + '" target="_blank" rel="noopener">' + icon('external') + esc(t('article.legacy')) + '</a>' : '') + '</div></li>';
    }).join('');
    openModal(icon('history') + esc(t('article.historyTitle')), '<ol class="rev-list rev-list--public">' + rows + '</ol><p class="hint">' + icon('info') + esc(t('article.historyHint')) + '</p>');
  }
  function openLightbox(src, cap) {
    var d = document.getElementById('lightbox');
    d.querySelector('img').src = src;
    d.querySelector('img').alt = cap || '';
    d.querySelector('.lightbox-cap').textContent = cap || '';
    d.showModal();
  }
  function toast(html) {
    var box = document.getElementById('toasts');
    if (!box) return;
    var el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = html;
    box.appendChild(el);
    setTimeout(function () { el.classList.add('out'); }, 2800);
    setTimeout(function () { el.remove(); }, 3200);
  }

  // ---- Mode, langue, thème -------------------------------------------------------
  function syncMode() {
    document.body.setAttribute('data-mode', mode);
    document.querySelectorAll('details.shot').forEach(function (d) { d.open = mode === 'guided'; });
    document.querySelectorAll('.term').forEach(function (b) { b.tabIndex = mode === 'guided' ? 0 : -1; });
    document.querySelectorAll('.seg button[data-mode]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-mode') === mode); });
    var card = document.getElementById('side-card');
    if (card) card.innerHTML = sideCard();
  }
  function setMode(m, silent) {
    if (m === mode) return;
    mode = m;
    S.setPref('mode', m);
    syncMode();
    hideTerm();
    if (!silent) toast(icon(m === 'guided' ? 'compass' : 'zap') + '<span>' + esc(t(m === 'guided' ? 'mode.guidedHint' : 'mode.expertHint')) + '</span>');
  }
  function setLang(l) {
    if (l === lang) return;
    lang = l;
    S.setPref('lang', l);
    if (params.has('lang')) { params.set('lang', l); history.replaceState(null, '', location.pathname + '?' + params.toString() + location.hash); }
    render();
  }
  function cycleTheme() {
    theme = theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system';
    S.setPref('theme', theme);
    applyPrefs();
    var b = document.querySelector('.icon-btn[data-action=theme]');
    if (b) {
      b.innerHTML = icon(theme === 'dark' ? 'moon' : theme === 'light' ? 'sun' : 'monitor');
      b.setAttribute('aria-label', t('theme.label') + ' : ' + t('theme.' + theme));
      b.title = b.getAttribute('aria-label');
    }
    toast(esc(t('theme.label') + ' : ' + t('theme.' + theme)));
  }
  function toggleSidebar(open) {
    document.body.classList.toggle('sidebar-open', open);
    var b = document.querySelector('[data-action=open-sidebar]');
    if (b) b.setAttribute('aria-expanded', open);
    if (open) { var first = document.querySelector('#sidebar a, #sidebar button'); if (first) first.focus(); }
  }

  // ---- Évènements -------------------------------------------------------------
  function bindEvents() {
    document.addEventListener('click', function (e) {
      var el = e.target.closest('[data-action], button[data-mode], button[data-lang], [data-set-mode], button[data-feedback], button[data-level], button[data-cat], .shot-zoom, .term');
      if (!el) {
        if (e.target.id === 'palette') closePalette();
        return;
      }
      if (el.classList.contains('term')) { e.preventDefault(); var pop = document.getElementById('term-pop'); if (pop.hidden) showTerm(el); else hideTerm(); return; }
      if (el.classList.contains('shot-zoom')) { openLightbox(el.getAttribute('data-zoom'), el.getAttribute('data-caption')); return; }
      if (el.hasAttribute('data-set-mode')) { setMode(el.getAttribute('data-set-mode'), true); return; }
      if (el.hasAttribute('data-mode')) { setMode(el.getAttribute('data-mode')); return; }
      if (el.hasAttribute('data-lang')) { setLang(el.getAttribute('data-lang')); return; }
      if (el.hasAttribute('data-feedback')) {
        var id = params.get('id');
        S.addFeedback(id, el.getAttribute('data-feedback') === '1');
        S.setPref('fb:' + id, el.getAttribute('data-feedback'));
        document.getElementById('feedback').innerHTML = '<p>' + icon('check') + esc(t('article.thanks')) + '</p>' +
          '<p class="fb-report">' + esc(t('feedback.missing')) + ' <button type="button" class="link-btn" data-feedback-open="manque">' + icon('edit') + esc(t('feedback.report')) + '</button></p>';
        if (el.getAttribute('data-feedback') === '0' && window.CISFeedback) window.CISFeedback.open('manque');
        return;
      }
      if (el.hasAttribute('data-level')) {
        var lvl = el.getAttribute('data-level');
        el.parentNode.querySelectorAll('[data-level]').forEach(function (b) { b.setAttribute('aria-pressed', b === el); });
        document.querySelectorAll('[data-page-level]').forEach(function (li) { li.hidden = !!lvl && li.getAttribute('data-page-level') !== lvl; });
        return;
      }
      if (el.hasAttribute('data-cat') && el.tagName === 'BUTTON') {
        var c = el.getAttribute('data-cat');
        el.parentNode.querySelectorAll('[data-cat]').forEach(function (b) { b.setAttribute('aria-pressed', b === el); });
        document.querySelectorAll('.results > li').forEach(function (li) { li.hidden = !!c && li.getAttribute('data-cat') !== c; });
        return;
      }
      switch (el.getAttribute('data-action')) {
        case 'open-palette': openPalette(); break;
        case 'open-sidebar': toggleSidebar(true); break;
        case 'close-sidebar': toggleSidebar(false); break;
        case 'theme': cycleTheme(); break;
        case 'history': showHistory(); break;
        case 'close-modal': document.getElementById('modal').close(); break;
        case 'close-lightbox': document.getElementById('lightbox').close(); break;
        case 'print': window.print(); break;
        case 'copy-link':
          var url = location.href;
          if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { toast(icon('check') + esc(t('article.linkCopied'))); }, function () { prompt(t('article.copyLink'), url); });
          else prompt(t('article.copyLink'), url);
          break;
      }
    });

    document.addEventListener('keydown', function (e) {
      var wrap = document.getElementById('palette');
      var inField = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) || document.activeElement.isContentEditable;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if (wrap.hidden) openPalette(); else closePalette(); return; }
      if (e.key === '/' && !inField && wrap.hidden) { e.preventDefault(); openPalette(); return; }
      if (!wrap.hidden) {
        if (e.key === 'Escape') { e.preventDefault(); closePalette(); }
        else if (e.key === 'ArrowDown') { e.preventDefault(); movePalette(1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); movePalette(-1); }
        else if (e.key === 'Enter') { e.preventDefault(); var it = pal.items[pal.index]; if (it) location.href = it.href; }
        return;
      }
      if (e.key === 'Escape') { hideTerm(); if (document.body.classList.contains('sidebar-open')) toggleSidebar(false); }
    });

    document.addEventListener('input', function (e) { if (e.target.id === 'palette-input') { pal.index = 0; drawPalette(); } });
    document.addEventListener('mouseover', function (e) {
      var tm = e.target.closest('.term');
      if (tm) showTerm(tm);
      else if (e.target.closest('#term-pop')) clearTimeout(popTimer);
    });
    document.addEventListener('mouseout', function (e) { if (e.target.closest('.term, #term-pop')) hideTerm(250); });
    document.addEventListener('focusin', function (e) { if (e.target.classList && e.target.classList.contains('term')) showTerm(e.target); });
    document.addEventListener('focusout', function (e) { if (e.target.classList && e.target.classList.contains('term')) hideTerm(200); });
    document.addEventListener('click', function (e) { var lb = document.getElementById('lightbox'); if (e.target === lb) lb.close(); });

    S.subscribe(function (src) { if (src === 'remote') { _index = null; render(); } });
  }

  // ---- Rendu ----------------------------------------------------------------------
  function render() {
    applyPrefs();
    _index = null;
    var main = shell(page !== 'home' && page !== 'guide');
    var fn = { home: renderHome, article: renderArticle, category: renderCategory, search: renderSearch, glossary: renderGlossary, guide: renderGuide }[page] || renderHome;
    fn(main);
    syncMode();
  }

  initPrefs();
  bindEvents();
  render();

  window.CISApp = { search: search, norm: norm };
})();
