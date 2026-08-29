# Feature Spec: Task Timeline

Status: Planned for V2

## Goal

展示单个任务的生命周期。

## Planned Events

- TASK_CREATED
- TASK_STARTED
- TASK_UPDATED
- TASK_PAUSED
- TASK_RESUMED
- TASK_COMPLETED

## Acceptance Criteria

- 只显示当前任务的数据。
- 每个事件有真实时间与来源。
- 完成事件不可因重复请求而重复创建。
