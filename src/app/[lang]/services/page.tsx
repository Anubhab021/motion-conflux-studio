import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata(
  "Services",
  "Our comprehensive services include video production, 3D animation, graphics design, VFX, and web development.",
  "/en/services"
);

export default function ServicesPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Services</h1>
        <p className="mt-2 text-black/70 dark:text-white/70 max-w-2xl">
          Video, 3D, Graphics, VFX, and Web Development offerings.
        </p>
      </header>
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {["Video", "3D", "Graphics", "VFX", "Web Dev"].map((name) => (
          <article key={name} className="p-4 border rounded-lg border-black/10 dark:border-white/10">
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-sm mt-2 text-black/70 dark:text-white/70">High-quality {name} services tailored to your brand.</p>
          </article>
        ))}
      </section>
    </main>
  );
}


