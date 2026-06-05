# Roadmap: Family Travel Tracker Refactoring

## Overview

This roadmap covers the refactoring of the Travel Tracker project to add a better responsive UI, clean PostgreSQL queries, and an interactive UI for family members.

## Phases

- [x] **Phase 1: Database and Backend Structure** - Implement robust user management and clean PG queries. (completed 2026-06-05)
- [x] **Phase 2: Modern Responsive UI & Visual Map** - Implement premium Vanilla CSS UI and interactive user tab selectors. (completed 2026-06-05)

## Phase Details

### Phase 1: Database and Backend Structure

**Goal**: Clean up PG database integration, rename the table, and prepare user state.
**Depends on**: Nothing
**Requirements**: [REQ-01]
**Success Criteria** (what must be TRUE):

  1. The Postgres database uses `countries` instead of the misspelled `countires` table.
  2. Users list and visited lists are fetched correctly per active user.
  3. Pre-existing family members and visited history display successfully.

**Plans**: 1 plan

Plans:

- [ ] 01-01: Clean up database helper queries and setup robust user routes.

### Phase 2: Modern Responsive UI & Visual Map

**Goal**: Design premium Vanilla CSS styling, outfit typography, custom tabs, and interactive elements.
**Depends on**: Phase 1
**Requirements**: [REQ-02]
**Success Criteria** (what must be TRUE):

  1. The layout is fully responsive with Outfit/Inter typography.
  2. Active family members show as tabs at the top.
  3. Map automatically updates when user switches tab or adds a country.

**Plans**: 1 plan

Plans:

- [ ] 02-01: Redesign index.ejs view and styles/main.css for premium UI/UX.

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Database and Backend Structure | 0/0 | Complete    | 2026-06-05 |
| 2. Modern Responsive UI & Visual Map | 0/0 | Complete    | 2026-06-05 |
