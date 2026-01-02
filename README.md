# ViewBot README

## Installation (Windows)
- Install Node.js LTS and Git.
- In the project root, run: `npm install`
- Setup: `npm run setup:win`
- Start: `npm start`

## Installation (Linux/Mac)
- Install Node.js LTS and Git.
- In the project root, run: `npm install`
- Linux: `npm run setup:linux` | Mac: ensure build tools and Playwright deps.
- Start: `npm start`

## Quick Start
- Add/test proxies in Proxies.
- Add videos in Videos (URL, watch time, optional likes/comments).
- Adjust worker count and behavior in Settings.
- Use “Start workers” to begin; “Stop workers” to halt.

## FAQs
- How do I add proxies?  
  Open Proxies, paste one per line, click “Check proxies”.
- How do I add videos?  
  Open Videos, paste the URL, set watch time, save.
- Do I need a key?  
  All features are accessible in this build for testing without keys.
- Why are views not increasing?  
  Check proxy quality, worker count, options, bandwidth; avoid IP reuse.
- Import/export accounts?  
  Use buttons on Videos for per-video account lists.
- Livestreams and shorts?  
  Supported with dedicated modes; Rumble UI differs.
- Run headless?  
  Use headless scripts or toggle setting (if available).

## Links
- Bloxxy’s Page: https://bloxxy.net/projects/1  
- GitHub Fork: https://github.com/veracitylife/ViewBot  
- SWT Discord: https://discord.gg/GCa9zS7j
