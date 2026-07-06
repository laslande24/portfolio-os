import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { wallpapers, type WallpaperId } from "../lib/data";

interface SystemState {
  wallpaper: WallpaperId;
  setWallpaper: (id: WallpaperId) => void;
}

const SystemContext = createContext<SystemState | null>(null);

export function SystemProvider({ children }: { children: ReactNode }) {
  const [wallpaper, setWallpaper] = useState<WallpaperId>(() => {
    const saved = localStorage.getItem("portfolio-os:wallpaper");
    return wallpapers.some((wp) => wp.id === saved) ? (saved as WallpaperId) : "aurora";
  });

  useEffect(() => {
    localStorage.setItem("portfolio-os:wallpaper", wallpaper);
  }, [wallpaper]);

  return <SystemContext.Provider value={{ wallpaper, setWallpaper }}>{children}</SystemContext.Provider>;
}

export function useSystem() {
  const ctx = useContext(SystemContext);
  if (!ctx) throw new Error("useSystem must be used within SystemProvider");
  return ctx;
}
