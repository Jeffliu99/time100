# Project Timeline

Status: Planned for V2

## Goal

Visualize the complete growth journey of a single project, from creation through execution to completion.

## Data Sources

Project timeline data is derived from:

- Growth Events associated with the project
- Growth Events associated with tasks within the project
- Project metadata
- Task metadata

## Timeline Flow

```text
Project Created
    ↓
Task Activities
    ↓
Growth Events
    ↓
Project Completed
```

## Scope

The Project Timeline is limited to a single project context.

The timeline must not display events from unrelated projects.

## Interaction

- Tasks can be expanded to reveal related growth events.
- Events are displayed in chronological order.
- Timeline items can link to detailed views when available.

## Acceptance Criteria

- Only data belonging to the current project is displayed.
- Users can expand tasks to view underlying growth events.
- The project completion event appears at the end of the timeline.
- Events are displayed in chronological order.
