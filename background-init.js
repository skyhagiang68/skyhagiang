(() => {
  'use strict';
  // Head-loaded deferred scripts start once, before the other page interactions.
  if (window.skyTravelBackground) return;
  window.skyTravelBackground = new NatureBackground({
    logoText: 'SKYHAGIANGLOOP',
    showLogo: false,
    scrollSensitivity: 1.0,
    maxPixelRatio: window.innerWidth < 800 ? 1 : 1.35,
    zIndex: 1
  });
})();
