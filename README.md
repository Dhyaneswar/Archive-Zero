# Archive Zero

Archive Zero is a standalone Next.js luxury fashion website for a limited-run clothing brand built around emotion, scarcity, and cinematic storytelling.

The site is designed as a high-end editorial product experience rather than a generic ecommerce template. It includes immersive page composition, animated lookbook storytelling, a custom comet-style cursor system, product and cart flows, and a reusable component system for the full brand universe.

## What This Repo Contains

- A complete public website for the Archive Zero brand
- A custom visual system with premium typography, atmospheric backgrounds, glass surfaces, and editorial spacing
- Route-level pages for shopping, manifesto, archive, lookbook, FAQ, contact, cart, and 404 handling
- Motion-driven UI patterns including page transitions, parallax scenes, scrollytelling sections, and cursor effects
- Local brand imagery and campaign assets stored inside the repo

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion

## Main Routes

- `/` - Home
- `/shop` - Current drop / shop grid
- `/shop/[slug]` - Product detail page
- `/archive` - Brand archive and drop structure
- `/manifesto` - Brand story / manifesto
- `/lookbook` - Narrative editorial lookbook
- `/faq` - Frequently asked questions
- `/contact` - Waitlist and contact page
- `/cart` - Cart page
- `app/not-found.tsx` - Custom 404

## Notable Systems

### Narrative Lookbook

The lookbook is built as a scrollytelling experience rather than a simple image gallery. It uses layered motion, reveal choreography, and editorial pacing to create a cinematic progression through scenes.

Key files:

- `components/scrollytelling-lookbook.tsx`
- `components/parallax-scene.tsx`
- `components/decrypted-text.tsx`

### Cursor Aura

The cursor system uses a custom canvas-based comet effect tuned for a luxury, atmospheric feel. The current implementation focuses on smooth motion, a bright cursor head, and a dissipating plume rather than a generic pointer replacement.

Key file:

- `components/cursor-aura.tsx`

### Commerce UI

The repo includes a lightweight shopping flow with reusable product cards, a product purchase panel, cart state, cart drawer, and cart page.

Key files:

- `components/product-card.tsx`
- `components/product-purchase-panel.tsx`
- `components/cart-context.tsx`
- `components/cart-drawer.tsx`
- `components/cart-page-client.tsx`

## Project Structure

```text
app/
  archive/
  cart/
  contact/
  faq/
  lookbook/
  manifesto/
  shop/
components/
lib/
public/images/
```

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:3000
```

## Production Build

Build the app:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Environment

Use `.env.example` as the starting point for local or deployed configuration.

Important variable:

- `NEXT_PUBLIC_SITE_URL` - the final public site URL used for metadata and production output

## Assets

Brand and campaign imagery is stored locally in:

- `public/images/`

This keeps the app self-contained and avoids dependence on third-party image hosts for core presentation.

## Notes

- This repo is intentionally standalone and separate from other projects in the workspace.
- The visual direction prioritizes premium editorial atmosphere, cinematic motion, and luxury product storytelling.
- The app builds as a standard Next.js production application and can be deployed to platforms such as Vercel or any Node host that supports `next build` and `next start`.
