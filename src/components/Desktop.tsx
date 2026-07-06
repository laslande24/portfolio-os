import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { User, FolderKanban, TerminalSquare, Mail } from "lucide-react";
import type { AppId } from "../lib/types";
import { wallpapers } from "../lib/data";
import { useSystem } from "../store/system";
import { useWindows } from "../store/windows";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import Window from "./Window";
import AboutApp from "./apps/AboutApp";
import ProjectsApp from "./apps/ProjectsApp";
import TerminalApp from "./apps/TerminalApp";
import ContactApp from "./apps/ContactApp";
import SettingsApp from "./apps/SettingsApp";

const APP_COMPONENTS: Record<AppId, React.ComponentType> = {
  about: AboutApp,
  projects: ProjectsApp,
  terminal: TerminalApp,
  contact: ContactApp,
  settings: SettingsApp,
};

const DESKTOP_ICONS: { appId: AppId; label: string; icon: typeof User }[] = [
  { appId: "about", label: "About Me", icon: User },
  { appId: "projects", label: "Projects", icon: FolderKanban },
  { appId: "terminal", label: "Terminal", icon: TerminalSquare },
  { appId: "contact", label: "Contact", icon: Mail },
];

export default function Desktop() {
  const ref = useRef<HTMLDivElement>(null);
  const { wallpaper } = useSystem();
  const { state, dispatch } = useWindows();

  const wallpaperCss = wallpapers.find((wp) => wp.id === wallpaper)?.css ?? wallpapers[0].css;

  useGSAP(
    () => {
      gsap.from(".desktop-icon", {
        opacity: 0,
        x: -16,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.2,
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="noise relative h-full w-full overflow-hidden" style={{ background: wallpaperCss }}>
      <MenuBar />

      {/* Desktop icons */}
      <div className="absolute top-12 left-4 flex flex-col gap-4">
        {DESKTOP_ICONS.map(({ appId, label, icon: Icon }) => (
          <button
            key={appId}
            onDoubleClick={() => dispatch({ type: "OPEN", appId })}
            className="desktop-icon group flex w-20 flex-col items-center gap-1.5 rounded-lg p-2 transition hover:bg-white/5"
            title={`Double-click to open ${label}`}
          >
            <span className="glass-light grid h-13 w-13 place-items-center rounded-xl transition group-hover:bg-white/10">
              <Icon size={26} className="text-white/90" strokeWidth={1.6} />
            </span>
            <span className="text-[11px] font-medium text-white/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]">
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Hint for first-time visitors */}
      {state.windows.length === 0 && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <p className="rounded-xl bg-black/30 px-5 py-3 text-sm text-white/50 backdrop-blur-sm">
            Double-click an icon or use the dock below ↓
          </p>
        </div>
      )}

      {/* Windows */}
      {state.windows.map((win) => {
        const App = APP_COMPONENTS[win.appId];
        return (
          <Window key={win.id} win={win}>
            <App />
          </Window>
        );
      })}

      <Dock />
    </div>
  );
}
