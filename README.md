# Chrome "Bookmarking" Extension

### Overview

Build a Chrome Extension (Manifest V3) with a Side Panel Content that saves web pages for later reading. The extension captures page metadata automatically and provides a simple interface to manage bookmarks.

Set up the project as you would for a production application. Include files, folders, and tooling you believe are appropriate. Generative AI tools are allowed during development - but be ready to answer questions about the code.

### Tech Stack Requirements

- Chrome Extension Manifest V3
- React
- Basic styling (your choice)

### What We Evaluate

- React: components, state, hooks etc.
- Chrome MV3: manifest, side panel, content scripts / service worker, messaging, storage etc.
- User experience intuition: empty states, error handling, loading states etc.
- Code quality: structure, naming, maintainability
- Engineering judgment: project setup choices for a small production app

### MVP Requirements and Acceptance Criteria

#### Side Panel UI

Build a side panel using chrome.sidePanel with:

- Save for later button
- List of saved bookmarks
- Sort by Time added or Title
- Search that filters by Title first, then URL
- Delete button for each item

#### Data Capture

When Save for later is clicked, automatically extract from the active tab:

- Title (page title)
- URL (full page URL)
- Icon (favicon if available)
- Description (first 100 characters of page text - with fallback to meta description if needed)

#### Acceptance Criteria

Side Panel

- Opens and displays Save for later button
- Shows empty state when no bookmarks exist
- Renders correctly in Chrome side panel

Saving

- Captures title, URL, icon, and 100-char description automatically
- Persists data across browser restarts using Chrome storage API

Listing

- Displays title, URL, icon, and description for each bookmark
- Updates immediately after save or delete

Sorting and Search

- Sort toggles between Time added and Title
- Search filters in real-time by Title (priority) then URL

Actions

- Delete removes bookmark permanently
- Open navigates to saved URL

### Bonus Objectives (Optional)

If you finish early, consider including one of the suggested bonus objectives or come up with own improvement ideas

- AI Page summaries: Using OpenAI, Hugging Face, or local models
- Enhanced Site Metadata: Scroll position, Page Screenshot, Page Logo
- Chrome API features: Show Recent tabs or Most Visited Sites in Side Panel

### Submission

Provide a GitHub repo or zip with:

- Complete extension code
- README with setup and decisions
- Be ready to potentially discuss your approach

### Development

This project works with `npm` or `pnpm`.

Example with pnpm:

```bash
pnpm install
pnpm dev
pnpm build
```

### Notes

- Dev Server URI is: `http://localhost:5173/sidepanel.html`

### Development Steps

- Initialize project with Vite + React + TypeScript
- Generate basic structure for Chrome Extension (manifest.json, side panel, service worker)
- Define shared message types + storage helpers in src/shared/ (types for save/request/response).
- Implement metadata extraction in index.ts (title, url, favicon, 100‑char description with meta fallback).
- Implement background handlers in index.ts to:
  - request metadata from active tab
  - save/delete bookmarks in chrome.storage.local
  - return updated list
- Wire UI in App.tsx:
  - load bookmarks on mount
  - handle save/delete/open
  - implement search + sort in-memory
  - show loading/error/empty states
- Update README.md with setup/build/load‑extension steps
- Ensure code quality, structure, and naming conventions
- Test all functionality in Chrome
