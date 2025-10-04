# PowerShell script to start the Next.js development server
Write-Host "Starting FactFinder Whop App..." -ForegroundColor Green
Write-Host ""

# Change to the whop-app directory
Set-Location -Path "."

# Start the development server
Write-Host "Running: npm run dev:npm" -ForegroundColor Yellow
npm run dev:npm
