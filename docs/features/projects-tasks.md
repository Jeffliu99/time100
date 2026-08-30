# Projects and Tasks

## Project-first rule

A task must belong to a valid project owned by the current user.

If there are no projects:

- Add Project remains enabled
- Add Task is disabled
- Show guidance to create the first project

## Project creation

V1 fields:

- Title
- Description, optional

Automatic fields:

- Created date
- Updated date
- Current user ID

## Task creation

V1 fields:

- Title
- Project
- Priority
- Estimated effort
- Due date, optional

## Priority input

For mobile, avoid complicated numeric entry. Use a compact visual selector:

- Low: 1
- Medium: 2
- High: 3

The UI may use numbered chips, bars, or simple icons. The selected level must remain clearly labeled for accessibility.

## Events

A separate general Event feature is not required for the initial release. Growth Events remain internal records generated from meaningful actions, such as task or project completion.

## Time-range preferences

Users may choose the default display window:

- One month
- Three months
- Six months
- All

The system should remember the preference per user.
