
$content = Get-Content "src\routes\about.tsx" -Raw -Encoding UTF8
$content = $content -replace "const lang = useApp\(\(s\) => s.lang\);", "const { lang, siteContent } = useApp();"
$content = $content -replace "t\(`"about_title`", lang\)", "(lang === `"ar`" ? siteContent.aboutTitleAr : siteContent.aboutTitleEn)"
$content = $content -replace "t\(`"about_story`", lang\)", "(lang === `"ar`" ? siteContent.aboutStoryAr : siteContent.aboutStoryEn)"
Set-Content "src\routes\about.tsx" -Value $content -Encoding UTF8

