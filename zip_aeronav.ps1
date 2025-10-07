# zip_aeronav.ps1
# This script zips AeroNav frontend/src and server directories.

$frontendPath = "frontend\src"
$backendPath = "server"

$frontendZip = "AeroNav_frontend_src.zip"
$backendZip = "AeroNav_backend.zip"

Write-Host "Zipping frontend/src..."
Compress-Archive -Path $frontendPath -DestinationPath $frontendZip -Force
Write-Host "Frontend zipped to $frontendZip"

Write-Host "Zipping backend/server..."
Compress-Archive -Path $backendPath -DestinationPath $backendZip -Force
Write-Host "Backend zipped to $backendZip"

Write-Host "✅ All done! Opening folder..."
Start-Process explorer.exe .
