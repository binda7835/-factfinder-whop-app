# 🚀 FactFinder App - Quick Deploy Script
# Run this script to deploy your app to Vercel

Write-Host "🚀 Starting FactFinder App Deployment..." -ForegroundColor Green

# Check if Vercel CLI is installed
try {
    vercel --version | Out-Null
    Write-Host "✅ Vercel CLI found" -ForegroundColor Green
} catch {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Red
    npm install -g vercel
}

# Check if user is logged in
try {
    vercel whoami | Out-Null
    Write-Host "✅ Logged in to Vercel" -ForegroundColor Green
} catch {
    Write-Host "❌ Not logged in to Vercel. Please login:" -ForegroundColor Red
    vercel login
}

# Deploy to Vercel
Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Yellow
vercel --prod

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "📝 Don't forget to:" -ForegroundColor Cyan
Write-Host "   1. Set environment variables in Vercel dashboard" -ForegroundColor White
Write-Host "   2. Update your Whop app URL" -ForegroundColor White
Write-Host "   3. Test the deployed app" -ForegroundColor White

Write-Host "📖 See VERCEL_DEPLOYMENT_GUIDE.md for detailed instructions" -ForegroundColor Cyan
