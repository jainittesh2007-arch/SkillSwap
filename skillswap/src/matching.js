(function (root, f) { typeof module === 'object' ? module.exports = f() : root.SkillSwapMatching = f(); })(this, function () {
  const rad = d => d * Math.PI / 180;

  // Haversine distance in km between two [lat, lng] points.
  function distanceKm(a, b) {
    const dLat = rad(b[0] - a[0]), dLng = rad(b[1] - a[1]);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(dLng / 2) ** 2;
    return 2 * 6371 * Math.asin(Math.sqrt(h));
  }

  // Filter by skill, then sort nearest-first when an area is given.
  function rank(items, areas, { skill, area } = {}) {
    return items
      .filter(i => !skill || i.skill === skill)
      .map(i => ({ ...i, km: area && areas[area] && areas[i.area] ? distanceKm(areas[area], areas[i.area]) : null }))
      .sort((x, y) => (x.km ?? 0) - (y.km ?? 0));
  }

  const matchGigs = (data, q) => rank(data.gigs, data.areas, q);
  const matchMentors = (data, q) => rank(data.mentors.filter(m => m.verified), data.areas, q);
  const earnings = done => done.reduce((s, g) => s + g.pay, 0);

  function badge(n) {
    if (n >= 5) return 'Job-ready';
    if (n >= 3) return 'Rising';
    if (n >= 1) return 'First gig';
    return 'Getting started';
  }
  return { distanceKm, matchGigs, matchMentors, earnings, badge };
});
