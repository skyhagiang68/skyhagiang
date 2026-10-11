const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'nature-background-v7.js'), 'utf8');
const boot = fs.readFileSync(path.join(root, 'background-init.js'), 'utf8');

function harness(hasWebGL = true) {
  const frames = [], wrappers = [], errors = [];
  const counts = {webgl:0, fallback:0, overlay:0};
  const context2d = {drawImage() {counts.fallback++;}};
  const gl = new Proxy({}, {
    get(_, key) {
      if (/^[A-Z0-9_]+$/.test(key)) return 1;
      if (key==='drawArrays') return () => counts.webgl++;
      if (key==='getShaderParameter') return () => true;
      return () => ({});
    }
  });
  const document = {
    documentElement: {scrollHeight:5000},
    body: {prepend(element) {wrappers.push(element);}},
    createElement() {
      const classes = new Set();
      return {style:{},dataset:{},appendChild() {},classList:{add:name=>classes.add(name),contains:name=>classes.has(name)},
        getContext(type) {return type==='2d' ? context2d : hasWebGL ? gl : null;}};
    }
  };
  const window = {innerWidth:390,innerHeight:844,devicePixelRatio:1,scrollY:0,addEventListener() {},removeEventListener() {}};
  const images = [];
  class Image {constructor() {this.naturalWidth=2000;this.naturalHeight=4000;images.push(this);}}
  const scope = vm.createContext({window,document,Image,console:{error:message=>errors.push(message)},requestAnimationFrame:action=>frames.push(action)});
  vm.runInContext(source, scope);
  const bg = new window.NatureBackground({showLogo:false,zIndex:1});
  bg._renderOverlay = () => counts.overlay++;
  return {bg,counts,images,wrappers,errors,tick(time=1000) {frames.shift()(time);}};
}

for(const hasWebGL of [true, false]) {
  const test = harness(hasWebGL);
  test.tick(); test.tick(2000);
  assert.equal(test.wrappers.length, 1);
  assert.equal(test.bg.wrapper.dataset.state, 'loading');
  assert.equal(test.counts.webgl + test.counts.fallback + test.counts.overlay, 0,
    'No placeholder scene or overlay is painted before panorama decoding');
  test.images[0].onload();
  assert.equal(test.bg.wrapper.classList.contains('is-ready'), false,
    'Decoded texture is not exposed until its first frame is drawn');
  test.tick(3000);
  assert.equal(test.bg.wrapper.dataset.state, 'ready');
  assert.equal(test.bg.wrapper.classList.contains('is-ready'), true);
  assert.equal(test.counts.overlay, 1);
  assert.equal(hasWebGL ? test.counts.webgl : test.counts.fallback, 1);
  test.tick(4000);
  assert.equal(test.counts.overlay, 2, 'Animation continues after reveal');
  test.bg.isDestroyed = true;
  test.tick(5000);
  assert.equal(test.counts.overlay, 2, 'Destroyed instances stop painting');
}
const failed = harness();
failed.images[0].onerror(); failed.tick();
assert.equal(failed.bg.wrapper.dataset.state, 'error');
assert.equal(failed.counts.webgl, 0, 'Decode failure never exposes the temporary texture');
assert.equal(failed.errors.length, 1, 'Decode failures are reported, not hidden');

let instances = 0;
const bootScope = vm.createContext({window:{innerWidth:390},NatureBackground:class {constructor() {instances++;}}});
vm.runInContext(boot, bootScope); vm.runInContext(boot, bootScope);
assert.equal(instances, 1, 'Repeated initialization cannot stack backgrounds');

for(const name of ['index.html', 'packages.html']) {
  const html = fs.readFileSync(path.join(root, name), 'utf8');
  assert.equal(/class="(?:scene-bg|atmosphere|slides)"/.test(html), false);
  assert.equal((html.match(/src="nature-background-v7\.js/g)||[]).length, 1);
  assert.equal((html.match(/src="background-init\.js/g)||[]).length, 1);
  const firstStylesheet = html.indexOf('<link rel="stylesheet"');
  assert.equal(html.indexOf('id="background-base"') >= 0 && html.indexOf('id="background-base"') < firstStylesheet, true,
    'The neutral startup color is established before external styles load');
}
for(const name of ['landscape.css','natural-theme.css','natural-sales-layout.css','mobile-polish.css']) {
  const css = fs.readFileSync(path.join(root, name), 'utf8');
  assert.equal(/scene-bg|atmosphere|sun-glow|sun-rays|mist-band|light-dust|slides|page-background\.jpg/.test(css), false);
}
assert.equal(/setInterval|\.slides/.test(fs.readFileSync(path.join(root,'app.js'),'utf8')), false);
console.log('PASS: no legacy layers, deferred single initialization, loading/ready/error gating, first-frame reveal, WebGL and same-panorama fallback.');
