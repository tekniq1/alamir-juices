import { createFileRoute } from "@tanstack/react-router";
import { useApp } from "@/store/app";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { CategoryData } from "@/store/app";

export const Route = createFileRoute("/admin/categories")({
  component: AdminCategories,
});

function AdminCategories() {
  const { lang, categories, addCategory, updateCategory, deleteCategory } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nameAr: "", nameEn: "", emoji: "🥤"
  });

  const openAdd = () => {
    setEditingId(null);
    setFormData({ nameAr: "", nameEn: "", emoji: "🥤" });
    setIsModalOpen(true);
  };

  const openEdit = (c: CategoryData) => {
    setEditingId(c.id);
    setFormData({ nameAr: c.nameAr, nameEn: c.nameEn, emoji: c.emoji });
    setIsModalOpen(true);
  };

  const saveCategory = () => {
    if (!formData.nameAr) return;
    if (editingId) {
      updateCategory(editingId, formData);
    } else {
      addCategory({ ...formData, id: "c" + Date.now() });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{lang === "ar" ? "التصنيفات" : "Categories"}</h1>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-semibold text-primary-foreground transition hover:bg-primary-deep">
          <Plus className="size-4" />
          {lang === "ar" ? "إضافة تصنيف" : "Add Category"}
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {(categories || []).map((c) => (
          <div key={c.id} className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <span className="flex size-12 items-center justify-center rounded-xl bg-secondary text-2xl">{c.emoji}</span>
              <div>
                <p className="font-bold">{lang === "ar" ? c.nameAr : c.nameEn}</p>
                <p className="text-xs text-muted-foreground">{c.id}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => openEdit(c)} className="rounded p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"><Edit className="size-4" /></button>
              <button onClick={() => deleteCategory(c.id)} className="rounded p-1.5 text-muted-foreground hover:bg-red-500/10 hover:text-red-500"><Trash2 className="size-4" /></button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm" dir={lang === "ar" ? "rtl" : "ltr"}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-sm overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
              <div className="flex items-center justify-between border-b border-border p-4">
                <h2 className="text-xl font-bold">{editingId ? (lang === "ar" ? "تعديل التصنيف" : "Edit Category") : (lang === "ar" ? "إضافة تصنيف" : "Add Category")}</h2>
                <button onClick={() => setIsModalOpen(false)} className="rounded-full p-2 hover:bg-accent"><X className="size-5" /></button>
              </div>
              <div className="p-4 space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">{lang === "ar" ? "الاسم (عربي)" : "Name (AR)"}</label>
                  <input type="text" value={formData.nameAr} onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })} className="w-full rounded-lg border border-input bg-background p-2 text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">{lang === "ar" ? "الاسم (إنجليزي)" : "Name (EN)"}</label>
                  <input type="text" value={formData.nameEn} onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })} className="w-full rounded-lg border border-input bg-background p-2 text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">{lang === "ar" ? "الأيقونة (Emoji)" : "Emoji"}</label>
                  <input type="text" value={formData.emoji} onChange={(e) => setFormData({ ...formData, emoji: e.target.value })} className="w-full rounded-lg border border-input bg-background p-2 text-sm text-center" />
                </div>
                <button onClick={saveCategory} className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground hover:bg-primary-deep">
                  {lang === "ar" ? "حفظ" : "Save"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

