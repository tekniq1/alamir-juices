
$appTs = Get-Content "src\store\app.ts" -Raw

$appTs = $appTs -replace "interface AppState \{", "export type OfferData = { id: string, title: string, discount: string, status: string, emoji: string };`n`ninterface AppState {"

$appTs = $appTs -replace "  products: Product\[\];", "  products: Product[];`n  offers: OfferData[];`n  updateOffer: (id: string, patch: Partial<OfferData>) => void;`n  addOffer: (o: OfferData) => void;`n  deleteOffer: (id: string) => void;"

$appTs = $appTs -replace "offers: \[\], // Wait, I should import seedOffers or initial offers from mock", "offers: [{ id: ""o1"", title: ""??? ??????"", discount: ""20%"", status: ""active"", emoji: ""??"" }, { id: ""o2"", title: ""??? ?????? ???????"", discount: ""1+2"", status: ""ending_soon"", emoji: ""??"" }, { id: ""o3"", title: ""???? ???????? ???????"", discount: ""900 ?.?"", status: ""upcoming"", emoji: ""??"" }],"

Set-Content "src\store\app.ts" -Value $appTs -Encoding UTF8

