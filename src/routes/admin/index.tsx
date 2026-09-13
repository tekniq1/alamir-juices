import { createFileRoute } from "@tanstack/react-router";
import { useApp } from "@/store/app";
import { motion } from "motion/react";
import { Coffee, Tag, Package, Eye, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const lang = useApp((s) => s.lang);

  const stats = [
    { label: { ar: "إجمالي المنتجات", en: "Total Products" }, value: "24", icon: Coffee, color: "text-primary-deep", bg: "bg-primary/20" },
    { label: { ar: "العروض النشطة", en: "Active Offers" }, value: "3", icon: Tag, color: "text-mango", bg: "bg-mango/20" },
    { label: { ar: "التصنيفات", en: "Categories" }, value: "5", icon: Package, color: "text-berry", bg: "bg-berry/20" },
    { label: { ar: "زيارات اليوم", en: "Today Views" }, value: "1,204", icon: Eye, color: "text-lime", bg: "bg-lime/20" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{lang === "ar" ? "نظرة عامة" : "Overview"}</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className={`flex size-12 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="size-6" />
              </span>
              <span className="flex items-center gap-1 text-xs font-medium text-emerald-500">
                +12% <TrendingUp className="size-3" />
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">{lang === "ar" ? stat.label.ar : stat.label.en}</p>
              <h3 className="mt-1 text-3xl font-bold">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">{lang === "ar" ? "آخر النشاطات" : "Recent Activity"}</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 border-b border-border pb-4">
              <div className="size-2 rounded-full bg-mango" />
              <div>
                <p className="font-medium">{lang === "ar" ? "تم تعديل عرض: عرض الصباح" : "Offer updated: Morning Deal"}</p>
                <span className="text-xs text-muted-foreground">{lang === "ar" ? "منذ ساعتين" : "2 hours ago"}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 border-b border-border pb-4">
              <div className="size-2 rounded-full bg-primary" />
              <div>
                <p className="font-medium">{lang === "ar" ? "تمت إضافة منتج: عصير رمان" : "Product added: Pomegranate Juice"}</p>
                <span className="text-xs text-muted-foreground">{lang === "ar" ? "أمس" : "Yesterday"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

