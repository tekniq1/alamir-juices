import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Timer, Sparkles, AlertCircle, Clock, CalendarClock, Ban, Frown } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHead } from "@/components/site/HomeSections";
import { useApp } from "@/store/app";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "العروض | عصائر الأمير" },
      { name: "description", content: "احصل على أفضل العروض المباشرة من عصائر الأمير." },
    ],
  }),
  component: OffersPage,
});

type OfferStatus = "active" | "ending_soon" | "upcoming" | "expired" | "unavailable";

interface Offer {
  id: string;
  emoji: string;
  title: { ar: string; en: string };
  desc: { ar: string; en: string };
  discount: string;
  validUntil?: string;
  color: string;
  textColor: string;
  status: OfferStatus;
}

const mockOffers: Offer[] = [
  {
    id: "o1",
    emoji: "🌅",
    title: { ar: "عرض الصباح", en: "Morning Deal" },
    desc: { ar: "خصم مباشر ٢٠٪ على كل الطلبات قبل الساعة ١١ صباحاً", en: "Instant 20% off all orders before 11:00 AM" },
    discount: "20%",
    validUntil: "2026-12-31",
    color: "from-mango/30 to-mango/5 border-mango/20",
    textColor: "text-mango",
    status: "active",
  },
  {
    id: "o2",
    emoji: "👑",
    title: { ar: "عرض الأمير المميّز", en: "Royal Combo" },
    desc: { ar: "اشترِ أي عصيرين من خلطات الأمير واحصل على الثالث مجاناً", en: "Buy any 2 Prince Signatures and get the 3rd free" },
    discount: "1+2",
    validUntil: "2026-09-30",
    color: "from-primary/30 to-primary/5 border-primary/20",
    textColor: "text-primary-deep",
    status: "ending_soon",
  },
  {
    id: "o3",
    emoji: "🥪",
    title: { ar: "وجبة السندوتش والعصير", en: "Sandwich + Juice Meal" },
    desc: { ar: "سندوتش + عصير كلاسيكي بسعر مخفض ٩٠٠ ر.ي فقط", en: "Any sandwich + classic juice combo for only 900 YER" },
    discount: "900 ر.ي",
    color: "from-lime/30 to-lime/5 border-lime/20",
    textColor: "text-lime",
    status: "upcoming",
  },
  {
    id: "o4",
    emoji: "🎉",
    title: { ar: "عرض الحفلات", en: "Party Pack Deal" },
    desc: { ar: "إبريق لتر + ٤ عصائر صغيرة بخصم ١٥٪ للطلبات الكبيرة", en: "1L Jug + 4 small juices at 15% off for large orders" },
    discount: "15%",
    validUntil: "2023-12-31",
    color: "from-berry/25 to-berry/5 border-berry/20",
    textColor: "text-berry",
    status: "expired",
  },
  {
    id: "o5",
    emoji: "🏋️",
    title: { ar: "عرض الصحة والفيتنس", en: "Health & Fitness" },
    desc: { ar: "خصم ١٠٪ على كل عصائر الديتوكس والسموذي معاً", en: "10% off all Detox & Smoothie items combined" },
    discount: "10%",
    color: "from-ink/10 to-ink/5 border-border",
    textColor: "text-foreground",
    status: "unavailable",
  },
];

