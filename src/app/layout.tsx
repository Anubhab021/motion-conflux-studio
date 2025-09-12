import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { defaultMetadata } from "@/lib/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = defaultMetadata;

// Theme toggle will be moved to a client component

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <header className="sticky top-0 z-50 border-b border-black/10 dark:border-white/10 bg-background/80 backdrop-blur">
          <nav className="container mx-auto px-4 py-3 flex items-center justify-between" aria-label="Primary">
            <Link href="/" className="text-lg font-semibold" aria-label="motion-conflux-studio home">
              motion-conflux-studio
            </Link>
            <div className="flex items-center gap-2">
              <Link href="/en/about" className="hidden md:inline-block px-3 py-2 rounded hover:bg-black/5 dark:hover:bg-white/10">About</Link>
              <Link href="/en/projects" className="hidden md:inline-block px-3 py-2 rounded hover:bg-black/5 dark:hover:bg-white/10">Projects</Link>
              <Link href="/en/services" className="hidden md:inline-block px-3 py-2 rounded hover:bg-black/5 dark:hover:bg-white/10">Services</Link>
              <Link href="/en/contact" className="hidden md:inline-block px-3 py-2 rounded hover:bg-black/5 dark:hover:bg-white/10">Contact</Link>
              <ThemeToggle />
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-black/10 dark:border-white/10 py-6">
          <div className="container mx-auto px-4 text-sm flex items-center justify-between">
            <p>&copy; {new Date().getFullYear()} Motion Conflux Studio</p>
            <div className="flex gap-4" aria-label="Social links">
              <a href="https://github.com/Anubhab021" target="_blank" rel="noreferrer" className="hover:underline" aria-label="GitHub">
                GitHub
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="hover:underline" aria-label="LinkedIn">
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(){
              try{
                const saved = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if(saved === 'dark' || (!saved && prefersDark)){
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              }catch{}
            })();
          `,
          }}
        />
      </body>
    </html>
  );
}
