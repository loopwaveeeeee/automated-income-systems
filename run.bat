@echo off
REM Double-click this file to run setup, start the server in a new window, and open the dashboard
cd /d %~dp0
echo Running setup...
node scripts/setup.js
echo Starting server in background (same console)...
REM start /B runs the command without creating a new window; output will still appear in this window
start "Automated Income Systems (background)" /B cmd /C "node src/app.js"
echo Waiting a few seconds for server to start...
timeout /t 2 /nobreak >nul
echo Opening dashboard in your default browser...
start "" "http://localhost:3000/dashboard"
echo Done. The server runs in background in this console. To stop it, find the node process and terminate it or close this console.
pause
