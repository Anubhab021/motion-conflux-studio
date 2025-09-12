"use client";
import { useEffect } from "react";

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  useEffect(() => {
    const setLang = async () => {
      const resolvedParams = await params;
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("lang", resolvedParams.lang || "en");
      }
    };
    setLang();
  }, [params]);

  return <>{children}</>;
}


