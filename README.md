# Glazed Pottery Shop — React Prototype V3

A mobile-first React/Vite prototype for Mandy Krolak’s Glazed Pottery Shop, designed around a future Etsy → Shopify transition.

## Run locally

```bash
npm install
npm run dev
```

Open the Vite localhost URL, usually `http://localhost:5173/`.

## What changed in V3

- Full-bleed parallax hero instead of the repeated split-screen hero pattern
- Removed the overlapping hero mini-card and decorative teal blob
- Softer, modern type system with the existing Glazed logo as the primary personality
- Simplified shop category navigation and product cards
- Copy grounded more directly in Mandy’s uploaded bio and current Etsy shop language
- Cleaner studio / class / membership UI
- Rebuilt Glaze Lab as an interactive ceramic test tile instead of a CSS mug
- Added oxidation/reduction mode and a clear chemistry disclaimer
- Preserved Raku smoke interactions, cart drawer, mobile bottom nav and Shopify-ready service layer

## Shopify

The prototype catalog remains isolated in `src/data/products.js`. The `src/services/shopify.js` service is the handoff point for replacing prototype data with Shopify Storefront API results later.

## V3.3 refinement pass

- Tightened the Shop → Classes transition so the page no longer stalls in empty white space.
- Reduced the Glaze Lab intro scale and spacing so the headline and interactive tool read together in one viewport on desktop.
- Replaced the vertical teal Story accent with a short horizontal brand mark so it reads as intentional decoration rather than a scrollbar.


## V3.7 mobile refinement
Optimized the trust strip, experience selectors, membership cards, form/function section, Glaze Lab, reviews and footer for phone-sized screens. Reviews, class choices and memberships use touch-friendly horizontal snap rails to reduce excessive vertical scrolling. The header glint also fades in after the visitor begins scrolling.
