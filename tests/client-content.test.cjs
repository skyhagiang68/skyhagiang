const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname,'..');
const data = JSON.parse(fs.readFileSync(path.join(root,'tours.json'),'utf8'));
assert.equal(data.tours.length,2);
assert.deepEqual(data.tours.map(t=>[t.durationDays,t.nights]),[[3,2],[4,3]]);
const sandbox={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'tour-data.js'),'utf8'),sandbox);
assert.equal(JSON.stringify(sandbox.window.SkyTours),JSON.stringify(data));
const files=['index.html','packages.html',...data.tours.map(t=>t.id+'.html')];
for(const file of files){
  const html=fs.readFileSync(path.join(root,file),'utf8');
  assert.equal((html.match(/<h1[\s>]/g)||[]).length,1,`${file}: one H1`);
  assert.equal((html.match(/<title>/g)||[]).length,1,`${file}: one title`);
  assert.equal((html.match(/rel="canonical"/g)||[]).length,1,`${file}: one canonical`);
  assert.equal((html.match(/<main[\s>]/g)||[]).length,1,`${file}: one main`);
  assert.ok(html.includes('name="description"'),`${file}: meta description`);
  assert.ok(!/\$165|\$180|from \$390|Classic Loop|Private Escape|GÓI DEMO|per person/.test(html),`${file}: no demo products or invented prices`);
  const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length,`${file}: unique IDs`);
  for(const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){
    const schema=JSON.parse(match[1]);
    assert.equal(schema['@context'],'https://schema.org');
    assert.ok(!/aggregateRating|reviewCount|priceCurrency|"offers"/.test(match[1]),'no fabricated commercial schema');
  }
  for(const match of html.matchAll(/(?:href|src)="([^"?#]+)(?:\?[^"#]*)?(?:#[^"]*)?"/g)){
    const ref=match[1].replaceAll('&amp;','&');
    if(/^(https?:|mailto:|data:|\/\/)/.test(ref)) continue;
    assert.ok(fs.existsSync(path.join(root,ref)),`${file}: missing ${ref}`);
  }
  for(const match of html.matchAll(/href="#([^"#]+)"/g)) assert.ok(ids.includes(match[1]),`${file}: missing anchor ${match[1]}`);
}
const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
assert.equal((home.match(/class="package-card"/g)||[]).length,2);
assert.ok(home.indexOf('id="packages"')<home.indexOf('id="story"'));
if(data.contact.demo){
  assert.ok(!/84948242421|sky@traverl\.com/.test(home));
  assert.ok(home.includes('hello@example.com'));
  assert.ok(home.includes('Demo form'));
}
for(const t of data.tours){
  assert.equal(t.itinerary.length,t.durationDays);
  assert.equal(t.price,'Request a quote');
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
assert.ok(!interactions.includes('loopClone'),'no duplicated products');
assert.ok(!interactions.includes('replaceChildren'),'static cards remain available without JS');
assert.ok(fs.readFileSync(path.join(root,'client-tours.css'),'utf8').includes('prefers-reduced-motion'));
process.stdout.write('Client content: 2 tours, 4 crawlable pages, metadata, schema, internal links, dates and motion safeguards PASS.\n');
