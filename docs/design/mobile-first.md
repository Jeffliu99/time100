# Mobile-First Requirements

## Core shell

On mobile:

- Header remains fixed
- Bottom navigation remains fixed
- Middle content scrolls vertically
- Respect iOS and Android safe areas
- Add sufficient top and bottom padding so content is not hidden

## Breakpoints

Validate at representative widths:

- 320 px
- 390 px
- 430 px
- 768 px
- 1024 px
- 1280 px and above

## Layout

### Mobile

- Single-column cards
- Full-width primary actions
- Task status groups stacked vertically
- Collapsed project/task summaries by default when lists are long

### Tablet

- One or two columns depending on content
- Keep touch targets large

### Desktop

- Multi-column dashboard
- Top navigation
- No mobile bottom navigation

## Long-list handling

- Filter by one month, three months, six months, or all
- Save the selected range in user preferences
- Collapse project groups
- Provide search and status filters
- Load more or paginate large histories
- Keep completed items out of the primary view unless requested

## Touch interaction

- Minimum comfortable touch targets
- Avoid hover-only controls
- Confirm destructive actions
- Consider swipe actions later, with visible alternatives

## App readiness

The web app should behave like an app shell so later PWA or native packaging requires less redesign.
