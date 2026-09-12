import { motion } from "motion/react";
import { Heart, Plus, Star } from "lucide-react";
import { useApp } from "@/store/app";
import { formatPrice, L, t } from "@/lib/i18n";
import type { Product } from "@/data/mock";
import { cn } from "@/lib/utils";

const glow: Record<string, string> = { mango: "bg-mango/30", berry: "bg-berry/30", lime: "bg-lime/30" };

export function ProductCard({ product, index = 0, isFeatured = false }: { product: Product; index?: number; isFeatured?: boolean }) {
  const { lang, wishlist, toggleWishlist, openProduct } = useApp();
  const liked = wishlist.includes(product.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % 4) * 0.07, duration: 0.4 }}
      whileHover="hover"
      whileTap="tap"
      variants={{
        hover: { y: -6 },
        tap: { scale: 0.96 },
      }}
      className={cn("group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-glass", isFeatured && "shadow-lift border-primary/20")}
    >
      <button
        onClick={() => toggleWishlist(product.id)}
        aria-label={t("wishlist", lang)}
        className="glass absolute top-3 z-10 flex size-9 items-center justify-center rounded-full transition hover:scale-110 ltr:right-3 rtl:left-3"
      >
        <Heart className={cn("size-4 transition", liked && "fill-berry text-berry")} />
      </button>
      {product.tags[0] && (
        <span className="absolute top-3 z-10 rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-ink-foreground ltr:left-3 rtl:right-3">
          {L(product.tags[0], lang)}
        </span>
      )}

      <button onClick={() => product.inStock && openProduct(product.id)} className="relative aspect-[4/3] overflow-hidden" aria-label={L(product.name, lang)}>
        <div className={cn("absolute inset-x-8 bottom-0 h-1/2 rounded-full blur-2xl transition-opacity", glow[product.color], isFeatured && "group-hover:opacity-80")} />
        <motion.img
          src={product.image}
          alt={L(product.name, lang)}
          loading="lazy"
          variants={isFeatured ? {
            hover: { scale: 1.1, rotate: 2, y: -4 },
            tap: { scale: 1.15, rotate: -1, y: -6 }
          } : undefined}
          className={cn("relative h-full w-full object-cover transition-all duration-700", !isFeatured && "group-hover:scale-110 group-hover:rotate-2", !product.inStock && "grayscale")}
        />
        {!product.inStock && (
          <span className="absolute inset-0 flex items-center justify-center bg-ink/50 text-sm font-semibold text-ink-foreground">{t("sold_out", lang)}</span>
        )}
      </button>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-tight">{L(product.name, lang)}</h3>
          <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-mango text-mango" /> {product.rating}
          </span>
        </div>
        <p className="line-clamp-2 text-xs text-muted-foreground">{L(product.description, lang)}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-primary-deep">{formatPrice(product.basePrice, lang)}</span>
          <button
            disabled={!product.inStock}
            onClick={() => openProduct(product.id)}
            className="flex h-9 items-center gap-1.5 rounded-full bg-ink px-4 text-xs font-semibold text-ink-foreground transition hover:bg-primary-deep disabled:opacity-40"
          >
            <Plus className="size-4" /> {t("customize", lang)}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
