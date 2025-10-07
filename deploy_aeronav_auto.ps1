$ErrorActionPreference = "Stop"
$projectRoot = "C:\Users\romeo\Desktop\AeroNav_Deploy"
$backendUrl = "https://aeronav-deploy-24.onrender.com"
$frontendUrl = "https://frontend-ten-flax-14.vercel.app"

Write-Host "`n?? Starting AeroNav deployment..." -ForegroundColor Cyan
Set-Location $projectRoot

Write-Host "?? Checking backend status at $backendUrl ..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri $backendUrl -UseBasicParsing -TimeoutSec 15
    if ($response.StatusCode -eq 200) {
        Write-Host "? Render backend is live and responding!" -ForegroundColor Green
    } else {
        Write-Host "?? Backend responded with status: $($response.StatusCode)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "? Backend not reachable. Please verify Render service is running." -ForegroundColor Red
    exit 1
}

$frontendPath = Join-Path $projectRoot "frontend"
if (Test-Path $frontendPath) {
    Write-Host "`n?? Building frontend..." -ForegroundColor Yellow
    Set-Location $frontendPath
    npm install
    npm run build
    Set-Location $projectRoot
    Write-Host "? Frontend build completed successfully." -ForegroundColor Green
} else {
    Write-Host "?? Frontend folder not found — skipping build." -ForegroundColor Red
}

$buildFolder = Join-Path $frontendPath "build"
$zipPath = Join-Path $projectRoot "AeroNav_frontend_build.zip"
if (Test-Path $buildFolder) {
    Write-Host "??? Zipping frontend build..." -ForegroundColor Yellow
    Compress-Archive -Path $buildFolder -DestinationPath $zipPath -Force
    Write-Host "? Build zipped to $zipPath" -ForegroundColor Green
}

Write-Host "`n?? Triggering Vercel deployment..." -ForegroundColor Cyan
try {
    git add .
    git commit -m "Auto-deploy frontend build [$(Get-Date -Format 'MM/dd/yyyy HH:mm')]"
    git push origin main
    Write-Host "? Changes pushed to GitHub (Vercel will redeploy automatically)." -ForegroundColor Green
} catch {
    Write-Host "?? Could not push to Vercel repo — verify git remote and auth." -ForegroundColor Red
}

Start-Sleep -Seconds 10
Write-Host "`n?? Verifying live URLs..." -ForegroundColor Yellow
try {
    $backendCheck = Invoke-WebRequest -Uri $backendUrl -UseBasicParsing -TimeoutSec 10
    if ($backendCheck.StatusCode -eq 200) { Write-Host "? Backend OK: $backendUrl" -ForegroundColor Green } 
    else { Write-Host "? Backend check failed." -ForegroundColor Red }
} catch { Write-Host "? Backend check failed." -ForegroundColor Red }

try {
    $frontendCheck = Invoke-WebRequest -Uri $frontendUrl -UseBasicParsing -TimeoutSec 10
    if ($frontendCheck.StatusCode -eq 200) { Write-Host "? Frontend OK: $frontendUrl" -ForegroundColor Green } 
    else { Write-Host "? Frontend check failed." -ForegroundColor Red }
} catch { Write-Host "? Frontend check failed." -ForegroundColor Red }

Write-Host "`n?? AeroNav full deployment completed successfully!" -ForegroundColor Cyan
