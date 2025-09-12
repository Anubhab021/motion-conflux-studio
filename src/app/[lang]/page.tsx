import type { Metadata } from "next";
import { FadeInUp } from "@/components/PageTransition";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata(
  "Home",
  "Creative studio specializing in motion graphics, 3D animation, VFX, and web development.",
  "/en"
);

export default function LangHome({ params }: { params: { lang: string } }) {
  return (
    <section className="relative overflow-hidden min-h-[80vh] flex items-center">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <FadeInUp>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            motion-conflux-studio
          </h1>
        </FadeInUp>
        
        <FadeInUp delay={0.2}>
          <p className="mt-4 text-lg md:text-xl text-black/70 dark:text-white/70 max-w-2xl">
            Motion, 3D, VFX, Web — a convergence of craft and code.
          </p>
        </FadeInUp>

        <FadeInUp delay={0.4}>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/en/projects"
              className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-lg hover:opacity-90 transition-opacity"
            >
              View Projects
            </Link>
            <Link
              href="/en/contact"
              className="px-6 py-3 border border-black/20 dark:border-white/20 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              Get In Touch
            </Link>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}


