# Launch guide — nothing has been deployed

The source is prepared locally. Do not click Deploy, connect auto-deploy, push to a Vercel-connected repository, or change DNS until you approve launch.

## Step 1 — Prepare your accounts
Sign in to GitHub and Vercel. Use a private GitHub repository named `immortal-journal`. Keep the main domain at Shopify until the preview is checked. If assistance is needed, tell the assistant once both accounts are ready; it can guide the next screen.

## Step 2 — Put the prepared source on GitHub
Upload the prepared source files to the private repository: public/, scripts/, .github/, package.json, package-lock.json, vercel.json, .gitignore, .env.example, README.md, BRAND.md, DEPLOYMENT.md and VALIDATION.md. The top level must contain `package.json`, `vercel.json`, `public/`, and `scripts/` — not another enclosing folder. Include the .github folder for build checks. Do not upload .git, .openai, .vercel, dist, .env files, or old Sites credentials. No app secrets are required. Keep this repository disconnected from Vercel until deployment approval.

## Step 3 — Deploy a test URL only after approval
In Vercel select Add New > Project > Import Git Repository and choose the repository. Framework Preset: Other. Root: repository root. Build Command: npm run build. Output Directory: dist. Install Command: npm ci. Node: 24.x.

Under Environment Variables initially use:
- SHOPIFY_STORE_DOMAIN = gsyqjp-zz.myshopify.com
- SHOPIFY_PRODUCT_HANDLE = immortal-journal
- SHOPIFY_API_VERSION = 2026-07
- SHOPIFY_STOREFRONT_URL = https://immortaljournal.com

These are public settings, not passwords. Apply to Preview and Production. Do not add Admin, Printify, or private Storefront tokens. Clicking Deploy publishes a Vercel address and requires your approval. Keep the custom domain untouched while testing it. Use Vercel deployment protection if the test should be private; confirm its availability for your account.

## Step 4 — Accept the test deployment
Open the Vercel URL on a computer and phone. Check the product, add/remove a journal, and open checkout. Confirm the journal, quantity, currency, and shipping options. Do not enter payment unless you intend to order or have deliberately enabled Shopify's test payment mode.

Submit a newsletter signup using an address you control, complete any Shopify challenge, and confirm it appears in Shopify Customers with email marketing consent. No test subscriber has been created by the assistant.

In Shopify, verify shipping rates, taxes, refund/privacy policies, payment provider, and Printify product/variant mapping. A completed test order and its arrival in Printify remain merchant acceptance checks. Prevent test orders from entering paid Printify production according to your Printify settings. Do not assume API cart checks verify fulfillment.

## Step 5 — Give Shopify its own address before the domain switch
Recommended address: shop.immortaljournal.com. In your DNS provider add a CNAME record named `shop` pointing to `shops.myshopify.com`; if Shopify manages the domain, use Shopify Settings > Domains > Add subdomain. Then connect shop.immortaljournal.com in Shopify Settings > Domains, target it to Online Store, and make it Shopify's primary domain. Wait for Shopify to confirm the connection and TLS certificate.

Open https://shop.immortaljournal.com and confirm Shopify serves it. Create a fresh cart from the test website and verify its returned checkout URL reaches Shopify, not the Vercel website. Configure SHOPIFY_STOREFRONT_URL = https://shop.immortaljournal.com for both Vercel environments and redeploy after approval. Repeat newsletter signup and checkout checks on that address. Leave the tokenless API domain unchanged.

Important: the newsletter form and checkout depend on this Shopify domain. Do not point shop.immortaljournal.com at Vercel. Do not move the main domain while Shopify still redirects its forms/checkout to it.

## Step 6 — Connect the main domain to Vercel after launch approval
In Vercel Project > Settings > Domains, add immortaljournal.com and www.immortaljournal.com. Choose immortaljournal.com as the main website and redirect www to it. Follow the exact DNS records Vercel shows for this project; do not copy an old generic Vercel IP from a guide.

At the DNS provider, replace only the conflicting website A/AAAA/CNAME records for @ and www with Vercel's requested values. Keep shop pointed at Shopify. Preserve MX, SPF, DKIM, DMARC, TXT verification, and all other email/service records. Save a copy of old DNS records first. Wait for Vercel to show a valid configuration and HTTPS certificate, which may take up to 48 hours. A domain transfer is not needed.

## Step 7 — Final check and rollback
Check HTTPS on apex and www, product images and live price, add/remove cart, Shopify checkout, newsletter capture, shipping and policies on phone and desktop. Recheck Shopify primary-domain redirects. Ensure existing product links used in marketing have an intentional destination; this single-page site does not recreate every old Shopify URL.

If the website build is bad, use Vercel's previous deployment rollback. If domain routing is bad, restore the saved @/www DNS records and recheck Shopify's primary domain; DNS rollback takes time. Keep the Shopify subscription and Printify integration active.

## Reference
Shopify domain architecture: https://shopify.dev/docs/storefronts/hydrogen/deploy/go-live
Shopify newsletter: https://shopify.dev/docs/storefronts/themes/customer-engagement/email-consent
Vercel domain configuration: https://vercel.com/docs/domains/working-with-domains/add-a-domain