function OffersPage() {
  const lang = useApp((s) => s.lang);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate network delay
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const { offers: rawOffers } = useApp();
  
  // Adapt state offers to match the UI format, or just map them directly.
  const offersList: Offer[] = rawOffers.map(o => ({
    id: o.id,
    emoji: o.emoji,
    title: { ar: o.title, en: o.title }, // Fallback to same title for EN for now
    desc: { ar: "", en: "" }, // Add descriptions to state later if needed
    discount: o.discount,
    status: (o.status as OfferStatus) || "active",
    color: o.status === "active" ? "from-primary/20 to-primary/5 border-primary/20" : o.status === "ending_soon" ? "from-mango/20 to-mango/5 border-mango/20" : "from-secondary to-secondary/50 border-border",
    textColor: o.status === "active" ? "text-primary-deep" : o.status === "ending_soon" ? "text-mango" : "text-muted-foreground"
  }));

  const activeOrSoon = offersList.filter(o => o.status === "active" || o.status === "ending_soon");
  const upcoming = offersList.filter(o => o.status === "upcoming");
  const displayedOffers = activeOrSoon.length > 0 ? offersList : (upcoming.length > 0 ? upcoming : []);

  if (isLoading) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-24">
          <SectionHead title={t("offers_title", lang)} sub={t("offers_sub", lang)} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex h-64 animate-pulse flex-col rounded-3xl bg-secondary/50 p-6">
                <div className="flex justify-between">
                  <div className="size-10 rounded-full bg-border" />
                  <div className="h-8 w-16 rounded-full bg-border" />
                </div>
                <div className="mt-6 h-5 w-1/2 rounded-md bg-border" />
                <div className="mt-3 h-4 w-3/4 rounded-md bg-border" />
                <div className="mt-auto h-12 w-full rounded-full bg-border" />
              </div>
            ))}
          </div>
        </div>
      </SiteLayout>
    );
  }

  if (displayedOffers.length === 0) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-24">
          <SectionHead title={t("offers_title", lang)} sub={t("offers_sub", lang)} />
          <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-card py-24 text-center">
            <Frown className="size-16 text-muted-foreground opacity-50" />
            <h3 className="mt-4 text-xl font-bold">{lang === "ar" ? "لا توجد عروض متاحة حالياً" : "No offers available right now"}</h3>
            <p className="mt-2 text-muted-foreground">{lang === "ar" ? "ترقبوا عروضنا المميزة قريباً!" : "Stay tuned for our exclusive offers soon!"}</p>
            <Link to="/menu" search={{ q: undefined, cat: undefined }} className="mt-8 flex h-12 items-center justify-center rounded-full bg-ink px-8 font-semibold text-ink-foreground shadow-caramel transition hover:bg-primary-deep">
              {lang === "ar" ? "تصفح القائمة" : "Browse Menu"}
            </Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-24">
        <SectionHead title={t("offers_title", lang)} sub={t("offers_sub", lang)} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedOffers.map((offer, i) => {
            const isExpired = offer.status === "expired";
            const isUnavailable = offer.status === "unavailable";
            const isUpcoming = offer.status === "upcoming";
            const isEndingSoon = offer.status === "ending_soon";
            const isActive = offer.status === "active";
            
            const isClickable = isActive || isEndingSoon;

            return (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={cn(
                  "relative overflow-hidden flex flex-col rounded-3xl border bg-gradient-to-br p-6 transition-all",
                  offer.color,
                  (isExpired || isUnavailable) && "opacity-60 grayscale-[0.3]",
                  isClickable && "shadow-glass hover:-translate-y-1 hover:shadow-lift"
                )}
              >
                {/* Light Sweep for active offers */}
                {isActive && (
                  <motion.div
                    initial={{ x: lang === "ar" ? "150%" : "-150%", opacity: 0 }}
                    whileInView={{ x: lang === "ar" ? "-150%" : "150%", opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 + 0.4, duration: 0.8, ease: "easeInOut" }}
                    className="pointer-events-none absolute inset-0 z-10 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent mix-blend-overlay"
                  />
                )}

                {/* Badges */}
                <div className="absolute top-5 left-5 flex gap-2">
                  {isEndingSoon && (
                    <span className="flex items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-bold text-red-500">
                      <Timer className="size-3" />
                      {lang === "ar" ? "ينتهي قريباً" : "Ending Soon"}
                    </span>
                  )}
                  {isUpcoming && (
                    <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-500">
                      <CalendarClock className="size-3" />
                      {lang === "ar" ? "قريباً" : "Upcoming"}
                    </span>
                  )}
                  {isExpired && (
                    <span className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-bold text-muted-foreground">
                      <Ban className="size-3" />
                      {lang === "ar" ? "انتهى العرض" : "Expired"}
                    </span>
                  )}
                  {isUnavailable && (
                    <span className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-bold text-muted-foreground">
                      <AlertCircle className="size-3" />
                      {lang === "ar" ? "غير متوفر" : "Unavailable"}
                    </span>
                  )}
                </div>

                <div className="flex items-start justify-between mt-2">
                  <span className="text-5xl drop-shadow-sm">{offer.emoji}</span>
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 + 0.25, duration: 0.5, type: "spring" }}
                    className={cn("rounded-2xl border border-current bg-background/50 px-4 py-1.5 text-lg font-black backdrop-blur-md shadow-sm relative z-20", offer.textColor)}>
                    {offer.discount}
                  </motion.span>
                </div>

                <h3 className="mt-5 text-xl font-bold">{lang === "ar" ? offer.title.ar : offer.title.en}</h3>
                <p className="mt-2 flex-1 text-sm font-medium leading-relaxed text-muted-foreground">{lang === "ar" ? offer.desc.ar : offer.desc.en}</p>

                {offer.validUntil && !isExpired && !isUnavailable && (
                  <div className={cn("mt-4 flex items-center gap-1.5 text-xs font-semibold", isEndingSoon ? "text-red-500" : "text-muted-foreground")}>
                    <Clock className="size-3.5" />
                    {t("offer_valid", lang)}: {new Date(offer.validUntil).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US")}
                  </div>
                )}

                <div className="mt-5">
                  {isClickable ? (
                    <Link
                      to="/menu"
                      search={{ q: undefined, cat: undefined }}
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-4 text-sm font-bold text-ink-foreground shadow-caramel transition hover:bg-primary-deep"
                    >
                      <Sparkles className="size-4" />
                      {lang === "ar" ? "استفد من العرض" : "Claim Offer"}
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="flex h-12 w-full items-center justify-center rounded-full bg-secondary text-sm font-bold text-muted-foreground"
                    >
                      {isUpcoming ? (lang === "ar" ? "يتوفر قريباً" : "Available soon") : (isExpired ? (lang === "ar" ? "انتهى العرض" : "Offer expired") : (lang === "ar" ? "غير متوفر" : "Unavailable"))}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SiteLayout>
  );
}
