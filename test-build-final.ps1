# Final Build Test
Write-Host "Testing FactFinder Pro Build..." -ForegroundColor Cyan
Write-Host "===============================" -ForegroundColor Cyan

# Create environment file first
Write-Host "`nCreating environment file..." -ForegroundColor Yellow
$envFile = @"
# FactFinder Pro - Environment Variables
WHOP_APP_ID=demo_app_id
WHOP_APP_SECRET=demo_app_secret
WHOP_APP_PUBLIC_KEY=demo_public_key
WHOP_WEBHOOK_SECRET=demo_webhook_secret
WHOP_APP_BASE_URL=http://localhost:3000
NEXT_PUBLIC_WHOP_APP_ID=demo_app_id
DATABASE_URL=postgresql://username:password@localhost:5432/whop_app
NODE_ENV=development
"@

Set-Content -Path ".env.local" -Value $envFile -Encoding UTF8
Write-Host "Environment file created" -ForegroundColor Green

# Clean build artifacts
Write-Host "`nCleaning build artifacts..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item ".next" -Recurse -Force
    Write-Host "Removed .next directory" -ForegroundColor Green
}

# Test build
Write-Host "`nTesting production build..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nBuild successful!" -ForegroundColor Green
    Write-Host "Your app is ready for deployment!" -ForegroundColor Cyan
    Write-Host "`nRun the deployment script:" -ForegroundColor Yellow
    Write-Host ".\deploy-final.ps1" -ForegroundColor White
} else {
    Write-Host "`nBuild failed" -ForegroundColor Red
    Write-Host "Check the error messages above for details." -ForegroundColor Yellow
}
