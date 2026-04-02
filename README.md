# Lumen Axis — scroll landing page

Single-page React (Vite) landing with **Framer Motion**: viewport-triggered reveals (`whileInView` + `once`), **parallax** via `useScroll` / `useTransform`, and a spring-smoothed scroll progress indicator.

## Scripts

- `npm install` — install dependencies  
- `npm run dev` — local dev server  
- `npm run build` — typecheck + production build (`dist/`)  
- `npm run preview` — preview the production build  

## Push to GitHub (automates deploy via Actions)

GitHub CLI is required ([install](https://cli.github.com/)). From the **repository root** (`landing-scroll/`):

1. Log in once (browser or token):  
   `& "$env:ProgramFiles\GitHub CLI\gh.exe" auth login`
2. Create the remote repo and push (change `landing-scroll` if your repo name differs):  
   `powershell -ExecutionPolicy Bypass -File .\scripts\push-to-github.ps1`

Or manually:

```bash
git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
git push -u origin master
```

### Enable GitHub Pages (first time only)

On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.  
Every push to `main` or `master` runs `.github/workflows/deploy-github-pages.yml` and publishes `dist/`.

Your site URL: `https://YOUR_USER.github.io/YOUR_REPO/` (Vite `base` is set from `BASE_URL` in that workflow).

## Netlify (continuous deploy from Git)

1. Push the repo to GitHub (above).  
2. [Netlify](https://app.netlify.com) → **Add new site** → **Import an existing project** → pick the repo.  
3. Build settings are read from **`netlify.toml`** (`npm run build`, publish `dist`). No extra config needed.

CLI alternative (optional): install Netlify CLI, run `netlify init`, then builds deploy on every git push from Netlify’s Git integration.

## Deploy (Vercel)

1. Push this repo to GitHub.  
2. In [Vercel](https://vercel.com), import the repo.  
3. Framework preset: **Vite**. Build: `npm run build`, output: `dist`.  

Reduced motion: components use `useReducedMotion` from Framer Motion where relevant.
