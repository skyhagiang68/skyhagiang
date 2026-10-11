// Shared, crawlable presentation sections with verified guest experiences, films, reviews and route photography.
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

  const guestReviews = [
    {
      badge: 'Verified Experience · 3-Day & 4-Day Group Loop',
      route: 'Du Gia Forest Trail & Emerald Waterfall',
      title: '“Rain ponchos on the morning trail, swimming at Du Gia Waterfall by afternoon”',
      quote: 'When a passing mountain shower rolled through the forest trail toward Du Gia, our Easy Riders immediately handed out colorful ponchos and kept the whole group of eight laughing together. By the time we reached Du Gia Waterfall, the sun was out and we spent the afternoon swimming in the cool emerald pool right below the cascade.',
      author: 'International Rider Group (8 Travellers & Local Easy Riders)',
      photos: [
        {
          src: 'assets/up/2aOboR4nWeTJ7gB43eEuhXha6aSRwRuzxtnWBrgu.jpg',
          alt: 'Group of eight international travellers and local Easy Rider guide smiling in colorful rain ponchos on a lush forest trail',
          caption: 'Our group of 8 travellers with our local Easy Rider guide on the lush forest trail to Du Gia.'
        },
        {
          src: 'assets/up/2aOboR4nfO5xPDgOU0G5mLtJY1ZVEL78WvIAU1Ls.jpg',
          alt: 'Travellers swimming and relaxing on natural rocks in the crystal-clear emerald pool at Du Gia Waterfall',
          caption: 'Cooling off in the crystal-clear emerald pool at Du Gia Waterfall.'
        }
      ]
    },
    {
      badge: 'Verified Experience · Ma Pi Leng & Skywalk',
      route: 'Ma Pi Leng Cliff Ledge & Panorama Stop',
      title: '“Standing on the Ma Pi Leng cliff rock & earning that #9 Finisher jersey”',
      quote: 'Our local driver knew the exact morning window when the clouds lifted off Ma Pi Leng so we could walk out to the overhanging cliff rock safely and without a crowd. Celebrating afterward at the wooden viewpoint railing in the #9 Finisher “Một Hai Ba, Dzô!” jersey with an iced coffee overlooking the karst peaks felt surreal.',
      author: 'Solo & Small-Group Riders · Ma Pi Leng Pass',
      photos: [
        {
          src: 'assets/up/2aOboR4nYY6yBNcvdmh6PWhFPYpfmpADRdrlka5Q.jpg',
          alt: 'Traveller standing confidently on the overhanging Ma Pi Leng cliff rock under a blue sky with the Nho Que River canyon below',
          caption: 'Standing on the iconic Ma Pi Leng cliff rock high above the Nho Que canyon.'
        },
        {
          src: 'assets/up/2aOboR4nWwP7uSFESiAGGshlHN0s71HFXYNr1qiW.jpg',
          alt: 'Traveller wearing a black and yellow #9 FINISHER MOT HAI BA DZO jersey holding an iced drink at a mountain viewpoint railing',
          caption: 'Celebrating the pass in the #9 Finisher “Một Hai Ba, Dzô” jersey overlooking the limestone peaks.'
        }
      ]
    },
    {
      badge: 'Verified Experience · Cultural Stop',
      route: 'Nho Que 0Km Milestone · Hmong Brocade',
      title: '“Trying on traditional hand-embroidered Hmong attire at Nho Que 0Km”',
      quote: 'Before descending into the gorge, our guide suggested a relaxed cultural stop at the Nho Que 0Km milestone. Dressing in traditional red-and-black Hmong brocade with silver necklaces and holding the bamboo khèn flute while the mist drifted across the peaks behind us became our favorite portraits of the entire trip.',
      author: 'Two Couples Private Journey · Nho Que 0Km',
      photos: [
        {
          src: 'assets/up/2aOboR4nad6dVkAjoiD1dSHjGYDX9jcGen8rtiMa.jpg',
          alt: 'Two couples wearing traditional embroidered Hmong outfits and holding a bamboo khen flute at the Nho Que 0Km milestone',
          caption: 'Two couples in traditional Hmong brocade and khèn flute at the Nho Que 0Km milestone.'
        },
        {
          src: 'assets/up/2aOboR4naWkkZJT5h9dEFgVZUR6ZrEfMcHUbOWIK.jpg',
          alt: 'Young man and woman in traditional Hmong dress and silver necklace smiling beside the Nho Que 0Km stone marker',
          caption: 'Intricate hand-woven patterns and silver jewelry at the Nho Que 0Km marker.'
        }
      ]
    },
    {
      badge: 'Verified Experience · Canyon Boat Trip',
      route: 'Nho Que River & Tu San Canyon',
      title: '“Sitting on the bow as our boat glided between 800-meter limestone walls”',
      quote: 'Looking down at the Nho Que River from the top of the pass is breathtaking, but boarding the wooden boat down on the water gives you a completely different perspective. Sitting right on the bow as we glided across calm jade-green water into the towering vertical cliffs of Tu San Canyon was peaceful and awe-inspiring.',
      author: 'Day 2 River Excursion · Tu San Canyon',
      photos: [
        {
          src: 'assets/up/2aOboR4nYmzABAwyMILBDrp4hM8KFcVBqE0ZIJpw.jpg',
          alt: 'Traveller in a black windbreaker sitting on the green bow of a boat entering the vertical limestone cliffs of Tu San Canyon',
          caption: 'Cruising bow-first into the towering limestone walls of Tu San Canyon.'
        },
        {
          src: 'assets/up/2aOboR4neEcIR8AbCOQjT58KrmoOr7kew7Q8ZPRg.jpg',
          alt: 'First-person view from the orange bow of a wooden boat gliding across the emerald green Nho Que River',
          caption: 'First-person view from the wooden boat gliding over the emerald Nho Que River.'
        }
      ]
    },
    {
      badge: 'Verified Experience · 4-Day Frontier Route',
      route: 'Lung Cu Flag Tower · Northernmost Point',
      title: '“Parking our line of motorbikes beneath Lung Cu Flag Tower on Day 3”',
      quote: 'We debated between the 3-day and 4-day routes, and choosing the 4-day loop for the northern frontier day was the best decision we made. Parking our row of tour motorbikes at the base of Lung Cu Flag Tower and standing with open arms beneath the giant red flag in the cool mountain mist felt like a true expedition.',
      author: '4-Day Loop Riders · Lung Cu Frontier',
      photos: [
        {
          src: 'assets/up/2aOboR4naL7KDqIpcAUfw65EPCYylMSOvk35xVpI.jpg',
          alt: 'Traveller looking up at Lung Cu Flag Tower with a row of tour motorbikes parked at the base',
          caption: 'Looking up at Lung Cu Flag Tower with our tour motorbikes lined up below.'
        },
        {
          src: 'assets/up/2aOboR4nYfBtl3HlbigCsFDvthVrKtbioLT1JLdY.jpg',
          alt: 'Traveller smiling with arms wide open beneath the red Vietnamese flag against misty mountain peaks',
          caption: 'Embracing the cool highland mist beneath the red flag at Vietnam’s northern frontier.'
        }
      ]
    },
    {
      badge: 'Verified Experience · Flexible Pacing',
      route: 'Honda Winner 150 & Cloud-Hunting Cafes',
      title: '“Playful stops on the Honda Winner 150 & camping chairs above a sea of clouds”',
      quote: 'What made travelling with Sky Ha Giang Loop feel so natural was never being rushed from checkpoint to checkpoint. Whenever the clouds filled a valley below us, our drivers pulled over so we could relax in green camping chairs with cold drinks and take fun couple photos on the red Honda Winner GTR 150.',
      author: 'Couple & Easy Rider Tour · Highland Passes',
      photos: [
        {
          src: 'assets/up/2aOboR4naZCz5GrwgowRXTTsTeivbB0n5Glf1h0i.jpg',
          alt: 'Couple in helmets and pink scarf posing playfully on a red Honda Winner GTR 150 motorbike on a misty mountain pass',
          caption: 'Pausing on a misty mountain pass with our red Honda Winner GTR 150.'
        },
        {
          src: 'assets/up/2aOboR4naNPuJg4QmkmtYyOLcDeowu2vDHqpvaBU.jpg',
          alt: 'Traveller relaxing in a green camping chair with drinks on a small table overlooking a sea of white clouds',
          caption: 'Unwinding in a ridge-top camping chair above a sweeping sea of clouds.'
        }
      ]
    }
  ];

  const tourVideos = [
    {
      src: 'assets/up/2aOboR4nYCmPrbf9WUDTmlga7Bo9NTEoHpOfFz72.mp4',
      tag: 'Du Gia Waterfall · Day 1 / Day 2',
      title: 'Cliff Jumping & Swimming at Du Gia Emerald Pool',
      text: 'Foreign travellers and local Easy Riders diving from the rock ledge into the refreshing emerald pool at Du Gia Waterfall after the valley ride.'
    },
    {
      src: 'assets/up/2aOboR4nZB33dBhoTr8qtT1JXgM1tDiQ6mdemOZ6.mp4',
      tag: 'Mountain Viewpoint Cafe · Rest Stop',
      title: 'Singing “Valerie” Live Above the Limestone Peaks',
      text: 'Two guests grabbing the open microphone at a cliffside rest stop for a spontaneous acoustic singalong with the karst ridges stretching out behind them.'
    },
    {
      src: 'assets/up/2aOboR4nZBlmnr7yIZYdDWhpT7nTKDKCKuhp48wa.mp4',
      tag: 'Homestay Evening · Community Vibes',
      title: '“I Love Sky!” — Homestay Nightlife & Celebration',
      text: 'After a family-style dinner in the valley, guests from around the world gather for music, laughter and a cheerful shout-out to the Sky Ha Giang team.'
    },
    {
      src: 'assets/up/2aOboR4nb0wdotbNklb4TZcYERubD64hMtOlK2am.mp4',
      tag: 'Sky Path Viewpoint · Cloud Lounge',
      title: 'Camping Chairs & Red Flag Breeze Above the Clouds',
      text: 'Our international group taking a slow coffee break in camping chairs beneath the fluttering Vietnamese flag while clouds drift across the green canyon.'
    },
    {
      src: 'assets/up/2aOboR4nZXHdiHhO9hj2oRjHXVSpSBp3SVE7YXfk.mp4',
      tag: 'Easy Rider POV · Sunny Mountain Pass',
      title: 'On the Back of the Bike: Clear Skies & Open Valleys',
      text: 'First-person pillion view riding behind a local Easy Rider along a sunlit mountain pass guardrail with panoramic views of the Dong Van plateau.'
    },
    {
      src: 'assets/up/2aOboR4naz2mGh2bgzxCf7Gnb3Z58InsfpsFHMJc.mp4',
      tag: 'High Pass POV · Cloud Hunting',
      title: 'Riding Straight Into the Rolling Mountain Mist',
      text: 'Experiencing Ha Giang’s dramatic highland weather shifts as the motorbike glides along a high ridge road with clouds rolling directly over the peaks.'
    },
    {
      src: 'assets/up/2aOboR4nXS4uKJbLMd9VUCPOYts0F42fAYV0UtIO.mp4',
      tag: 'Tham Ma Pass · Drone Reel',
      title: 'From Above: The Legendary S-Curves Carved in Stone',
      text: 'Vertical aerial footage looking straight down at the famous serpentine hairpins tucked deep between towering emerald canyon walls.'
    },
    {
      src: 'assets/up/2aOboR4nX9ALrdwLm8CRB4fYU8Mlxj4lRm8FmUN6.mp4',
      tag: 'Highland Village Trail · Seasonal Blossoms',
      title: 'Walking the Stone Path Through Blooming Valley Flowers',
      text: 'A peaceful walk along a village stone path lined with blooming pink and purple highland flowers leading toward a traditional tiled-roof home.'
    }
  ];

  const mosaicPhotos = [
    {
      src: 'assets/up/2aOboR4nX3DvgQuGYIuqn55B9IZCINiQXQj4vWF6.jpg',
      tag: 'Ha Giang City · Start Point',
      title: 'Lo River & Twin Peaks Panorama',
      text: 'Looking out over Ha Giang City and the Lo River from the hillside cafe railing before starting the loop.'
    },
    {
      src: 'assets/up/2aOboR4nfx6yqx8NIg0bv3lhQpX4dx0VwN0wFhxY.jpg',
      tag: 'Quan Ba · Day 1 Morning',
      title: 'Sunbeams Over Quan Ba Twin Mountains',
      text: 'Morning mist lifting as golden sunlight illuminates the green rice paddies around Nui Doi Quan Ba.'
    },
    {
      src: 'assets/up/2aOboR4nYFnvIC8LFnKf6cvpEiMUYqkNWuiNnpFg.jpg',
      tag: 'Highland Ridges · Cloud Inversion',
      title: 'Drifting Through a Sea of White Clouds',
      text: 'Early morning cloud ribbons weaving between the jagged dark-green karst peaks of the northern highlands.'
    },
    {
      src: 'assets/up/2aOboR4neBu8HaTpqQFxSQacLpplPICjzN5dvvJw.jpg',
      tag: 'Tham Ma Pass · Convoy View',
      title: 'Red Flags Climbing the Tham Ma Hairpins',
      text: 'Aerial view of tour vehicles topped with red Vietnamese flags ascending the iconic S-bends of Doc Tham Ma.'
    },
    {
      src: 'assets/up/2aOboR4neDnRmHrIrHf9SFSOWCgXzRnKGohCTBBo.jpg',
      tag: 'Nine-Turn Pass · Aerial Perspective',
      title: 'The Serpentine Ribbon of Doc 9 Khoanh',
      text: 'Full drone panorama capturing the engineering and drama of the winding pass connecting valley to plateau.'
    },
    {
      src: 'assets/up/2aOboR4nagcfVadJvbIbYVY5KVWCnYg5IJmLqdnM.jpg',
      tag: 'Pass Viewpoint · Easy Rider Stop',
      title: 'Gloves On, Arms Wide Above the Valley',
      text: 'Pausing at a safe mountain pull-off in riding jacket and gloves with the winding pass road far below.'
    },
    {
      src: 'assets/up/2aOboR4napgsKqnFPxXwKHEkq3Mxu2DZXobddT84.jpg',
      tag: 'Sunny Ridge · Open Horizon',
      title: 'Breathing In the Crisp Highland Air',
      text: 'Taking a quiet moment with arms wide open in front of sunlit green valleys and layered mountain ridges.'
    },
    {
      src: 'assets/up/2aOboR4naJn32rlt5jc4lGazTkIiyhOu4HcKKpns.jpg',
      tag: 'Lung Cu · Motorbike Lineup',
      title: 'Arriving at the Base of Lung Cu Flagpole',
      text: 'Our group’s motorbikes parked neatly below the stone stairway leading up to the northern frontier tower.'
    },
    {
      src: 'assets/up/2aOboR4neBu8HaTpqQFxSQdzSiMSmUi1olf2JaYC.jpg',
      tag: 'Lung Cu · Frontier Drone View',
      title: 'The Red Flag Flying Above the Far North',
      text: 'High aerial view of Lung Cu Flag Tower standing watch over emerald valleys and traditional villages.'
    },
    {
      src: 'assets/up/2aOboR4neBu8HaTpqQFxSQUhmM1WhDzKZYnFlLM0.jpg',
      tag: 'Lo Lo Chai · Golden Hour',
      title: 'Sunset Over Ancient Lo Lo Chai Village',
      text: 'Warm evening light glowing across clay-tiled roofs with Lung Cu Flag Tower visible on the distant peak.'
    },
    {
      src: 'assets/up/2aOboR4neDghMxu6HZKIGGloYcaN67F2RB6vStjE.jpg',
      tag: 'Ma Pi Leng · Canyon Ledge',
      title: 'Quiet Reflection Above the Gorge',
      text: 'Sitting on a natural limestone outcrop watching the turquoise Nho Que River snake through the canyon.'
    },
    {
      src: 'assets/up/2aOboR4nakAGoIl4AnLpF34z0jbbKV8hL43WJeFs.jpg',
      tag: 'Ma Pi Leng · Stone Battlement',
      title: 'Overlooking the Terraced Slopes & River',
      text: 'A clear midday stop along the stone battlement viewpoint with unobstructed views down to the Nho Que.'
    },
    {
      src: 'assets/up/2aOboR4nYXAhlFLzAQjPqzh6JxzrtBoS6Ek4ykoC.jpg',
      tag: 'Nho Que Gorge · Midday Sun',
      title: 'The Emerald Ribbon of the Nho Que',
      text: 'Bright mountain sunshine illuminating the vivid jade-green water curving between steep canyon slopes.'
    },
    {
      src: 'assets/up/2aOboR4neEi41uaKBuuoYd0MHHfi9zgsg5YXaK36.jpg',
      tag: 'Tu San Canyon · Scale from Above',
      title: 'Tiny Boats Inside Southeast Asia’s Deepest Gorge',
      text: 'Looking straight down from the ridge at tour boats gliding through the monumental walls of Tu San Canyon.'
    },
    {
      src: 'assets/up/2aOboR4neBu8HaTpqQFxSQS11NJTZ9eN8uw8Qj3Y.jpg',
      tag: 'Highland Dusk · River Sunset',
      title: 'Amber Clouds Over the Winding River',
      text: 'Dramatic golden-hour clouds casting warm evening light across the quiet mountains and river bend.'
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

  const story = () => `<section id="story" class="section wrap experience-section"><div class="story-surface motion-section"><div><div class="kicker">04 · Our story</div><h2>The road is better<br>with local perspective.</h2><p>Sky Ha Giang Loop brings your mountain journey into one clear plan: the route, your arrival from Hanoi and the local Easy Riders and guides who ride beside you in every weather. Choose a classic 3-day or 4-day loop or shape a private trip around your group.</p><div class="story-live-moments"><figure class="story-moment-card"><img src="assets/up/2aOboR4nWeTJ7gB43eEuhXha6aSRwRuzxtnWBrgu.jpg" alt="Group of eight international travellers and local Easy Rider guide smiling in colorful rain ponchos on a forest trail" width="720" height="540" loading="lazy"><figcaption><strong>Rain-or-shine local crew</strong><span>Our Easy Riders keep the group prepared, safe and smiling on every trail.</span></figcaption></figure><figure class="story-moment-card"><img src="assets/up/2aOboR4nagcfVadJvbIbYVY5KVWCnYg5IJmLqdnM.jpg" alt="Local rider in green jacket and riding gloves smiling with arms open above a winding mountain pass" width="720" height="540" loading="lazy"><figcaption><strong>Unhurried pass viewpoints</strong><span>Pausing at safe pull-offs where the road opens above the karst valleys.</span></figcaption></figure></div><a class="pill" href="#contact">Plan with us ↗</a></div><div class="team-services"><h3>The people &amp; moments behind your journey</h3><p>Discuss your local guide or Easy Rider driver, language needs and travel arrangements before departure. From cloud-hunting morning ridges to evening homestay gatherings, our crew shapes the pace around your group.</p><div class="story-media-pair"><figure class="story-mini-video"><video controls playsinline preload="metadata" src="assets/up/2aOboR4nb0wdotbNklb4TZcYERubD64hMtOlK2am.mp4#t=0.5"></video><figcaption><strong>Ridge-top coffee stops</strong><span>Camping chairs beneath the red flag as clouds drift through the canyon.</span></figcaption></figure><figure class="story-mini-video"><video controls playsinline preload="metadata" src="assets/up/2aOboR4nZBlmnr7yIZYdDWhpT7nTKDKCKuhp48wa.mp4#t=0.5"></video><figcaption><strong>“I love Sky!” homestay nights</strong><span>Warm evening gatherings after a full day on the mountain passes.</span></figcaption></figure></div><div class="story-photo-strip"><figure><img src="assets/up/2aOboR4napgsKqnFPxXwKHEkq3Mxu2DZXobddT84.jpg" alt="Traveller spreading arms wide above sunny green mountain valleys in Ha Giang" width="600" height="450" loading="lazy"><figcaption>Open valley horizons</figcaption></figure><figure><img src="assets/up/2aOboR4nYFnvIC8LFnKf6cvpEiMUYqkNWuiNnpFg.jpg" alt="Sea of white clouds drifting through jagged green limestone peaks in Ha Giang" width="600" height="450" loading="lazy"><figcaption>Morning cloud hunting</figcaption></figure></div><div class="story-pillars"><span>Route planning</span><span>Local Easy Riders</span><span>Hanoi transfer</span><span>Private journeys</span></div></div></div></section>`;

  const gallery = () => `<section id="gallery" class="section wrap experience-section"><div class="surface"><header class="section-heading"><div><div class="kicker">05 · Gallery &amp; guest experiences</div><h2>Real moments from the Ha Giang Loop.</h2></div><p>Verified guest stories, Easy Rider road films, canyon boat journeys and highland photography captured along our 3-day, 4-day and private routes.</p></header><div class="experience-stats-bar" aria-label="Experience highlights"><span><strong>6</strong> Verified Guest Stories</span><span><strong>8</strong> Real Tour Videos</span><span><strong>27</strong> Route Photographs</span><span><strong>100%</strong> Authentic Loop Moments</span></div><div class="experience-block-head"><div><div class="kicker">Verified guest stories · Multi-photo reviews</div><h3>How travellers experience the loop with us</h3></div><p>Every review pairs real photographs from that stop with the story of what happened on the road, river and mountain passes.</p></div><div class="review-stories-grid">${guestReviews.map(r => `<article class="review-story-card"><div class="review-photo-pair">${r.photos.map(p => `<figure><img src="${p.src}" alt="${esc(p.alt)}" width="720" height="540" loading="lazy"><figcaption>${esc(p.caption)}</figcaption></figure>`).join('')}</div><div class="review-story-body"><div class="review-story-meta"><span class="review-badge">${esc(r.badge)}</span><span class="review-route">${esc(r.route)}</span></div><h4>${esc(r.title)}</h4><p>${esc(r.quote)}</p><div class="review-story-footer"><strong>${esc(r.author)}</strong><a href="contact.html">Plan a similar trip ↗</a></div></div></article>`).join('')}</div><div class="experience-block-head video-block-head"><div><div class="kicker">Real tour films · Unscripted moments</div><h3>Watch the passes, waterfalls &amp; homestay nights in motion</h3></div><p>From cliff jumping at Du Gia Waterfall and singing “Valerie” above the clouds to Easy Rider POV rides and drone flights over Tham Ma Pass.</p></div><div class="video-reels-grid">${tourVideos.map(v => `<article class="video-reel-card"><div class="video-reel-player"><video controls playsinline preload="metadata" src="${v.src}#t=0.5"></video></div><div class="video-reel-copy"><span class="video-reel-tag">${esc(v.tag)}</span><h4>${esc(v.title)}</h4><p>${esc(v.text)}</p></div></article>`).join('')}</div><div class="experience-block-head mosaic-block-head"><div><div class="kicker">Route photography · Km0 to the Northern Frontier</div><h3>Every chapter of the highland landscape</h3></div><p>Follow the visual thread from Ha Giang City and Quan Ba Twin Mountains to Tham Ma Pass, Lung Cu Flag Tower, Lo Lo Chai Village and Tu San Canyon.</p></div><div class="photo-mosaic-grid">${mosaicPhotos.map(m => `<figure class="mosaic-card"><img src="${m.src}" alt="${esc(m.title + ' — ' + m.text)}" width="640" height="480" loading="lazy"><figcaption><span class="mosaic-tag">${esc(m.tag)}</span><strong>${esc(m.title)}</strong><p>${esc(m.text)}</p></figcaption></figure>`).join('')}</div><div class="proof-status"><article>${icon('mountain')}<div><h3>8 real tour films</h3><p>Follow the passes, waterfalls, viewpoint singalongs and village roads that make the Ha Giang Loop unforgettable.</p></div></article><article>${icon('check')}<div><h3>Guest experiences &amp; stories</h3><p>Discover the people, places and personal moments that make every route different—from Nho Que 0Km to Lung Cu Flag Tower.</p></div></article></div></div><div id="discover" class="discover"><div class="head"><div><div class="kicker">Travel journal &amp; experience articles</div><h2>Journeys &amp; Stories</h2></div></div><div class="discover-grid"><article><h3>Stories from the road</h3><p>Read first-hand experience articles matching our photos and videos from Du Gia, Nho Que, Ma Pi Leng, Lung Cu and Tham Ma.</p><a href="ha-giang-loop-3-days.html">Explore the loop</a></article></div></div></section>`;

  const channels = () => data.contact.demo ? `<div class="contact-channels"><span><b>WhatsApp</b> ${esc(data.contact.phone)} <small>Demo · inactive</small></span><span><b>Email</b> ${esc(data.contact.email)} <small>Demo · inactive</small></span></div>` : `<div class="contact-channels"><a href="https://wa.me/${data.contact.phone.replace(/\D/g,'')}" target="_blank" rel="noopener">WhatsApp: ${esc(data.contact.phone)}</a><a href="mailto:${esc(data.contact.email)}">Email: ${esc(data.contact.email)}</a></div>`;

  const booking = bookingHtml => `<section id="contact" class="section wrap experience-section"><div class="surface booking-contact"><header class="section-heading"><div><div class="kicker">06 · Booking &amp; contact</div><h2>Book your next adventure.</h2></div><p>Choose your loop departure date and group size. If travelling from Hanoi, add your pickup needs.</p></header><div class="booking-layout"><div>${channels()}<ol class="deposit-flow"><li><span>01</span><div><strong>Request your trip</strong><p>Dates, travellers, route and Hanoi pickup.</p></div></li><li><span>02</span><div><strong>Confirm the quote</strong><p>Per-person price, included coach, other services and cancellation terms in writing.</p></div></li><li><span>03</span><div><strong>Agree the deposit</strong><p>Amount, due date and verified payment recipient confirmed before payment.</p></div></li></ol><p class="small-note">Deposit amount and payment method are not yet published. This site takes no payments.</p></div><form class="form" id="form"><p class="demo-contact-note contact-field-wide">${data.contact.demo?'Demo form · creates a draft only. No enquiry is sent and no booking is confirmed.':'Prepare an enquiry to send using your email app.'}</p><div class="contact-field"><label for="name">Your name</label><input id="name" name="name" autocomplete="name" required placeholder="Your name"></div><div class="contact-field"><label for="email">Email address</label><input id="email" name="email" autocomplete="email" type="email" required placeholder="Email address"></div><div class="contact-field contact-tour"><label for="package">Tour package</label><select id="package" name="package" required><option value="">Select your itinerary</option>${data.tours.map(t=>`<option value="${esc(t.value)}">${esc(t.value)}</option>`).join('')}</select></div><div class="contact-field contact-guests"><label for="guests">Travellers</label><input id="guests" name="guests" type="number" min="1" max="30" value="2" required></div><div class="date-row contact-field-wide"><div><label for="start">Loop departure date</label><input id="start" name="start" type="date" required></div><div><label for="end">Loop end date</label><input id="end" name="end" type="date" required></div></div><div class="contact-field contact-field-wide"><label for="pickup">Starting point</label><select id="pickup" name="pickup"><option>Hanoi pickup + coach to Ha Giang</option><option>Meet in Ha Giang City</option><option>Discuss another arrangement</option></select></div><div class="contact-field contact-field-wide"><label for="message">Trip notes</label><textarea id="message" name="message" rows="2" placeholder="Pickup location, arrival date, rooms or private-tour preferences"></textarea></div><button class="pill contact-field-wide" type="submit">Prepare booking enquiry ↗</button><div class="status contact-field-wide" id="status" role="status"></div></form></div><details class="booking-visual"><summary>See the booking journey</summary>${bookingHtml}</details></div></section>`;

  const home = bookingHtml => `<body class="experience-home"><a class="skip-link" href="#main-content">Skip to content</a><nav class="nav"><div class="wrap navin"><a class="brand" href="index.html#home"><img src="assets/logo.jpg" width="42" height="42" alt="Sky Ha Giang Loop logo"> SKY TRAVEL</a><div class="links" id="navigation"><a href="index.html#home">Home</a><a href="packages.html">Tour Packages</a><a href="itinerary.html">Itinerary</a><a href="story.html">Our Story</a><a href="gallery.html">Gallery &amp; Reviews</a><a class="pill" href="contact.html">Booking &amp; Contact</a></div><button class="menu" id="menu" aria-label="Open navigation" aria-controls="navigation" aria-expanded="false">☰</button></div></nav><header id="home" class="hero"><div class="wrap heroContent"><div class="eyebrow">Ha Giang, Vietnam · Hanoi pickup available</div><h1>Ha Giang Loop.<br><em>Your way.</em></h1><p>River canyons. Mountain passes. Village stories.<br>Choose a 3-day, 4-day or private journey through the northern highlands.</p><div class="actions"><a class="pill" href="contact.html">Book Your Tour ↗</a><a class="pill ghost" href="packages.html">Explore the packages ↓</a></div><div class="hero-facts"><span>3 days · USD 200–226/person</span><span>4 days · USD 250–270/person</span><span>Private · Tailored quote</span></div></div></header><main id="main-content"><section class="section packages wrap compact-collection" id="packages" aria-labelledby="packages-title"><div class="head"><div><div class="kicker">02 · Tour packages</div><h2 id="packages-title">Find your Ha Giang Loop.</h2></div><p class="intro">Three ways to travel. Two classic loops and a private journey shaped around your group.</p></div><div class="package-grid">${data.tours.map(card).join('')}</div><div class="tour-compare-link"><a href="packages.html">Compare all packages ↗</a><span>Hanoi pickup available · Quote confirmed before booking</span></div><p class="package-price-note">${esc(data.priceNote)}</p></section>${itinerary()}${story()}${gallery()}${booking(bookingHtml)}<div class="section wrap experience-section">${faqs()}</div></main><footer class="site-footer"><div class="wrap footer-grid"><div class="footer-brand"><b>${esc(data.brand)}</b><p>Ha Giang Loop journeys · 3 days, 4 days and private tours. Hanoi pickup and coach arrangements available.</p></div><div><h3>Explore</h3>${data.tours.map(t=>`<a href="${t.id}.html">${esc(t.title)}</a>`).join('<br>')}</div><div><h3>Contact</h3><p>${esc(data.contact.phone)}<br>${esc(data.contact.email)}<br><small>${data.contact.demo?'Demo details · not active':''}</small></p></div><div><h3>Before you travel</h3><a href="itinerary.html">Stops &amp; service details</a><br><a href="contact.html">Booking &amp; deposit process</a><br><a href="index.html#faq-title">Frequently asked questions</a></div></div><div class="wrap footer-bottom">© 2026 ${esc(data.brand)} · Prices and services confirmed before booking.</div></footer><script src="app.js" defer></script><script src="tour-interactions.js" defer></script><script src="travel-blog.js" defer></script><script src="booking-journey.js" defer></script><script src="site-experience.js" defer></script></body></html>`;

  const pageSections = {
    itinerary: () => `<section class="page-intro surface"><div class="kicker">03 · Itinerary</div><h1>Plan the road before you ride.</h1><p>Choose a clear pace through Ha Giang, then let your local guide adjust the order around weather, road conditions and your group's energy.</p></section>${itinerary()}`,
    story: () => `<section class="page-intro surface"><div class="kicker">04 · Our Story</div><h1>Travel with local perspective.</h1><p>Clear planning, practical advice and a route that leaves room for the people and places along the way.</p></section>${story().replace('href="#contact"','href="contact.html"')}`,
    gallery: () => `<section class="page-intro surface"><div class="kicker">05 · Gallery &amp; Reviews</div><h1>See the landscapes. Hear the stories.</h1><p>Explore real guest review stories, tour films and route photography from Du Gia Waterfall, Nho Que River, Ma Pi Leng Pass and Lung Cu Flag Tower.</p></section>${gallery()}`,
    contact: bookingHtml => `<section class="page-intro surface"><div class="kicker">06 · Booking &amp; Contact</div><h1>Let’s plan your mountain journey.</h1><p>Send your dates, group size and priorities. A local guide can suggest a practical route and explain which services are included or charged separately.</p></section>${booking(bookingHtml)}`,
    packages: () => `<section class="page-intro surface"><div class="kicker">02 · Tour Packages</div><h1>Three ways to experience Ha Giang.</h1><p>Compare the classic loops or ask for a private plan. Optional services are itemised separately and your guide helps you choose what fits.</p></section><div class="package-page-grid">${data.tours.map(card).join('')}</div>`
  };
  return {home, transfer, services, privatePlan, pageSections, dayVisuals};
};
