# Architecture Decisions

This document captures key technical decisions made during development.

---

## 1. React Suspense for Data Fetching

**Decision:** Use `useSuspenseQuery` from React Query instead of standard `useQuery`.

**Rationale:**
- Enables declarative loading states via `<Suspense>` boundaries
- Cleaner component code - no need for `isLoading` checks
- Better UX with skeleton placeholders during data fetch
- Requires Error Boundary for error handling

**Trade-off:** Components must be wrapped in Suspense boundaries.

---

## 2. Feature-Based Folder Structure

**Decision:** Organize code by feature (`features/pokemon/`) rather than by type.

**Rationale:**
- Co-locates related code (components, hooks, api, store)
- Easier to understand and maintain
- Scales well as features grow
- Clear ownership boundaries

---

## 3. Raw SQL over ORM

**Decision:** Use raw SQL with parameterized queries instead of SQLAlchemy ORM.

**Rationale:**
- Full control over query optimization
- No ORM abstraction overhead
- Explicit queries are easier to debug
- SQLite is simple enough to not need ORM
- Parameterized queries prevent SQL injection

**Example:**
```python
cursor.execute(
    "SELECT * FROM checkins WHERE machine_id = ?",
    (machine_id,)
)
```

---

## 4. FastAPI for REST API

**Decision:** Use FastAPI instead of Flask or Django.

**Rationale:**
- Built-in async support for high concurrency
- Automatic OpenAPI/Swagger documentation at `/docs`
- Native Pydantic integration for validation
- Type hints provide IDE autocomplete
- High performance (Starlette + Uvicorn)

---

## 5. Pydantic Models for Validation

**Decision:** Define all request/response schemas with Pydantic.

**Rationale:**
- Automatic request validation with clear errors
- Type coercion (strings → integers, etc.)
- Self-documenting API contracts
- Serialization/deserialization built-in
- Works seamlessly with FastAPI

---

## 6. SQLite for Database

**Decision:** Use SQLite instead of PostgreSQL or MySQL.

**Rationale:**
- Zero configuration - just a file
- Perfect for single-server deployment
- Fast for read-heavy dashboard workloads
- Easy to seed with test data
- No separate database service needed

**Trade-off:** Not suitable for write-heavy or distributed systems.

---

## 7. Connection Manager Pattern

**Decision:** Use context manager for database connections.

**Rationale:**
- Ensures connections are always closed
- Prevents connection leaks
- Clean `with` statement syntax
- Automatic rollback on exceptions

**Example:**
```python
@contextmanager
def get_db():
    conn = sqlite3.connect("database.db")
    try:
        yield conn.cursor()
        conn.commit()
    finally:
        conn.close()
```

---

## 8. RESTful API Design

**Decision:** Follow REST conventions for endpoints.

**Rationale:**
- `GET /metrics/checkins` - Read trends
- `GET /checkins/active` - Read active list
- `POST /checkins/dismiss/{id}` - Action on resource
- Predictable URL patterns
- Standard HTTP methods (GET, POST)

---

## 9. Zustand for UI State, React Query for Server State

**Decision:** Split state management between two libraries.

**Rationale:**
- **Zustand:** Simple, lightweight for theme/filters
- **React Query:** Handles caching, refetching, Suspense
- Clear separation of concerns
- Each tool used for its strength

---

## 10. Global Error Boundary

**Decision:** Single ErrorBoundary wrapping all routes in App.tsx.

**Rationale:**
- Catches all Suspense errors in one place
- Consistent error UI across the app
- Users can retry failed operations
- Prevents blank screens on API failures

---

## 11. Naming Conventions

**Decision:** Prefix all feature code with feature name (e.g., `PokemonStatCard`, `usePokemonLeaderboards`).

**Rationale:**
- Immediately identifies which feature code belongs to
- Prevents naming collisions
- Makes imports more explicit
- Consistent with component/hook patterns

---

## 12. Skeleton Components for Loading States

**Decision:** Create dedicated skeleton components for each data section.

**Rationale:**
- Better perceived performance
- Prevents layout shift
- Consistent loading experience
- Works naturally with Suspense

---

## 13. Virtualization for Long Lists

**Decision:** Use `@tanstack/react-virtual` for Active Check-ins page.

**Rationale:**
- Handles potentially hundreds of check-ins
- Only renders visible rows
- Maintains smooth scrolling
- Works with infinite query pagination
