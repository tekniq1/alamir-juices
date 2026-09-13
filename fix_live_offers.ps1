
$content = Get-Content "src\routes\offers.tsx" -Raw
$content = $content -replace "const mockOffers: Offer\[\] = \[.*?\];(?s)", ""
$content = $content -replace "const activeOrSoon = mockOffers", "const { offers: mockOffers } = useApp();`n  const activeOrSoon = mockOffers"
Set-Content "src\routes\offers.tsx" -Value $content -Encoding UTF8

