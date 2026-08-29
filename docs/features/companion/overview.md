# Companion System Overview

## 1. Purpose

Companion is the emotional and relational layer of Time100.

Time100 is not a task manager. It is a Growth Operating System. The companion does not supervise productivity or pressure the user to complete tasks. It witnesses growth, remembers meaningful moments, and helps the user feel that they are building a living growth world.

## 2. Product Principles

- Growth before productivity
- Presence before interruption
- Encouragement without judgment
- Memory with clear boundaries
- Light, fast, stable, restrained interaction
- Specifications are the single source of truth

## 3. Initial Scope

The Companion System contains:

1. Companion Setup Wizard
2. Companion House
3. Welcome Messages
4. Companion Memory
5. Companion Level
6. House Upgrade

The first supported companion is **Nova**. Other planned companions are Luna, Aria, Hana, Leo, Kai, Atlas, and Noah.

## 4. Domain Boundaries

### Companion is responsible for

- Companion identity and user selection
- Companion presence and dialogue
- Growth-aware welcome messages
- Remembering approved growth context
- Companion progression
- House progression

### Companion is not responsible for

- Task enforcement
- Streak pressure
- Punishment or guilt
- Replacing Project, Task, GrowthEvent, or Timeline
- Acting as the source of truth for growth records

## 5. Relationship with Growth Domain

```text
Life
  -> Project
    -> Task
      -> GrowthEvent

GrowthEvent
  -> Companion reaction
  -> Optional memory
  -> Optional companion progress
```

GrowthEvent remains the factual record. Companion reactions are a presentation and relationship layer built on top of growth data.

## 6. Delivery Order

1. Nextra documentation site
2. Companion Setup Wizard
3. Companion House
4. Welcome Messages
5. Companion Memory
6. Companion Level
7. House Upgrade

## 7. Documentation Rule

```text
docs/ = Single Source of Truth
content/ = generated Nextra content
```

Do not edit generated files in `content/` manually. After updating specifications, run:

```bash
npm run docs:sync
```
