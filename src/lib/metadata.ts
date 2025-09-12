import type { Metadata } from "next";

export const defaultMetadata: Metadata = {
  title: "motion-conflux-studio",
  description: "Creative studio specializing in motion graphics, 3D animation, VFX, and web development. Portfolio showcasing innovative visual solutions.",
  keywords: ["motion graphics", "3D animation", "VFX", "web development", "portfolio", "creative studio"],
  authors: [{ name: "Motion Conflux Studio" }],
  creator: "Motion Conflux Studio",
  publisher: "Motion Conflux Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://motion-conflux-studio.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "en": "/en",
      "hi": "/hi",
    },
  },
  openGraph: {
    title: "motion-conflux-studio",
    description: "Creative studio specializing in motion graphics, 3D animation, VFX, and web development.",
    url: "https://motion-conflux-studio.vercel.app",
    siteName: "motion-conflux-studio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Motion Conflux Studio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "motion-conflux-studio",
    description: "Creative studio specializing in motion graphics, 3D animation, VFX, and web development.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export function generatePageMetadata(
  title: string,
  description: string,
  path: string
): Metadata {
  return {
    ...defaultMetadata,
    title: `${title} | motion-conflux-studio`,
    description,
    alternates: {
      canonical: path,
      languages: {
        "en": `/en${path}`,
        "hi": `/hi${path}`,
      },
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: `${title} | motion-conflux-studio`,
      description,
      url: `https://motion-conflux-studio.vercel.app${path}`,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: `${title} | motion-conflux-studio`,
      description,
    },
  };
}
