/**
 * Mock REST-style data layer. Shapes mirror what a Supabase / Node backend
 * would return so swapping to real fetches is a one-file change.
 */
import type { LocalizedString } from "@/lib/i18n";

import orange from "@/assets/products/orange.jpg";
import mango from "@/assets/products/mango.jpg";
import strawberry from "@/assets/products/strawberry.jpg";
import green from "@/assets/products/green.jpg";
import avocado from "@/assets/products/avocado.jpg";
import watermelon from "@/assets/products/watermelon.jpg";
import berry from "@/assets/products/berry.jpg";
import carrot from "@/assets/products/carrot.jpg";
import jug from "@/assets/products/jug.jpg";
import lemon from "@/assets/products/lemon.jpg";
import sandwichClub from "@/assets/products/sandwich_club.jpg";
import sandwichTuna from "@/assets/products/sandwich_tuna.jpg";
import sandwichEgg from "@/assets/products/sandwich_egg.jpg";
import sandwichFalafel from "@/assets/products/sandwich_falafel.jpg";
import sandwichGrilled from "@/assets/products/sandwich_grilled.jpg";
import sandwichVeggie from "@/assets/products/sandwich_veggie.jpg";

export type CategoryId = "juices" | "sandwiches" | "hot_drinks" | "fruits";

export interface Category {
  id: CategoryId;
  name: LocalizedString;
  tagline: LocalizedString;
  emoji: string;
  accent: "mango" | "primary" | "berry" | "lime" | "ink";
}

export type SizeId = "S" | "L" | "BOX" | "PIECE" | "KG";
export type SugarId = "0" | "25" | "50" | "100" | "honey";
export type AddonId = "fruit" | "chia" | "protein" | "boba" | "icecream";

export interface SizeOption {
  id: SizeId;
  label: LocalizedString;
  ml: number;
  priceDelta: number;
  scale: number;
  nutritionFactor: number;
}
export interface SugarOption {
  id: SugarId;
  label: LocalizedString;
  caloriesDelta: number;
  carbsDelta: number;
  priceDelta: number;
}
export interface AddonOption {
  id: AddonId;
  label: LocalizedString;
  price: number;
  calories: number;
  carbs: number;
  emoji: string;
}

export interface Product {
  id: string;
  categoryId: CategoryId;
  name: LocalizedString;
  description: LocalizedString;
  basePrice: number;
  kgPrice?: number;
  sizePrice?: Partial<Record<SizeId, number>>;
  calories: number;
  carbs: number;
  image: string;
  color: string;
  rating: number;
  inStock: boolean;
  tags: LocalizedString[];
}

export interface CartLine {
  lineId: string;
  productId: string;
  size: SizeId;
  sugar: SugarId;
  addons: AddonId[];
  qty: number;
  unitPrice: number;
  notes?: string;
}

export type OrderStatus = "new" | "preparing" | "picked" | "delivering" | "completed";

