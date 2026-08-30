# Time100 v1.0 RC1 Release Checklist

## Security

- [ ] Every private page uses the shared auth guard
- [ ] Every private API requires authentication
- [ ] Every personal query filters by `userId`
- [ ] PATCH and DELETE verify ownership
- [ ] Cross-user project/task references are rejected
- [ ] Logout prevents access to private data
- [ ] Two-account isolation test passes

## Core product

- [ ] Create Project
- [ ] Add Task disabled with no projects
- [ ] Create Task under a valid project
- [ ] Update, move, complete, and delete Task
- [ ] Update and delete Project
- [ ] Dashboard statistics are accurate
- [ ] Timeline shows the current user's growth events

## Onboarding and profile

- [ ] First-login onboarding
- [ ] Goal
- [ ] Age range
- [ ] Language
- [ ] Country
- [ ] Optional city and avatar
- [ ] Profile editing

## Public experience

- [ ] Homepage
- [ ] Login page
- [ ] About
- [ ] FAQ
- [ ] Contact
- [ ] Privacy Policy
- [ ] Terms of Service
- [ ] Footer ownership and version

## Mobile

- [ ] Fixed mobile header
- [ ] Fixed bottom navigation
- [ ] Middle content scrolls correctly
- [ ] Safe-area support
- [ ] No horizontal overflow
- [ ] Long project/task lists remain manageable
- [ ] Tested at target widths

## Deployment

- [ ] Production environment variables configured
- [ ] Production OAuth callback configured
- [ ] `time100.ca` and `www.time100.ca` resolve correctly
- [ ] Production build succeeds
- [ ] Production login succeeds
