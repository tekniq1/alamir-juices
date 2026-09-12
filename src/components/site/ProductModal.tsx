import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useApp } from "@/store/app";
import { formatPrice, L, t } from "@/lib/i18n";
import { sizes, type SizeId } from "@/data/mock";
import { cn } from "@/lib/utils";

const fill: Record<string, string> = { mango: "bg-mango", berry: "bg-berry", lime: "bg-lime" };

const JUICE_SIZES = ["S", "L", "BOX"] as SizeId[];
const FRUIT_SIZES = ["PIECE", "KG"]   as SizeId[];

export function ProductModal() {
  const { activeProductId, openProduct, products, lang, addToCart } = useApp();
  const product = products.find((p) => p.id === activeProductId);

  const isJuice    = product?.categoryId === "juices";
  const isSandwich = product?.categoryId === "sandwiches";
  const isHotDrink = product?.categoryId === "hot_drinks";
  const isFruit    = product?.categoryId === "fruits";
  const showSizes  = isJuice || isFruit;

  const [size, setSize] = useState<SizeId>("S");
  const [qty,  setQty]  = useState(1);

  useEffect(() => {
    if (activeProductId) {
      const p = products.find((x) => x.id === activeProductId);
      setSize(p?.categoryId === "fruits" ? "PIECE" : "S");
      setQty(1);
    }
  }, [activeProductId, products]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && openProduct(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openProduct]);

  const sizeOpt = sizes.find((s) => s.id === size);
  // السعر لكل حجم: يستخدم sizePrice المخصص للمنتج إن وُجد
  const getPriceForSize = (sId: string): number => {
    if (!product) return 0;
    if (product.sizePrice && product.sizePrice[sId as SizeId] !== undefined)
      return product.sizePrice[sId as SizeId]!;
    if (isFruit)
      return sId === "KG" ? (product.kgPrice ?? product.basePrice) : product.basePrice;
    return product.basePrice + (sizes.find((s) => s.id === sId)?.priceDelta ?? 0);
  };
  const unit = product ? getPriceForSize(size) : 0;

  const add = () => {
    if (!product) return;
    addToCart({ productId: product.id, size, sugar: "0", addons: [], qty, unitPrice: unit });
    toast.success(
      lang === "ar"
        ? `أُضيف ${L(product.name, lang)} إلى السلة`
        : `${L(product.name, lang)} added to cart`,
    );
    openProduct(null);
  };

  const visibleSizes = isFruit
    ? sizes.filter((s) => FRUIT_SIZES.includes(s.id))
    : sizes.filter((s) => JUICE_SIZES.includes(s.id));

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => openProduct(null)}
            className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto max-h-[92dvh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-card shadow-lift sm:inset-0 sm:my-auto sm:h-fit sm:rounded-3xl"
          >
            <button
              onClick={() => openProduct(null)}
              className="glass absolute top-4 z-10 flex size-9 items-center justify-center rounded-full ltr:right-4 rtl:left-4"
              aria-label="close"
            >
              <X className="size-4" />
            </button>

            <div className="grid md:grid-cols-2">
              {/* صورة المنتج */}
              <div className="relative flex min-h-[280px] flex-col items-center justify-center overflow-hidden bg-hero-radial p-8">
                <div className={cn("absolute inset-[20%] rounded-full blur-3xl opacity-50", fill[product.color])} />
                <motion.div
                  key={size}
                  initial={{ scale: 0.9, opacity: 0.6 }}
                  animate={{ scale: sizeOpt?.scale ?? 0.9, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 16 }}
                  className="relative h-56 w-40 origin-bottom"
                >
                  {(isJuice || isHotDrink) && (
                    <div
                      className="absolute inset-0 overflow-hidden rounded-b-[3rem] rounded-t-xl border-2 border-ink/15 bg-card/40 backdrop-blur-sm"
                      style={{ clipPath: "polygon(0 0, 100% 0, 88% 100%, 12% 100%)" }}
                    >
                      <motion.div
                        animate={{ height: "60%" }}
                        transition={{ type: "spring", stiffness: 120, damping: 18 }}
                        className={cn("absolute inset-x-0 bottom-0", fill[product.color])}
                      >
                        <motion.div
                          animate={{ x: [0, 8, 0] }}
                          transition={{ repeat: Infinity, duration: 3 }}
                          className="absolute -top-2 inset-x-0 h-4 rounded-[50%] bg-card/30"
                        />
                      </motion.div>
                      <img src={product.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-multiply" />
                    </div>
                  )}

                  {(isSandwich || isFruit) && (
                    <div className="absolute inset-0 overflow-hidden rounded-3xl border-2 border-ink/10">
                      <img src={product.image} alt="" className="h-full w-full object-cover" />
                    </div>
                  )}

                  {isJuice && (
                    <div className="absolute -top-3 left-1/2 h-40 w-2 -translate-x-1/2 rotate-12 rounded-full bg-primary/60" />
                  )}
                </motion.div>

                {isJuice && sizeOpt && sizeOpt.ml > 0 && (
                  <p className="mt-6 text-xs font-medium text-muted-foreground">{sizeOpt.ml} ml</p>
                )}
              </div>

              {/* خيارات الطلب */}
              <div className="flex flex-col gap-5 p-6 sm:p-8">
                <div>
                  <h2 className="text-2xl font-bold">{L(product.name, lang)}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{L(product.description, lang)}</p>
                </div>

                {showSizes && (
                  <Section title={t("size", lang)}>
                    <div className={cn("grid gap-2", isFruit ? "grid-cols-2" : "grid-cols-3")}>
                      {visibleSizes.map((s) => {
                        const price = getPriceForSize(s.id);
                        return (
                          <Chip key={s.id} active={size === s.id} onClick={() => setSize(s.id)}>
                            <span className="block text-sm font-semibold">{L(s.label, lang)}</span>
                            <span className="block text-[11px] font-medium opacity-80">{price.toLocaleString()} ر.ي</span>
                          </Chip>
                        );
                      })}
                    </div>
                  </Section>
                )}

                <div className="mt-auto flex items-center gap-3">
                  <div className="flex items-center rounded-full border border-border">
                    <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex size-10 items-center justify-center" aria-label="-">
                      <Minus className="size-4" />
                    </button>
                    <span className="w-6 text-center font-semibold">{qty}</span>
                    <button onClick={() => setQty((q) => q + 1)} className="flex size-10 items-center justify-center" aria-label="+">
                      <Plus className="size-4" />
                    </button>
                  </div>
                  <button
                    onClick={add}
                    className="flex h-12 flex-1 items-center justify-between rounded-full bg-ink px-5 font-semibold text-ink-foreground shadow-caramel transition hover:bg-primary-deep"
                  >
                    <span>{t("add_to_cart", lang)}</span>
                    <span>{formatPrice(unit * qty, lang)}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</p>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-2xl border px-2 py-2 text-center transition",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-caramel"
          : "border-border bg-card hover:border-primary/50",
      )}
    >
      {children}
    </button>
  );
}
