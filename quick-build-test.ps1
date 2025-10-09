# Quick Build Test
Write-Host "Testing TypeScript compilation..." -ForegroundColor Cyan

# Check TypeScript compilation only
npx tsc --noEmit

if ($LASTEXITCODE -eq 0) {
    Write-Host "TypeScript compilation successful!" -ForegroundColor Green
    Write-Host "Now testing full build..." -ForegroundColor Yellow
    
    npm run build
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Build successful!" -ForegroundColor Green
    } else {
        Write-Host "Build failed" -ForegroundColor Red
    }
} else {
    Write-Host "TypeScript compilation failed" -ForegroundColor Red
}
