import { MapPin, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../icons";
import { profile } from "../../lib/data";

export default function AboutApp() {
  return (
    <div className="p-6 text-white/90">
      {/* Header */}
      <div className="flex items-center gap-5">
        <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-3xl font-bold text-white shadow-lg shadow-purple-900/40">
          {profile.name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
          <p className="text-sm font-medium text-indigo-300">{profile.role}</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-white/50">
            <MapPin size={12} /> {profile.location}
          </p>
        </div>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-white/70">{profile.bio}</p>

      {/* Links */}
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="glass-light flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition hover:bg-white/10"
        >
          <GithubIcon size={13} /> GitHub
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="glass-light flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition hover:bg-white/10"
        >
          <LinkedinIcon size={13} /> LinkedIn
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="glass-light flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition hover:bg-white/10"
        >
          <Mail size={13} /> {profile.email}
        </a>
      </div>

      {/* Skills */}
      <h2 className="mt-7 mb-3 text-xs font-semibold tracking-widest text-white/40 uppercase">Skills</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {profile.skills.map((group) => (
          <div key={group.category} className="glass-light rounded-xl p-3">
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

      {/* Experience */}
      <h2 className="mt-7 mb-3 text-xs font-semibold tracking-widest text-white/40 uppercase">
        Experience
      </h2>
      <div className="space-y-4 border-l border-white/10 pl-4">
        {profile.experience.map((exp) => (
          <div key={exp.period} className="relative">
            <span className="absolute top-1.5 -left-[21px] h-2 w-2 rounded-full bg-indigo-400" />
            <p className="text-[11px] text-white/40">{exp.period}</p>
            <p className="text-sm font-semibold text-white">
              {exp.title} <span className="font-normal text-white/50">· {exp.place}</span>
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-white/60">{exp.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
