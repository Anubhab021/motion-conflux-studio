"use client";

import { useState } from "react";
import Link from "next/link";
import { TbMenu2, TbX } from "react-icons/tb";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <TbX size={24} /> : <TbMenu2 size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border-t border-black/10 dark:border-white/10 shadow-lg md:hidden">
          <nav className="container mx-auto px-4 py-4 space-y-2" aria-label="Mobile navigation">
            <Link
              href="/en/about"
              className="block px-3 py-2 rounded hover:bg-black/5 dark:hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/en/projects"
              className="block px-3 py-2 rounded hover:bg-black/5 dark:hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="/en/services"
              className="block px-3 py-2 rounded hover:bg-black/5 dark:hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/en/contact"
              className="block px-3 py-2 rounded hover:bg-black/5 dark:hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
