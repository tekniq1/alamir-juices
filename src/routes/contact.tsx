import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { MessageCircle, Phone, MapPin, Clock, Mail, Send, Copy, Check } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHead } from "@/components/site/HomeSections";
import { useApp } from "@/store/app";
import { t } from "@/lib/i18n";
import { toast } from "sonner";

const WHATSAPP = "967777655876";
const PHONE = "+967 777 655 876";
const EMAIL = "hello@alamirjuices.ye";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "اتصل بنا | عصائر الأمير" },
      { name: "description", content: "تواصل مع عصائر الأمير عبر واتساب أو الهاتف أو البريد الإلكتروني." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const lang = useApp((s) => s.lang);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(t("copied", lang));
    setTimeout(() => setCopied(false), 2000);
  };

  const sendWa = () => {
    const text = encodeURIComponent(
      lang === "ar"
        ? `مرحباً، أنا ${name || "..."}\n${msg || "أريد التواصل معكم."}`
        : `Hello, I am ${name || "..."}\n${msg || "I would like to get in touch."}`,
    );
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, "_blank");
  };

  const infoItems = [
    {
      icon: MessageCircle,
      color: "bg-[#25D366]/15 text-[#25D366]",
      label: { ar: "واتساب", en: "WhatsApp" },
      value: PHONE,
      action: () => window.open(`https://wa.me/${WHATSAPP}`, "_blank"),
      actionLabel: { ar: "ابدأ المحادثة", en: "Start chat" },
    },
    {
      icon: Phone,
      color: "bg-primary/15 text-primary-deep",
      label: { ar: "الهاتف", en: "Phone" },
      value: PHONE,
      action: () => window.open(`tel:${PHONE}`, "_blank"),
      actionLabel: { ar: "اتصل الآن", en: "Call now" },
    },
    {
      icon: Mail,
      color: "bg-mango/15 text-mango",
      label: { ar: "البريد الإلكتروني", en: "Email" },
      value: EMAIL,
      action: () => copy(EMAIL),
      actionLabel: { ar: "نسخ", en: "Copy" },
    },
    {
      icon: MapPin,
      color: "bg-berry/15 text-berry",
      label: { ar: t("address_label", lang), en: t("address_label", lang) },
      value: t("address_value", lang),
      action: () => window.open("https://maps.app.goo.gl/UPmkHrs8SMTnCn2Q6?g_st=awb", "_blank"),
      actionLabel: { ar: "افتح الخريطة", en: "Open map" },
    },
    {
      icon: Clock,
      color: "bg-lime/15 text-lime",
      label: { ar: t("working_hours", lang), en: t("working_hours", lang) },
      value: t("daily_hours", lang),
      action: null,
      actionLabel: null,
    },
  ];

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-24">
        <SectionHead title={t("contact_title", lang)} sub={t("contact_sub", lang)} />

        <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
          {/* Info cards */}
          <div className="space-y-4">
            {infoItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-glass"
              >
                <span className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${item.color}`}>
                  <item.icon className="size-6" />
                </span>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{lang === "ar" ? item.label.ar : item.label.en}</p>
                  <p className="font-semibold" dir="ltr">{item.value}</p>
                </div>
                {item.action && (
                  <button
                    onClick={item.action}
                    className="shrink-0 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition hover:bg-accent"
                  >
                    {lang === "ar" ? item.actionLabel?.ar : item.actionLabel?.en}
                  </button>
                )}
              </motion.div>
            ))}
          </div>

          {/* WhatsApp form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass h-fit rounded-3xl p-6"
          >
            <h2 className="mb-1 flex items-center gap-2 text-lg font-semibold">
              <MessageCircle className="size-5 text-[#25D366]" />
              {lang === "ar" ? "راسلنا مباشرة" : "Message us directly"}
            </h2>
            <p className="mb-5 text-xs text-muted-foreground">
              {lang === "ar" ? "سنرد خلال دقائق عبر واتساب" : "We'll reply within minutes via WhatsApp"}
            </p>

            <div className="space-y-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={lang === "ar" ? "اسمك" : "Your name"}
                className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-primary/40"
              />
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder={lang === "ar" ? "رسالتك..." : "Your message..."}
                rows={4}
                className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button
                onClick={sendWa}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] font-semibold text-white transition hover:bg-[#1ebe5d]"
              >
                <Send className="size-4" />
                {t("whatsapp_inquire", lang)}
              </button>
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-2xl bg-secondary p-3">
              <button
                onClick={() => copy(PHONE)}
                className="flex flex-1 items-center gap-2 text-sm"
              >
                <Copy className="size-4 text-muted-foreground" />
                <span dir="ltr" className="font-medium">{PHONE}</span>
              </button>
              {copied && <Check className="size-4 text-lime" />}
            </div>
          </motion.div>
        </div>
      </div>
    </SiteLayout>
  );
}
