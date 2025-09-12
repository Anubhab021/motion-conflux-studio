import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata(
  "Projects",
  "Explore our portfolio of motion graphics, 3D animation, VFX, and web development projects.",
  "/en/projects"
);

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
