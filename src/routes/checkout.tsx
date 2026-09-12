import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { MapPin, Banknote, Landmark, Store, Bike, Crosshair, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHead } from "@/components/site/HomeSections";
import { useApp, cartTotal } from "@/store/app";
import { formatPrice, L, t } from "@/lib/i18n";
import { sizes } from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [{ title: "إتمام الطلب | عصائر الأمير" }],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { lang, cart, products, clearCart } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">("delivery");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState<"cash" | "transfer">("cash");
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cartTotal(cart);
  const fee = deliveryType === "delivery" && subtotal > 0 && subtotal < 50 ? 5 : 0;
  const total = subtotal + fee;

  const requestLocation = () => {
    if (!navigator.geolocation) {
      toast.error(lang === "ar" ? "المتصفح لا يدعم تحديد الموقع" : "Geolocation not supported");
      return;
    }
    const toastId = toast.loading(lang === "ar" ? "جاري تحديد موقعك..." : "Locating...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setAddress(`https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`);
        toast.success(lang === "ar" ? "تم تحديد الموقع" : "Location found", { id: toastId });
      },
      () => {
        toast.error(lang === "ar" ? "فشل تحديد الموقع. يرجى كتابته يدوياً." : "Failed to locate. Please enter manually.", { id: toastId });
      }
    );
  };

  const submit = () => {
    if (!cart.length) return;
    const lines = cart.map((l) => {
      const p = products.find((x) => x.id === l.productId);
      const pName = p ? (lang === "ar" ? p.name.ar : p.name.en) : l.productId;
      const sizeLabel = L(sizes.find((s) => s.id === l.size)!.label, lang);
      const notes = l.notes ? ` (ملاحظات: ${l.notes})` : "";
      return `- ${pName} | ${sizeLabel} | كمية: ${l.qty} | ${l.unitPrice * l.qty} ر.ي${notes}`;
    });

    const msg = lang === "ar"
      ? `*طلب جديد من عصائر الأمير* 🥤\n\n*العميل:* ${name}\n*الهاتف:* ${phone}\n*طريقة الاستلام:* ${deliveryType === "delivery" ? "توصيل" : "استلام من المحل"}\n${deliveryType === "delivery" ? `*الموقع:* ${address}\n` : ""}\n*المنتجات:*\n${lines.join("\n")}\n\n*طريقة الدفع:* ${payment === "cash" ? "كاش" : "حوالة بنكية"}\n*الإجمالي:* ${total} ر.ي`
      : `*New Order - Alamir Juices* 🥤\n\n*Customer:* ${name}\n*Phone:* ${phone}\n*Method:* ${deliveryType === "delivery" ? "Delivery" : "Pickup"}\n${deliveryType === "delivery" ? `*Address:* ${address}\n` : ""}\n*Items:*\n${lines.join("\n")}\n\n*Payment:* ${payment === "cash" ? "Cash" : "Transfer"}\n*Total:* ${total} YER`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/967776655876?text=${encoded}`, "_blank");
    
    setIsSuccess(true);
    clearCart();
  };

  if (!useApp((s) => s._hasHydrated)) {
    return (
      <SiteLayout>
        <div className="mx-auto flex max-w-lg items-center justify-center px-6 py-32">
          <div className="size-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
        </div>
      </SiteLayout>
    );
  }

  if (isSuccess) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-lg px-6 py-24 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="mx-auto flex size-24 items-center justify-center rounded-full bg-lime/20 text-lime">
            <CheckCircle2 className="size-12" />
          </motion.div>
          <h1 className="mt-6 text-3xl font-bold">{lang === "ar" ? "تم تجهيز الطلب" : "Order Prepared"}</h1>
          <p className="mt-2 text-muted-foreground">{lang === "ar" ? "تم تحويلك إلى واتساب لإرسال الطلب للمحل." : "You have been redirected to WhatsApp to send your order."}</p>
          <Link to="/menu" search={{ q: undefined, cat: undefined }} className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-ink px-8 font-semibold text-ink-foreground shadow-caramel transition hover:bg-primary-deep">
            {lang === "ar" ? "طلب جديد" : "New Order"}
          </Link>
        </div>
      </SiteLayout>
    );
  }

  if (cart.length === 0) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-lg px-6 py-32 text-center">
          <span className="text-6xl">🛒</span>
          <h1 className="mt-6 text-2xl font-bold">{t("empty_cart", lang)}</h1>
          <p className="mt-2 text-muted-foreground">{lang === "ar" ? "يبدو أنك لم تقم بإضافة أي منتجات إلى السلة حتى الآن." : "It looks like you haven't added any products to your cart yet."}</p>
          <Link to="/menu" search={{ q: undefined, cat: undefined }} className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-ink px-8 font-semibold text-ink-foreground shadow-caramel transition hover:bg-primary-deep">
            {lang === "ar" ? "تصفح المنيو" : "Browse Menu"}
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const steps = [
    {
      title: lang === "ar" ? "البيانات الشخصية" : "Personal Info",
      content: (
        <div className="space-y-4">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t("name", lang)} className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t("phone", lang)} dir="ltr" className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
        </div>
      ),
      isValid: name.trim().length > 2 && phone.trim().length > 4,
    },
    {
      title: lang === "ar" ? "طريقة الاستلام" : "Delivery Method",
      content: (
        <div className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <Option active={deliveryType === "delivery"} onClick={() => setDeliveryType("delivery")} icon={<Bike className="size-5" />} label={lang === "ar" ? "توصيل للمنزل" : "Home Delivery"} />
            <Option active={deliveryType === "pickup"} onClick={() => setDeliveryType("pickup")} icon={<Store className="size-5" />} label={lang === "ar" ? "استلام من المحل" : "Store Pickup"} />
          </div>
          
          <AnimatePresence mode="popLayout">
            {deliveryType === "delivery" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-3 overflow-hidden">
                <button onClick={requestLocation} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-secondary font-medium text-foreground transition hover:bg-accent">
                  <Crosshair className="size-4 text-primary" />
                  {lang === "ar" ? "تحديد موقعي التلقائي" : "Auto-detect my location"}
                </button>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={lang === "ar" ? "أو اكتب عنوانك بالتفصيل هنا..." : "Or type your address in detail..."}
                  rows={3}
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                />
              </motion.div>
            )}
            {deliveryType === "pickup" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex overflow-hidden rounded-xl bg-secondary p-4">
                <div className="flex gap-3 text-sm">
                  <MapPin className="size-5 text-primary shrink-0" />
                  <p>{lang === "ar" ? "سيتم تجهيز طلبك لاستلامه من فرعنا الرئيسي: صنعاء - اليمن." : "Your order will be prepared for pickup at our main branch: Sanaa - Yemen."}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ),
      isValid: deliveryType === "pickup" || (deliveryType === "delivery" && address.trim().length > 5),
    },
    {
      title: lang === "ar" ? "طريقة الدفع" : "Payment Method",
      content: (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <Option active={payment === "cash"} onClick={() => setPayment("cash")} icon={<Banknote className="size-5" />} label={lang === "ar" ? "كاش (عند الاستلام)" : "Cash on delivery"} />
            <Option active={payment === "transfer"} onClick={() => setPayment("transfer")} icon={<Landmark className="size-5" />} label={lang === "ar" ? "حوالة بنكية" : "Bank Transfer"} />
          </div>
          <AnimatePresence mode="popLayout">
            {payment === "transfer" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                <div className="rounded-xl border border-border bg-card p-4 text-sm leading-relaxed">
                  <p className="font-semibold text-primary">{lang === "ar" ? "بيانات التحويل:" : "Transfer Details:"}</p>
                  <p className="mt-2 text-muted-foreground">{lang === "ar" ? "[سيتم إضافة حسابات المحل هنا — بنك الكريمي، النجم، إلخ]" : "[Store accounts will be added here]"}</p>
                  <p className="mt-2 font-medium text-amber-500">{lang === "ar" ? "يرجى إرفاق صورة السند في رسالة الواتساب بعد إرسال الطلب." : "Please attach the receipt in WhatsApp after sending the order."}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ),
      isValid: true,
    },
    {
      title: lang === "ar" ? "مراجعة الطلب" : "Review Order",
      content: (
        <div className="space-y-5">
          <div className="rounded-2xl bg-secondary p-4 text-sm space-y-2">
            <Row label={lang === "ar" ? "الاسم" : "Name"} value={name} />
            <Row label={lang === "ar" ? "الهاتف" : "Phone"} value={phone} />
            <Row label={lang === "ar" ? "الاستلام" : "Delivery"} value={deliveryType === "delivery" ? (lang === "ar" ? "توصيل" : "Delivery") : (lang === "ar" ? "من المحل" : "Pickup")} />
            {deliveryType === "delivery" && <Row label={lang === "ar" ? "الموقع" : "Address"} value={address} className="items-start" valueClass="text-end max-w-[60%] line-clamp-2" />}
            <Row label={lang === "ar" ? "الدفع" : "Payment"} value={payment === "cash" ? (lang === "ar" ? "كاش" : "Cash") : (lang === "ar" ? "حوالة" : "Transfer")} />
          </div>
          
          <ul className="space-y-3 text-sm">
            {cart.map((l) => {
              const p = products.find((x) => x.id === l.productId)!;
              return (
                <li key={l.lineId} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
                  <img src={p.image} alt="" className="size-12 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="font-medium">{L(p.name, lang)}</p>
                    <p className="text-xs text-muted-foreground">{L(sizes.find((s) => s.id === l.size)!.label, lang)} × {l.qty}</p>
                    {l.notes && <p className="mt-1 text-xs text-primary-deep/80">{l.notes}</p>}
                  </div>
                  <span className="font-semibold">{formatPrice(l.unitPrice * l.qty, lang)}</span>
                </li>
              );
            })}
          </ul>

          <div className="space-y-2 rounded-2xl bg-secondary p-4 text-sm">
            <Row label={t("subtotal", lang)} value={formatPrice(subtotal, lang)} />
            {deliveryType === "delivery" && <Row label={t("delivery_fee", lang)} value={fee ? formatPrice(fee, lang) : t("free", lang)} />}
            <div className="my-2 h-px w-full bg-border" />
            <Row label={t("total", lang)} value={formatPrice(total, lang)} bold />
          </div>
        </div>
      ),
      isValid: true,
    },
  ];

  const current = steps[step];

  return (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-6 pt-10 pb-24">
        <SectionHead title={t("checkout", lang)} />
        
        {/* Progress Bar */}
        <div className="mb-8 flex gap-2">
          {steps.map((_, i) => (
            <div key={i} className={cn("h-1.5 flex-1 rounded-full transition-colors duration-300", i <= step ? "bg-primary" : "bg-secondary")} />
          ))}
        </div>

        <div className="rounded-3xl border border-border bg-card p-5 shadow-glass sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: lang === "ar" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: lang === "ar" ? 20 : -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="mb-6 text-xl font-bold">{current.title}</h2>
              {current.content}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex gap-3 pt-6 border-t border-border">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex h-12 items-center justify-center rounded-full border border-border px-6 font-semibold transition hover:bg-accent"
              >
                {lang === "ar" ? "السابق" : "Back"}
              </button>
            )}
            {step < steps.length - 1 ? (
              <button
                type="button"
                disabled={!current.isValid}
                onClick={() => setStep(step + 1)}
                className="flex h-12 flex-1 items-center justify-center rounded-full bg-ink font-semibold text-ink-foreground transition hover:bg-primary-deep disabled:opacity-50"
              >
                {lang === "ar" ? "التالي" : "Next"}
              </button>
            ) : (
              <button
                onClick={submit}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] font-semibold text-white shadow-caramel transition hover:bg-[#1ebe5d]"
              >
                <span>💬</span>
                {lang === "ar" ? "إرسال عبر واتساب" : "Send via WhatsApp"}
              </button>
            )}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

function Option({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button type="button" onClick={onClick} className={cn("flex items-center gap-3 rounded-2xl border p-4 text-sm font-medium transition", active ? "border-primary bg-primary/10 ring-2 ring-primary/30" : "border-border hover:border-primary/50")}>
      <span className={cn("flex size-9 items-center justify-center rounded-xl shrink-0", active ? "bg-primary text-primary-foreground" : "bg-secondary")}>{icon}</span>
      {label}
    </button>
  );
}

function Row({ label, value, bold, className, valueClass }: { label: string; value: string; bold?: boolean; className?: string; valueClass?: string }) {
  return (
    <div className={cn("flex justify-between", bold && "text-base font-bold", className)}>
      <span className={bold ? "" : "text-muted-foreground"}>{label}</span>
      <span className={valueClass}>{value}</span>
    </div>
  );
}
