# Create environment file for FactFinder Pro
Write-Host "Creating .env.local file..." -ForegroundColor Cyan

# Create the environment file content
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

# Write to file
Set-Content -Path ".env.local" -Value $envFile -Encoding UTF8

Write-Host "Environment file created successfully!" -ForegroundColor Green
Write-Host "Now you can build the app:" -ForegroundColor Yellow
Write-Host "npm run build" -ForegroundColor White
