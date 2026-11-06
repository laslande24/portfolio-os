# PortfolioOS

> An interactive developer portfolio styled as a desktop operating system — draggable windows, a working terminal, dock magnification, and a real backend.

![Stack](https://img.shields.io/badge/React_19-TypeScript-blue) ![GSAP](https://img.shields.io/badge/GSAP-animations-88ce02) ![Supabase](https://img.shields.io/badge/Supabase-backend-3ecf8e) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS_4-styling-38bdf8)

## Features

- **Window manager built from scratch** — drag, resize, minimize, maximize, focus stacking (z-order), cascade positioning. No UI library.
- **GSAP animations** — boot sequence, window open/close/minimize transitions, macOS-style dock magnification with `gsap.quickTo`.
- **Working terminal** — command history (arrow keys), `help`, `whoami`, `skills`, `projects`, `open <app>` and more.
- **Real backend (Supabase)** — contact form messages stored in PostgreSQL with row-level security, plus anonymous page-view analytics. Falls back to `mailto:` when not configured.
- **Wallpaper settings** — persisted to `localStorage`.
- **Mobile fallback** — the OS metaphor needs a pointer, so phones get a clean single-column layout.

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | React 19, TypeScript, Vite |
| Styling | Tailwind CSS 4 |
| Animation | GSAP + `@gsap/react` |
| Backend | Supabase (PostgreSQL, RLS) |
| Icons | lucide-react |

## Getting started

```bash
git clone https://github.com/laslande24/portfolio-os.git
cd portfolio-os
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The app runs fully without a backend — the contact form falls back to your email client.

## Supabase setup (optional, ~5 minutes)

1. Create a free project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run the contents of [`supabase/schema.sql`](supabase/schema.sql).
3. Copy `.env.example` to `.env` and fill in your project URL and anon key (**Project Settings → API**).
4. Restart the dev server. Contact messages now land in the `messages` table; page views in `page_views`.

Security note: row-level security only allows anonymous `INSERT`. Nobody can read your messages without the service role key.

## Make it yours

All content lives in one file: [`src/lib/data.ts`](src/lib/data.ts) — name, bio, skills, experience, projects, wallpapers. Edit it and the whole OS updates.

## Project structure

```
src/
├── components/
│   ├── apps/          # The five applications (About, Projects, Terminal, Contact, Settings)
│   ├── Desktop.tsx    # Wallpaper, desktop icons, window rendering
│   ├── Window.tsx     # Draggable/resizable window chrome
│   ├── Dock.tsx       # Dock with GSAP magnification
│   ├── MenuBar.tsx    # Top bar with live clock
│   └── BootScreen.tsx # Boot animation
├── store/
│   ├── windows.tsx    # Window manager (reducer: open/close/focus/move/resize)
│   └── system.tsx     # System preferences (wallpaper)
├── lib/
│   ├── data.ts        # ← All portfolio content
│   ├── supabase.ts    # Backend client + graceful fallback
│   └── types.ts
└── hooks/
    └── useIsMobile.ts
```

## Scripts

| Command | Action |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Typecheck + production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Lint with oxlint |

## Deploy

Works out of the box on Vercel, Netlify or GitHub Pages (`npm run build`, serve `dist/`). Remember to set the two `VITE_SUPABASE_*` environment variables in your hosting dashboard.

## License

MIT
