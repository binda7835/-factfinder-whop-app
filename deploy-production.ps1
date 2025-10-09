# FactFinder Pro - Production Deployment Script
# This script prepares and deploys the app to production

Write-Host "🚀 FactFinder Pro - Production Deployment" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# Step 1: Clean up
Write-Host "`n🧹 Cleaning up..." -ForegroundColor Yellow
if (Test-Path "pnpm-lock.yaml") {
    Remove-Item "pnpm-lock.yaml" -Force
    Write-Host "✅ Removed pnpm-lock.yaml" -ForegroundColor Green
}

if (Test-Path ".next") {
    Remove-Item ".next" -Recurse -Force
    Write-Host "✅ Removed .next build cache" -ForegroundColor Green
}

# Step 2: Install dependencies
Write-Host "`n📦 Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Step 3: Check environment variables
Write-Host "`n🔧 Checking environment variables..." -ForegroundColor Yellow
$requiredVars = @(
    "WHOP_APP_ID",
    "WHOP_APP_SECRET", 
    "WHOP_APP_PUBLIC_KEY",
    "WHOP_WEBHOOK_SECRET",
    "WHOP_APP_BASE_URL"
)

$missingVars = @()
foreach ($var in $requiredVars) {
    if (-not (Get-Content ".env.local" | Select-String $var)) {
        $missingVars += $var
    }
}

if ($missingVars.Count -gt 0) {
    Write-Host "⚠️  Missing environment variables:" -ForegroundColor Yellow
    foreach ($var in $missingVars) {
        Write-Host "   - $var" -ForegroundColor Red
    }
    Write-Host "`nPlease update your .env.local file with all required variables." -ForegroundColor Yellow
} else {
    Write-Host "✅ All required environment variables found" -ForegroundColor Green
}

# Step 4: Build for production
Write-Host "`n🔨 Building for production..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Production build successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Production build failed" -ForegroundColor Red
    Write-Host "Check the error messages above and fix any issues." -ForegroundColor Yellow
    exit 1
}

# Step 5: Deploy to Vercel
Write-Host "`n🚀 Deploying to Vercel..." -ForegroundColor Yellow
Write-Host "This will deploy your app to production." -ForegroundColor Cyan
$deploy = Read-Host "Do you want to deploy now? (y/n)"

if ($deploy -eq "y" -or $deploy -eq "Y") {
    npx vercel --prod
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n🎉 Deployment successful!" -ForegroundColor Green
        Write-Host "Your FactFinder Pro app is now live!" -ForegroundColor Cyan
    } else {
        Write-Host "`n❌ Deployment failed" -ForegroundColor Red
        Write-Host "Check the error messages above." -ForegroundColor Yellow
    }
} else {
    Write-Host "`n⏸️  Deployment skipped" -ForegroundColor Yellow
    Write-Host "Run 'npx vercel --prod' when ready to deploy." -ForegroundColor Cyan
}

Write-Host "`n📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Test your deployed app" -ForegroundColor White
Write-Host "2. Install it in a Whop company" -ForegroundColor White
Write-Host "3. Test with real Whop users" -ForegroundColor White
Write-Host "4. Monitor performance and errors" -ForegroundColor White

Write-Host "`n🎊 FactFinder Pro is ready for production!" -ForegroundColor Green
