# Time100 Project Lifecycle

## Purpose

This document defines the official lifecycle, completion rules, deletion rules, state transitions, and data protection policies for Time100 projects.

Projects represent meaningful commitments rather than simple folders.

A project can only be completed when all tasks are completed.

A project should never lose growth history accidentally.

---

# Project States

Time100 uses two project states:

```text
ACTIVE
COMPLETED
```

---

## ACTIVE

The project is currently being worked on.

The project may contain:

```text
TODO tasks
DOING tasks
DONE tasks
```

Available actions:

- Edit Project
- Add Task
- View Progress
- Complete Project (if eligible)

---

## COMPLETED

The project has finished.

Available actions:

- View Progress
- View Timeline
- Reopen Project

---

# Project State Transitions

```text
ACTIVE
  ↓
(all tasks DONE)
  ↓
COMPLETED
```

```text
COMPLETED
  ↓
(reopen task)
  ↓
ACTIVE
```

---

# Project Completion Rules

A project may only be completed when:

```text
All Tasks = DONE
```

Allowed:

```text
DONE
DONE
DONE
```

Blocked:

```text
DONE
DONE
TODO
```

or

```text
DONE
DOING
DONE
```

Message:

```text
Finish all tasks before completing this project.
```

Chinese:

```text
请先完成项目中的所有任务。
```

---

# Project Progress Formula

```text
Progress
=
Completed Tasks
÷
Total Tasks
× 100
```

Example:

```text
3 DONE
1 TODO
```

```text
75%
```

---

# Reopen Rules

If any DONE task is reopened:

```text
DONE
↓
DOING
```

the project automatically changes:

```text
COMPLETED
↓
ACTIVE
```

---

# Project Deletion Rules

## Case 1

Project contains no tasks.

```text
0 Tasks
```

Result:

```text
✅ Delete Allowed
```

---

## Case 2

Project contains only TODO tasks.

```text
TODO
TODO
TODO
```

Result:

```text
✅ Delete Allowed With Confirmation
```

Confirmation example:

```text
Delete Project?

This will also delete 3 TODO tasks.
```

---

## Case 3

Project contains DOING tasks.

```text
DOING
TODO
```

Result:

```text
❌ Delete Blocked
```

Reason:

```text
Active work exists.
```

---

## Case 4

Project contains DONE tasks.

```text
DONE
TODO
```

Result:

```text
❌ Delete Blocked
```

Reason:

```text
Growth history already exists.
```

---

# Delete Matrix

| Tasks | Delete |
|---------|---------|
| No Tasks | ✅ |
| Only TODO | ✅ Confirm |
| Contains DOING | ❌ |
| Contains DONE | ❌ |

---

# API Rules

## DELETE /api/projects/[id]

Allowed:

```text
No Tasks
```

or

```text
Only TODO Tasks
```

Blocked:

```text
Contains DOING
Contains DONE
```

Response:

```json
{
  "error": "Projects containing active or completed tasks cannot be deleted."
}
```

HTTP:

```text
409 Conflict
```

---

## PATCH Complete Project

Allowed:

```text
All Tasks DONE
```

Blocked:

```text
Any TODO
Any DOING
```

Response:

```json
{
  "error": "All tasks must be completed before completing the project."
}
```

---

# Growth Philosophy

```text
Task = Commitment
Project = Mission
```

Ideas may be deleted.

Commitments may not be discarded.

Growth history must be protected.

---

# Lifecycle Summary

```text
ACTIVE
│
├─ TODO
├─ DOING
├─ DONE
│
└─ all tasks DONE
      ↓
  COMPLETED
```

```text
COMPLETED
      ↓
 reopen task
      ↓
ACTIVE
```

Deletion:

```text
No Tasks            ✅
Only TODO Tasks     ✅
Contains DOING      ❌
Contains DONE       ❌
```

Completion:

```text
All DONE            ✅
Any TODO            ❌
Any DOING           ❌
```
