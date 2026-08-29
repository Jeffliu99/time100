# Growth Tree

Status: Planning

## Goal

Display the hierarchical relationship between Life, Projects, Tasks, and Growth Events in a single interface, allowing users to progressively explore their growth world.

## Hierarchy

```text
Life
  -> Project
    -> Task
      -> Growth Event
```

## Requirements

- Projects are collapsed by default.
- Tasks are collapsed by default.
- Child nodes are rendered only when expanded.
- Each node manages its own expansion state.
- Expansion animation duration: 180–220ms.
- Use only:
  - transform
  - opacity
- Support reduced motion preferences.
- Interactions should remain light, fast, stable, and restrained.

## Performance Requirements

- Large trees should remain responsive.
- Expanding one node should not trigger noticeable re-rendering of the entire tree.
- Child nodes should be lazily rendered.

## User Experience

Users can:

1. Browse projects.
2. Expand a project to reveal tasks.
3. Expand a task to reveal growth events.
4. Open event details when available.

## Acceptance Criteria

- The tree remains clear with more than 10 projects.
- Expanding one node does not cause significant re-rendering of unrelated nodes.
- Users can navigate from a project to a task and then to growth event details.
- The mobile experience supports comfortable one-handed use.
