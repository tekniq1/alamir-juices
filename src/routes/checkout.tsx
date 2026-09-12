import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Apple, Banknote, CreditCard, MapPin, Zap, CalendarClock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHead } from "@/components/site/HomeSections";
import { useApp, cartTotal } from "@/store/app";
import { formatPrice, L, t } from "@/lib/i18n";
import { sizes } from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "إتمام الطلب | عصائر الأمير" },
      { name: "description", content: "حدّد موقعك على الخريطة، اختر وقت التوصيل وطريقة الدفع، وأكّد طلبك من عصائر الأمير." },
      { property: "og:title", content: "Checkout — Alamir Juices" },
      { property: "og:description", content: "Drop your pin, pick a delivery slot and pay your way." },
    ],
  }),
  component: CheckoutPage,
});

const slots = ["12:00", "13:00", "14:00", "16:00", "18:00", "20:00"];

function CheckoutPage() {
  const { lang, cart, products, placeOrder } = useApp();
  const navigate = useNavigate();
  const [pin, setPin] = useState<{ x: number; y: number } | null>(null);
  const [timing, setTiming] = useState<"instant" | "scheduled">("instant");
  const [slot, setSlot] = useState(slots[2]);
  const [payment, setPayment] = useState<"apple" | "card" | "cash">("apple");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [placed, setPlaced] = useState<string | null>(null);

  const subtotal = cartTotal(cart);
  const fee = subtotal >= 50 || subtotal === 0 ? 0 : 5;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cart.length) return toast.error(t("empty_cart", lang));
    if (!pin) return toast.error(t("pick_location", lang));
    if (!name || !phone) return toast.error(lang === "ar" ? "أدخل الاسم ورقم الجوال" : "Enter name and phone");
    const order = placeOrder({
      customer: name,
      phone,
      items: cart.map((l) => ({ name: products.find((p) => p.id === l.productId)!.name, qty: l.qty, size: l.size })),
      total: subtotal + fee,
      eta: timing === "instant" ? 30 : 60,
      payment,
      address: `${lang === "ar" ? "موقع الخريطة" : "Map pin"} (${pin.x.toFixed(0)}, ${pin.y.toFixed(0)})`,
    });
    setPlaced(order.id);
  };

  if (placed) {
    const waMsg = encodeURIComponent(
      lang === "ar"
        ? `مرحباً، طلبي رقم ${placed} — أريد الاستفسار عن موعد التوصيل`
        : `Hello, my order is ${placed} — I'd like to ask about my delivery status`,
    );
    return (
      <SiteLayout>
        <div className="mx-auto max-w-lg px-6 py-24 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="mx-auto flex size-24 items-center justify-center rounded-full bg-lime/20 text-lime">
            <CheckCircle2 className="size-12" />
          </motion.div>
          <h1 className="mt-6 text-3xl font-bold">{t("order_placed", lang)}</h1>
          <p className="mt-2 text-muted-foreground">{t("order_placed_sub", lang)}</p>
          <p className="mt-4 text-4xl font-bold tracking-wider text-primary-deep">{placed}</p>
          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={() => window.open(`https://wa.me/967771234567?text=${waMsg}`, "_blank")}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] font-semibold text-white transition hover:bg-[#1ebe5d]"
            >
              <span>💬</span> {lang === "ar" ? "تواصل معنا عبر واتساب" : "Contact us via WhatsApp"}
            </button>
            <div className="flex justify-center gap-3">
              <button onClick={() => navigate({ to: "/track", search: { id: placed } })} className="h-12 rounded-full bg-ink px-6 font-semibold text-ink-foreground">
                {t("nav_track", lang)}
              </button>
              <Link to="/menu" search={{ q: undefined, cat: undefined }} className="glass flex h-12 items-center rounded-full px-6 font-semibold">
                {t("back_to_store", lang)}
              </Link>
            </div>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <form onSubmit={submit} className="mx-auto grid max-w-7xl gap-8 px-6 pt-10 pb-20 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <SectionHead title={t("checkout", lang)} />

          <Block title={t("delivery_address", lang)} icon={<MapPin className="size-4" />}>
            <div
              onClick={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                setPin({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
              }}
              className="relative aspect-[16/8] cursor-crosshair overflow-hidden rounded-2xl border border-border bg-secondary"
              style={{ backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
            >
              <div className="absolute inset-x-0 top-1/3 h-3 -rotate-6 bg-primary/20" />
              <div className="absolute inset-y-0 left-2/3 w-3 rotate-6 bg-primary/20" />
              <div className="absolute bottom-6 left-8 h-16 w-28 rounded-full bg-lime/20" />
              <div className="absolute top-6 right-10 h-14 w-14 rounded-2xl bg-mango/20" />
              {!pin && <p className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">{t("pick_location", lang)}</p>}
              {pin && (
                <motion.div key={`${pin.x}-${pin.y}`} initial={{ y: -30, scale: 0.5 }} animate={{ y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 15 }} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: `${pin.x}%`, top: `${pin.y}%` }}>
                  <MapPin className="size-9 fill-berry text-berry drop-shadow-lg" />
                  <span className="absolute -bottom-1 left-1/2 size-3 -translate-x-1/2 animate-ping rounded-full bg-berry/50" />
                </motion.div>
              )}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t("name", lang)} className="h-11 rounded-xl border border-border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t("phone", lang)} dir="ltr" className="h-11 rounded-xl border border-border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
          </Block>

          <Block title={t("delivery_time", lang)} icon={<Zap className="size-4" />}>
            <div className="grid gap-3 sm:grid-cols-2">
              <Option active={timing === "instant"} onClick={() => setTiming("instant")} icon={<Zap className="size-5" />} label={t("instant", lang)} />
              <Option active={timing === "scheduled"} onClick={() => setTiming("scheduled")} icon={<CalendarClock className="size-5" />} label={t("scheduled", lang)} />
            </div>
            {timing === "scheduled" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 flex flex-wrap gap-2">
                {slots.map((s) => (
                  <button key={s} type="button" onClick={() => setSlot(s)} className={cn("rounded-full border px-4 py-1.5 text-sm", slot === s ? "border-primary bg-primary text-primary-foreground" : "border-border")}>{s}</button>
                ))}
              </motion.div>
            )}
          </Block>

          <Block title={t("payment", lang)} icon={<CreditCard className="size-4" />}>
            <div className="grid gap-3 sm:grid-cols-3">
              <Option active={payment === "apple"} onClick={() => setPayment("apple")} icon={<Apple className="size-5" />} label={t("apple_pay", lang)} />
              <Option active={payment === "card"} onClick={() => setPayment("card")} icon={<CreditCard className="size-5" />} label={t("card", lang)} />
              <Option active={payment === "cash"} onClick={() => setPayment("cash")} icon={<Banknote className="size-5" />} label={t("cash", lang)} />
            </div>
          </Block>
        </div>

        <aside className="glass h-fit rounded-3xl p-6 lg:sticky lg:top-24">
          <h2 className="font-semibold">{t("cart", lang)}</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {cart.length === 0 && <li className="text-muted-foreground">{t("empty_cart", lang)}</li>}
            {cart.map((l) => {
              const p = products.find((x) => x.id === l.productId)!;
              return (
                <li key={l.lineId} className="flex items-center gap-3">
                  <img src={p.image} alt="" className="size-12 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="font-medium">{L(p.name, lang)}</p>
                    <p className="text-xs text-muted-foreground">{L(sizes.find((s) => s.id === l.size)!.label, lang)} × {l.qty}</p>
                  </div>
                  <span>{formatPrice(l.unitPrice * l.qty, lang)}</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
            <Row label={t("subtotal", lang)} value={formatPrice(subtotal, lang)} />
            <Row label={t("delivery_fee", lang)} value={fee ? formatPrice(fee, lang) : t("free", lang)} />
            <Row label={t("total", lang)} value={formatPrice(subtotal + fee, lang)} bold />
          </div>
          {/* Coupon code */}
          <div className="mt-4 flex gap-2">
            <input
              placeholder={lang === "ar" ? "كود الخصم (اختياري)" : "Discount code (optional)"}
              className="h-10 flex-1 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button
              type="button"
              className="h-10 rounded-xl border border-border px-3 text-xs font-semibold transition hover:bg-accent"
            >
              {lang === "ar" ? "تطبيق" : "Apply"}
            </button>
          </div>
          {/* Notes */}
          <textarea
            placeholder={lang === "ar" ? "ملاحظات على الطلب (اختياري)" : "Order notes (optional)"}
            rows={2}
            className="mt-3 w-full resize-none rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
          />
          <button type="submit" className="mt-4 h-12 w-full rounded-full bg-ink font-semibold text-ink-foreground shadow-caramel transition hover:bg-primary-deep">
            {t("place_order", lang)}
          </button>
        </aside>
      </form>
    </SiteLayout>
  );
}

function Block({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-border bg-card p-5 shadow-glass sm:p-6">
      <h2 className="mb-4 flex items-center gap-2 font-semibold"><span className="flex size-7 items-center justify-center rounded-full bg-accent text-accent-foreground">{icon}</span>{title}</h2>
      {children}
    </section>
  );
}

function Option({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button type="button" onClick={onClick} className={cn("flex items-center gap-3 rounded-2xl border p-4 text-sm font-medium transition", active ? "border-primary bg-primary/10 ring-2 ring-primary/30" : "border-border hover:border-primary/50")}>
      <span className={cn("flex size-9 items-center justify-center rounded-xl", active ? "bg-primary text-primary-foreground" : "bg-secondary")}>{icon}</span>
      {label}
    </button>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={cn("flex justify-between", bold && "text-base font-bold")}>
      <span className={bold ? "" : "text-muted-foreground"}>{label}</span>
      <span>{value}</span>
    </div>
  );
}
