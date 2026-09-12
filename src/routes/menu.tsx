import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionHead } from "@/components/site/HomeSections";
import { useApp } from "@/store/app";
import { L, t } from "@/lib/i18n";
import { categories } from "@/data/mock";
import { cn } from "@/lib/utils";

type MenuSearch = { q?: string; cat?: string };

export const Route = createFileRoute("/menu")({
  validateSearch: (s: Record<string, unknown>): MenuSearch => ({
    q: typeof s.q === "string" && s.q ? s.q : undefined,
    cat: typeof s.cat === "string" && s.cat ? s.cat : undefined,
  }),
  head: () => ({
    meta: [
      { title: "القائمة | عصائر الأمير — Menu" },
      { name: "description", content: "تصفح قائمة عصائر الأمير: عصائر كلاسيكية، تواقيع الأمير، سموذي، ديتوكس، وأباريق عائلية." },
      { property: "og:title", content: "Alamir Juices Menu" },
      { property: "og:description", content: "Classic juices, Prince signatures, smoothies, detox and family jugs." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const { q, cat } = Route.useSearch();
  const { lang, products, wishlist } = useApp();
  const query = (q ?? "").toLowerCase();

  const list = products.filter((p) => {
    if (cat === "wishlist" && !wishlist.includes(p.id)) return false;
    if (cat && cat !== "wishlist" && p.categoryId !== cat) return false;
    if (query && !`${p.name.ar} ${p.name.en} ${p.description.ar} ${p.description.en}`.toLowerCase().includes(query)) return false;
    return true;
  });

  const tabs = [{ id: undefined as string | undefined, label: t("all", lang) }, ...categories.map((c) => ({ id: c.id as string, label: L(c.name, lang) }))];

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-20">
        <SectionHead title={cat === "wishlist" ? t("wishlist", lang) : t("menu_title", lang)} sub={t("menu_sub", lang)} />
        <div className="no-scrollbar -mx-6 mb-8 flex gap-2 overflow-x-auto px-6 pb-1">
          {tabs.map((tab) => (
            <Link
              key={tab.id ?? "all"}
              to="/menu"
              search={{ q, cat: tab.id }}
              className={cn("shrink-0 rounded-full border px-4 py-2 text-sm transition", (cat ?? undefined) === tab.id ? "border-ink bg-ink text-ink-foreground" : "border-border bg-card hover:border-primary")}
            >
              {tab.label}
            </Link>
          ))}
          <Link to="/menu" search={{ q, cat: "wishlist" }} className={cn("flex shrink-0 items-center gap-1 rounded-full border px-4 py-2 text-sm transition", cat === "wishlist" ? "border-berry bg-berry text-ink-foreground" : "border-border bg-card")}>
            <Heart className="size-4" /> {t("wishlist", lang)}
          </Link>
        </div>

        <AnimatePresence mode="popLayout">
          {list.length ? (
            <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {list.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-3xl border border-dashed border-border p-16 text-center text-muted-foreground">
              {t("not_found", lang)}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </SiteLayout>
  );
}
