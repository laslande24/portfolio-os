import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Command } from "lucide-react";

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ onComplete: onDone });
      tl.from(".boot-logo", { scale: 0.6, opacity: 0, duration: 0.6, ease: "back.out(1.7)" })
        .from(".boot-bar", { opacity: 0, duration: 0.3 }, "-=0.2")
        .to(".boot-fill", { width: "100%", duration: 1.4, ease: "power2.inOut" })
        .to(ref.current, { opacity: 0, duration: 0.5, ease: "power2.in", delay: 0.15 });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="fixed inset-0 z-[10000] grid place-items-center bg-black">
      <div className="flex flex-col items-center gap-8">
        <div className="boot-logo grid h-24 w-24 place-items-center rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-2xl shadow-purple-900/50">
          <Command size={48} className="text-white" />
        </div>
        <div className="boot-bar h-1 w-48 overflow-hidden rounded-full bg-white/15">
          <div className="boot-fill h-full w-0 rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
}
