# Etsy → Shopify migration plan for Glazed Pottery Shop

This build is already structured so the storefront UI can stay largely unchanged when the source of truth moves from prototype data to Shopify.

## Phase 1 — Set up Shopify

- Create the Shopify store and connect the domain.
- Match Glazed brand colors, logo, policies, shipping settings, taxes, and contact information.
- Decide whether checkout lives entirely in Shopify (recommended) while this React site acts as a custom headless storefront.

## Phase 2 — Move the Etsy catalog

Preferred order of operations:

1. Export any Etsy listing/order data available from Etsy.
2. Move product titles, descriptions, SKUs, variants, prices, quantities, and images into Shopify using Shopify's CSV/import tools or a migration app.
3. Use the Etsy API only when it adds value and the account/app permissions support the needed data.
4. Avoid making scraping the permanent production sync. It is more fragile than using supported exports/APIs and can break when Etsy markup changes.
5. QA every item after import, especially image order, quantities, shipping weights, and one-of-a-kind inventory.

## Phase 3 — Connect this React storefront

- Create a Shopify Storefront API token.
- Load product data into the existing product grid.
- Replace the prototype cart with Shopify Cart API calls.
- Redirect checkout to Shopify's hosted checkout.
- Add customer accounts only if Mandy wants them.

## Phase 4 — Classes, studio reservations, memberships

Keep these separate from product inventory in the UI, even if payment is processed through Shopify.

Possible approaches:

- Shopify appointment/booking app for the fastest launch
- Acuity/Square/Calendly embeds for classes and studio time
- Shopify subscriptions app for membership billing
- Custom Supabase booking database later if the studio workflow becomes complex

## Phase 5 — Etsy transition messaging

For the first 30–90 days, keep a clear notice:

> We moved! Same Glazed Pottery Shop, same handmade work — now with easier shopping, classes, studio bookings, and member access in one place.

Keep Etsy open during the transition if Mandy wants continuity, then gradually direct social/email traffic to the Shopify-powered site.

## Why the custom site + Shopify combination works

- Shopify remains the reliable commerce engine for inventory, payment, checkout, discounts, taxes, and orders.
- The custom React storefront gives Glazed much more control over visual storytelling, class booking, membership, studio/community features, and interactive brand moments.
- Mandy owns the primary customer journey instead of building the whole brand inside a marketplace template.
