import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata(
  "Contact",
  "Get in touch with us for your next project. We're ready to bring your creative vision to life.",
  "/en/contact"
);

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Contact</h1>
        <p className="mt-2 text-black/70 dark:text-white/70 max-w-2xl">
          Get in touch via the form or social links.
        </p>
      </header>
      <section className="grid gap-8 md:grid-cols-2">
        <form className="space-y-4" aria-label="Contact form">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="mt-1 w-full border rounded px-3 py-2 border-black/15 dark:border-white/15 bg-transparent"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 w-full border rounded px-3 py-2 border-black/15 dark:border-white/15 bg-transparent"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              className="mt-1 w-full border rounded px-3 py-2 border-black/15 dark:border-white/15 bg-transparent min-h-32"
              placeholder="Tell me about your project"
              required
            />
          </div>
          <button type="submit" className="px-4 py-2 rounded bg-black text-white dark:bg-white dark:text-black">
            Send
          </button>
        </form>
        <aside>
          <ul className="space-y-2">
            <li>
              <a href="mailto:hello@example.com" className="hover:underline">hello@example.com</a>
            </li>
            <li>
              <a href="tel:+1234567890" className="hover:underline">+1 (234) 567-890</a>
            </li>
            <li>
              <a href="https://github.com/Anubhab021" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:underline">GitHub</a>
            </li>
            <li>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:underline">LinkedIn</a>
            </li>
          </ul>
        </aside>
      </section>
    </main>
  );
}


