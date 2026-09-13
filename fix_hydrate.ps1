
$content = Get-Content "src\store\app.ts" -Raw -Encoding UTF8
$content = $content -replace "onRehydrateStorage: \(\) => \(state\) => \{", "onRehydrateStorage: () => (state, error) => {`n        if (state) {`n          if (!state.categories) state.categories = [{ id: `"c1`", nameAr: `"????? ??????`", nameEn: `"Fresh Juices`", emoji: `"??`" }, { id: `"c2`", nameAr: `"???? ???`", nameEn: `"Milkshakes`", emoji: `"??`" }];`n          if (!state.siteContent) state.siteContent = { heroTitleAr: `"??????.. ??? ???????`", heroTitleEn: `"Alamir.. King of Juices`", heroDescAr: `"`", heroDescEn: `"`", aboutTitleAr: `"`", aboutTitleEn: `"`", aboutStoryAr: `"`", aboutStoryEn: `"`" };`n          if (!state.siteSettings) state.siteSettings = { whatsapp: `"967776655876`", phone: `"`", mapsLink: `"`", workingHoursAr: `"`", workingHoursEn: `"`" };`n        }"
Set-Content "src\store\app.ts" -Value $content -Encoding UTF8

