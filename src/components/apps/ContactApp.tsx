import { useState } from "react";
import { Send, CheckCircle2, AlertTriangle, Mail } from "lucide-react";
import { profile } from "../../lib/data";
import { supabase, sendMessage } from "../../lib/supabase";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactApp() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) {
      window.location.href = `mailto:${profile.email}?subject=Contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}`;
      return;
    }
    setStatus("sending");
    try {
      await sendMessage(form);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
        <CheckCircle2 size={48} className="text-emerald-400" />
        <h2 className="text-lg font-bold text-white">Message sent!</h2>
        <p className="text-sm text-white/60">Thanks for reaching out — I'll reply as soon as possible.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex h-full flex-col gap-4 p-6">
      <div>
        <h1 className="text-xl font-bold text-white">Get in touch</h1>
        <p className="mt-1 text-xs text-white/50">
          Fill the form below — messages land straight in my database.
        </p>
      </div>

      {!supabase && (
        <p className="flex items-start gap-2 rounded-lg border border-amber-400/20 bg-amber-400/10 p-3 text-xs text-amber-200">
          <Mail size={14} className="mt-0.5 shrink-0" />
          Supabase is not configured — submitting will open your email client instead.
        </p>
      )}

      <label className="text-xs font-medium text-white/70">
        Name
        <input
          required
          value={form.name}
          onChange={update("name")}
          placeholder="Jane Doe"
          className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/25 transition outline-none select-text focus:border-indigo-400/60 focus:bg-white/8"
        />
      </label>

      <label className="text-xs font-medium text-white/70">
        Email
        <input
          required
          type="email"
          value={form.email}
          onChange={update("email")}
          placeholder="jane@example.com"
          className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/25 transition outline-none select-text focus:border-indigo-400/60 focus:bg-white/8"
        />
      </label>

      <label className="flex min-h-0 flex-1 flex-col text-xs font-medium text-white/70">
        Message
        <textarea
          required
          minLength={10}
          value={form.message}
          onChange={update("message")}
          placeholder="Hi! I'd like to talk about..."
          className="mt-1.5 w-full flex-1 resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/25 transition outline-none select-text focus:border-indigo-400/60 focus:bg-white/8"
        />
      </label>

      {status === "error" && (
        <p className="flex items-center gap-2 text-xs text-red-300">
          <AlertTriangle size={13} /> Something went wrong. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="flex items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:opacity-50"
      >
        <Send size={15} />
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
