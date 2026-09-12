import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { lazy, Suspense, useEffect, useState } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import { useApp } from "@/store/app";
import { t } from "@/lib/i18n";
import { SplashButton } from "./SplashButton";

const Hero3D = lazy(() => import("./Hero3D"));

export function Hero() {
  const lang = useApp((s) => s.lang);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="bg-hero-radial relative -mt-16 overflow-hidden pt-28 pb-16 sm:pt-36">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 lg:grid-cols-2">
        {/* Floating Decorations */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="absolute top-[20%] left-[10%] text-4xl opacity-40 blur-[1px]">🍓</motion.div>
          <motion.div animate={{ y: [15, -15, 15], rotate: [-15, 0, -15] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} className="absolute top-[60%] left-[45%] text-5xl opacity-30 blur-[2px]">🥭</motion.div>
          <motion.div animate={{ y: [-15, 15, -15], rotate: [10, -10, 10] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }} className="absolute top-[30%] right-[10%] text-4xl opacity-40 blur-[1px]">🍋</motion.div>
        </div>

        <div className="relative z-10 text-center lg:text-start">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-primary-deep"
          >
            <Sparkles className="size-3.5" /> {t("hero_kicker", lang)}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-5xl leading-[1.1] font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className="text-gradient-caramel">{t("slogan", lang)}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-script mt-2 text-2xl text-primary"
          >
            {lang === "ar" ? "Enjoy the Natural Taste" : "استمتع بالمذاق الطبيعي"}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mx-auto mt-6 max-w-lg text-base text-muted-foreground sm:text-lg lg:mx-0"
          >
            {t("hero_sub", lang)}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <SplashButton to="/menu">{t("order_now", lang)}</SplashButton>
            <Link
              to="/menu"
              className="glass inline-flex h-13 items-center gap-2 rounded-full px-7 text-base font-semibold transition hover:bg-accent"
            >
              {t("explore_menu", lang)} <ArrowDown className="size-4" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative mx-auto aspect-square w-full max-w-[520px] lg:-order-1"
        >
          <div className="absolute inset-[12%] rounded-full bg-primary/25 blur-3xl" />
          <div className="absolute inset-[30%] rounded-full bg-mango/25 blur-3xl" />
          {mounted && (
            <Suspense fallback={<div className="absolute inset-[28%] animate-pulse rounded-full bg-primary/20" />}>
              <div className="absolute inset-0">
                <Hero3D />
              </div>
            </Suspense>
          )}
        </motion.div>
      </div>
    </section>
  );
}
