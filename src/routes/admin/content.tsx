import { createFileRoute } from "@tanstack/react-router";
import { useApp } from "@/store/app";
import { Save } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/content")({
  component: AdminContent,
});

function AdminContent() {
  const { lang, siteContent, updateContent } = useApp();
  const [formData, setFormData] = useState(siteContent);

  useEffect(() => {
    setFormData(siteContent);
  }, [siteContent]);

  const handleSave = () => {
    updateContent(formData);
    toast.success(lang === "ar" ? "تم حفظ محتوى الصفحات" : "Content saved successfully");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{lang === "ar" ? "محتوى الصفحات" : "Pages Content"}</h1>
        <p className="text-muted-foreground mt-2">{lang === "ar" ? "تعديل النصوص والصور في الصفحة الرئيسية وصفحة من نحن." : "Edit text and images for the Home and About pages."}</p>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-bold border-b border-border pb-2">{lang === "ar" ? "القسم الرئيسي (Hero)" : "Hero Section"}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">{lang === "ar" ? "العنوان (عربي)" : "Title (AR)"}</label>
              <input type="text" value={formData.heroTitleAr} onChange={e => setFormData({...formData, heroTitleAr: e.target.value})} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{lang === "ar" ? "العنوان (إنجليزي)" : "Title (EN)"}</label>
              <input type="text" value={formData.heroTitleEn} onChange={e => setFormData({...formData, heroTitleEn: e.target.value})} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" dir="ltr" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">{lang === "ar" ? "النص الفرعي (عربي)" : "Subtitle (AR)"}</label>
              <textarea value={formData.heroDescAr} onChange={e => setFormData({...formData, heroDescAr: e.target.value})} className="w-full rounded-lg border border-input bg-background p-3 text-sm min-h-[80px]" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{lang === "ar" ? "النص الفرعي (إنجليزي)" : "Subtitle (EN)"}</label>
              <textarea value={formData.heroDescEn} onChange={e => setFormData({...formData, heroDescEn: e.target.value})} className="w-full rounded-lg border border-input bg-background p-3 text-sm min-h-[80px]" dir="ltr" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-bold border-b border-border pb-2">{lang === "ar" ? "صفحة من نحن" : "About Us Page"}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">{lang === "ar" ? "عنوان من نحن (عربي)" : "About Title (AR)"}</label>
              <input type="text" value={formData.aboutTitleAr} onChange={e => setFormData({...formData, aboutTitleAr: e.target.value})} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{lang === "ar" ? "عنوان من نحن (إنجليزي)" : "About Title (EN)"}</label>
              <input type="text" value={formData.aboutTitleEn} onChange={e => setFormData({...formData, aboutTitleEn: e.target.value})} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" dir="ltr" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">{lang === "ar" ? "قصة المحل (عربي)" : "Store Story (AR)"}</label>
              <textarea value={formData.aboutStoryAr} onChange={e => setFormData({...formData, aboutStoryAr: e.target.value})} className="w-full rounded-lg border border-input bg-background p-3 text-sm min-h-[120px]" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{lang === "ar" ? "قصة المحل (إنجليزي)" : "Store Story (EN)"}</label>
              <textarea value={formData.aboutStoryEn} onChange={e => setFormData({...formData, aboutStoryEn: e.target.value})} className="w-full rounded-lg border border-input bg-background p-3 text-sm min-h-[120px]" dir="ltr" />
            </div>
          </div>
        </div>

        <button onClick={handleSave} className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-ink px-8 py-3 font-semibold text-ink-foreground transition hover:bg-primary-deep">
          <Save className="size-5" />
          {lang === "ar" ? "حفظ التعديلات" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

