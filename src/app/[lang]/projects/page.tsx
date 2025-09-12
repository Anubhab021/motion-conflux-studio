"use client";
import { useMemo, useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import Lightbox from "@/components/Lightbox";
import { HoverScale, FadeInUp } from "@/components/PageTransition";
import { Project } from "@/types/project";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata(
  "Projects",
  "Explore our portfolio of motion graphics, 3D animation, VFX, and web development projects.",
  "/en/projects"
);

const categories: { label: string; value: Project["category"] | "All" }[] = [
  { label: "All", value: "All" },
  { label: "Video", value: "Video" },
  { label: "3D", value: "3D" },
  { label: "Graphics", value: "Graphics" },
  { label: "VFX", value: "VFX" },
  { label: "Web", value: "Web" },
];

export default function ProjectsPage() {
  const [active, setActive] = useState<"All" | "Video" | "3D" | "Graphics" | "VFX" | "Web">(
    "All"
  );
  const [projects, setProjects] = useState<Project[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxMedia, setLightboxMedia] = useState<{
    src: string;
    alt: string;
    type: "image" | "video";
  } | null>(null);

  useEffect(() => {
    fetch("/data/projects.json")
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(console.error);
  }, []);

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((p) => p.category === active);
  }, [active, projects]);

  const handleProjectClick = (project: Project) => {
    if (project.thumbnail) {
      setLightboxMedia({
        src: project.thumbnail,
        alt: project.title,
        type: "image",
      });
      setLightboxOpen(true);
    }
  };

  const handleSearchResultClick = (project: Project) => {
    setActive(project.category);
    // Scroll to projects section
    setTimeout(() => {
      const element = document.getElementById("projects-grid");
      element?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <FadeInUp>
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Projects</h1>
          <p className="mt-2 text-black/70 dark:text-white/70 max-w-2xl">
            Explore our portfolio of motion, 3D, graphics, VFX, and web projects.
          </p>
        </header>
      </FadeInUp>

      <FadeInUp delay={0.1}>
        <div className="mb-8">
          <SearchBar onResultClick={handleSearchResultClick} />
        </div>
      </FadeInUp>

      <FadeInUp delay={0.2}>
        <nav aria-label="Project filters" className="mb-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.value}
              className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                active === c.value
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "border-black/15 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/10"
              }`}
              onClick={() => setActive(c.value)}
              aria-pressed={active === c.value}
            >
              {c.label}
            </button>
          ))}
        </nav>
      </FadeInUp>

      <section id="projects-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((project, index) => (
          <FadeInUp key={project.id} delay={0.3 + index * 0.1}>
            <HoverScale>
              <article
                className="border rounded-lg p-4 border-black/10 dark:border-white/10 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => handleProjectClick(project)}
              >
                <div className="aspect-video w-full bg-black/5 dark:bg-white/10 rounded mb-3 flex items-center justify-center">
                  {project.thumbnail ? (
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <span className="text-black/40 dark:text-white/40">No preview</span>
                  )}
                </div>
                <h2 className="font-semibold">{project.title}</h2>
                <p className="text-sm mt-1 text-black/60 dark:text-white/60 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs px-2 py-1 bg-black/5 dark:bg-white/10 rounded">
                    {project.category}
                  </span>
                  <div className="flex gap-1">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-1 py-0.5 bg-black/5 dark:bg-white/10 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </HoverScale>
          </FadeInUp>
        ))}
      </section>

      {lightboxOpen && lightboxMedia && (
        <Lightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          media={lightboxMedia}
        />
      )}
    </main>
  );
}