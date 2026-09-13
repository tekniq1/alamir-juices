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

export type OfferData = { id: string, title: string, discount: string, status: string, emoji: string };
export type CategoryData = { id: string, nameAr: string, nameEn: string, emoji: string };
export type SiteContent = { heroTitleAr: string, heroTitleEn: string, heroDescAr: string, heroDescEn: string, aboutTitleAr: string, aboutTitleEn: string, aboutStoryAr: string, aboutStoryEn: string };
export type SiteSettings = { whatsapp: string, phone: string, mapsLink: string, workingHoursAr: string, workingHoursEn: string };

interface AppState {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;

  adminDark: boolean;
  toggleAdminDark: () => void;
  
  adminPassword: string;
  setAdminPassword: (pw: string) => void;
  isAuthenticated: boolean;
  login: (pw: string) => boolean;
  logout: () => void;

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
  offers: OfferData[];
  updateOffer: (id: string, patch: Partial<OfferData>) => void;
  addOffer: (o: OfferData) => void;
  deleteOffer: (id: string) => void;

  categories: CategoryData[];
  updateCategory: (id: string, patch: Partial<CategoryData>) => void;
  addCategory: (c: CategoryData) => void;
  deleteCategory: (id: string) => void;

  siteContent: SiteContent;
  updateContent: (patch: Partial<SiteContent>) => void;

  siteSettings: SiteSettings;
  updateSettings: (patch: Partial<SiteSettings>) => void;
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

      adminPassword: "12345",
  setAdminPassword: (pw) => set({ adminPassword: pw }),
  isAuthenticated: false,
  login: (pw) => {
    if (pw === get().adminPassword) {
      set({ isAuthenticated: true });
      return true;
    }
    return false;
  },
  logout: () => set({ isAuthenticated: false }),

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

      offers: [
        { id: "o1", title: "??? ??????", discount: "20%", status: "active", emoji: "??" },
        { id: "o2", title: "??? ?????? ???????", discount: "1+2", status: "ending_soon", emoji: "??" },
        { id: "o3", title: "???? ???????? ???????", discount: "900 ?.?", status: "upcoming", emoji: "??" }
      ],
      updateOffer: (id, patch) => set((s) => ({ offers: s.offers.map((o) => (o.id === id ? { ...o, ...patch } : o)) })),
      addOffer: (o) => set((s) => ({ offers: [o, ...s.offers] })),
      deleteOffer: (id) => set((s) => ({ offers: s.offers.filter((o) => o.id !== id) })),

      categories: [
        { id: "c1", nameAr: "????? ??????", nameEn: "Fresh Juices", emoji: "??" },
        { id: "c2", nameAr: "???? ???", nameEn: "Milkshakes", emoji: "??" },
        { id: "c3", nameAr: "?????", nameEn: "Smoothies", emoji: "??" },
        { id: "c4", nameAr: "??????", nameEn: "Mojitos", emoji: "?????" },
        { id: "c5", nameAr: "????? ???????", nameEn: "Fruit Bowls", emoji: "??" }
      ],
      updateCategory: (id, patch) => set((s) => ({ categories: s.categories.map((c) => (c.id === id ? { ...c, ...patch } : c)) })),
      addCategory: (c) => set((s) => ({ categories: [c, ...s.categories] })),
      deleteCategory: (id) => set((s) => ({ categories: s.categories.filter((c) => c.id !== id) })),

      siteContent: {
        heroTitleAr: "??????.. ??? ???????",
        heroTitleEn: "Alamir.. King of Juices",
        heroDescAr: "????? ?????? ????? ????? ???? ???? ???????? ?????? ??? ????.",
        heroDescEn: "Premium fresh juices blended to order and delivered chilled.",
        aboutTitleAr: "?? ??????",
        aboutTitleEn: "About Alamir",
        aboutStoryAr: "???? ??? ?? ????? ?????? ????? ??????? ?? ???...",
        aboutStoryEn: "We bring you the essence of nature in a cup..."
      },
      updateContent: (patch) => set((s) => ({ siteContent: { ...s.siteContent, ...patch } })),

      siteSettings: {
        whatsapp: "967776655876",
        phone: "+967 776 655 876",
        mapsLink: "https://maps.app.goo.gl/UPmkHrs8SMTnCn2Q6",
        workingHoursAr: "?????? ?? ? ?????? ??? ?? ????? ?????",
        workingHoursEn: "Daily from 8 AM to 12 AM"
      },
      updateSettings: (patch) => set((s) => ({ siteSettings: { ...s.siteSettings, ...patch } })),

      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "alamir_cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ lang: s.lang, cart: s.cart, wishlist: s.wishlist, adminDark: s.adminDark, products: s.products, adminPassword: s.adminPassword, isAuthenticated: s.isAuthenticated, offers: s.offers, categories: s.categories, siteContent: s.siteContent, siteSettings: s.siteSettings }),
      skipHydration: true,
      onRehydrateStorage: () => (state, error) => {
        if (state) {
          if (!state.categories) state.categories = [{ id: "c1", nameAr: "????? ??????", nameEn: "Fresh Juices", emoji: "??" }, { id: "c2", nameAr: "???? ???", nameEn: "Milkshakes", emoji: "??" }];
          if (!state.siteContent) state.siteContent = { heroTitleAr: "??????.. ??? ???????", heroTitleEn: "Alamir.. King of Juices", heroDescAr: "", heroDescEn: "", aboutTitleAr: "", aboutTitleEn: "", aboutStoryAr: "", aboutStoryEn: "" };
          if (!state.siteSettings) state.siteSettings = { whatsapp: "967776655876", phone: "", mapsLink: "", workingHoursAr: "", workingHoursEn: "" };
        }
        state?.setHasHydrated(true);
      },
    },
  ),
);

export const cartTotal = (cart: CartLine[]) => cart.reduce((n, l) => n + l.unitPrice * l.qty, 0);
export const cartCount = (cart: CartLine[]) => cart.reduce((n, l) => n + l.qty, 0);



