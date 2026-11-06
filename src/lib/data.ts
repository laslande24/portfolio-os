import type { Profile, Project } from "./types";

// Same facts as the current portfolio (portfolio-romaric-soh/src/content/profile.ts).
// Public contact only: no phone number, no date of birth.

export const profile: Profile = {
  name: "Romaric Soh",
  role: "Front-end and full-stack developer",
  location: "Douala, Cameroon",
  email: "sohromaric30@gmail.com",
  github: "https://github.com/laslande24",
  linkedin: "https://linkedin.com/in/romaric-fogang-soh",
  bio: "Developer based in Douala, Cameroon. I design and build web and mobile apps, from the Figma prototype to the database rules, and I am at home in French, English and German. Open to remote work and to relocating. This desktop is my previous portfolio; the current one is at romaricsoh.vercel.app.",
  skills: [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Motion"] },
    { category: "Mobile", items: ["Expo", "React Native", "Reanimated"] },
    { category: "Backend", items: ["Supabase", "PostgreSQL", "Symfony", "Django", "Express"] },
    { category: "Design & quality", items: ["Figma", "UML", "WCAG 2.2", "Playwright", "Vitest"] },
  ],
  experience: [
    {
      period: "May 2024 — Feb 2025",
      title: "Web developer",
      place: "AFREETECH, Yaoundé",
      detail: "Public-sector platforms in Cameroon: Figma prototype and React front end with map layers for PAGIRN-PPTIC, features for the OBSDATA weather app in Symfony and React, specifications and user guides.",
    },
    {
      period: "Dec 2023 — Apr 2024",
      title: "Software development intern",
      place: "QTA TECH, Douala",
      detail: "Modelled in UML and designed in Figma, then built a hybrid app for pre-financing requests with an AI integration, from analysis to delivery.",
    },
    {
      period: "Jun — Oct 2021",
      title: "Mobile development intern",
      place: "Peers Exchange (PEEXIT), Douala",
      detail: "Worked on a hybrid mobile app in React Native.",
    },
  ],
};

export const projects: Project[] = [
  {
    name: "Redekunst-Challenge",
    description:
      "Registrations and live public voting for a German-language debate contest. Postgres with row-level security, votes over Supabase Realtime, a projection screen that updates as they arrive.",
    tags: ["Next.js", "Supabase", "Realtime", "Tailwind"],
    demo: "https://romaricsoh.vercel.app/en/work/redekunst-challenge",
    gradient: "from-red-500 via-red-700 to-stone-900",
    year: "2026",
  },
  {
    name: "Laufwort",
    description:
      "Practise German while you run: lessons spoken aloud, answers given out loud, sessions that adapt to your effort. A very animated native interface.",
    tags: ["Expo", "React Native", "Reanimated", "TypeScript"],
    github: "https://github.com/laslande24/laufwort",
    demo: "https://romaricsoh.vercel.app/en/work/laufwort",
    gradient: "from-lime-300 via-lime-500 to-emerald-700",
    year: "2026",
  },
  {
    name: "7SETS",
    description:
      "A landing page for a tennis academy, built from a designer's mockup. The page scrolls like a match, with GSAP choreography, WCAG 2.2 AA and Playwright tests.",
    tags: ["Next.js", "GSAP", "Lenis", "Playwright"],
    github: "https://github.com/laslande24/7sets",
    demo: "https://romaricsoh.vercel.app/en/work/7sets",
    gradient: "from-lime-400 via-emerald-700 to-slate-900",
    year: "2026",
  },
  {
    name: "PortfolioOS",
    description:
      "This desktop: a window manager written without a UI library, a GSAP boot sequence, a dock with magnification, and contact messages stored in Supabase.",
    tags: ["React", "Vite", "GSAP", "Supabase"],
    github: "https://github.com/laslande24/portfolio-os",
    gradient: "from-stone-500 via-stone-700 to-stone-950",
    year: "2026",
  },
];

export const wallpapers = [
  { id: "aurora", name: "Aurora", css: "radial-gradient(ellipse 80% 60% at 20% 10%, #312e81 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 80% 20%, #701a75 0%, transparent 50%), radial-gradient(ellipse 70% 60% at 60% 90%, #1e3a5f 0%, transparent 55%), #0a0a12" },
  { id: "ember", name: "Ember", css: "radial-gradient(ellipse 70% 60% at 15% 85%, #7c2d12 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 85% 15%, #831843 0%, transparent 50%), #0c0a09" },
  { id: "abyss", name: "Abyss", css: "radial-gradient(ellipse 80% 70% at 50% 100%, #0e3a3a 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 10%, #164e63 0%, transparent 55%), #060a0c" },
] as const;

export type WallpaperId = (typeof wallpapers)[number]["id"];
