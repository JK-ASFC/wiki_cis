/*
 * CIS Wiki — moteur Markdown sécurisé (sans dépendance).
 *
 * Tout le texte est échappé : aucun HTML brut n'est accepté dans le contenu,
 * seules les balises produites par ce moteur sont générées.
 *
 * Syntaxe prise en charge :
 *   ## Titre / ### Sous-titre           paragraphes, **gras**, *italique*, `code`
 *   - liste / 1. liste numérotée        (imbrication par indentation)
 *   [texte](https://…)                  lien (http, https, mailto, relatif)
 *   [[id-page]] / [[id-page|texte]]     lien interne vers une page du wiki
 *   ![légende](media:dossier/img.png)   image (media: = bibliothèque de médias)
 *   ::video[Titre](media:videos/x.mp4)  vidéo
 *   ++Tab++                             touche de clavier
 *   > [!NOTE] / [!TIP] / [!WARNING] / [!IMPORTANT]   encadrés
 *   | a | b |  + ligne |---|---|        tableaux
 *   :::guided … :::  /  :::expert … ::: contenu réservé à un mode d'affichage
 */
(function (global) {
  'use strict';

  var ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ESC[c]; }); }

  function slugify(s) {
    return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'section';
  }

  function safeUrl(url, opts) {
    url = String(url || '').trim();
    if (/^media:/i.test(url)) return (opts.mediaBase || '') + url.slice(6).replace(/^\/+/, '');
    if (/^(https?:|mailto:)/i.test(url)) return url;
    if (/^[a-z][a-z0-9+.-]*:/i.test(url)) return '#'; // javascript:, data:, etc. refusés
    if (/^\/\//.test(url)) return '#';
    return url; // chemin relatif ou ancre
  }

  var FILE_RE = /\.(xlsx?|pdf|docx?|zip|csv|pptx?)(\?|#|$)/i;

  var INLINE_SRC =
    '(`+)([^`]|[^`][\\s\\S]*?[^`])\\1(?!`)' +                         // 1,2 code
    '|\\+\\+([^+\\s][^+]*?)\\+\\+' +                                  // 3 kbd
    '|!\\[([^\\]]*)\\]\\(([^)\\s]+)(?:\\s+"([^"]*)")?\\)' +            // 4,5,6 image
    '|\\[\\[([a-z0-9][a-z0-9-]*)(?:\\|([^\\]]+))?\\]\\]' +             // 7,8 lien interne
    '|\\[([^\\]]+)\\]\\(([^)\\s]+)(?:\\s+"([^"]*)")?\\)' +             // 9,10,11 lien
    '|\\*\\*([\\s\\S]+?)\\*\\*' +                                     // 12 gras
    '|__([\\s\\S]+?)__' +                                             // 13 gras
    '|\\*([^*\\s](?:[^*]*?[^*\\s])?)\\*' +                            // 14 italique
    '|(?<![\\p{L}\\p{N}])_([^_\\s](?:[^_]*?[^_\\s])?)_(?![\\p{L}\\p{N}])'; // 15 italique

  function inline(src, opts) {
    var re = new RegExp(INLINE_SRC, 'gu');
    var out = '', last = 0, m;
    while ((m = re.exec(src))) {
      out += esc(src.slice(last, m.index));
      last = re.lastIndex;
      if (m[2] !== undefined) out += '<code>' + esc(m[2]) + '</code>';
      else if (m[3] !== undefined) out += '<kbd>' + esc(m[3]) + '</kbd>';
      else if (m[5] !== undefined) {
        out += '<img src="' + esc(safeUrl(m[5], opts)) + '" alt="' + esc(m[4]) + '"' + (m[6] ? ' title="' + esc(m[6]) + '"' : '') + ' loading="lazy">';
      } else if (m[7] !== undefined) {
        var r = opts.resolveLink ? opts.resolveLink(m[7]) : { href: '#' + m[7], title: m[7] };
        out += '<a class="wikilink' + (r.missing ? ' wikilink--missing' : '') + '" href="' + esc(r.href) + '">' + (m[8] ? inline(m[8], opts) : esc(r.title)) + '</a>';
      } else if (m[10] !== undefined) {
        var href = safeUrl(m[10], opts);
        var ext = /^https?:/i.test(href) && !(opts.internalHost && href.indexOf(opts.internalHost) === 0 && !FILE_RE.test(href));
        var cls = FILE_RE.test(href) ? 'file-link' : (ext ? 'ext-link' : '');
        out += '<a href="' + esc(href) + '"' + (cls ? ' class="' + cls + '"' : '') +
          (m[11] ? ' title="' + esc(m[11]) + '"' : '') +
          (ext || cls === 'file-link' ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' + inline(m[9], opts) + '</a>';
      } else if (m[12] !== undefined || m[13] !== undefined) out += '<strong>' + inline(m[12] !== undefined ? m[12] : m[13], opts) + '</strong>';
      else if (m[14] !== undefined || m[15] !== undefined) out += '<em>' + inline(m[14] !== undefined ? m[14] : m[15], opts) + '</em>';
    }
    out += esc(src.slice(last));
    return out;
  }

  // ---- Blocs -------------------------------------------------------------
  var LIST_RE = /^(\s*)([-*+]|\d{1,3}[.)])\s+(.*)$/;
  var HEAD_RE = /^(#{1,4})\s+(.+?)\s*#*\s*$/;
  var IMG_LINE_RE = /^\s*!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)\s*$/;
  var VIDEO_RE = /^\s*::video\[([^\]]*)\]\(([^)\s]+)\)\s*$/;
  var FENCE_RE = /^\s*```/;
  var CONTAINER_RE = /^\s*:::\s*(guided|expert|details)\b\s*(.*)$/;
  var HR_RE = /^\s*(-{3,}|\*{3,}|_{3,})\s*$/;
  var TABLE_SEP_RE = /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/;
  var CALLOUT_RE = /^\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]\s*(.*)$/i;

  function indentOf(line) { var m = line.match(/^(\s*)/); return m[1].replace(/\t/g, '    ').length; }

  function isBlockStart(lines, i) {
    var l = lines[i];
    return HEAD_RE.test(l) || LIST_RE.test(l) || /^\s*>/.test(l) || FENCE_RE.test(l) || CONTAINER_RE.test(l) ||
      HR_RE.test(l) || IMG_LINE_RE.test(l) || VIDEO_RE.test(l) || /^\s*:::\s*$/.test(l) ||
      (l.indexOf('|') !== -1 && i + 1 < lines.length && TABLE_SEP_RE.test(lines[i + 1]));
  }

  // Découpe une ligne de tableau sans couper les liens internes [[id|texte]] ; \| = barre littérale.
  function splitRow(line) {
    var s = line.trim();
    if (s.charAt(0) === '|') s = s.slice(1);
    if (s.charAt(s.length - 1) === '|' && s.charAt(s.length - 2) !== '\\') s = s.slice(0, -1);
    var cells = [], cur = '', depth = 0;
    for (var i = 0; i < s.length; i++) {
      var c = s.charAt(i), d = s.charAt(i + 1);
      if (c === '[' && d === '[') { depth++; cur += '[['; i++; continue; }
      if (c === ']' && d === ']' && depth) { depth--; cur += ']]'; i++; continue; }
      if (c === '\\' && d === '|') { cur += '|'; i++; continue; }
      if (c === '|' && !depth) { cells.push(cur.trim()); cur = ''; continue; }
      cur += c;
    }
    cells.push(cur.trim());
    return cells;
  }

  function dedent(lines) {
    var min = Infinity;
    lines.forEach(function (l) { if (l.trim()) min = Math.min(min, indentOf(l)); });
    if (!isFinite(min) || min === 0) return lines;
    return lines.map(function (l) { return l.replace(/\t/g, '    ').slice(Math.min(min, indentOf(l))); });
  }

  function renderFigure(alt, src, title, opts) {
    var url = esc(safeUrl(src, opts));
    var cap = title || alt;
    return '<details class="shot" open><summary>' + (opts.icon ? opts.icon('image') : '') + '<span>' + esc(cap || opts.labels.screenshot) + '</span></summary>' +
      '<figure><button type="button" class="shot-zoom" data-zoom="' + url + '" data-caption="' + esc(cap) + '" aria-label="' + esc(opts.labels.zoom) + '">' +
      '<img src="' + url + '" alt="' + esc(alt) + '" loading="lazy"></button>' +
      (cap ? '<figcaption>' + inline(cap, opts) + '</figcaption>' : '') + '</figure></details>';
  }

  function renderList(lines, start, opts, ctx) {
    var i = start;
    var first = lines[i].match(LIST_RE);
    var base = indentOf(lines[i]);
    var ordered = /\d/.test(first[2]);
    var startNum = ordered ? parseInt(first[2], 10) : 1;
    var items = [];
    while (i < lines.length) {
      var line = lines[i];
      if (!line.trim()) {
        var j = i + 1;
        while (j < lines.length && !lines[j].trim()) j++;
        if (j < lines.length && items.length && (indentOf(lines[j]) > base || (LIST_RE.test(lines[j]) && indentOf(lines[j]) === base && (/\d/.test(lines[j].match(LIST_RE)[2]) === ordered)))) {
          items[items.length - 1].push('');
          i = j; continue;
        }
        break;
      }
      var m = line.match(LIST_RE);
      var ind = indentOf(line);
      if (m && ind === base) {
        if (/\d/.test(m[2]) !== ordered) break;
        items.push([m[3]]); i++; continue;
      }
      if (ind > base && items.length) { items[items.length - 1].push(line); i++; continue; }
      if (!m && ind === base && items.length && lines[i - 1] && lines[i - 1].trim() && !isBlockStart(lines, i)) {
        items[items.length - 1][0] += ' ' + line.trim(); i++; continue;
      }
      break;
    }
    var html = ordered ? '<ol' + (startNum !== 1 ? ' start="' + startNum + '"' : '') + '>' : '<ul>';
    items.forEach(function (it) {
      var rest = dedent(it.slice(1));
      // texte « paresseux » qui suit directement la première ligne
      var text = it[0];
      while (rest.length && rest[0].trim() && !isBlockStart(rest, 0)) { text += ' ' + rest.shift().trim(); }
      html += '<li>' + inline(text, opts) + (rest.join('').trim() ? renderBlocks(rest, opts, ctx) : '') + '</li>';
    });
    html += ordered ? '</ol>' : '</ul>';
    return { html: html, next: i };
  }

  function renderBlocks(lines, opts, ctx) {
    var html = '', i = 0, n = lines.length;
    while (i < n) {
      var line = lines[i];
      if (!line.trim()) { i++; continue; }
      var m;

      if (FENCE_RE.test(line)) {
        var code = []; i++;
        while (i < n && !FENCE_RE.test(lines[i])) code.push(lines[i++]);
        i++;
        html += '<pre><code>' + esc(code.join('\n')) + '</code></pre>';
        continue;
      }

      if ((m = line.match(CONTAINER_RE))) {
        var depth = 1, inner = []; i++;
        while (i < n) {
          if (CONTAINER_RE.test(lines[i])) depth++;
          else if (/^\s*:::\s*$/.test(lines[i])) { depth--; if (!depth) break; }
          inner.push(lines[i]); i++;
        }
        i++;
        var body = renderBlocks(dedent(inner), opts, ctx);
        if (m[1] === 'details') html += '<details class="md-details"><summary>' + inline(m[2] || opts.labels.details, opts) + '</summary>' + body + '</details>';
        else html += '<div class="only-' + m[1] + ' mode-block mode-block--' + m[1] + '"><span class="mode-flag">' + esc(opts.labels[m[1]]) + '</span>' + body + '</div>';
        continue;
      }

      if ((m = line.match(HEAD_RE))) {
        var level = Math.max(2, m[1].length);
        var text = m[2];
        var plainText = toPlain(text);
        var id = slugify(plainText), k = 2;
        while (ctx.ids[id]) id = slugify(plainText) + '-' + (k++);
        ctx.ids[id] = true;
        ctx.headings.push({ level: level, text: plainText, id: id });
        html += '<h' + level + ' id="' + id + '">' + inline(text, opts) + '<a class="anchor" href="#' + id + '" aria-label="' + esc(opts.labels.anchor) + '">#</a></h' + level + '>';
        i++; continue;
      }

      if (HR_RE.test(line)) { html += '<hr>'; i++; continue; }

      if ((m = line.match(VIDEO_RE))) {
        html += '<figure class="video"><video controls preload="metadata" src="' + esc(safeUrl(m[2], opts)) + '"></video>' +
          (m[1] ? '<figcaption>' + inline(m[1], opts) + '</figcaption>' : '') + '</figure>';
        i++; continue;
      }

      if (IMG_LINE_RE.test(line)) {
        var figs = [];
        while (i < n && (m = lines[i].match(IMG_LINE_RE))) { figs.push(renderFigure(m[1], m[2], m[3], opts)); i++; }
        html += figs.length > 1 ? '<div class="gallery">' + figs.join('') + '</div>' : figs[0];
        continue;
      }

      if (/^\s*>/.test(line)) {
        var q = [];
        while (i < n && /^\s*>/.test(lines[i])) { q.push(lines[i].replace(/^\s*>\s?/, '')); i++; }
        var cm = q[0].match(CALLOUT_RE);
        if (cm) {
          var type = cm[1].toLowerCase();
          if (type === 'caution') type = 'warning';
          var title = cm[2] ? inline(cm[2], opts) : esc(opts.labels[type]);
          html += '<aside class="callout callout--' + type + '" role="note"><div class="callout-title">' +
            (opts.icon ? opts.icon({ note: 'info', tip: 'bulb', warning: 'warning', important: 'octagon' }[type]) : '') +
            '<span>' + title + '</span></div><div class="callout-body">' + renderBlocks(q.slice(1), opts, ctx) + '</div></aside>';
        } else {
          html += '<blockquote>' + renderBlocks(q, opts, ctx) + '</blockquote>';
        }
        continue;
      }

      if (line.indexOf('|') !== -1 && i + 1 < n && TABLE_SEP_RE.test(lines[i + 1])) {
        var head = splitRow(line);
        var aligns = splitRow(lines[i + 1]).map(function (c) {
          var l = c.charAt(0) === ':', r = c.charAt(c.length - 1) === ':';
          return l && r ? 'center' : r ? 'right' : l ? 'left' : '';
        });
        i += 2;
        var rows = [];
        while (i < n && lines[i].trim() && lines[i].indexOf('|') !== -1) { rows.push(splitRow(lines[i])); i++; }
        var al = function (j) { return aligns[j] ? ' style="text-align:' + aligns[j] + '"' : ''; };
        html += '<div class="table-wrap"><table><thead><tr>' + head.map(function (c, j) { return '<th' + al(j) + '>' + inline(c, opts) + '</th>'; }).join('') + '</tr></thead><tbody>' +
          rows.map(function (r) { return '<tr>' + head.map(function (_, j) { return '<td' + al(j) + '>' + inline(r[j] || '', opts) + '</td>'; }).join('') + '</tr>'; }).join('') +
          '</tbody></table></div>';
        continue;
      }

      if (LIST_RE.test(line)) {
        var res = renderList(lines, i, opts, ctx);
        html += res.html; i = res.next; continue;
      }

      var para = [line.trim()]; i++;
      while (i < n && lines[i].trim() && !isBlockStart(lines, i)) { para.push(lines[i].trim()); i++; }
      html += '<p>' + para.map(function (p) { return inline(p, opts); }).join(' ') + '</p>';
    }
    return html;
  }

  var DEFAULT_LABELS = {
    note: 'Note', tip: 'Tip', warning: 'Warning', important: 'Important', details: 'Details',
    guided: 'Guided', expert: 'Expert', screenshot: 'Screenshot', zoom: 'Enlarge', anchor: 'Link to this section'
  };

  function render(md, options) {
    var opts = Object.assign({ mediaBase: '', labels: {} }, options || {});
    opts.labels = Object.assign({}, DEFAULT_LABELS, opts.labels);
    var ctx = { headings: [], ids: {} };
    var lines = String(md || '').replace(/\r\n?/g, '\n').split('\n');
    var html = renderBlocks(lines, opts, ctx);
    return { html: html, headings: ctx.headings };
  }

  function renderInline(text, options) {
    var opts = Object.assign({ mediaBase: '', labels: DEFAULT_LABELS }, options || {});
    return inline(String(text || ''), opts);
  }

  // Texte brut (recherche, temps de lecture, extraits)
  function toPlain(md) {
    return String(md || '')
      .replace(/^\s*:::.*$/gm, ' ')
      .replace(/^\s*::video\[([^\]]*)\]\([^)]*\)/gm, '$1')
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/\[\[[a-z0-9-]+\|([^\]]+)\]\]/g, '$1')
      .replace(/\[\[([a-z0-9-]+)\]\]/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/^\s*>\s?\[![A-Z]+\]\s*/gm, '')
      .replace(/^\s*>\s?/gm, '')
      .replace(/^\s*#{1,4}\s+/gm, '')
      .replace(/^\s*\|?\s*:?-{2,}.*$/gm, ' ')
      .replace(/\|/g, ' ')
      .replace(/^\s*([-*+]|\d+[.)])\s+/gm, '')
      .replace(/\+\+([^+]+)\+\+/g, '$1')
      .replace(/(\*\*|__|`)/g, '')
      .replace(/(^|\W)[*_]([^*_]+)[*_](?=\W|$)/g, '$1$2')
      .replace(/\s+/g, ' ')
      .trim();
  }

  global.CISMarkdown = { render: render, inline: renderInline, toPlain: toPlain, slugify: slugify, escape: esc };
})(window);
