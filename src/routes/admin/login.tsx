import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useApp } from "@/store/app";
import { Lock, LogIn } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const { lang, login } = useApp();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate({ to: "/admin" });
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card shadow-glass">
        <div className="bg-primary/10 p-8 text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-background text-3xl shadow-sm">👑</span>
          <h1 className="mt-4 text-2xl font-bold text-primary-deep">{lang === "ar" ? "لوحة تحكم الأمير" : "Alamir Dashboard"}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{lang === "ar" ? "تسجيل الدخول للمدراء فقط" : "Login for administrators only"}</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-8 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">{lang === "ar" ? "كلمة المرور" : "Password"}</label>
            <div className="relative">
              <Lock className="absolute top-1/2 size-4 -translate-y-1/2 text-muted-foreground ltr:left-3 rtl:right-3" />
              <input 
                type="password" 
                placeholder="••••••••" 
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className={`h-11 w-full rounded-xl border bg-background px-10 text-sm outline-none focus:ring-2 ${error ? "border-red-500 focus:ring-red-500/40" : "border-input focus:ring-primary/40"}`} 
                dir="ltr"
              />
            </div>
            {error && <p className="text-xs text-red-500">{lang === "ar" ? "كلمة المرور خاطئة" : "Incorrect password"}</p>}
          </div>
          
          <button type="submit" className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-ink font-semibold text-ink-foreground transition hover:bg-primary-deep mt-2">
            <LogIn className="size-4" />
            {lang === "ar" ? "دخول" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

