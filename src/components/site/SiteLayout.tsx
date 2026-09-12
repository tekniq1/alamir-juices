import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";
import { ProductModal } from "./ProductModal";
import { FruitParticles } from "./FruitParticles";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <FruitParticles />
      <Header />
      <main className="relative z-10">{children}</main>
      <Footer />
      <CartDrawer />
      <ProductModal />
    </div>
  );
}
