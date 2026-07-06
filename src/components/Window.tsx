import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { WindowState } from "../lib/types";
import { useWindows } from "../store/windows";

const MENUBAR_H = 32;

interface Props {
  win: WindowState;
  children: ReactNode;
}

export default function Window({ win, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { dispatch } = useWindows();

  useGSAP(
    () => {
      gsap.from(ref.current, {
        scale: 0.85,
        opacity: 0,
        y: 24,
        duration: 0.45,
        ease: "back.out(1.4)",
      });
    },
    { scope: ref },
  );

  const { contextSafe } = useGSAP({ scope: ref });

  const close = contextSafe(() => {
    gsap.to(ref.current, {
      scale: 0.9,
      opacity: 0,
      y: 12,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => dispatch({ type: "CLOSE", id: win.id }),
    });
  });

  const minimize = contextSafe(() => {
    gsap.to(ref.current, {
      scale: 0.3,
      opacity: 0,
      y: window.innerHeight - win.y,
      duration: 0.35,
      ease: "power3.in",
      onComplete: () => {
        gsap.set(ref.current, { clearProps: "all" });
        dispatch({ type: "MINIMIZE", id: win.id });
      },
    });
  });

  /* Drag: write style directly during move (no re-render), commit once on release */
  const onDragStart = (e: React.PointerEvent) => {
    if (win.maximized) return;
    const el = ref.current!;
    const startX = e.clientX;
    const startY = e.clientY;
    const origX = win.x;
    const origY = win.y;
    dispatch({ type: "FOCUS", id: win.id });

    let lastX = origX;
    let lastY = origY;
    const onMove = (ev: PointerEvent) => {
      lastX = origX + ev.clientX - startX;
      lastY = Math.max(MENUBAR_H, origY + ev.clientY - startY);
      el.style.left = `${lastX}px`;
      el.style.top = `${lastY}px`;
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      dispatch({ type: "MOVE", id: win.id, x: lastX, y: lastY });
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const onResizeStart = (e: React.PointerEvent) => {
    if (win.maximized) return;
    e.stopPropagation();
    const el = ref.current!;
    const startX = e.clientX;
    const startY = e.clientY;
    const origW = win.w;
    const origH = win.h;

    let lastW = origW;
    let lastH = origH;
    const onMove = (ev: PointerEvent) => {
      lastW = Math.max(360, origW + ev.clientX - startX);
      lastH = Math.max(240, origH + ev.clientY - startY);
      el.style.width = `${lastW}px`;
      el.style.height = `${lastH}px`;
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      dispatch({ type: "RESIZE", id: win.id, w: lastW, h: lastH });
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  if (win.minimized) return null;

  return (
    <div
      ref={ref}
      className="glass absolute flex flex-col overflow-hidden rounded-xl shadow-2xl shadow-black/60"
      style={{ left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z }}
      onPointerDown={() => dispatch({ type: "FOCUS", id: win.id })}
    >
      {/* Title bar */}
      <div
        className="flex h-9 shrink-0 cursor-grab items-center gap-2 border-b border-white/5 px-3 active:cursor-grabbing"
        onPointerDown={onDragStart}
        onDoubleClick={() => dispatch({ type: "TOGGLE_MAX", id: win.id })}
      >
        <div className="group flex items-center gap-2">
          <button
            aria-label="Close window"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={close}
            className="grid h-3 w-3 place-items-center rounded-full bg-[#ff5f57] text-[8px] font-bold text-black/0 transition group-hover:text-black/50"
          >
            ×
          </button>
          <button
            aria-label="Minimize window"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={minimize}
            className="grid h-3 w-3 place-items-center rounded-full bg-[#febc2e] text-[8px] font-bold text-black/0 transition group-hover:text-black/50"
          >
            −
          </button>
          <button
            aria-label="Maximize window"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => dispatch({ type: "TOGGLE_MAX", id: win.id })}
            className="grid h-3 w-3 place-items-center rounded-full bg-[#28c840] text-[8px] font-bold text-black/0 transition group-hover:text-black/50"
          >
            +
          </button>
        </div>
        <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[13px] font-medium text-white/60">
          {win.title}
        </span>
      </div>

      {/* App content */}
      <div className="app-scroll min-h-0 flex-1 overflow-auto">{children}</div>

      {/* Resize handle */}
      {!win.maximized && (
        <div
          className="absolute right-0 bottom-0 h-4 w-4 cursor-se-resize"
          onPointerDown={onResizeStart}
        />
      )}
    </div>
  );
}
