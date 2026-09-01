# Time100 Task UI System

## Scope

This package adds a mobile-first task form and task completion flow.

## Supported fields

- Title
- Description
- Priority: Low, Medium, High
- Due date: Today, Tomorrow, Other date
- Completion and reopening

## Completion behavior

- Moving to `DONE` writes `completedAt`.
- Reopening clears `completedAt`.
- First completion creates a growth event and companion memory.
- Existing completion events are not duplicated.

## Accessibility

- Priority and date presets use toggle semantics.
- Loading actions expose `aria-busy` and disable repeated clicks.
- Inputs have labels.
- Errors use `role="alert"`.
- Focus uses `focus-visible` rings.

## Integration

Pass the current project ID into the form:

```tsx
<TaskForm projectId={project.id} />
```

Render task cards:

```tsx
{tasks.map((task) => <TaskCard key={task.id} task={task} />)}
```

## Required existing API

`POST /api/tasks` must accept `projectId`, `title`, `description`, `priority`, and `dueDate`.