export interface Order {
  id: string;
  customer: string;
  phone: string;
  items: { name: LocalizedString; qty: number; size: SizeId }[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  eta: number;
  payment: "apple" | "card" | "cash";
  address: string;
  riderId?: string;
}

export interface Rider {
  id: string;
  name: string;
  x: number;
  y: number;
  status: "idle" | "delivering" | "returning";
  orders: number;
}

export interface Branch {
  id: string;
  name: LocalizedString;
  x: number;
  y: number;
  radius: number;
  openOrders: number;
}

export const categories: Category[] = [
  { id: "juices",     name: { ar: "العصائر",              en: "Juices" },      tagline: { ar: "عصائر طازجة يومياً",       en: "Fresh daily juices" },       emoji: "🧃", accent: "mango"  },
  { id: "sandwiches", name: { ar: "السندوتشات",            en: "Sandwiches" },  tagline: { ar: "وجبات خفيفة شهية",         en: "Light & tasty bites" },      emoji: "🥪", accent: "primary" },
  { id: "hot_drinks", name: { ar: "المشروبات الساخنة",    en: "Hot Drinks" },   tagline: { ar: "دفء في كل كوب",            en: "Warmth in every cup" },      emoji: "☕", accent: "berry"  },
  { id: "fruits",     name: { ar: "الفواكه",               en: "Fruits" },      tagline: { ar: "بالحبة والكيلو",            en: "By piece or by kilo" },      emoji: "🍎", accent: "lime"   },
];


export const sizes: SizeOption[] = [
  { id: "S",     label: { ar: "قلص صغير",   en: "Small Cup"   }, ml: 300, priceDelta: 0,  scale: 0.75, nutritionFactor: 1   },
  { id: "L",     label: { ar: "قلص دبل",     en: "Double Cup"  }, ml: 500, priceDelta: 0,  scale: 1,    nutritionFactor: 1.8 },
  { id: "BOX",   label: { ar: "علبة 750 ملي", en: "750ml Bottle"}, ml: 750, priceDelta: 10, scale: 1.2,  nutritionFactor: 2.5 },
  { id: "PIECE", label: { ar: "بالحبة",      en: "Per Piece"   }, ml: 0,   priceDelta: 0,  scale: 0.9,  nutritionFactor: 1   },
  { id: "KG",    label: { ar: "بالكيلو",     en: "Per Kilo"    }, ml: 0,   priceDelta: 0,  scale: 1.1,  nutritionFactor: 3   },
];

export const sugars: SugarOption[] = [
  { id: "0", label: { ar: "بدون سكر", en: "0%" }, caloriesDelta: 0, carbsDelta: 0, priceDelta: 0 },
  { id: "25", label: { ar: "٢٥٪", en: "25%" }, caloriesDelta: 20, carbsDelta: 5, priceDelta: 0 },
  { id: "50", label: { ar: "٥٠٪", en: "50%" }, caloriesDelta: 40, carbsDelta: 10, priceDelta: 0 },
  { id: "100", label: { ar: "١٠٠٪", en: "100%" }, caloriesDelta: 80, carbsDelta: 20, priceDelta: 0 },
  { id: "honey", label: { ar: "عسل طبيعي", en: "Natural honey" }, caloriesDelta: 60, carbsDelta: 16, priceDelta: 3 },
];

export const addons: AddonOption[] = [
  { id: "fruit", label: { ar: "شرائح فاكهة", en: "Fresh fruit slices" }, price: 3, calories: 25, carbs: 6, emoji: "🍉" },
  { id: "chia", label: { ar: "بذور الشيا", en: "Chia seeds" }, price: 2, calories: 60, carbs: 5, emoji: "🌱" },
  { id: "protein", label: { ar: "بروتين", en: "Protein powder" }, price: 5, calories: 110, carbs: 3, emoji: "💪" },
  { id: "boba", label: { ar: "بوبا", en: "Boba pearls" }, price: 4, calories: 120, carbs: 30, emoji: "🧋" },
  { id: "icecream", label: { ar: "آيس كريم", en: "Ice cream scoop" }, price: 5, calories: 140, carbs: 17, emoji: "🍦" },
];

export const products: Product[] = [
  // ── عصائر ──
  { id: "j101", categoryId: "juices", name: { ar: "مركز", en: "Concentrate" }, description: { ar: "عصير مركز طازج.", en: "Fresh concentrate juice." }, basePrice: 400, sizePrice: { S: 400, L: 600, BOX: 1000 }, calories: 120, carbs: 28, image: orange, color: "mango", rating: 4.7, inStock: true, tags: [] },
  { id: "j102", categoryId: "juices", name: { ar: "مركز مع جبن", en: "Concentrate with Cheese" }, description: { ar: "مركز مع جبن كريمي.", en: "Concentrate with cream cheese." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1200 }, calories: 180, carbs: 30, image: orange, color: "mango", rating: 4.6, inStock: true, tags: [] },
  { id: "j103", categoryId: "juices", name: { ar: "مركز مع جوافة", en: "Concentrate with Guava" }, description: { ar: "مركز وجوافة طازجة.", en: "Concentrate with fresh guava." }, basePrice: 400, sizePrice: { S: 400, L: 700, BOX: 1200 }, calories: 130, carbs: 30, image: orange, color: "mango", rating: 4.6, inStock: true, tags: [] },
  { id: "j104", categoryId: "juices", name: { ar: "مانجو طبيعي", en: "Natural Mango" }, description: { ar: "مانجو طبيعي طازج.", en: "Fresh natural mango juice." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1400 }, calories: 150, carbs: 35, image: mango, color: "mango", rating: 4.9, inStock: true, tags: [{ ar: "الأكثر مبيعاً", en: "Best seller" }] },
  { id: "j105", categoryId: "juices", name: { ar: "مجموع", en: "Mixed" }, description: { ar: "خلطة فواكه مشكلة.", en: "Mixed fruit blend." }, basePrice: 400, sizePrice: { S: 400, L: 600, BOX: 1200 }, calories: 120, carbs: 28, image: orange, color: "berry", rating: 4.5, inStock: true, tags: [] },
  { id: "j106", categoryId: "juices", name: { ar: "عرايسي", en: "Araissi" }, description: { ar: "خلطة عرايسي المميزة.", en: "Special Araissi blend." }, basePrice: 400, sizePrice: { S: 400, L: 600, BOX: 1200 }, calories: 120, carbs: 28, image: orange, color: "mango", rating: 4.5, inStock: true, tags: [] },
  { id: "j107", categoryId: "juices", name: { ar: "حليب بالموز", en: "Banana Milk" }, description: { ar: "حليب طازج مع موز.", en: "Fresh milk with banana." }, basePrice: 300, sizePrice: { S: 300, L: 400, BOX: 900 }, calories: 200, carbs: 32, image: mango, color: "mango", rating: 4.7, inStock: true, tags: [] },
  { id: "j108", categoryId: "juices", name: { ar: "حليب بالموز والتمر", en: "Banana Date Milk" }, description: { ar: "حليب مع موز وتمر.", en: "Milk with banana and dates." }, basePrice: 400, sizePrice: { S: 400, L: 500, BOX: 1200 }, calories: 260, carbs: 42, image: mango, color: "mango", rating: 4.8, inStock: true, tags: [] },
  { id: "j109", categoryId: "juices", name: { ar: "موز مع المكسرات", en: "Banana with Nuts" }, description: { ar: "موز مع مكسرات مشكلة.", en: "Banana with assorted nuts." }, basePrice: 700, sizePrice: { S: 700, L: 1000, BOX: 2000 }, calories: 350, carbs: 45, image: mango, color: "mango", rating: 4.8, inStock: true, tags: [] },
  { id: "j110", categoryId: "juices", name: { ar: "جوافة", en: "Guava" }, description: { ar: "جوافة طازجة.", en: "Fresh guava juice." }, basePrice: 300, sizePrice: { S: 300, L: 500, BOX: 1000 }, calories: 100, carbs: 24, image: green, color: "lime", rating: 4.6, inStock: true, tags: [] },
  { id: "j111", categoryId: "juices", name: { ar: "جوافة مع موز", en: "Guava with Banana" }, description: { ar: "جوافة وموز طازج.", en: "Guava with fresh banana." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1000 }, calories: 150, carbs: 35, image: green, color: "lime", rating: 4.6, inStock: true, tags: [] },
  { id: "j112", categoryId: "juices", name: { ar: "جوافة مع عنب", en: "Guava with Grapes" }, description: { ar: "جوافة وعنب طازج.", en: "Guava with fresh grapes." }, basePrice: 400, sizePrice: { S: 400, L: 700, BOX: 1200 }, calories: 140, carbs: 33, image: green, color: "lime", rating: 4.6, inStock: true, tags: [] },
  { id: "j113", categoryId: "juices", name: { ar: "جوافة مع المكسرات", en: "Guava with Nuts" }, description: { ar: "جوافة مع مكسرات مشكلة.", en: "Guava with assorted nuts." }, basePrice: 800, sizePrice: { S: 800, L: 1200, BOX: 2400 }, calories: 280, carbs: 38, image: green, color: "lime", rating: 4.7, inStock: true, tags: [] },
  { id: "j114", categoryId: "juices", name: { ar: "فراولة", en: "Strawberry" }, description: { ar: "فراولة طازجة.", en: "Fresh strawberry juice." }, basePrice: 400, sizePrice: { S: 400, L: 600, BOX: 1200 }, calories: 120, carbs: 28, image: strawberry, color: "berry", rating: 4.8, inStock: true, tags: [] },
  { id: "j115", categoryId: "juices", name: { ar: "فراولة بالحليب", en: "Strawberry Milk" }, description: { ar: "فراولة مع حليب طازج.", en: "Strawberry with fresh milk." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1500 }, calories: 200, carbs: 35, image: strawberry, color: "berry", rating: 4.8, inStock: true, tags: [] },
  { id: "j116", categoryId: "juices", name: { ar: "فراولة بالحليب مع تفاح", en: "Strawberry Milk with Apple" }, description: { ar: "فراولة وحليب وتفاح.", en: "Strawberry, milk and apple." }, basePrice: 600, sizePrice: { S: 600, L: 800, BOX: 1500 }, calories: 220, carbs: 38, image: strawberry, color: "berry", rating: 4.7, inStock: true, tags: [] },
  { id: "j117", categoryId: "juices", name: { ar: "فراولة مع المكسرات", en: "Strawberry with Nuts" }, description: { ar: "فراولة مع مكسرات مشكلة.", en: "Strawberry with assorted nuts." }, basePrice: 900, sizePrice: { S: 900, L: 1000, BOX: 2500 }, calories: 300, carbs: 42, image: strawberry, color: "berry", rating: 4.8, inStock: true, tags: [] },
  { id: "j118", categoryId: "juices", name: { ar: "فراولة مع الموز", en: "Strawberry with Banana" }, description: { ar: "فراولة وموز طازج.", en: "Strawberry with fresh banana." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1500 }, calories: 170, carbs: 36, image: strawberry, color: "berry", rating: 4.8, inStock: true, tags: [] },
  { id: "j119", categoryId: "juices", name: { ar: "فراولة مع عنبرود", en: "Strawberry with Pear" }, description: { ar: "فراولة وعنبرود.", en: "Strawberry with pear." }, basePrice: 600, sizePrice: { S: 600, L: 900, BOX: 1800 }, calories: 160, carbs: 35, image: strawberry, color: "berry", rating: 4.7, inStock: true, tags: [] },
  { id: "j120", categoryId: "juices", name: { ar: "فراولة أناناس كيوي", en: "Strawberry Pineapple Kiwi" }, description: { ar: "فراولة وأناناس وكيوي.", en: "Strawberry, pineapple and kiwi." }, basePrice: 600, sizePrice: { S: 600, L: 900, BOX: 1500 }, calories: 180, carbs: 38, image: strawberry, color: "berry", rating: 4.8, inStock: true, tags: [] },
  { id: "j121", categoryId: "juices", name: { ar: "فراولة كيوي مكسرات", en: "Strawberry Kiwi Nuts" }, description: { ar: "فراولة وكيوي ومكسرات.", en: "Strawberry, kiwi and nuts." }, basePrice: 1000, sizePrice: { S: 1000, L: 1400, BOX: 2800 }, calories: 320, carbs: 45, image: strawberry, color: "berry", rating: 4.9, inStock: true, tags: [] },
  { id: "j122", categoryId: "juices", name: { ar: "أفوكادو", en: "Avocado" }, description: { ar: "أفوكادو كريمي طازج.", en: "Fresh creamy avocado." }, basePrice: 800, sizePrice: { S: 800, L: 1200, BOX: 2400 }, calories: 310, carbs: 18, image: avocado, color: "lime", rating: 4.9, inStock: true, tags: [{ ar: "توقيع الأمير", en: "Signature" }] },
  { id: "j123", categoryId: "juices", name: { ar: "أفوكادو مع الفراولة", en: "Avocado with Strawberry" }, description: { ar: "أفوكادو وفراولة طازجة.", en: "Avocado with fresh strawberry." }, basePrice: 800, sizePrice: { S: 800, L: 1200, BOX: 2000 }, calories: 280, carbs: 25, image: avocado, color: "lime", rating: 4.9, inStock: true, tags: [] },
  { id: "j124", categoryId: "juices", name: { ar: "أفوكادو مع الجبن", en: "Avocado with Cheese" }, description: { ar: "أفوكادو مع جبن كريمي.", en: "Avocado with cream cheese." }, basePrice: 800, sizePrice: { S: 800, L: 1200, BOX: 2400 }, calories: 340, carbs: 20, image: avocado, color: "lime", rating: 4.8, inStock: true, tags: [] },
  { id: "j125", categoryId: "juices", name: { ar: "أفوكادو مع كيوي", en: "Avocado with Kiwi" }, description: { ar: "أفوكادو وكيوي طازج.", en: "Avocado with fresh kiwi." }, basePrice: 800, sizePrice: { S: 800, L: 1200, BOX: 2400 }, calories: 290, carbs: 22, image: avocado, color: "lime", rating: 4.8, inStock: true, tags: [] },
  { id: "j126", categoryId: "juices", name: { ar: "أفوكادو كيوي فراولة مكسرات", en: "Avocado Kiwi Strawberry Nuts" }, description: { ar: "أفوكادو وكيوي وفراولة ومكسرات.", en: "Avocado, kiwi, strawberry and nuts." }, basePrice: 1200, sizePrice: { S: 1200, L: 1500, BOX: 3000 }, calories: 420, carbs: 35, image: avocado, color: "lime", rating: 5.0, inStock: true, tags: [{ ar: "توقيع الأمير", en: "Signature" }] },
  { id: "j127", categoryId: "juices", name: { ar: "أفوكادو مع مكسرات", en: "Avocado with Nuts" }, description: { ar: "أفوكادو مع مكسرات مشكلة.", en: "Avocado with assorted nuts." }, basePrice: 1200, sizePrice: { S: 1200, L: 1500, BOX: 3000 }, calories: 450, carbs: 22, image: avocado, color: "lime", rating: 4.9, inStock: true, tags: [] },
  { id: "j128", categoryId: "juices", name: { ar: "أفوكادو مع عنب", en: "Avocado with Grapes" }, description: { ar: "أفوكادو وعنب طازج.", en: "Avocado with fresh grapes." }, basePrice: 800, sizePrice: { S: 800, L: 1200, BOX: 2400 }, calories: 300, carbs: 28, image: avocado, color: "lime", rating: 4.8, inStock: true, tags: [] },
  { id: "j129", categoryId: "juices", name: { ar: "أفوكادو عنبرود كيوي", en: "Avocado Pear Kiwi" }, description: { ar: "أفوكادو وعنبرود وكيوي.", en: "Avocado, pear and kiwi." }, basePrice: 800, sizePrice: { S: 800, L: 1500, BOX: 3000 }, calories: 320, carbs: 30, image: avocado, color: "lime", rating: 4.8, inStock: true, tags: [] },
  { id: "j130", categoryId: "juices", name: { ar: "كيوي", en: "Kiwi" }, description: { ar: "كيوي طازج.", en: "Fresh kiwi juice." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1500 }, calories: 110, carbs: 26, image: green, color: "lime", rating: 4.7, inStock: true, tags: [] },
  { id: "j131", categoryId: "juices", name: { ar: "كيوي مع فراولة", en: "Kiwi with Strawberry" }, description: { ar: "كيوي وفراولة طازجة.", en: "Kiwi with fresh strawberry." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1800 }, calories: 140, carbs: 30, image: green, color: "lime", rating: 4.7, inStock: true, tags: [] },
  { id: "j132", categoryId: "juices", name: { ar: "كيوي فراولة موز", en: "Kiwi Strawberry Banana" }, description: { ar: "كيوي وفراولة وموز.", en: "Kiwi, strawberry and banana." }, basePrice: 600, sizePrice: { S: 600, L: 800, BOX: 1800 }, calories: 170, carbs: 36, image: green, color: "lime", rating: 4.7, inStock: true, tags: [] },
  { id: "j133", categoryId: "juices", name: { ar: "كيوي مع المكسرات", en: "Kiwi with Nuts" }, description: { ar: "كيوي مع مكسرات.", en: "Kiwi with nuts." }, basePrice: 900, sizePrice: { S: 900, L: 1300, BOX: 2600 }, calories: 300, carbs: 34, image: green, color: "lime", rating: 4.8, inStock: true, tags: [] },
  { id: "j134", categoryId: "juices", name: { ar: "عصير الملكي مع المكسرات", en: "Royal Juice with Nuts" }, description: { ar: "عصير ملكي مع مكسرات مشكلة.", en: "Royal juice with assorted nuts." }, basePrice: 1000, sizePrice: { S: 1000, L: 1400, BOX: 2500 }, calories: 380, carbs: 40, image: jug, color: "mango", rating: 4.9, inStock: true, tags: [{ ar: "توقيع الأمير", en: "Signature" }] },
  { id: "j135", categoryId: "juices", name: { ar: "كيوي عنبرود شمام موز", en: "Kiwi Pear Melon Banana" }, description: { ar: "كيوي وعنبرود وشمام وموز.", en: "Kiwi, pear, melon and banana." }, basePrice: 1000, sizePrice: { S: 1000, L: 1500, BOX: 2400 }, calories: 220, carbs: 42, image: green, color: "lime", rating: 4.8, inStock: true, tags: [] },
  { id: "j136", categoryId: "juices", name: { ar: "كيوي مع عنبرود", en: "Kiwi with Pear" }, description: { ar: "كيوي وعنبرود.", en: "Kiwi with pear." }, basePrice: 600, sizePrice: { S: 600, L: 700, BOX: 1800 }, calories: 150, carbs: 32, image: green, color: "lime", rating: 4.6, inStock: true, tags: [] },
  { id: "j137", categoryId: "juices", name: { ar: "عنبرود", en: "Pear" }, description: { ar: "عنبرود طازج.", en: "Fresh pear juice." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1500 }, calories: 100, carbs: 24, image: green, color: "lime", rating: 4.6, inStock: true, tags: [] },
  { id: "j138", categoryId: "juices", name: { ar: "عنبرود مع تفاح", en: "Pear with Apple" }, description: { ar: "عنبرود وتفاح.", en: "Pear with apple." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1500 }, calories: 120, carbs: 28, image: green, color: "lime", rating: 4.6, inStock: true, tags: [] },
  { id: "j139", categoryId: "juices", name: { ar: "عنبرود فراولة موز", en: "Pear Strawberry Banana" }, description: { ar: "عنبرود وفراولة وموز.", en: "Pear, strawberry and banana." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1800 }, calories: 160, carbs: 35, image: green, color: "lime", rating: 4.7, inStock: true, tags: [] },
  { id: "j140", categoryId: "juices", name: { ar: "عصير الملكي", en: "Royal Juice" }, description: { ar: "خلطة الملكي الأمير.", en: "The Prince Royal blend." }, basePrice: 700, sizePrice: { S: 700, L: 1000, BOX: 2000 }, calories: 200, carbs: 38, image: jug, color: "mango", rating: 4.9, inStock: true, tags: [{ ar: "توقيع الأمير", en: "Signature" }] },
  { id: "j141", categoryId: "juices", name: { ar: "عنبرود كيوي مكسرات", en: "Pear Kiwi Nuts" }, description: { ar: "عنبرود وكيوي ومكسرات.", en: "Pear, kiwi and nuts." }, basePrice: 1000, sizePrice: { S: 1000, L: 1400, BOX: 2500 }, calories: 310, carbs: 38, image: green, color: "lime", rating: 4.8, inStock: true, tags: [] },
  { id: "j142", categoryId: "juices", name: { ar: "عنب", en: "Grapes" }, description: { ar: "عنب طازج.", en: "Fresh grape juice." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1500 }, calories: 120, carbs: 29, image: berry, color: "berry", rating: 4.7, inStock: true, tags: [] },
  { id: "j143", categoryId: "juices", name: { ar: "عنب مع الرمان", en: "Grapes with Pomegranate" }, description: { ar: "عنب ورمان طازج.", en: "Grapes with fresh pomegranate." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1200 }, calories: 130, carbs: 30, image: berry, color: "berry", rating: 4.7, inStock: true, tags: [] },
  { id: "j144", categoryId: "juices", name: { ar: "عنب كبس", en: "Pressed Grapes" }, description: { ar: "عنب معصور بضغط.", en: "Cold-pressed grapes." }, basePrice: 1000, sizePrice: { S: 1000, L: 1300, BOX: 3000 }, calories: 200, carbs: 45, image: berry, color: "berry", rating: 4.8, inStock: true, tags: [] },
  { id: "j145", categoryId: "juices", name: { ar: "مشكل فواكه", en: "Mixed Fruits" }, description: { ar: "مشكل فواكه موسمية.", en: "Seasonal mixed fruits." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1500 }, calories: 150, carbs: 35, image: jug, color: "mango", rating: 4.8, inStock: true, tags: [] },
  { id: "j146", categoryId: "juices", name: { ar: "مشكل فواكه كبس", en: "Pressed Mixed Fruits" }, description: { ar: "مشكل فواكه معصور بضغط.", en: "Cold-pressed mixed fruits." }, basePrice: 1500, sizePrice: { S: 1500, L: 2500, BOX: 5000 }, calories: 280, carbs: 55, image: jug, color: "mango", rating: 4.9, inStock: true, tags: [] },
  { id: "j148", categoryId: "juices", name: { ar: "تفاح", en: "Apple" }, description: { ar: "تفاح طازج.", en: "Fresh apple juice." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1500 }, calories: 110, carbs: 26, image: green, color: "lime", rating: 4.7, inStock: true, tags: [] },
  { id: "j149", categoryId: "juices", name: { ar: "تفاح كبس", en: "Pressed Apple" }, description: { ar: "تفاح معصور بضغط.", en: "Cold-pressed apple." }, basePrice: 1600, sizePrice: { S: 1600, L: 2200, BOX: 4500 }, calories: 210, carbs: 48, image: green, color: "lime", rating: 4.8, inStock: true, tags: [] },
  { id: "j150", categoryId: "juices", name: { ar: "تفاح مع الموز", en: "Apple with Banana" }, description: { ar: "تفاح وموز.", en: "Apple with banana." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1400 }, calories: 150, carbs: 34, image: green, color: "lime", rating: 4.6, inStock: true, tags: [] },
  { id: "j151", categoryId: "juices", name: { ar: "تفاح مع الحليب", en: "Apple with Milk" }, description: { ar: "تفاح وحليب.", en: "Apple with milk." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1400 }, calories: 170, carbs: 32, image: green, color: "lime", rating: 4.6, inStock: true, tags: [] },
  { id: "j152", categoryId: "juices", name: { ar: "برتقال", en: "Orange" }, description: { ar: "برتقال طازج.", en: "Fresh orange juice." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1400 }, calories: 110, carbs: 26, image: orange, color: "mango", rating: 4.9, inStock: true, tags: [{ ar: "الأكثر مبيعاً", en: "Best seller" }] },
  { id: "j153", categoryId: "juices", name: { ar: "برتقال كبس", en: "Pressed Orange" }, description: { ar: "برتقال معصور بضغط.", en: "Cold-pressed orange." }, basePrice: 1200, sizePrice: { S: 1200, L: 1500, BOX: 3000 }, calories: 200, carbs: 46, image: orange, color: "mango", rating: 4.9, inStock: true, tags: [] },
  { id: "j155", categoryId: "juices", name: { ar: "برتقال مع أناناس", en: "Orange with Pineapple" }, description: { ar: "برتقال وأناناس.", en: "Orange with pineapple." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1500 }, calories: 130, carbs: 30, image: orange, color: "mango", rating: 4.7, inStock: true, tags: [] },
  { id: "j156", categoryId: "juices", name: { ar: "برتقال مع جزر", en: "Orange with Carrot" }, description: { ar: "برتقال وجزر.", en: "Orange with carrot." }, basePrice: 500, sizePrice: { S: 500, L: 600, BOX: 1400 }, calories: 120, carbs: 28, image: orange, color: "mango", rating: 4.7, inStock: true, tags: [] },
  { id: "j157", categoryId: "juices", name: { ar: "برتقال جزر كبس", en: "Pressed Orange Carrot" }, description: { ar: "برتقال وجزر معصور بضغط.", en: "Cold-pressed orange and carrot." }, basePrice: 1000, sizePrice: { S: 1000, L: 1500, BOX: 2500 }, calories: 200, carbs: 44, image: orange, color: "mango", rating: 4.8, inStock: true, tags: [] },
  { id: "j158", categoryId: "juices", name: { ar: "جزر", en: "Carrot" }, description: { ar: "جزر طازج.", en: "Fresh carrot juice." }, basePrice: 300, sizePrice: { S: 300, L: 500, BOX: 1000 }, calories: 90, carbs: 20, image: carrot, color: "mango", rating: 4.5, inStock: true, tags: [{ ar: "صحي", en: "Healthy" }] },
  { id: "j159", categoryId: "juices", name: { ar: "ليم", en: "Lime" }, description: { ar: "ليم طازج.", en: "Fresh lime juice." }, basePrice: 150, sizePrice: { S: 150, L: 200, BOX: 400 }, calories: 60, carbs: 14, image: lemon, color: "lime", rating: 4.7, inStock: true, tags: [] },
  { id: "j160", categoryId: "juices", name: { ar: "ليم مع النعناع", en: "Lime with Mint" }, description: { ar: "ليم ونعناع طازج.", en: "Lime with fresh mint." }, basePrice: 150, sizePrice: { S: 150, L: 250, BOX: 500 }, calories: 65, carbs: 15, image: lemon, color: "lime", rating: 4.8, inStock: true, tags: [] },
  { id: "j161", categoryId: "juices", name: { ar: "رمان", en: "Pomegranate" }, description: { ar: "رمان طازج.", en: "Fresh pomegranate juice." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1500 }, calories: 130, carbs: 32, image: berry, color: "berry", rating: 4.8, inStock: true, tags: [] },
  { id: "j162", categoryId: "juices", name: { ar: "رمان كبس", en: "Pressed Pomegranate" }, description: { ar: "رمان معصور بضغط.", en: "Cold-pressed pomegranate." }, basePrice: 1000, sizePrice: { S: 1000, L: 1500, BOX: 3000 }, calories: 240, carbs: 58, image: berry, color: "berry", rating: 4.9, inStock: true, tags: [] },
  { id: "j163", categoryId: "juices", name: { ar: "شمام", en: "Honeydew Melon" }, description: { ar: "شمام طازج.", en: "Fresh honeydew melon juice." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1400 }, calories: 100, carbs: 24, image: green, color: "lime", rating: 4.6, inStock: true, tags: [] },
  { id: "j164", categoryId: "juices", name: { ar: "شمام بالحليب", en: "Melon with Milk" }, description: { ar: "شمام وحليب.", en: "Melon with milk." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1400 }, calories: 150, carbs: 28, image: green, color: "lime", rating: 4.6, inStock: true, tags: [] },
  { id: "j165", categoryId: "juices", name: { ar: "شمام مع الموز", en: "Melon with Banana" }, description: { ar: "شمام وموز.", en: "Melon with banana." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1400 }, calories: 140, carbs: 30, image: green, color: "lime", rating: 4.6, inStock: true, tags: [] },
  { id: "j167", categoryId: "juices", name: { ar: "عصير 4 طبقات", en: "4 Layers Juice" }, description: { ar: "عصير 4 طبقات.", en: "4 layers juice." }, basePrice: 600, sizePrice: { S: 600, L: 1200, BOX: 1400 }, calories: 220, carbs: 45, image: jug, color: "mango", rating: 4.7, inStock: true, tags: [] },
  { id: "j169", categoryId: "juices", name: { ar: "أناناس", en: "Pineapple" }, description: { ar: "أناناس طازج.", en: "Fresh pineapple juice." }, basePrice: 700, sizePrice: { S: 700, L: 1000, BOX: 2000 }, calories: 130, carbs: 32, image: green, color: "lime", rating: 4.8, inStock: true, tags: [] },
  { id: "j170", categoryId: "juices", name: { ar: "أناناس كبس", en: "Pressed Pineapple" }, description: { ar: "أناناس معصور بضغط.", en: "Cold-pressed pineapple." }, basePrice: 2500, sizePrice: { S: 2500, L: 3500, BOX: 7000 }, calories: 250, carbs: 62, image: green, color: "lime", rating: 4.9, inStock: true, tags: [] },
  { id: "j171", categoryId: "juices", name: { ar: "أناناس جزر برتقال شمام", en: "Pineapple Carrot Orange Melon" }, description: { ar: "أناناس وجزر وبرتقال وشمام.", en: "Pineapple, carrot, orange and melon." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1500 }, calories: 160, carbs: 36, image: green, color: "lime", rating: 4.7, inStock: true, tags: [] },
  { id: "j172", categoryId: "juices", name: { ar: "سلطة فواكه", en: "Fruit Salad" }, description: { ar: "سلطة فواكه طازجة مشكلة.", en: "Fresh mixed fruit salad." }, basePrice: 1500, sizePrice: { S: 1500, L: 2000, BOX: 3000 }, calories: 200, carbs: 45, image: jug, color: "mango", rating: 4.8, inStock: true, tags: [] },
  { id: "j173", categoryId: "juices", name: { ar: "عصير الأمير", en: "Prince Juice" }, description: { ar: "خلطة الأمير الخاصة.", en: "The Prince special blend." }, basePrice: 700, sizePrice: { S: 700, L: 1200, BOX: 2400 }, calories: 200, carbs: 42, image: mango, color: "mango", rating: 5.0, inStock: true, tags: [{ ar: "توقيع الأمير", en: "Signature" }] },
  { id: "j174", categoryId: "juices", name: { ar: "كاكا", en: "Persimmon" }, description: { ar: "كاكا طازج.", en: "Fresh persimmon juice." }, basePrice: 800, sizePrice: { S: 800, L: 1200, BOX: 2400 }, calories: 160, carbs: 38, image: orange, color: "mango", rating: 4.7, inStock: true, tags: [] },
  { id: "j175", categoryId: "juices", name: { ar: "شمام مع جوافة", en: "Melon with Guava" }, description: { ar: "شمام وجوافة.", en: "Melon with guava." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1400 }, calories: 120, carbs: 28, image: green, color: "lime", rating: 4.6, inStock: true, tags: [] },
  { id: "j176", categoryId: "juices", name: { ar: "شمام مع أناناس", en: "Melon with Pineapple" }, description: { ar: "شمام وأناناس.", en: "Melon with pineapple." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1500 }, calories: 120, carbs: 28, image: green, color: "lime", rating: 4.6, inStock: true, tags: [] },
  { id: "j177", categoryId: "juices", name: { ar: "مكسرات", en: "Nuts Shake" }, description: { ar: "مكسرات مشكلة.", en: "Assorted nuts shake." }, basePrice: 800, sizePrice: { S: 800, L: 1200, BOX: 2000 }, calories: 380, carbs: 20, image: mango, color: "mango", rating: 4.8, inStock: true, tags: [] },
  { id: "j181", categoryId: "juices", name: { ar: "بطيخ", en: "Watermelon" }, description: { ar: "بطيخ طازج.", en: "Fresh watermelon juice." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 3500 }, calories: 90, carbs: 22, image: watermelon, color: "berry", rating: 4.7, inStock: true, tags: [] },
  { id: "j182", categoryId: "juices", name: { ar: "تفاح مع أناناس", en: "Apple with Pineapple" }, description: { ar: "تفاح وأناناس.", en: "Apple with pineapple." }, basePrice: 600, sizePrice: { S: 600, L: 700, BOX: 1200 }, calories: 130, carbs: 32, image: green, color: "lime", rating: 4.6, inStock: true, tags: [] },
  { id: "j188", categoryId: "juices", name: { ar: "بنجر جزر برتقال", en: "Beetroot Carrot Orange" }, description: { ar: "بنجر وجزر وبرتقال.", en: "Beetroot, carrot and orange." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1500 }, calories: 110, carbs: 26, image: berry, color: "berry", rating: 4.7, inStock: true, tags: [{ ar: "صحي", en: "Healthy" }] },
  { id: "j189", categoryId: "juices", name: { ar: "برتقال مع التفاح", en: "Orange with Apple" }, description: { ar: "برتقال وتفاح.", en: "Orange with apple." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1500 }, calories: 120, carbs: 28, image: orange, color: "mango", rating: 4.7, inStock: true, tags: [] },
  { id: "j190", categoryId: "juices", name: { ar: "كيوي ليم نعناع", en: "Kiwi Lime Mint" }, description: { ar: "كيوي وليم ونعناع.", en: "Kiwi, lime and mint." }, basePrice: 500, sizePrice: { S: 500, L: 750, BOX: 1500 }, calories: 120, carbs: 28, image: green, color: "lime", rating: 4.8, inStock: true, tags: [] },
  { id: "j194", categoryId: "juices", name: { ar: "عصير زنجبيل", en: "Ginger Juice" }, description: { ar: "زنجبيل طازج.", en: "Fresh ginger juice." }, basePrice: 400, sizePrice: { S: 400, L: 600, BOX: 1500 }, calories: 70, carbs: 16, image: lemon, color: "lime", rating: 4.6, inStock: true, tags: [{ ar: "صحي", en: "Healthy" }] },
  { id: "j197", categoryId: "juices", name: { ar: "أفوكادو فراولة كيوي", en: "Avocado Strawberry Kiwi" }, description: { ar: "أفوكادو وفراولة وكيوي.", en: "Avocado, strawberry and kiwi." }, basePrice: 800, sizePrice: { S: 800, L: 1200, BOX: 2000 }, calories: 290, carbs: 30, image: avocado, color: "lime", rating: 4.9, inStock: true, tags: [] },
  { id: "j199", categoryId: "juices", name: { ar: "أفوكادو مع مانجو", en: "Avocado with Mango" }, description: { ar: "أفوكادو ومانجو.", en: "Avocado with mango." }, basePrice: 1000, sizePrice: { S: 1000, L: 1500, BOX: 3000 }, calories: 350, carbs: 38, image: avocado, color: "lime", rating: 4.9, inStock: true, tags: [] },
  { id: "j201", categoryId: "juices", name: { ar: "كيوي مع أكترين دبل", en: "Kiwi Nectarine Double" }, description: { ar: "كيوي وأكترين.", en: "Kiwi and nectarine." }, basePrice: 800, sizePrice: { S: 800, L: 1000, BOX: 2000 }, calories: 200, carbs: 38, image: green, color: "lime", rating: 4.7, inStock: true, tags: [] },
  { id: "j202", categoryId: "juices", name: { ar: "أفوكادو مع الفواكه", en: "Avocado with Fruits" }, description: { ar: "أفوكادو مع فواكه مشكلة.", en: "Avocado with mixed fruits." }, basePrice: 800, sizePrice: { S: 800, L: 1200, BOX: 2400 }, calories: 310, carbs: 35, image: avocado, color: "lime", rating: 4.8, inStock: true, tags: [] },
  { id: "j203", categoryId: "juices", name: { ar: "عصير زنجبيل دبل", en: "Double Ginger Juice" }, description: { ar: "زنجبيل دبل.", en: "Double ginger juice." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1000 }, calories: 90, carbs: 18, image: lemon, color: "lime", rating: 4.7, inStock: true, tags: [] },
  { id: "j204", categoryId: "juices", name: { ar: "أفوكادو مع الموز دبل", en: "Double Avocado Banana" }, description: { ar: "أفوكادو وموز دبل.", en: "Double avocado and banana." }, basePrice: 800, sizePrice: { S: 800, L: 1200, BOX: 2000 }, calories: 350, carbs: 42, image: avocado, color: "lime", rating: 4.8, inStock: true, tags: [] },
  { id: "j704", categoryId: "juices", name: { ar: "فراولة مع أناناس", en: "Strawberry with Pineapple" }, description: { ar: "فراولة وأناناس.", en: "Strawberry with pineapple." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1500 }, calories: 150, carbs: 34, image: strawberry, color: "berry", rating: 4.7, inStock: true, tags: [] },
  { id: "j715", categoryId: "juices", name: { ar: "مانجو بالحليب", en: "Mango Milk" }, description: { ar: "مانجو مع حليب.", en: "Mango with milk." }, basePrice: 600, sizePrice: { S: 600, L: 800, BOX: 1800 }, calories: 230, carbs: 40, image: mango, color: "mango", rating: 4.8, inStock: true, tags: [] },
  { id: "j719", categoryId: "juices", name: { ar: "عنبرود مع أناناس", en: "Pear with Pineapple" }, description: { ar: "عنبرود وأناناس.", en: "Pear with pineapple." }, basePrice: 600, sizePrice: { S: 600, L: 601, BOX: 1500 }, calories: 140, carbs: 33, image: green, color: "lime", rating: 4.7, inStock: true, tags: [] },
  { id: "j722", categoryId: "juices", name: { ar: "ليم مع الزنجبيل", en: "Lime with Ginger" }, description: { ar: "ليم وزنجبيل.", en: "Lime with ginger." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1000 }, calories: 80, carbs: 18, image: lemon, color: "lime", rating: 4.7, inStock: true, tags: [] },
  { id: "j724", categoryId: "juices", name: { ar: "شمام مع المانجو", en: "Melon with Mango" }, description: { ar: "شمام ومانجو.", en: "Melon with mango." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1500 }, calories: 130, carbs: 30, image: green, color: "lime", rating: 4.7, inStock: true, tags: [] },
  { id: "j727", categoryId: "juices", name: { ar: "شمام مع الفراولة", en: "Melon with Strawberry" }, description: { ar: "شمام وفراولة.", en: "Melon with strawberry." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1500 }, calories: 130, carbs: 30, image: green, color: "lime", rating: 4.7, inStock: true, tags: [] },
  { id: "j741", categoryId: "juices", name: { ar: "أفوكادو مع كاكا", en: "Avocado with Persimmon" }, description: { ar: "أفوكادو وكاكا.", en: "Avocado with persimmon." }, basePrice: 1000, sizePrice: { S: 1000, L: 1500, BOX: 3000 }, calories: 340, carbs: 30, image: avocado, color: "lime", rating: 4.8, inStock: true, tags: [] },
  { id: "j748", categoryId: "juices", name: { ar: "شمام مع تفاح", en: "Melon with Apple" }, description: { ar: "شمام وتفاح.", en: "Melon with apple." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1500 }, calories: 120, carbs: 28, image: green, color: "lime", rating: 4.6, inStock: true, tags: [] },
  { id: "j755", categoryId: "juices", name: { ar: "كاكا مع مانجو", en: "Persimmon with Mango" }, description: { ar: "كاكا ومانجو.", en: "Persimmon with mango." }, basePrice: 1000, sizePrice: { S: 1000, L: 1000, BOX: 2000 }, calories: 250, carbs: 55, image: orange, color: "mango", rating: 4.8, inStock: true, tags: [] },
  { id: "j759", categoryId: "juices", name: { ar: "عنب مع فراولة", en: "Grapes with Strawberry" }, description: { ar: "عنب وفراولة.", en: "Grapes with strawberry." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1400 }, calories: 130, carbs: 30, image: berry, color: "berry", rating: 4.7, inStock: true, tags: [] },
  { id: "j764", categoryId: "juices", name: { ar: "عوار قلب", en: "Heart Soother" }, description: { ar: "خلطة خاصة لصحة القلب.", en: "Special heart-healthy blend." }, basePrice: 800, sizePrice: { S: 800, L: 1200, BOX: 2400 }, calories: 180, carbs: 35, image: berry, color: "berry", rating: 4.9, inStock: true, tags: [{ ar: "صحي", en: "Healthy" }] },
  { id: "j774", categoryId: "juices", name: { ar: "عصير اصفهاني", en: "Isfahani Juice" }, description: { ar: "خلطة اصفهاني المميزة.", en: "Special Isfahani blend." }, basePrice: 800, sizePrice: { S: 800, L: 1200, BOX: 2400 }, calories: 200, carbs: 40, image: orange, color: "mango", rating: 4.8, inStock: true, tags: [] },
  { id: "j777", categoryId: "juices", name: { ar: "ليلة خميس", en: "Thursday Night" }, description: { ar: "خلطة ليلة الخميس الخاصة.", en: "Special Thursday Night blend." }, basePrice: 1000, sizePrice: { S: 1000, L: 1500, BOX: 3000 }, calories: 280, carbs: 48, image: berry, color: "berry", rating: 4.9, inStock: true, tags: [] },
  { id: "j780", categoryId: "juices", name: { ar: "عصير مغربي", en: "Moroccan Juice" }, description: { ar: "خلطة مغربية مميزة.", en: "Special Moroccan blend." }, basePrice: 1000, sizePrice: { S: 1000, L: 1500, BOX: 3000 }, calories: 250, carbs: 45, image: orange, color: "mango", rating: 4.8, inStock: true, tags: [] },
  { id: "j783", categoryId: "juices", name: { ar: "عصير البلح", en: "Date Juice" }, description: { ar: "عصير بلح طازج.", en: "Fresh date juice." }, basePrice: 500, sizePrice: { S: 500, L: 700, BOX: 1500 }, calories: 220, carbs: 52, image: mango, color: "mango", rating: 4.8, inStock: true, tags: [] },

  // ── سندوتشات ──
  { id: "sw501", categoryId: "sandwiches", name: { ar: "بيض صافي", en: "Plain Egg" }, description: { ar: "بيض مقلي سادة.", en: "Plain fried egg." }, basePrice: 200, calories: 180, carbs: 10, image: sandwichEgg, color: "mango", rating: 4.5, inStock: true, tags: [] },
  { id: "sw502", categoryId: "sandwiches", name: { ar: "بيض مع أبو ولد", en: "Egg with Processed Cheese" }, description: { ar: "بيض مع جبن مثلثات.", en: "Egg with processed cheese." }, basePrice: 250, calories: 220, carbs: 12, image: sandwichEgg, color: "mango", rating: 4.5, inStock: true, tags: [] },
  { id: "sw504", categoryId: "sandwiches", name: { ar: "بيض مع المالح", en: "Egg with Salty Cheese" }, description: { ar: "بيض مع جبن مالح.", en: "Egg with salty cheese." }, basePrice: 250, calories: 210, carbs: 11, image: sandwichEgg, color: "mango", rating: 4.5, inStock: true, tags: [] },
  { id: "sw505", categoryId: "sandwiches", name: { ar: "بيض مع كرافت", en: "Egg with Kraft" }, description: { ar: "بيض مع جبن كرافت.", en: "Egg with Kraft cheese." }, basePrice: 400, calories: 260, carbs: 12, image: sandwichEgg, color: "mango", rating: 4.6, inStock: true, tags: [] },
  { id: "sw507", categoryId: "sandwiches", name: { ar: "بيض مع مايونيز", en: "Egg with Mayo" }, description: { ar: "بيض مع مايونيز.", en: "Egg with mayonnaise." }, basePrice: 250, calories: 230, carbs: 10, image: sandwichEgg, color: "mango", rating: 4.5, inStock: true, tags: [] },
  { id: "sw511", categoryId: "sandwiches", name: { ar: "بيض دبل", en: "Double Egg" }, description: { ar: "بيض مضاعف.", en: "Double fried egg." }, basePrice: 300, calories: 310, carbs: 12, image: sandwichEgg, color: "mango", rating: 4.5, inStock: true, tags: [] },
  { id: "sw513", categoryId: "sandwiches", name: { ar: "أبو ولد صافي", en: "Processed Cheese" }, description: { ar: "جبن مثلثات فقط.", en: "Plain processed cheese." }, basePrice: 150, calories: 150, carbs: 10, image: sandwichEgg, color: "mango", rating: 4.4, inStock: true, tags: [] },
  { id: "sw524", categoryId: "sandwiches", name: { ar: "حالوي مع السائل", en: "Halawi with Liquid Cheese" }, description: { ar: "جبن حالوي مع جبن سائل.", en: "Halawi cheese with liquid cheese." }, basePrice: 250, calories: 200, carbs: 11, image: sandwichEgg, color: "mango", rating: 4.5, inStock: true, tags: [] },
  { id: "sw525", categoryId: "sandwiches", name: { ar: "جبن وحالوي", en: "Cheese and Halawi" }, description: { ar: "جبن مع حالوي.", en: "Cheese with Halawi." }, basePrice: 150, calories: 160, carbs: 10, image: sandwichEgg, color: "mango", rating: 4.4, inStock: true, tags: [] },
  { id: "sw527", categoryId: "sandwiches", name: { ar: "جبن مالح", en: "Salty Cheese" }, description: { ar: "جبن مالح.", en: "Salty cheese sandwich." }, basePrice: 150, calories: 150, carbs: 10, image: sandwichEgg, color: "mango", rating: 4.4, inStock: true, tags: [] },
  { id: "sw528", categoryId: "sandwiches", name: { ar: "كرافت صافي", en: "Plain Kraft" }, description: { ar: "جبن كرافت.", en: "Plain Kraft cheese." }, basePrice: 250, calories: 190, carbs: 10, image: sandwichClub, color: "mango", rating: 4.5, inStock: true, tags: [] },
  { id: "sw529", categoryId: "sandwiches", name: { ar: "كرافت دبل", en: "Double Kraft" }, description: { ar: "كرافت مضاعف.", en: "Double Kraft cheese." }, basePrice: 350, calories: 280, carbs: 11, image: sandwichClub, color: "mango", rating: 4.6, inStock: true, tags: [] },
  { id: "sw534", categoryId: "sandwiches", name: { ar: "كرافت مع بيض وأبو ولد", en: "Kraft with Egg and Cheese" }, description: { ar: "كرافت مع بيض وجبن مثلثات.", en: "Kraft with egg and processed cheese." }, basePrice: 450, calories: 340, carbs: 13, image: sandwichClub, color: "mango", rating: 4.7, inStock: true, tags: [] },
  { id: "sw539", categoryId: "sandwiches", name: { ar: "كرافت مع مقلي", en: "Kraft with Fried" }, description: { ar: "كرافت مع مقلي.", en: "Kraft with fried." }, basePrice: 400, calories: 320, carbs: 12, image: sandwichClub, color: "mango", rating: 4.6, inStock: true, tags: [] },
  { id: "sw543", categoryId: "sandwiches", name: { ar: "مقلي صافي", en: "Plain Fried" }, description: { ar: "مقلي سادة.", en: "Plain fried." }, basePrice: 200, calories: 210, carbs: 11, image: sandwichFalafel, color: "lime", rating: 4.4, inStock: true, tags: [] },
  { id: "sw544", categoryId: "sandwiches", name: { ar: "مقلي دبل", en: "Double Fried" }, description: { ar: "مقلي مضاعف.", en: "Double fried." }, basePrice: 300, calories: 310, carbs: 12, image: sandwichFalafel, color: "lime", rating: 4.5, inStock: true, tags: [] },
  { id: "sw551", categoryId: "sandwiches", name: { ar: "سائل صافي", en: "Liquid Cheese" }, description: { ar: "جبن سائل.", en: "Liquid cheese sandwich." }, basePrice: 200, calories: 190, carbs: 10, image: sandwichEgg, color: "mango", rating: 4.4, inStock: true, tags: [] },
  { id: "sw557", categoryId: "sandwiches", name: { ar: "مشكل أجبان", en: "Mixed Cheeses" }, description: { ar: "تشكيلة من الأجبان.", en: "Assorted cheese mix." }, basePrice: 400, calories: 280, carbs: 11, image: sandwichClub, color: "mango", rating: 4.7, inStock: true, tags: [] },
  { id: "sw559", categoryId: "sandwiches", name: { ar: "سندوتش مجنونة", en: "Crazy Sandwich" }, description: { ar: "سندوتش مجنونة الشهير.", en: "The famous crazy sandwich." }, basePrice: 400, calories: 350, carbs: 14, image: sandwichClub, color: "mango", rating: 4.8, inStock: true, tags: [] },
  { id: "sw563", categoryId: "sandwiches", name: { ar: "سندوتش مجنونة دبل", en: "Double Crazy Sandwich" }, description: { ar: "مجنونة دبل.", en: "Double crazy sandwich." }, basePrice: 800, calories: 600, carbs: 25, image: sandwichClub, color: "mango", rating: 4.8, inStock: true, tags: [] },
  { id: "sw564", categoryId: "sandwiches", name: { ar: "سندوتش الأمير", en: "Prince Sandwich" }, description: { ar: "سندوتش الأمير الخاص.", en: "The Prince's special sandwich." }, basePrice: 500, calories: 420, carbs: 16, image: sandwichGrilled, color: "mango", rating: 4.9, inStock: true, tags: [{ ar: "توقيع الأمير", en: "Signature" }] },
  { id: "sw565", categoryId: "sandwiches", name: { ar: "سندوتش الأمير 2", en: "Prince Sandwich 2" }, description: { ar: "سندوتش الأمير الثاني.", en: "Prince sandwich 2." }, basePrice: 600, calories: 480, carbs: 18, image: sandwichGrilled, color: "mango", rating: 4.9, inStock: true, tags: [{ ar: "توقيع الأمير", en: "Signature" }] },
  { id: "sw566", categoryId: "sandwiches", name: { ar: "نفر مجنونة", en: "Family Crazy" }, description: { ar: "حجم نفر من المجنونة.", en: "Family-size crazy sandwich." }, basePrice: 1000, calories: 900, carbs: 38, image: sandwichClub, color: "mango", rating: 4.8, inStock: true, tags: [] },
  { id: "sw567", categoryId: "sandwiches", name: { ar: "نص نفر مجنونة", en: "Half Family Crazy" }, description: { ar: "نص نفر مجنونة.", en: "Half family crazy sandwich." }, basePrice: 600, calories: 500, carbs: 20, image: sandwichClub, color: "mango", rating: 4.7, inStock: true, tags: [] },
  { id: "sw569", categoryId: "sandwiches", name: { ar: "نفر مقلي", en: "Family Fried" }, description: { ar: "حجم نفر مقلي.", en: "Family-size fried sandwich." }, basePrice: 400, calories: 450, carbs: 18, image: sandwichFalafel, color: "lime", rating: 4.6, inStock: true, tags: [] },
  { id: "sw574", categoryId: "sandwiches", name: { ar: "نفر مقلي مع الأجبان", en: "Family Fried with Cheeses" }, description: { ar: "نفر مقلي مع مشكل أجبان.", en: "Family fried with mixed cheeses." }, basePrice: 1200, calories: 980, carbs: 40, image: sandwichClub, color: "mango", rating: 4.9, inStock: true, tags: [] },
  { id: "sw584", categoryId: "sandwiches", name: { ar: "فول سوداني", en: "Peanut Butter" }, description: { ar: "فول سوداني.", en: "Peanut butter sandwich." }, basePrice: 250, calories: 280, carbs: 12, image: sandwichEgg, color: "mango", rating: 4.5, inStock: true, tags: [] },
  { id: "sw593", categoryId: "sandwiches", name: { ar: "نوتالا", en: "Nutella" }, description: { ar: "نوتالا.", en: "Nutella sandwich." }, basePrice: 300, calories: 320, carbs: 38, image: sandwichEgg, color: "mango", rating: 4.7, inStock: true, tags: [] },
  { id: "sw595", categoryId: "sandwiches", name: { ar: "سندوتش الطيبات", en: "Taibat Sandwich" }, description: { ar: "سندوتش الطيبات.", en: "Taibat sandwich." }, basePrice: 500, calories: 420, carbs: 16, image: sandwichGrilled, color: "mango", rating: 4.8, inStock: true, tags: [] },

  // ── مشروبات ساخنة ──
  { id: "hd447", categoryId: "hot_drinks", name: { ar: "شاي أحمر", en: "Red Tea" }, description: { ar: "شاي أحمر.", en: "Red tea." }, basePrice: 200, calories: 10, carbs: 2, image: lemon, color: "mango", rating: 4.6, inStock: true, tags: [] },
  { id: "hd407", categoryId: "hot_drinks", name: { ar: "شاهي بالحليب", en: "Milk Tea" }, description: { ar: "شاهي بالحليب.", en: "Milk tea." }, basePrice: 250, calories: 80, carbs: 10, image: lemon, color: "mango", rating: 4.7, inStock: true, tags: [] },
  { id: "hd410", categoryId: "hot_drinks", name: { ar: "شاهي بالحليب مفور", en: "Spiced Milk Tea" }, description: { ar: "شاهي مع بهارات.", en: "Spiced milk tea." }, basePrice: 300, calories: 90, carbs: 12, image: lemon, color: "mango", rating: 4.7, inStock: true, tags: [] },
  { id: "hd413", categoryId: "hot_drinks", name: { ar: "نسكافيه", en: "Nescafe" }, description: { ar: "نسكافيه.", en: "Nescafe." }, basePrice: 300, calories: 30, carbs: 5, image: carrot, color: "mango", rating: 4.5, inStock: true, tags: [] },
  { id: "hd416", categoryId: "hot_drinks", name: { ar: "نسكافيه بالحليب", en: "Nescafe with Milk" }, description: { ar: "نسكافيه مع حليب.", en: "Nescafe with milk." }, basePrice: 400, calories: 100, carbs: 12, image: carrot, color: "mango", rating: 4.6, inStock: true, tags: [] },
  { id: "hd448", categoryId: "hot_drinks", name: { ar: "بن صافي", en: "Black Coffee" }, description: { ar: "بن صافي.", en: "Black coffee." }, basePrice: 200, calories: 15, carbs: 3, image: carrot, color: "mango", rating: 4.6, inStock: true, tags: [] },
  { id: "hd449", categoryId: "hot_drinks", name: { ar: "بن بالحليب", en: "Coffee with Milk" }, description: { ar: "بن مع حليب.", en: "Coffee with milk." }, basePrice: 250, calories: 80, carbs: 10, image: carrot, color: "mango", rating: 4.7, inStock: true, tags: [] },
  { id: "hd436", categoryId: "hot_drinks", name: { ar: "بن بالزنجبيل", en: "Ginger Coffee" }, description: { ar: "بن مع زنجبيل.", en: "Coffee with ginger." }, basePrice: 250, calories: 20, carbs: 4, image: carrot, color: "mango", rating: 4.7, inStock: true, tags: [] },
  { id: "hd445", categoryId: "hot_drinks", name: { ar: "بن بالحليب مفور", en: "Spiced Coffee Latte" }, description: { ar: "بن مع حليب وبهارات.", en: "Spiced coffee with milk." }, basePrice: 300, calories: 100, carbs: 12, image: carrot, color: "mango", rating: 4.8, inStock: true, tags: [] },
  { id: "hd450", categoryId: "hot_drinks", name: { ar: "زنجبيل صافي", en: "Ginger Tea" }, description: { ar: "زنجبيل.", en: "Plain ginger tea." }, basePrice: 200, calories: 15, carbs: 4, image: lemon, color: "lime", rating: 4.6, inStock: true, tags: [{ ar: "صحي", en: "Healthy" }] },
  { id: "hd451", categoryId: "hot_drinks", name: { ar: "زنجبيل بالحليب", en: "Ginger with Milk" }, description: { ar: "زنجبيل مع حليب.", en: "Ginger with milk." }, basePrice: 250, calories: 80, carbs: 10, image: lemon, color: "lime", rating: 4.7, inStock: true, tags: [] },
  { id: "hd453", categoryId: "hot_drinks", name: { ar: "شاي ليبتون", en: "Lipton Tea" }, description: { ar: "شاي ليبتون.", en: "Lipton tea." }, basePrice: 200, calories: 10, carbs: 2, image: lemon, color: "lime", rating: 4.5, inStock: true, tags: [] },
  { id: "hd459", categoryId: "hot_drinks", name: { ar: "شاهي ليبتون بالحليب", en: "Lipton Milk Tea" }, description: { ar: "شاي ليبتون مع حليب.", en: "Lipton tea with milk." }, basePrice: 250, calories: 80, carbs: 10, image: lemon, color: "lime", rating: 4.6, inStock: true, tags: [] },
  { id: "hd466", categoryId: "hot_drinks", name: { ar: "شاي أخضر", en: "Green Tea" }, description: { ar: "شاي أخضر.", en: "Green tea." }, basePrice: 200, calories: 10, carbs: 2, image: green, color: "lime", rating: 4.7, inStock: true, tags: [{ ar: "صحي", en: "Healthy" }] },

  // ── فواكه بالحبة ──
  { id: "fr183", categoryId: "fruits", name: { ar: "تفاح أحمر", en: "Red Apple" }, description: { ar: "حبة تفاح أحمر.", en: "Red apple by piece." }, basePrice: 500, calories: 80, carbs: 20, image: green, color: "berry", rating: 4.6, inStock: true, tags: [] },
  { id: "fr184", categoryId: "fruits", name: { ar: "أفوكادو", en: "Avocado" }, description: { ar: "حبة أفوكادو.", en: "Avocado by piece." }, basePrice: 900, calories: 240, carbs: 13, image: avocado, color: "lime", rating: 4.7, inStock: true, tags: [] },
  { id: "fr185", categoryId: "fruits", name: { ar: "برتقال", en: "Orange" }, description: { ar: "حبة برتقال.", en: "Orange by piece." }, basePrice: 300, calories: 62, carbs: 15, image: orange, color: "mango", rating: 4.6, inStock: true, tags: [] },
  { id: "fr191", categoryId: "fruits", name: { ar: "جوز الهند صغير", en: "Small Coconut" }, description: { ar: "جوز الهند صغير.", en: "Small coconut." }, basePrice: 600, calories: 160, carbs: 15, image: green, color: "lime", rating: 4.7, inStock: true, tags: [] },
  { id: "fr192", categoryId: "fruits", name: { ar: "جوز الهند كبير", en: "Large Coconut" }, description: { ar: "جوز الهند كبير.", en: "Large coconut." }, basePrice: 1200, calories: 300, carbs: 28, image: green, color: "lime", rating: 4.7, inStock: true, tags: [] },
  { id: "fr198", categoryId: "fruits", name: { ar: "أناناس", en: "Pineapple" }, description: { ar: "حبة أناناس.", en: "Pineapple by piece." }, basePrice: 3500, calories: 450, carbs: 110, image: green, color: "lime", rating: 4.8, inStock: true, tags: [] },
  { id: "fr200", categoryId: "fruits", name: { ar: "مانجو", en: "Mango" }, description: { ar: "حبة مانجو.", en: "Mango by piece." }, basePrice: 300, calories: 135, carbs: 35, image: mango, color: "mango", rating: 4.8, inStock: true, tags: [] },
  { id: "fr283", categoryId: "fruits", name: { ar: "تفاح أخضر", en: "Green Apple" }, description: { ar: "حبة تفاح أخضر.", en: "Green apple by piece." }, basePrice: 600, calories: 80, carbs: 20, image: green, color: "lime", rating: 4.6, inStock: true, tags: [] },
  { id: "fr284", categoryId: "fruits", name: { ar: "كاكا", en: "Persimmon" }, description: { ar: "حبة كاكا.", en: "Persimmon by piece." }, basePrice: 800, calories: 120, carbs: 30, image: orange, color: "mango", rating: 4.6, inStock: true, tags: [] },
  { id: "fr285", categoryId: "fruits", name: { ar: "كيوي", en: "Kiwi" }, description: { ar: "حبة كيوي.", en: "Kiwi by piece." }, basePrice: 400, calories: 42, carbs: 10, image: green, color: "lime", rating: 4.7, inStock: true, tags: [] },
  { id: "fr383", categoryId: "fruits", name: { ar: "تفاح أبيض", en: "White Apple" }, description: { ar: "حبة تفاح أبيض.", en: "White apple by piece." }, basePrice: 500, calories: 80, carbs: 20, image: green, color: "lime", rating: 4.5, inStock: true, tags: [] },
  { id: "fr384", categoryId: "fruits", name: { ar: "عنبرود", en: "Pear" }, description: { ar: "حبة عنبرود.", en: "Pear by piece." }, basePrice: 300, calories: 57, carbs: 14, image: green, color: "lime", rating: 4.6, inStock: true, tags: [] },
  { id: "fr385", categoryId: "fruits", name: { ar: "تفاح سكري", en: "Sweet Apple" }, description: { ar: "حبة تفاح سكري.", en: "Sweet apple by piece." }, basePrice: 500, calories: 80, carbs: 20, image: green, color: "lime", rating: 4.7, inStock: true, tags: [] },
  { id: "fr766", categoryId: "fruits", name: { ar: "موز", en: "Banana" }, description: { ar: "حبة موز.", en: "Banana by piece." }, basePrice: 50, calories: 89, carbs: 23, image: mango, color: "mango", rating: 4.5, inStock: true, tags: [] },
  { id: "fr767", categoryId: "fruits", name: { ar: "ليم", en: "Lime" }, description: { ar: "حبة ليم.", en: "Lime by piece." }, basePrice: 50, calories: 20, carbs: 7, image: lemon, color: "lime", rating: 4.5, inStock: true, tags: [] },
  { id: "fr776", categoryId: "fruits", name: { ar: "جوافة", en: "Guava" }, description: { ar: "حبة جوافة.", en: "Guava by piece." }, basePrice: 200, calories: 68, carbs: 14, image: green, color: "lime", rating: 4.6, inStock: true, tags: [] },
  { id: "fr810", categoryId: "fruits", name: { ar: "دراجون فروت", en: "Dragon Fruit" }, description: { ar: "حبة دراجون فروت.", en: "Dragon fruit by piece." }, basePrice: 1300, calories: 60, carbs: 13, image: berry, color: "berry", rating: 4.8, inStock: true, tags: [] },

  // ── فواكه بالكيلو ──
  { id: "fk901", categoryId: "fruits", name: { ar: "مانجو طبيعي", en: "Natural Mango" }, description: { ar: "مانجو طبيعي — بالكيلو.", en: "Natural mango by kilo." }, basePrice: 2000, kgPrice: 2000, calories: 135, carbs: 35, image: mango, color: "mango", rating: 4.9, inStock: true, tags: [] },
  { id: "fk902", categoryId: "fruits", name: { ar: "برتقال مغربي", en: "Moroccan Orange" }, description: { ar: "برتقال مغربي — بالكيلو.", en: "Moroccan orange by kilo." }, basePrice: 2000, kgPrice: 2000, calories: 62, carbs: 15, image: orange, color: "mango", rating: 4.7, inStock: true, tags: [] },
  { id: "fk903", categoryId: "fruits", name: { ar: "جوافة بالكيلو", en: "Guava (Kilo)" }, description: { ar: "جوافة — بالكيلو.", en: "Guava by kilo." }, basePrice: 800, kgPrice: 800, calories: 68, carbs: 14, image: green, color: "lime", rating: 4.6, inStock: true, tags: [] },
  { id: "fk904", categoryId: "fruits", name: { ar: "موز بالكيلو", en: "Banana (Kilo)" }, description: { ar: "موز — بالكيلو.", en: "Banana by kilo." }, basePrice: 400, kgPrice: 400, calories: 89, carbs: 23, image: mango, color: "mango", rating: 4.7, inStock: true, tags: [] },
  { id: "fk905", categoryId: "fruits", name: { ar: "فراولة", en: "Strawberry" }, description: { ar: "فراولة — بالكيلو.", en: "Strawberry by kilo." }, basePrice: 1000, kgPrice: 1000, calories: 49, carbs: 12, image: strawberry, color: "berry", rating: 4.8, inStock: true, tags: [] },
  { id: "fk906", categoryId: "fruits", name: { ar: "أفوكادو بالكيلو", en: "Avocado (Kilo)" }, description: { ar: "أفوكادو — بالكيلو.", en: "Avocado by kilo." }, basePrice: 5000, kgPrice: 5000, calories: 240, carbs: 13, image: avocado, color: "lime", rating: 4.8, inStock: true, tags: [] },
  { id: "fk907", categoryId: "fruits", name: { ar: "عنبرود بالكيلو", en: "Pear (Kilo)" }, description: { ar: "عنبرود — بالكيلو.", en: "Pear by kilo." }, basePrice: 2500, kgPrice: 2500, calories: 57, carbs: 14, image: green, color: "lime", rating: 4.6, inStock: true, tags: [] },
  { id: "fk908", categoryId: "fruits", name: { ar: "عنب أسود", en: "Black Grapes" }, description: { ar: "عنب أسود — بالكيلو.", en: "Black grapes by kilo." }, basePrice: 1000, kgPrice: 1000, calories: 69, carbs: 17, image: berry, color: "berry", rating: 4.7, inStock: true, tags: [] },
  { id: "fk909", categoryId: "fruits", name: { ar: "عنب أبيض رازق", en: "White Razik Grapes" }, description: { ar: "عنب أبيض — بالكيلو.", en: "White grapes by kilo." }, basePrice: 1500, kgPrice: 1500, calories: 69, carbs: 17, image: berry, color: "berry", rating: 4.7, inStock: true, tags: [] },
  { id: "fk910", categoryId: "fruits", name: { ar: "عنب عاصمي", en: "Asami Grapes" }, description: { ar: "عنب عاصمي — بالكيلو.", en: "Asami grapes by kilo." }, basePrice: 1000, kgPrice: 1000, calories: 69, carbs: 17, image: berry, color: "berry", rating: 4.7, inStock: true, tags: [] },
  { id: "fk911", categoryId: "fruits", name: { ar: "تفاح يمني", en: "Yemeni Apple" }, description: { ar: "تفاح يمني — بالكيلو.", en: "Yemeni apple by kilo." }, basePrice: 1000, kgPrice: 1000, calories: 80, carbs: 20, image: green, color: "lime", rating: 4.8, inStock: true, tags: [] },
  { id: "fk912", categoryId: "fruits", name: { ar: "تفاح أحمر بالكيلو", en: "Red Apple (Kilo)" }, description: { ar: "تفاح أحمر — بالكيلو.", en: "Red apple by kilo." }, basePrice: 700, kgPrice: 700, calories: 80, carbs: 20, image: green, color: "berry", rating: 4.6, inStock: true, tags: [] },
  { id: "fk914", categoryId: "fruits", name: { ar: "تفاح سكري بالكيلو", en: "Sweet Apple (Kilo)" }, description: { ar: "تفاح سكري — بالكيلو.", en: "Sweet apple by kilo." }, basePrice: 4500, kgPrice: 4500, calories: 80, carbs: 20, image: green, color: "lime", rating: 4.8, inStock: true, tags: [] },
  { id: "fk915", categoryId: "fruits", name: { ar: "كيوي بالكيلو", en: "Kiwi (Kilo)" }, description: { ar: "كيوي — بالكيلو.", en: "Kiwi by kilo." }, basePrice: 3000, kgPrice: 3000, calories: 42, carbs: 10, image: green, color: "lime", rating: 4.8, inStock: true, tags: [] },
  { id: "fk916", categoryId: "fruits", name: { ar: "شمام بالكيلو", en: "Honeydew Melon (Kilo)" }, description: { ar: "شمام — بالكيلو.", en: "Honeydew melon by kilo." }, basePrice: 500, kgPrice: 500, calories: 36, carbs: 9, image: green, color: "lime", rating: 4.5, inStock: true, tags: [] },
  { id: "fk917", categoryId: "fruits", name: { ar: "بطيخ بالكيلو", en: "Watermelon (Kilo)" }, description: { ar: "بطيخ — بالكيلو.", en: "Watermelon by kilo." }, basePrice: 1000, kgPrice: 1000, calories: 30, carbs: 8, image: watermelon, color: "berry", rating: 4.7, inStock: true, tags: [] },
  { id: "fk921", categoryId: "fruits", name: { ar: "رمان", en: "Pomegranate" }, description: { ar: "رمان — بالكيلو.", en: "Pomegranate by kilo." }, basePrice: 1300, kgPrice: 1300, calories: 83, carbs: 19, image: berry, color: "berry", rating: 4.8, inStock: true, tags: [] },
  { id: "fk924", categoryId: "fruits", name: { ar: "أناناس بالكيلو", en: "Pineapple (Kilo)" }, description: { ar: "أناناس — بالكيلو.", en: "Pineapple by kilo." }, basePrice: 3500, kgPrice: 3500, calories: 50, carbs: 13, image: green, color: "lime", rating: 4.8, inStock: true, tags: [] },
  { id: "fk925", categoryId: "fruits", name: { ar: "كرز", en: "Cherries" }, description: { ar: "كرز — بالكيلو.", en: "Cherries by kilo." }, basePrice: 8000, kgPrice: 8000, calories: 63, carbs: 16, image: berry, color: "berry", rating: 4.9, inStock: true, tags: [] },
  { id: "fk932", categoryId: "fruits", name: { ar: "مانجو قلب الثور", en: "Bull Heart Mango" }, description: { ar: "مانجو قلب الثور — بالكيلو.", en: "Bull heart mango by kilo." }, basePrice: 1000, kgPrice: 1000, calories: 135, carbs: 35, image: mango, color: "mango", rating: 4.9, inStock: true, tags: [{ ar: "موسمي", en: "Seasonal" }] },
  { id: "fk757", categoryId: "fruits", name: { ar: "مانجو تيمور رقم 1", en: "Timor Mango #1" }, description: { ar: "مانجو تيمور الممتازة — بالكيلو.", en: "Premium Timor mango by kilo." }, basePrice: 1000, kgPrice: 1000, calories: 135, carbs: 35, image: mango, color: "mango", rating: 5.0, inStock: true, tags: [{ ar: "ممتاز", en: "Premium" }] },
];

const now = Date.now();
const minutesAgo = (m: number) => new Date(now - m * 60000).toISOString();

export const seedOrders: Order[] = [
  { id: "AJ-1042", customer: "سارة العمودي", phone: "+967 77 123 4567", items: [{ name: products[1].name, qty: 2, size: "L" }, { name: products[9].name, qty: 1, size: "S" }], total: 58, status: "new", createdAt: minutesAgo(3), eta: 32, payment: "apple", address: "خور مكسر، شارع الستين", riderId: undefined },
  { id: "AJ-1041", customer: "Ahmed Basha", phone: "+967 73 555 0102", items: [{ name: products[0].name, qty: 3, size: "S" }], total: 48, status: "new", createdAt: minutesAgo(6), eta: 30, payment: "cash", address: "المنصورة، حي الشعب" },
  { id: "AJ-1040", customer: "منى الحداد", phone: "+967 71 900 3311", items: [{ name: products[8].name, qty: 1, size: "BOX" }], total: 63, status: "preparing", createdAt: minutesAgo(11), eta: 22, payment: "card", address: "كريتر، السيلة" },
  { id: "AJ-1039", customer: "Omar Saleh", phone: "+967 77 220 9988", items: [{ name: products[3].name, qty: 2, size: "S" }, { name: products[7].name, qty: 1, size: "L" }], total: 48, status: "preparing", createdAt: minutesAgo(14), eta: 18, payment: "apple", address: "الشيخ عثمان، دار سعد" },
  { id: "AJ-1038", customer: "ريم بازرعة", phone: "+967 73 111 7777", items: [{ name: products[4].name, qty: 1, size: "L" }], total: 25, status: "picked", createdAt: minutesAgo(21), eta: 12, payment: "card", address: "خور مكسر، الكورنيش", riderId: "r2" },
  { id: "AJ-1037", customer: "Faisal M.", phone: "+967 77 654 3210", items: [{ name: products[5].name, qty: 4, size: "S" }], total: 60, status: "delivering", createdAt: minutesAgo(28), eta: 6, payment: "cash", address: "المعلا، شارع مدرم", riderId: "r1" },
  { id: "AJ-1036", customer: "هدى سالم", phone: "+967 71 444 5566", items: [{ name: products[2].name, qty: 2, size: "L" }], total: 44, status: "delivering", createdAt: minutesAgo(33), eta: 3, payment: "apple", address: "التواهي، ساحل أبين", riderId: "r3" },
  { id: "AJ-1035", customer: "Lina K.", phone: "+967 73 888 1212", items: [{ name: products[0].name, qty: 1, size: "S" }, { name: products[9].name, qty: 1, size: "S" }], total: 22, status: "completed", createdAt: minutesAgo(55), eta: 0, payment: "card", address: "خور مكسر" },
  { id: "AJ-1034", customer: "خالد باعباد", phone: "+967 77 333 4545", items: [{ name: products[1].name, qty: 1, size: "S" }], total: 20, status: "completed", createdAt: minutesAgo(70), eta: 0, payment: "cash", address: "كريتر" },
];

export const riders: Rider[] = [
  { id: "r1", name: "ياسر", x: 62, y: 38, status: "delivering", orders: 1 },
  { id: "r2", name: "Mazen", x: 28, y: 64, status: "delivering", orders: 1 },
  { id: "r3", name: "عبدالله", x: 76, y: 70, status: "delivering", orders: 1 },
  { id: "r4", name: "Sami", x: 45, y: 50, status: "idle", orders: 0 },
  { id: "r5", name: "حمزة", x: 18, y: 30, status: "returning", orders: 0 },
];

export const branches = [
  { id: "b1", name: { ar: "الفرع الرئيسي", en: "Main Branch" }, x: 50, y: 50, radius: 25, openOrders: 0 },
];

export const salesTrend = [
  { day: "Sat", ar: "السبت", revenue: 4200, orders: 168 },
  { day: "Sun", ar: "الأحد", revenue: 3900, orders: 152 },
  { day: "Mon", ar: "الاثنين", revenue: 4600, orders: 181 },
  { day: "Tue", ar: "الثلاثاء", revenue: 5100, orders: 203 },
  { day: "Wed", ar: "الأربعاء", revenue: 4800, orders: 190 },
  { day: "Thu", ar: "الخميس", revenue: 6300, orders: 244 },
  { day: "Fri", ar: "الجمعة", revenue: 7100, orders: 276 },
];

export const hourlyOrders = Array.from({ length: 12 }, (_, i) => ({
  hour: `${10 + i}:00`,
  orders: Math.round(12 + 18 * Math.sin((i / 11) * Math.PI) + (i % 3) * 3),
}));

export const categoryShare = [
  { id: "classic", value: 34 },
  { id: "signature", value: 26 },
  { id: "smoothie", value: 18 },
  { id: "detox", value: 14 },
  { id: "family", value: 8 },
];
