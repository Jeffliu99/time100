# Time100 Button Design System

## Goals

- Mobile-first touch targets
- Consistent visual and interaction states
- Keyboard and screen-reader accessibility
- Reusable variants for the entire application

## Variants

### Primary

Use for the main action on a screen, such as Save, Create, Continue, or Complete.

### Secondary

Use for Back, Cancel, Edit, Filter, and other supporting actions.

### Success

Use for successful completion actions.

### Danger

Use for destructive actions such as Delete.

### Ghost

Use for low-emphasis actions and compact navigation controls.

### Priority

- `low`: 🌱 Low
- `medium`: ✨ Medium
- `high`: 🔥 High

## Sizes

- `sm`: compact controls
- `md`: default buttons
- `lg`: primary mobile actions
- `icon`: square icon-only buttons

## Interaction states

### Hover

- Slight lift and scale
- Variant-specific border, background, or glow
- No hover movement when disabled or loading

### Active

- Slight downward movement
- Scale to 97 percent
- Remove elevated shadow

### Focus

Use `focus-visible` so keyboard users receive a clear focus ring without adding unnecessary rings after pointer interaction.

### Disabled

- Reduced opacity
- `not-allowed` cursor
- No hover, active, or shadow effects

### Loading

- Preserve button dimensions
- Show a spinner and loading label
- Disable interaction
- Set `aria-busy="true"`

## Accessibility

### `aria-busy`

Use for asynchronous action buttons while their operation is running.

```tsx
<Button loading loadingText="Saving...">
  Save Task
</Button>
```

### `aria-pressed`

Use only for toggle-style buttons such as priority, date presets, filters, and companion choices.

```tsx
<Button
  variant="priorityHigh"
  pressed={priority === "HIGH"}
  onClick={() => setPriority("HIGH")}
>
  🔥 High
</Button>
```

Do not use `aria-pressed` for Save, Delete, Login, Create, or other one-time actions.

### `aria-haspopup`

Use only when a button opens another interactive surface.

- `menu`: action menu
- `listbox`: selectable option list
- `dialog`: date picker or modal dialog

Pair it with `aria-expanded` when the open state is known.

```tsx
<Button
  variant="secondary"
  hasPopup="dialog"
  expanded={datePickerOpen}
  onClick={() => setDatePickerOpen(true)}
>
  📆 Other date
</Button>
```

### Icon-only buttons

Every icon-only button must have an accessible name.

```tsx
<Button size="icon" aria-label="Delete task" variant="danger">
  🗑️
</Button>
```

## Usage rules

1. Prefer one primary button per view or form section.
2. Use `type="button"` unless the button intentionally submits a form.
3. Use `loading` to prevent duplicate submissions.
4. Use `pressed` only for true toggle behavior.
5. Use `hasPopup` only when a popup is actually opened.
6. Keep visible labels short and action-oriented.
7. Do not communicate status using color alone. Include text or an icon.

## Implementation files

```text
components/ui/Button.tsx
components/ui/button-styles.ts
```

## Migration order

1. Task form and task cards
2. Dashboard navigation and actions
3. Timeline navigation and filters
4. Project forms and cards
5. Login and onboarding
6. Profile and settings
7. Companion controls

Replace buttons gradually and test each page on iPhone, desktop keyboard navigation, loading states, and disabled states.
