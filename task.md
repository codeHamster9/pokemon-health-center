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
- [ ] **Setup**
    - [ ] Initialize React app + Tailwind + Shadcn
    - [ ] Setup `store/themeStore.ts` & `providers/`
    - [ ] Setup `features/pokemon` folder structure
- [ ] **Components & Pages**
    - [ ] **Dashboard Page**
        - [ ] Stat Cards
        - [ ] Trend Chart (Recharts)
        - [ ] Chart Filter: Date Range Picker
        - [ ] Chart Filter: Group By (day/hour)
        - [ ] Chart Filter: Segment By Type
        - [ ] Chart Filter: Filter By Pokémon
        - [ ] Leaderboard Tables
    - [ ] **Machine Metrics Page**
        - [ ] Data Table
        - [ ] Baseline Comparison Logic
    - [ ] **Active Check-ins Page**
        - [ ] Live List Cards
        - [ ] Dismiss Dialog
- [ ] **Routing & Navigation**
    - [ ] Header & Navigation Tabs
    - [ ] Dark Mode Toggle

## Phase 3: Integration & Polish 💅
- [ ] **Connectivity**
    - [ ] Connect Frontend to Backend API
    - [ ] React Query integration for data fetching
- [ ] **Visuals**
    - [ ] Verify Responsive Design
    - [ ] Polish Animations & Loading States
- [ ] **Documentation**
    - [ ] Write `README.md`
    - [ ] Write `DECISIONS.md`
