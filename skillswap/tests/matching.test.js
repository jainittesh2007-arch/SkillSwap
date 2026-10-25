const test = require('node:test');
const assert = require('node:assert');
const data = require('../src/data.js');
const m = require('../src/matching.js');

test('distance is zero for same point and symmetric', () => {
  const [a, b] = [data.areas['Adyar'], data.areas['Tambaram']];
  assert.strictEqual(m.distanceKm(a, a), 0);
  assert.ok(Math.abs(m.distanceKm(a, b) - m.distanceKm(b, a)) < 1e-9);
});
test('gigs are filtered by skill', () => {
  const r = m.matchGigs(data, { skill: 'Baking' });
  assert.ok(r.length > 0 && r.every(g => g.skill === 'Baking'));
});
test('nearest gig comes first', () => {
  const r = m.matchGigs(data, { area: 'Adyar' });
  assert.strictEqual(r[0].area, 'Adyar');
  for (let i = 1; i < r.length; i++) assert.ok(r[i].km >= r[i - 1].km);
});
test('only verified mentors are matched', () => {
  const r = m.matchMentors(data, {});
  assert.ok(r.length > 0 && r.every(x => x.verified));
});
test('earnings and badges', () => {
  assert.strictEqual(m.earnings([{ pay: 600 }, { pay: 900 }]), 1500);
  assert.deepStrictEqual([0, 1, 3, 5].map(m.badge), ['Getting started', 'First gig', 'Rising', 'Job-ready']);
});
test('sample-data.json matches src/data.js', () => {
  assert.deepStrictEqual(require('../data/sample-data.json'), data);
});
