import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, Leaf, Snowflake, Sparkles, Timer } from "lucide-react";
import { useApp } from "@/store/app";
import { L, t } from "@/lib/i18n";
import { categories } from "@/data/mock";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";

const accentBg: Record<string, string> = {
  mango: "from-mango/30 to-mango/5",
  primary: "from-primary/30 to-primary/5",
  berry: "from-berry/30 to-berry/5",
  lime: "from-lime/30 to-lime/5",
  ink: "from-ink/20 to-ink/5",
};

export function Categories() {
  const lang = useApp((s) => s.lang);
  return (
    <motion.section 
      initial={{ clipPath: "circle(0% at 50% 100%)" }}
      whileInView={{ clipPath: "circle(150% at 50% 100%)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mx-auto max-w-7xl px-6 py-16"
    >
      <SectionHead title={t("categories_title", lang)} sub={t("categories_sub", lang)} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} whileTap={{ scale: 0.97 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
            <Link
              to="/menu"
              search={{ q: undefined, cat: c.id }}
              className={cn("group flex h-full flex-col justify-between rounded-3xl border border-border bg-gradient-to-br p-5 shadow-glass transition hover:-translate-y-1 hover:shadow-lift", accentBg[c.accent], i === 0 && "lg:col-span-2")}
            >
              <span className="text-4xl transition group-hover:scale-125 group-hover:rotate-12">{c.emoji}</span>
              <div className="mt-8">
                <h3 className="font-semibold leading-tight">{L(c.name, lang)}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{L(c.tagline, lang)}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary-deep">
                  {t("view_all", lang)} <ArrowUpRight className="size-3.5 rtl:-scale-x-100" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export function Featured() {
  const { lang, products } = useApp();
  const top = [...products].filter((p) => p.inStock).sort((a, b) => b.rating - a.rating).slice(0, 4);
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <div className="flex items-end justify-between">
        <SectionHead title={t("featured_title", lang)} sub={t("featured_sub", lang)} />
        <Link to="/menu" search={{ q: undefined, cat: undefined }} className="mb-10 hidden text-sm font-semibold text-primary-deep hover:underline sm:block">
          {t("view_all", lang)} →
        </Link>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {top.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} isFeatured={true} />
        ))}
      </div>
    </section>
  );
}

export function Values() {
  const lang = useApp((s) => s.lang);
  const items = [
    { icon: Leaf, k: "value_natural", d: "value_natural_d", c: "bg-lime/20 text-lime" },
    { icon: Timer, k: "value_speed", d: "value_speed_d", c: "bg-mango/20 text-mango" },
    { icon: Snowflake, k: "value_cold", d: "value_cold_d", c: "bg-primary/20 text-primary-deep" },
    { icon: Sparkles, k: "value_hygiene", d: "value_hygiene_d", c: "bg-berry/20 text-berry" },
  ] as const;
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-4 rounded-[2rem] bg-ink p-6 text-ink-foreground sm:grid-cols-2 lg:grid-cols-4 lg:p-10">
        {items.map((it, i) => (
          <motion.div key={it.k} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl p-4">
            <span className={cn("flex size-11 items-center justify-center rounded-2xl", it.c)}>
              <it.icon className="size-5" />
            </span>
            <h3 className="mt-4 font-semibold">{t(it.k, lang)}</h3>
            <p className="mt-1 text-sm text-ink-foreground/70">{t(it.d, lang)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

import { BackButton } from "./BackButton";

export function SectionHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-10">
      <BackButton />
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {sub && <p className="mt-2 text-muted-foreground">{sub}</p>}
    </div>
  );
}
