# Companion Setup Wizard Specification

## 1. Goal

Allow a user to meet and select a companion through a short, calm onboarding experience. The initial release supports Nova first while keeping the data model extensible for future companions.

## 2. Entry Conditions

Show the wizard when:

- The authenticated user has not completed companion setup, or
- The user explicitly opens companion settings to choose again in a future supported flow

The wizard must not replace authentication onboarding.

## 3. Primary Flow

```text
Welcome
  -> Meet Nova
  -> Choose Nova
  -> Confirm
  -> Enter Time100
```

## 4. Steps

### Step 1: Welcome

Explain that a companion will accompany the user's growth journey. Avoid productivity-management language.

### Step 2: Meet Nova

Show Nova's visual, name, and a short personality introduction.

### Step 3: Choose

The user selects Nova. The structure should support additional companions later without redesigning the flow.

### Step 4: Confirm

Persist the selection and mark companion setup as completed.

### Step 5: Completion

Close the wizard and make the Companion House available.

## 5. State

```ts
type CompanionSetupStep =
  | "WELCOME"
  | "MEET_COMPANION"
  | "CHOOSE_COMPANION"
  | "CONFIRM"
  | "COMPLETE";

type CompanionType = "NOVA";

interface CompanionSetupState {
  step: CompanionSetupStep;
  selectedCompanion: CompanionType | null;
  isSubmitting: boolean;
  error: string | null;
}
```

## 6. Persistence Requirements

Persist at minimum:

- selected companion type
- setup completion status
- setup completion timestamp, if supported by the database design

The database schema and API contract must be updated before implementation if these fields are not already specified.

## 7. Interaction Rules

- The user controls progression
- Back navigation is allowed before submission
- Repeated confirmation must not create duplicate companion records
- Submission must expose loading and error states
- The wizard must be keyboard accessible
- Focus must be managed when the modal opens and closes

## 8. Motion

Companion transitions use `250–350ms` and only:

- `transform`
- `opacity`

No layout animation or excessive particle effects.

## 9. Acceptance Criteria

- An eligible user sees the setup wizard
- Nova can be selected and confirmed
- Refreshing after success does not reopen first-time setup
- Failure does not lose the user's selection
- Completion reveals the Companion House
- Generated Nextra content is updated through `npm run docs:sync`
