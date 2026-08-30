# Login Providers

## V1

- Google

## Planned

- Microsoft account
- Apple ID

## Requirements

- All providers must map into the same `User` model.
- Account linking must not expose one user's data to another account.
- OAuth production callback URLs must use the production domain.
- Localhost callback URLs should remain available for development.
- Login buttons must be large, clear, and touch-friendly on mobile.
- Successful login should redirect to onboarding for incomplete profiles, otherwise to `/dashboard`.
