import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Leaf, Star, Heart, Bike } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useApp } from "@/store/app";
import { t } from "@/lib/i18n";
import logo from "@/assets/logo.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "من نحن | عصائر الأمير" },
      { name: "description", content: "اعرف قصة عصائر الأمير — من عربة صغيرة في عدن إلى علامة تجارية تُحضَّر بحب في كل كوب." },
    ],
  }),
  component: AboutPage,
});

const milestones = [
  { year: "2015", ar: "أُسِّست عصائر الأمير من عربة صغيرة في شوارع عدن", en: "Alamir Juices founded from a small cart on the streets of Aden" },
  { year: "2018", ar: "افتتاح أول فرع ثابت في خور مكسر", en: "First permanent branch opened in Khormaksar" },
  { year: "2021", ar: "إطلاق التوصيل الإلكتروني لأول مرة", en: "Launched online delivery service for the first time" },
  { year: "2023", ar: "توسع الفروع وإطلاق خط السندوتشات", en: "Branch expansion and launch of the sandwiches line" },
  { year: "2026", ar: "أكثر من ٥٠٠ طلب يومي ونمو مستمر", en: "Over 500 daily orders and continuous growth" },
];

const values = [
  { icon: Leaf, color: "bg-lime/20 text-lime", ar: "مكونات طبيعية ١٠٠٪", en: "100% Natural Ingredients", dar: "لا سكر مضاف ولا مواد حافظة — فاكهة وخضار فقط.", den: "No added sugar, no preservatives — just fruit and vegetables." },
  { icon: Star, color: "bg-mango/20 text-mango", ar: "جودة لا تُساوَم", en: "Uncompromising Quality", dar: "نختار مكوناتنا يدوياً كل يوم من أفضل المزارعين.", den: "We hand-pick our ingredients daily from the finest farmers." },
  { icon: Heart, color: "bg-berry/20 text-berry", ar: "صُنع بحب", en: "Made with Love", dar: "كل كوب نعصره نضع فيه من قلوبنا قبل كل شيء.", den: "Every cup we press carries our love first and foremost." },
  { icon: Bike, color: "bg-primary/20 text-primary-deep", ar: "توصيل سريع ومبرّد", en: "Fast Cold Delivery", dar: "سلسلة تبريد متكاملة لتصلك الفيتامينات طازجة.", den: "Full cold chain to deliver vitamins fresh to your door." },
];

function AboutPage() {
  const lang = useApp((s) => s.lang);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="bg-hero-radial relative overflow-hidden px-6 pt-24 pb-16 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="mx-auto max-w-3xl">
          <img src={logo} alt="Alamir Juices" className="mx-auto mb-8 w-32 rounded-3xl shadow-lift" />
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t("about_title", lang)}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">{t("about_sub", lang)}</p>
        </motion.div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-10 text-center text-3xl font-bold">{lang === "ar" ? "قيمنا" : "Our Values"}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl border border-border bg-card p-6 shadow-glass"
            >
              <span className={`flex size-12 items-center justify-center rounded-2xl ${v.color}`}>
                <v.icon className="size-6" />
              </span>
              <h3 className="mt-4 font-semibold">{lang === "ar" ? v.ar : v.en}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{lang === "ar" ? v.dar : v.den}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="mb-12 text-center text-3xl font-bold">{lang === "ar" ? "رحلتنا" : "Our Journey"}</h2>
        <ol className="relative border-s border-border">
          {milestones.map((m, i) => (
            <motion.li
              key={m.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="mb-10 ms-6"
            >
              <span className="absolute -start-3 flex size-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground ring-4 ring-background">
                {i + 1}
              </span>
              <time className="mb-1 block text-sm font-bold text-primary-deep">{m.year}</time>
              <p className="text-sm text-muted-foreground">{lang === "ar" ? m.ar : m.en}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24 text-center">
        <div className="rounded-[2rem] bg-ink p-12 text-ink-foreground">
          <h2 className="text-3xl font-bold">{lang === "ar" ? "جاهز تطلب؟" : "Ready to order?"}</h2>
          <p className="mt-3 text-ink-foreground/70">{lang === "ar" ? "اكتشف قائمتنا وخصّص طلبك بنفسك" : "Explore our menu and customize your order"}</p>
          <Link
            to="/menu"
            search={{ q: undefined, cat: undefined }}
            className="mt-8 inline-flex h-13 items-center gap-2 rounded-full bg-primary px-8 font-semibold text-primary-foreground transition hover:bg-primary-deep"
          >
            {lang === "ar" ? "تصفح القائمة" : "Browse Menu"}
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
