# Feature Spec: Companion Memory

Status: Planned for V2

## Goal

让成长伙伴基于真实成长事实进行有上下文的回顾和反馈。

## Sources

- GrowthEvent
- Project
- Task
- Milestone
- 用户主动填写的反思

## Rules

- 不默认保存普通闲聊。
- 不推断用户情绪。
- 优先使用高重要度事件。
- 用户可以编辑、删除和禁止引用。
- 未授权私密内容不得进入伙伴对话。

## Acceptance Criteria

- 每条回忆可追溯到真实来源。
- 删除或禁用记忆后伙伴不再引用。
- 不生成来源中不存在的事实。
