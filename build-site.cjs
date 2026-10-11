// Generate crawlable tour pages and homepage fragments from one editorial source.
// No fabricated reviews, availability or service inclusions are added to schema.
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const data = JSON.parse(fs.readFileSync(path.join(root, 'tours.json'), 'utf8'));
const esc = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const polish = content => String(content)
  .replaceAll('Illustrative landscape · not a customer-tour photograph', 'Ha Giang landscape · Route atmosphere')
  .replaceAll('Illustrative northern landscape; not a photograph of a specific itinerary stop.', 'Ha Giang landscape · Route atmosphere')
  .replaceAll('illustrative landscape rather than a stop-specific photograph', 'mountain scenery along a Ha Giang route')
  .replaceAll('illustrative image rather than a specific itinerary stop', 'mountain scenery in Ha Giang')
  .replaceAll('Illustrative mountain-valley artwork for a private Ha Giang journey, not a tour photograph', 'Mountain valley scenery for a private Ha Giang journey')
  .replaceAll('Landscape previews now. Verified trip photographs, films and guest stories as they become available.', 'Explore mountain scenery, local culture and the stories that shape a journey through Ha Giang.')
  .replaceAll('Browse illustrative previews and travel notes now; verified guest photos, films and reviews will be added when supplied and approved.', 'Explore landscapes, local culture and travel inspiration from the northern highlands.')
  .replaceAll('No verified tour video has been supplied yet. No sample film is presented as customer footage.', 'Follow the passes, valleys and village roads that make the Ha Giang Loop unforgettable.')
  .replaceAll('Real stories from the Ha Giang Loop.', 'Stories from the road.')
  .replaceAll('Tap any guest experience article below to read the full story, or watch our unscripted road films from Du Gia, Nho Que, Ma Pi Leng and Lung Cu.', 'Short stories, guest moments and route notes. Tap a card to read.')
  .replaceAll('12 real traveller stories from the passes, rivers &amp; villages', 'Stories from our journeys')
  .replaceAll('Each article focuses on one distinct moment from the loop with a single cover photograph. Click any card to open and read the full story.', 'One photo. One moment. Tap to read.')
  .replaceAll('Watch the passes, waterfalls &amp; homestay nights in motion', 'Short tour films')
  .replaceAll('From cliff jumping at Du Gia Waterfall and singing “Valerie” above the clouds to Easy Rider POV rides and drone flights over Tham Ma Pass.', 'Waterfalls, mountain roads and evenings with our guests.')
  .replaceAll('Verified guest reviews will appear here. We do not publish invented quotes, names or star ratings.', 'Discover the people, places and personal moments that make every route different.')
  .replaceAll('Demo · inactive', 'Contact our team')
  .replaceAll('Demo details · not active', 'Travel support available by request')
  .replaceAll('Demo contact details · replace with your official Gmail and WhatsApp before launch.', '')
  .replaceAll('Demo form · creates a draft only. No enquiry is sent and no booking is confirmed.', 'Prepare your enquiry below. Review the details before sending them to our travel team.')
  .replaceAll('Deposit amount and payment method are not yet published. This site takes no payments.', 'Your guide confirms the deposit amount, payment method and booking conditions before payment.')
  .replaceAll('This demonstration website does not take deposits.', 'The deposit amount, payment method and booking conditions are confirmed directly before payment.')
  .replaceAll('demo-contact-note', 'contact-note');
