import { createContext, useContext, useReducer, type ReactNode, type Dispatch } from "react";
import type { AppId, WindowState } from "../lib/types";

interface AppMeta {
  title: string;
  w: number;
  h: number;
}

export const APP_META: Record<AppId, AppMeta> = {
  about: { title: "About Me", w: 680, h: 560 },
  projects: { title: "Projects", w: 780, h: 580 },
  terminal: { title: "Terminal", w: 640, h: 420 },
  contact: { title: "Contact", w: 480, h: 560 },
  settings: { title: "Settings", w: 460, h: 400 },
};

type Action =
  | { type: "OPEN"; appId: AppId }
  | { type: "CLOSE"; id: string }
  | { type: "FOCUS"; id: string }
  | { type: "MINIMIZE"; id: string }
  | { type: "RESTORE"; appId: AppId }
  | { type: "TOGGLE_MAX"; id: string }
  | { type: "MOVE"; id: string; x: number; y: number }
  | { type: "RESIZE"; id: string; w: number; h: number };

interface State {
  windows: WindowState[];
  nextZ: number;
  seq: number;
}

const MENUBAR_H = 32;
const DOCK_SPACE = 90;

function spawnGeometry(seq: number, w: number, h: number) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const width = Math.min(w, vw - 40);
  const height = Math.min(h, vh - MENUBAR_H - DOCK_SPACE - 20);
  const offset = (seq % 6) * 28;
  return {
    x: Math.max(12, (vw - width) / 2 + offset - 70),
    y: Math.max(MENUBAR_H + 8, (vh - DOCK_SPACE - height) / 2 + offset - 40),
    w: width,
    h: height,
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "OPEN": {
      const existing = state.windows.find((win) => win.appId === action.appId);
      if (existing) {
        return {
          ...state,
          nextZ: state.nextZ + 1,
          windows: state.windows.map((win) =>
            win.id === existing.id ? { ...win, minimized: false, z: state.nextZ } : win,
          ),
        };
      }
      const meta = APP_META[action.appId];
      const geo = spawnGeometry(state.seq, meta.w, meta.h);
      const win: WindowState = {
        id: `${action.appId}-${state.seq}`,
        appId: action.appId,
        title: meta.title,
        ...geo,
        z: state.nextZ,
        minimized: false,
        maximized: false,
      };
      return { windows: [...state.windows, win], nextZ: state.nextZ + 1, seq: state.seq + 1 };
    }
    case "CLOSE":
      return { ...state, windows: state.windows.filter((win) => win.id !== action.id) };
    case "FOCUS":
      return {
        ...state,
        nextZ: state.nextZ + 1,
        windows: state.windows.map((win) => (win.id === action.id ? { ...win, z: state.nextZ } : win)),
      };
    case "MINIMIZE":
      return {
        ...state,
        windows: state.windows.map((win) => (win.id === action.id ? { ...win, minimized: true } : win)),
      };
    case "RESTORE":
      return {
        ...state,
        nextZ: state.nextZ + 1,
        windows: state.windows.map((win) =>
          win.appId === action.appId ? { ...win, minimized: false, z: state.nextZ } : win,
        ),
      };
    case "TOGGLE_MAX":
      return {
        ...state,
        nextZ: state.nextZ + 1,
        windows: state.windows.map((win) => {
          if (win.id !== action.id) return win;
          if (win.maximized) {
            const prev = win.prev ?? { x: 60, y: 60, w: 640, h: 480 };
            return { ...win, maximized: false, prev: undefined, ...prev, z: state.nextZ };
          }
          return {
            ...win,
            maximized: true,
            prev: { x: win.x, y: win.y, w: win.w, h: win.h },
            x: 8,
            y: MENUBAR_H + 8,
            w: window.innerWidth - 16,
            h: window.innerHeight - MENUBAR_H - DOCK_SPACE,
            z: state.nextZ,
          };
        }),
      };
    case "MOVE":
      return {
        ...state,
        windows: state.windows.map((win) =>
          win.id === action.id ? { ...win, x: action.x, y: action.y } : win,
        ),
      };
    case "RESIZE":
      return {
        ...state,
        windows: state.windows.map((win) =>
          win.id === action.id ? { ...win, w: action.w, h: action.h } : win,
        ),
      };
    default:
      return state;
  }
}

const WindowsContext = createContext<{ state: State; dispatch: Dispatch<Action> } | null>(null);

export function WindowsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { windows: [], nextZ: 10, seq: 0 });
  return <WindowsContext.Provider value={{ state, dispatch }}>{children}</WindowsContext.Provider>;
}

export function useWindows() {
  const ctx = useContext(WindowsContext);
  if (!ctx) throw new Error("useWindows must be used within WindowsProvider");
  return ctx;
}
