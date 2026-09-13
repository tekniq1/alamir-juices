import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, Trash2, X, ShoppingBag } from "lucide-react";
import { useApp, cartTotal } from "@/store/app";
import { formatPrice, L, t } from "@/lib/i18n";
import { sizes, addons } from "@/data/mock";

export function CartDrawer() {
  const { cartOpen, setCartOpen, cart, products, updateQty, removeLine, lang } = useApp();
  const total = cartTotal(cart);
  const side = lang === "ar" ? -1 : 1;

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: `${side * 100}%` }}
            animate={{ x: 0 }}
            exit={{ x: `${side * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed inset-y-0 end-0 z-50 flex w-full max-w-md flex-col bg-background shadow-lift"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <ShoppingBag className="size-5 text-primary" /> {t("cart", lang)}
              </h2>
              <div className="flex items-center gap-2">
                {cart.length > 0 && (
                  <button
                    onClick={() => {
                      if (confirm(lang === "ar" ? "هل أنت متأكد من تفريغ السلة؟" : "Are you sure you want to clear the cart?")) {
                        useApp.getState().clearCart();
                      }
                    }}
                    className="text-xs font-semibold text-muted-foreground hover:text-berry"
                  >
                    {lang === "ar" ? "تفريغ" : "Clear"}
                  </button>
                )}
                <button onClick={() => setCartOpen(false)} className="rounded-full p-2 hover:bg-accent" aria-label="Close">
                  <X className="size-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {cart.length === 0 && (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-muted-foreground">
                  <span className="text-5xl">🥤</span>
                  <p>{t("empty_cart", lang)}</p>
                </div>
              )}
              {cart.map((line) => {
                const p = products.find((x) => x.id === line.productId);
                if (!p) return null;
                const size = sizes.find((s) => s.id === line.size)!;
                return (
                  <motion.div layout key={line.lineId} className="flex gap-3 rounded-2xl border border-border bg-card p-3">
                    <img src={p.image} alt={L(p.name, lang)} width={72} height={72} loading="lazy" className="size-18 rounded-xl object-cover" />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium leading-tight">{L(p.name, lang)}</p>
                          <p className="text-xs text-muted-foreground">
                            {L(size.label, lang)}
                            {line.addons.length > 0 && " • " + line.addons.map((a) => L(addons.find((x) => x.id === a)!.label, lang)).join("، ")}
                          </p>
                          {line.notes && (
                            <p className="mt-1 text-xs text-primary-deep/80">
                              {lang === "ar" ? "ملاحظات: " : "Notes: "} {line.notes}
                            </p>
                          )}
                        </div>
                        <button onClick={() => removeLine(line.lineId)} className="text-muted-foreground hover:text-berry" aria-label={t("remove", lang)}>
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1 rounded-full border border-border">
                          <button onClick={() => updateQty(line.lineId, line.qty - 1)} className="p-1.5 hover:text-primary" aria-label="-"><Minus className="size-3.5" /></button>
                          <span className="w-5 text-center text-sm font-semibold tabular-nums">{line.qty}</span>
                          <button onClick={() => updateQty(line.lineId, line.qty + 1)} className="p-1.5 hover:text-primary" aria-label="+"><Plus className="size-3.5" /></button>
                        </div>
                        <span className="text-sm font-semibold">{formatPrice(line.unitPrice * line.qty, lang)}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-border p-5 space-y-3">
                <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
                  <span>{t("subtotal", lang)}</span>
                  <span className="text-base font-bold text-foreground">{formatPrice(total, lang)}</span>
                </div>
                {/* WhatsApp Order */}
                <button
                  onClick={() => {
                    const lines = cart.map((l) => {
                      const p = products.find((x) => x.id === l.productId);
                      const pName = p ? (lang === "ar" ? p.name.ar : p.name.en) : l.productId;
                      return `- ${pName} (${l.size} × ${l.qty}) = ${l.unitPrice * l.qty} ر.ي`;
                    });
                    const msg = lang === "ar"
                      ? `مرحباً، أريد طلب التالي من عصائر الأمير:\n\n${lines.join("\n")}\n\nالإجمالي: ${total} ر.ي`
                      : `Hello, I'd like to order from Alamir Juices:\n\n${lines.join("\n")}\n\nTotal: ${total} YER`;
                    window.open(`https://wa.me/${siteSettings.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
                    setCartOpen(false);
                  }}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] font-semibold text-white transition hover:bg-[#1ebe5d]"
                >
                  <span>💬</span> {lang === "ar" ? "اطلب عبر واتساب" : "Order via WhatsApp"}
                </button>
                <Link
                  to="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="flex h-12 w-full items-center justify-center rounded-full bg-ink text-base font-semibold text-ink-foreground shadow-caramel transition hover:bg-primary-deep"
                >
                  {t("checkout", lang)}
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

