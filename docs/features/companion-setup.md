# Feature Spec: Companion Setup Wizard

Status: Planning

## Goal

让首次用户通过简单步骤选择并确认成长伙伴。

## Flow

```text
欢迎
→ 选择伙伴类型
→ 选择名字与人格
→ 预览形象
→ 确认
→ 保存
→ Dashboard
```

## Requirements

- V1 使用固定候选伙伴。
- 用户确认前不写入数据库。
- 保存成功后进入 Dashboard。
- 已有伙伴的用户不重复进入向导。
- API 必须验证候选伙伴白名单。

## Acceptance Criteria

- 未登录用户无法保存。
- 保存后 User 对应字段完整。
- 刷新后选择不会丢失。
