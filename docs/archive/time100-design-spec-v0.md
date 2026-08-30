# Time100 Design Specification v1.1

Last Updated: 2026-08-29

## 1. Vision

Time100 is not an ordinary task management tool. Time100 is a Growth Operating System that helps users plan their future, record actions, preserve growth, and review the path of their lives.

Users are not simply completing tasks. Users are building their own growth world.

## 2. Product Philosophy

- Sense of growth over visual spectacle
- Sense of companionship over feature accumulation
- Fluidity over animation quantity
- Long-term value over short-term stimulation
- User control over system decisions
- Premium quality = restraint + consistency + rhythm

## 3. Mobile First

- The first screen prioritizes the user's current focus rather than displaying every task.
- Core actions must support one-handed use.
- Secondary information is collapsed by default or placed in detail views.
- Desktop layouts may increase information density without changing the core workflow.

## 4. Core Systems

- Project
- Task
- GrowthEvent
- Timeline / Growth Tree
- Companion
- Companion House
- Companion Memory
- XP and Level
- Feedback System
- AI Planning

## 5. GrowthEvent

GrowthEvent is the factual growth layer of Time100.

Current event types:

- `TASK_COMPLETED`
- `PROJECT_COMPLETED`
- `MILESTONE`

Recording rules:

- Record only events that actually occurred.
- Do not infer the user's emotions.
- Use `taskId` and `projectId` to prevent duplicates.
- Growth records belong to the user and can be viewed, exported, and deleted.

## 6. Timeline and Growth Tree

```text
Personal Growth
  -> Project
    -> Task
      -> Growth Event
```

### Global Timeline

Displays all projects, important tasks, project completions, and milestones belonging to the user. Projects are collapsed by default and can be expanded progressively to reveal projects, tasks, and events.

### Project Timeline

Displays the journey of a single project from creation through task progress to project completion.

### Task Timeline

Displays the creation, start, modification, pause, resumption, and completion of a single task.

### Tree Interaction

- Projects are collapsed by default.
- Tasks are collapsed by default.
- Only the current node is affected by an interaction.
- Child nodes are rendered only when expanded.
- The current project or most recent growth may be expanded automatically.

### Tree Animation

- Expand: `180-220ms`
- Collapse: may be slightly faster
- Arrow: `transform: rotate()`
- Node: `transform` + `opacity`
- Child nodes may appear with a `20-40ms` stagger
- Support `prefers-reduced-motion`

## 7. Companion System

The official product term is **Growth Companion**.

A Growth Companion is not an ordinary AI assistant and must not imply that it has real emotions.

Candidate companions:

- Nova: growth-oriented
- Luna: quiet companionship
- Aria: positive encouragement
- Hana: warm
- Leo: action-oriented
- Kai: steady
- Atlas: challenge-oriented
- Noah: balanced

Every companion must have a distinct speaking rhythm, vocabulary, encouragement style, memory style, animation weight, and visual theme.

### Setup Wizard

```text
Welcome
-> Select companion type
-> Select name and personality
-> Preview appearance
-> User confirmation
-> Save to User
-> Enter Dashboard
```

### Message Types

- `WELCOME`
- `TASK_COMPLETED`
- `PROJECT_COMPLETED`
- `MEMORY`
- `LEVEL_UP`
- `GOODBYE`

Dialogue must be based on factual growth data. It must not guess the user's emotions, create anxiety, or encourage emotional dependency.

## 8. Companion House

- Fixed at the bottom-right of the viewport.
- Uses `position: fixed`.
- Page scrolling does not change its position.
- On mobile, reduce its size and avoid the bottom safe area.
- When the house is clicked, the companion appears and displays a short message, then returns home after approximately five seconds.

House levels:

- Lv1: Small Cabin
- Lv2: Cozy House
- Lv3: Growth Cottage
- Lv4: Growth Manor
- Lv5: Growth Castle

## 9. Companion Memory

Memory sources:

- GrowthEvent
- Project completion
- Important tasks
- Milestones
- Reflections entered by the user
- Companion and house upgrades

```text
Factual growth
+ the user's own reflection
+ companion personality
= a warm growth memory
```

Users can edit or delete a memory, or prevent the companion from referencing a specific memory.

## 10. XP and Levels

Suggested experience values:

- Complete a task: `+2 XP`
- Complete a project: `+20 XP`
- Important milestone: `+30 XP`

Companion levels:

- Lv1: Growth Seed
- Lv2: Growth Sprout
- Lv3: Growth Traveler
- Lv4: Growth Explorer
- Lv5: Growth Guardian

Experience must be calculated and stored by the server to prevent duplicate rewards.

## 11. Animation Language

Unified principles: light, fast, stable, and restrained.

- Growth Tree: `180-220ms`
- Companion entrance: `250-350ms`
- Dialogue bubble: `180-250ms`
- Task particles: `600-800ms`
- Project completion ceremony: approximately `1.5-2s`
- House upgrade: approximately `2-2.5s`

Prioritize animation of `transform` and `opacity`. Temporary effects must be unmounted after completion. Provide a 2D fallback for low-performance devices. Hidden companions must not continuously consume GPU resources.

## 12. 3D Companion

3D enhances the experience but must not block core functionality.

V1 uses a 2D or pseudo-3D house, transparent companion artwork, CSS transitions, and dialogue bubbles. V2 may add GLB/glTF models and the following actions:

- Idle
- Walk
- Wave
- Talk
- Celebrate
- WalkHome

## 13. Privacy and Safety

- All growth content is private by default.
- Growth belongs to the user.
- AI reads only content for which access has been authorized.
- Sensitive information is hidden by default before sharing.
- A companion must not be designed to replace real-world relationships.

Brand promise:

> Time100 records growth, but growth belongs to the user.

## 14. Specification First Development

Time100 uses the Specification First Development model.

```text
Idea
-> Design Spec
-> Feature Spec
-> Implementation
-> Build
-> Mobile Review
-> Design Review
-> Commit
-> Push
```

Every major feature must have a specification before code is written. Specifications are the single source of truth.

When code and specifications differ, update the code to follow the specification or formally update the specification through review.

### Development Checklist

- Does the feature align with the Time100 vision?
- Does it strengthen growth, companionship, or reflection value?
- Is the first mobile screen clear?
- Does the animation follow the unified specification?
- Does the feature require a GrowthEvent?
- Does it require a source ID to prevent duplicates?
- Does it affect Timeline, Memory, XP, or Companion?
- Does `npm run build` pass?
- Do the console, dark mode, mobile layout, and signed-out state work correctly?
- Are data permissions correct?
