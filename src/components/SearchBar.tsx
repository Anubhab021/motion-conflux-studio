"use client";

import { useState, useEffect, useRef } from "react";
import MiniSearch from "minisearch";
import { Project } from "@/types/project";

interface SearchBarProps {
  onResultClick?: (project: Project) => void;
}

export default function SearchBar({ onResultClick }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Project[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load projects data
    fetch("/data/projects.json")
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(console.error);
  }, []);

  const miniSearch = new MiniSearch({
    fields: ["title", "description", "category", "tags"],
    storeFields: ["id", "title", "category", "description", "tags"],
  });

  useEffect(() => {
    if (projects.length > 0) {
      miniSearch.addAll(projects);
    }
  }, [projects]);

  useEffect(() => {
    if (query.trim()) {
      const searchResults = miniSearch.search(query, { fuzzy: 0.2 });
      setResults(searchResults as Project[]);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query, projects]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search projects..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => query.trim() && setIsOpen(true)}
        className="w-full px-4 py-2 border rounded-lg border-black/15 dark:border-white/15 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Search projects"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        role="combobox"
      />
      
      {isOpen && results.length > 0 && (
        <div 
          className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-black/15 dark:border-white/15 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
          role="listbox"
        >
          {results.map((project) => (
            <button
              key={project.id}
              onClick={() => {
                onResultClick?.(project);
                setQuery("");
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 text-left hover:bg-black/5 dark:hover:bg-white/10 border-b border-black/5 dark:border-white/5 last:border-b-0"
              role="option"
            >
              <div className="font-medium">{project.title}</div>
              <div className="text-sm text-black/60 dark:text-white/60">{project.category}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
