# Companion Level Specification

## 1. Goal

Represent the depth of the user's continuing journey with a companion. Level reflects accumulated growth-world participation, not productivity pressure.

## 2. Principles

- No punishment for inactivity
- No level loss
- No competitive leaderboard
- No manipulative streak dependency
- Progress must come from defined growth signals
- Level language should emphasize companionship and world-building

## 3. Inputs

Possible progression inputs include:

- Meaningful GrowthEvents
- Project completion
- Task completion
- Approved companion interactions

Exact point values and thresholds must be defined in the canonical design specification before implementation. This document intentionally does not invent them.

## 4. State

```ts
interface CompanionProgress {
  companionType: "NOVA";
  level: number;
  experience: number;
  nextLevelExperience: number | null;
}
```

The canonical persistence model belongs in `docs/database-design.md`.

## 5. Progression Rules

- A source event must be processed idempotently
- One source must not award progress more than once
- Level calculation must be deterministic
- Progress writes must be server-authoritative
- UI animation must not be treated as persistence confirmation

## 6. UI Behaviour

- Show current level calmly
- Show progress without urgency
- Celebrate level-up with restrained feedback
- Do not display loss, overdue state, or shame language

## 7. Motion

Standard companion motion: `250–350ms`.

If particles are used for a level-up moment: `600–800ms`.

Only animate:

- `transform`
- `opacity`

## 8. Acceptance Criteria

- Reprocessing the same source does not duplicate progress
- Level never decreases through inactivity
- UI and persisted progress remain consistent after refresh
- No points or thresholds are hard-coded outside the canonical specification
- Progression works without requiring daily streaks
