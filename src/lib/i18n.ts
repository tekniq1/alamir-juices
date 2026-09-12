export type Lang = "ar" | "en";

export type LocalizedString = { ar: string; en: string };

const dict = {
  brand: { ar: "عصائر الأمير", en: "Alamir Juices" },
  slogan: { ar: "استمتع بالمذاق الطبيعي", en: "Enjoy the Natural Taste" },
  nav_home: { ar: "الرئيسية", en: "Home" },
  nav_menu: { ar: "القائمة", en: "Menu" },
  nav_about: { ar: "من نحن", en: "About" },
  nav_track: { ar: "تتبع الطلب", en: "Track Order" },
  nav_admin: { ar: "لوحة التحكم", en: "Admin" },
  search: { ar: "ابحث عن عصير…", en: "Search a juice…" },
  wishlist: { ar: "المفضلة", en: "Wishlist" },
  cart: { ar: "السلة", en: "Cart" },
  order_now: { ar: "اطلب الآن", en: "Order Now" },
  explore_menu: { ar: "استكشف القائمة", en: "Explore Menu" },
  hero_kicker: { ar: "عصائر طبيعية 100% • تُعصر لحظة طلبك", en: "100% natural • pressed the moment you order" },
  hero_sub: {
    ar: "من المزرعة إلى كوبك خلال دقائق. مكونات مختارة بعناية، بدون سكر مضاف، وتوصيل مبرّد حتى بابك.",
    en: "Farm to cup in minutes. Hand-picked ingredients, no added sugar, delivered cold to your door.",
  },
  categories_title: { ar: "استكشف عالم الأمير", en: "Explore the Prince's World" },
  categories_sub: { ar: "خمس عائلات من النكهات، صُنعت لكل لحظة", en: "Five families of flavor, crafted for every moment" },
  featured_title: { ar: "الأكثر طلباً", en: "Most Loved" },
  featured_sub: { ar: "اختيارات ضيوفنا المفضلة هذا الأسبوع", en: "Our guests' favorite picks this week" },
  view_all: { ar: "عرض الكل", en: "View all" },
  customize: { ar: "إضافة", en: "Add" },
  add_to_cart: { ar: "أضف إلى السلة", en: "Add to cart" },
  size: { ar: "حجم الكوب", en: "Cup size" },
  sugar: { ar: "مستوى السكر", en: "Sugar level" },
  addons: { ar: "الإضافات", en: "Add-ons" },
  nutrition: { ar: "القيم الغذائية", en: "Nutrition" },
  calories: { ar: "سعرة", en: "kcal" },
  carbs: { ar: "كربوهيدرات", en: "carbs" },
  total: { ar: "الإجمالي", en: "Total" },
  sar: { ar: "ر.ي", en: "YER" },
  empty_cart: { ar: "سلتك فارغة… أضف شيئاً منعشاً!", en: "Your cart is empty… add something fresh!" },
  checkout: { ar: "إتمام الطلب", en: "Checkout" },
  subtotal: { ar: "المجموع الفرعي", en: "Subtotal" },
  delivery_fee: { ar: "رسوم التوصيل", en: "Delivery" },
  free: { ar: "مجاناً", en: "Free" },
  delivery_address: { ar: "عنوان التوصيل", en: "Delivery address" },
  pick_location: { ar: "اضغط على الخريطة لتحديد موقعك", en: "Tap the map to drop your pin" },
  delivery_time: { ar: "وقت التوصيل", en: "Delivery time" },
  instant: { ar: "فوري (٢٥–٣٥ دقيقة)", en: "Instant (25–35 min)" },
  scheduled: { ar: "مجدول", en: "Scheduled" },
  payment: { ar: "طريقة الدفع", en: "Payment" },
  apple_pay: { ar: "Apple Pay", en: "Apple Pay" },
  card: { ar: "بطاقة بنكية", en: "Card" },
  cash: { ar: "نقداً عند الاستلام", en: "Cash on delivery" },
  place_order: { ar: "تأكيد الطلب", en: "Place order" },
  order_placed: { ar: "تم استلام طلبك!", en: "Order received!" },
  order_placed_sub: { ar: "الأمير يعصر لك الآن. تابع طلبك برقم", en: "The Prince is pressing your juice. Track it with" },
  track_title: { ar: "تتبع طلبك", en: "Track your order" },
  track_placeholder: { ar: "أدخل رقم الطلب مثل AJ-1042", en: "Enter order number e.g. AJ-1042" },
  track_btn: { ar: "تتبع", en: "Track" },
  not_found: { ar: "لم نجد هذا الطلب", en: "We couldn't find that order" },
  about_title: { ar: "قصة الأمير", en: "The Prince's Story" },
  about_sub: {
    ar: "بدأنا من عربة صغيرة في عدن بحلم واحد: أن يتذوق كل بيت طعم الفاكهة الحقيقي.",
    en: "We started from a small cart in Aden with one dream: every home tasting real fruit.",
  },
  value_natural: { ar: "طبيعي 100%", en: "100% Natural" },
  value_natural_d: { ar: "لا مركزات ولا ألوان ولا سكر مضاف. فاكهة فقط.", en: "No concentrates, no colors, no added sugar. Just fruit." },
  value_speed: { ar: "من المزرعة إلى الكوب", en: "Farm-to-Cup Speed" },
  value_speed_d: { ar: "تصلنا الفاكهة يومياً وتُعصر لحظة طلبك.", en: "Fruit arrives daily and is pressed the moment you order." },
  value_cold: { ar: "سلسلة تبريد متكاملة", en: "Cold-Chain Delivery" },
  value_cold_d: { ar: "حقائب مبردة تحافظ على الطعم والفيتامينات حتى بابك.", en: "Insulated bags keep taste and vitamins intact to your door." },
  value_hygiene: { ar: "تحضير صحي", en: "Hygienic Preparation" },
  value_hygiene_d: { ar: "مطبخ مفتوح، معايير HACCP، وتعقيم كل ساعة.", en: "Open kitchen, HACCP standards, hourly sanitization." },
  footer_tag: { ar: "صُنع بحب في عدن", en: "Made with love in Aden" },
  in_stock: { ar: "متوفر", en: "In stock" },
  sold_out: { ar: "نفد", en: "Sold out" },
  name: { ar: "الاسم", en: "Name" },
  phone: { ar: "رقم الجوال", en: "Phone" },
  notes: { ar: "ملاحظات", en: "Notes" },
  qty: { ar: "الكمية", en: "Qty" },
  remove: { ar: "إزالة", en: "Remove" },
  all: { ar: "الكل", en: "All" },
  menu_title: { ar: "قائمة الأمير", en: "The Prince's Menu" },
  menu_sub: { ar: "اختر، خصّص، واستمتع", en: "Pick, customize, and enjoy" },
  admin_overview: { ar: "نظرة عامة", en: "Overview" },
  admin_orders: { ar: "لوحة الطلبات", en: "Order Board" },
  admin_menu: { ar: "إدارة القائمة", en: "Menu Manager" },
  admin_dispatch: { ar: "الفروع والتوصيل", en: "Dispatch" },
  back_to_store: { ar: "العودة للمتجر", en: "Back to store" },
  nav_offers: { ar: "العروض", en: "Offers" },
  nav_contact: { ar: "اتصل بنا", en: "Contact" },
  whatsapp_order: { ar: "اطلب عبر واتساب", en: "Order via WhatsApp" },
  whatsapp_inquire: { ar: "تواصل عبر واتساب", en: "Chat on WhatsApp" },
  offers_title: { ar: "عروض الأمير", en: "Prince's Offers" },
  offers_sub: { ar: "خصومات حصرية وعروض موسمية لا تُفوَّت", en: "Exclusive deals and seasonal offers you can't miss" },
  contact_title: { ar: "تواصل معنا", en: "Get in Touch" },
  contact_sub: { ar: "نحن هنا لخدمتك على مدار الساعة", en: "We're here for you around the clock" },
  track_enter: { ar: "أدخل رقم طلبك لمتابعة حالته", en: "Enter your order number to track its status" },
  offer_valid: { ar: "صالح حتى", en: "Valid until" },
  copy_code: { ar: "نسخ الكود", en: "Copy code" },
  copied: { ar: "تم النسخ!", en: "Copied!" },
  working_hours: { ar: "ساعات العمل", en: "Working Hours" },
  daily_hours: { ar: "يومياً من ٨ صباحاً حتى ١٢ منتصف الليل", en: "Daily 8:00 AM – 12:00 AM" },
  address_label: { ar: "العنوان", en: "Address" },
  address_value: { ar: "عدن، اليمن — فروع متعددة", en: "Aden, Yemen — Multiple Branches" },
} as const;

export type DictKey = keyof typeof dict;

export function t(key: DictKey, lang: Lang): string {
  return dict[key][lang];
}

export function L(value: LocalizedString, lang: Lang): string {
  return value[lang];
}

export function formatPrice(n: number, lang: Lang) {
  const num = new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-US", {
    maximumFractionDigits: 0,
  }).format(n);
  return lang === "ar" ? `${num} ر.ي` : `YER ${num}`;
}
