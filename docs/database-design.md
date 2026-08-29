# Time100 Database Design

## Core Models

### User

Stores login identity, display name, and the current companion configuration.

Companion fields include:

- `companionName`
- `companionGender`
- `companionType`
- `companionAvatar`
- `companionLevel`
- `companionXp`
- `companionCreatedAt`

### Project

Contains status, progress, priority, estimated time, actual time, and a collection of tasks.

### Task

Belongs to a Project and stores status, priority, order, estimated time, actual time, and due date.

### GrowthEvent

Stores factual growth events belonging to the user.

Key fields:

- `userId`
- `taskId`
- `projectId`
- `type`
- `title`
- `description`
- `importance`
- `createdAt`

## Data Rules

- Status changes and related GrowthEvents should be completed in a server-side transaction or the same API flow whenever possible.
- Use `taskId` or `projectId` together with the event type to prevent duplicates.
- Every query for user data must be scoped to the current user.
- Define the retention policy for growth records before deleting a project or task.
