
$content = Get-Content "src\components\site\HomeSections.tsx" -Raw -Encoding UTF8
$content = $content -replace "import \{ categories \} from `"@/data/mock`";", ""
$content = $content -replace "const lang = useApp\(\(s\) => s.lang\);", "const { lang, categories } = useApp();"
$content = $content -replace "L\(c.name, lang\)", "(lang === `"ar`" ? c.nameAr : c.nameEn)"
$content = $content -replace "L\(c.tagline, lang\)", "(lang === `"ar`" ? c.nameAr : c.nameEn)"
Set-Content "src\components\site\HomeSections.tsx" -Value $content -Encoding UTF8

