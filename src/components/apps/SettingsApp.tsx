import { Check, Monitor, Info } from "lucide-react";
import { wallpapers } from "../../lib/data";
import { useSystem } from "../../store/system";

export default function SettingsApp() {
  const { wallpaper, setWallpaper } = useSystem();

  return (
    <div className="p-6 text-white/90">
      <h1 className="flex items-center gap-2 text-lg font-bold text-white">
        <Monitor size={18} /> Appearance
      </h1>
      <p className="mt-1 text-xs text-white/50">Pick a wallpaper for your desktop.</p>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {wallpapers.map((wp) => (
          <button
            key={wp.id}
            onClick={() => setWallpaper(wp.id)}
            className={`group relative h-24 overflow-hidden rounded-xl border-2 transition ${
              wallpaper === wp.id ? "border-indigo-400" : "border-white/10 hover:border-white/30"
            }`}
            style={{ background: wp.css }}
            aria-label={`Wallpaper ${wp.name}`}
          >
            {wallpaper === wp.id && (
              <span className="absolute top-1.5 right-1.5 grid h-5 w-5 place-items-center rounded-full bg-indigo-500">
                <Check size={12} className="text-white" />
              </span>
            )}
            <span className="absolute inset-x-0 bottom-0 bg-black/40 py-1 text-center text-[11px] font-medium text-white backdrop-blur-sm">
              {wp.name}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-8 flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 p-4">
        <Info size={15} className="mt-0.5 shrink-0 text-indigo-300" />
        <div className="text-xs leading-relaxed text-white/60">
          <p className="font-semibold text-white/80">PortfolioOS 1.0.0</p>
          <p className="mt-1">
            Built with React, TypeScript, Tailwind CSS, GSAP and Supabase. Window manager, dock
            magnification and terminal written from scratch — no UI framework.
          </p>
        </div>
      </div>
    </div>
  );
}
