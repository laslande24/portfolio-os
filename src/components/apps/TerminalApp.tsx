import { useEffect, useRef, useState } from "react";
import { profile, projects } from "../../lib/data";
import type { AppId } from "../../lib/types";
import { useWindows } from "../../store/windows";

interface Line {
  type: "input" | "output";
  text: string;
}

const BANNER = [
  "  ____            _    __       _ _       ___  ____  ",
  " |  _ \\ ___  _ __| |_ / _| ___ | (_) ___ / _ \\/ ___| ",
  " | |_) / _ \\| '__| __| |_ / _ \\| | |/ _ \\ | | \\___ \\ ",
  " |  __/ (_) | |  | |_|  _| (_) | | | (_) | |_| |___) |",
  " |_|   \\___/|_|   \\__|_|  \\___/|_|_|\\___/ \\___/|____/ ",
  "",
  `Welcome to PortfolioOS 1.0.0 — ${profile.name}'s portfolio`,
  'Type "help" to list available commands.',
  "",
];

const OPENABLE: AppId[] = ["about", "projects", "contact", "settings"];

export default function TerminalApp() {
  const [lines, setLines] = useState<Line[]>(BANNER.map((text) => ({ type: "output", text })));
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { dispatch } = useWindows();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  function run(raw: string) {
    const cmd = raw.trim();
    const echo: Line[] = [{ type: "input", text: cmd }];
    if (!cmd) {
      setLines((prev) => [...prev, ...echo]);
      return;
    }
    setHistory((prev) => [cmd, ...prev]);
    setHistoryIdx(-1);

    const [name, ...args] = cmd.split(/\s+/);
    let out: string[] = [];

    switch (name.toLowerCase()) {
      case "help":
        out = [
          "Available commands:",
          "  help          show this help",
          "  whoami        who am I?",
          "  skills        list technical skills",
          "  projects      list portfolio projects",
          "  contact       how to reach me",
          "  open <app>    open an app (about, projects, contact, settings)",
          "  clear         clear the terminal",
          "  date          current date and time",
          "  echo <text>   print text",
        ];
        break;
      case "whoami":
        out = [`${profile.name} — ${profile.role}`, profile.bio];
        break;
      case "skills":
        out = profile.skills.map(
          (group) => `${group.category.padEnd(10)} ${group.items.join(", ")}`,
        );
        break;
      case "projects":
        out = projects.map((project) => `• ${project.name.padEnd(16)} ${project.tags.join(", ")}`);
        out.push("", 'Tip: run "open projects" for the full view.');
        break;
      case "contact":
        out = [`email:    ${profile.email}`, `github:   ${profile.github}`, `linkedin: ${profile.linkedin}`];
        break;
      case "open": {
        const app = args[0]?.toLowerCase() as AppId | undefined;
        if (app && OPENABLE.includes(app)) {
          dispatch({ type: "OPEN", appId: app });
          out = [`Opening ${app}...`];
        } else {
          out = [`Usage: open <${OPENABLE.join(" | ")}>`];
        }
        break;
      }
      case "clear":
        setLines([]);
        return;
      case "date":
        out = [new Date().toString()];
        break;
      case "echo":
        out = [args.join(" ")];
        break;
      case "sudo":
        out = ["Nice try. Permission denied. 😏"];
        break;
      default:
        out = [`command not found: ${name}. Type "help".`];
    }

    setLines((prev) => [...prev, ...echo, ...out.map((text) => ({ type: "output" as const, text }))]);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, history.length - 1);
      if (history[next]) {
        setHistoryIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = historyIdx - 1;
      setHistoryIdx(next);
      setInput(next >= 0 ? history[next] : "");
    }
  }

  return (
    <div
      className="flex h-full flex-col bg-[#0c0e14]/95 p-3 font-mono text-[12.5px] leading-relaxed"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="app-scroll flex-1 overflow-auto whitespace-pre-wrap">
        {lines.map((line, i) =>
          line.type === "input" ? (
            <div key={i}>
              <span className="text-emerald-400">guest@portfolio</span>
              <span className="text-white/50">:~$ </span>
              <span className="text-white">{line.text}</span>
            </div>
          ) : (
            <div key={i} className="text-white/75">
              {line.text || " "}
            </div>
          ),
        )}
        <div className="flex">
          <span className="text-emerald-400">guest@portfolio</span>
          <span className="text-white/50">:~$&nbsp;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="min-w-0 flex-1 bg-transparent text-white caret-emerald-400 outline-none"
            autoFocus
            spellCheck={false}
            aria-label="Terminal input"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
