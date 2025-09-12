"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbExternalLink, TbGithub } from "react-icons/tb";
import { Project } from "@/types/project";
import { trackProjectView } from "@/lib/analytics";

interface ProjectShowcaseProps {
  projects: Project[];
  featured?: boolean;
}

export default function ProjectShowcase({ projects, featured = false }: ProjectShowcaseProps) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const handleProjectClick = (project: Project) => {
    trackProjectView(project.id, project.title);
    // Add your project detail navigation logic here
  };

  return (
    <div className={`grid gap-6 ${featured ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'}`}>
      {projects.map((project, index) => (
        <motion.article
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          onHoverStart={() => setHoveredProject(project.id)}
          onHoverEnd={() => setHoveredProject(null)}
          className="group relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {/* Project Image */}
          <div className="relative aspect-video overflow-hidden">
            {project.thumbnail ? (
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                <span className="text-gray-400 text-sm">No preview</span>
              </div>
            )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
              <AnimatePresence>
                {hoveredProject === project.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex space-x-2"
                  >
                    <button
                      onClick={() => handleProjectClick(project)}
                      className="p-2 bg-white text-black rounded-full hover:bg-gray-100 transition-colors"
                      aria-label={`View ${project.title}`}
                    >
                      <TbExternalLink size={16} />
                    </button>
                    <button
                      className="p-2 bg-white text-black rounded-full hover:bg-gray-100 transition-colors"
                      aria-label={`View ${project.title} source code`}
                    >
                      <TbGithub size={16} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Project Info */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full">
                {project.category}
              </span>
              <div className="flex space-x-1">
                {project.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {project.description}
            </p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
