# Requirements: Family Travel Tracker Refactoring

**Defined:** 2026-06-05
**Core Value:** A modern, secure, and beautiful interface for tracking and visualizing family travel destinations on a map.

## v1 Requirements

### Database & Backend
- [ ] **DB-01**: Rename misspelled `countires` table to `countries` and verify standard schema.
- [ ] **DB-02**: Setup PostgreSQL queries to fetch family members and visited countries correctly without crashes.
- [ ] **AUTH-01**: Support selecting the active user through clean session/state handling without layout breakages.

### User Interface & Experience
- [ ] **UI-01**: Implement modern, beautiful Outfit/Inter typography and custom curated dark theme.
- [ ] **UI-02**: Show the family member options as clean horizontal tabs at the top of the screen.
- [ ] **UI-03**: Ensure map updates dynamically with user's specific colors when user switches tab or adds a country.
- [ ] **UI-04**: Redesign the Add Member page (`new.ejs`) and inputs with matching modern styles and responsive inputs.

## Out of Scope
| Feature | Reason |
|---------|--------|
| Third-party OAuth | Standard EJS/Postgres session is sufficient for v1 |
| Mobile native app | Web-first responsive layout |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DB-01 | Phase 1 | Pending |
| DB-02 | Phase 1 | Pending |
| AUTH-01 | Phase 1 | Pending |
| UI-01 | Phase 2 | Pending |
| UI-02 | Phase 2 | Pending |
| UI-03 | Phase 2 | Pending |
| UI-04 | Phase 2 | Pending |

**Coverage:**
- v1 requirements: 7 total
- Mapped to phases: 7
- Unmapped: 0 ✓

---
*Requirements defined: 2026-06-05*
*Last updated: 2026-06-05 after initial definition*
