(() => {
  'use strict';
  const init = () => {
    const catalogue = window.SkyTours;
    const section = document.querySelector('.packages');
    const grid = section?.querySelector('.package-grid');
    if (!catalogue || !grid || section.dataset.tourReady) return;
    section.dataset.tourReady = 'true';
    const cards = [...grid.querySelectorAll('.package-card')];
    if (cards.length !== catalogue.tours.length) return;
    const select = document.querySelector('#package');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const carousel = document.createElement('div');
    carousel.className = 'package-carousel';
    grid.before(carousel);
    carousel.append(grid);
    const controls = document.createElement('div');
    controls.className = 'tour-arrows';
    controls.innerHTML = '<button class="tour-arrow" type="button" aria-label="Previous itinerary">←</button><button class="tour-arrow" type="button" aria-label="Next itinerary">→</button>';
    carousel.append(controls);
    grid.setAttribute('aria-label', 'Ha Giang Loop itineraries; swipe horizontally or scroll the page vertically');
    const modal = document.createElement('div');
    modal.className = 'tour-detail-overlay';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = '<section class="tour-detail-panel" role="dialog" aria-modal="true" aria-labelledby="tour-detail-title" tabindex="-1"><button class="tour-detail-close" type="button" aria-label="Close itinerary">×</button><div class="tour-detail-content"></div></section>';
    document.body.append(modal);
    const panel = modal.querySelector('.tour-detail-panel');
    const content = modal.querySelector('.tour-detail-content');
    const escape = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    let trigger = null;
    let inertState = [];
    const background = () => [...document.querySelectorAll('body > nav, body > header, body > main, body > footer, .contact-float')];
    function openDetail(item, card, focusTarget) {
      trigger = focusTarget;
      const rect = card.getBoundingClientRect();
      panel.style.setProperty('--from-x', `${rect.left + rect.width / 2 - innerWidth / 2}px`);
      panel.style.setProperty('--from-y', `${Math.max(0, Math.min(innerHeight, rect.top + rect.height / 2)) - innerHeight / 2}px`);
      panel.style.setProperty('--from-scale', String(Math.max(.6, Math.min(.94, rect.width / Math.min(1120, innerWidth - 32)))));
      content.innerHTML = `<img class="tour-detail-image" src="assets/${item.image}" alt="${escape(item.imageAlt)}" width="800" height="533"><div class="tour-detail-copy"><span class="tag">${escape(item.days)}</span><p class="tour-detail-area">${escape(item.area)}</p><h2 id="tour-detail-title">${escape(item.title)}</h2><p class="tour-detail-intro">${escape(item.intro)}</p><p class="route-disclaimer">${escape(catalogue.routeNote)}</p><div class="tour-daily-plan">${item.kind==='private'?`<div class="private-plan"><h3>A journey made for your group</h3><p>${escape(item.fit)}</p><p>${escape(item.overnights)}</p><ul>${item.highlights.map(h=>`<li>${escape(h)}</li>`).join('')}</ul></div>`:item.itinerary.map((d,i)=>`<details class="itinerary-day" ${i===0?'open':''}><summary><span>Day ${d.day}</span><h3>${escape(d.title)}</h3><b aria-hidden="true">+</b></summary><div class="itinerary-day-copy"><p class="day-route">${escape(d.path)}</p><p>${escape(d.text)}</p><p class="day-stay">${escape(d.stay)}</p></div></details>`).join('')}</div><aside class="quote-note"><h3>Confirmed before you book</h3><p>${escape(catalogue.confirmation)}</p><p>${escape(catalogue.priceNote)}</p></aside><div class="tour-detail-footer"><strong>${escape(item.price)}</strong><button class="tour-book-button" type="button">Request this itinerary</button><a href="${item.id}.html">Full itinerary page ↗</a></div></div>`;
      panel.scrollTop = 0;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('tour-modal-open');
      inertState = background().map(el => [el,el.inert]);
      inertState.forEach(([el]) => {el.inert = true;});
      content.querySelector('.tour-book-button').addEventListener('click', () => {
        if (select) {select.value = item.value; select.dispatchEvent(new Event('change', {bubbles:true}));}
        closeDetail();
        document.querySelector('#contact')?.scrollIntoView({behavior:reduced.matches?'auto':'smooth',block:'start'});
        document.querySelector('#name')?.focus({preventScroll:true});
      });
      requestAnimationFrame(() => modal.querySelector('.tour-detail-close').focus({preventScroll:true}));
    }
    function closeDetail() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden','true');
      document.body.classList.remove('tour-modal-open');
      inertState.forEach(([el,original]) => {el.inert=original;});
      inertState=[];
      trigger?.focus({preventScroll:true});
    }
    modal.addEventListener('click',event => {
      if (event.target === modal || event.target.closest('.tour-detail-close')) closeDetail();
    });
    document.addEventListener('keydown',event => {
      if (event.key === 'Escape' && modal.classList.contains('is-open')) {event.preventDefault();closeDetail();}
    });
    modal.addEventListener('keydown',event => {
      if (event.key !== 'Tab') return;
      const focusable=[...panel.querySelectorAll('a[href],button:not([disabled]),summary')].filter(el=>el.getClientRects().length);
      const first=focusable[0], last=focusable[focusable.length-1];
      if (event.shiftKey && document.activeElement===first) {event.preventDefault();last.focus();}
      else if (!event.shiftKey && document.activeElement===last) {event.preventDefault();first.focus();}
    });
    cards.forEach((card,i) => {
      const link=card.querySelector('.tour-detail-trigger');
      card.tabIndex=0;
      card.setAttribute('role','group');
      card.setAttribute('aria-label',`${catalogue.tours[i].days} Ha Giang Loop itinerary`);
      card.addEventListener('click',event=>{if(!event.target.closest('a,button')) openDetail(catalogue.tours[i],card,link);});
      card.addEventListener('keydown',event=>{
        if(event.target===card&&(event.key==='Enter'||event.key===' ')){event.preventDefault();openDetail(catalogue.tours[i],card,link);}
      });
      link.setAttribute('aria-haspopup','dialog');
      link.setAttribute('aria-label',catalogue.tours[i].kind==='private'?'View private tour details':`View ${catalogue.tours[i].days} itinerary`);
      link.addEventListener('click',event => {
        if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey) return;
        event.preventDefault();openDetail(catalogue.tours[i],card,link);
      });
    });
    const targetLeft = card => {
      const rect=card.getBoundingClientRect(), track=grid.getBoundingClientRect();
      return Math.max(0,Math.min(grid.scrollWidth-grid.clientWidth,grid.scrollLeft+rect.left+rect.width/2-track.left-grid.clientWidth/2));
    };
    const nearestIndex = () => {
      const center=grid.getBoundingClientRect().left+grid.clientWidth/2;
      let nearest=0, distance=Infinity;
      cards.forEach((card,i)=>{const r=card.getBoundingClientRect(),d=Math.abs(r.left+r.width/2-center);if(d<distance){nearest=i;distance=d;}});
      return nearest;
    };
    const update = () => {
      const overflow=grid.scrollWidth>grid.clientWidth+2;
      controls.hidden=!overflow;
      const current=nearestIndex();
      cards.forEach((card,i)=>card.classList.toggle('is-current',overflow&&i===current));
    };
    const move = direction => {
      cancelAnimationFrame(momentum);
      grid.classList.remove('is-gliding');
      grid.style.removeProperty('scroll-snap-type');
      const next=(nearestIndex()+direction+cards.length)%cards.length;
      grid.scrollTo({left:targetLeft(cards[next]),behavior:reduced.matches?'auto':'smooth'});
      cards[next].classList.add('is-transitioning');
      setTimeout(()=>cards[next].classList.remove('is-transitioning'),850);
    };
    controls.querySelectorAll('button').forEach((button,i)=>button.addEventListener('click',()=>move(i?1:-1)));
    let frame=0,momentum=0;
    grid.addEventListener('scroll',()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(update);},{passive:true});
    if('ResizeObserver' in window) new ResizeObserver(update).observe(grid);
    else window.addEventListener('resize',update,{passive:true});
    requestAnimationFrame(update);
    // Native touch scrolling on both axes. No touch preventDefault or capture.
    // Prevent the browser's image/link ghost drag from cancelling mouse swipes.
    grid.addEventListener('dragstart',event=>event.preventDefault());
    let drag=null, suppressClick=false;
    grid.addEventListener('pointerdown',event=>{
      if(event.pointerType!=='mouse'||event.button!==0||event.target.closest('a,button')||controls.hidden) return;
      cancelAnimationFrame(momentum);
      drag={id:event.pointerId,x:event.clientX,left:grid.scrollLeft,lastX:event.clientX,lastTime:performance.now(),velocity:0};
      suppressClick=false;
    });
    grid.addEventListener('pointermove',event=>{
      if(!drag||event.pointerId!==drag.id) return;
      const delta=event.clientX-drag.x;
      if(Math.abs(delta)>6) {
        suppressClick=true;
        if(!grid.hasPointerCapture(drag.id)) grid.setPointerCapture(drag.id);
        grid.classList.add('is-dragging');grid.style.scrollSnapType='none';
        const now=performance.now();
        drag.velocity=(drag.lastX-event.clientX)/Math.max(1,now-drag.lastTime);
        grid.scrollLeft=drag.left-delta;drag.lastX=event.clientX;drag.lastTime=now;
      }
    });
    const endDrag = event => {
      if(!drag||event.pointerId!==drag.id) return;
      let velocity=suppressClick&&!reduced.matches?Math.max(-1.2,Math.min(1.2,drag.velocity)):0;
      if(grid.hasPointerCapture(drag.id)) grid.releasePointerCapture(drag.id);
      drag=null;grid.classList.remove('is-dragging');grid.classList.add('is-gliding');
      // Suppress only the synthetic click belonging to this drag, not a later
      // intentional click when a browser omits that synthetic event.
      setTimeout(()=>{suppressClick=false;},0);
      let previous=performance.now();
      const coast=now=>{
        const elapsed=Math.min(32,now-previous);previous=now;
        grid.scrollLeft+=velocity*elapsed;velocity*=Math.pow(.86,elapsed/16);
        if(Math.abs(velocity)>.04) momentum=requestAnimationFrame(coast);
        else {grid.classList.remove('is-gliding');grid.style.removeProperty('scroll-snap-type');grid.scrollTo({left:targetLeft(cards[nearestIndex()]),behavior:reduced.matches?'auto':'smooth'});}
      };
      momentum=requestAnimationFrame(coast);
    };
    grid.addEventListener('pointerup',endDrag);
    grid.addEventListener('pointercancel',endDrag);
    grid.addEventListener('click',event=>{if(suppressClick){event.preventDefault();event.stopPropagation();suppressClick=false;}},true);
    if ('IntersectionObserver' in window) {
      const reveal=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){section.classList.add('is-revealed');reveal.disconnect();}},{threshold:.12});
      reveal.observe(section);
      const visibleSections=new Set();
      const contactVisibility=new IntersectionObserver(entries=>{
        entries.forEach(entry=>{if(entry.isIntersecting)visibleSections.add(entry.target);else visibleSections.delete(entry.target);});
        document.body.classList.toggle('tour-enquiry-in-view',visibleSections.size>0);
      });
      contactVisibility.observe(section);
      const contact=document.querySelector('#contact');
      if(contact) contactVisibility.observe(contact);
    }
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);else init();
})();
