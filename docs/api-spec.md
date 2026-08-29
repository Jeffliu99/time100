# Time100 API Specification

## Authentication

Every endpoint that writes personal data must validate the current session.

Unauthenticated response:

```json
{
  "error": "Unauthorized"
}
```

Status code: `401 Unauthorized`.

## Tasks

- `GET /api/tasks`
- `POST /api/tasks`
- `PATCH /api/tasks/[id]`
- `DELETE /api/tasks/[id]`

When a task changes from a non-`DONE` state to `DONE`, the server automatically creates one unique `TASK_COMPLETED` GrowthEvent.

## Projects

- `GET /api/projects`
- `PATCH /api/projects/[id]`
- `DELETE /api/projects/[id]`

When a project changes from a non-`DONE` state to `DONE`, the server automatically creates one unique `PROJECT_COMPLETED` GrowthEvent.

## Companion Setup

### Endpoint

```http
POST /api/companion/setup
```

### Goal

Create the user's initial companion configuration and complete the Companion Setup Wizard.

### Authentication

Authentication is required.

Unauthenticated response:

```json
{
  "error": "Unauthorized"
}
```

Status code: `401 Unauthorized`.

### Request Body

```json
{
  "companionType": "NOVA"
}
```

### Supported Companion Types

The planned companion types are:

- `NOVA`
- `LUNA`
- `ARIA`
- `HANA`
- `LEO`
- `KAI`
- `ATLAS`
- `NOAH`

Only `NOVA` is enabled in V1. Requests using other companion types must be rejected until those companions are enabled.

### Validation

The server must validate that:

- The current session belongs to an existing user.
- `companionType` is provided.
- `companionType` is enabled for the current version.

Invalid request response:

```json
{
  "error": "Invalid companion type"
}
```

Status code: `400 Bad Request`.

### Server Behavior

After the user confirms Nova, the server updates the current User with:

```text
companionSetupCompleted = true
companionType = "NOVA"
companionName = "Nova"
companionAvatar = default Nova avatar
companionCreatedAt = current server timestamp
```

The server is authoritative. The client must not directly control:

- `companionLevel`
- `companionXp`
- `companionCreatedAt`

### Idempotency

Repeated setup requests must not create duplicate companion data.

If setup has already been completed with the same valid companion configuration, the endpoint returns a successful response without resetting companion progress or creation time.

### Success Response

```json
{
  "success": true,
  "companionType": "NOVA"
}
```

Status code: `200 OK`.

### Error Responses

#### Unauthorized

```json
{
  "error": "Unauthorized"
}
```

Status code: `401 Unauthorized`.

#### Invalid Companion Type

```json
{
  "error": "Invalid companion type"
}
```

Status code: `400 Bad Request`.

#### Internal Server Error

```json
{
  "error": "Internal Server Error"
}
```

Status code: `500 Internal Server Error`.

### Acceptance Criteria

- Authentication is required.
- Only companion types enabled for the current version are accepted.
- Setup completion is stored on the current User.
- Repeated valid requests are safe and do not duplicate or reset companion data.
- Companion defaults and timestamps are controlled by the server.
- The contract can support additional companion types in future versions.
