import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState, type ReactNode } from "react";

const DROPS = ["bg-mango", "bg-lime", "bg-berry", "bg-primary", "bg-mango", "bg-berry", "bg-lime", "bg-primary"];

/** CTA with a fruit-splash burst on click. */
export function SplashButton({ to, children, onClick }: { to?: "/menu" | "/checkout"; children: ReactNode; onClick?: () => void }) {
  const [bursts, setBursts] = useState<number[]>([]);
  const fire = () => {
    const id = Date.now();
    setBursts((b) => [...b, id]);
    setTimeout(() => setBursts((b) => b.filter((x) => x !== id)), 800);
    onClick?.();
  };
  const cls = "relative inline-flex h-13 items-center justify-center overflow-visible rounded-full bg-ink px-8 text-base font-semibold text-ink-foreground shadow-caramel transition hover:bg-primary-deep active:scale-95";
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <AnimatePresence>
        {bursts.map((id) => (
          <span key={id} className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {DROPS.map((c, i) => {
              const angle = (i / DROPS.length) * Math.PI * 2;
              return (
                <motion.span
                  key={i}
                  initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                  animate={{ x: Math.cos(angle) * 70, y: Math.sin(angle) * 70, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className={`absolute size-3 rounded-full ${c}`}
                />
              );
            })}
            <motion.span initial={{ scale: 0, opacity: 0.6 }} animate={{ scale: 2.2, opacity: 0 }} transition={{ duration: 0.6 }} className="absolute inset-0 rounded-full border-2 border-mango" />
          </span>
        ))}
      </AnimatePresence>
    </>
  );
  if (to) {
    return (
      <Link to={to} onClick={fire} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={fire} className={cls}>
      {inner}
    </button>
  );
}
