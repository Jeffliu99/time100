# Nova Memory

## Purpose

Nova should remember useful long-term context while avoiding indiscriminate storage of every conversation.

## Memory categories

- User goals
- Preferences
- Important commitments
- Completed projects
- Significant milestones
- Recurring challenges
- Nova character preference

## Memory flow

1. Conversation produces a candidate memory.
2. Classify importance and category.
3. Ask for confirmation when the information is sensitive or ambiguous.
4. Store a short structured memory.
5. Retrieve only relevant memories for future conversations.
6. Allow the user to view, edit, or delete memories.

## Storage

Use structured database records linked to `userId`. Avoid storing unnecessary raw conversation content as permanent memory.

## User controls

- View what Nova remembers
- Delete an individual memory
- Clear all Nova memories
- Disable memory
- Correct inaccurate memory

## Quality objective

Better memory should mean more relevant continuity, not simply retaining more data.
