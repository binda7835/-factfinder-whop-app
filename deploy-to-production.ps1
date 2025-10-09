# FactFinder Pro - Complete Production Deployment Script
# This script handles Git, GitHub, and Vercel deployment

Write-Host "🚀 FactFinder Pro - Complete Production Deployment" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

# Step 1: Check Git status
Write-Host "`n📋 Checking Git status..." -ForegroundColor Yellow
git status

# Step 2: Add all changes
Write-Host "`n📁 Adding all changes to Git..." -ForegroundColor Yellow
git add .

# Step 3: Commit changes
Write-Host "`n💾 Committing changes..." -ForegroundColor Yellow
$commitMessage = @"
Make FactFinder Pro FREE for all users

- Removed subscription requirement
- Updated UI to show free access
- Changed theme to green for free access
- Fixed authentication for all users
- Updated all components for free access
- Production-ready deployment

Features:
- Multiple fact categories (Random, Today, Trivia)
- Favorites system with local storage
- Social sharing capabilities
- Statistics tracking
- Mobile optimized with haptic feedback
- Completely FREE for everyone!
"@

git commit -m $commitMessage

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Changes committed successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to commit changes" -ForegroundColor Red
    exit 1
}

# Step 4: Push to GitHub
Write-Host "`n📤 Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Successfully pushed to GitHub" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to push to GitHub" -ForegroundColor Red
    Write-Host "Please check your GitHub connection and try again." -ForegroundColor Yellow
    exit 1
}

# Step 5: Build for production
Write-Host "`n🔨 Building for production..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Production build successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Production build failed" -ForegroundColor Red
    Write-Host "Please fix build errors before deploying." -ForegroundColor Yellow
    exit 1
}

# Step 6: Deploy to Vercel
Write-Host "`n🚀 Deploying to Vercel..." -ForegroundColor Yellow
Write-Host "This will deploy your FREE FactFinder Pro app to production." -ForegroundColor Cyan

$deploy = Read-Host "Do you want to deploy to Vercel now? (y/n)"

if ($deploy -eq "y" -or $deploy -eq "Y") {
    npx vercel --prod
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n🎉 Deployment successful!" -ForegroundColor Green
        Write-Host "Your FREE FactFinder Pro app is now live!" -ForegroundColor Cyan
        Write-Host "`n📱 Your app is now accessible to ALL users for FREE!" -ForegroundColor Green
    } else {
        Write-Host "`n❌ Deployment failed" -ForegroundColor Red
        Write-Host "Check the error messages above." -ForegroundColor Yellow
    }
} else {
    Write-Host "`n⏸️  Deployment skipped" -ForegroundColor Yellow
    Write-Host "Run 'npx vercel --prod' when ready to deploy." -ForegroundColor Cyan
}

Write-Host "`nWhat's New in This Version:" -ForegroundColor Cyan
Write-Host "FREE access for all users" -ForegroundColor Green
Write-Host "No subscription required" -ForegroundColor Green
Write-Host "Updated UI with free access theme" -ForegroundColor Green
Write-Host "All features available to everyone" -ForegroundColor Green
Write-Host "Production-ready deployment" -ForegroundColor Green

Write-Host "`n🎯 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Test your deployed app" -ForegroundColor White
Write-Host "2. Install it in a Whop company" -ForegroundColor White
Write-Host "3. Share with users - it's FREE for everyone!" -ForegroundColor White
Write-Host "4. Monitor usage and engagement" -ForegroundColor White

Write-Host "`n🎊 FactFinder Pro is now FREE and ready for everyone!" -ForegroundColor Green
