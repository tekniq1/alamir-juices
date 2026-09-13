import { createFileRoute } from "@tanstack/react-router";
import { useApp } from "@/store/app";
import { Plus, Search, Edit, Trash2, CheckCircle, XCircle, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Product } from "@/data/mock";

export const Route = createFileRoute("/admin/products")({
  component: AdminProducts,
});

function AdminProducts() {
  const { lang, products, addProduct, updateProduct } = useApp();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    nameAr: "", nameEn: "", descAr: "", descEn: "", price: "", categoryId: "c1", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400", inStock: true
  });

  const filtered = products.filter(p => 
    p.name.ar.includes(search) || p.name.en.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditingId(null);
    setFormData({ nameAr: "", nameEn: "", descAr: "", descEn: "", price: "", categoryId: "c1", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400", inStock: true });
    setIsModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditingId(p.id);
    setFormData({
      nameAr: p.name.ar, nameEn: p.name.en, descAr: p.description.ar, descEn: p.description.en, price: p.basePrice.toString(), categoryId: p.categoryId, image: p.image, inStock: p.inStock
    });
    setIsModalOpen(true);
  };

  const saveProduct = () => {
    if (!formData.nameAr || !formData.price) return;
    const pData: Partial<Product> = {
      name: { ar: formData.nameAr, en: formData.nameEn || formData.nameAr },
      description: { ar: formData.descAr, en: formData.descEn || formData.descAr },
      basePrice: parseInt(formData.price) || 0,
      categoryId: formData.categoryId,
      image: formData.image,
      inStock: formData.inStock
    };

    if (editingId) {
      updateProduct(editingId, pData);
    } else {
      addProduct({
        ...pData,
        id: "p" + Date.now(),
        rating: 5,
        reviews: 0,
        calories: 100,
        carbs: 20
      } as Product);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{lang === "ar" ? "إدارة المنتجات" : "Products Management"}</h1>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-semibold text-primary-foreground transition hover:bg-primary-deep">
          <Plus className="size-4" />
          {lang === "ar" ? "إضافة منتج" : "Add Product"}
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-sm">
        <div className="border-b border-border p-4">
          <div className="relative max-w-sm">
            <Search className="absolute top-1/2 size-4 -translate-y-1/2 text-muted-foreground ltr:left-3 rtl:right-3" />
            <input type="text" placeholder={lang === "ar" ? "بحث عن منتج..." : "Search products..."} value={search} onChange={(e) => setSearch(e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm" dir={lang === "ar" ? "rtl" : "ltr"}>
            <thead className="bg-secondary/50 text-muted-foreground">
              <tr>
                <th className="p-4 font-medium">{lang === "ar" ? "المنتج" : "Product"}</th>
                <th className="p-4 font-medium">{lang === "ar" ? "السعر" : "Price"}</th>
                <th className="p-4 font-medium">{lang === "ar" ? "الحالة" : "Status"}</th>
                <th className="p-4 text-right font-medium">{lang === "ar" ? "إجراءات" : "Actions"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(p => (
                <tr key={p.id} className="transition-colors hover:bg-muted/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt="" className="size-10 rounded-lg object-cover" />
                      <div>
                        <p className="font-medium">{lang === "ar" ? p.name.ar : p.name.en}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-medium">{p.basePrice} ر.ي</td>
                  <td className="p-4">
                    <span onClick={() => updateProduct(p.id, { inStock: !p.inStock })} className={`flex w-fit cursor-pointer items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-all ${p.inStock ? "bg-lime/10 text-lime hover:bg-lime/20" : "bg-red-500/10 text-red-500 hover:bg-red-500/20"}`}>
                      {p.inStock ? <CheckCircle className="size-3" /> : <XCircle className="size-3" />}
                      {p.inStock ? (lang === "ar" ? "متوفر" : "In Stock") : (lang === "ar" ? "نفد" : "Out of Stock")}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(p)} className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground">
                        <Edit className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm" dir={lang === "ar" ? "rtl" : "ltr"}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
              <div className="flex items-center justify-between border-b border-border p-4">
                <h2 className="text-xl font-bold">{editingId ? (lang === "ar" ? "تعديل المنتج" : "Edit Product") : (lang === "ar" ? "إضافة منتج جديد" : "Add New Product")}</h2>
                <button onClick={() => setIsModalOpen(false)} className="rounded-full p-2 hover:bg-accent"><X className="size-5" /></button>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">{lang === "ar" ? "الاسم (عربي)" : "Name (AR)"}</label>
                    <input type="text" value={formData.nameAr} onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })} className="w-full rounded-lg border border-input bg-background p-2 text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">{lang === "ar" ? "الاسم (إنجليزي)" : "Name (EN)"}</label>
                    <input type="text" value={formData.nameEn} onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })} className="w-full rounded-lg border border-input bg-background p-2 text-sm" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">{lang === "ar" ? "السعر (ريال)" : "Price (YER)"}</label>
                  <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full rounded-lg border border-input bg-background p-2 text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">{lang === "ar" ? "رابط الصورة" : "Image URL"}</label>
                  <input type="text" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="w-full rounded-lg border border-input bg-background p-2 text-sm" dir="ltr" />
                </div>
                <button onClick={saveProduct} className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground hover:bg-primary-deep">
                  {lang === "ar" ? "حفظ المنتج" : "Save Product"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

