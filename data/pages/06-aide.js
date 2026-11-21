/* CIS Wiki — Aide et dépannage (CIS v6) */
(function () {
  'use strict';
  var P = window.WIKI_PAGE;

  /* ------------------------------------------------------------------ */
  P({
    id: 'messages-erreurs', category: 'aide', order: 1, level: 'beginner',
    tags: ['erreur', 'message', 'problème', 'dépannage', 'exception', 'import', 'bloqué', 'grisé'],
    fr: {
      title: 'Les messages du CIS expliqués', short: 'Messages du CIS',
      summary: 'Chaque message rencontré pendant les tests, ce qu’il veut dire et comment s’en sortir.',
      objectives: ['Comprendre un message d’erreur', 'Trouver la solution sans attendre de l’aide'],
      quick: ['Historique : icône **liste** en haut à droite', 'Chercher le message avec ++Ctrl++ + ++F++ sur cette page'],
      body: `Les messages s'affichent en haut à droite puis disparaissent. Pour les relire : l'**icône liste** tout à droite de la barre de menus ([[se-connecter]]). Astuce : copiez quelques mots du message et cherchez-les sur cette page avec ++Ctrl++ + ++F++.

## Connexion et édition

| Message | Ce que ça veut dire | Que faire |
|---|---|---|
| *Another open session for this user was detected. It has now been invalidated.* | Le même compte s'est connecté ailleurs : cette session est fermée | Reconnectez-vous. Un compte par personne |
| *This marking scheme is currently being edited by …* | Une autre personne modifie le barème : vos champs sont grisés | Attendez, ou demandez-lui de quitter la page Marking Scheme |

## Import du barème

| Message ou symptôme | Ce que ça veut dire | Que faire |
|---|---|---|
| *Import is complete* | Import réussi | Vérifiez le total (100) et la variance WSOS |
| *Are you sure you want to import a marking scheme…? Any existing marking scheme will be erased.* | Confirmation : tout le barème actuel sera remplacé | Faites un **Export** de sauvegarde avant de cliquer sur OK |
| L'import ne fait rien | Le barème était en cours d'édition par quelqu'un d'autre, ou le fichier n'a pas été sélectionné | Rechargez la page, resélectionnez le fichier, recommencez |
| Variance WSOS très élevée après import | Des aspects n'ont pas de section WSOS (colonne I) | [[wsos]] |

## Calculs

| Message | Ce que ça veut dire | Que faire |
|---|---|---|
| *Target value missing from calculation* | Le calcul utilise le Requirement comme cible, mais celui-ci est vide ou n'est pas un nombre (« 300mm +- 15mm ») | Mettez un nombre seul dans le Requirement, ou saisissez une *Target Value* |
| *Value should be in range from 0 to N* | Number Completed : valeur hors de 0…Number Possible | Corrigez la valeur ou le Number Possible |
| Les notes comparatives ne s'affichent pas | Percent / Stepped : au moins une valeur manque ou n'est pas un nombre | Saisissez **toutes** les valeurs ; No Attempt pour un non-réalisé |
| Une valeur sous la cible donne 0 (Ranged Score) | Un signe moins a été saisi dans *− Diff* | Saisissez des écarts **positifs** ([[calc-ranged-score]]) |

## Planning et équipes

| Message | Ce que ça veut dire | Que faire |
|---|---|---|
| *The marking supervisor cannot also be part of the marking team* | La personne choisie comme superviseur est déjà jurée du sous-critère | Choisissez un autre superviseur |
| Bouton **Edit** grisé dans Marking Schedule | Il ne sert qu'avec *Per Competitor* ou *Per Competitor Group* | Choisissez une de ces options d'abord |

## Feuilles de notation

| Message | Ce que ça veut dire | Que faire |
|---|---|---|
| *Please select a marking form type* | Aucun type choisi | Choisissez un *Form Type* |
| *Please select a day* | Ce formulaire concerne un jour précis | Choisissez le jour |
| *This form cannot be generated when there are no Competitors for this skill* | Aucun compétiteur inscrit | Demandez l'inscription au CIS Master |
| *Cannot create the selected type of marking form for this Skill because the marking scheme has not been locked* | Ce document exige un barème verrouillé | [[lock-marking-scheme]] |
| Grand filigrane **Draft** | Barème non verrouillé | Normal pour une relecture |

## Notes

| Message | Ce que ça veut dire | Que faire |
|---|---|---|
| *There are no Competitors registered for this skill* | Aucun compétiteur dans le métier | CIS Master |
| *There are no invalid scores for the current filter settings* | Aucun écart Judgement > 1 point | Tout va bien |

> [!TIP] Toujours bloqué ?
> Notez le message exact et l'heure (historique des messages), faites une capture d'écran et écrivez à [cis@cofom.org](mailto:cis@cofom.org).`
    },
    en: {
      title: 'CIS messages explained', short: 'CIS messages',
      summary: 'Every message met during testing, what it means and how to get out of it.',
      objectives: ['Understand an error message', 'Find the fix without waiting for help'],
      quick: ['History: **list** icon at the top right', 'Search the message with ++Ctrl++ + ++F++ on this page'],
      body: `Messages appear at the top right then disappear. To read them again: the **list icon** at the far right of the menu bar ([[se-connecter]]). Tip: copy a few words of the message and search them on this page with ++Ctrl++ + ++F++.

## Login and editing

| Message | Meaning | What to do |
|---|---|---|
| *Another open session for this user was detected. It has now been invalidated.* | The same account logged in elsewhere: this session is closed | Log in again. One account per person |
| *This marking scheme is currently being edited by …* | Someone else is editing the marking scheme: your fields are greyed out | Wait, or ask them to leave the Marking Scheme page |

## Marking scheme import

| Message or symptom | Meaning | What to do |
|---|---|---|
| *Import is complete* | Import succeeded | Check the total (100) and WSOS variance |
| *Are you sure you want to import a marking scheme…? Any existing marking scheme will be erased.* | Confirmation: the whole current scheme will be replaced | Make a backup **Export** before clicking OK |
| Import does nothing | The scheme was being edited by someone else, or no file was selected | Reload the page, select the file again, retry |
| Very high WSOS variance after import | Some aspects have no WSOS section (column I) | [[wsos]] |

## Calculations

| Message | Meaning | What to do |
|---|---|---|
| *Target value missing from calculation* | The calculation uses the Requirement as target, but it is empty or not a number (“300mm +- 15mm”) | Put a plain number in the Requirement, or enter a *Target Value* |
| *Value should be in range from 0 to N* | Number Completed: value outside 0…Number Possible | Fix the value or the Number Possible |
| Comparative marks don't show | Percent / Stepped: at least one value is missing or not a number | Enter **all** values; No Attempt if not attempted |
| A value below target gives 0 (Ranged Score) | A minus sign was typed in *− Diff* | Enter **positive** gaps ([[calc-ranged-score]]) |

## Schedule and teams

| Message | Meaning | What to do |
|---|---|---|
| *The marking supervisor cannot also be part of the marking team* | The person chosen as supervisor is already a juror on the sub-criterion | Choose another supervisor |
| **Edit** button greyed in Marking Schedule | It only works with *Per Competitor* or *Per Competitor Group* | Choose one of those options first |

## Marking forms

| Message | Meaning | What to do |
|---|---|---|
| *Please select a marking form type* | No type chosen | Choose a *Form Type* |
| *Please select a day* | This form is for a specific day | Choose the day |
| *This form cannot be generated when there are no Competitors for this skill* | No competitor registered | Ask the CIS Master to register them |
| *Cannot create the selected type of marking form for this Skill because the marking scheme has not been locked* | This document needs a locked scheme | [[lock-marking-scheme]] |
| Large **Draft** watermark | Scheme not locked | Normal for proofreading |

## Marks

| Message | Meaning | What to do |
|---|---|---|
| *There are no Competitors registered for this skill* | No competitor in the skill | CIS Master |
| *There are no invalid scores for the current filter settings* | No Judgement gap > 1 point | All good |

> [!TIP] Still stuck?
> Note the exact message and time (message history), take a screenshot and write to [cis@cofom.org](mailto:cis@cofom.org).`
    }
  });

  /* ------------------------------------------------------------------ */
  P({
    id: 'faq', category: 'aide', order: 2, level: 'beginner',
    tags: ['faq', 'questions', 'aide', 'comment', 'pourquoi'],
    fr: {
      title: 'Questions fréquentes', short: 'FAQ',
      summary: 'Les réponses courtes aux questions les plus posées par les Experts et les jurés.',
      objectives: ['Trouver une réponse rapide'],
      quick: ['Cliquez sur une question pour voir la réponse'],
      body: `:::details Je peux tester sans risque ?
Oui : la **base de formation** (*Base de Training / Formation CIS*, logo rouge « TEST ») sert à cela. Demandez un compte à [cis@cofom.org](mailto:cis@cofom.org).
:::

:::details Mon barème ne fait pas 100 points, que faire ?
Corrigez les **Max Mark** dans l'Excel (colonne K) et réimportez, ou modifiez les notes directement dans le CIS ([[marking-scheme]]). Le tableau de bord affiche *Marking Scheme Defined* en vert à 100.
:::

:::details Pourquoi mes champs sont-ils grisés ?
Quelqu'un d'autre modifie le barème (bandeau « *currently being edited by* »), ou le barème est **verrouillé**.
:::

:::details Je dois tout réimporter pour corriger une faute de frappe ?
Non. Tant que le barème n'est pas verrouillé, cliquez dans le champ sur la page **Marking Scheme** et corrigez : la sauvegarde est automatique.
:::

:::details Faut-il remplir le Requirement pour tous les aspects Measurement ?
Non. Il sert d'information pour les jurés et, si vous le souhaitez, de **cible** pour un calcul. Dans ce cas il doit contenir un **nombre seul**.
:::

:::details Quelle méthode de calcul choisir ?
Suivez le questionnaire de [[marking-types]], puis regardez les [[calc-exemples-metiers|exemples de votre métier]].
:::

:::details Mon calcul est-il juste ?
Testez-le dans le cadre **Test Calculation** de la fenêtre du CIS, ou dans le **simulateur** de la page de la méthode : il reproduit les calculs du CIS.
:::

:::details Un compétiteur n'a pas fait une tâche chronométrée : 0 ou No Attempt ?
**No Attempt**. Un 0 entre dans la comparaison et change la note des autres ([[calc-percent-comparison]]).
:::

:::details Deux jurés peuvent-ils utiliser le même compte ?
Non. Une deuxième connexion ferme la première session ; et les scores Judgement doivent être attribués à chaque juré.
:::

:::details L'interface est en anglais, je peux la mettre en français ?
Oui (menu à votre nom › **Preferences**), mais la traduction est partielle. Ce wiki suit l'interface anglaise.
:::

:::details Quel format choisir à l'export ?
**CIS 5.0** : c'est le seul qui contient l'onglet *Calculations*.
:::`
    },
    en: {
      title: 'Frequently asked questions', short: 'FAQ',
      summary: 'Short answers to the questions Experts and jurors ask most.',
      objectives: ['Find a quick answer'],
      quick: ['Click a question to see the answer'],
      body: `:::details Can I test safely?
Yes: the **training database** (*Base de Training / Formation CIS*, red “TEST” logo) is made for that. Ask for an account at [cis@cofom.org](mailto:cis@cofom.org).
:::

:::details My marking scheme doesn't total 100, what do I do?
Fix the **Max Marks** in Excel (column K) and re-import, or edit the marks directly in the CIS ([[marking-scheme]]). The dashboard shows *Marking Scheme Defined* in green at 100.
:::

:::details Why are my fields greyed out?
Someone else is editing the marking scheme (“*currently being edited by*” banner), or the scheme is **locked**.
:::

:::details Do I need to re-import everything to fix a typo?
No. As long as the scheme is not locked, click the field on the **Marking Scheme** page and fix it: saving is automatic.
:::

:::details Do all Measurement aspects need a Requirement?
No. It informs jurors and, if you wish, serves as a calculation **target**. In that case it must be a **plain number**.
:::

:::details Which calculation method should I choose?
Follow the questions in [[marking-types]], then look at the [[calc-exemples-metiers|examples for your skill]].
:::

:::details Is my calculation right?
Test it in the **Test Calculation** box of the CIS window, or in the **simulator** on the method page: it reproduces CIS calculations.
:::

:::details A competitor didn't do a timed task: 0 or No Attempt?
**No Attempt**. A 0 enters the comparison and changes the others' marks ([[calc-percent-comparison]]).
:::

:::details Can two jurors share an account?
No. A second login closes the first session; and Judgement scores must be attributed to each juror.
:::

:::details The interface is in English, can I switch to French?
Yes (menu with your name › **Preferences**), but the translation is partial. This wiki follows the English interface.
:::

:::details Which export format should I choose?
**CIS 5.0**: it is the only one with the *Calculations* sheet.
:::`
    }
  });
})();
