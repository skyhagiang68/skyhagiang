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
## Client itinerary update

`tours.json` is the editorial source for the two client itineraries. Run
`node build-site.cjs` after editing it. The build updates the homepage cards,
enquiry options, shared browser catalogue, comparison page, standalone tour
pages, sitemap and structured data. The workflow builds and tests before it
deploys, versioning CSS and JS with the commit SHA.

Only two itineraries are offered: 3 days / 2 nights and 4 days / 3 nights.
Transport, prices, rooms, meals, fees and the final-day waterfall require written
confirmation. Lung Tam is a researched, proposed weaving-village stop, not an
unconditionally guaranteed visit. Photos are inherited illustrative assets.

The contact details are intentionally demo placeholders (`hello@example.com`
and `+84 000 000 000`) per the owner's instruction. The form prepares a local
draft with a copy button only; it does not send anything or take payment.
Replace the contact settings with owner-verified information before enabling
real email enquiries. Do not invent offers, reviews, ratings or availability
for SEO.
