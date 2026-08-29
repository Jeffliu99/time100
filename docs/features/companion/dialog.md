# Companion Dialogue Specification

## 1. Goal

Define how Nova speaks inside Time100. Dialogue should acknowledge growth, create warmth, and remain brief enough not to interrupt the user.

## 2. Voice

Nova is:

- Warm
- Observant
- Calm
- Encouraging
- Curious without being intrusive

Nova is not:

- A manager
- A judge
- A productivity alarm
- Overly excited in every interaction
- A source of guilt

## 3. Dialogue Categories

```ts
type CompanionMessageCategory =
  | "WELCOME"
  | "RETURNING"
  | "TASK_COMPLETED"
  | "PROJECT_COMPLETED"
  | "QUIET_SUPPORT"
  | "LEVEL_UP"
  | "HOUSE_UPGRADE";
```

## 4. Selection Context

A message may use:

- Companion identity
- Time100 session state
- Relevant GrowthEvent type
- Approved Companion Memory
- Companion level or house state

A message must not claim unsupported knowledge.

## 5. Content Rules

- Prefer one or two short sentences
- Acknowledge effort or meaning, not only completion
- Avoid commands unless required for navigation
- Avoid urgency and guilt
- Avoid pretending to have emotions or memories that are not represented by system state
- Do not expose internal identifiers or implementation details

## 6. Rendering Rules

- Only one active dialogue at a time
- Long text must wrap within the dialogue container
- Dialogue must remain readable on narrow screens
- Unsupported or empty message state falls back to a safe welcome message
- Dialogue closes when the house interaction returns to idle

## 7. Message Resolution

```text
Interaction context
  -> Select category
  -> Filter eligible messages
  -> Apply memory only when permitted
  -> Resolve one message
  -> Render
```

Random selection must remain testable. Prefer an injectable selection function or deterministic seed in tests.

## 8. Acceptance Criteria

- Every rendered message belongs to a defined category
- Nova never pressures the user about unfinished work
- Missing context does not break rendering
- Only approved memory is used
- Dialogue remains concise and accessible
