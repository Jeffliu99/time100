# Authentication and Security

## Three-layer protection

### 1. Page protection

Private pages must verify the server session. If no valid user exists, redirect to `/login`.

Protected pages include:

- `/dashboard`
- `/timeline`
- `/companion`
- `/profile`
- `/settings`
- Any future user-data page

Recommended reusable server helper:

```ts
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function requireAuth() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return session;
}
```

### 2. API protection

Every private API must:

- Call `auth()`
- Return `401 Unauthorized` without a valid user
- Verify resource ownership before PATCH or DELETE
- Reject cross-user project/task references

### 3. Database isolation

Every personal query must include the current user's ID.

```ts
where: {
  userId: session.user.id,
}
```

New records must receive:

```ts
userId: session.user.id
```

## Token and session strategy

Auth.js manages authentication tokens and cookies. Application code should use the session returned by `auth()` rather than manually storing authentication tokens in Local Storage.

## Logout

Logout must clear the session and return the visitor to the public homepage:

```ts
signOut({ callbackUrl: "/" })
```
