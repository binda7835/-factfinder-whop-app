# Test Build Script - Check for build issues
Write-Host "Testing FactFinder Pro Build..." -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan

# Step 1: Check Node and npm versions
Write-Host "`nChecking environment..." -ForegroundColor Yellow
node --version
npm --version

# Step 2: Clean install
Write-Host "`nCleaning and reinstalling dependencies..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item "node_modules" -Recurse -Force
    Write-Host "Removed node_modules" -ForegroundColor Green
}

if (Test-Path ".next") {
    Remove-Item ".next" -Recurse -Force
    Write-Host "Removed .next build cache" -ForegroundColor Green
}

npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "Dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Step 3: Test build
Write-Host "`nTesting production build..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nBuild successful!" -ForegroundColor Green
    Write-Host "Your app is ready for deployment!" -ForegroundColor Cyan
} else {
    Write-Host "`nBuild failed" -ForegroundColor Red
    Write-Host "Check the error messages above for details." -ForegroundColor Yellow
}
