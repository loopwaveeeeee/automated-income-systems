# PowerShell starter: run setup, start server in new window, open dashboard
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptDir
Write-Host "Running setup..."
node scripts/setup.js
Write-Host "Starting server in new PowerShell window..."
Start-Process -FilePath "powershell" -ArgumentList '-NoExit','-Command','node src/app.js'
Start-Sleep -Seconds 2
Write-Host "Opening dashboard in default browser..."
Start-Process "http://localhost:3000/dashboard"
Write-Host "Done. Close the server window to stop the server."
