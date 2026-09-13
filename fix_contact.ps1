
$content = Get-Content "src\routes\contact.tsx" -Raw -Encoding UTF8
$content = $content -replace "const WHATSAPP = `"967776655876`";", ""
$content = $content -replace "const PHONE = `"\+967 776 655 876`";", ""
$content = $content -replace "const lang = useApp\(\(s\) => s.lang\);", "const { lang, siteSettings } = useApp();"
$content = $content -replace "WHATSAPP", "siteSettings.whatsapp"
$content = $content -replace "PHONE", "siteSettings.phone"
Set-Content "src\routes\contact.tsx" -Value $content -Encoding UTF8

