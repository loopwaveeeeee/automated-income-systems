<#
Run this PowerShell script as Administrator to add a firewall rule allowing inbound TCP traffic on the application's port.
Usage (Admin PowerShell):
    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
    .\scripts\add-firewall-rule.ps1 -Port 3000 -RuleName "AutomatedIncomeSystems-3000"
#>
param(
    [int]$Port = 3000,
    [string]$RuleName = 'AutomatedIncomeSystems-3000'
)

Write-Host "This script must be run as Administrator. It will create an inbound firewall rule for TCP port $Port with name '$RuleName'." -ForegroundColor Yellow

try {
    # Check admin
    $isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltinRole]::Administrator)
    if (-not $isAdmin) {
        throw "Script is not running elevated. Please run PowerShell as Administrator and re-run this script."
    }

    # Create the rule
    New-NetFirewallRule -DisplayName $RuleName -Direction Inbound -Action Allow -Protocol TCP -LocalPort $Port -Profile Any
    Write-Host "Firewall rule created: $RuleName (port $Port)" -ForegroundColor Green
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
