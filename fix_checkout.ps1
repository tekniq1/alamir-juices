
$content = Get-Content "src\routes\checkout.tsx" -Raw -Encoding UTF8
$content = $content -replace "const \{ cart, clearCart, lang \} = useApp\(\);", "const { cart, clearCart, lang, siteSettings } = useApp();"
$content = $content -replace "https://wa.me/967776655876", "https://wa.me/`${siteSettings.whatsapp}"
Set-Content "src\routes\checkout.tsx" -Value $content -Encoding UTF8

