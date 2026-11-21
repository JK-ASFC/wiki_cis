/*
 * CIS Wiki — guide pas à pas (visite guidée sur les vraies captures du CIS).
 *
 * Données : window.WIKI_TOUR (data/tour.js, généré par tools/build_tour.py).
 * Chaque étape : image (assets/img/guide/<img>.png), zone [x, y, largeur, hauteur] en pixels de la
 * capture, titre et texte FR/EN. Le moteur assombrit la capture sauf la zone, l'entoure, pose une
 * bulle numérotée et trace une flèche de la bulle vers la zone.
 */
(function (global) {
  'use strict';

  var KEY = 'ciswiki:tour';
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function load() { try { return parseInt(localStorage.getItem(KEY), 10) || 0; } catch (e) { return 0; } }
  function save(i) { try { localStorage.setItem(KEY, String(i)); } catch (e) { /* stockage indisponible : sans conséquence */ } }

  function mount(root, lang, mdOpts) {
    var data = global.WIKI_TOUR;
    if (!root || !data) return;
    var I = global.CISI18n, MD = global.CISMarkdown, icon = global.CISIcons.icon;
    function t(k, v) { return I.t(lang, k, v); }
    function md(s) { return MD.inline(s || '', mdOpts || {}); }
    function mdBlock(s) { return MD.render(s || '', mdOpts || {}).html; }
    var steps = data.steps, total = steps.length;
    var chapters = data.chapters.map(function (c) {
      var idx = steps.map(function (s, i) { return s.ch === c.id ? i : -1; }).filter(function (i) { return i !== -1; });
      return { id: c.id, label: c[lang] || c.fr, first: idx[0], count: idx.length };
    });
    var hash = /^#etape-(\d+)$/.exec(location.hash);
    var cur = hash ? Math.min(total, Math.max(1, +hash[1])) - 1 : Math.min(load(), total);

    root.innerHTML =
      '<header class="tour-head"><div><p class="tour-kicker">' + icon('compass') + esc(t('tour.title')) + '</p><h1>' + esc(t('tour.lead')) + '</h1></div>' +
        '<div class="tour-progress"><span class="tour-count" id="tour-count"></span><span class="tour-bar"><i id="tour-bar"></i></span></div></header>' +
      '<div class="tour-layout">' +
        '<nav class="tour-chapters" aria-label="' + esc(t('tour.chapters')) + '"><p class="tour-chapters-title">' + esc(t('tour.chapters')) + '</p><ol id="tour-ch">' +
          chapters.map(function (c, i) { return '<li><button type="button" data-goto="' + c.first + '"><span class="tc-num">' + (i + 1) + '</span><span class="tc-label">' + esc(c.label) + '</span><span class="tc-count">' + c.count + '</span></button></li>'; }).join('') +
        '</ol><label class="tour-ch-select"><span class="sr-only">' + esc(t('tour.chapters')) + '</span><select id="tour-ch-select">' +
          chapters.map(function (c, i) { return '<option value="' + c.first + '">' + (i + 1) + '. ' + esc(c.label) + '</option>'; }).join('') + '</select></label></nav>' +
        '<section class="tour-stage" aria-live="polite"><div id="tour-body"></div>' +
          '<div class="tour-nav"><button type="button" class="btn btn--ghost" id="tour-prev">' + icon('arrowLeft') + esc(t('tour.prev')) + '</button>' +
          '<span class="tour-keys">' + esc(t('tour.keys')) + '</span>' +
          '<button type="button" class="btn btn--primary" id="tour-next"></button></div></section>' +
      '</div>';

    var body = root.querySelector('#tour-body');
    var prev = root.querySelector('#tour-prev'), next = root.querySelector('#tour-next');

    function shotHtml(s, n) {
      var b = s.box, W = s.w, H = s.h, pad = 6;
      var x = Math.max(0, b[0] - pad), y = Math.max(0, b[1] - pad), w = Math.min(W - x, b[2] + 2 * pad), h = Math.min(H - y, b[3] + 2 * pad);
      return '<figure class="tour-shot"><div class="tour-frame" id="tour-frame">' +
        '<div class="tour-canvas" style="aspect-ratio:' + W + ' / ' + H + ';max-width:' + W + 'px">' +
          '<img src="assets/img/guide/' + esc(s.img) + '.png" alt="' + esc(s[lang].t) + '" width="' + W + '" height="' + H + '">' +
          '<svg class="tour-svg" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" aria-hidden="true">' +
            '<defs><mask id="tour-mask"><rect width="' + W + '" height="' + H + '" fill="#fff"/><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8" fill="#000"/></mask>' +
            '<marker id="tour-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="tour-arrow-head"/></marker></defs>' +
            '<rect class="tour-dim" width="' + W + '" height="' + H + '" mask="url(#tour-mask)"/>' +
            '<rect class="tour-ring" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8" vector-effect="non-scaling-stroke"/>' +
            '<line class="tour-line" id="tour-line" x1="0" y1="0" x2="0" y2="0" marker-end="url(#tour-arrow)" vector-effect="non-scaling-stroke"/>' +
          '</svg>' +
          '<div class="tour-bubble" id="tour-bubble"><span class="tour-bubble-num">' + n + '</span><span>' + esc(s[lang].t) + '</span></div>' +
        '</div></div>' +
        '<figcaption><a href="assets/img/guide/' + esc(s.img) + '.png" target="_blank" rel="noopener">' + icon('image') + esc(t('tour.zoom')) + '</a></figcaption></figure>';
    }

    // Place la bulle à côté de la zone (droite, gauche, dessous, dessus) et trace la flèche.
    function placeBubble(s) {
      var canvas = root.querySelector('.tour-canvas'), bub = root.querySelector('#tour-bubble'), line = root.querySelector('#tour-line');
      if (!canvas || !bub) return;
      var fr = root.querySelector('#tour-frame');
      // petit écran : on agrandit la capture (jusqu'à 2 fois) pour qu'elle reste lisible
      if (fr && fr.clientWidth < 700) { canvas.style.maxWidth = 'none'; canvas.style.width = Math.min(s.w, Math.round(fr.clientWidth * 2)) + 'px'; }
      else { canvas.style.width = ''; canvas.style.maxWidth = s.w + 'px'; }
      var cw = canvas.clientWidth, ch = canvas.clientHeight;
      if (!cw) return;
      var k = cw / s.w;
      var bx = s.box[0] * k, by = s.box[1] * k, bw = s.box[2] * k, bh = s.box[3] * k;
      bub.style.maxWidth = Math.min(260, cw - 16) + 'px';
      var w = bub.offsetWidth, h = bub.offsetHeight, gap = 46, m = 8;
      var cand = [
        { side: 'right', x: bx + bw + gap, y: by + bh / 2 - h / 2 },
        { side: 'left', x: bx - gap - w, y: by + bh / 2 - h / 2 },
        { side: 'below', x: bx + bw / 2 - w / 2, y: by + bh + gap },
        { side: 'above', x: bx + bw / 2 - w / 2, y: by - gap - h }
      ];
      function fits(c) { return c.x >= m && c.y >= m && c.x + w <= cw - m && c.y + h <= ch - m; }
      var pos = cand.filter(fits)[0];
      if (!pos) { // aucune place libre : on se cale au plus près dans l'image
        pos = cand[bx + bw / 2 > cw / 2 ? 1 : 0];
        if (bh > ch * 0.6 || bw > cw * 0.6) pos = { side: 'inside', x: bx + m * 2, y: by + m * 2 };
        pos.x = Math.min(Math.max(m, pos.x), cw - w - m); pos.y = Math.min(Math.max(m, pos.y), ch - h - m);
      }
      bub.style.left = pos.x + 'px'; bub.style.top = pos.y + 'px';
      bub.setAttribute('data-side', pos.side);
      // flèche : du bord de la bulle vers le bord de la zone (en pixels de la capture)
      var from, to;
      var cx = bx + bw / 2, cy = by + bh / 2;
      if (pos.side === 'right') { from = [pos.x, pos.y + h / 2]; to = [bx + bw + 4, cy]; }
      else if (pos.side === 'left') { from = [pos.x + w, pos.y + h / 2]; to = [bx - 4, cy]; }
      else if (pos.side === 'below') { from = [pos.x + w / 2, pos.y]; to = [cx, by + bh + 4]; }
      else if (pos.side === 'above') { from = [pos.x + w / 2, pos.y + h]; to = [cx, by - 4]; }
      else { from = null; }
      if (from) {
        line.setAttribute('x1', from[0] / k); line.setAttribute('y1', from[1] / k);
        line.setAttribute('x2', to[0] / k); line.setAttribute('y2', to[1] / k);
        line.style.display = '';
      } else line.style.display = 'none';
      // fait défiler le cadre pour centrer la zone (captures hautes)
      var frame = root.querySelector('#tour-frame');
      if (frame && frame.scrollHeight > frame.clientHeight) {
        var top = Math.min(by, pos.y) - 40;
        frame.scrollTop = Math.max(0, Math.min(top, frame.scrollHeight - frame.clientHeight));
      }
      if (frame && frame.scrollWidth > frame.clientWidth) {
        var left = Math.min(bx, pos.x) - 16;
        frame.scrollLeft = Math.max(0, Math.min(left, frame.scrollWidth - frame.clientWidth));
      }
    }

    function render() {
      var done = cur >= total;
      var s = steps[Math.min(cur, total - 1)];
      var ci = data.chapters.findIndex(function (c) { return c.id === s.ch; });
      root.querySelector('#tour-count').textContent = done ? t('tour.done') : t('tour.step', { n: cur + 1, total: total });
      root.querySelector('#tour-bar').style.width = Math.round((done ? total : cur + 1) / total * 100) + '%';
      root.querySelectorAll('#tour-ch button').forEach(function (b, i) {
        var c = chapters[i], on = !done && cur >= c.first && cur < c.first + c.count;
        b.classList.toggle('active', on); b.classList.toggle('done', done || cur >= c.first + c.count);
        if (on) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
      });
      var sel = root.querySelector('#tour-ch-select'); if (sel && !done) sel.value = String(chapters[ci].first);
      if (done) {
        body.innerHTML = '<div class="tour-done">' + icon('award') + '<h2>' + esc(t('tour.done')) + '</h2><p>' + esc(t('tour.doneText')) + '</p>' +
          '<p class="tour-done-links"><a class="btn btn--primary" href="article.html?id=marking-types">' + esc(lang === 'en' ? 'Calculation methods' : 'Méthodes de calcul') + '</a>' +
          '<a class="btn btn--ghost" href="article.html?id=enter-marks">' + esc(lang === 'en' ? 'Enter marks' : 'Saisir les notes') + '</a>' +
          '<button type="button" class="btn btn--ghost" data-goto="0">' + esc(t('tour.restart')) + '</button></p></div>';
        prev.disabled = false; next.hidden = true;
      } else {
        var c = s[lang] || s.fr;
        var last = cur === total - 1;
        body.innerHTML = '<p class="tour-chapter">' + esc(chapters[ci].label) + '</p>' +
          (s.img ? shotHtml(s, cur + 1) : '<div class="tour-intro">' + icon('compass') + '</div>') +
          '<div class="tour-text' + (last ? ' tour-text--final' : '') + '"><h2><span class="tour-n">' + (cur + 1) + '</span>' + esc(c.t) + '</h2>' + mdBlock(c.x) +
          (c.tip ? '<aside class="callout callout--' + (last ? 'important' : 'tip') + '"><div class="callout-title">' + icon(last ? 'octagon' : 'bulb') + '<span>' + esc(t('tour.tip')) + '</span></div><div class="callout-body"><p>' + md(c.tip) + '</p></div></aside>' : '') +
          '</div>';
        prev.disabled = cur === 0; next.hidden = false;
        next.innerHTML = esc(last ? t('tour.finish') : t('tour.next')) + icon('arrowRight');
        if (s.img) {
          var img = body.querySelector('.tour-canvas img');
          var go = function () { placeBubble(s); };
          if (img.complete) requestAnimationFrame(go); else img.addEventListener('load', go);
        }
      }
      save(cur);
      if (history.replaceState) history.replaceState(null, '', '#etape-' + Math.min(cur + 1, total));
    }
    function goto(i) { cur = Math.max(0, Math.min(total, i)); render(); var st = root.querySelector('.tour-stage'); if (st && st.getBoundingClientRect().top < 0) st.scrollIntoView({ behavior: 'smooth', block: 'start' }); }

    prev.addEventListener('click', function () { goto(cur - 1); });
    next.addEventListener('click', function () { goto(cur + 1); });
    root.addEventListener('click', function (e) { var b = e.target.closest('[data-goto]'); if (b) goto(+b.getAttribute('data-goto')); });
    root.querySelector('#tour-ch-select').addEventListener('change', function (e) { goto(+e.target.value); });
    document.addEventListener('keydown', function (e) {
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) return;
      var pal = document.getElementById('palette'); if (pal && !pal.hidden) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); goto(cur + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goto(cur - 1); }
    });
    window.addEventListener('hashchange', function () { var m = /^#etape-(\d+)$/.exec(location.hash); if (m && +m[1] - 1 !== cur) goto(+m[1] - 1); });
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { if (cur < total && steps[cur].img) placeBubble(steps[cur]); }, 120); });
    render();
  }

  global.CISTour = { mount: mount };
})(window);
