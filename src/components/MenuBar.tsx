import { useEffect, useState } from "react";
import { Command, Wifi, BatteryFull } from "lucide-react";
import { GithubIcon } from "./icons";
import { profile } from "../lib/data";

export default function MenuBar() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 10_000);
    return () => clearInterval(timer);
  }, []);

  const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  const date = now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  return (
    <div className="glass absolute inset-x-0 top-0 z-[9998] flex h-8 items-center justify-between border-x-0 border-t-0 px-4 text-[13px] text-white/80">
      <div className="flex items-center gap-4">
        <Command size={15} className="text-white" />
        <span className="font-semibold text-white">PortfolioOS</span>
        <span className="hidden text-white/50 sm:inline">{profile.name}</span>
      </div>
      <div className="flex items-center gap-4">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="transition hover:text-white"
          aria-label="GitHub profile"
        >
          <GithubIcon size={15} />
        </a>
        <Wifi size={15} />
        <BatteryFull size={16} />
        <span className="text-white/60">{date}</span>
        <span className="font-medium text-white">{time}</span>
      </div>
    </div>
  );
}
