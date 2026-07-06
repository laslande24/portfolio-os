export type AppId = "about" | "projects" | "terminal" | "contact" | "settings";

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
  /** Geometry saved before maximizing, restored on unmaximize */
  prev?: { x: number; y: number; w: number; h: number };
}

export interface Project {
  name: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  gradient: string;
  year: string;
}

export interface Profile {
  name: string;
  role: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  bio: string;
  skills: { category: string; items: string[] }[];
  experience: { period: string; title: string; place: string; detail: string }[];
}
