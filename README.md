# Lumen Axis — scroll landing page

Single-page React (Vite) landing with **Framer Motion**: viewport-triggered reveals (`whileInView` + `once`), **parallax** via `useScroll` / `useTransform`, and a spring-smoothed scroll progress indicator.

## Scripts

- `npm install` — install dependencies  
- `npm run dev` — local dev server  
- `npm run build` — typecheck + production build (`dist/`)  
- `npm run preview` — preview the production build  

## Deploy (Vercel)

1. Push this folder to GitHub.  
2. In [Vercel](https://vercel.com), import the repo.  
3. Framework preset: **Vite**. Build command: `npm run build`, output: `dist`.  

## Deploy (Netlify)

Build command: `npm run build`, publish directory: `dist`.

Reduced motion: components use `useReducedMotion` from Framer Motion where relevant.
