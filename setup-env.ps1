# Setup Environment Variables for FactFinder Pro
Write-Host "Setting up environment variables..." -ForegroundColor Cyan

# Create .env.local file
$envContent = @"
# FactFinder Pro - Environment Variables
# This file contains the environment variables needed for the app to work

# Whop App Configuration
WHOP_APP_ID=your_app_id_here
WHOP_APP_SECRET=your_app_secret_here
WHOP_APP_PUBLIC_KEY=your_public_key_here
WHOP_WEBHOOK_SECRET=your_webhook_secret_here
WHOP_APP_BASE_URL=http://localhost:3000

# Public environment variables (accessible in browser)
NEXT_PUBLIC_WHOP_APP_ID=your_app_id_here

# Database Configuration (if needed)
DATABASE_URL=postgresql://username:password@localhost:5432/whop_app

# Development settings
NODE_ENV=development
"@

# Write the environment file
$envContent | Out-File -FilePath ".env.local" -Encoding UTF8

Write-Host "Created .env.local file" -ForegroundColor Green
Write-Host "`nIMPORTANT: You need to update the values in .env.local with your actual Whop app credentials!" -ForegroundColor Yellow
Write-Host "`nFor now, the app will work with placeholder values for development." -ForegroundColor Cyan

Write-Host "`nEnvironment variables created:" -ForegroundColor Green
Write-Host "- WHOP_APP_ID" -ForegroundColor White
Write-Host "- WHOP_APP_SECRET" -ForegroundColor White
Write-Host "- WHOP_APP_PUBLIC_KEY" -ForegroundColor White
Write-Host "- WHOP_WEBHOOK_SECRET" -ForegroundColor White
Write-Host "- NEXT_PUBLIC_WHOP_APP_ID" -ForegroundColor White
Write-Host "- WHOP_APP_BASE_URL" -ForegroundColor White

Write-Host "`nNow you can run the build:" -ForegroundColor Cyan
Write-Host "npm run build" -ForegroundColor White
