import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Lang } from "@/lib/i18n";
import {
  addons,
  products as seedProducts,
  sizes,
  sugars,
  type AddonId,
  type CartLine,
  type Product,
  type SizeId,
  type SugarId,
} from "@/data/mock";

export function computeUnitPrice(product: Product, size: SizeId, sugar: SugarId, addonIds: AddonId[]) {
  const s = sizes.find((x) => x.id === size)!;
  const g = sugars.find((x) => x.id === sugar)!;
  const a = addonIds.reduce((sum, id) => sum + (addons.find((x) => x.id === id)?.price ?? 0), 0);
  return product.basePrice + s.priceDelta + g.priceDelta + a;
}

export function computeNutrition(product: Product, size: SizeId, sugar: SugarId, addonIds: AddonId[]) {
  const s = sizes.find((x) => x.id === size)!;
  const g = sugars.find((x) => x.id === sugar)!;
  const a = addonIds.map((id) => addons.find((x) => x.id === id)!);
  const calories = Math.round(product.calories * s.nutritionFactor + g.caloriesDelta * s.nutritionFactor + a.reduce((n, x) => n + x.calories, 0));
  const carbs = Math.round(product.carbs * s.nutritionFactor + g.carbsDelta * s.nutritionFactor + a.reduce((n, x) => n + x.carbs, 0));
  return { calories, carbs };
}

interface AppState {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;

  adminDark: boolean;
  toggleAdminDark: () => void;

  cart: CartLine[];
  cartOpen: boolean;
  setCartOpen: (o: boolean) => void;
  addToCart: (line: Omit<CartLine, "lineId">) => void;
  updateQty: (lineId: string, qty: number) => void;
  removeLine: (lineId: string) => void;
  clearCart: () => void;

  wishlist: string[];
  toggleWishlist: (id: string) => void;

  activeProductId: string | null;
  openProduct: (id: string | null) => void;

  products: Product[];
  updateProduct: (id: string, patch: Partial<Product>) => void;
  addProduct: (p: Product) => void;

  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

let counter = 1043;

export const useApp = create<AppState>()(
  persist(
    (set, get) => ({
      lang: "ar",
      setLang: (lang) => set({ lang }),
      toggleLang: () => set({ lang: get().lang === "ar" ? "en" : "ar" }),

      adminDark: false,
      toggleAdminDark: () => set({ adminDark: !get().adminDark }),

      cart: [],
      cartOpen: false,
      setCartOpen: (cartOpen) => set({ cartOpen }),
      addToCart: (line) =>
        set((s) => {
          const key = `${line.productId}-${line.size}-${line.sugar}-${[...line.addons].sort().join("+")}-${line.notes ?? ""}`;
          const existing = s.cart.find((c) => c.lineId === key);
          if (existing) {
            return { cart: s.cart.map((c) => (c.lineId === key ? { ...c, qty: c.qty + line.qty } : c)), cartOpen: true };
          }
          return { cart: [...s.cart, { ...line, lineId: key }], cartOpen: true };
        }),
      updateQty: (lineId, qty) =>
        set((s) => ({ cart: qty <= 0 ? s.cart.filter((c) => c.lineId !== lineId) : s.cart.map((c) => (c.lineId === lineId ? { ...c, qty } : c)) })),
      removeLine: (lineId) => set((s) => ({ cart: s.cart.filter((c) => c.lineId !== lineId) })),
      clearCart: () => set({ cart: [] }),

      wishlist: [],
      toggleWishlist: (id) =>
        set((s) => ({ wishlist: s.wishlist.includes(id) ? s.wishlist.filter((x) => x !== id) : [...s.wishlist, id] })),

      activeProductId: null,
      openProduct: (activeProductId) => set({ activeProductId }),

      products: seedProducts,
      updateProduct: (id, patch) => set((s) => ({ products: s.products.map((p) => (p.id === id ? { ...p, ...patch } : p)) })),
      addProduct: (p) => set((s) => ({ products: [p, ...s.products] })),

      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "alamir_cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ lang: s.lang, cart: s.cart, wishlist: s.wishlist, adminDark: s.adminDark }),
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export const cartTotal = (cart: CartLine[]) => cart.reduce((n, l) => n + l.unitPrice * l.qty, 0);
export const cartCount = (cart: CartLine[]) => cart.reduce((n, l) => n + l.qty, 0);
