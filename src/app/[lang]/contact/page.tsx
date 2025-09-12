import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import ContactForm from "@/components/ContactForm";
import { FadeInUp } from "@/components/PageTransition";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = generatePageMetadata(
  "Contact",
  "Get in touch with us for your next project. We're ready to bring your creative vision to life.",
  "/en/contact"
);

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <FadeInUp>
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Let's Work Together</h1>
          <p className="text-lg text-black/70 dark:text-white/70 max-w-2xl mx-auto">
            Ready to bring your creative vision to life? Get in touch and let's discuss your next project.
          </p>
        </header>
      </FadeInUp>

      <div className="grid gap-12 lg:grid-cols-2">
        <FadeInUp delay={0.2}>
          <div>
            <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
            <ContactForm />
          </div>
        </FadeInUp>

        <FadeInUp delay={0.4}>
          <aside className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Get in touch</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-black/10 dark:bg-white/10 rounded-full flex items-center justify-center">
                    📧
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a 
                      href={`mailto:${SITE_CONFIG.links.email}`} 
                      className="text-black/70 dark:text-white/70 hover:underline"
                    >
                      {SITE_CONFIG.links.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-black/10 dark:bg-white/10 rounded-full flex items-center justify-center">
                    📱
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <a 
                      href={`tel:${SITE_CONFIG.links.phone}`} 
                      className="text-black/70 dark:text-white/70 hover:underline"
                    >
                      {SITE_CONFIG.links.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Follow us</h3>
              <div className="flex space-x-4">
                <a
                  href={SITE_CONFIG.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 bg-black/10 dark:bg-white/10 rounded-full flex items-center justify-center hover:bg-black/20 dark:hover:bg-white/20 transition-colors"
                  aria-label="GitHub"
                >
                  <span className="text-lg">⚡</span>
                </a>
                <a
                  href={SITE_CONFIG.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 bg-black/10 dark:bg-white/10 rounded-full flex items-center justify-center hover:bg-black/20 dark:hover:bg-white/20 transition-colors"
                  aria-label="LinkedIn"
                >
                  <span className="text-lg">💼</span>
                </a>
              </div>
            </div>

            <div className="p-6 bg-black/5 dark:bg-white/5 rounded-lg">
              <h3 className="font-semibold mb-2">Response Time</h3>
              <p className="text-sm text-black/70 dark:text-white/70">
                We typically respond within 24 hours during business days.
              </p>
            </div>
          </aside>
        </FadeInUp>
      </div>
    </main>
  );
}


