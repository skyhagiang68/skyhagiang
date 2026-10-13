// Shared, crawlable presentation sections with one unified horizontal blog rail for guest experiences, tour films and route journals.
module.exports = function sections(data, helpers) {
  const {esc, card, faqs, enquiryUrl} = helpers;
  const standard = data.tours.filter(t => t.kind !== 'private');
  const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${({
    bus:'<rect x="3" y="5" width="18" height="13" rx="3"/><path d="M3 12h18M8 5v7m8-7v7M7 18v2m10-2v2"/><circle cx="7" cy="15" r=".6"/><circle cx="17" cy="15" r=".6"/>',
    pin:'<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/>',
    mountain:'<path d="m2 20 7-14 5 9 3-6 5 11H2Zm4-8 3 2 3-2"/>',
    check:'<path d="m5 12 4 4L19 6"/>'
  })[name]}</svg>`;

  const dayVisuals = {
    'ha-giang-loop-3-days': {
      1: {
        src: 'assets/up/2aOboR4nX3DvgQuGYIuqn55B9IZCINiQXQj4vWF6.jpg',
        alt: 'Panoramic view of Ha Giang City and Lo River framed by twin limestone peaks before ascending Bac Sum Pass',
        caption: 'Day 1 departure overlook: Ha Giang City & Lo River valley from the hillside cafe before climbing Bac Sum Pass.'
      },
      2: {
        src: 'assets/up/2aOboR4neEi41uaKBuuoYd0MHHfi9zgsg5YXaK36.jpg',
        alt: 'Aerial view looking deep into Tu San Canyon with tour boats gliding along the emerald Nho Que River',
        caption: 'Day 2 highlight: Wooden boats cruising between the sheer limestone walls of Tu San Canyon on the Nho Que River.'
      },
      3: {
        src: 'assets/up/2aOboR4neDnRmHrIrHf9SFSOWCgXzRnKGohCTBBo.jpg',
        alt: 'High aerial view of the winding serpentine hairpins of Tham Ma and Nine-Turn Pass in Ha Giang',
        caption: 'Day 3 return route: The iconic serpentine hairpins of Tham Ma Pass leading back toward Yen Minh and Quan Ba.'
      }
    },
    'ha-giang-loop-4-days': {
      1: {
        src: 'assets/up/2aOboR4nfx6yqx8NIg0bv3lhQpX4dx0VwN0wFhxY.jpg',
        alt: 'Morning sunbeams breaking through mist over Quan Ba Twin Mountains and green rice paddies',
        caption: 'Day 1 highland ascent: First morning sunlight breaking over the Quan Ba Twin Mountains and valley fields.'
      },
      2: {
        src: 'assets/up/2aOboR4nYXAhlFLzAQjPqzh6JxzrtBoS6Ek4ykoC.jpg',
        alt: 'Sunny Ma Pi Leng Pass canyon overlook showing the turquoise Nho Que River winding between steep cliffs',
        caption: 'Day 2 canyon pass: Looking down from the Ma Pi Leng ridge at the jade curve of the Nho Que River.'
      },
      3: {
        src: 'assets/up/2aOboR4neBu8HaTpqQFxSQdzSiMSmUi1olf2JaYC.jpg',
        alt: 'Aerial drone photograph of Lung Cu Flag Tower flying the Vietnamese red flag above northern frontier valleys',
        caption: 'Day 3 northern frontier: Lung Cu Flag Tower standing watch above terraced valleys and Lo Lo Chai village.'
      },
      4: {
        src: 'assets/up/2aOboR4neBu8HaTpqQFxSQS11NJTZ9eN8uw8Qj3Y.jpg',
        alt: 'Golden sunset clouds glowing over green mountains and the winding river valley in Ha Giang',
        caption: 'Day 4 journey home: Warm late-afternoon clouds glowing across the highland valleys on the road back to Ha Giang.'
      }
    }
  };

  // Unified 20 horizontal Blog Cards combining Guest Stories, Real Tour Films & Route Journals
  const unifiedBlogPosts = [
    {
      id: 'du-gia-rain-trail',
      badge: '▶ Tour Film · Guest Story',
      route: 'Du Gia Forest Trail · Group Loop',
      src: 'assets/up/2aOboR4nWeTJ7gB43eEuhXha6aSRwRuzxtnWBrgu.jpg',
      alt: 'Group of eight international travellers and local Easy Rider guide smiling in colorful rain ponchos on a lush forest trail',
      title: 'Rain Ponchos & Easy Rider Spirit on the Trail to Du Gia',
      excerpt: 'When a sudden highland shower rolled across the Du Gia valley trail, our local Easy Riders turned a misty walk into the most unforgettable bonding moment of the trip.'
    },
    {
      id: 'du-gia-waterfall-swim',
      badge: '▶ Tour Film · Waterfall Swim',
      route: 'Du Gia Emerald Waterfall · Day 1 / Day 2',
      src: 'assets/up/2aOboR4nfO5xPDgOU0G5mLtJY1ZVEL78WvIAU1Ls.jpg',
      alt: 'Travellers swimming and relaxing on natural rocks in the crystal-clear emerald pool at Du Gia Waterfall',
      title: 'Afternoon Swim & Cliff Jumping at Du Gia Emerald Waterfall',
      excerpt: 'Trading riding jackets and helmets for an unhurried afternoon swimming in cool jade-green mountain water right beneath the forest cascade.'
    },
    {
      id: 'ma-pi-leng-cliff-rock',
      badge: 'Skywalk Viewpoint · Guest Story',
      route: 'Ma Pi Leng Cliff Ledge · High Pass',
      src: 'assets/up/2aOboR4nYY6yBNcvdmh6PWhFPYpfmpADRdrlka5Q.jpg',
      alt: 'Traveller standing confidently on the overhanging Ma Pi Leng cliff rock under a blue sky with the Nho Que River canyon below',
      title: 'Standing on the Overhanging Cliff Ledge Above Ma Pi Leng Gorge',
      excerpt: 'How our local guide timed our morning hike so the valley clouds parted right as we stepped onto the iconic stone ledge above the Nho Que canyon.'
    },
    {
      id: 'finisher-jersey-viewpoint',
      badge: '▶ Tour Film · Viewpoint Cafe',
      route: 'Karst Plateau Rest Stop · Live Music',
      src: 'assets/up/2aOboR4nWwP7uSFESiAGGshlHN0s71HFXYNr1qiW.jpg',
      alt: 'Traveller wearing a black and yellow #9 FINISHER MOT HAI BA DZO jersey holding an iced coffee at a mountain viewpoint railing',
      title: 'Earning the #9 Finisher “Một Hai Ba, Dzô!” Jersey Over Iced Coffee',
      excerpt: 'From cold Vietnamese coffee on a cliffside balcony to guests singing “Valerie” live above a horizon of a thousand limestone peaks.'
    },
    {
      id: 'nho-que-0km-couples',
      badge: '▶ Tour Film · Couples Story',
      route: 'Nho Que 0Km Milestone · Cultural Stop',
      src: 'assets/up/2aOboR4nad6dVkAjoiD1dSHjGYDX9jcGen8rtiMa.jpg',
      alt: 'Two couples wearing traditional embroidered Hmong outfits and holding a bamboo khen flute at the Nho Que 0Km milestone',
      title: 'Two Couples & the Bamboo Khèn Flute at the Nho Que 0Km Milestone',
      excerpt: 'Pausing together before the canyon descent to wear traditional red-and-black embroidered Hmong attire beside the Nho Que 0Km stone marker.'
    },
    {
      id: 'hmong-silver-brocade',
      badge: 'Highland Craft · Cultural Guide',
      route: 'Nho Que 0Km & Lung Tam Weaving',
      src: 'assets/up/2aOboR4naWkkZJT5h9dEFgVZUR6ZrEfMcHUbOWIK.jpg',
      alt: 'Young man and woman in traditional Hmong dress and silver necklace smiling beside the Nho Que 0Km stone marker',
      title: 'Hand-Embroidered Hmong Brocade & Silver Jewelry in the Mist',
      excerpt: 'The living story behind pleated hemp skirts, indigo batik patterns and handcrafted silver neck rings across the northern highlands.'
    },
    {
      id: 'tu-san-canyon-bow',
      badge: 'Canyon Cruise · Guest Story',
      route: 'Tu San Gorge · Nho Que River',
      src: 'assets/up/2aOboR4nYmzABAwyMILBDrp4hM8KFcVBqE0ZIJpw.jpg',
      alt: 'Traveller in a black windbreaker sitting on the green bow of a boat entering the vertical limestone cliffs of Tu San Canyon',
      title: 'Sitting on the Bow Entering the 800-Meter Walls of Tu San Canyon',
      excerpt: 'Down on the water, the scale of the landscape transforms completely as your wooden boat glides between sheer vertical limestone cliffs.'
    },
    {
      id: 'nho-que-emerald-cruise',
      badge: 'River Guide · Day 2 Timing',
      route: 'Nho Que Emerald Waterway · Boat Trip',
      src: 'assets/up/2aOboR4neEcIR8AbCOQjT58KrmoOr7kew7Q8ZPRg.jpg',
      alt: 'First-person view from the orange bow of a wooden boat gliding across the emerald green Nho Que River',
      title: 'First-Person on the Jade Waters of the Nho Que River',
      excerpt: 'How our local team sequences the descent to the boat pier so you glide across calm, glass-like emerald water without the midday rush.'
    },
    {
      id: 'lung-cu-motorbike-lineup',
      badge: '4-Day Route · Northern Frontier',
      route: 'Base of Lung Cu Flag Tower · Day 3',
      src: 'assets/up/2aOboR4naL7KDqIpcAUfw65EPCYylMSOvk35xVpI.jpg',
      alt: 'Traveller looking up at Lung Cu Flag Tower with a row of tour motorbikes parked at the base',
      title: 'Parking Our Motorbike Convoy Below Lung Cu Flag Tower on Day 3',
      excerpt: 'Why choosing the 4-day itinerary for the dedicated northern frontier ride to Dragon Mountain is a game-changer for your loop.'
    },
    {
      id: 'lung-cu-red-flag-summit',
      badge: 'Frontier Summit · Far North',
      route: 'Lung Cu Summit Viewpoint · Day 3',
      src: 'assets/up/2aOboR4nYfBtl3HlbigCsFDvthVrKtbioLT1JLdY.jpg',
      alt: 'Traveller smiling with arms wide open beneath the red Vietnamese flag against misty mountain peaks',
      title: 'Arms Wide Open Beneath the Red Flag in the Northern Mist',
      excerpt: 'Climbing the stone stairway to stand beneath the 54-square-meter Vietnamese flag as cool mountain clouds drift across the border ridges.'
    },
    {
      id: 'honda-winner-150-couple',
      badge: '▶ Tour Film · Easy Rider POV',
      route: 'Highland Pass Pull-Off · Motorbikes',
      src: 'assets/up/2aOboR4naZCz5GrwgowRXTTsTeivbB0n5Glf1h0i.jpg',
      alt: 'Couple in helmets and pink scarf posing playfully on a red Honda Winner GTR 150 motorbike on a misty mountain pass',
      title: 'Riding the Misty Passes Together on the Red Honda Winner 150',
      excerpt: 'Helmets strapped, warm scarves wrapped tight, and why riding pillion behind a seasoned local Easy Rider lets you soak in every view.'
    },
    {
      id: 'cloud-hunting-camping-chair',
      badge: '▶ Tour Film · Cloud Hunting',
      route: 'Sky Path Ridge · Cloud Lounge',
      src: 'assets/up/2aOboR4naNPuJg4QmkmtYyOLcDeowu2vDHqpvaBU.jpg',
      alt: 'Traveller relaxing in a green camping chair with drinks on a small table overlooking a sea of white clouds',
      title: 'Front-Row Camping Chairs Above a Sweeping Sea of Clouds',
      excerpt: 'Pulling up a canvas chair at a cliffside terrace with cold drinks in hand while a sea of white clouds fills the valley below.'
    },
    {
      id: 'tham-ma-pass-hairpins',
      badge: '▶ Drone Reel · Route Icon',
      route: 'Yen Minh ↔ Dong Van · Tham Ma Pass',
      src: 'assets/up/2aOboR4neBu8HaTpqQFxSQacLpplPICjzN5dvvJw.jpg',
      alt: 'Aerial view of the iconic S-bends of Tham Ma Pass with red-flag-topped cars winding up the curves',
      title: 'Red Flags on the Hairpins: Conquering the S-Curves of Tham Ma Pass',
      excerpt: 'Where pack horses once tested their strength on steep limestone switchbacks, our bikes and support cars trace the most famous curves in Ha Giang.'
    },
    {
      id: 'lo-lo-chai-golden-hour',
      badge: 'Frontier Village · Route Journal',
      route: 'Lo Lo Chai Village · Beneath Lung Cu',
      src: 'assets/up/2aOboR4neBu8HaTpqQFxSQUhmM1WhDzKZYnFlLM0.jpg',
      alt: 'Golden sunset aerial over Lo Lo Chai ancient clay-roofed village with Lung Cu Flag Tower on the mountain peak behind',
      title: 'Golden Hour Over Lo Lo Chai: The Ancient Village Beneath Lung Cu',
      excerpt: 'Arriving as late-afternoon sunlight turns earthen walls, stone fences and yin-yang tiled roofs warm gold at the foot of Dragon Mountain.'
    },
    {
      id: 'ma-pi-leng-quiet-ledge',
      badge: 'Canyon Overlook · Slow Travel',
      route: 'Dong Van ↔ Meo Vac · Ma Pi Leng',
      src: 'assets/up/2aOboR4neDghMxu6HZKIGGloYcaN67F2RB6vStjE.jpg',
      alt: 'Traveller sitting on a rocky outcrop overlooking the Nho Que River canyon',
      title: 'Quiet Moments on the Limestone Ledge: Slowing Down on Ma Pi Leng',
      excerpt: 'Why our favourite memory on Ma Pi Leng Pass is sitting still for ten unhurried minutes watching cloud shadows drift across the gorge.'
    },
    {
      id: 'easy-rider-perspective',
      badge: '▶ Tour Film · Local Guides',
      route: 'Ha Giang Loop · Easy Rider Team',
      src: 'assets/up/2aOboR4nagcfVadJvbIbYVY5KVWCnYg5IJmLqdnM.jpg',
      alt: 'Local rider in green jacket and riding gloves smiling with arms open above a winding mountain pass',
      title: 'Easy Rider Perspective: Why Local Drivers Make the Mountain Road',
      excerpt: 'Meet the highland riders who grew up on these passes—handling every hairpin, fog bank and hidden viewpoint so you can travel stress-free.'
    },
    {
      id: 'stone-battlement-viewpoint',
      badge: 'Panoramic Terrace · Route Guide',
      route: 'Ma Pi Leng Corridor · Viewpoint',
      src: 'assets/up/2aOboR4nakAGoIl4AnLpF34z0jbbKV8hL43WJeFs.jpg',
      alt: 'Traveller standing at a stone battlement viewpoint overlooking the turquoise Nho Que River and terraced slopes',
      title: 'The Stone Battlement Viewpoint: Terraced Slopes & the Nho Que Gorge',
      excerpt: 'Spectacular wide-angle canyon views from a secure stone-walled terrace—ideal for guests who want iconic photos without exposed cliff edges.'
    },
    {
      id: 'quan-ba-open-horizons',
      badge: 'Day 1 Journal · Highland Ascent',
      route: 'Quan Ba & Duong Thuong Valleys',
      src: 'assets/up/2aOboR4napgsKqnFPxXwKHEkq3Mxu2DZXobddT84.jpg',
      alt: 'Traveller in black hoodie spreading arms wide above sunny green mountain valleys in Ha Giang',
      title: 'Open Horizons: Breathing In the Crisp Air of Quan Ba & Duong Thuong',
      excerpt: 'Leaving Ha Giang City behind and climbing through Heaven’s Gate into emerald valleys, cornfields and limestone cones on Day 1.'
    },
    {
      id: 'frontier-group-convoy',
      badge: 'Group Convoy · Rider Community',
      route: 'Northern Frontier · Small Groups',
      src: 'assets/up/2aOboR4naJn32rlt5jc4lGazTkIiyhOu4HcKKpns.jpg',
      alt: 'Back view of traveller looking up at Lung Cu Flag Tower with a row of tour motorbikes parked at the base',
      title: 'Two Wheels at the Frontier: How Our Small-Group Rides Stay Connected',
      excerpt: 'How a lead guide, steady pacing and a sweep driver turn solo travellers, couples and friends into one tight-knit mountain crew.'
    },
    {
      id: 'morning-cloud-inversions',
      badge: 'Seasons & Weather · Route Guide',
      route: 'Highland Ridges · Cloud Hunting',
      src: 'assets/up/2aOboR4nYFnvIC8LFnKf6cvpEiMUYqkNWuiNnpFg.jpg',
      alt: 'Sea of white clouds drifting through jagged green limestone peaks in Ha Giang',
      title: 'When the Mountains Breathe: Morning Cloud Inversions in Ha Giang',
      excerpt: 'Understanding Ha Giang’s microclimates, the best months for cloud hunting, and what to pack for crisp mountain mornings.'
    }
  ];

  const transfer = () => `<div class="transfer-diagram motion-section" aria-labelledby="transfer-title"><div class="diagram-heading"><div><div class="kicker">Getting here</div><h3 id="transfer-title">${esc(data.transfer.title)}</h3></div><span class="mini-label">Before your tour</span></div><ol class="transfer-stops" aria-label="Hanoi pickup, coach to Ha Giang, then begin the loop"><li>${icon('pin')}<strong>Hanoi pickup</strong><span>Meeting point agreed</span></li><li>${icon('bus')}<strong>Coach journey</strong><span>Included · classic tours</span></li><li>${icon('mountain')}<strong>Ha Giang City</strong><span>Meet &amp; start your loop</span></li></ol><p class="small-note">${esc(data.transfer.note)}</p></div>`;

  const services = () => `<details class="service-disclosure"><summary>Services &amp; inclusions to confirm <span aria-hidden="true">+</span></summary><p class="small-note">Hanoi pickup and coach travel are included in the classic tour prices. Your quote confirms all other services below.</p><div class="service-grid">${data.services.map((s,i)=>`<article><span class="service-number">0${i+1}</span><h4>${esc(s.title)}</h4><p>${esc(s.text)}</p></article>`).join('')}</div></details>`;

  const privatePlan = () => `<div class="private-plan"><div class="kicker">Made for your group</div><h3>Build your own journey.</h3><ol><li><strong>Choose your pace</strong><p>Start with the 3-day or 4-day route and tell us which stops matter most.</p></li><li><strong>Shape your stay</strong><p>Share room preferences, group needs and your transport choice.</p></li><li><strong>Approve your plan</strong><p>Receive the route, services and private-tour price in writing before paying a deposit.</p></li></ol></div>`;

  const dailyDiagram = (t, active=false) => `<div class="itinerary-plan" data-route="${t.id}"${active?'':' hidden'}><ol class="day-diagram" aria-label="${esc(t.days)} daily stops">${t.itinerary.map(d=>{
    const visual = dayVisuals[t.id]?.[d.day];
    return `<li><details class="day-node"${d.day===1?' open':''}><summary><span class="node-dot">${d.day}</span><span><b>Day ${d.day}</b><strong>${esc(d.title)}</strong></span><span class="node-toggle" aria-hidden="true">+</span></summary><div class="node-copy"><ul class="stop-chips">${d.stops.map(s=>`<li>${esc(s)}</li>`).join('')}</ul><p>${esc(d.text)}</p><p class="day-stay">${esc(d.stay)}</p>${visual?`<figure class="day-node-visual"><img src="${visual.src}" alt="${esc(visual.alt)}" width="800" height="533" loading="lazy"><figcaption>${esc(visual.caption)}</figcaption></figure>`:''}</div></details></li>`;
  }).join('')}</ol><a class="text-link" href="${t.id}.html">Full ${t.durationDays}-day itinerary ↗</a></div>`;

  const itinerary = () => `<section id="itinerary" class="section wrap experience-section"><div class="surface"><header class="section-heading"><div><div class="kicker">03 · Itinerary</div><h2>Your journey, day by day.</h2></div><p>Mountain roads, river views and village craft. Tap a day to see its stops and real route photography.</p></header>${transfer()}<div class="route-switch" role="group" aria-label="Choose itinerary">${standard.map((t,i)=>`<button type="button" data-route-select="${t.id}" aria-pressed="${i===0}" aria-controls="plan-${t.durationDays}">${t.days}</button>`).join('')}</div>${standard.map((t,i)=>dailyDiagram(t,i===0).replace('class="itinerary-plan"',`class="itinerary-plan" id="plan-${t.durationDays}"`)).join('')}<p class="small-note">${esc(data.routeNote)}</p>${services()}</div></section>`;

  const story = () => `<section id="story" class="section wrap experience-section"><div class="story-surface motion-section"><div><div class="kicker">04 · Our story</div><h2>The road is better<br>with local perspective.</h2><p>Sky Ha Giang Loop brings your mountain journey into one clear plan: the route, your arrival from Hanoi and the local Easy Riders and guides who ride beside you in every weather. Choose a classic 3-day or 4-day loop or shape a private trip around your group.</p><div class="story-pillars"><span>Route planning</span><span>Local Easy Riders</span><span>Hanoi transfer</span><span>Private journeys</span></div><a class="pill story-cta" href="#contact">Plan with us ↗</a></div><div class="team-services"><h3>The people behind your journey</h3><p>Discuss your local guide or Easy Rider driver, language needs and travel arrangements before departure. Your booking confirmation identifies your tour contact and daily route plan.</p><figure class="story-single-feature"><img src="assets/up/2aOboR4nagcfVadJvbIbYVY5KVWCnYg5IJmLqdnM.jpg" alt="Local rider in green jacket and riding gloves smiling with arms open above a winding mountain pass" width="720" height="540" loading="lazy"><figcaption><strong>Experienced local Easy Riders</strong><span>Unhurried stops at safe mountain viewpoints along the loop.</span></figcaption></figure></div></div></section>`;

  // Single unified horizontal Blog section combining Guest Experiences, Tour Films and Route Journals
  const gallery = () => `<section id="gallery" class="section wrap experience-section"><div id="discover" class="discover" data-blog-ready="true"><div class="travel-blog"><div class="travel-blog-head"><div><div class="kicker">05 · Blog — Journeys &amp; Guest Stories</div><h2 translate="no">Stories from the Ha Giang Loop</h2></div><div class="travel-blog-controls"><button class="travel-blog-arrow" type="button" aria-label="Previous stories">←</button><button class="travel-blog-arrow" type="button" aria-label="Next stories">→</button></div><p>Real guest experiences, road films and route guides from Du Gia, Nho Que, Ma Pi Leng and Lung Cu.</p></div><div class="travel-blog-rail" tabindex="0" aria-label="Ha Giang Loop blog articles, scroll horizontally">${unifiedBlogPosts.map(post => `<article class="travel-article-card" data-blog-post="${esc(post.id)}" tabindex="0" role="button" aria-label="Read article: ${esc(post.title)}"><div class="travel-article-media"><img src="${post.src}" alt="${esc(post.alt)}" width="720" height="520" loading="lazy"><span class="travel-article-badge">${esc(post.badge)}</span></div><div class="travel-article-copy"><span class="travel-article-meta">${esc(post.route)}</span><h3>${esc(post.title)}</h3><p>${esc(post.excerpt)}</p><span class="travel-article-read">Read full story ↗</span></div></article>`).join('')}</div></div></div></section>`;

  const channels = () => `<div class="contact-channels"><a href="https://wa.me/${data.contact.phone.replace(/\D/g,'')}" target="_blank" rel="noopener">WhatsApp: ${esc(data.contact.phone)}</a><a href="mailto:${esc(data.contact.email)}">Email: ${esc(data.contact.email)}</a></div>`;

  const booking = bookingHtml => `<section id="contact" class="section wrap experience-section"><div class="surface booking-contact"><header class="section-heading"><div><div class="kicker">06 · Booking &amp; contact</div><h2>Book your next adventure.</h2></div><p>Choose your loop departure date and group size. If travelling from Hanoi, add your pickup needs.</p></header><div class="booking-layout"><div>${channels()}<ol class="deposit-flow"><li><span>01</span><div><strong>Request your trip</strong><p>Dates, travellers, route and Hanoi pickup.</p></div></li><li><span>02</span><div><strong>Confirm the quote</strong><p>Per-person price, included coach, other services and cancellation terms in writing.</p></div></li><li><span>03</span><div><strong>Agree the deposit</strong><p>Amount, due date and verified payment recipient confirmed before payment.</p></div></li></ol><p class="small-note">Your guide confirms the deposit amount, payment method and booking conditions before payment.</p></div><form class="form" id="form"><p class="contact-note contact-field-wide">Prepare your enquiry below. Review the details before sending them to our travel team.</p><div class="contact-field"><label for="name">Your name</label><input id="name" name="name" autocomplete="name" required placeholder="Your name"></div><div class="contact-field"><label for="email">Email address</label><input id="email" name="email" autocomplete="email" type="email" required placeholder="Email address"></div><div class="contact-field contact-tour"><label for="package">Tour package</label><select id="package" name="package" required><option value="">Select your itinerary</option>${data.tours.map(t=>`<option value="${esc(t.value)}">${esc(t.value)}</option>`).join('')}</select></div><div class="contact-field contact-guests"><label for="guests">Travellers</label><input id="guests" name="guests" type="number" min="1" max="30" value="2" required></div><div class="date-row contact-field-wide"><div><label for="start">Loop departure date</label><input id="start" name="start" type="date" required></div><div><label for="end">Loop end date</label><input id="end" name="end" type="date" required></div></div><div class="contact-field contact-field-wide"><label for="pickup">Starting point</label><select id="pickup" name="pickup"><option>Hanoi pickup + coach to Ha Giang</option><option>Meet in Ha Giang City</option><option>Discuss another arrangement</option></select></div><div class="contact-field contact-field-wide"><label for="message">Trip notes</label><textarea id="message" name="message" rows="2" placeholder="Pickup location, arrival date, rooms or private-tour preferences"></textarea></div><button class="pill contact-field-wide" type="submit">Prepare booking enquiry ↗</button><div class="status contact-field-wide" id="status" role="status"></div></form></div><details class="booking-visual"><summary>See the booking journey</summary>${bookingHtml}</details></div></section>`;

  const home = bookingHtml => `<body class="experience-home"><a class="skip-link" href="#main-content">Skip to content</a><nav class="nav"><div class="wrap navin"><a class="brand" href="index.html#home"><img src="assets/logo.png" width="60" height="46" alt="Sky Ha Giang Loop logo"> SKY HA GIANG LOOP</a><div class="links" id="navigation"><a href="index.html#home">Home</a><a href="packages.html">Tour Packages</a><a href="itinerary.html">Itinerary</a><a href="story.html">Our Story</a><a href="gallery.html">Gallery &amp; Reviews</a><a class="pill" href="contact.html">Booking &amp; Contact</a></div><button class="menu" id="menu" aria-label="Open navigation" aria-controls="navigation" aria-expanded="false">☰</button></div></nav><header id="home" class="hero"><div class="wrap heroContent"><div class="eyebrow">Ha Giang, Vietnam · Hanoi pickup available</div><h1>Ha Giang Loop.<br><em>Your way.</em></h1><p>River canyons. Mountain passes. Village stories.<br>Choose a 3-day, 4-day or private journey through the northern highlands.</p><div class="actions"><a class="pill" href="contact.html">Book Your Tour ↗</a><a class="pill ghost" href="packages.html">Explore the packages ↓</a></div><div class="hero-facts"><span>3 days · USD 200–226/person</span><span>4 days · USD 250–270/person</span><span>Private · Tailored quote</span></div></div></header><main id="main-content"><section class="section packages wrap compact-collection" id="packages" aria-labelledby="packages-title"><div class="head"><div><div class="kicker">02 · Tour packages</div><h2 id="packages-title">Find your Ha Giang Loop.</h2></div><p class="intro">Three ways to travel. Two classic loops and a private journey shaped around your group.</p></div><div class="package-grid">${data.tours.map(card).join('')}</div><div class="tour-compare-link"><a href="packages.html">Compare all packages ↗</a><span>Hanoi pickup available · Quote confirmed before booking</span></div><p class="package-price-note">${esc(data.priceNote)}</p></section>${itinerary()}${story()}${gallery()}${booking(bookingHtml)}<div class="section wrap experience-section">${faqs()}</div></main><footer class="site-footer"><div class="wrap footer-grid"><div class="footer-brand"><b>${esc(data.brand)}</b><p>Ha Giang Loop journeys · 3 days, 4 days and private tours. Hanoi pickup and coach arrangements available.</p></div><div><h3>Explore</h3>${data.tours.map(t=>`<a href="${t.id}.html">${esc(t.title)}</a>`).join('<br>')}</div><div><h3>Contact</h3><p>${esc(data.contact.phone)}<br>${esc(data.contact.email)}</p></div><div><h3>Before you travel</h3><a href="itinerary.html">Stops &amp; service details</a><br><a href="contact.html">Booking &amp; deposit process</a><br><a href="index.html#faq-title">Frequently asked questions</a></div></div><div class="wrap footer-location" style="display:flex;flex-direction:column;align-items:center;gap:8px;padding:22px 0;text-align:center"><h3 style="margin:0;color:#f3c86b">Our location</h3><p style="margin:0 0 4px">Hong Quang Hamlet, Minh Quang Commune,<br>Tuyen Quang Province, Vietnam</p><iframe title="Map of Hong Quang Hamlet, Minh Quang Commune, Tuyen Quang Province" src="https://www.google.com/maps?q=Hong%20Quang%20Hamlet%2C%20Minh%20Quang%20Commune%2C%20Tuyen%20Quang%20Province%2C%20Vietnam&amp;output=embed" width="360" height="180" style="width:min(100%,360px);height:180px;border:0;border-radius:14px" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div><div class="wrap footer-bottom">© 2026 ${esc(data.brand)} · Prices and services confirmed before booking.</div></footer><script src="app.js" defer></script><script src="tour-interactions.js" defer></script><script src="travel-blog.js" defer></script><script src="booking-journey.js" defer></script><script src="site-experience.js" defer></script></body></html>`;

  const pageSections = {
    itinerary: () => `<section class="page-intro surface"><div class="kicker">03 · Itinerary</div><h1>Plan the road before you ride.</h1><p>Choose a clear pace through Ha Giang, then let your local guide adjust the order around weather, road conditions and your group's energy.</p></section>${itinerary()}`,
    story: () => `<section class="page-intro surface"><div class="kicker">04 · Our Story</div><h1>Travel with local perspective.</h1><p>Clear planning, practical advice and a route that leaves room for the people and places along the way.</p></section>${story().replace('href="#contact"','href="contact.html"')}`,
    gallery: () => `<section class="page-intro surface"><div class="kicker">05 · Gallery &amp; Reviews</div><h1>Stories from the Ha Giang Loop.</h1><p>Explore detailed guest stories, route insights and real road films from Du Gia, Nho Que, Ma Pi Leng and Lung Cu.</p></section>${gallery()}`,
    contact: bookingHtml => `<section class="page-intro surface"><div class="kicker">06 · Booking &amp; Contact</div><h1>Let’s plan your mountain journey.</h1><p>Send your dates, group size and priorities. A local guide can suggest a practical route and explain which services are included or charged separately.</p></section>${booking(bookingHtml)}`,
    packages: () => `<section class="page-intro surface"><div class="kicker">02 · Tour Packages</div><h1>Three ways to experience Ha Giang.</h1><p>Compare the classic loops or ask for a private plan. Optional services are itemised separately and your guide helps you choose what fits.</p></section><div class="package-page-grid">${data.tours.map(card).join('')}</div>`
  };
  return {home, transfer, services, privatePlan, pageSections, dayVisuals};
};
