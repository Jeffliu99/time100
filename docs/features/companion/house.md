# Companion House Specification

## 1. Goal

Provide a persistent, calm home for the user's companion. The house makes the growth world feel alive without competing with the user's main activity.

## 2. Positioning

The Companion House is fixed to the bottom-right of the viewport.

```css
position: fixed;
right: var(--companion-house-right);
bottom: var(--companion-house-bottom);
```

Page scrolling must not change its viewport position.

## 3. Core Interaction

```text
Idle in house
  -> User clicks house
  -> Nova appears
  -> Dialogue appears
  -> Wait 5 seconds
  -> Dialogue closes
  -> Nova returns home
  -> Idle
```

A new click while Nova is visible resets the auto-return timer.

## 4. State Model

```ts
type CompanionHousePhase =
  | "IDLE"
  | "APPEARING"
  | "TALKING"
  | "RETURNING";

interface CompanionHouseState {
  phase: CompanionHousePhase;
  isHouseVisible: boolean;
  activeMessage: string | null;
}
```

Derived UI state should be preferred over overlapping booleans.

## 5. Timing

- House press feedback: `180–220ms`
- Nova appearance: `250–350ms`
- Dialogue appearance: `180–220ms`
- Visible duration before auto-return: `5000ms`
- Nova return: `250–350ms`

Only animate `transform` and `opacity`.

## 6. Behaviour Rules

- The house remains available across supported application pages
- Only one companion dialogue may be active
- Timers must be cleared on unmount
- Reduced-motion preferences must be respected
- The component must not cause layout shift
- The house must not obscure critical controls on narrow screens
- Opening the house must not write a GrowthEvent

## 7. Suggested Component Boundary

```text
CompanionController
  -> CompanionHouse
  -> NovaAvatar
  -> CompanionDialog
```

Use client state for transient visibility and timer state. Persistent companion selection comes from the user companion record.

## 8. Accessibility

- House trigger uses a semantic button
- Provide an accessible label such as `Open Nova's house`
- Dialogue content is readable by assistive technology
- Do not move keyboard focus automatically for non-blocking dialogue
- Escape may close an open dialogue

## 9. Acceptance Criteria

- The house stays fixed during page scrolling
- Clicking it reveals Nova and one dialogue
- Nova returns home after five seconds
- Clicking again resets the timer
- Animation follows the Time100 motion language
- No unsupported CSS properties are animated
- Unmounting leaves no active timer
