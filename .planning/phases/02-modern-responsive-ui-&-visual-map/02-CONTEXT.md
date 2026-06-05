# Phase 2: Modern Responsive UI & Visual Map - Context

**Gathered:** 2026-06-05
**Status:** Ready for planning
**Source:** User request

<domain>
## Phase Boundary
Redesign the front-end layout (`index.ejs` and `main.css`) to feature a premium responsive dark theme, glassmorphic layout, Outfit/Inter typography, clean user selector tabs, and interactive map visualizations.

</domain>

<decisions>
## Implementation Decisions

### Typography & Colors
- Link Google Fonts (Outfit, Inter) in `views/index.ejs`.
- Define a beautiful HSL dark palette in `main.css`:
  - Background: HSL(222, 14%, 10%) (Deep charcoal/blue)
  - Card/Container: HSL(222, 14%, 15%, 0.7) with glassmorphism (backdrop-filter: blur(10px))
  - Text: HSL(210, 38%, 95%) (Ice white)
  - Active color: Dynamically loaded from user's selected profile color.

### User Switch Tabs
- Refactor the EJS loop in `views/index.ejs` to use `<button type="submit">` elements styled as tabs instead of the labels/hidden-inputs pattern.
- Center the tabs at the top of the viewport with subtle hover animations and active-state scales.

### Map Styling
- Enlarge the SVG map container so it displays centered and dynamically fits responsive viewports.
- Animate active country path fills using smooth CSS transitions.

</decisions>

<canonical_refs>
## Canonical References

### Views
- `views/index.ejs` — Core HTML structure.
- `views/new.ejs` — Form to add a new member.

### Styles
- `public/styles/main.css` — Core style rules.
- `public/styles/new.css` — Add member style rules.

</canonical_refs>

<specifics>
## Specific Ideas
- Enhance the submit and input fields to have subtle focus shadows and transition animations.

</specifics>

<deferred>
## Deferred Ideas
- None.

</deferred>

---
*Phase: 02-modern-responsive-ui-&-visual-map*
*Context gathered: 2026-06-05*
