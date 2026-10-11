// Generate crawlable tour pages and homepage fragments from one editorial source.
// No fake prices, reviews, availability or service inclusions are added to schema.
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const data = JSON.parse(fs.readFileSync(path.join(root, 'tours.json'), 'utf8'));
const esc = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const write = (file, content) => {
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
  itinerary:{'@type':'ItemList', numberOfItems:t.itinerary.length, itemListElement:t.itinerary.map(d => ({
    '@type':'ListItem', position:d.day, name:`Day ${d.day}: ${d.title}`, description:`${d.path}. ${d.text} ${d.stay}`
  }))}
});
const seo = (title, description, file, graph=[]) => `<title>${esc(title)}</title>
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
const faqs = () => `<section class="route-faq surface" aria-labelledby="faq-title"><div class="kicker">Before you go</div><h2 id="faq-title">Good questions. Clear answers.</h2>${data.faqs.map(f => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</section>`;
const confirmation = () => `<aside class="quote-note"><h3>Confirmed before you book</h3><p>${esc(data.confirmation)}</p><p>${esc(data.routeNote)}</p></aside>`;
const sources = () => `<p class="destination-sources">Destination background: ${data.sources.map(s=>`<a href="${s.url}" target="_blank" rel="noopener">${esc(s.title)}</a>`).join(' · ')}. These describe destinations; they do not confirm tour inclusions.</p>`;
const card = (t,i) => `<article class="package-card" data-package-index="${i}">
  <img class="tour-card-image" src="assets/${t.image}" alt="${esc(t.imageAlt)}" width="800" height="533" loading="lazy" decoding="async">
  <div class="tour-card-body"><span class="tag">${esc(t.days)}</span><h3>${esc(t.title)}</h3><p>${esc(t.short)}</p><strong>${esc(t.price)}</strong><a class="tour-detail-trigger" href="${detailUrl(t)}">View itinerary <span aria-hidden="true">↗</span></a></div>
</article>`;
const packageSection = `<section class="section packages wrap compact-collection" id="packages" aria-labelledby="packages-title">
<div class="head"><div><div class="kicker">Two routes. Your choice.</div><h2 id="packages-title">Find your Ha Giang Loop.</h2></div><p class="intro">3 days for the scenic core. 4 days to add Lung Cu and the northern frontier. Start and finish in Ha Giang.</p></div>
<div class="package-grid">${data.tours.map(card).join('\n')}</div>
<div class="tour-compare-link"><a href="packages.html">Compare both itineraries ↗</a><span>Tailored quote · No payment on this website</span></div></section>`;
const routeMap = `<section id="gallery" class="section wrap route-overview"><div class="surface"><div class="kicker">The loop at a glance</div><h2>One route. Different rhythms.</h2><ol class="route-map" aria-label="Main route, schematic rather than a geographic map"><li><b>Start</b><strong>Ha Giang</strong><span>Bac Sum · Quan Ba</span></li><li><b>01</b><strong>Du Gia</strong><span>Valley · Waterfall</span></li><li><b>02</b><strong>Dong Van</strong><span>Nho Que · Ma Pi Leng</span></li><li><b>Return</b><strong>Yen Minh</strong><span>Tham Ma · Village craft</span></li></ol><p class="route-map-note">The 4-day route adds Lung Cu on day 3. Both journeys return to Ha Giang. Stops shown are a route overview, not distances or travel-time estimates.</p></div></section>`;
let home = fs.readFileSync(path.join(root,'index.html'),'utf8');
if(!home.includes('class="skip-link"')) home=home.replace('<body>','<body><a class="skip-link" href="#main-content">Skip to content</a>');
// Idempotent fragments: running the build twice produces exactly the same pages.
home = home.replace(/<!-- seo:start -->[\s\S]*?<!-- seo:end -->\n?/g,'');
home = home.replace(/<title>[\s\S]*?<\/title>/,'');
const homeGraph = [
  {'@type':'Organization','@id':url('')+'#organization',name:data.brand,url:url(''),logo:url('assets/logo.jpg')},
  {'@type':'WebSite','@id':url('')+'#website',name:data.brand,url:url(''),inLanguage:'en'},
  {'@type':'ItemList',name:'Ha Giang Loop itineraries',numberOfItems:2,itemListElement:data.tours.map((t,i)=>({'@type':'ListItem',position:i+1,url:url(detailUrl(t)),name:t.value}))}
];
home = home.replace('</head>',`<!-- seo:start -->${seo('Ha Giang Loop Tours: 3 & 4 Day Itineraries | Sky Ha Giang Loop','Compare 3-day and 4-day Ha Giang Loop tours through Du Gia, Dong Van and Yen Minh. Explore Nho Que, Ma Pi Leng and Lung Cu, then request your quote.','',homeGraph)}<!-- seo:end -->\n</head>`);
home = home.replace(/<section id="tours"[\s\S]*?<\/section>/,'');
home = home.replace(/<section class="section packages wrap[^\"]*"[\s\S]*?<\/section>/,'');
home = home.replace(/<main(?: id="main-content")?>\s*/,`<main id="main-content">\n${packageSection}`);
home = home.replace(/<section id="gallery"[\s\S]*?<\/section>/,routeMap);
home = home.replace(/<script>\s*const tours=[\s\S]*?<\/script>/,'');
home = home.replace(/<h1>[\s\S]*?<\/h1>/,'<h1>Ha Giang Loop.<br><em>Your way.</em></h1>');
home = home.replace('Slow roads, cloud valleys and warm village stays. Discover Ha Giang with people who call these mountains home.','Two mountain journeys. Du Gia, Dong Van and Yen Minh, with waterfalls, river views and village craft along the way. Choose 3 or 4 days and plan the details with us.');
home = home.replace(/href="#tours"/g,'href="#packages"').replace('Explore the loop ↓','Choose your route ↓');
home = home.replace('Compare Classic Loop, private and SUV tours to find your pace.','Compare the 3-day and 4-day routes. Add Lung Cu with the longer itinerary.');
home = home.replace('We keep groups small, choose family-run homestays and leave space for the unexpected. The best memories are rarely on the itinerary.','Look beyond the next viewpoint: leave time for village craft, mountain valleys and conversations along the road. Discuss your group, transport and stays before booking.');
home = home.replace('Small groups, local stays and room to explore.','Village craft, mountain valleys and a route planned around you.');
home = home.replace(/<select id="package"[\s\S]*?<\/select>/,`<select id="package" name="package" required><option value="">Select your itinerary</option>${data.tours.map(t=>`<option value="${esc(t.value)}">${esc(t.value)}</option>`).join('')}</select>`);
home = home.replace('required rows="4" placeholder="Travel style or special requests"','rows="3" placeholder="Transport preference, room type or special requests"');
home = home.replace('Share your dates. We’ll plan the route.','Share your dates and preferences for a tailored quote.');
home = home.replace('Tell us your dates, group size and travel style. We’ll shape a route that leaves room for wonder.','Tell us your dates, group size and transport preferences. We’ll confirm the proposed route and service details in a written quote.');
home = home.replace(/<!-- client-faq:start -->[\s\S]*?<!-- client-faq:end -->/,'');
home = home.replace('</main>',`<!-- client-faq:start --><div class="section wrap">${faqs()}</div><!-- client-faq:end --></main>`);
home = home.replace('Local travel company creating thoughtful Ha Giang journeys with trusted guides, family stays and flexible routes.','Explore proposed 3-day and 4-day Ha Giang Loop itineraries. Confirm transport, stays and prices with the team before booking.');
home = home.replace('© 2026 Sky Travel. Demo information for route planning.','© 2026 Sky Ha Giang Loop. Itineraries confirmed before booking.');
home = home.replace('<h3>Policies</h3><p><a href="#contact">Booking policy</a><br><a href="#contact">Privacy policy</a><br><a href="#contact">Terms of travel</a></p>','<h3>Plan your route</h3><p><a href="ha-giang-loop-3-days.html">3-day itinerary</a><br><a href="ha-giang-loop-4-days.html">4-day itinerary</a><br><a href="#faq-title">Before you book</a></p>');
if (data.contact.demo) {
  home = home.replace('Call: +84 948 242 421<br>Email: sky@traverl.com',`Demo phone: ${data.contact.phone}<br>Demo email: ${data.contact.email}<br><small>Not active · for presentation only</small>`);
  home = home.replace('Prepare email ↗','Prepare enquiry ↗');
  home = home.replace(/<!-- demo-contact-note:start -->[\s\S]*?<!-- demo-contact-note:end -->/g,'');
  home = home.replace('<form class="form" id="form">','<form class="form" id="form"><!-- demo-contact-note:start --><p class="demo-contact-note contact-field-wide">Demo form · prepares a draft only. No enquiry is sent and no reservation is made.</p><!-- demo-contact-note:end -->');
  home = home.replace(/href="https:\/\/(?:wa\.me\/[^\"]*|m\.me\/[^\"]*|www\.instagram\.com\/|www\.youtube\.com\/)"/g,'href="#contact"');
  home = home.replace(/aria-label="(?:WhatsApp|Messenger|Instagram|YouTube)"/g,'aria-label="Demo contact — not connected"');
  home = home.replace('<h3>Follow us</h3>','<h3>Demo channels</h3>');
  home = home.replace('class="contact-float"','class="contact-float demo-contact"');
}
home = home.replace(/<!-- client-assets:start -->[\s\S]*?<!-- client-assets:end -->/g,'');
home = home.replace(/<!-- client-scripts:start -->[\s\S]*?<!-- client-scripts:end -->/g,'');
home = home.replace(/<link rel="stylesheet" href="client-tours.css[^\"]*">/g,'');
home = home.replace('</head>',`<!-- client-assets:start -->${['tour-carousel.css','mobile-layout.css','travel-blog.css','booking-journey.css','client-tours.css'].map(file=>`<link rel="stylesheet" href="${file}">`).join('')}<script src="tour-data.js" defer></script><!-- client-assets:end --></head>`);
home = home.replace('</body>',`<!-- client-scripts:start -->${['tour-interactions.js','travel-blog.js','booking-journey.js'].map(file=>`<script src="${file}"></script>`).join('')}<!-- client-scripts:end --></body>`);
// Remove generic gallery fallback imagery; the blog enhances this crawlable link list.
home = home.replace(/<div class="discover-grid reveal">[\s\S]*?<\/div><a class="pill discover-button"/,`<div class="discover-grid reveal"><article><h3>Ma Pi Leng &amp; Nho Que</h3><p>Explore the river and pass in both proposed itineraries.</p><a href="ha-giang-loop-3-days.html">See the 3-day itinerary</a></article><article><h3>Lung Cu &amp; village craft</h3><p>Discover what the longer route adds to the journey.</p><a href="ha-giang-loop-4-days.html">See the 4-day itinerary</a></article></div><a class="pill discover-button"`);
write('index.html',home.trim());
write('tour-data.js',`// Generated by build-site.cjs from tours.json.\nwindow.SkyTours = ${scriptJson(data)};`);
const fonts = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&family=Playfair+Display:wght@600;700;800&display=swap" rel="stylesheet">';
const nav = `<nav class="route-nav"><a class="route-brand" href="index.html"><img src="assets/logo.jpg" width="42" height="42" alt="Sky Ha Giang Loop logo">${data.brand}</a><a href="packages.html">All tours</a><a class="pill" href="index.html#contact">Plan a trip ↗</a></nav>`;
const footer = `<footer class="route-footer"><p>© 2026 ${data.brand} · Start and finish in Ha Giang</p><a href="index.html">Home</a> · <a href="packages.html">Compare itineraries</a> · <a href="index.html#contact">Contact the team</a></footer>`;
const page = (title,description,file,body,graph=[]) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style id="background-base">html,body{background:#0a1d24!important}body::before,body::after{content:none!important}</style>
${seo(title,description,file,graph)}${fonts}
<link rel="stylesheet" href="nho-que-background.css"><link rel="stylesheet" href="client-tours.css">
<script src="nature-background-v7.js" defer></script><script src="background-init.js" defer></script></head>
<body class="route-page"><a class="skip-link" href="#main-content">Skip to content</a>${nav}<main id="main-content" class="route-shell">${body}</main>${footer}</body></html>`;
const dayHtml = (d,i) => `<details class="itinerary-day" ${i===0?'open':''}><summary><span>Day ${d.day}</span><h3>${esc(d.title)}</h3><b aria-hidden="true">+</b></summary><div class="itinerary-day-copy"><p class="day-route">${esc(d.path)}</p><p>${esc(d.text)}</p><p class="day-stay">${esc(d.stay)}</p></div></details>`;
for (const t of data.tours) {
  const body = `<nav class="route-breadcrumb" aria-label="Breadcrumb"><a href="index.html">Home</a><span> / </span><a href="packages.html">Tours</a><span> / ${esc(t.days)}</span></nav>
<header class="route-hero surface"><div><div class="kicker">Start &amp; finish · Ha Giang</div><h1>${esc(t.title)}</h1><p>${esc(t.intro)}</p><div class="route-chips"><span>${esc(t.days)}</span><span>Du Gia · Dong Van · Yen Minh</span><span>${esc(t.price)}</span></div><a class="pill" href="${enquiryUrl(t)}">Request this itinerary ↗</a></div><figure><img src="assets/${t.image}" width="800" height="533" alt="${esc(t.imageAlt)}" fetchpriority="high"><figcaption>Illustrative northern landscape; not a photograph of a specific itinerary stop.</figcaption></figure></header>
<div class="route-layout"><section class="surface itinerary" aria-labelledby="itinerary-title"><div class="kicker">Day by day</div><h2 id="itinerary-title">Your proposed journey</h2><p class="route-disclaimer">${esc(data.routeNote)}</p>${t.itinerary.map(dayHtml).join('\n')}</section>
<aside class="route-sidebar surface"><h2>Is this your route?</h2><p>${esc(t.fit)}</p><h3>Highlights</h3><ul>${t.highlights.map(h=>`<li>${esc(h)}</li>`).join('')}</ul><h3>Overnight plan</h3><p>${esc(t.overnights)}</p>${confirmation()}<a class="pill" href="${enquiryUrl(t)}">Request a quote ↗</a><a class="other-tour" href="${detailUrl(data.tours.find(o=>o.id!==t.id))}">Compare the ${t.durationDays===3?'4':'3'}-day route →</a></aside></div>
${faqs()}${sources()}`;
  const breadcrumbs = {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:url('')},{'@type':'ListItem',position:2,name:'Tour itineraries',item:url('packages.html')},{'@type':'ListItem',position:3,name:t.value,item:url(detailUrl(t))}]};
  write(detailUrl(t),page(t.pageTitle,t.description,detailUrl(t),body,[tripSchema(t),breadcrumbs]));
}
const compare = `<header class="surface comparison-heading"><div class="kicker">Ha Giang · Northern Vietnam</div><h1>3 or 4 days?<br>Find your rhythm.</h1><p>Two versions of the requested Ha Giang → Du Gia → Dong Van → Yen Minh loop. Compare the time, overnight plan and extra stops before choosing.</p></header><div class="comparison-cards">${data.tours.map((t,i)=>`<article class="surface compare-tour"><img src="assets/${t.image}" width="800" height="533" alt="${esc(t.imageAlt)}" loading="lazy"><div><span class="tag">${esc(t.days)}</span><h2>${esc(t.title)}</h2><p>${esc(t.short)}</p><p>${esc(t.fit)}</p><ul>${t.highlights.map(h=>`<li>${esc(h)}</li>`).join('')}</ul><p><b>${esc(t.price)}</b></p><a class="pill" href="${detailUrl(t)}">Read the full itinerary ↗</a></div></article>`).join('')}</div>
<section class="surface route-comparison"><h2>What changes with the extra day?</h2><div class="comparison-table-wrap"><table><caption>Ha Giang Loop itinerary comparison</caption><thead><tr><th scope="col">Plan</th><th scope="col">3 days / 2 nights</th><th scope="col">4 days / 3 nights</th></tr></thead><tbody><tr><th scope="row">Shared highlights</th><td colspan="2">Bac Sum · Quan Ba · Du Gia Waterfall · Nho Que · Ma Pi Leng · Tham Ma · weaving-village visit</td></tr><tr><th scope="row">Northern frontier</th><td>Not in this itinerary</td><td>Lung Cu Flag Tower &amp; a conditional Vietnam-side border viewpoint</td></tr><tr><th scope="row">Overnight bases</th><td>Du Gia · Dong Van</td><td>Du Gia · Dong Van · Yen Minh</td></tr><tr><th scope="row">Return to Ha Giang</th><td>Day 3 via Yen Minh</td><td>Day 4 from Yen Minh</td></tr><tr><th scope="row">Price &amp; services</th><td colspan="2">Tailored written quote; no unconfirmed services or prices advertised</td></tr></tbody></table></div>${confirmation()}</section>${faqs()}${sources()}`;
write('packages.html',page('Ha Giang Loop: Compare 3 & 4 Day Tours | Sky Ha Giang Loop','Compare the 3-day and 4-day Ha Giang Loop itineraries: daily stops, overnight bases, Lung Cu extension and details to confirm before booking.','packages.html',compare,[{'@type':'ItemList',name:'Ha Giang Loop tours',numberOfItems:2,itemListElement:data.tours.map((t,i)=>({'@type':'ListItem',position:i+1,name:t.value,url:url(detailUrl(t))}))}]));
const pages=['','packages.html',...data.tours.map(detailUrl)];
write('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(p=>`<url><loc>${url(p)}</loc></url>`).join('')}</urlset>`);
write('robots.txt',`User-agent: *\nAllow: /\nSitemap: ${url('sitemap.xml')}`);
process.stdout.write('Built homepage, 2 tour pages, comparison, shared catalogue and sitemap.\n');
