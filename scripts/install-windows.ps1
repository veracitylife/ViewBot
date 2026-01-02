Param(
    [string]$ElectronVersion = "27.0.2"
)

$ErrorActionPreference = "Stop"
New-Item -ItemType Directory -Force -Path "install-logs" | Out-Null
$logFile = Join-Path "install-logs" ("windows-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".log")
Start-Transcript -Path $logFile -Force

Write-Host "Node version:" (node -v)
Write-Host "npm version:" (npm -v)

Write-Host "Installing npm dependencies (without scripts) ..."
npm install --ignore-scripts

Write-Host "Attempting to install Visual Studio Build Tools via winget (optional) ..."
try {
    winget install --silent --id Microsoft.VisualStudio.2022.BuildTools --accept-package-agreements --accept-source-agreements
} catch {}

Write-Host "Ensuring Python 3 is available (optional) ..."
try {
    python --version
} catch {
    try { winget install --silent --id Python.Python.3 } catch {}
}

Write-Host "Rebuilding native modules for Electron ..."
& ".\node_modules\.bin\electron-rebuild"

Write-Host "Specifically rebuilding sqlite3 for Electron runtime ..."
try {
    Push-Location
    npm rebuild sqlite3
} finally {
    Pop-Location
}

Write-Host "Building SvelteKit UI (main) ..."
Push-Location "main"
npm run build
Pop-Location

Write-Host "Starting Electron for verification ..."
try {
    electron --experimental-modules --js-flags="--max-old-space-size=8192" --no-warnings ./src/index.js
} catch {}

Stop-Transcript
Write-Host ("Installation log saved to " + $logFile)
