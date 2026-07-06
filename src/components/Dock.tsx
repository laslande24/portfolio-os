import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { User, FolderKanban, TerminalSquare, Mail, Settings } from "lucide-react";
import type { AppId } from "../lib/types";
import { useWindows } from "../store/windows";

const DOCK_APPS: { appId: AppId; label: string; icon: typeof User; bg: string }[] = [
  { appId: "about", label: "About Me", icon: User, bg: "from-sky-400 to-blue-600" },
  { appId: "projects", label: "Projects", icon: FolderKanban, bg: "from-violet-400 to-purple-600" },
  { appId: "terminal", label: "Terminal", icon: TerminalSquare, bg: "from-zinc-600 to-zinc-900" },
  { appId: "contact", label: "Contact", icon: Mail, bg: "from-emerald-400 to-teal-600" },
  { appId: "settings", label: "Settings", icon: Settings, bg: "from-slate-400 to-slate-600" },
];

export default function Dock() {
  const dockRef = useRef<HTMLDivElement>(null);
  const { state, dispatch } = useWindows();

  /* macOS-style magnification: scale icons by cursor proximity */
  useGSAP(
    (_, contextSafe) => {
      const dock = dockRef.current!;
      const icons = gsap.utils.toArray<HTMLElement>(".dock-icon", dock);
      const quickScales = icons.map((icon) =>
        gsap.quickTo(icon, "scale", { duration: 0.25, ease: "power2.out" }),
      );

      const onMove = contextSafe!((e: MouseEvent) => {
        icons.forEach((icon, i) => {
          const rect = icon.getBoundingClientRect();
          const center = rect.left + rect.width / 2;
          const dist = Math.abs(e.clientX - center);
          const scale = Math.max(1, 1.55 - dist / 120);
          quickScales[i](scale);
        });
      });
      const onLeave = contextSafe!(() => {
        quickScales.forEach((setScale) => setScale(1));
      });

      dock.addEventListener("mousemove", onMove);
      dock.addEventListener("mouseleave", onLeave);
      return () => {
        dock.removeEventListener("mousemove", onMove);
        dock.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: dockRef },
  );

  const openApps = new Set(state.windows.map((win) => win.appId));

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-3 z-[9999] flex justify-center">
      <div
        ref={dockRef}
        className="glass pointer-events-auto flex items-end gap-3 rounded-2xl px-4 pt-3 pb-2"
      >
        {DOCK_APPS.map(({ appId, label, icon: Icon, bg }) => (
          <button
            key={appId}
            onClick={() => dispatch({ type: "OPEN", appId })}
            className="group relative flex flex-col items-center"
            aria-label={`Open ${label}`}
          >
            <span className="pointer-events-none absolute -top-9 rounded-md bg-black/80 px-2 py-1 text-[11px] whitespace-nowrap text-white opacity-0 transition group-hover:opacity-100">
              {label}
            </span>
            <span
              className={`dock-icon grid h-12 w-12 origin-bottom place-items-center rounded-xl bg-gradient-to-br ${bg} shadow-lg shadow-black/40`}
            >
              <Icon size={24} className="text-white" strokeWidth={1.8} />
            </span>
            <span
              className={`mt-1 h-1 w-1 rounded-full bg-white/80 transition ${openApps.has(appId) ? "opacity-100" : "opacity-0"}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
