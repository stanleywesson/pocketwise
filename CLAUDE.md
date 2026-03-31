# PocketWise — Claude Notes

## Beads (bd) Task Tracker
- When tasks are first discussed in a session, run `bd prime` before any other bd commands.
- Always display tasks in table form (Phase, ID, Task, Status columns).
- Claude handles all beads (bd) administration and task tracking.
- Stan handles all project code, architecture, and implementation.

### Task hierarchy
Tasks are structured in three levels: **Epic → Feature (User Story) → Task**.
Dependencies enforce sequencing between peers, never between parent and child.

### Dependency rules
- Feature is blocked by the previous feature (sequential chain)
- User Story is blocked by the previous user story (within a feature)
- Task is blocked by the previous task (within a user story)
- **First task of a user story** is blocked by the **previous user story** — not by its own parent
- First task of the first user story of a feature has **no blocker** — it is immediately ready
- A feature, user story, or task **never blocks its own children**

### Status rules
- The active feature, its active user story, and the active task are all `in_progress` simultaneously
- A feature/user story stays `in_progress` until all children are closed — never closed early

### Scripting tip
When capturing a new issue ID from `bd create --silent`, use `tail -1 | tr -d '\r\n '` — NOT grep.
The output includes a warning line before the ID, and IDs have hierarchical suffixes (e.g. `pocketwise-uo2.1.5`)
that a simple grep pattern will miss.
