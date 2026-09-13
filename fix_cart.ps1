
$content = Get-Content "src\components\site\CartDrawer.tsx" -Raw -Encoding UTF8
$content = $content -replace "const lang = useApp\(\(s\) => s.lang\);", "const { lang, siteSettings } = useApp();"
$content = $content -replace "https://wa.me/967776655876", "https://wa.me/`${siteSettings.whatsapp}"
Set-Content "src\components\site\CartDrawer.tsx" -Value $content -Encoding UTF8

