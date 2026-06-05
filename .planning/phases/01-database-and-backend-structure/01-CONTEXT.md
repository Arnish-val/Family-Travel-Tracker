# Phase 1: Database and Backend Structure - Context

**Gathered:** 2026-06-05
**Status:** Ready for planning
**Source:** User request

<domain>
## Phase Boundary
Deliver clean Postgres queries and a robust routing/state management structure in `index.js` to lay the foundation for a responsive UI.

</domain>

<decisions>
## Implementation Decisions

### Database Renaming
- Renamed the table `countires` to `countries`.
- Ordered the lookup by length `ORDER BY LENGTH(country_name) ASC LIMIT 1` to ensure accurate country matching (e.g. India matches IN, not IO).

### User Selection and State
- Use a robust way to switch between users and retrieve their visited countries.
- Clean up any unused code or temporary query files to maintain a solid structure.

### the agent's Discretion
- Code refactoring of route handlers in `index.js`.
- Clean error response handling for country additions.

</decisions>

<canonical_refs>
## Canonical References

### Backend Server
- `index.js` — Core Express server and route handlers.

### Views
- `views/index.ejs` — EJS template for rendering.

</canonical_refs>

<specifics>
## Specific Ideas
- The active user must be correctly identified, and their custom color styling must be retrieved from the database to style the Add button and country markers on the map.

</specifics>

<deferred>
## Deferred Ideas
- Premium styling changes (deferred to Phase 2).

</deferred>

---
*Phase: 01-database-and-backend-structure*
*Context gathered: 2026-06-05*
