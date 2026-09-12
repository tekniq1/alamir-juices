import { useRouterState } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useApp } from "@/store/app";

export function BackButton() {
  const lang = useApp((s) => s.lang);
  const isHome = useRouterState({ select: (s) => s.location.pathname === "/" });

  if (isHome) return null;

  return (
    <button
      onClick={() => window.history.length > 1 ? window.history.back() : window.location.href = "/"}
      className="group mb-6 inline-flex h-10 items-center gap-2 rounded-full border border-border bg-card pr-4 pl-3 text-sm font-medium shadow-glass transition hover:border-primary/50 hover:bg-primary/5"
    >
      <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1" />
      {lang === "ar" ? "رجوع" : "Back"}
    </button>
  );
}
