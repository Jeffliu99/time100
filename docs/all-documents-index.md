# Time100 English Documentation Index

Time100 is a Growth Operating System. This index lists the English product and development specifications maintained under `docs/`.

## Documentation Structure

```text
docs/
├── index.md
├── README.md
├── time100-design-spec.md
├── roadmap.md
├── database-design.md
├── api-spec.md
├── changelog.md
└── features/
    ├── index.md
    ├── growth-tree.md
    ├── project-timeline.md
    ├── task-timeline.md
    └── companion/
        ├── index.md
        ├── overview.md
        ├── setup-wizard.md
        ├── house.md
        ├── memory.md
        ├── level.md
        ├── dialog.md
        └── welcome-messages.md
```

## Core Documentation

| Document | Purpose |
| --- | --- |
| [Documentation Home](./index.md) | Main entry point for Time100 documentation |
| [Documentation Guide](./README.md) | Documentation structure and development workflow |
| [Design Specification](./time100-design-spec.md) | Master product specification and Single Source of Truth |
| [Roadmap](./roadmap.md) | V1, V2, and V3 development roadmap |
| [Database Design](./database-design.md) | Core models and data rules |
| [API Specification](./api-spec.md) | Authentication and core API contracts |
| [Change Log](./changelog.md) | Specification changes and dependency notes |

## Feature Documentation

| Document | Purpose |
| --- | --- |
| [Features Home](./features/index.md) | Entry point for all feature specifications |
| [Growth Tree](./features/growth-tree.md) | Hierarchical growth-world navigation |
| [Project Timeline](./features/project-timeline.md) | Timeline for a single project's growth journey |
| [Task Timeline](./features/task-timeline.md) | Lifecycle timeline for a single task |

## Companion System

| Document | Purpose |
| --- | --- |
| [Companion Home](./features/companion/index.md) | Entry point for the Companion System |
| [Overview](./features/companion/overview.md) | Companion purpose, principles, and boundaries |
| [Setup Wizard](./features/companion/setup-wizard.md) | Companion selection and onboarding flow |
| [House](./features/companion/house.md) | Fixed Companion House interaction and motion |
| [Memory](./features/companion/memory.md) | Companion memory sources, controls, and rules |
| [Level](./features/companion/level.md) | Companion progression and level rules |
| [Dialog](./features/companion/dialog.md) | Nova's voice, message categories, and rendering rules |
| [Welcome Messages](./features/companion/welcome-messages.md) | Welcome-message triggers and selection rules |

## Specification First Development

```text
Idea
-> Design Spec
-> Feature Spec
-> Implementation
-> Build
-> Review
-> Commit
-> Push
```

Specifications are the Single Source of Truth. Update the relevant specification before changing implementation code.
