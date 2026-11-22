/*
 * CIS Wiki — formulaire « Votre avis » (avis, manques, erreurs, suggestions).
 *
 * Ouvre une fenêtre depuis tout élément [data-feedback-open] (attribut facultatif : le type).
 * Envoie en JSON à api/feedback.php, qui transmet le message par e-mail (voir docs/deploiement-debian12.md).
 * Sans serveur PHP (test local), propose d'envoyer le même message depuis la messagerie.
 */
(function (global) {
  'use strict';

  var ENDPOINT = 'api/feedback.php';
  var T = {
    fr: {
      open: 'Votre avis', title: 'Votre avis sur le wiki', lead: 'Une information manque, une explication n’est pas claire, une erreur ? Dites-le-nous : chaque message est lu.',
      type: 'De quoi s’agit-il ?', types: { avis: 'Un avis', manque: 'Une information manquante', erreur: 'Une erreur', idee: 'Une suggestion' },
      page: 'Page concernée', message: 'Votre message', messageHint: 'Soyez précis : quelle étape, quel écran, ce que vous cherchiez…',
      name: 'Votre nom (facultatif)', email: 'Votre e-mail (facultatif, pour vous répondre)', send: 'Envoyer', cancel: 'Annuler', close: 'Fermer',
      sending: 'Envoi…', ok: 'Merci ! Votre message a bien été envoyé.', errMessage: 'Écrivez un message d’au moins quelques mots.', errEmail: 'Cette adresse e-mail n’est pas valide.',
      errRate: 'Trop de messages envoyés depuis cet ordinateur. Réessayez dans une heure.', errServer: 'L’envoi automatique n’est pas disponible pour le moment.',
      mailto: 'Envoyer depuis ma messagerie', general: 'Tout le wiki'
    },
    en: {
      open: 'Your feedback', title: 'Your feedback on the wiki', lead: 'Something missing, an unclear explanation, a mistake? Tell us: every message is read.',
      type: 'What is it about?', types: { avis: 'Feedback', manque: 'Missing information', erreur: 'A mistake', idee: 'A suggestion' },
      page: 'Page', message: 'Your message', messageHint: 'Be specific: which step, which screen, what you were looking for…',
      name: 'Your name (optional)', email: 'Your e-mail (optional, so we can reply)', send: 'Send', cancel: 'Cancel', close: 'Close',
      sending: 'Sending…', ok: 'Thank you! Your message has been sent.', errMessage: 'Please write a message of at least a few words.', errEmail: 'This e-mail address is not valid.',
      errRate: 'Too many messages sent from this computer. Try again in an hour.', errServer: 'Automatic sending is not available right now.',
      mailto: 'Send from my mailbox', general: 'The whole wiki'
    }
  };

  function lang() { return document.documentElement.lang === 'en' ? 'en' : 'fr'; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function contact() {
    var s = global.WIKI_SEED && global.WIKI_SEED.settings;
    return (s && (s.feedbackEmail || s.contact)) || '';
  }
  function currentPage() {
    var h1 = document.querySelector('.article h1, .tour-head h1, .page-head h1, .welcome h1');
    return { path: location.pathname.replace(/^.*\//, '') + location.search + location.hash, title: h1 ? h1.textContent.trim() : document.title };
  }

  var dlg = null;
  function build() {
    var t = T[lang()];
    dlg = document.createElement('dialog');
    dlg.className = 'fb-dialog';
    dlg.setAttribute('aria-labelledby', 'fb-title');
    dlg.innerHTML =
      '<form class="fb-form" novalidate>' +
        '<header><h2 id="fb-title">' + esc(t.title) + '</h2><button type="button" class="fb-x" data-fb="close" aria-label="' + esc(t.close) + '">×</button></header>' +
        '<p class="fb-lead">' + esc(t.lead) + '</p>' +
        '<fieldset class="fb-types"><legend>' + esc(t.type) + '</legend>' +
          Object.keys(t.types).map(function (k, i) {
            return '<label><input type="radio" name="type" value="' + k + '"' + (i === 0 ? ' checked' : '') + '><span>' + esc(t.types[k]) + '</span></label>';
          }).join('') + '</fieldset>' +
        '<p class="fb-page"><span>' + esc(t.page) + ' :</span> <strong id="fb-page"></strong></p>' +
        '<label class="fb-field"><span>' + esc(t.message) + ' *</span><textarea name="message" rows="6" maxlength="5000" required placeholder="' + esc(t.messageHint) + '"></textarea></label>' +
        '<div class="fb-row"><label class="fb-field"><span>' + esc(t.name) + '</span><input type="text" name="name" maxlength="100" autocomplete="name"></label>' +
        '<label class="fb-field"><span>' + esc(t.email) + '</span><input type="email" name="email" maxlength="200" autocomplete="email"></label></div>' +
        // piège à robots : invisible, ne doit pas être rempli
        '<label class="fb-hp" aria-hidden="true">Website <input type="text" name="website" tabindex="-1" autocomplete="off"></label>' +
        '<p class="fb-status" role="status" aria-live="polite"></p>' +
        '<footer><button type="button" class="btn btn--ghost" data-fb="close">' + esc(t.cancel) + '</button><button type="submit" class="btn btn--primary">' + esc(t.send) + '</button></footer>' +
      '</form>';
    document.body.appendChild(dlg);
    dlg.addEventListener('click', function (e) {
      if (e.target === dlg || e.target.closest('[data-fb="close"]')) dlg.close();
    });
    dlg.querySelector('form').addEventListener('submit', submit);
  }

  function status(html, kind) {
    var el = dlg.querySelector('.fb-status');
    el.className = 'fb-status' + (kind ? ' fb-status--' + kind : '');
    el.innerHTML = html;
  }

  function open(type) {
    if (!dlg || dlg.getAttribute('data-lang') !== lang()) { if (dlg) dlg.remove(); build(); dlg.setAttribute('data-lang', lang()); }
    var f = dlg.querySelector('form');
    f.reset();
    if (type && f.querySelector('input[name="type"][value="' + type + '"]')) f.querySelector('input[name="type"][value="' + type + '"]').checked = true;
    var pg = currentPage();
    dlg.setAttribute('data-path', pg.path); dlg.setAttribute('data-title', pg.title);
    dlg.querySelector('#fb-page').textContent = pg.title || T[lang()].general;
    status('');
    var t = T[lang()];
    f.querySelector('footer').innerHTML = '<button type="button" class="btn btn--ghost" data-fb="close">' + esc(t.cancel) + '</button><button type="submit" class="btn btn--primary">' + esc(t.send) + '</button>';
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
    setTimeout(function () { f.querySelector('textarea').focus(); }, 30);
  }

  function mailtoLink(data) {
    var t = T[lang()], to = contact();
    if (!to) return '';
    var subject = '[Wiki CIS] ' + t.types[data.type] + (data.pageTitle ? ' – ' + data.pageTitle : '');
    var body = t.page + ' : ' + (data.pageTitle || '') + ' (' + data.page + ')\n\n' + data.message + (data.name ? '\n\n' + data.name : '');
    return 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  }

  function submit(e) {
    e.preventDefault();
    var t = T[lang()], f = e.target;
    var data = {
      type: (f.querySelector('input[name="type"]:checked') || {}).value || 'avis',
      message: f.elements['message'].value.trim(), name: f.elements['name'].value.trim(), email: f.elements['email'].value.trim(),
      website: f.elements['website'].value, page: dlg.getAttribute('data-path'), pageTitle: dlg.getAttribute('data-title'), lang: lang()
    };
    if (data.message.length < 5) { status(esc(t.errMessage), 'error'); f.elements['message'].focus(); return; }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) { status(esc(t.errEmail), 'error'); f.elements['email'].focus(); return; }
    var btn = f.querySelector('button[type="submit"]');
    btn.disabled = true; status(esc(t.sending));
    fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      .then(function (r) { return r.json().catch(function () { return { ok: false, error: 'http' + r.status }; }); })
      .then(function (res) {
        if (res && res.ok) {
          status(esc(t.ok), 'ok');
          f.querySelector('footer').innerHTML = '<button type="button" class="btn btn--primary" data-fb="close">' + esc(t.close) + '</button>';
          return;
        }
        throw res || {};
      })
      .catch(function (err) {
        btn.disabled = false;
        if (err && err.error === 'message') { status(esc(t.errMessage), 'error'); return; }
        if (err && err.error === 'email') { status(esc(t.errEmail), 'error'); return; }
        if (err && err.error === 'rate') { status(esc(t.errRate), 'error'); return; }
        var link = mailtoLink(data);
        status(esc(t.errServer) + (link ? ' <a class="btn btn--ghost btn--sm" href="' + esc(link) + '">' + esc(t.mailto) + '</a>' : ''), 'error');
      });
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-feedback-open]');
    if (!el) return;
    e.preventDefault();
    open(el.getAttribute('data-feedback-open'));
  });

  global.CISFeedback = { open: open, label: function () { return T[lang()].open; } };
})(window);
