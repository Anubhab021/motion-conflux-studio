# Motion Conflux — Portfolio

This repository contains a JioHotstar-inspired frontend portfolio for Motion Conflux.

## How to run locally

1. Open the project folder in VS Code.
2. Install the Live Server extension (recommended) or run a simple static server.
3. To run a simple local server from the project root (Windows PowerShell):

```powershell
python -m http.server 5500
```

Then open `http://localhost:5500/index.html` in your browser.

## How to test features

- **Hero autoplay:** Desktop loads high-res video, mobile loads fallback image/video. Replace placeholder assets in `assets/placeholders/` for final visuals.
- **Sidebar:** Click sidebar toggle to collapse/expand. State persists via localStorage.
- **Search:** Use the search bar to filter cards. Keyboard navigation and highlight supported.
- **Modal:** Click 'View More' on cards to open modal. Esc closes, focus is trapped.
- **Color switching:** Theme toggle in header switches between dark/light. All colors use variables from `css/theme.css`.
- **Mobile navigation:** Bottom nav and category popup appear on mobile widths.

## Acceptance checks

- All colors use CSS variables (no hard-coded hex/rgb in CSS/HTML/JS except SVGs).
- No console errors after fixes.
- No horizontal overflow at any breakpoint.

## Manual steps

- Replace placeholder assets with your final images/videos.
- Review SVG icon colors for branding if desired.

## Changelog

See `CHANGELOG.md` for commit history.

---
