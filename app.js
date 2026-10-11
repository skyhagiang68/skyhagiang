// Theme styles load in the head, before responsive overrides, for a stable cascade.
const nav = document.querySelector('.nav');
const menu = document.querySelector('#menu');
const links = document.querySelector('#navigation');
function closeMenu() {
  links.classList.remove('is-open');
  menu.setAttribute('aria-expanded', 'false');
}
menu.addEventListener('click', () => {
  const open = links.classList.toggle('is-open');
  menu.setAttribute('aria-expanded', String(open));
});
links.addEventListener('click', closeMenu);
document.querySelectorAll('.choose-package').forEach(button => {
  button.addEventListener('click', () => {
    const select = document.querySelector('#package');
    select.value = [...select.options].find(option => option.textContent.startsWith(button.dataset.package))?.value || '';
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => document.querySelector('#start').focus(), 600);
  });
});
document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
document.addEventListener('click', e => { if (!nav.contains(e.target)) closeMenu(); });
const updateNav = () => nav.classList.toggle('scrolled', scrollY > 40);
addEventListener('scroll', updateNav, { passive: true });
updateNav();
document.querySelectorAll('main img').forEach(img => { img.loading = 'lazy'; img.decoding = 'async'; });
document.querySelectorAll('img').forEach(img => {
  if (!img.alt) img.alt = img.closest('.brand') ? 'Sky Ha Giang Loop' : 'Mountain landscape';
  const fallback = () => { img.onerror = null; img.src = 'assets/page-background.jpg'; };
  img.onerror = fallback;
  if (img.complete && !img.naturalWidth) fallback();
});
const form = document.querySelector('#form');
const start = document.querySelector('#start');
const end = document.querySelector('#end');
const tourSelect = document.querySelector('#package');
const selectedTour = () => window.SkyTours?.tours.find(t => t.value === tourSelect.value);
const updateDates = () => {
  const tour = selectedTour();
  if (!tour || !start.value) return;
  const date = new Date(start.value + 'T12:00:00Z');
  date.setUTCDate(date.getUTCDate() + tour.durationDays - 1);
  end.value = date.toISOString().slice(0,10);
  end.min = start.value;
  end.setCustomValidity('');
};
start.addEventListener('change', updateDates);
tourSelect.addEventListener('change', updateDates);
const validateDates = () => end.setCustomValidity(end.value && start.value && end.value < start.value ? 'End date must not be before the start date.' : '');
end.addEventListener('change', validateDates);
const query = new URLSearchParams(location.search);
const requestedTour = window.SkyTours?.tours.find(t => t.id === query.get('tour'));
if (requestedTour) {
  tourSelect.value = requestedTour.value;
  if (query.get('enquire') === '1') addEventListener('pageshow', () => {
    requestAnimationFrame(() => document.querySelector('#contact').scrollIntoView({behavior:'auto'}));
  }, {once:true});
}
form.addEventListener('submit', e => {
  e.preventDefault();
  validateDates();
  if (!form.reportValidity()) return;
  const data = new FormData(e.currentTarget);
  const body = 'Name: ' + data.get('name') + '\nEmail: ' + data.get('email') + '\nPackage: ' + data.get('package') + '\nStart date: ' + data.get('start') + '\nEnd date: ' + data.get('end') + '\nTravellers: ' + data.get('guests') + '\n\n' + data.get('message');
  const status = document.querySelector('#status');
  if (window.SkyTours?.contact.demo) {
    const note = document.createElement('p');
    note.textContent = 'Demo draft ready. Nothing has been sent. Copy this enquiry for later.';
    const draft = document.createElement('textarea');
    draft.readOnly = true;
    draft.value = body;
    draft.rows = 6;
    draft.setAttribute('aria-label','Prepared enquiry draft');
    const copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'pill';
    copy.textContent = 'Copy enquiry';
    copy.addEventListener('click', async () => {
      try {await navigator.clipboard.writeText(body);copy.textContent='Copied';}
      catch {draft.focus();draft.select();copy.textContent='Select and copy the draft';}
    });
    status.replaceChildren(note, draft, copy);
    return;
  }
  const link = document.createElement('a');
  link.href = 'mailto:' + window.SkyTours.contact.email + '?subject=Ha%20Giang%20trip%20enquiry&body=' + encodeURIComponent(body);
  link.textContent = 'Open email draft';
  status.replaceChildren('Your draft is ready. Send it from your email app: ', link);
});
