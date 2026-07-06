import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "../icons";
import { projects } from "../../lib/data";

export default function ProjectsApp() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".project-card", {
        opacity: 0,
        y: 20,
        stagger: 0.07,
        duration: 0.5,
        ease: "power2.out",
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="grid gap-4 p-5 sm:grid-cols-2">
      {projects.map((project) => (
        <article
          key={project.name}
          className="project-card glass-light group flex flex-col overflow-hidden rounded-xl transition hover:border-white/20"
        >
          {/* Cover */}
          <div
            className={`relative h-28 bg-gradient-to-br ${project.gradient} transition-transform duration-500`}
          >
            <span className="absolute right-2 bottom-2 rounded-md bg-black/40 px-2 py-0.5 font-mono text-[10px] text-white/90 backdrop-blur">
              {project.year}
            </span>
          </div>

          <div className="flex flex-1 flex-col p-4">
            <h3 className="text-sm font-bold text-white">{project.name}</h3>
            <p className="mt-1.5 flex-1 text-xs leading-relaxed text-white/60">{project.description}</p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded bg-white/8 px-1.5 py-0.5 font-mono text-[10px] text-indigo-200">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-3 flex gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1.5 text-[11px] font-medium text-white transition hover:bg-white/20"
                >
                  <GithubIcon size={12} /> Code
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-lg bg-indigo-500/80 px-2.5 py-1.5 text-[11px] font-medium text-white transition hover:bg-indigo-500"
                >
                  <ExternalLink size={12} /> Live
                </a>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
