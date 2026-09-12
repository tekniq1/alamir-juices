import { Link } from "@tanstack/react-router";
import { useApp } from "@/store/app";
import { t } from "@/lib/i18n";
import logo from "@/assets/logo.jpg";

export function Footer() {
  const lang = useApp((s) => s.lang);
  return (
    <footer className="mt-24 rounded-t-[2.5rem] bg-ink text-ink-foreground shadow-lift">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <img src={logo} alt="Alamir Juices" width={140} height={115} loading="lazy" className="w-36 rounded-2xl" />
          <p className="mt-4 max-w-xs text-sm text-ink-foreground/70">{t("hero_sub", lang)}</p>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div className="space-y-2">
            <Link to="/menu" className="block hover:text-primary">{t("nav_menu", lang)}</Link>
            <Link to="/offers" className="block hover:text-primary">{t("nav_offers", lang)}</Link>
            <Link to="/about" className="block hover:text-primary">{t("nav_about", lang)}</Link>
          </div>
          <div className="space-y-2">
            <Link to="/contact" className="block hover:text-primary">{t("nav_contact", lang)}</Link>
            <Link to="/checkout" className="block hover:text-primary">{t("checkout", lang)}</Link>
          </div>
        </div>
        <div className="md:text-end">
          <p className="font-script text-2xl text-primary">Alamir Juices</p>
          <a href="https://maps.app.goo.gl/UPmkHrs8SMTnCn2Q6?g_st=awb" target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-sm text-ink-foreground/70 transition hover:text-primary">
            {t("footer_tag", lang)} 🇾🇪
          </a>
          <p className="mt-6 text-xs text-ink-foreground/40">© 2026 {t("brand", lang)}</p>
        </div>
      </div>
    </footer>
  );
}
