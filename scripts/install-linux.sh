#!/usr/bin/env bash
set -euo pipefail

LOG_DIR="install-logs"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/linux-$(date +%Y%m%d-%H%M%S).log"
exec > >(tee -a "$LOG_FILE") 2>&1

echo "Detecting distribution..."
if [ -f /etc/os-release ]; then
  . /etc/os-release
  echo "Running on: $NAME ($ID) $VERSION_ID"
fi

echo "Installing build prerequisites (AlmaLinux/RHEL-based)..."
if command -v dnf >/dev/null 2>&1; then
  sudo dnf -y groupinstall "Development Tools"
  sudo dnf -y install python3 python3-pip libX11-devel libXext-devel libXrandr-devel libXcursor-devel libXfixes-devel libXi-devel libXrender-devel mesa-libGL-devel
fi

echo "Node:"
node -v || true
echo "npm:"
npm -v || true

echo "Installing npm dependencies (without scripts) ..."
npm install --ignore-scripts

echo "Rebuilding native modules for Electron ..."
./node_modules/.bin/electron-rebuild

echo "Specifically rebuilding sqlite3 ..."
npm rebuild sqlite3

echo "Installing Playwright Firefox and deps ..."
npx playwright install-deps firefox || true
npx playwright install firefox || true

echo "Building SvelteKit UI (main) ..."
(cd main && npm run build)

echo "Starting headless server for verification ..."
node --max-old-space-size=8192 ./src/headless_index.js || true

echo "Installation log saved to $LOG_FILE"
