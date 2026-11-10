# Immortal Journal

Production source for the existing journal storefront. Branding and messaging are preserved. Vercel serves the static website; Shopify supplies live product data, carts, checkout, and newsletter signup. Printify fulfillment remains managed through Shopify.

## Local commands
Use Node.js 24 (Node.js 22 or later supported).

```
npm ci
npm run check
npm run build
npm start
```

Open http://127.0.0.1:3000. These commands do not deploy anything.

Edit `public/` for page content, styling, and cart code. `scripts/build.mjs` copies those files into `dist/`, validates public configuration, and creates `dist/shopify-config.js`. Do not edit generated files. No runtime backend or third-party packages are needed.

## Vercel settings
Framework: Other. Root directory: repository root. Build command: `npm run build`. Output: `dist`. Install command: `npm ci`. `vercel.json` already sets build and output settings. Importing a repository and clicking Deploy publishes a Vercel URL; wait for owner approval first. Subsequent Git pushes can trigger deployments once connected to Vercel.

## Environment variables
All values below are public build-time settings. They are not secrets. Set them in Vercel's Production and Preview environments, then rebuild when they change. `.env.example` documents them; the dependency-free local build reads the shell environment, not `.env` files automatically.

| Variable | Value | Required? |
| --- | --- | --- |
| SHOPIFY_STORE_DOMAIN | gsyqjp-zz.myshopify.com | Optional; this default is built in |
| SHOPIFY_PRODUCT_HANDLE | immortal-journal | Optional; this default is built in |
| SHOPIFY_API_VERSION | 2026-07 | Optional; this default is built in; review Shopify API support periodically |
| SHOPIFY_STOREFRONT_URL | https://shop.immortaljournal.com after Shopify subdomain setup | Required before moving immortaljournal.com to Vercel; use https://immortaljournal.com while testing before that change |

No Shopify Admin token, Printify key, private Storefront token, GitHub token, or Vercel token belongs in this app or its browser configuration. The connected store currently permits tokenless Storefront product/cart operations. Checkout uses the HTTPS URL returned by Shopify; it must match the configured Shopify storefront hostname, the store's myshopify.com hostname, or checkout.shopify.com.

## Domain architecture — important
Keep a dedicated domain on Shopify before moving the main domain to Vercel:
- immortaljournal.com and www.immortaljournal.com: Vercel website.
- shop.immortaljournal.com: Shopify Online Store primary domain, checkout, newsletter forms, and policies.
- gsyqjp-zz.myshopify.com: stable Shopify API hostname.

See DEPLOYMENT.md for the ordered launch steps. Do not move the main domain before Shopify's subdomain is connected, primary, and working. Changing Shopify's primary domain also changes newly returned checkout URLs. Do not change returned checkout URLs manually.

## Newsletter
The Subscribe button opens the Shopify-hosted newsletter form at SHOPIFY_STOREFRONT_URL/#contact_form. Email entry and CAPTCHA run on Shopify's own domain. The earlier cross-origin POST from Vercel failed with “Missing CAPTCHA token” and has been removed. Subscription persistence still needs a real consenting signup check. Keep the hosted theme's contact_form newsletter ID intact or update the link if that form changes.

## Source control and security
`.gitignore` excludes environment files, generated output, dependencies, and Vercel credentials. For a new GitHub repository, upload public/, scripts/, .github/, package.json, package-lock.json, vercel.json, .gitignore, .env.example and the Markdown documentation. Omit legacy .openai/ metadata, .git/, generated dist/ and environment files. GitHub Actions runs build checks only. No deployment action is included.

BRAND.md contains the owner's original brand foundation. DEPLOYMENT.md explains launch and rollback. VALIDATION.md records checks and remaining limits.
