# Project Rules & Conventions

## Tech Stack (Strict)

### Backend
- **Framework:** FastAPI (Python)
- **Database:** SQLite with raw SQL only — **no ORM**
- **Validation:** Pydantic models

### Frontend
- **Framework:** React + TypeScript (Vite)
- **Styling:** Tailwind CSS + shadcn/ui
- **Charts:** Recharts
- **State:** Zustand (global), @tanstack/react-query (server)
- **Validation:** Zod

---

## Folder Structure

```
src/
├── store/           # Global Zustand stores (themeStore.ts)
├── providers/       # QueryProvider, ThemeProvider
├── pages/
│   └── {feature}/   # Feature pages (Dashboard, etc.)
├── features/
│   └── {feature}/
│       ├── components/   # Feature-specific components
│       ├── hooks/        # Feature hooks
│       ├── store/        # Feature Zustand store
│       └── api/          # API calls
├── components/ui/   # shadcn/ui components
└── lib/             # Utilities
```

---

## Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Feature components | `{Feature}{Name}.tsx` | `PokemonStatCard.tsx` |
| Feature hooks | `use{Feature}{Name}.ts` | `usePokemonCheckins.ts` |
| Feature store | `{feature}Store.ts` | `pokemonStore.ts` |
| Feature API | `{feature}Api.ts` | `pokemonApi.ts` |
| Pages | `{Name}.tsx` | `Dashboard.tsx` |
| UI components | `{Name}.tsx` | `Button.tsx` |

---

## Backend Rules

1. **Raw SQL only** — use parameterized queries to prevent injection
2. **Comment SQL queries** — explain complex logic
3. **Handle nulls gracefully** — check for missing data
4. **Efficient queries** — no loading all rows into memory
5. **Pydantic models** — for all request/response types

---

## Frontend Rules

1. **TypeScript strict mode** — no `any` types
2. **Zod schemas** — validate API responses
3. **React Query** — for all server state
4. **Zustand** — for UI/client state only
5. **URL params** — persist filters for shareable links
6. **localStorage** — persist theme preference
7. **Loading/error/empty states** — handle all UI states

---

## Code Quality

- **No unused imports or variables**
- **Consistent formatting** — use Prettier defaults
- **Clear comments** — for non-obvious logic only
- **Type safety** — explicit types for function params and returns
- **Error handling** — try/catch with user-friendly messages

---

## UI/UX Requirements

- **System theme detection** + manual toggle
- **Large, readable fonts** — suitable for hallway TV display
- **High contrast** — easy to read from distance
- **Simple visualizations** — stat cards, bar/line charts
- **Confirmation dialogs** — for destructive actions
