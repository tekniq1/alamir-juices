import type { ReactNode } from "react";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";
import { ProductModal } from "./ProductModal";
import { FruitParticles } from "./FruitParticles";
import { useApp, cartTotal, cartCount } from "@/store/app";
import { formatPrice } from "@/lib/i18n";
import { useRouterState } from "@tanstack/react-router";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-clip pb-16 sm:pb-0">
      <FruitParticles />
      <Header />
      <main className="relative z-10">{children}</main>
      <Footer />
      <CartDrawer />
      <ProductModal />
      <StickyCartBar />
    </div>
  );
}

function StickyCartBar() {
  const { cart, setCartOpen, lang } = useApp();
  const count = cartCount(cart);
  const total = cartTotal(cart);
  const isCheckout = useRouterState({ select: (s) => s.location.pathname === "/checkout" });

  return (
    <AnimatePresence>
      {count > 0 && !isCheckout && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed inset-x-4 bottom-4 z-40 sm:hidden"
        >
          <button
            onClick={() => setCartOpen(true)}
            className="flex h-14 w-full items-center justify-between rounded-full bg-ink px-6 font-semibold text-ink-foreground shadow-caramel"
          >
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                <ShoppingBag className="size-5" />
                <motion.span
                  key={count}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -end-2 flex size-4 items-center justify-center rounded-full bg-mango text-[9px] font-bold text-ink-foreground"
                >
                  {count}
                </motion.span>
              </div>
              <span className="text-sm">{lang === "ar" ? "عرض السلة" : "View Cart"}</span>
            </div>
            <span className="text-sm font-bold">{formatPrice(total, lang)}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
