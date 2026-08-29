# Feature Spec: Companion House

Status: Planning

## Goal

在 Dashboard 右下角提供持续但不打扰的成长伙伴入口。

## Requirements

- 使用 fixed 定位。
- 页面滚动时位置不变。
- 点击后伙伴从小屋上方出现。
- 显示短对话，约 5 秒后自动回屋。
- 小屋不遮挡关键操作。
- 手机端使用较小尺寸并避开安全区域。

## Animation

- 出场 250 至 350ms。
- 气泡 180 至 250ms。
- 使用 transform 与 opacity。
- 支持 reduced motion。

## Acceptance Criteria

- 点击可打开与收起。
- 滚动页面时位置固定。
- 连续点击不会产生多个计时器或重复角色。
