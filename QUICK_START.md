# Quick Start (2-minute)

This short guide gets you running fast on Windows.

## Prerequisites
- Node.js installed and available on PATH (node in terminal).
- A terminal (Command Prompt or PowerShell).

## 1) Two‑click start (recommended)
Use the provided starter scripts in the repo root.

- Double-click `run.bat` (Windows):
  - Runs `scripts/setup.js` (creates `logs`, `data`, `.env` if missing)
  - Starts the server in background
  - Opens your default browser at `http://localhost:3000/dashboard`

- Or double-click `start.ps1` (PowerShell):
  - Same as above, but opens the server in a new PowerShell window.

If Node isn't in PATH, open a terminal where `node` works and run the commands below.

## 2) Manual start (single terminal)
From the project root:

```powershell
# Run setup once
node scripts/setup.js

# Start the server in foreground
node src/app.js
```

Open: http://localhost:3000/dashboard

To run in a different port (example 8080):

```powershell
$env:PORT=8080; node src/app.js
```

## 3) Run the smoke-test (verify endpoints)
This script checks `/api/status` and `/api/performance`:

```bash
npm run smoke
# or
node scripts/smoke-test.js
```

Expected: `Smoke test: OK` and JSON output for status/performance.

## 4) Firewall / network issues
If your browser cannot reach `localhost:3000`:
- Open `FIREWALL-INSTRUCTIONS.md` for steps.
- To add a firewall rule (Admin PowerShell):

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\scripts\add-firewall-rule.ps1 -Port 3000 -RuleName "AutomatedIncomeSystems-3000"
```

Note: run the above in an elevated PowerShell window (Run as Administrator).

## 5) Stop the server
- If started with `node src/app.js` in a terminal: press `Ctrl+C` in that terminal.
- If started via `run.bat` (background): find the Node process and terminate it (Task Manager) or run:

```powershell
Get-Process node | Where-Object {$_.StartInfo -ne $null} | Stop-Process
```

(Or use Task Manager to End Process for `node.exe`.)

## Troubleshooting
- `node` not found: install Node.js and re-open the terminal.
- `ERR_PROXY_CONNECTION_FAILED`: check system proxy settings; disable proxy for local addresses or add an exception for `localhost`/`127.0.0.1`.
- Port already in use: set `PORT` env var before starting or kill the conflicting process.

## Want more?
- `README.md` contains full setup and configuration details (API keys, security notes, system descriptions).

Enjoy — open the dashboard and try the toggles on the page to start/stop subsystems.