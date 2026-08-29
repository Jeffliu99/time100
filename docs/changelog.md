# Time100 Documentation Change Log

## v1.1 - 2026-08-29

- Added the formal Specification First Development workflow.
- Added separate Design Spec and Feature Spec layers.
- Added the interaction principles for the collapsible Growth Tree.
- Clarified the specifications for Companion House, Companion Memory, animation, and performance.

## v1.0

- Established the Time100 product vision and specifications for the Growth Tree, Companion, Companion House, animation, privacy, and development workflow.

## Dependency Notes

### 2026-08-29

`npm audit` detected the following dependency chain:

```text
Prisma 7.10.0
-> @prisma/config 7.10.0
-> deepmerge-ts 7.1.5
```

A known high-risk vulnerability exists:

```text
CVE-2026-40345
```

Do not use `npm audit fix --force` at this time.

Reason:

The change would require downgrading or changing the Prisma version and could affect the existing system. Wait for an official Prisma fix, then perform a coordinated upgrade.
