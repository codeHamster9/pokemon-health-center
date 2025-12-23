# Pokémon Center Dashboard - Implementation Plan

## Overview
Build an internal dashboard for Pokémon Centers that visualizes healing activity, displays machine performance, and manages active check-ins. Uses provided SQLite database with raw SQL queries.

---

## Proposed Changes

### Backend (Python FastAPI)

#### [NEW] [main.py](file:///home/idan/workspaces/gemini/guardio/backend/main.py)
FastAPI app with CORS, routes registration, and SQLite connection handling.

#### [NEW] [database.py](file:///home/idan/workspaces/gemini/guardio/backend/database.py)
SQLite connection manager with context manager pattern for safe query execution.

#### [NEW] [routes/metrics.py](file:///home/idan/workspaces/gemini/guardio/backend/routes/metrics.py)
- `GET /metrics/checkins` - Check-ins over time with date range, grouping (day/hour), and type filters
- `GET /metrics/machines` - Machine totals and success rates
- `GET /metrics/machines/compare` - Compare all machines against a baseline

#### [NEW] [routes/leaderboards.py](file:///home/idan/workspaces/gemini/guardio/backend/routes/leaderboards.py)
- `GET /leaderboards` - Top Pokémon and top types by successful heals

#### [NEW] [routes/checkins.py](file:///home/idan/workspaces/gemini/guardio/backend/routes/checkins.py)
- `GET /checkins/active` - Active check-ins (no `healed_at`)
- `POST /checkins/dismiss/{id}` - Mark as healed

#### [NEW] [models.py](file:///home/idan/workspaces/gemini/guardio/backend/models.py)
Pydantic models for request/response validation.

---

### Frontend (React + TypeScript)

#### [NEW] [App.tsx](file:///home/idan/workspaces/gemini/guardio/frontend/src/App.tsx)
Router setup with 3 pages, theme provider, header with navigation.

#### [NEW] [components/ui/](file:///home/idan/workspaces/gemini/guardio/frontend/src/components/ui/)
shadcn/ui components: Button, Card, Table, Select, Dialog, Skeleton, DatePicker.

#### [NEW] [pages/Dashboard.tsx](file:///home/idan/workspaces/gemini/guardio/frontend/src/pages/Dashboard.tsx)
Overview dashboard with:
- Stat cards (total check-ins, success rate, active count, top machine)
- Check-ins trend chart (Recharts line/bar) with date range picker and filters
- Leaderboards (top Pokémon, top types)

#### [NEW] [pages/Machines.tsx](file:///home/idan/workspaces/gemini/guardio/frontend/src/pages/Machines.tsx)
Machine metrics table with baseline comparison dropdown.

#### [NEW] [pages/ActiveCheckins.tsx](file:///home/idan/workspaces/gemini/guardio/frontend/src/pages/ActiveCheckins.tsx)
Active check-ins list with dismiss functionality and confirmation dialog.

#### [NEW] [hooks/useApi.ts](file:///home/idan/workspaces/gemini/guardio/frontend/src/hooks/useApi.ts)
Custom hooks for API calls with loading/error states.

#### [NEW] [lib/theme.ts](file:///home/idan/workspaces/gemini/guardio/frontend/src/lib/theme.ts)
Theme context for dark/light mode toggle with system preference detection and localStorage persistence.

---

### Documentation

#### [NEW] [README.md](file:///home/idan/workspaces/gemini/guardio/README.md)
Setup instructions, how to run backend and frontend.

#### [NEW] [DECISIONS.md](file:///home/idan/workspaces/gemini/guardio/DECISIONS.md)
Architecture decisions, trade-offs, and future improvements.

---

## Project Structure

```
/backend
  ├── main.py
  ├── database.py
  ├── models.py
  └── routes/
      ├── metrics.py
      ├── leaderboards.py
      └── checkins.py
/frontend
  ├── package.json
  ├── src/
  │   ├── App.tsx
  │   ├── main.tsx
  │   ├── index.css
  │   ├── pages/
  │   │   ├── Dashboard.tsx
  │   │   ├── Machines.tsx
  │   │   └── ActiveCheckins.tsx
  │   ├── components/
  │   │   └── ui/
  │   ├── hooks/
  │   │   └── useApi.ts
  │   └── lib/
  │       └── theme.ts
README.md
DECISIONS.md
clinic.sqlite
```

---

## Key Technical Decisions

| Decision | Rationale |
|----------|-----------|
| **FastAPI over Flask** | Async support, built-in validation, OpenAPI docs |
| **Raw SQL with parameterized queries** | Per requirements, prevents SQL injection |
| **Vite + React** | Fast dev experience, modern bundler |
| **shadcn/ui** | Per requirements, accessible components |
| **Recharts** | Per requirements, easy React integration |
| **URL params for filters** | Shareable links, bookmarkable states |
| **localStorage for theme** | Persists across sessions |

---

## Verification Plan

### Backend Tests (Manual via curl/httpie)
```bash
# Start backend
cd backend && uvicorn main:app --reload

# Test endpoints
curl http://localhost:8000/metrics/checkins
curl http://localhost:8000/metrics/machines
curl "http://localhost:8000/metrics/machines/compare?baseline_id=1"
curl http://localhost:8000/leaderboards
curl http://localhost:8000/checkins/active
curl -X POST http://localhost:8000/checkins/dismiss/1
```

### Frontend Visual Verification
1. Start frontend: `cd frontend && npm run dev`
2. Verify Dashboard page loads with charts and stats
3. Verify Machine Metrics table displays and comparison works
4. Verify Active Check-ins shows list and dismiss dialog functions
5. Verify dark/light theme toggle works
6. Verify filters update URL and persist on refresh

### Integration Check
1. Dismiss an active check-in → verify it disappears from list
2. Check that dashboard stats reflect the dismissal

---

## Estimated Timeline

| Phase | Tasks | ~Hours |
|-------|-------|--------|
| Backend | All endpoints + SQL queries | 1.5h |
| Frontend | Pages + components + styling | 2h |
| Integration | API connection + state management | 0.5h |
| Polish | Theme, loading states, documentation | 1h |
| **Total** | | **5h** |
