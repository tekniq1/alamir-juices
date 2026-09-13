import { createFileRoute } from "@tanstack/react-router";
import { useApp } from "@/store/app";
import { Save, Phone, MapPin, Clock, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  const { lang, setAdminPassword, adminPassword, siteSettings, updateSettings } = useApp();
  const [newPassword, setNewPassword] = useState("");
  const [formData, setFormData] = useState(siteSettings);

  useEffect(() => {
    setFormData(siteSettings);
  }, [siteSettings]);

  const handleSave = () => {
    updateSettings(formData);
    
    if (newPassword) {
      setAdminPassword(newPassword);
      setNewPassword("");
      toast.success(lang === "ar" ? "تم تغيير الإعدادات وكلمة المرور بنجاح" : "Settings and password changed successfully");
    } else {
      toast.success(lang === "ar" ? "تم حفظ الإعدادات" : "Settings saved");
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{lang === "ar" ? "إعدادات المتجر" : "Store Settings"}</h1>
        <p className="text-muted-foreground mt-2">{lang === "ar" ? "تعديل أرقام التواصل، العنوان، وحسابات الدفع." : "Edit contact numbers, address, and payment accounts."}</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
        
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 font-bold"><Lock className="size-5 text-red-500" /> {lang === "ar" ? "إعدادات الأمان" : "Security Settings"}</h2>
          <div className="space-y-2">
            <label className="text-sm font-medium">{lang === "ar" ? "تغيير كلمة المرور الجديدة" : "New Password"}</label>
            <input 
              type="password" 
              placeholder={lang === "ar" ? "اترك الحقل فارغاً إذا لم ترد تغييره" : "Leave blank to keep current password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" 
              dir="ltr" 
            />
            <p className="text-xs text-muted-foreground mt-1">
              {lang === "ar" ? `كلمة المرور الحالية هي: ${adminPassword}` : `Current password is: ${adminPassword}`}
            </p>
          </div>
        </div>

        <hr className="border-border" />

        <div className="space-y-4">
          <h2 className="flex items-center gap-2 font-bold"><Phone className="size-5 text-primary" /> {lang === "ar" ? "أرقام التواصل" : "Contact Numbers"}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">{lang === "ar" ? "رقم استقبال الطلبات (واتساب)" : "WhatsApp Orders Number"}</label>
              <input type="text" value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" dir="ltr" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{lang === "ar" ? "رقم الاتصال المباشر" : "Direct Phone Number"}</label>
              <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" dir="ltr" />
            </div>
          </div>
        </div>

        <hr className="border-border" />

        <div className="space-y-4">
          <h2 className="flex items-center gap-2 font-bold"><MapPin className="size-5 text-mango" /> {lang === "ar" ? "معلومات الموقع" : "Location Info"}</h2>
          <div className="space-y-2">
            <label className="text-sm font-medium">{lang === "ar" ? "رابط خرائط جوجل" : "Google Maps Link"}</label>
            <input type="text" value={formData.mapsLink} onChange={e => setFormData({...formData, mapsLink: e.target.value})} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" dir="ltr" />
          </div>
        </div>

        <hr className="border-border" />

        <div className="space-y-4">
          <h2 className="flex items-center gap-2 font-bold"><Clock className="size-5 text-berry" /> {lang === "ar" ? "أوقات العمل" : "Working Hours"}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">{lang === "ar" ? "أوقات العمل (عربي)" : "Working Hours (AR)"}</label>
              <input type="text" value={formData.workingHoursAr} onChange={e => setFormData({...formData, workingHoursAr: e.target.value})} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{lang === "ar" ? "أوقات العمل (إنجليزي)" : "Working Hours (EN)"}</label>
              <input type="text" value={formData.workingHoursEn} onChange={e => setFormData({...formData, workingHoursEn: e.target.value})} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" dir="ltr" />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button onClick={handleSave} className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-ink px-8 py-3 font-semibold text-ink-foreground transition hover:bg-primary-deep">
            <Save className="size-5" />
            {lang === "ar" ? "حفظ التعديلات" : "Save Changes"}
          </button>
        </div>

      </div>
    </div>
  );
}

