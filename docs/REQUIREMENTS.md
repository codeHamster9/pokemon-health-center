# Guardio – Fullstack Backoffice Assignment: Build a Pokémon Center Dashboard

## 🧭 Overview

Your task is to build a mini internal dashboard for Pokémon Centers. It should visualize healing activity, show machine performance, and allow managing Pokémon currently being treated.

You'll use a provided SQLite database (`clinic.sqlite`) and write SQL queries (no ORM) to power your backend. Your goal is to demonstrate end-to-end thinking, data visualization skills, and pragmatic engineering.

---

## ⚙️ Requirements

### Tech Stack
* **Backend:** Python (FastAPI or Flask)
* **Frontend:** React + TypeScript + shadcn/ui + Recharts
* **Database:** SQLite (provided file)

### Using AI Tools
Using AI tools (e.g., ChatGPT, GitHub Copilot, Cursor) for this assignment is acceptable. However, please note that any code submitted will be treated as 100% your own work. You are responsible for understanding and owning all decisions made in your solution. Be prepared to explain your choices and trade-offs.

---

## 🧩 Database Schema

### `pokemon`
| Column | Type | Note |
| :--- | :--- | :--- |
| `id` | INTEGER | PK |
| `name` | TEXT | |
| `type_primary` | TEXT | e.g. fire, water |
| `type_secondary` | TEXT | nullable |

### `machines`
| Column | Type | Note |
| :--- | :--- | :--- |
| `id` | INTEGER | PK |
| `name` | TEXT | |
| `model` | TEXT | |
| `location` | TEXT | |

### `checkins`
| Column | Type | Note |
| :--- | :--- | :--- |
| `id` | INTEGER | PK |
| `pokemon_id` | INTEGER | FK → `pokemon.id` |
| `machine_id` | INTEGER | FK → `machines.id` |
| `arrived_at` | DATETIME | |
| `healed_at` | DATETIME | nullable |
| `initial_hp` | INT | |
| `max_hp` | INT | |
| `outcome` | TEXT | 'success' or 'fail' |

---

## 🧠 What to Build

### 1. Overview Dashboard
The main screen should be an Overview dashboard that displays all relevant charts and graphs. This screen may be displayed on hallway TV-screens, so visualizations should be simple, easy to consume, and designed for passive viewing.

**Suggested metrics to display (you decide which are most relevant):**
* Total check-ins (today/week)
* Overall success rate
* Active check-ins count
* Top performing machine
* Recent check-ins trend
* Leaderboards (top Pokémon and top types by successful heals)

**Suggested layout structure (you decide the best approach):**
* Grid-based layout (e.g., 2-3 columns) with large, readable cards
* Large font sizes suitable for viewing from a distance
* Simple visualizations (stat cards, simple bar charts, or simplified line charts)
* Clear, high-contrast visuals
* Include date range picker and filters (date range, group by day/hour, segment by type/Pokémon) for the check-ins trend visualization

> **Note:** Machine Metrics and Active Check-ins should remain as separate pages accessible via navigation.

### 2. Machine Metrics
* Table showing each machine's:
    * Total check-ins
    * Success rate
    * Current Pokémon being treated (if any) - show Pokémon name, type, and arrival time
* Dropdown to choose a baseline machine and see comparison deltas in performance (bonus)
* Data from `/metrics/machines` and `/metrics/machines/compare`

### 3. Active Check-ins
* Separate screen showing Pokémon currently being treated (no `healed_at`)
* Each entry should have a "Dismiss" button that opens a confirmation dialog
* On confirm: call `/checkins/dismiss/:id` to mark as healed
* Reflect changes immediately in the UI

### 4. UX Polish
* Respect system dark/light mode
* Add a toggle to switch themes
* Keep filters and theme persistent (via URL or localStorage)
* Include clear loading, empty, and error states

---

## 🧮 Backend Endpoints

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/metrics/checkins` | GET | Check-ins over time with optional filters |
| `/metrics/machines` | GET | Machine success rates and totals |
| `/metrics/machines/compare` | GET | Compare all machines vs a baseline |
| `/leaderboards` | GET | Top Pokémon and top Pokémon types |
| `/checkins/active` | GET | Pokémon currently being treated |
| `/checkins/dismiss/:id` | POST | Mark a Pokémon as healed |

### Notes
* **Use raw SQL, not an ORM**
* Handle missing data and nulls gracefully
* Avoid loading unnecessary rows (e.g., don't fetch all check-ins into memory)
* Include clear comments in SQL queries

---

## 🧱 Deliverables

* `/backend`: FastAPI or Flask app
* `/frontend`: React app
* `README.md`: how to run, assumptions, and design choices
* `DECISIONS.md`: explaining decisions, trade-offs, and what you'd do next
* Your code should run locally against `clinic.sqlite` (no setup scripts needed)

**Time Expectation:** Spend up to 4–5 hours. If you don't finish everything, submit what you have.

*Feel free to expand and go off script if you feel you have the time. We appreciate creativity and going beyond the basic requirements!*

---

## ✅ Evaluation Criteria

|**Area**|**What we look for**|
|---|---|
|**Architecture**|Clean structure, logical separation of backend/frontend|
|**SQL usage**|Correct, simple, and efficient queries|
|**Frontend UX**|Intuitive, responsive charts and tables|
|**State management**|Predictable updates after filters/dismissals|
|**Performance awareness**|Efficient querying, no heavy loops|
|**Code quality**|Type safety, error handling, clarity|
|**Documentation**|Clear setup, assumptions, and next steps|
