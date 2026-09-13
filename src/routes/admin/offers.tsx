import { createFileRoute } from "@tanstack/react-router";
import { useApp } from "@/store/app";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { OfferData } from "@/store/app";

export const Route = createFileRoute("/admin/offers")({
  component: AdminOffers,
});

function AdminOffers() {
  const { lang, offers, addOffer, updateOffer, deleteOffer } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "", discount: "", status: "active", emoji: "🎁"
  });

  const openAdd = () => {
    setEditingId(null);
    setFormData({ title: "", discount: "", status: "active", emoji: "🎁" });
    setIsModalOpen(true);
  };

  const openEdit = (o: OfferData) => {
    setEditingId(o.id);
    setFormData({ title: o.title, discount: o.discount, status: o.status, emoji: o.emoji });
    setIsModalOpen(true);
  };

  const saveOffer = () => {
    if (!formData.title) return;
    const oData = { ...formData };
    
    if (editingId) {
      updateOffer(editingId, oData);
    } else {
      addOffer({ ...oData, id: "o" + Date.now() });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{lang === "ar" ? "إدارة العروض" : "Offers Management"}</h1>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-xl bg-mango px-4 py-2 font-semibold text-mango-foreground transition hover:opacity-90">
          <Plus className="size-4" />
          {lang === "ar" ? "إضافة عرض" : "Add Offer"}
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {offers.map(o => (
          <div key={o.id} className="relative flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-4xl">{o.emoji}</span>
              <span className="rounded-full bg-secondary px-3 py-1 text-sm font-bold">{o.discount}</span>
            </div>
            <h3 className="mt-4 text-lg font-bold">{o.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">Status: {o.status}</p>
            <div className="mt-6 flex items-center gap-2 border-t border-border pt-4">
              <button onClick={() => openEdit(o)} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-secondary py-2 text-sm font-medium hover:bg-accent">
                <Edit className="size-4" /> {lang === "ar" ? "تعديل" : "Edit"}
              </button>
              <button onClick={() => deleteOffer(o.id)} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-500/10 py-2 text-sm font-medium text-red-500 hover:bg-red-500/20">
                <Trash2 className="size-4" /> {lang === "ar" ? "حذف" : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm" dir={lang === "ar" ? "rtl" : "ltr"}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
              <div className="flex items-center justify-between border-b border-border p-4">
                <h2 className="text-xl font-bold">{editingId ? (lang === "ar" ? "تعديل العرض" : "Edit Offer") : (lang === "ar" ? "إضافة عرض جديد" : "Add New Offer")}</h2>
                <button onClick={() => setIsModalOpen(false)} className="rounded-full p-2 hover:bg-accent"><X className="size-5" /></button>
              </div>
              <div className="p-4 space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">{lang === "ar" ? "عنوان العرض" : "Offer Title"}</label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full rounded-lg border border-input bg-background p-2 text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">{lang === "ar" ? "نسبة الخصم / السعر" : "Discount / Price"}</label>
                    <input type="text" value={formData.discount} onChange={(e) => setFormData({ ...formData, discount: e.target.value })} className="w-full rounded-lg border border-input bg-background p-2 text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">{lang === "ar" ? "الأيقونة (Emoji)" : "Emoji"}</label>
                    <input type="text" value={formData.emoji} onChange={(e) => setFormData({ ...formData, emoji: e.target.value })} className="w-full rounded-lg border border-input bg-background p-2 text-sm text-center" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">{lang === "ar" ? "الحالة" : "Status"}</label>
                  <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full rounded-lg border border-input bg-background p-2 text-sm">
                    <option value="active">نشط (Active)</option>
                    <option value="ending_soon">ينتهي قريباً (Ending Soon)</option>
                    <option value="upcoming">قادم (Upcoming)</option>
                  </select>
                </div>
                <button onClick={saveOffer} className="w-full rounded-xl bg-mango py-3 font-semibold text-mango-foreground hover:opacity-90">
                  {lang === "ar" ? "حفظ العرض" : "Save Offer"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

