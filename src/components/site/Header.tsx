import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Search, ShoppingBag, PackageSearch, Languages, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import { useApp, cartCount } from "@/store/app";
import { t } from "@/lib/i18n";
import logo from "@/assets/logo.jpg";
import { cn } from "@/lib/utils";

export function Header() {
  const { lang, toggleLang, cart, setCartOpen, wishlist } = useApp();
  const [q, setQ] = useState("");
  const [mobile, setMobile] = useState(false);
  const [hidden, setHidden] = useState(false);
  const navigate = useNavigate();
  const count = cartCount(cart);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
      setMobile(false);
    } else {
      setHidden(false);
    }
  });

  const links = [
    { to: "/", label: t("nav_home", lang) },
    { to: "/menu", label: t("nav_menu", lang) },
    { to: "/offers", label: t("nav_offers", lang) },
    { to: "/about", label: t("nav_about", lang) },
    { to: "/contact", label: t("nav_contact", lang) },
  ] as const;

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/menu", search: { q: q || undefined, cat: undefined } });
  };

  return (
    <motion.header
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="sticky top-0 z-40 px-3 pt-3 sm:px-6"
    >
      <div className="glass mx-auto flex max-w-7xl items-center gap-3 rounded-2xl px-3 py-2 sm:px-4">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <img src={logo} alt="Alamir Juices" width={44} height={36} className="h-9 w-11 rounded-lg object-cover" />
          <span className="hidden font-semibold leading-none sm:block">
            <span className="block text-sm">{t("brand", lang)}</span>
            <span className="font-script text-xs text-primary">Alamir Juices</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              activeProps={{ className: "bg-accent text-foreground font-medium" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <form onSubmit={submitSearch} className="relative mx-auto hidden w-full max-w-xs md:block">
          <Search className="pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 text-muted-foreground ltr:left-3 rtl:right-3" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("search", lang)}
            className="h-9 w-full rounded-full border border-border bg-background/60 text-sm outline-none ring-primary/40 transition focus:ring-2 ltr:pl-9 ltr:pr-3 rtl:pr-9 rtl:pl-3"
          />
        </form>

        <div className="ms-auto flex items-center gap-1">
          <button
            onClick={toggleLang}
            className="flex h-9 items-center gap-1.5 rounded-full border border-border px-3 text-xs font-semibold transition hover:bg-accent"
            aria-label="Switch language"
          >
            <Languages className="size-4" />
            {lang === "ar" ? "EN" : "عربي"}
          </button>
          <Link to="/menu" search={{ q: undefined, cat: "wishlist" }} className="relative flex size-9 items-center justify-center rounded-full transition hover:bg-accent" aria-label={t("wishlist", lang)}>
            <Heart className={cn("size-5", wishlist.length && "fill-berry text-berry")} />
          </Link>
          <button onClick={() => setCartOpen(true)} className="relative flex size-9 items-center justify-center rounded-full bg-ink text-ink-foreground transition hover:scale-105" aria-label={t("cart", lang)}>
            <ShoppingBag className="size-5" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -end-1 flex size-5 items-center justify-center rounded-full bg-mango text-[10px] font-bold text-ink-foreground"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button onClick={() => setMobile((m) => !m)} className="flex size-9 items-center justify-center rounded-full lg:hidden" aria-label="Menu">
            {mobile ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobile && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass mx-auto mt-2 flex max-w-7xl flex-col gap-1 rounded-2xl p-2 lg:hidden"
          >
            <form onSubmit={submitSearch} className="relative md:hidden">
              <Search className="pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 text-muted-foreground ltr:left-3 rtl:right-3" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("search", lang)}
                className="h-10 w-full rounded-xl border border-border bg-background/60 text-sm outline-none ltr:pl-9 rtl:pr-9"
              />
            </form>
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setMobile(false)} className="rounded-xl px-3 py-2.5 text-sm hover:bg-accent" activeProps={{ className: "bg-accent font-medium" }}>
                {l.label}
              </Link>
            ))}
            <Link to="/admin" onClick={() => setMobile(false)} className="rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent">
              {t("nav_admin", lang)}
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
