
$content = Get-Content "src\routes\menu.tsx" -Raw -Encoding UTF8
$content = $content -replace "import \{ categories \} from `"@/data/mock`";", ""
$content = $content -replace "const \{ lang, products, addToCart \} = useApp\(\);", "const { lang, products, addToCart, categories } = useApp();"
$content = $content -replace "L\(c.name, lang\)", "(lang === `"ar`" ? c.nameAr : c.nameEn)"
Set-Content "src\routes\menu.tsx" -Value $content -Encoding UTF8

