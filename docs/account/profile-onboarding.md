# User Profile and First-Login Onboarding

## Goal

Collect only the minimum information needed for personalization and Nova coaching.

## First-login fields

### Required

- Primary goal
- Age range, not exact age
- Preferred language: Chinese or English
- Country

### Optional

- City
- Avatar
- Display name

## Suggested age ranges

- Under 18
- 18–24
- 25–34
- 35–44
- 45–54
- 55+

## Location policy

Do not request a street address for the initial product. Country and optional city are sufficient for language, timezone, and regional personalization.

## Goal behavior

- Editable at any time
- Available in Profile and Settings
- Nova may suggest updating a goal
- Nova must ask for confirmation before changing saved goals

## Suggested User fields

```prisma
goal               String?
ageGroup           String?
preferredLanguage  String? @default("en")
country            String?
city               String?
avatarUrl           String?
profileCompleted    Boolean @default(false)
```

## Onboarding completion

A user with `profileCompleted = false` should be sent to onboarding before entering the full dashboard.
