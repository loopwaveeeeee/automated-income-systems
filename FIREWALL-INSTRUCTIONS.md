# Firewall instructions (Windows)

If the browser can't reach http://localhost:3000 because of firewall or network restrictions, follow these steps.

1) Run the included PowerShell script as Administrator to add a firewall rule:

Open an elevated PowerShell (Run as Administrator) and run:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\scripts\add-firewall-rule.ps1 -Port 3000 -RuleName "AutomatedIncomeSystems-3000"
```

This creates an inbound firewall rule allowing TCP traffic on port 3000.

2) If your environment uses a proxy or corporate network, ensure localhost loopback is not blocked by proxy settings. You may need to disable system proxy for local addresses or add exceptions.

3) If you prefer to use a different port (e.g., 8080), pass `-Port 8080` to the script and update the `PORT` environment variable before starting the app.

Notes:
- The script must be executed as Administrator.
- I will not run these commands for you; please run them locally when you are ready.
