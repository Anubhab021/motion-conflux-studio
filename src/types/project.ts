export interface Project {
  id: string;
  title: string;
  category: "Video" | "3D" | "Graphics" | "VFX" | "Web";
  description: string;
  thumbnail?: string;
  tags: string[];
}
