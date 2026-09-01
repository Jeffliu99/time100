# Time100 Task Lifecycle

## Purpose

This document defines the official lifecycle, allowed transitions, deletion rules, data behavior, and user-interface requirements for Time100 tasks.

The lifecycle is designed to protect active work and preserve completed growth records.

---

## Task States

Time100 uses three task states:

```text
TODO
DOING
DONE
```

### TODO

The task is planned but work has not started.

Available actions:

- Start task
- Edit task
- Delete task

UI actions:

```text
▶ Start
✏️ Edit
🗑️ Delete
```

Deletion is allowed only in this state.

### DOING

The task is actively in progress.

Available actions:

- Return task to TODO
- Complete task
- Edit task

UI actions:

```text
↩ Back to To Do
✓ Complete
✏️ Edit
```

The Delete action must not be displayed or accepted while a task is in progress.

### DONE

The task has been completed and is part of the user's growth history.

Available actions:

- Reopen task in DOING
- Edit task

UI actions:

```text
↩ Reopen
✏️ Edit
```

The Delete action must not be displayed or accepted for a completed task.

---

## Allowed State Transitions

```text
TODO  → DOING
DOING → TODO
DOING → DONE
DONE  → DOING
```

Direct transitions between TODO and DONE are not part of the standard user flow.

```text
TODO ⇢ DONE   Not allowed through the standard UI
DONE ⇢ TODO   Not allowed through the standard UI
```

---

## Deletion Rules

A task may be deleted only when its current status is `TODO`.

```text
TODO   → Delete allowed
DOING  → Delete blocked
DONE   → Delete blocked
```

### User-interface rule

The Delete button must be rendered only when:

```ts
task.status === "TODO"
```

### API rule

The API must also enforce this restriction. Hiding a button in the user interface is not sufficient security or data protection.

If a client attempts to delete a `DOING` or `DONE` task, the API should return HTTP status `409 Conflict` with a clear message.

Example response:

```json
{
  "error": "Only TODO tasks can be deleted"
}
```

### Delete confirmation

Deleting a TODO task requires confirmation.

English:

```text
Delete this task? This action cannot be undone.
```

Chinese:

```text
确定删除这个待办任务吗？此操作无法撤销。
```

---

## Completion Behavior

When a task moves from `DOING` to `DONE`:

1. Set `status` to `DONE`.
2. Set `completedAt` to the current time.
3. Create a `TASK_COMPLETED` GrowthEvent if one does not already exist.
4. Create the related CompanionMemory if one does not already exist.
5. Refresh task counts and project progress.

```text
DOING
  ↓ Complete
DONE
  ↓
completedAt
GrowthEvent
CompanionMemory
Project progress
Timeline
```

---

## Reopen Behavior

When a task moves from `DONE` to `DOING`:

1. Set `status` to `DOING`.
2. Clear `completedAt`.
3. Keep the existing GrowthEvent as historical evidence of the earlier completion.
4. Do not create another completion event until the product's repeat-completion policy is explicitly defined.

```text
DONE
  ↓ Reopen
DOING
  ↓
completedAt = null
```

---

## Estimated Time Rules

A task must have a positive estimated duration.

Default value:

```text
1 hour
```

Minimum value:

```text
0.5 hours
```

Recommended input configuration:

```tsx
<input
  type="number"
  min={0.5}
  step={0.5}
/>
```

The client and API must both reject values below `0.5`.

---

## Status-specific Visual Design

### TODO visual style

- Neutral slate card
- Primary Start button
- Edit button
- Danger Delete button

### DOING visual style

- Blue-accented card
- Back button
- Green Complete button
- Edit button
- No Delete button

### DONE visual style

- Emerald-accented card
- Completed badge
- Task title shown with a line-through style
- Reopen button
- Edit button
- No Delete button

---

## Accessibility Requirements

- Action buttons must have visible text labels.
- Loading actions must use `aria-busy`.
- Disabled actions must use the native `disabled` attribute.
- Confirmation dialogs must clearly identify the destructive action.
- Status must not be communicated by color alone.
- Icons should support text labels rather than replace them.

---

## TaskCard Action Logic

Recommended rendering rules:

```tsx
{status === "TODO" && (
  <>
    <Button onClick={() => onMove("DOING")}>▶ Start</Button>
    <Button variant="secondary" onClick={onEdit}>✏️ Edit</Button>
    <Button variant="danger" onClick={onDelete}>🗑️ Delete</Button>
  </>
)}

{status === "DOING" && (
  <>
    <Button variant="secondary" onClick={() => onMove("TODO")}>
      ↩ Back to To Do
    </Button>
    <Button variant="success" onClick={() => onMove("DONE")}>
      ✓ Complete
    </Button>
    <Button variant="secondary" onClick={onEdit}>✏️ Edit</Button>
  </>
)}

{status === "DONE" && (
  <>
    <Button variant="secondary" onClick={() => onMove("DOING")}>
      ↩ Reopen
    </Button>
    <Button variant="secondary" onClick={onEdit}>✏️ Edit</Button>
  </>
)}
```

---

## API Enforcement Summary

The API is the final authority for lifecycle rules.

### PATCH

The API should:

- Validate requested status transitions.
- Set `completedAt` on `DOING → DONE`.
- Clear `completedAt` on `DONE → DOING`.
- Reject unsupported transitions.

### DELETE

The API should:

- Confirm the task belongs to the authenticated user.
- Permit deletion only when `status === "TODO"`.
- Reject deletion for `DOING` and `DONE` tasks.

---

## Lifecycle Summary

```text
TODO
├── Start → DOING
├── Edit
└── Delete with confirmation

DOING
├── Back → TODO
├── Complete → DONE
└── Edit

DONE
├── Reopen → DOING
└── Edit
```

Time100 principle:

> A planned task may be removed. Active commitments and completed growth records must first return through the task lifecycle rather than being deleted directly.
