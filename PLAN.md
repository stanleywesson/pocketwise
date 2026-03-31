# PocketWise — Project Plan

A mobile-first budget PWA built with Vue 3, designed to beat Excel for personal finance tracking.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Vue 3 + Vite |
| State | Pinia |
| Storage (Phase 1) | IndexedDB via Dexie.js |
| Storage (Phase 2) | C# API + SQLite |
| PWA | Vite PWA Plugin (Workbox) |
| Styling | Tailwind CSS + shadcn-vue |
| Charts | ApexCharts or Chart.js |

---

## Phases

### Phase 1 — Local-First MVP
- [ ] Project scaffold (Vue 3 + Vite + Tailwind + Pinia) + git init
- [ ] Dexie.js setup — schema includes `householdId` from day 1
- [ ] Transactions CRUD (add, edit, delete) + quick-add mobile flow
- [ ] Categories (default set + custom)
- [ ] Account support (cash, checking, credit card)
- [ ] Monthly budget per category + progress UI
- [ ] Local User Profiles — profile switcher simulating household concept
- [ ] PWA manifest + service worker (offline support)

### Phase 2 — Insights & Automation
- [ ] Dashboard with charts (donut per category, monthly bar chart)
- [ ] Spending trends analysis
- [ ] Recurring transactions (auto-populate subscriptions/rent)
- [ ] Smart categorization (remember past descriptions)
- [ ] CSV import (bank statement support)
- [ ] Month rollover (archive + fresh start)
- [ ] Tags beyond categories (e.g. "vacation", "work expense")

### Phase 3 — Backend + Auth
- [ ] C# API (ASP.NET Core minimal API)
- [ ] SQLite database with EF Core
- [ ] **User registration + login** (email + password, JWT tokens)
- [ ] **Household model** — users belong to a household; all data is household-scoped
  - Create household on registration
  - Invite members by email (e.g. spouse)
  - Accept / decline invite
  - Leave household
- [ ] **Permissions** — Owner (admin) vs Member (view + add)
- [ ] Sync layer (local IndexedDB → API on first login)
- [ ] Multi-device support

### Phase 4 — Polish
- [ ] Push notifications (budget threshold alerts)
- [ ] Dark mode
- [ ] Net worth tracker
- [ ] Export to CSV/PDF

---

## Key UX Principles

- **Mobile-first** — quick-add transaction in 2 taps
- **Offline-first** — works without internet, syncs when back
- **Fast** — no loading spinners for local operations
- **Visual** — progress bars and charts over raw numbers

---

## Folder Structure (planned)

```
pocketwise/
├── notes/
│   └── PLAN.md
└── app/
    ├── src/
    │   ├── components/
    │   ├── views/
    │   ├── stores/        # Pinia
    │   ├── db/            # Dexie schema
    │   └── composables/
    ├── public/
    └── index.html
```

---

## Auth & Multi-User Design

### The household model
Data is scoped to a **household**, not to an individual user. This means:
- **Couple sharing finances** — both belong to the same household and see the same accounts, transactions, and budgets
- **Friend with separate finances** — belongs to their own household (solo), sees only their data
- A user belongs to exactly **one household** at a time

### Phase 1 (local)
No real auth. The app uses **local profiles** (stored in IndexedDB) to simulate households. The user picks a profile on launch. All data is tagged with `householdId` from the start so the schema is compatible with Phase 3.

### Phase 3 (backend)
Real auth via C# API:
- Register / login with email + password → JWT token
- On first login, local data is synced to the API under the user's household
- Invite flow: user sends email invite → recipient accepts → both share the same household data
- The `householdId` field already exists in all local records, so migration is clean

---

## Notes & Decisions

- Using **IndexedDB (Dexie.js)** over localStorage — avoids 5MB limit, cleaner API, easier to swap for backend later
- Schema includes `householdId` from Phase 1 — no migration needed when real auth lands in Phase 3
- Phase 1 is fully offline — no backend required
- C# backend in Phase 3 uses SQLite so it stays lightweight and portable
