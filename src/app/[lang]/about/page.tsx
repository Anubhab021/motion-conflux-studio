import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata(
  "About",
  "Learn about our skills, tools, and expertise in motion graphics, 3D animation, VFX, and web development.",
  "/en/about"
);

export default function AboutPage({ params }: { params: { lang: string } }) {
  return (
    <main className="container mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">About</h1>
        <p className="mt-2 text-black/70 dark:text-white/70 max-w-2xl">
          Bio, skills, and tools used across motion, 3D, graphics, and web.
        </p>
      </header>
      <section className="grid gap-8 md:grid-cols-2">
        <article>
          <h2 className="text-xl font-semibold">Skills</h2>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>After Effects, Premiere Pro</li>
            <li>Blender, Cinema 4D</li>
            <li>Photoshop, Illustrator</li>
            <li>React, Next.js, Tailwind</li>
          </ul>
        </article>
        <aside>
          <h2 className="text-xl font-semibold">Tools</h2>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Framer Motion, GSAP</li>
            <li>Three.js / R3F (planned)</li>
            <li>MiniSearch</li>
          </ul>
        </aside>
      </section>
    </main>
  );
}


