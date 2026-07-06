import { useState } from "react";
import { Mail, MapPin, ExternalLink, Send, CheckCircle2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { profile, projects } from "../lib/data";
import { supabase, sendMessage } from "../lib/supabase";

/** Classic single-column layout for phones — the OS metaphor needs a pointer. */
export default function MobileFallback() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

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
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="app-scroll h-full overflow-y-auto bg-[#0a0a12] text-white">
      {/* Hero */}
      <header className="relative overflow-hidden px-6 pt-16 pb-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,#312e81_0%,transparent_60%)]" />
        <div className="relative">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-2xl font-bold">
            {profile.name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>
          <h1 className="mt-4 text-3xl font-bold">{profile.name}</h1>
          <p className="mt-1 font-medium text-indigo-300">{profile.role}</p>
          <p className="mt-1 flex items-center gap-1 text-sm text-white/50">
            <MapPin size={13} /> {profile.location}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/70">{profile.bio}</p>
          <div className="mt-5 flex gap-3">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-lg bg-white/10 p-2.5">
              <GithubIcon size={18} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-lg bg-white/10 p-2.5">
              <LinkedinIcon size={18} />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email" className="rounded-lg bg-white/10 p-2.5">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </header>

      {/* Skills */}
      <section className="px-6 py-8">
        <h2 className="mb-4 text-xs font-semibold tracking-widest text-white/40 uppercase">Skills</h2>
        <div className="space-y-3">
          {profile.skills.map((group) => (
            <div key={group.category} className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="mb-2 text-xs font-semibold text-indigo-300">{group.category}</p>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((skill) => (
                  <span key={skill} className="rounded-md bg-white/8 px-2 py-0.5 text-[11px] text-white/80">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="px-6 py-8">
        <h2 className="mb-4 text-xs font-semibold tracking-widest text-white/40 uppercase">Projects</h2>
        <div className="space-y-4">
          {projects.map((project) => (
            <article key={project.name} className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <div className={`h-20 bg-gradient-to-br ${project.gradient}`} />
              <div className="p-4">
                <h3 className="font-bold">{project.name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-white/60">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded bg-white/8 px-1.5 py-0.5 font-mono text-[10px] text-indigo-200">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium">
                      <GithubIcon size={12} /> Code
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-lg bg-indigo-500/80 px-3 py-1.5 text-xs font-medium">
                      <ExternalLink size={12} /> Live
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="px-6 py-8 pb-16">
        <h2 className="mb-4 text-xs font-semibold tracking-widest text-white/40 uppercase">Contact</h2>
        {status === "sent" ? (
          <div className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-8 text-center">
            <CheckCircle2 size={40} className="text-emerald-400" />
            <p className="font-semibold">Message sent!</p>
            <p className="text-xs text-white/60">I'll reply as soon as possible.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-3">
            <input
              required
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Your name"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm placeholder-white/25 outline-none select-text focus:border-indigo-400/60"
            />
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="Your email"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm placeholder-white/25 outline-none select-text focus:border-indigo-400/60"
            />
            <textarea
              required
              minLength={10}
              rows={4}
              value={form.message}
              onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
              placeholder="Your message..."
              className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm placeholder-white/25 outline-none select-text focus:border-indigo-400/60"
            />
            {status === "error" && <p className="text-xs text-red-300">Something went wrong. Please try again.</p>}
            <button
              type="submit"
              disabled={status === "sending"}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 py-3 text-sm font-semibold disabled:opacity-50"
            >
              <Send size={15} /> {status === "sending" ? "Sending..." : "Send message"}
            </button>
          </form>
        )}
        <p className="mt-10 text-center text-[11px] text-white/30">
          💻 Visit on desktop for the full PortfolioOS experience
        </p>
      </section>
    </div>
  );
}
