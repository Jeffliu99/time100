# Feature Spec: Project Timeline

Status: Planned for V2

## Goal

展示单个项目从创建、任务推进到完成的完整成长过程。

## Data

项目事件来自：

- projectId 对应的 GrowthEvent
- 项目下 taskId 对应的 GrowthEvent
- Project 与 Task 的基础资料

## Acceptance Criteria

- 只显示当前项目的数据。
- 任务可以继续展开查看事件。
- 项目完成事件位于时间轴终点。
