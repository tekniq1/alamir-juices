import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Search, SearchX, ShoppingBag, HeartCrack } from "lucide-react";
import { useState, useEffect } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { ProductCardSkeleton } from "@/components/site/ProductSkeleton";
import { SectionHead } from "@/components/site/HomeSections";
import { useApp } from "@/store/app";
import { L, t } from "@/lib/i18n";

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
  const navigate = useNavigate();
  const { lang, products, wishlist, categories } = useApp();
  const [limit, setLimit] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  const query = (q ?? "").toLowerCase();

  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 400); // 400ms smooth simulated delay
    return () => clearTimeout(t);
  }, [q, cat]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    navigate({ to: "/menu", search: { q: e.target.value || undefined, cat }, replace: true });
  };

  const list = products.filter((p) => {
    if (cat === "wishlist" && !wishlist.includes(p.id)) return false;
    if (cat && cat !== "wishlist" && p.categoryId !== cat) return false;
    if (query && !`${p.name.ar} ${p.name.en} ${p.description.ar} ${p.description.en}`.toLowerCase().includes(query)) return false;
    return true;
  });

  const visibleList = list.slice(0, limit);
  const hasMore = limit < list.length;

  const tabs = [{ id: undefined as string | undefined, label: t("all", lang) }, ...(categories || []).map((c) => ({ id: c.id as string, label: (lang === "ar" ? c.nameAr : c.nameEn) }))];

  const getEmptyState = () => {
    if (cat === "wishlist") {
      return {
        icon: HeartCrack,
        ar: "قائمة المفضلة فارغة",
        en: "Your wishlist is empty",
        descAr: "لم تقم بإضافة أي منتجات إلى المفضلة بعد.",
        descEn: "You haven't added any products to your wishlist yet.",
        action: () => navigate({ to: "/menu", search: { q: undefined, cat: undefined } }),
        actionAr: "تصفح المنيو",
        actionEn: "Browse Menu",
      };
    }
    if (q) {
      return {
        icon: SearchX,
        ar: "لا توجد نتائج بحث",
        en: "No search results",
        descAr: `لم نتمكن من العثور على أي منتج يطابق "${q}"`,
        descEn: `We couldn't find any products matching "${q}"`,
        action: () => navigate({ to: "/menu", search: { q: undefined, cat } }),
        actionAr: "مسح البحث",
        actionEn: "Clear Search",
      };
    }
    return {
      icon: ShoppingBag,
      ar: "لا توجد منتجات حالياً",
      en: "No products available",
      descAr: "هذا التصنيف فارغ في الوقت الحالي، جرب تصنيفاً آخر.",
      descEn: "This category is currently empty, try another one.",
      action: () => navigate({ to: "/menu", search: { q: undefined, cat: undefined } }),
      actionAr: "عرض جميع المنتجات",
      actionEn: "View All Products",
    };
  };

  const emptyState = getEmptyState();
  const EmptyIcon = emptyState.icon;

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-20">
        <SectionHead title={cat === "wishlist" ? t("wishlist", lang) : t("menu_title", lang)} sub={t("menu_sub", lang)} />
        
        <div className="mb-6 relative">
          <Search className="pointer-events-none absolute top-1/2 size-5 -translate-y-1/2 text-muted-foreground ltr:left-4 rtl:right-4" />
          <input
            value={q ?? ""}
            onChange={handleSearch}
            placeholder={lang === "ar" ? "ابحث عن عصير، سموذي، أو ديتوكس..." : "Search for juice, smoothie, or detox..."}
            className="h-14 w-full rounded-2xl border border-border bg-card shadow-sm outline-none ring-primary/40 transition focus:ring-2 ltr:pl-12 ltr:pr-4 rtl:pr-12 rtl:pl-4"
          />
        </div>

        {/* Category Tabs */}
        <div className="sticky top-[72px] z-30 -mx-6 mb-8 flex gap-2 overflow-x-auto bg-background/90 px-6 py-3 backdrop-blur-md no-scrollbar">
          {tabs.map((tab) => {
            const isActive = (cat ?? undefined) === tab.id;
            return (
              <Link
                key={tab.id ?? "all"}
                to="/menu"
                search={{ q, cat: tab.id }}
                onClick={() => setLimit(12)}
                className={cn("relative shrink-0 rounded-full border px-4 py-2 text-sm transition-colors", isActive ? "border-transparent text-ink-foreground" : "border-border bg-card hover:border-primary")}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeMenuTab"
                    className="absolute inset-0 -z-10 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {tab.label}
              </Link>
            );
          })}
          <Link 
            to="/menu" 
            search={{ q, cat: "wishlist" }} 
            onClick={() => setLimit(12)}
            className={cn("relative flex shrink-0 items-center gap-1 rounded-full border px-4 py-2 text-sm transition-colors", cat === "wishlist" ? "border-transparent text-ink-foreground" : "border-border bg-card")}
          >
            {cat === "wishlist" && (
              <motion.div
                layoutId="activeMenuTab"
                className="absolute inset-0 -z-10 rounded-full bg-berry"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <Heart className={cn("size-4", cat === "wishlist" && "fill-current")} /> {t("wishlist", lang)}
          </Link>
        </div>

        <AnimatePresence mode="popLayout">
          {isLoading ? (
            <motion.div layout key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </motion.div>
          ) : visibleList.length ? (
            <motion.div layout key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleList.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div layout key="empty" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/50 p-16 text-center shadow-sm">
              <span className="flex size-20 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                <EmptyIcon className="size-10" />
              </span>
              <h3 className="mt-6 text-xl font-bold text-foreground">{lang === "ar" ? emptyState.ar : emptyState.en}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{lang === "ar" ? emptyState.descAr : emptyState.descEn}</p>
              <button
                onClick={emptyState.action}
                className="mt-8 rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-ink-foreground transition hover:bg-primary-deep"
              >
                {lang === "ar" ? emptyState.actionAr : emptyState.actionEn}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {hasMore && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setLimit((l) => l + 12)}
              className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-card px-8 text-sm font-semibold transition hover:bg-accent hover:text-foreground"
            >
              {lang === "ar" ? "عرض المزيد" : "Load More"}
            </button>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}

