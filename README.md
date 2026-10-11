# Sky Ha Giang Loop

Complete static travel website copied from `thanhrep/demo` at commit
`172e45bc279cc139500753fa7b11bfc82f1d1045`.

Production domain: https://skyhagiangloop.com/

GitHub Pages uses the GitHub Actions workflow in `.github/workflows/pages.yml`.
The workflow adds versioned carousel, blog, booking and background assets before
publishing. Keep GitHub Pages set to **GitHub Actions** and set its custom domain
to `skyhagiangloop.com` in repository settings.

Checks:

```sh
node build-site.cjs
node tests/client-content.test.cjs
node tests/background-startup.test.cjs
node tests/booking-journey.test.cjs
```

The original `thanhrep/demo` repository and `sportxauth.com` deployment are not
modified by this copy.
## Six-section client experience

`tours.json` is the editorial source for the client itineraries and price ranges. Run
`node build-site.cjs` after editing it. The build updates the homepage cards,
enquiry options, shared browser catalogue, comparison page, standalone tour
pages, sitemap and structured data. The workflow builds and tests before it
deploys, versioning CSS and JS with the commit SHA.

The homepage presents Home, Tour Packages, Itinerary, Our Story, Gallery & Reviews,
and Booking & Contact. `site-sections.cjs` produces accessible static content;
`site-experience.css` and `site-experience.js` add responsive layout, expandable
day plans and gentle route-diagram animation without replacing the panorama.

Classic packages are 3 days / 2 nights (USD 200–226 per person) and 4 days / 3 nights
(USD 250–270 per person), plus a private tour with a tailored quote. The owner
confirmed that classic prices include Hanoi pickup and coach travel to Ha Giang
City. Coach type, pickup time/point, other services and onward/return travel are
confirmed in writing. Rooms, meals, guides, fees, insurance and the final-day
waterfall are not advertised as guaranteed inclusions. Lung Tam is a researched,
proposed weaving-village stop, subject to access and the agreed route.

Photos are inherited illustrative assets, not verified customer photography.
No customer videos, testimonials, ratings or guide profiles are fabricated.
Replace labelled previews and pending-media notices with owner-approved material.

The contact details are intentionally demo placeholders (`hello@example.com`
and `+84 000 000 000`) per the owner's instruction. The form prepares a local
draft with a copy button only; it does not send anything or take payment.
Replace the contact settings with owner-verified information before enabling
real email enquiries. Deposit amount, recipient and cancellation terms must be
confirmed before accepting money. The local draft is not a reservation.
Structured data reflects only the supplied per-person price ranges and itinerary;
do not invent reviews, ratings or availability for SEO.
