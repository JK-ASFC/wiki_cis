/*
 * Tests de non-régression du simulateur : chaque cas a été mesuré dans le CIS v6
 * (training_604, métier 155 test_wiki, fenêtre « Test Calculation »).
 * Lancer : node tests/calc.test.js
 */
global.window = global;
require('../assets/js/calc.js');
const { compute } = window.CISCalc;
let fail = 0, n = 0;
function t(name, type, conf, values, expected) {
  n++;
  const got = compute(type, conf, values).map(m => m === null ? '' : m.toFixed(2));
  const ok = JSON.stringify(got) === JSON.stringify(expected);
  if (!ok) { fail++; console.log('ÉCHEC', name, '\n  attendu', expected.join(' | '), '\n  obtenu ', got.join(' | ')); }
}
const R = (r) => r; // lisibilité
// Pass/Fail
t('pf', 'passfail', { max: 1.5 }, ['pass', 'fail', 'pass', '', ''], ['1.50', '0.00', '1.50', '', '']);
// Number Completed
t('nc1', 'completed', { max: 2, possible: 8 }, [8, 4, 6, 0, 10], ['2.00', '1.00', '1.50', '0.00', '']);
t('nc2', 'completed', { max: 12, possible: 6 }, [6, 5, 3, 0, 4], ['12.00', '10.00', '6.00', '0.00', '8.00']);
// Choice
const ch = [['Conforme', 0], ['Défaut mineur', 0.5], ['Défaut majeur', 1], ['Non réalisé', 2]];
t('ch-num', 'choice', { max: 2, dtype: 'marks', choices: ch }, ['Conforme', 'Défaut mineur', 'Défaut majeur', 'Non réalisé', ''], ['2.00', '1.50', '1.00', '0.00', '']);
const chp = [['Conforme', 0], ['Défaut mineur', 25], ['Défaut majeur', 50], ['Absente', 100]];
t('ch-pct', 'choice', { max: 6.5, dtype: 'percent', choices: chp }, ['Conforme', 'Défaut mineur', 'Défaut majeur', 'Absente', 'Défaut mineur'], ['6.50', '4.88', '3.25', '0.00', '4.88']);
// Ranged Score
const rg = { max: 2, target: 800, dtype: 'marks' };
const V = [800, 803, 797, 805, 795];
t('rg1', 'ranged', { ...rg, ranges: [[0, 5, 0.5]] }, V, ['2.00', '1.50', '0.00', '1.50', '0.00']);
t('rg2', 'ranged', { ...rg, ranges: [[-5, 0, 0.5]] }, V, ['2.00', '0.00', '0.00', '0.00', '0.00']);
t('rg3', 'ranged', { ...rg, ranges: [[-5, 5, 0.5]] }, V, ['2.00', '1.50', '0.00', '1.50', '0.00']);
t('rg4', 'ranged', { ...rg, ranges: [[5, 0, 0.5]] }, V, ['2.00', '0.00', '1.50', '0.00', '1.50']);
t('rg5', 'ranged', { ...rg, ranges: [[795, 805, 0.5]] }, V, ['2.00', '1.50', '1.50', '1.50', '1.50']);
t('rg6 ordre', 'ranged', { ...rg, ranges: [[10, 10, 0.5], [5, 5, 0]] }, [803, 808, 812, 800, 797], ['1.50', '1.50', '0.00', '2.00', '1.50']);
t('rg7 pct', 'ranged', { max: 2, target: 800, dtype: 'percent', ranges: [[5, 5, 0], [10, 10, 25], [15, 15, 50]] }, [803, 808, 812, 816, 791], ['2.00', '1.50', '1.00', '0.00', '1.50']);
t('rg8', 'ranged', { ...rg, ranges: [[5, 5, 0], [10, 10, 0.5], [15, 15, 1]] }, [800, 805, 807, 812, 820], ['2.00', '2.00', '1.50', '1.00', '0.00']);
t('rg9 bornes', 'ranged', { ...rg, ranges: [[0, 0, 0], [5, 5, 0.5]] }, [800, 800.5, 804.99, 805, 805.01], ['2.00', '1.50', '1.50', '1.50', '0.00']);
t('rg10', 'ranged', { max: 1.5, target: 800, dtype: 'marks', ranges: [[-5, 5, 0], [-10, 10, 0.5], [-15, 15, 1]] }, [800, 805, 807, 812, 820], ['1.50', '1.50', '1.00', '0.50', '0.00']);
t('rg11', 'ranged', { max: 1.5, target: 800, dtype: 'marks', ranges: [[5, 5, 0], [10, 10, 0.5], [15, 15, 1]] }, [800, 804, 808, 813, 790], ['1.50', '1.50', '1.00', '0.50', '1.00']);
// Regular Difference Deduction
const rd = { max: 2, target: 800, diffType: 'unit', difference: 5, dtype: 'marks', deduction: 0.5 };
t('rd1', 'regular', rd, [800, 803, 805, 807, 810], ['2.00', '2.00', '1.50', '1.50', '1.00']);
t('rd2', 'regular', rd, [797, 795, 794, 790, 830], ['2.00', '1.50', '1.50', '1.00', '0.00']);
t('rd3', 'regular', rd, [804.9, 805.1, 809.99, 815, 820], ['2.00', '1.50', '1.50', '0.50', '0.00']);
t('rd4 pct', 'regular', { ...rd, diffType: 'percent', difference: 1 }, [800, 804, 808, 812, 790], ['2.00', '2.00', '1.50', '1.50', '1.50']);
t('rd5 ded%', 'regular', { ...rd, dtype: 'percent', deduction: 10 }, [800, 805, 810, 825, 851], ['2.00', '1.80', '1.60', '1.00', '0.00']);
t('rd6', 'regular', { max: 0.5, target: 100, diffType: 'unit', difference: 5, dtype: 'marks', deduction: 0.25 }, [100, 104, 105, 111, 80], ['0.50', '0.50', '0.25', '0.00', '0.00']);
// Percent Score Comparison
const P = (best, min, max_value) => ({ max: 2, best, min, max_value });
t('ps1', 'percent', P('lowest', '', ''), [30, 50, 60, 90, 45], ['2.00', '1.33', '1.00', '0.00', '1.50']);
t('ps2', 'percent', P('lowest', '', 60), [30, 50, 60, 90, 45], ['2.00', '0.67', '0.00', '0.00', '1.00']);
t('ps3', 'percent', P('highest', '', ''), [30, 25, 20, 15, 22], ['2.00', '1.33', '0.67', '0.00', '0.93']);
t('ps4', 'percent', P('highest', 20, ''), [30, 25, 20, 15, 22], ['2.00', '1.00', '0.00', '0.00', '0.40']);
t('ps5 zéro', 'percent', P('highest', '', ''), [30, 25, 20, 15, 0], ['2.00', '1.67', '1.33', '1.00', '0.00']);
t('ps6', 'percent', P('lowest', '', ''), [30, 50, 60, 90, 0], ['1.33', '0.89', '0.67', '0.00', '2.00']);
t('ps7', 'percent', P('lowest', 40, ''), [30, 50, 60, 90, 45], ['2.00', '1.60', '1.20', '0.00', '1.80']);
t('ps8', 'percent', P('highest', '', 28), [30, 25, 20, 15, 22], ['2.00', '1.54', '0.77', '0.00', '1.08']);
t('ps9 borne non atteinte', 'percent', P('highest', '', 40), [30, 25, 15, 20, 22], ['2.00', '1.33', '0.00', '0.67', '0.93']);
t('ps10', 'percent', P('lowest', 10, ''), [30, 50, 60, 90, 45], ['2.00', '1.33', '1.00', '0.00', '1.50']);
t('ps11', 'percent', P('highest', 10, ''), [30, 25, 15, 20, 22], ['2.00', '1.33', '0.00', '0.67', '0.93']);
t('ps12', 'percent', P('lowest', '', 120), [30, 50, 60, 90, 45], ['2.00', '1.33', '1.00', '0.00', '1.50']);
t('ps13 égalité', 'percent', P('highest', '', ''), [30, 30, 30, 30, 30], ['2.00', '2.00', '2.00', '2.00', '2.00']);
t('ps14 vide', 'percent', P('lowest', '', ''), [30, 50, 90, '', 60], ['', '', '', '', '']);
t('ps15 NA', 'percent', P('lowest', '', ''), [30, 50, 90, 'NA', 60], ['', '', '', '', '']);
t('ps16', 'percent', { max: 9.5, best: 'lowest', min: 50, max_value: '' }, [40, 50, 80, 120, 200], ['9.50', '9.50', '7.60', '5.07', '0.00']);
// Stepped Score Comparison
const S = (best, basis, interval, deduction, proportional) => ({ max: 2, best, basis, interval, deduction, proportional });
const H = [1700, 1637, 1587, 1498, 1650];
t('ss1', 'stepped', S('highest', 'value', 50, 0.5, false), H, ['2.00', '1.50', '1.00', '0.00', '1.50']);
t('ss2', 'stepped', S('highest', 'value', 50, 0.5, true), H, ['2.00', '1.37', '0.87', '0.00', '1.50']);
t('ss3', 'stepped', S('highest', 'percent', 10, 0.5, false), H, ['2.00', '2.00', '2.00', '1.50', '2.00']);
t('ss4', 'stepped', S('highest', 'percent', 10, 0.5, true), H, ['2.00', '1.81', '1.67', '1.41', '1.85']);
t('ss5', 'stepped', S('lowest', 'value', 10, 0.5, false), [120, 125, 130, 141, 160], ['2.00', '2.00', '1.50', '1.00', '0.00']);
t('ss6', 'stepped', S('lowest', 'value', 10, 0.5, true), [120, 125, 130, 141, 160], ['2.00', '1.75', '1.50', '0.95', '0.00']);
t('ss7', 'stepped', S('lowest', 'percent', 10, 0.5, false), [120, 125, 132, 145, 200], ['2.00', '2.00', '1.50', '1.00', '0.00']);
t('ss8', 'stepped', { max: 15, best: 'highest', basis: 'value', interval: 50, deduction: 1, proportional: false }, [1200, 1180, 1130, 1020, 900], ['15.00', '15.00', '14.00', '12.00', '9.00']);
console.log(fail ? `${fail}/${n} cas en échec` : `OK : ${n} cas conformes au CIS`);
process.exit(fail ? 1 : 0);
