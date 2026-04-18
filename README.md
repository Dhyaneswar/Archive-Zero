# Archive Zero

Standalone Next.js app for the Archive Zero fashion project.

## Local development

```bash
pnpm archive-zero:dev
```

## Production build

```bash
pnpm archive-zero:build
pnpm archive-zero:start
```

## Deployment notes

- Set `NEXT_PUBLIC_SITE_URL` to the final production origin.
- The app builds as a standard Next.js production app and is ready for platforms like Vercel or any Node host that runs `next build` and `next start`.
- Primary campaign assets live in `public/images/` and are local to this app.

## Routes

- `/`
- `/shop`
- `/shop/[slug]`
- `/archive`
- `/manifesto`
- `/lookbook`
- `/faq`
- `/contact`
- `/cart`
