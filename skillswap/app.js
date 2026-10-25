(function () {
  const D = SkillSwapData, M = SkillSwapMatching, $ = id => document.getElementById(id);
  const done = [];
  const fmt = n => '₹' + n.toLocaleString('en-IN');
  const km = x => x.km == null ? '' : ` · ${x.km.toFixed(1)} km away`;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  D.skills.forEach(s => $('skill').add(new Option(s, s)));
  Object.keys(D.areas).forEach(a => $('area').add(new Option(a, a)));

  function render() {
    const q = { skill: $('skill').value, area: $('area').value };
    const gigs = M.matchGigs(D, q), mentors = M.matchMentors(D, q);
    $('gigs').innerHTML = gigs.length ? gigs.map(g => `
      <div class="item"><div><h3>${esc(g.title)}</h3><small>${esc(g.business)} · ${esc(g.area)}${km(g)} · ${g.hours} h · ${esc(g.skill)}</small></div>
      <div><span class="pay">${fmt(g.pay)}</span><button data-id="${g.id}" ${done.some(d => d.id === g.id) ? 'disabled' : ''}>${done.some(d => d.id === g.id) ? 'Accepted' : 'Accept gig'}</button></div></div>`).join('')
      : '<p class="empty">No gigs for this skill yet. Try another skill or area.</p>';
    $('mentorList').innerHTML = mentors.length ? mentors.map(m => `
      <div class="item"><div><h3>${esc(m.name)} (verified)</h3><small>${esc(m.skill)} · ${m.years} years · ${esc(m.area)}${km(m)}</small></div></div>`).join('')
      : '<p class="empty">No verified mentors for this skill yet.</p>';
  }

  $('gigs').addEventListener('click', e => {
    const id = e.target.dataset && e.target.dataset.id;
    const gig = D.gigs.find(g => g.id === id);
    if (!gig || done.some(d => d.id === id)) return;
    done.push(gig);
    $('earned').textContent = fmt(M.earnings(done));
    $('count').textContent = done.length;
    $('level').textContent = M.badge(done.length);
    $('done').innerHTML = done.map(g => `<li><b>${esc(g.title)}</b> for ${esc(g.business)}, ${fmt(g.pay)}</li>`).join('');
    render();
  });
  $('skill').addEventListener('change', render);
  $('area').addEventListener('change', render);
  render();
})();
