
$appTs = Get-Content "src\store\app.ts" -Raw -Encoding UTF8

$interfaces = @"
export type OfferData = { id: string, title: string, discount: string, status: string, emoji: string };
export type CategoryData = { id: string, nameAr: string, nameEn: string, emoji: string };
export type SiteContent = { heroTitleAr: string, heroTitleEn: string, heroDescAr: string, heroDescEn: string, aboutTitleAr: string, aboutTitleEn: string, aboutStoryAr: string, aboutStoryEn: string };
export type SiteSettings = { whatsapp: string, phone: string, mapsLink: string, workingHoursAr: string, workingHoursEn: string };
"@

$appTs = $appTs -replace "export type OfferData = \{.*?};", $interfaces

$stateTypes = @"
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
"@

$appTs = $appTs -replace "  offers: OfferData\[\];(?s).*?deleteOffer: \(id: string\) => void;", $stateTypes

$stateImpl = @"
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
"@

$appTs = $appTs -replace "      offers: \[(?s).*?deleteOffer: \(id\) => set\(\(s\) => \(\{ offers: s\.offers\.filter\(\(o\) => o\.id !== id\) \}\)\),", $stateImpl

$appTs = $appTs -replace "isAuthenticated: s\.isAuthenticated, offers: s\.offers \}", "isAuthenticated: s.isAuthenticated, offers: s.offers, categories: s.categories, siteContent: s.siteContent, siteSettings: s.siteSettings }"

Set-Content "src\store\app.ts" -Value $appTs -Encoding UTF8

