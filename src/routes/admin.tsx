import { createFileRoute, Outlet, Link, useRouterState, useNavigate, redirect } from "@tanstack/react-router";
import { LayoutDashboard, Package, Tag, Settings, FileText, Menu, LogOut, Coffee } from "lucide-react";
import { useApp } from "@/store/app";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const adminLinks = [
  { to: "/admin", icon: LayoutDashboard, label: { ar: "الرئيسية", en: "Overview" }, exact: true },
  { to: "/admin/products", icon: Coffee, label: { ar: "المنتجات", en: "Products" } },
  { to: "/admin/categories", icon: Package, label: { ar: "التصنيفات", en: "Categories" } },
  { to: "/admin/offers", icon: Tag, label: { ar: "العروض", en: "Offers" } },
  { to: "/admin/content", icon: FileText, label: { ar: "محتوى الصفحات", en: "Pages Content" } },
  { to: "/admin/settings", icon: Settings, label: { ar: "إعدادات المتجر", en: "Settings" } },
];

function AdminLayout() {
  const { lang, isAuthenticated, logout, _hasHydrated } = useApp();
  const location = useRouterState({ select: (s) => s.location });
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (_hasHydrated && !isAuthenticated && location.pathname !== "/admin/login") {
      navigate({ to: "/admin/login", replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate, _hasHydrated]);

  if (!_hasHydrated) return null; // Wait for hydration

  if (location.pathname === "/admin/login") {
    return (
      <div className="min-h-screen bg-background font-sans text-foreground" dir={lang === "ar" ? "rtl" : "ltr"}>
        <Outlet />
      </div>
    );
  }

  // Double check so UI doesn`t flash before useEffect kicks in
  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();
    navigate({ to: "/admin/login" });
  };

  const SidebarContent = () => (
    <>
      <div className="flex h-16 shrink-0 items-center gap-3 px-6">
        <span className="flex size-8 items-center justify-center rounded-xl bg-primary/20 text-xl">👑</span>
        <span className="font-bold text-primary-deep tracking-wide">{lang === "ar" ? "إدارة الأمير" : "Alamir Admin"}</span>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {adminLinks.map((link) => {
          const isActive = link.exact ? location.pathname === link.to : location.pathname.startsWith(link.to);
          return (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                isActive ? "bg-primary/10 text-primary-deep" : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <link.icon className={cn("size-5", isActive && "text-primary")} />
              {lang === "ar" ? link.label.ar : link.label.en}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 mt-auto border-t border-border">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition-all hover:bg-red-500/10"
        >
          <LogOut className="size-5" />
          {lang === "ar" ? "تسجيل الخروج" : "Logout"}
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-secondary/30 font-sans text-foreground" dir={lang === "ar" ? "rtl" : "ltr"}>
      <aside className="hidden w-64 shrink-0 flex-col border-border border-l bg-card lg:flex">
        <SidebarContent />
      </aside>
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: lang === "ar" ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: lang === "ar" ? "100%" : "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 z-50 flex w-64 flex-col bg-card shadow-2xl lg:hidden ltr:left-0 rtl:right-0"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      <main className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-4 border-b border-border bg-card px-4 lg:hidden">
          <button onClick={() => setMobileOpen(true)} className="rounded-full p-2 text-muted-foreground hover:bg-accent">
            <Menu className="size-6" />
          </button>
          <span className="font-bold text-primary-deep">{lang === "ar" ? "لوحة التحكم" : "Dashboard"}</span>
        </header>
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