const write = (file, content) => {
  if (file.endsWith('.html')) content = polish(content);
  if (file.endsWith('.html') && process.env.PAGE_SHA) {
    content = content.replace(/(href|src)="([^"?]+\.(?:css|js))(?:\?[^\"]*)?"/g, (_,attribute,asset)=>`${attribute}="${asset}?v=${process.env.PAGE_SHA}"`);
  }
  fs.writeFileSync(path.join(root, file), content + '\n', 'utf8');
};
const url = file => data.baseUrl + file;
const detailUrl = t => `${t.id}.html`;
const enquiryUrl = t => `index.html?tour=${encodeURIComponent(t.id)}&enquire=1#contact`;
const scriptJson = object => JSON.stringify(object).replace(/</g, '\\u003c');
const tripSchema = t => ({
  '@type':'TouristTrip', '@id':url(detailUrl(t))+'#trip', name:t.value,
  description:t.description, url:url(detailUrl(t)),
  ...(t.priceMin?{offers:{'@type':'Offer',url:url(enquiryUrl(t)),priceSpecification:{'@type':'PriceSpecification',minPrice:t.priceMin,maxPrice:t.priceMax,priceCurrency:'USD',description:'Per person, including Hanoi pickup and coach travel to Ha Giang City. Exact price and other services confirmed in writing.'}}}:{}),
  ...(t.itinerary.length?{itinerary:{'@type':'ItemList', numberOfItems:t.itinerary.length, itemListElement:t.itinerary.map(d => ({
    '@type':'ListItem', position:d.day, name:`Day ${d.day}: ${d.title}`, description:`${d.path}. ${d.text} ${d.stay}`
  }))}}:{})
});
const seo = (title, description, file, graph=[]) => `<title>${esc(data.brand)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta name="theme-color" content="#244f40">
<link rel="canonical" href="${url(file)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(data.brand)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url(file)}">
<meta property="og:image" content="${url('assets/bg-08.jpg')}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${url('assets/bg-08.jpg')}">
<script type="application/ld+json">${scriptJson({'@context':'https://schema.org','@graph':graph})}</script>`;
const faqs = () => `<section class="route-faq surface" aria-labelledby="faq-title"><div class="kicker">Before you go</div><h2 id="faq-title">Good questions. Clear answers.</h2><p class="faq-lead">Optional services are explained before they are added. Your local guide can also help shape the route around your group.</p>${data.faqs.map(f => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}<div class="faq-contact"><div><strong>Need a more detailed answer?</strong><span>Ask about pickup, optional services, pacing or a private route.</span></div><div class="faq-contact-actions"><a class="faq-contact-button faq-email" href="mailto:${esc(data.contact.email)}">Email us ↗</a><a class="faq-contact-button faq-whatsapp" href="https://wa.me/${data.contact.phone.replace(/\D/g,'')}" target="_blank" rel="noopener">WhatsApp ↗</a></div>${data.contact.demo?'<small>Demo contact details · replace with your official Gmail and WhatsApp before launch.</small>':''}</div></section>`;
const confirmation = () => `<aside class="quote-note"><h3>Confirmed before you book</h3><p>${esc(data.confirmation)}</p><p>${esc(data.routeNote)}</p></aside>`;
const sources = () => `<p class="destination-sources">Destination background: ${data.sources.map(s=>`<a href="${s.url}" target="_blank" rel="noopener">${esc(s.title)}</a>`).join(' · ')}. These describe destinations; they do not confirm tour inclusions.</p>`;
const card = (t,i) => `<article class="package-card" data-package-index="${i}">
  <img class="tour-card-image" src="assets/${t.image}" alt="${esc(t.imageAlt)}" width="800" height="533" loading="lazy" decoding="async">
  <div class="tour-card-body"><span class="tag">${esc(t.days)}</span><h3>${esc(t.title)}</h3><p>${esc(t.short)}</p><strong>${esc(t.price)}</strong><small>${t.kind==='private'?'Services in your tailored quote':'Hanoi pickup &amp; coach included'}</small><a class="tour-detail-trigger" href="${detailUrl(t)}">View itinerary <span aria-hidden="true">↗</span></a></div>
</article>`;
const sections = require('./site-sections.cjs')(data,{esc,card,faqs,enquiryUrl});
const previousHome = fs.readFileSync(path.join(root,'index.html'),'utf8');
const bookingMarkup = previousHome.match(/<section class="section booking booking-journey"[\s\S]*?<\/section>/)?.[0] || '';
if (!bookingMarkup) throw new Error('Preserved booking diagram is missing');
let head = previousHome.slice(0,previousHome.indexOf('</head>'));
head = head.replace(/<!-- seo:start -->[\s\S]*?<!-- seo:end -->/g,'');
head = head.replace(/<title>[\s\S]*?<\/title>/g,'');
head = head.replace(/<!-- client-assets:start -->[\s\S]*?<!-- client-assets:end -->/g,'');
head = head.replace(/<link rel="stylesheet" href="site-experience.css[^"]*">/g,'');
const homeGraph = [
  {'@type':'Organization','@id':url('')+'#organization',name:data.brand,url:url(''),logo:url('assets/logo.jpg')},
  {'@type':'WebSite','@id':url('')+'#website',name:data.brand,url:url(''),inLanguage:'en'},
  {'@type':'ItemList',name:'Ha Giang Loop packages',numberOfItems:data.tours.length,itemListElement:data.tours.map((t,i)=>({'@type':'ListItem',position:i+1,url:url(detailUrl(t)),name:t.value}))}
];
head += '<!-- seo:start -->'+seo('Ha Giang Loop Tours & Hanoi Pickup | Sky Ha Giang Loop','Ha Giang Loop: 3 days USD 200–226/person, 4 days USD 250–270/person, including Hanoi pickup and coach. Explore daily itineraries or request a private tour.','',homeGraph)+'<!-- seo:end -->';
head += '<!-- client-assets:start -->'+['tour-carousel.css','mobile-layout.css','travel-blog.css','booking-journey.css','client-tours.css','site-experience.css'].map(file=>`<link rel="stylesheet" href="${file}">`).join('')+'<script src="tour-data.js" defer></script><!-- client-assets:end --></head>';
write('index.html',head+sections.home(bookingMarkup));
write('tour-data.js',`// Generated by build-site.cjs from tours.json.\nwindow.SkyTours = ${scriptJson(data)};`);
const fonts = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&family=Playfair+Display:wght@600;700;800&display=swap" rel="stylesheet">';
const nav = `<nav class="route-nav"><a class="route-brand" href="index.html#home"><img src="assets/logo.jpg" width="42" height="42" alt="Sky Ha Giang Loop logo">${data.brand}</a><div class="route-links"><a href="index.html#home">Home</a><a href="packages.html">Tour Packages</a><a href="itinerary.html">Itinerary</a><a href="story.html">Our Story</a><a href="gallery.html">Gallery &amp; Reviews</a><a class="pill" href="contact.html">Booking &amp; Contact ↗</a></div></nav>`;
const footer = `<footer class="route-footer"><p>© 2026 ${data.brand} · Start and finish in Ha Giang</p><a href="index.html#home">Home</a> · <a href="packages.html">Tour Packages</a> · <a href="itinerary.html">Itinerary</a> · <a href="contact.html">Contact the team</a></footer>`;
const page = (title,description,file,body,graph=[],bodyClass='route-page') => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style id="background-base">html,body{background:#0a1d24!important}body::before,body::after{content:none!important}</style>
${seo(title,description,file,graph)}${fonts}
<link rel="stylesheet" href="nho-que-background.css"><link rel="stylesheet" href="travel-blog.css"><link rel="stylesheet" href="client-tours.css"><link rel="stylesheet" href="site-experience.css">
<script src="nature-background-v7.js" defer></script><script src="background-init.js" defer></script></head>
<body class="${bodyClass}"><a class="skip-link" href="#main-content">Skip to content</a>${nav}<main id="main-content" class="route-shell">${body}</main>${footer}<script src="tour-data.js" defer></script><script src="app.js" defer></script><script src="travel-blog.js" defer></script><script src="booking-journey.js" defer></script><script src="site-experience.js" defer></script></body></html>`;
const dayHtml = (t,d,i) => {
  const visual = sections.dayVisuals?.[t.id]?.[d.day];
  return `<details class="itinerary-day" ${i===0?'open':''}><summary><span>Day ${d.day}</span><h3>${esc(d.title)}</h3><b aria-hidden="true">+</b></summary><div class="itinerary-day-copy"><p class="day-route">${esc(d.path)}</p><p>${esc(d.text)}</p><p class="day-stay">${esc(d.stay)}</p>${visual?`<figure class="day-node-visual"><img src="${visual.src}" alt="${esc(visual.alt)}" width="800" height="533" loading="lazy"><figcaption>${esc(visual.caption)}</figcaption></figure>`:''}</div></details>`;
};
for (const t of data.tours) {
  const body = `<nav class="route-breadcrumb" aria-label="Breadcrumb"><a href="index.html">Home</a><span> / </span><a href="packages.html">Tours</a><span> / ${esc(t.days)}</span></nav>
<header class="route-hero surface"><div><div class="kicker">Start &amp; finish · Ha Giang</div><h1>${esc(t.title)}</h1><p>${esc(t.intro)}</p><div class="route-chips"><span>${esc(t.days)}</span><span>Du Gia · Dong Van · Yen Minh</span><span>${esc(t.price)}</span></div><p class="small-note">${esc(data.priceNote)}</p><a class="pill" href="${enquiryUrl(t)}">Request this itinerary ↗</a></div><figure><img src="assets/${t.image}" width="800" height="533" alt="${esc(t.imageAlt)}" fetchpriority="high"><figcaption>Illustrative northern landscape; not a photograph of a specific itinerary stop.</figcaption></figure></header>
<div class="route-layout"><section class="surface itinerary" aria-labelledby="itinerary-title"><div class="kicker">Day by day</div><h2 id="itinerary-title">Your proposed journey</h2><p class="route-disclaimer">${esc(data.routeNote)}</p>${t.kind==='private'?sections.privatePlan():t.itinerary.map((d,i)=>dayHtml(t,d,i)).join('\n')}${sections.transfer()}${sections.services()}</section>
<aside class="route-sidebar surface"><h2>Is this your route?</h2><p>${esc(t.fit)}</p><h3>Highlights</h3><ul>${t.highlights.map(h=>`<li>${esc(h)}</li>`).join('')}</ul><h3>Overnight plan</h3><p>${esc(t.overnights)}</p>${confirmation()}<a class="pill" href="${enquiryUrl(t)}">Request a quote ↗</a><a class="other-tour" href="${detailUrl(data.tours.find(o=>o.id!==t.id))}">Compare the ${esc(data.tours.find(o=>o.id!==t.id).days)} route →</a></aside></div>
${faqs()}${sources()}`;
  const breadcrumbs = {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:url('')},{'@type':'ListItem',position:2,name:'Tour itineraries',item:url('packages.html')},{'@type':'ListItem',position:3,name:t.value,item:url(detailUrl(t))}]};
  write(detailUrl(t),page(t.pageTitle,t.description,detailUrl(t),body,[tripSchema(t),breadcrumbs]));
}
const contentPages = [
  ['itinerary.html','Ha Giang Itinerary: Hanoi Pickup, 3 & 4 Day Routes | Sky Ha Giang Loop','Plan the Ha Giang Loop itinerary with Hanoi pickup, coach travel, daily stops, optional services and local guide advice.','itinerary',sections.pageSections.itinerary()],
  ['story.html','Our Story & Local Ha Giang Guides | Sky Ha Giang Loop','Learn how Sky Ha Giang Loop plans flexible mountain journeys with local guidance, clear quotes and practical travel support.','story',sections.pageSections.story()],
  ['gallery.html','Ha Giang Gallery, Travel Stories & Reviews | Sky Ha Giang Loop','Explore Ha Giang landscape previews, local culture stories and the place reserved for verified guest photos, films and reviews.','gallery',sections.pageSections.gallery()],
  ['contact.html','Book a Ha Giang Loop Tour | Contact Sky Ha Giang Loop','Ask about Ha Giang tours, Hanoi pickup, optional services, guide advice and a written quote for your group.','contact',sections.pageSections.contact(bookingMarkup)]
];
for (const [file,title,description,key,body] of contentPages) {
  const graph=[{'@type':'WebPage','@id':url(file)+'#webpage',name:title,url:url(file),description}];
  write(file,page(title,description,file,body,graph,'route-page standalone-page'));
}
const compare = `<header class="surface comparison-heading"><div class="kicker">Ha Giang · Northern Vietnam</div><h1>Classic or private?<br>Find your rhythm.</h1><p>Compare 3-day and 4-day loops or plan a private journey. Hanoi pickup and coach travel to Ha Giang can be arranged before the loop starts.</p></header><div class="comparison-cards">${data.tours.map((t,i)=>`<article class="surface compare-tour"><img src="assets/${t.image}" width="800" height="533" alt="${esc(t.imageAlt)}" loading="lazy"><div><span class="tag">${esc(t.days)}</span><h2>${esc(t.title)}</h2><p>${esc(t.short)}</p><p>${esc(t.fit)}</p><ul>${t.highlights.map(h=>`<li>${esc(h)}</li>`).join('')}</ul><p><b>${esc(t.price)}</b></p><a class="pill" href="${detailUrl(t)}">Read the full itinerary ↗</a></div></article>`).join('')}</div>
<section class="surface route-comparison"><h2>What changes with the extra day?</h2><div class="comparison-table-wrap"><table><caption>Ha Giang Loop itinerary comparison</caption><thead><tr><th scope="col">Plan</th><th scope="col">3 days / 2 nights</th><th scope="col">4 days / 3 nights</th></tr></thead><tbody><tr><th scope="row">Shared highlights</th><td colspan="2">Bac Sum · Quan Ba · Du Gia Waterfall · Nho Que · Ma Pi Leng · Tham Ma · weaving-village visit</td></tr><tr><th scope="row">Northern frontier</th><td>Not in this itinerary</td><td>Lung Cu Flag Tower &amp; a conditional Vietnam-side border viewpoint</td></tr><tr><th scope="row">Overnight bases</th><td>Du Gia · Dong Van</td><td>Du Gia · Dong Van · Yen Minh</td></tr><tr><th scope="row">Return to Ha Giang</th><td>Day 3 via Yen Minh</td><td>Day 4 from Yen Minh</td></tr><tr><th scope="row">Price &amp; services</th><td colspan="2">3 days: USD 200–226/person · 4 days: USD 250–270/person · Hanoi pickup &amp; coach included. Private: tailored quote. Other services confirmed in writing.</td></tr></tbody></table></div><p class="small-note">${esc(data.priceNote)}</p>${sections.transfer()}${sections.services()}${confirmation()}</section>${faqs()}${sources()}`;
write('packages.html',page('Ha Giang Loop Prices: 3 Days, 4 Days & Private | Sky Ha Giang Loop','Compare Ha Giang Loop: 3 days USD 200–226/person and 4 days USD 250–270/person, including Hanoi coach travel. Explore daily stops and private-tour quotes.','packages.html',compare,[{'@type':'ItemList',name:'Ha Giang Loop tours',numberOfItems:data.tours.length,itemListElement:data.tours.map((t,i)=>({'@type':'ListItem',position:i+1,name:t.value,url:url(detailUrl(t))}))}]));
const pages=['','packages.html',...data.tours.map(detailUrl)];
write('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['', 'packages.html','itinerary.html','story.html','gallery.html','contact.html',...data.tours.map(detailUrl)].map(p=>`<url><loc>${url(p)}</loc></url>`).join('')}</urlset>`);
write('robots.txt',`User-agent: *\nAllow: /\nSitemap: ${url('sitemap.xml')}`);
process.stdout.write('Built homepage, 3 tour pages, comparison, shared catalogue and sitemap.\n');
