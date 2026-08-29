# Welcome Message Specification

## 1. Goal

Provide a calm greeting when Nova appears. Welcome messages should make Time100 feel alive while respecting the user's attention.

## 2. Trigger

A welcome message may appear when:

- The user opens Nova's house
- The user enters an eligible Time100 session and the product design explicitly allows automatic appearance

The initial Companion House flow uses user-initiated opening.

## 3. Message Context

Welcome resolution may consider:

- First interaction after companion setup
- Returning user state
- Relevant approved Companion Memory
- Recent supported GrowthEvent category

Time-of-day messaging must use an explicitly available and correctly localized time context. Do not infer it when unavailable.

## 4. Message Types

```ts
type WelcomeMessageType =
  | "FIRST_HELLO"
  | "GENERAL_RETURN"
  | "GROWTH_ACKNOWLEDGEMENT"
  | "QUIET_PRESENCE";
```

## 5. Initial Nova Copy

### First hello

> Hi, I'm Nova. I'll be here as your growth world takes shape.

### General return

> Welcome back. Your growth world is here when you're ready.

### Growth acknowledgement

> Something meaningful was added to your journey. I'm glad I got to see it.

### Quiet presence

> I'm here. We can take the next step whenever it feels right.

Copy localization should be handled by the project's localization strategy when one is defined.

## 6. Selection Rules

Priority order:

1. First hello, when setup has just completed
2. Growth acknowledgement, when supported context exists
3. General return
4. Quiet presence fallback

Avoid showing the same non-fallback message repeatedly when message history is available. Repetition policy requires an API or client-state contract before persistence is introduced.

## 7. Display Rules

- Display one message
- Begin the five-second auto-return timer after the message becomes visible
- User interaction may restart the timer
- Message animation uses `transform` and `opacity`
- Dialogue appearance uses `180–220ms`

## 8. Acceptance Criteria

- First setup produces the first-hello message
- Missing growth context uses a safe fallback
- Message text does not pressure the user
- Only one welcome message appears per house opening
- The house returns to idle after the defined timer
