import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Tag, Copy, Check, Timer, Sparkles, Flame } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHead } from "@/components/site/HomeSections";
import { useApp } from "@/store/app";
import { t } from "@/lib/i18n";
import { toast } from "sonner";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "العروض | عصائر الأمير" },
      { name: "description", content: "احصل على أفضل العروض والخصومات من عصائر الأمير. عروض يومية وموسمية حصرية." },
    ],
  }),
  component: OffersPage,
});

interface Offer {
  id: string;
  emoji: string;
  title: { ar: string; en: string };
  desc: { ar: string; en: string };
  discount: string;
  code: string;
  validUntil: string;
  type: "daily" | "weekly" | "season";
  color: string;
  textColor: string;
}

const offers: Offer[] = [
  {
    id: "o1",
    emoji: "🌅",
    title: { ar: "عرض الصباح", en: "Morning Deal" },
    desc: { ar: "خصم ٢٠٪ على كل الطلبات قبل الساعة ١١ صباحاً", en: "20% off all orders before 11:00 AM" },
    discount: "20%",
    code: "MORNING20",
    validUntil: "2026-12-31",
    type: "daily",
    color: "from-mango/30 to-mango/5",
    textColor: "text-mango",
  },
  {
    id: "o2",
    emoji: "👑",
    title: { ar: "عرض الأمير المميّز", en: "Royal Combo" },
    desc: { ar: "اشترِ أي عصيرين من خلطات الأمير واحصل على الثالث مجاناً", en: "Buy any 2 Prince Signatures and get the 3rd free" },
    discount: "1+2",
    code: "ROYAL3",
    validUntil: "2026-09-30",
    type: "weekly",
    color: "from-primary/30 to-primary/5",
    textColor: "text-primary-deep",
  },
  {
    id: "o3",
    emoji: "🥪",
    title: { ar: "وجبة السندوتش والعصير", en: "Sandwich + Juice Meal" },
    desc: { ar: "سندوتش + عصير كلاسيكي بسعر مخفض ٩٠٠ ر.ي فقط", en: "Any sandwich + classic juice combo for only 900 YER" },
    discount: "900 ر.ي",
    code: "MEAL25",
    validUntil: "2026-10-15",
    type: "weekly",
    color: "from-lime/30 to-lime/5",
    textColor: "text-lime",
  },
  {
    id: "o4",
    emoji: "🎉",
    title: { ar: "عرض الحفلات", en: "Party Pack Deal" },
    desc: { ar: "إبريق لتر + ٤ عصائر صغيرة بخصم ١٥٪ للطلبات فوق ٤٠٠٠ ر.ي", en: "1L Jug + 4 small juices at 15% off for orders over 4000 YER" },
    discount: "15%",
    code: "PARTY15",
    validUntil: "2026-12-31",
    type: "season",
    color: "from-berry/25 to-berry/5",
    textColor: "text-berry",
  },
  {
    id: "o5",
    emoji: "🏋️",
    title: { ar: "عرض الصحة والفيتنس", en: "Health & Fitness" },
    desc: { ar: "خصم ١٠٪ على كل عصائر الديتوكس والسموذي معاً", en: "10% off all Detox & Smoothie items combined" },
    discount: "10%",
    code: "FIT10",
    validUntil: "2026-11-30",
    type: "season",
    color: "from-lime/25 to-lime/5",
    textColor: "text-lime",
  },
  {
    id: "o6",
    emoji: "🌙",
    title: { ar: "عرض السهرة", en: "Late Night Deal" },
    desc: { ar: "خصم ١٥٪ على الطلبات بعد الساعة ٩ مساءً", en: "15% off all orders placed after 9:00 PM" },
    discount: "15%",
    code: "NIGHT15",
    validUntil: "2026-12-31",
    type: "daily",
    color: "from-ink/20 to-ink/5",
    textColor: "text-foreground",
  },
];

const filterTabs = [
  { id: "all", ar: "الكل", en: "All" },
  { id: "daily", ar: "يومي", en: "Daily" },
  { id: "weekly", ar: "أسبوعي", en: "Weekly" },
  { id: "season", ar: "موسمي", en: "Seasonal" },
] as const;

function OffersPage() {
  const lang = useApp((s) => s.lang);
  const [filter, setFilter] = useState<"all" | "daily" | "weekly" | "season">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = filter === "all" ? offers : offers.filter((o) => o.type === filter);

  const copyCode = (offer: Offer) => {
    navigator.clipboard.writeText(offer.code);
    setCopiedId(offer.id);
    toast.success(lang === "ar" ? `تم نسخ الكود: ${offer.code}` : `Copied: ${offer.code}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-24">
        <SectionHead title={t("offers_title", lang)} sub={t("offers_sub", lang)} />

        {/* Highlight banner */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex items-center gap-3 rounded-2xl bg-ink px-5 py-4 text-ink-foreground"
        >
          <Flame className="size-5 text-mango" />
          <p className="text-sm">
            {lang === "ar"
              ? "🔥 استخدم كود الخصم عند الدفع للحصول على الخصم مباشرة"
              : "🔥 Use the discount code at checkout to apply your offer instantly"}
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-8 flex gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                filter === tab.id
                  ? "border-ink bg-ink text-ink-foreground"
                  : "border-border hover:border-primary"
              }`}
            >
              {lang === "ar" ? tab.ar : tab.en}
            </button>
          ))}
        </div>

        {/* Offer cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`flex flex-col rounded-3xl border border-border bg-gradient-to-br p-6 shadow-glass ${offer.color}`}
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl">{offer.emoji}</span>
                <span className={`rounded-full border border-current bg-white/60 px-3 py-1 text-sm font-bold ${offer.textColor}`}>
                  {offer.discount}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-bold">{lang === "ar" ? offer.title.ar : offer.title.en}</h3>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{lang === "ar" ? offer.desc.ar : offer.desc.en}</p>

              <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
                <Timer className="size-3.5" />
                {t("offer_valid", lang)}: {new Date(offer.validUntil).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US")}
              </div>

              <div className="mt-4 flex items-center gap-2">
                <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-background/70 px-3 py-2">
                  <Tag className="size-4 text-muted-foreground" />
                  <span className="flex-1 font-mono text-sm font-bold tracking-widest">{offer.code}</span>
                </div>
                <button
                  onClick={() => copyCode(offer)}
                  className="flex size-10 items-center justify-center rounded-xl bg-ink text-ink-foreground transition hover:bg-primary-deep"
                  aria-label={t("copy_code", lang)}
                >
                  {copiedId === offer.id ? <Check className="size-4" /> : <Copy className="size-4" />}
                </button>
              </div>

              <Link
                to="/menu"
                search={{ q: undefined, cat: undefined }}
                className="mt-3 flex h-10 w-full items-center justify-center gap-1.5 rounded-2xl bg-ink px-4 text-sm font-semibold text-ink-foreground transition hover:bg-primary-deep"
              >
                <Sparkles className="size-4" />
                {lang === "ar" ? "اطلب الآن" : "Order now"}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
