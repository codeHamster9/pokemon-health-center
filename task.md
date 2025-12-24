# Task Checklist - Pokémon Center Dashboard

## Phase 1: Backend Implementation 🐍
- [x] **Setup**
    - [x] Initialize `backend/main.py` (FastAPI app, CORS)
    - [x] Create `backend/database.py` (SQLite connection manager)
    - [x] Define `backend/models.py` (Pydantic models)
- [x] **Endpoints**
    - [x] `GET /metrics/checkins` (Trends & filters)
    - [x] `GET /metrics/machines` (Machine performance)
    - [x] `GET /leaderboards` (Top Pokémon/Types)
    - [x] `GET /checkins/active` (Live list)
    - [x] `POST /checkins/dismiss/:id` (Action)

## Phase 2: Frontend Implementation ⚛️
- [x] **Setup**
    - [x] Initialize React app + Tailwind + Shadcn
    - [x] Setup `store/themeStore.ts` & `providers/`
    - [x] Setup `features/pokemon` folder structure
- [x] **Components & Pages**
    - [x] **Dashboard Page**
        - [x] Stat Cards
        - [x] Trend Chart (Recharts)
        - [x] Chart Filter: Date Range Picker
        - [x] Chart Filter: Group By (day/hour)
        - [x] Chart Filter: Segment By Type
        - [x] Chart Filter: Filter By Pokémon
        - [x] Leaderboard Tables
    - [x] **Machine Metrics Page**
        - [x] Data Table
        - [x] Baseline Comparison Logic
    - [x] **Active Check-ins Page**
        - [x] Live List Cards
        - [x] Dismiss Dialog
- [x] **Routing & Navigation**
    - [x] Header & Navigation Tabs
    - [x] Dark Mode Toggle

## Phase 3: Integration & Polish 💅
- [x] **Connectivity**
    - [x] Connect Frontend to Backend API
    - [x] React Query integration for data fetching
- [x] **Visuals**
    - [x] Verify Responsive Design
    - [x] Polish Animations & Loading States
- [ ] **Documentation**
    - [ ] Write `README.md`
    - [ ] Write `DECISIONS.md`
