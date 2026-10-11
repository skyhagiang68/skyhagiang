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
node tests/background-startup.test.cjs
node tests/booking-journey.test.cjs
```

The original `thanhrep/demo` repository and `sportxauth.com` deployment are not
modified by this copy.
demo web
