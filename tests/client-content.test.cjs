const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname,'..');
const data = JSON.parse(fs.readFileSync(path.join(root,'tours.json'),'utf8'));
assert.equal(data.tours.length,3);
const standard=data.tours.filter(t=>t.kind!=='private');
assert.deepEqual(standard.map(t=>[t.durationDays,t.nights]),[[3,2],[4,3]]);
assert.deepEqual(standard.map(t=>[t.priceMin,t.priceMax]),[[200,226],[250,270]]);
assert.equal(data.priceBasis,'per person');
assert.equal(data.transfer.includedInClassic,true);
assert.equal(data.tours[2].kind,'private');
assert.equal(data.tours[2].durationDays,null);
assert.deepEqual(data.media,{photos:[],videos:[],reviews:[]});
const sandbox={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'tour-data.js'),'utf8'),sandbox);
assert.equal(JSON.stringify(sandbox.window.SkyTours),JSON.stringify(data));
const files=['index.html','packages.html','itinerary.html','story.html','gallery.html','contact.html',...data.tours.map(t=>t.id+'.html')];
for(const file of files){
  const html=fs.readFileSync(path.join(root,file),'utf8');
  assert.equal((html.match(/<h1[\s>]/g)||[]).length,1,`${file}: one H1`);
  assert.equal((html.match(/<title>/g)||[]).length,1,`${file}: one title`);
  assert.equal((html.match(/rel="canonical"/g)||[]).length,1,`${file}: one canonical`);
  assert.equal((html.match(/<main[\s>]/g)||[]).length,1,`${file}: one main`);
  assert.ok(html.includes('name="description"'),`${file}: meta description`);
  assert.ok(!/\$165|\$180|from \$390|Classic Loop|Private Escape|GÓI DEMO/.test(html),`${file}: no demo products or invented prices`);
  if(['index.html','itinerary.html','story.html','gallery.html','contact.html'].includes(file)) assert.ok(html.includes('Tour Packages')&&html.includes('Itinerary')&&html.includes('Our Story')&&html.includes('Gallery &amp; Reviews')&&html.includes('Booking &amp; Contact'),`${file}: full child-page navigation`);
  const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length,`${file}: unique IDs`);
  for(const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){
    const schema=JSON.parse(match[1]);
    assert.equal(schema['@context'],'https://schema.org');
    assert.ok(!/aggregateRating|reviewCount|ratingValue/.test(match[1]),'no fabricated reviews or ratings');
    for(const trip of schema['@graph']||[schema]) if(trip['@type']==='TouristTrip'){
      const tour=data.tours.find(t=>t.id+'.html'===file);
      if(tour?.kind==='private') assert.ok(!trip.offers,'private prices are not invented');
      else if(tour){
        assert.equal(trip.offers.priceSpecification.minPrice,tour.priceMin);
        assert.equal(trip.offers.priceSpecification.maxPrice,tour.priceMax);
        assert.equal(trip.offers.priceSpecification.priceCurrency,'USD');
        assert.match(trip.offers.priceSpecification.description,/Per person, including Hanoi pickup and coach/);
      }
    }
  }
  for(const match of html.matchAll(/(?:href|src)="([^"?#]+)(?:\?[^"#]*)?(?:#[^"]*)?"/g)){
    const ref=match[1].replaceAll('&amp;','&');
    if(/^(https?:|mailto:|data:|\/\/)/.test(ref)) continue;
    assert.ok(fs.existsSync(path.join(root,ref)),`${file}: missing ${ref}`);
  }
  for(const match of html.matchAll(/href="#([^"#]+)"/g)) assert.ok(ids.includes(match[1]),`${file}: missing anchor ${match[1]}`);
}
const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
assert.equal((home.match(/class="package-card"/g)||[]).length,3);
assert.ok(home.indexOf('id="packages"')<home.indexOf('id="story"'));
const sections=['home','packages','itinerary','story','gallery','contact'];
sections.forEach(id=>assert.ok(home.includes(`id="${id}"`),`section ${id}`));
assert.ok(sections.every((id,i)=>!i||home.indexOf(`id="${sections[i-1]}"`)<home.indexOf(`id="${id}"`)));
assert.ok(home.includes('Book Your Tour'));
assert.ok(home.includes('Hanoi pickup'));
assert.ok(home.includes('Coach journey'));
assert.ok(home.includes('USD 200–226')&&home.includes('USD 250–270'));
assert.ok(home.includes('id="pickup"'));
assert.ok(home.includes('Hanoi pickup and coach travel are included'));
assert.ok(home.includes('faq-contact-button')&&home.includes('Optional services'));
assert.ok(!home.includes('Coach tickets are quoted separately'));
assert.ok(!home.includes('★★★★★'));
for(const page of ['itinerary.html','story.html','gallery.html','contact.html']) assert.ok(fs.existsSync(path.join(root,page)),`${page}: generated child page`);
if(data.contact.demo){
  assert.ok(!/84948242421|sky@traverl\.com/.test(home));
  assert.ok(home.includes('hello@example.com'));
  assert.ok(home.includes('Demo form'));
}
for(const t of standard){
  assert.equal(t.itinerary.length,t.durationDays);
  assert.ok(t.price.startsWith('USD '));
  assert.match(t.price,/\/ person$/);
  assert.deepEqual(t.itinerary.map(d=>d.day),Array.from({length:t.durationDays},(_,i)=>i+1));
  assert.ok(t.itinerary[0].stops.includes('Ha Giang'));
  assert.ok(t.itinerary.at(-1).stops.includes('Ha Giang'));
  assert.ok(/Du Gia Waterfall/.test(JSON.stringify(t.itinerary)));
  assert.ok(/Tham Ma Pass/.test(JSON.stringify(t.itinerary)));
  const page=fs.readFileSync(path.join(root,t.id+'.html'),'utf8');
  assert.equal((page.match(/class="itinerary-day"/g)||[]).length,t.durationDays);
  for(const d of t.itinerary) assert.ok(page.includes(d.title));
  assert.ok(fs.readFileSync(path.join(root,'sitemap.xml'),'utf8').includes(t.id+'.html'));
}
assert.ok(!JSON.stringify(data.tours[0].itinerary).includes('Lung Cu'));
assert.ok(JSON.stringify(data.tours[1].itinerary).includes('Lung Cu Flag Tower'));
const interactions=fs.readFileSync(path.join(root,'tour-interactions.js'),'utf8');
assert.ok(interactions.includes("event.pointerType!=='mouse'"),'touch remains native');
assert.ok(interactions.includes("grid.addEventListener('dragstart'"),'image ghost drag does not cancel mouse swipes');
assert.ok(!interactions.includes('loopClone'),'no duplicated products');
assert.ok(!interactions.includes('replaceChildren'),'static cards remain available without JS');
assert.ok(fs.readFileSync(path.join(root,'client-tours.css'),'utf8').includes('prefers-reduced-motion'));
const experienceCss=fs.readFileSync(path.join(root,'site-experience.css'),'utf8');
assert.match(experienceCss,/\.experience-home #discover \.travel-blog-head\{position:static/,'blog controls stay inside the blog');
assert.match(experienceCss,/main section\[id\]\{scroll-margin-top:16px/,'anchor offsets match the non-fixed header');
process.stdout.write('Client content: 3 packages, 9 crawlable pages, 6 sections, supplied prices, Hanoi transfer, metadata, links and motion safeguards PASS.\n');
