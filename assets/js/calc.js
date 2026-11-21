/*
 * CIS Wiki — simulateur des méthodes de calcul du CIS (v6).
 *
 * Les formules reproduisent le comportement mesuré dans le CIS v6
 * (instance de formation training_604, testeur « Test Calculation »).
 * Chaque cas de test documenté dans le wiki a été vérifié dans le CIS.
 *
 * Utilisation dans une page (Markdown) :
 *   ::calc[ranged]{"target":800,"ranges":[[5,5,0],[10,10,0.5]],"max":1.5,"values":[800,804,808]}
 *   ::trades[ranged]   tableau des exemples métiers pour une méthode
 *   ::trades[]         explorateur de tous les métiers
 */
(function (global) {
  'use strict';

  function num(v) {
    if (v === null || v === undefined) return NaN;
    var s = String(v).trim().replace(',', '.');
    if (s === '' || !/^-?\d*\.?\d+(e-?\d+)?$/i.test(s)) return NaN;
    return parseFloat(s);
  }
  var EPS = 1e-9;
  function floorSafe(x) { return Math.floor(x + EPS); }
  function round2(x) { return Math.round(x * 100 + EPS) / 100; }
  function clampMark(x, max) { return Math.min(max, Math.max(0, x)); }
  function deduction(type, amount, max) { return type === 'percent' ? max * amount / 100 : amount; }

  /* --- Moteurs : renvoient un tableau de notes (number) ou null (pas de note) --- */
  var ENGINES = {
    passfail: function (c, vals) {
      return vals.map(function (v) { return v === 'pass' ? c.max : v === 'fail' ? 0 : null; });
    },
    choice: function (c, vals) {
      return vals.map(function (v) {
        var ch = (c.choices || []).find(function (x) { return x[0] === v; });
        if (!ch) return null;
        return clampMark(c.max - deduction(c.dtype, num(ch[1]) || 0, c.max), c.max);
      });
    },
    completed: function (c, vals) {
      return vals.map(function (v) {
        var x = num(v), n = num(c.possible);
        if (isNaN(x) || isNaN(n) || n <= 0 || x < 0 || x > n) return null;
        return c.max * x / n;
      });
    },
    ranged: function (c, vals) {
      var t = num(c.target);
      return vals.map(function (v) {
        var x = num(v);
        if (isNaN(x) || isNaN(t)) return null;
        var d = x - t;
        if (Math.abs(d) < EPS) return c.max;
        var ranges = (c.ranges || []).filter(function (r) { return r && r.length >= 3 && r.some(function (z) { return String(z).trim() !== ''; }); });
        for (var i = 0; i < ranges.length; i++) {
          var lo = num(ranges[i][0]), up = num(ranges[i][1]), de = num(ranges[i][2]) || 0;
          var ok = d > 0 ? (!isNaN(up) && d <= up + EPS) : (!isNaN(lo) && -d <= lo + EPS);
          if (ok) return clampMark(c.max - deduction(c.dtype, de, c.max), c.max);
        }
        return 0;
      });
    },
    regular: function (c, vals) {
      var t = num(c.target), step = num(c.difference), ded = num(c.deduction);
      return vals.map(function (v) {
        var x = num(v);
        if (isNaN(x) || isNaN(t) || !(step > 0) || isNaN(ded)) return null;
        var gap = Math.abs(x - t);
        if (c.diffType === 'percent') { if (!t) return null; gap = gap / Math.abs(t) * 100; }
        var steps = floorSafe(gap / step);
        return clampMark(c.max - steps * deduction(c.dtype, ded, c.max), c.max);
      });
    },
    percent: function (c, vals) {
      var xs = vals.map(num);
      if (!xs.length || xs.some(isNaN)) return vals.map(function () { return null; });
      var hi = Math.max.apply(null, xs), lo = Math.min.apply(null, xs);
      var mn = num(c.min), mx = num(c.max_value);
      var best, worst;
      if (c.best === 'lowest') {
        best = isNaN(mn) ? lo : Math.max(mn, lo);
        worst = isNaN(mx) ? hi : Math.min(mx, hi);
      } else {
        best = isNaN(mx) ? hi : Math.min(mx, hi);
        worst = isNaN(mn) ? lo : Math.max(mn, lo);
      }
      return xs.map(function (x) {
        if (Math.abs(best - worst) < EPS) return c.max;
        var r = c.best === 'lowest' ? (worst - x) / (worst - best) : (x - worst) / (best - worst);
        return clampMark(r * c.max, c.max);
      });
    },
    stepped: function (c, vals) {
      var xs = vals.map(num), step = num(c.interval), ded = num(c.deduction);
      if (!xs.length || xs.some(isNaN) || !(step > 0) || isNaN(ded)) return vals.map(function () { return null; });
      var best = c.best === 'lowest' ? Math.min.apply(null, xs) : Math.max.apply(null, xs);
      return xs.map(function (x) {
        var gap = Math.abs(best - x);
        if (c.basis === 'percent') { if (!best) return null; gap = gap / Math.abs(best) * 100; }
        var steps = c.proportional ? gap / step : floorSafe(gap / step);
        return clampMark(c.max - steps * ded, c.max);
      });
    }
  };

  function compute(type, config, values) {
    var eng = ENGINES[type];
    if (!eng) return [];
    var c = Object.assign({}, config);
    c.max = num(c.max);
    if (isNaN(c.max)) return values.map(function () { return null; });
    return eng(c, values).map(function (m) { return m === null || isNaN(m) ? null : round2(m); });
  }

  /* --- Widget ----------------------------------------------------------- */
  var T = {
    fr: {
      title: 'Simulateur', hint: 'Modifiez les paramètres ou les valeurs : les notes se recalculent comme dans le CIS.',
      params: 'Paramètres', max: 'Note max (Max Mark)', values: 'Valeurs des compétiteurs', competitor: 'N°', value: 'Valeur saisie', mark: 'Note', reset: 'Réinitialiser', add: 'Ajouter un compétiteur',
      target: 'Valeur cible (Target Value)', dtype: 'Type de déduction', marks: 'Nombre de points', percent: 'Pourcentage de la note max',
      lower: '− Diff (sous la cible)', upper: '+ Diff (au-dessus)', deduct: 'Déduction', range: 'Plage', choice: 'Choix', label: 'Libellé',
      possible: 'Nombre possible (Number Possible)', diffType: 'Type d’écart', unit: 'Unité de mesure', diffPct: 'Écart en %', difference: 'Pas (Difference Amount)', deductionAmt: 'Déduction par pas',
      best: 'Note max à…', highest: 'la plus grande valeur', lowest: 'la plus petite valeur', min: 'Minimum Value (optionnel)', maxv: 'Maximum Value (optionnel)',
      basis: 'Résultats basés sur', valueDiff: 'l’écart en valeur', pctDiff: 'l’écart en %', interval: 'Intervalle', dedPer: 'Points déduits par intervalle', prop: 'Déductions proportionnelles',
      pass: 'Réussi (Pass)', fail: 'Échoué (Fail)', none: '—', noMark: 'pas de note',
      cmpNote: 'Méthode comparative : la note de chacun dépend des autres. Si une seule valeur manque ou n’est pas un nombre, le CIS n’affiche aucune note.',
      why: 'Détail du calcul'
    },
    en: {
      title: 'Simulator', hint: 'Change the settings or the values: marks are recalculated as in the CIS.',
      params: 'Settings', max: 'Max Mark', values: 'Competitor values', competitor: 'No.', value: 'Value entered', mark: 'Mark', reset: 'Reset', add: 'Add a competitor',
      target: 'Target Value', dtype: 'Mark Deduction Type', marks: 'Number of Marks', percent: 'Percentage of Marks',
      lower: '− Diff (below target)', upper: '+ Diff (above)', deduct: 'Deduct', range: 'Range', choice: 'Choice', label: 'Label',
      possible: 'Number Possible', diffType: 'Measurement Difference Type', unit: 'Unit of Measurement', diffPct: 'Percentage Difference', difference: 'Difference Amount', deductionAmt: 'Deduction Amount',
      best: 'Highest Mark to…', highest: 'Highest Value', lowest: 'Lowest Value', min: 'Minimum Value (optional)', maxv: 'Maximum Value (optional)',
      basis: 'Results Based On', valueDiff: 'Value Difference', pctDiff: 'Percentage Difference', interval: 'Value or Percentage Interval', dedPer: 'Marks Deducted per Difference', prop: 'Deductions are Proportional',
      pass: 'Pass', fail: 'Fail', none: '—', noMark: 'no mark',
      cmpNote: 'Comparative method: each mark depends on the others. If a single value is missing or not a number, the CIS shows no marks at all.',
      why: 'Calculation details'
    }
  };

  var DEFAULTS = {
    passfail: { max: 8, values: ['pass', 'fail', 'pass'] },
    choice: { max: 6.5, dtype: 'percent', choices: [['Conforme', 0], ['Défaut mineur', 25], ['Défaut majeur', 50], ['Absente', 100]], values: ['Conforme', 'Défaut mineur', 'Absente'] },
    completed: { max: 12, possible: 6, values: [6, 5, 3, 0] },
    ranged: { max: 1.5, target: 800, dtype: 'marks', ranges: [[5, 5, 0], [10, 10, 0.5], [15, 15, 1]], values: [800, 804, 808, 813, 790] },
    regular: { max: 0.5, target: 100, diffType: 'unit', difference: 5, dtype: 'marks', deduction: 0.25, values: [100, 104, 105, 111] },
    percent: { max: 2, best: 'lowest', min: '', max_value: '', values: [30, 50, 60, 90] },
    stepped: { max: 2, best: 'highest', basis: 'value', interval: 50, deduction: 0.5, proportional: false, values: [1700, 1637, 1587, 1498] }
  };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function fmt(n, lang) { return n === null ? '' : n.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  var uid = 0;

  function field(label, html) { return '<label class="sim-field"><span>' + esc(label) + '</span>' + html + '</label>'; }
  function input(key, val, attrs) { return '<input type="text" inputmode="decimal" data-k="' + key + '" value="' + esc(val) + '"' + (attrs || '') + '>'; }
  function radios(key, val, opts) {
    var name = 'sim' + (uid++);
    return '<span class="sim-radios">' + opts.map(function (o) {
      return '<label><input type="radio" name="' + name + '" data-k="' + key + '" value="' + o[0] + '"' + (val === o[0] ? ' checked' : '') + '> ' + esc(o[1]) + '</label>';
    }).join('') + '</span>';
  }

  function paramsHtml(type, c, t) {
    var h = field(t.max, input('max', c.max));
    if (type === 'choice') {
      h += field(t.dtype, radios('dtype', c.dtype, [['marks', t.marks], ['percent', t.percent]]));
      h += '<div class="sim-grid sim-grid--2"><span class="sim-colhead">' + esc(t.label) + '</span><span class="sim-colhead">' + esc(t.deduct) + '</span>';
      for (var i = 0; i < 5; i++) { var ch = c.choices[i] || ['', '']; h += '<input type="text" data-k="choices.' + i + '.0" value="' + esc(ch[0]) + '" placeholder="' + esc(t.choice + ' ' + (i + 1)) + '">' + input('choices.' + i + '.1', ch[1], ' placeholder="' + esc(t.deduct) + '"'); }
      h += '</div>';
    }
    if (type === 'completed') h += field(t.possible, input('possible', c.possible));
    if (type === 'ranged') {
      h += field(t.target, input('target', c.target));
      h += field(t.dtype, radios('dtype', c.dtype, [['marks', t.marks], ['percent', t.percent]]));
      h += '<div class="sim-grid sim-grid--3"><span class="sim-colhead">' + esc(t.lower) + '</span><span class="sim-colhead">' + esc(t.upper) + '</span><span class="sim-colhead">' + esc(t.deduct) + '</span>';
      var n = Math.max(3, Math.min(10, (c.ranges || []).length + 1));
      for (var j = 0; j < n; j++) { var r = c.ranges[j] || ['', '', '']; h += input('ranges.' + j + '.0', r[0], ' aria-label="' + esc(t.range + ' ' + (j + 1) + ' ' + t.lower) + '"') + input('ranges.' + j + '.1', r[1], ' aria-label="' + esc(t.range + ' ' + (j + 1) + ' ' + t.upper) + '"') + input('ranges.' + j + '.2', r[2], ' aria-label="' + esc(t.range + ' ' + (j + 1) + ' ' + t.deduct) + '"'); }
      h += '</div>';
    }
    if (type === 'regular') {
      h += field(t.target, input('target', c.target));
      h += field(t.diffType, radios('diffType', c.diffType, [['unit', t.unit], ['percent', t.diffPct]]));
      h += field(t.difference, input('difference', c.difference));
      h += field(t.dtype, radios('dtype', c.dtype, [['marks', t.marks], ['percent', t.percent]]));
      h += field(t.deductionAmt, input('deduction', c.deduction));
    }
    if (type === 'percent') {
      h += field(t.best, radios('best', c.best, [['highest', t.highest], ['lowest', t.lowest]]));
      h += field(t.min, input('min', c.min)) + field(t.maxv, input('max_value', c.max_value));
    }
    if (type === 'stepped') {
      h += field(t.best, radios('best', c.best, [['highest', t.highest], ['lowest', t.lowest]]));
      h += field(t.basis, radios('basis', c.basis, [['value', t.valueDiff], ['percent', t.pctDiff]]));
      h += field(t.interval, input('interval', c.interval)) + field(t.dedPer, input('deduction', c.deduction));
      h += '<label class="sim-check"><input type="checkbox" data-k="proportional"' + (c.proportional ? ' checked' : '') + '> ' + esc(t.prop) + '</label>';
    }
    return h;
  }

  function valueInput(type, c, i, v, t) {
    if (type === 'passfail') {
      return '<select data-v="' + i + '"><option value="">' + esc(t.none) + '</option><option value="pass"' + (v === 'pass' ? ' selected' : '') + '>' + esc(t.pass) + '</option><option value="fail"' + (v === 'fail' ? ' selected' : '') + '>' + esc(t.fail) + '</option></select>';
    }
    if (type === 'choice') {
      return '<select data-v="' + i + '"><option value="">' + esc(t.none) + '</option>' + (c.choices || []).filter(function (x) { return x && String(x[0]).trim(); }).map(function (x) {
        return '<option' + (x[0] === v ? ' selected' : '') + '>' + esc(x[0]) + '</option>';
      }).join('') + '</select>';
    }
    return '<input type="text" inputmode="decimal" data-v="' + i + '" value="' + esc(v) + '" aria-label="' + esc(t.value + ' ' + (i + 1)) + '">';
  }

  function setPath(obj, path, val) {
    var ks = path.split('.'), o = obj;
    for (var i = 0; i < ks.length - 1; i++) {
      var k = ks[i];
      if (o[k] === undefined) o[k] = /^\d+$/.test(ks[i + 1]) ? [] : {};
      o = o[k];
    }
    o[ks[ks.length - 1]] = val;
  }

  function mountSim(el, lang) {
    var t = T[lang] || T.fr;
    var type = el.getAttribute('data-calc');
    var conf = {};
    try { conf = JSON.parse(el.getAttribute('data-config') || '{}'); } catch (e) { conf = {}; }
    var initial = JSON.parse(JSON.stringify(Object.assign({}, DEFAULTS[type] || {}, conf)));
    var state = JSON.parse(JSON.stringify(initial));
    var comparative = type === 'percent' || type === 'stepped';

    function render(focusKey) {
      var marks = compute(type, state, state.values);
      el.innerHTML = '<div class="sim-head"><strong>' + esc(t.title) + '</strong><span>' + esc(t.hint) + '</span>' +
        '<button type="button" class="btn btn--ghost btn--sm" data-sim="reset">' + esc(t.reset) + '</button></div>' +
        '<div class="sim-body"><fieldset class="sim-params"><legend>' + esc(t.params) + '</legend>' + paramsHtml(type, state, t) + '</fieldset>' +
        '<div class="sim-values"><table><thead><tr><th>' + esc(t.competitor) + '</th><th>' + esc(t.value) + '</th><th class="num">' + esc(t.mark) + '</th></tr></thead><tbody>' +
        state.values.map(function (v, i) {
          var m = marks[i];
          var pct = m === null ? 0 : Math.round(m / (num(state.max) || 1) * 100);
          return '<tr><td>' + (i + 1) + '</td><td>' + valueInput(type, state, i, v, t) + '</td><td class="num"><span class="sim-mark' + (m === null ? ' sim-mark--none' : '') + '">' +
            (m === null ? esc(t.noMark) : fmt(m, lang)) + '</span><span class="sim-bar"><i style="width:' + pct + '%"></i></span></td></tr>';
        }).join('') + '</tbody></table>' +
        (state.values.length < 8 ? '<button type="button" class="link-btn" data-sim="add">+ ' + esc(t.add) + '</button>' : '') +
        (comparative ? '<p class="sim-note">' + esc(t.cmpNote) + '</p>' : '') + '</div></div>';
      if (focusKey) {
        var f = el.querySelector('[data-k="' + focusKey + '"],[data-v="' + focusKey.replace('v:', '') + '"]');
        if (f && f.focus) { f.focus(); if (f.setSelectionRange && f.type === 'text') { var l = f.value.length; f.setSelectionRange(l, l); } }
      }
    }

    function onChange(e) {
      var k = e.target.getAttribute('data-k'), v = e.target.getAttribute('data-v');
      if (k) {
        var val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setPath(state, k, val);
        if (k.indexOf('choices') === 0) state.choices = state.choices.map(function (x) { return x || ['', '']; });
        if (e.type === 'input') updateMarks(); else render(e.target.type === 'text' ? k : null);
      } else if (v !== null) {
        state.values[+v] = e.target.value;
        updateMarks();
      }
    }
    function updateMarks() {
      var marks = compute(type, state, state.values);
      var rows = el.querySelectorAll('.sim-values tbody tr');
      rows.forEach(function (tr, i) {
        var m = marks[i], span = tr.querySelector('.sim-mark'), bar = tr.querySelector('.sim-bar i');
        span.textContent = m === null ? t.noMark : fmt(m, lang);
        span.classList.toggle('sim-mark--none', m === null);
        bar.style.width = (m === null ? 0 : Math.round(m / (num(state.max) || 1) * 100)) + '%';
      });
      // le choix dépend des libellés : on reconstruit les listes si besoin
      if (type === 'choice') {
        el.querySelectorAll('select[data-v]').forEach(function (s) {
          var i = +s.getAttribute('data-v'), cur = state.values[i];
          var opts = '<option value="">' + esc(t.none) + '</option>' + state.choices.filter(function (x) { return x && String(x[0]).trim(); }).map(function (x) { return '<option' + (x[0] === cur ? ' selected' : '') + '>' + esc(x[0]) + '</option>'; }).join('');
          if (s.innerHTML !== opts) s.innerHTML = opts;
        });
      }
    }
    el.addEventListener('input', onChange);
    el.addEventListener('change', function (e) { if (e.target.type === 'radio' || e.target.type === 'checkbox') onChange(e); else if (e.target.tagName === 'SELECT') onChange(e); });
    el.addEventListener('click', function (e) {
      var b = e.target.closest('[data-sim]');
      if (!b) return;
      if (b.getAttribute('data-sim') === 'reset') state = JSON.parse(JSON.stringify(initial));
      if (b.getAttribute('data-sim') === 'add') state.values.push(type === 'passfail' ? 'pass' : type === 'choice' ? '' : '');
      render();
    });
    render();
  }

  /* --- Exemples métiers -------------------------------------------------- */
  var METHOD_LABEL = {
    passfail: 'Pass/Fail', choice: 'Choice', completed: 'Number Completed', ranged: 'Ranged Score',
    regular: 'Regular Difference Deduction', percent: 'Percent Score Comparison', stepped: 'Stepped Score Comparison'
  };
  var METHOD_PAGE = {
    passfail: 'calc-pass-fail', choice: 'calc-choice', completed: 'calc-number-completed', ranged: 'calc-ranged-score',
    regular: 'calc-regular-difference', percent: 'calc-percent-comparison', stepped: 'calc-stepped-comparison'
  };
  var TT = {
    fr: { trade: 'Métier', aspect: 'Aspect noté', setting: 'Réglage dans le CIS', choose: 'Choisissez votre métier', search: 'Filtrer les métiers…', all: 'Tous les métiers', none: 'Pas d’usage courant pour ce métier.', count: '{n} métiers', open: 'Voir la méthode' },
    en: { trade: 'Skill', aspect: 'Aspect marked', setting: 'CIS setting', choose: 'Choose your skill', search: 'Filter skills…', all: 'All skills', none: 'No common use for this skill.', count: '{n} skills', open: 'See the method' }
  };
  function tradeText(x, lang) { return (x && (x[lang] || x.fr)) || null; }

  function mountTrades(el, lang) {
    var data = global.WIKI_TRADES || [];
    var t = TT[lang] || TT.fr;
    var method = el.getAttribute('data-method');
    if (method) {
      var rows = data.filter(function (tr) { return tr.ex && tr.ex[method]; });
      el.innerHTML = '<div class="trades-filter"><input type="search" placeholder="' + esc(t.search) + '" aria-label="' + esc(t.search) + '"><span class="trades-count">' + esc(t.count.replace('{n}', rows.length)) + '</span></div>' +
        '<div class="table-wrap"><table class="trades-table"><thead><tr><th>' + esc(t.trade) + '</th><th>' + esc(t.aspect) + '</th><th>' + esc(t.setting) + '</th></tr></thead><tbody>' +
        rows.map(function (tr) {
          var ex = tradeText(tr.ex[method], lang);
          return '<tr data-name="' + esc((tr.fr + ' ' + (tr.en || '')).toLowerCase()) + '"><th scope="row">' + esc(lang === 'en' && tr.en ? tr.en : tr.fr) + '</th><td>' + esc(ex[0]) + '</td><td>' + esc(ex[1]) + '</td></tr>';
        }).join('') + '</tbody></table></div>';
      var inp = el.querySelector('input');
      inp.addEventListener('input', function () {
        var q = inp.value.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
        var n = 0;
        el.querySelectorAll('tbody tr').forEach(function (r) {
          var ok = !q || r.getAttribute('data-name').normalize('NFD').replace(/[̀-ͯ]/g, '').indexOf(q) !== -1;
          r.hidden = !ok; if (ok) n++;
        });
        el.querySelector('.trades-count').textContent = t.count.replace('{n}', n);
      });
      return;
    }
    // explorateur : un métier → les 7 méthodes
    var opts = data.map(function (tr, i) { return '<option value="' + i + '">' + esc(lang === 'en' && tr.en ? tr.en : tr.fr) + '</option>'; }).join('');
    el.innerHTML = '<label class="trades-pick"><span>' + esc(t.choose) + '</span><select>' + opts + '</select></label><div class="trades-cards"></div>';
    var sel = el.querySelector('select'), box = el.querySelector('.trades-cards');
    var saved = null;
    try { saved = localStorage.getItem('ciswiki:trade'); } catch (e) { saved = null; }
    if (saved !== null && data[+saved]) sel.value = saved;
    function show() {
      var tr = data[+sel.value];
      try { localStorage.setItem('ciswiki:trade', sel.value); } catch (e) { /* ignoré */ }
      box.innerHTML = Object.keys(METHOD_LABEL).map(function (m) {
        var ex = tr && tr.ex[m] ? tradeText(tr.ex[m], lang) : null;
        return '<article class="trade-card' + (ex ? '' : ' trade-card--empty') + '"><header><span class="trade-method">' + esc(METHOD_LABEL[m]) + '</span>' +
          '<a href="article.html?id=' + METHOD_PAGE[m] + '">' + esc(t.open) + ' →</a></header>' +
          (ex ? '<p class="trade-aspect">' + esc(ex[0]) + '</p><p class="trade-setting">' + esc(ex[1]) + '</p>' : '<p class="trade-setting">' + esc(t.none) + '</p>') + '</article>';
      }).join('');
    }
    sel.addEventListener('change', show);
    show();
  }

  function mount(root, lang) {
    if (!root) return;
    root.querySelectorAll('.calc-sim[data-calc]').forEach(function (el) { mountSim(el, lang); });
    root.querySelectorAll('.trades[data-trades]').forEach(function (el) { mountTrades(el, lang); });
  }

  global.CISCalc = { compute: compute, mount: mount, ENGINES: ENGINES };
})(window);
