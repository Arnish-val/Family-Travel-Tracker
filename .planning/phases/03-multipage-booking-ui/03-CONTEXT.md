# Phase 3: Multipage Travel Tracker & Premium Booking UI - Context

**Gathered:** 2026-06-13
**Status:** In Planning
**Source:** User request

<domain>
## Phase Boundary
Refactor the single-page EJS monolith application into a decoupled full-stack React SPA (Vite + JavaScript) and an Express JSON REST API backend, connected to PostgreSQL. The landing page (`/`) will feature a clean minimalist design inspired by modern flight/hotel booking web UI layouts, complete with staggered scroll-reveal animations.

</domain>

<decisions>
## Implementation Decisions

### Technical Stack Pivot
- **Frontend**: Vite + React + JavaScript (hosted under `./frontend`).
- **Styling**: Modern CSS variables, Aurora gradients, custom scroll-reveal classes.
- **Backend**: Express REST API endpoints in `./index.js` returning JSON.
- **Client Routing**: React Router (`react-router-dom`) with routes:
  - `/` -> Landing page with booking search card.
  - `/tracker` -> Map tracker dashboard.
  - `/add-traveler` -> Enrollment form.

### Booking Search Card UI
- Embed a hero card mimicking a travel booking dashboard.
- Tabs: "✈️ Travel Diaries" (active) and "🏨 Plan Trip" (coming soon badge).
- Dropdown select listing active travelers queried from PostgreSQL.
- CTA: "Search Diary" redirects to the traveler's dashboard.

### SVG Map in React
- Extract the 170KB inline EJS SVG map coordinates into a dedicated `WorldMap.jsx` React component.
- Dynamically fill country paths based on active traveler color and visited country state list.

</decisions>

<canonical_refs>
## Canonical References

### Backend
- `index.js` [MODIFY] — Refactored to Express API returning JSON data.

### Frontend Views & Logic
- `frontend/src/App.jsx` [NEW] — Client-side router.
- `frontend/src/index.css` [NEW] — Custom typography, Aurora styling, scroll transitions.
- `frontend/src/components/WorldMap.jsx` [NEW] — SVG coordinates mapping, path highlight triggers.
- `frontend/src/components/Timeline.jsx` [NEW] — Map stops playback control, theme styles.
- `frontend/src/components/BookingSearchCard.jsx` [NEW] — Dribbble booking-style form.
- `frontend/src/pages/LandingPage.jsx` [NEW] — Hero search landing layout, scroll reveal triggers.
- `frontend/src/pages/TrackerPage.jsx` [NEW] — Full-screen map dashboard.
- `frontend/src/pages/AddTravelerPage.jsx` [NEW] — Registration form page.

### Clean Up (Deleted)
- `views/index.ejs` [DELETE]
- `views/new.ejs` [DELETE]
- `public/styles/main.css` [DELETE]
- `public/styles/new.css` [DELETE]

</canonical_refs>

<specifics>
## Specific Ideas
- Configure a Vite server proxy in `vite.config.js` to route backend API requests (`/api`) to `http://localhost:3000`.
- Stagger animations using transition delays in CSS (`delay-100`, `delay-200`) and the standard `IntersectionObserver`.

</specifics>

<deferred>
## Deferred Ideas
- Trip Planning logic (mocked as coming soon).

</deferred>

---
*Phase: 03-multipage-booking-ui*
*Context gathered: 2026-06-13*
