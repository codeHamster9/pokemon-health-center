# Guardio Health - Pokémon Center Dashboard

A full-stack dashboard application for monitoring Pokémon healing operations at a Pokémon Center.

## Tech Stack

### Backend
- **FastAPI** (Python) - REST API
- **SQLite** - Database with raw SQL
- **Pydantic** - Request/response validation

### Frontend
- **React + TypeScript** (Vite)
- **Tailwind CSS + shadcn/ui** - Styling
- **Recharts** - Data visualization
- **@tanstack/react-query** - Server state with Suspense
- **Zustand** - Client state

## Quick Start

### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn backend.main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Access:
- Frontend: http://localhost:5174
- API Docs: http://localhost:8000/docs

## Project Structure

```
guardio/
├── backend/
│   ├── main.py           # FastAPI app & endpoints
│   ├── database.py       # SQLite connection
│   └── models.py         # Pydantic schemas
├── frontend/
│   └── src/
│       ├── pages/pokemon/          # Page components
│       ├── features/pokemon/
│       │   ├── components/         # Feature components
│       │   ├── hooks/              # Data fetching hooks
│       │   ├── api/                # API client
│       │   └── store/              # Zustand store
│       ├── components/             # Shared components
│       └── providers/              # React Query, Theme
└── GEMINI.md                       # Coding conventions
```

## Features

- **Dashboard** - Stat cards, trend charts with filters, leaderboards
- **Machine Metrics** - Performance table with baseline comparison
- **Active Check-ins** - Virtualized list with dismiss actions
- **Dark Mode** - System detection + manual toggle
- **Error Handling** - Global error boundary with retry

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/metrics/checkins` | Check-in trends with filters |
| GET | `/metrics/machines` | Machine performance stats |
| GET | `/leaderboards` | Top Pokémon and types |
| GET | `/checkins/active` | Active check-in list |
| POST | `/checkins/dismiss/{id}` | Dismiss a check-in |

## Conventions

See [GEMINI.md](./GEMINI.md) for naming conventions and coding standards.
