
$content = Get-Content "src\components\site\Hero.tsx" -Raw -Encoding UTF8
$content = $content -replace "const lang = useApp\(\(s\) => s.lang\);", "const { lang, siteContent } = useApp();"
$content = $content -replace "t\(`"hero_title`", lang\)", "(lang === `"ar`" ? siteContent.heroTitleAr : siteContent.heroTitleEn)"
$content = $content -replace "t\(`"hero_subtitle`", lang\)", "(lang === `"ar`" ? siteContent.heroDescAr : siteContent.heroDescEn)"
Set-Content "src\components\site\Hero.tsx" -Value $content -Encoding UTF8

