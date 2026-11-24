# Rey's Auto Repair Shop

Marketing site and appointment request form for Rey's Auto Repair Shop, Little Havana, Miami.
Vite + React + GSAP (hero entrance only).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output in dist/
npm run preview  # serves dist/ with the same CSP as production
```

## Structure
- `src/data/business.js`: every business fact (phone, address, hours, services). Edit here.
- `src/components/`: one file per section.
- `src/lib/`: opening-hours logic (Miami time) and the appointment form (validation + send).
- `supabase/`: SQL migration and setup notes for storing appointment requests.
- `public/_headers`: security headers (Netlify). `public/img`: photographs.

## Before launch
- Replace the stand-in photographs in `public/img` with the shop's own (credit line in the footer goes away with them).
- Set the real domain in `index.html` (`canonical`) and add a sitemap.
- Connect Supabase (see `supabase/README.md`); without it the form runs in demo mode.
- Add bot protection (Turnstile or hCaptcha) on the form.
