(() => {
 'use strict';
 const init = () => {
  const buttons = [...document.querySelectorAll('[data-route-select]')];
  const plans = [...document.querySelectorAll('.itinerary-plan')];
  buttons.forEach(button => button.addEventListener('click', () => {
   buttons.forEach(b => b.setAttribute('aria-pressed',String(b===button)));
   plans.forEach(plan => {const active=plan.dataset.route===button.dataset.routeSelect;plan.hidden=!active;plan.classList.remove('is-entering');if(active){requestAnimationFrame(()=>plan.classList.add('is-entering'));}});
  }));
  document.querySelectorAll('.day-diagram').forEach(diagram => diagram.addEventListener('toggle',event => {
   if(event.target.tagName==='DETAILS' && event.target.open) diagram.querySelectorAll('details').forEach(other=>{if(other!==event.target)other.open=false;});
  },true));
  const motion = document.querySelectorAll('.motion-section');
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.15});motion.forEach(node=>observer.observe(node));}
  // The existing motorcycle diagram is in a compact disclosure. Recalculate
  // its SVG road after opening; layout while hidden otherwise produces zero bounds.
  document.querySelector('.booking-visual')?.addEventListener('toggle',()=>window.dispatchEvent(new Event('resize')));
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
