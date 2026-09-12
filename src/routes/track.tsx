import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { PackageSearch, CheckCircle2, Clock, ChefHat, Bike, PartyPopper, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHead } from "@/components/site/HomeSections";
import { useApp } from "@/store/app";
import { t, formatPrice } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const WHATSAPP = "967771234567";

type TrackSearch = { id?: string };

export const Route = createFileRoute("/track")({
  validateSearch: (s: Record<string, unknown>): TrackSearch => ({
    id: typeof s.id === "string" && s.id ? s.id : undefined,
  }),
  head: () => ({
    meta: [
      { title: "تتبع الطلب | عصائر الأمير" },
      { name: "description", content: "تتبع حالة طلبك من عصائر الأمير خطوة بخطوة حتى يصل إلى بابك." },
    ],
  }),
  component: TrackPage,
});

const statusSteps = [
  { id: "new", ar: "طلب جديد", en: "New order", icon: PackageSearch },
  { id: "preparing", ar: "جاري التحضير", en: "Preparing", icon: ChefHat },
  { id: "picked", ar: "تم الاستلام", en: "Picked up", icon: CheckCircle2 },
  { id: "delivering", ar: "في الطريق إليك", en: "On the way", icon: Bike },
  { id: "completed", ar: "تم التوصيل ✓", en: "Delivered!", icon: PartyPopper },
] as const;

function TrackPage() {
  const { id } = Route.useSearch();
  const { lang, orders } = useApp();
  const [input, setInput] = useState(id ?? "");
  const [searched, setSearched] = useState(!!id);
  const order = searched ? orders.find((o) => o.id.toLowerCase() === input.trim().toLowerCase()) : undefined;

  const stepIdx = order ? statusSteps.findIndex((s) => s.id === order.status) : -1;

  const waMsg = encodeURIComponent(
    lang === "ar"
      ? `مرحباً، أريد الاستفسار عن طلبي رقم ${order?.id ?? input}`
      : `Hello, I would like to inquire about my order ${order?.id ?? input}`,
  );

  return (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-6 pt-10 pb-24">
        <SectionHead title={t("track_title", lang)} sub={t("track_enter", lang)} />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearched(true);
          }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => { setInput(e.target.value); setSearched(false); }}
            placeholder={t("track_placeholder", lang)}
            dir="ltr"
            className="h-12 flex-1 rounded-full border border-border bg-background px-5 text-sm outline-none focus:ring-2 focus:ring-primary/40"
          />
          <button
            type="submit"
            className="h-12 rounded-full bg-ink px-6 font-semibold text-ink-foreground transition hover:bg-primary-deep"
          >
            {t("track_btn", lang)}
          </button>
        </form>

        {searched && !order && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 rounded-3xl border border-dashed border-border p-12 text-center text-muted-foreground"
          >
            <PackageSearch className="mx-auto mb-3 size-10 opacity-30" />
            <p>{t("not_found", lang)}</p>
          </motion.div>
        )}

        {order && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-6">
            <div className="glass rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{lang === "ar" ? "رقم الطلب" : "Order"}</p>
                  <p className="text-2xl font-bold tracking-wider text-primary-deep">{order.id}</p>
                </div>
                <div className="text-end">
                  <p className="text-xs text-muted-foreground">{lang === "ar" ? "الإجمالي" : "Total"}</p>
                  <p className="text-xl font-bold">{formatPrice(order.total, lang)}</p>
                </div>
              </div>
              <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                {order.items.map((it, i) => (
                  <li key={i}>{lang === "ar" ? it.name.ar : it.name.en} — {it.size} × {it.qty}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6">
              <h3 className="mb-6 font-semibold">{lang === "ar" ? "حالة الطلب" : "Order Status"}</h3>
              <ol className="relative space-y-6">
                {statusSteps.map((step, i) => {
                  const done = i <= stepIdx;
                  const active = i === stepIdx;
                  const Icon = step.icon;
                  return (
                    <li key={step.id} className="flex items-start gap-4">
                      <span className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-full transition",
                        done ? "bg-lime text-white" : "border border-border bg-secondary text-muted-foreground",
                        active && "ring-4 ring-lime/30",
                      )}>
                        <Icon className="size-5" />
                      </span>
                      <div className="pt-1.5">
                        <p className={cn("font-medium", done ? "text-foreground" : "text-muted-foreground")}>
                          {lang === "ar" ? step.ar : step.en}
                        </p>
                        {active && order.eta > 0 && (
                          <p className="mt-0.5 flex items-center gap-1 text-xs text-primary-deep">
                            <Clock className="size-3.5" />
                            {lang === "ar" ? `الوقت المتوقع: ${order.eta} دقيقة` : `ETA: ${order.eta} min`}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP}?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] font-semibold text-white shadow-lg transition hover:bg-[#1ebe5d]"
            >
              <MessageCircle className="size-5" />
              {t("whatsapp_inquire", lang)}
            </a>

            <Link
              to="/menu"
              search={{ q: undefined, cat: undefined }}
              className="glass flex h-12 w-full items-center justify-center rounded-full font-semibold transition hover:bg-accent"
            >
              {t("back_to_store", lang)}
            </Link>
          </motion.div>
        )}
      </div>
    </SiteLayout>
  );
}
