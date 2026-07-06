import type { Profile, Project } from "./types";

/**
 * ── EDIT THIS FILE ─────────────────────────────────────────────
 * All portfolio content lives here. Replace the placeholder
 * values with your own information before deploying.
 */

export const profile: Profile = {
  name: "Your Name",
  role: "Fullstack Developer",
  location: "Paris, France",
  email: "you@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  bio: "Fullstack developer specialized in JavaScript, PHP and Python. I build useful, polished web applications — from database schema to pixel-perfect UI.",
  skills: [
    { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "GSAP", "Vite"] },
    { category: "Backend", items: ["Node.js", "PHP", "Python", "REST APIs", "Supabase"] },
    { category: "Database", items: ["PostgreSQL", "MySQL", "Redis"] },
    { category: "Tools", items: ["Git", "Docker", "Linux", "CI/CD"] },
  ],
  experience: [
    {
      period: "2024 — Present",
      title: "Fullstack Developer",
      place: "Freelance",
      detail: "Building web applications for clients — React frontends, PHP/Node backends, PostgreSQL databases.",
    },
    {
      period: "2023 — 2024",
      title: "Junior Developer",
      place: "Company Name",
      detail: "Developed and maintained internal tools. Shipped features across the full stack.",
    },
  ],
};

export const projects: Project[] = [
  {
    name: "PortfolioOS",
    description:
      "This very site — an interactive portfolio styled as a desktop operating system. Draggable windows, working terminal, dock with magnification.",
    tags: ["React", "TypeScript", "GSAP", "Supabase"],
    github: "https://github.com/yourusername/portfolio-os",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    year: "2026",
  },
  {
    name: "Project Two",
    description:
      "Short description of a real project you built. What problem does it solve, and what makes it interesting technically?",
    tags: ["PHP", "MySQL", "Tailwind"],
    github: "https://github.com/yourusername/project-two",
    demo: "https://example.com",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    year: "2025",
  },
  {
    name: "Project Three",
    description:
      "Another project. Keep descriptions to two sentences — enough to hook a recruiter into clicking the GitHub link.",
    tags: ["Python", "FastAPI", "PostgreSQL"],
    github: "https://github.com/yourusername/project-three",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    year: "2025",
  },
  {
    name: "Project Four",
    description:
      "A fourth project slot. Delete or duplicate these entries as needed — the grid adapts automatically.",
    tags: ["JavaScript", "Node.js", "Redis"],
    github: "https://github.com/yourusername/project-four",
    gradient: "from-sky-500 via-blue-500 to-indigo-500",
    year: "2024",
  },
];

export const wallpapers = [
  { id: "aurora", name: "Aurora", css: "radial-gradient(ellipse 80% 60% at 20% 10%, #312e81 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 80% 20%, #701a75 0%, transparent 50%), radial-gradient(ellipse 70% 60% at 60% 90%, #1e3a5f 0%, transparent 55%), #0a0a12" },
  { id: "ember", name: "Ember", css: "radial-gradient(ellipse 70% 60% at 15% 85%, #7c2d12 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 85% 15%, #831843 0%, transparent 50%), #0c0a09" },
  { id: "abyss", name: "Abyss", css: "radial-gradient(ellipse 80% 70% at 50% 100%, #0e3a3a 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 10%, #164e63 0%, transparent 55%), #060a0c" },
] as const;

export type WallpaperId = (typeof wallpapers)[number]["id"];
