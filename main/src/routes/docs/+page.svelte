<script>
  let expanded = {};
  function toggle(id) {
    expanded[id] = !expanded[id];
  }
</script>

<div style="padding: 24px; color: #eaeaea; line-height: 1.6">
  <h1>ViewBot Documentation</h1>
  
  <div style="margin-top: 16px; margin-bottom: 24px;"></div>

  <h2>Overview</h2>
  <p>Works with both YouTube and Rumble. Emphasizes quality proxies, fast getting started, and streamlined installation.</p>

  <div style="margin-top: 20px; margin-bottom: 20px;"></div>

  <h2>Unparalleled Functionality</h2>
  <p>Advanced algorithms for view botting, customizable watch time, and engagement features enable versatile automation to improve metrics and accelerate growth.</p>

  <div style="margin-top: 20px; margin-bottom: 20px;"></div>

  <h2>User-Friendly Interface</h2>
  <p>A feature-rich interface reduces complexity. Control workers, proxies, videos, and settings intuitively to focus on content and strategy.</p>

  <div style="margin-top: 20px; margin-bottom: 20px;"></div>

  <h2>Seamless YouTube and Rumble Integration</h2>
  <p>Integrates with each platform’s flow, bypasses unnecessary prompts, and aligns with core features for smooth operation across YouTube and Rumble.</p>

  <div style="margin-top: 20px; margin-bottom: 20px;"></div>

  <h2>Installation (Windows)</h2>
  <ol>
    <li>Install Node.js LTS and Git.</li>
    <li>Open a terminal in the project root.</li>
    <li>Run: <code>npm install</code></li>
    <li>Run: <code>npm run setup:win</code> (installs native modules and prerequisites).</li>
    <li>Start: <code>npm start</code></li>
  </ol>

  <div style="margin-top: 20px; margin-bottom: 20px;"></div>

  <h2>Installation (Linux/Mac)</h2>
  <ol>
    <li>Install Node.js LTS and Git.</li>
    <li>Open a terminal in the project root.</li>
    <li>Run: <code>npm install</code></li>
    <li>Linux: <code>npm run setup:linux</code> | Mac: ensure build tools and Playwright deps installed.</li>
    <li>Start: <code>npm start</code></li>
  </ol>

  <div style="margin-top: 20px; margin-bottom: 20px;"></div>

  <h2>Quick Start</h2>
  <ol>
    <li>Open the app.</li>
    <li>Go to Proxies and add/test proxies.</li>
    <li>Go to Videos and add YouTube/Rumble URLs with desired watch time and options.</li>
    <li>Go to Settings to adjust worker count and behavior.</li>
    <li>Use the top “Start workers” button to begin, “Stop workers” to halt.</li>
  </ol>

  <div style="margin-top: 20px; margin-bottom: 20px;"></div>

  <h2>Requirements</h2>
  <ul>
    <li>Node.js 18.16.10 or above</li>
    <li>Stable connection: ~2 megabits per minute per worker</li>
    <li>Quality proxies to maximize view distribution</li>
    <li>A capable computer to sustain concurrent workers</li>
  </ul>

  <div style="margin-top: 20px; margin-bottom: 20px;"></div>

  <h2>Core Concepts</h2>
  <ul>
    <li>Workers: background processes that open headless/non-headless browsers to generate views.</li>
    <li>Proxies: HTTP/HTTPS/SOCKS proxies used to distribute traffic and avoid detection.</li>
    <li>Extensions: pluggable scripts to customize behavior.</li>
    <li>Server API: Express endpoints powering the UI and actions.</li>
  </ul>

  <div style="margin-top: 20px; margin-bottom: 20px;"></div>

  <h2>FAQs</h2>
  <div>
    <h3 style="cursor:pointer" on:click={() => toggle('faq1')}>How do I add proxies?</h3>
    {#if expanded['faq1']}
    <p>Open Proxies, paste your list (one per line). Click “Check proxies”. Good/bad proxies appear under tabs.</p>
    {/if}

    <div style="margin-top: 12px;"></div>

    <h3 style="cursor:pointer" on:click={() => toggle('faq2')}>How do I add videos?</h3>
    {#if expanded['faq2']}
    <p>Open Videos, paste the video URL, set watch time, optionally add likes/comments, and save.</p>
    {/if}

    <div style="margin-top: 12px;"></div>

    <h3 style="cursor:pointer" on:click={() => toggle('faq3')}>Do I need a key to use features?</h3>
    {#if expanded['faq3']}
    <p>All features are accessible in this build for testing without keys.</p>
    {/if}

    <div style="margin-top: 12px;"></div>

    <h3 style="cursor:pointer" on:click={() => toggle('faq4')}>Why are views not increasing?</h3>
    {#if expanded['faq4']}
    <p>Check proxies quality, worker count, video options, and bandwidth. Avoid reusing IPs rapidly.</p>
    {/if}

    <div style="margin-top: 12px;"></div>

    <h3 style="cursor:pointer" on:click={() => toggle('faq5')}>How do I import/export accounts?</h3>
    {#if expanded['faq5']}
    <p>Use the import/export buttons on the Videos page for account lists tied to specific videos.</p>
    {/if}

    <div style="margin-top: 12px;"></div>

    <h3 style="cursor:pointer" on:click={() => toggle('faq6')}>Can it watch livestreams and shorts?</h3>
    {#if expanded['faq6']}
    <p>Yes, with dedicated modes. Configure per video. Rumble has a different UI flow.</p>
    {/if}

    <div style="margin-top: 12px;"></div>

    <h3 style="cursor:pointer" on:click={() => toggle('faq7')}>How can I run headless?</h3>
    {#if expanded['faq7']}
    <p>Use the headless run scripts or toggle the setting if available; headless reduces resource usage.</p>
    {/if}
  </div>

  <div style="margin-top: 20px; margin-bottom: 20px;"></div>

  <h2>Advanced Features Roadmap</h2>
  <ol>
    <li>
      Cache video metadata in the database. On video info requests, return cached data if present. Provide a “Refetch” button and auto-detect updates (e.g., livestreams ending).
    </li>
    <li>
      Keep proxy test results in memory and serve them on navigation back to the Proxies page via a GET endpoint.
    </li>
    <li>
      Complete Dashboard video list with status, progress, errors, and per-video metrics.
    </li>
    <li>
      Complete Dashboard stats graphs (views over time, proxy health, worker utilization).
    </li>
    <li>
      Key-based navbar behavior: if no key, hide navbar; on app start, check DB for key and redirect to key page if invalid.
    </li>
    <li>
      Finish the video watching feature with robust anti-fingerprinting and per-platform navigation flows.
    </li>
    <li>
      Full support for Shorts and Livestreams, with Rumble-specific UI handling and controls.
    </li>
    <li>
      Switch app name and icon via Electron Forge maker configs and static assets.
    </li>
    <li>
      Finish account import/export: export button, JSON/CSV format, validation feedback.
    </li>
  </ol>

  <div style="margin-top: 20px; margin-bottom: 20px;"></div>

  <h2>Topics</h2>
  <ul>
    <li>Getting Started</li>
    <li>Proxies and Quality Guidelines</li>
    <li>Video Setup and Automation Options</li>
    <li>Worker Scaling and Resource Tuning</li>
    <li>Troubleshooting and Logs</li>
  </ul>

  <h2>Internal Architecture Overview</h2>
  <ul>
    <li>Electron Forge powers the desktop app; the UI is SvelteKit.</li>
    <li>Server runs via Express with REST and Socket.IO.</li>
    <li>Workers coordinate via server-side scripts and browser automation libraries.</li>
    <li>Configuration stored in DB and JSON files; static assets in main/static.</li>
  </ul>

  <div style="margin-top: 20px; margin-bottom: 20px;"></div>

  <h2>Troubleshooting</h2>
  <ul>
    <li>If native modules fail to build, rerun the setup scripts and ensure build tools are installed.</li>
    <li>For Playwright/Chromium issues, ensure dependencies are present and proxies permit SSL traffic.</li>
    <li>Clear caches and restart the app if UI becomes unresponsive.</li>
  </ul>

  <div style="margin-top: 20px; margin-bottom: 20px;"></div>

  <h2>Links</h2>
  <ul>
    <li>Bloxxy’s Page: <a href="https://bloxxy.net/projects/1">https://bloxxy.net/projects/1</a></li>
    <li>GitHub Fork: <a href="https://github.com/veracitylife/ViewBot">https://github.com/veracitylife/ViewBot</a></li>
    <li>SWT Discord: <a href="https://discord.gg/GCa9zS7j">https://discord.gg/GCa9zS7j</a></li>
  </ul>
</div>
