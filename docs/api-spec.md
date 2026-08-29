# Time100 API Specification

## Authentication

Every endpoint that writes personal data must validate the current session.

Unauthenticated response:

```json
{ "error": "Unauthorized" }
```

Status code: `401`.

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

## Companion

- `POST /api/companion`

Saves the companion configuration confirmed by the user. The server must verify that the companion type belongs to the allowed list. It must not directly trust arbitrary names, types, or asset paths provided by the client.
