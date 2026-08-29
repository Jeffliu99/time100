# Companion Memory Specification

## 1. Goal

Enable the companion to remember meaningful, approved growth context so future interactions feel continuous and personal.

Companion Memory is not a replacement for GrowthEvent or Timeline. Growth records remain the factual source of truth.

## 2. Memory Principles

- Transparent: the user can understand what is remembered
- Minimal: store only what improves the growth experience
- Editable: supported memories can be reviewed or removed
- Respectful: no judgment, scoring, or manipulation
- Traceable: generated memory should reference its source type

## 3. Memory Sources

Initial supported sources may include:

- Explicit information provided by the user
- Completed Project GrowthEvents
- Completed Task GrowthEvents
- Companion setup choices

Automatic memory generation must not be implemented until its trigger and persistence rules are added to the database and API specifications.

## 4. Memory Shape

```ts
type CompanionMemorySource =
  | "USER"
  | "GROWTH_EVENT"
  | "SYSTEM";

interface CompanionMemory {
  id: string;
  userId: string;
  companionType: "NOVA";
  sourceType: CompanionMemorySource;
  sourceId: string | null;
  summary: string;
  createdAt: Date;
  updatedAt: Date;
}
```

This is a feature-level contract. The canonical Prisma model belongs in `docs/database-design.md`.

## 5. Write Rules

- Do not duplicate a memory for the same source and purpose
- Do not silently convert every GrowthEvent into memory
- Memory creation must have a defined trigger
- User-authored memory must preserve user intent
- Deleting a source record must follow the retention policy defined in the database specification

## 6. Read Rules

- Fetch only memories relevant to the current interaction
- Use a deterministic limit and order defined by the API specification
- Do not expose another user's memory
- Empty memory state must be supported

## 7. User Controls

The planned memory interface should support:

- Viewing remembered items
- Removing supported items
- Understanding why an item was remembered

Editing and bulk controls require separate feature specification before implementation.

## 8. Acceptance Criteria

- Memory is isolated by user
- Every stored memory has a source type
- Duplicate writes are prevented according to the API contract
- Companion interaction works when no memories exist
- Database and API specs are updated before code changes
