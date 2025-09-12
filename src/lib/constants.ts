// Site configuration
export const SITE_CONFIG = {
  name: "motion-conflux-studio",
  description: "Creative studio specializing in motion graphics, 3D animation, VFX, and web development",
  url: "https://motion-conflux-studio.vercel.app",
  ogImage: "/og-image.jpg",
  links: {
    github: "https://github.com/Anubhab021",
    linkedin: "https://www.linkedin.com",
    email: "hello@motion-conflux-studio.com",
    phone: "+1 (234) 567-890",
  },
  social: {
    twitter: "@motionconflux",
    instagram: "@motionconflux",
    behance: "motionconflux",
  },
} as const;

// Project categories
export const PROJECT_CATEGORIES = [
  { id: "all", label: "All", value: "All" },
  { id: "video", label: "Video", value: "Video" },
  { id: "3d", label: "3D", value: "3D" },
  { id: "graphics", label: "Graphics", value: "Graphics" },
  { id: "vfx", label: "VFX", value: "VFX" },
  { id: "web", label: "Web", value: "Web" },
] as const;

// Animation presets
export const ANIMATION_PRESETS = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4 },
  },
} as const;

// Breakpoints for responsive design
export const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// Z-index scale
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;
