# Time100 Database Design

## Core Models

### User

保存登录身份、显示昵称和当前成长伙伴配置。

伙伴字段包括：

- companionName
- companionGender
- companionType
- companionAvatar
- companionLevel
- companionXp
- companionCreatedAt

### Project

包含状态、进度、优先级、预估时间、实际时间和任务集合。

### Task

属于一个 Project，保存状态、优先级、排序、预估时间、实际时间与截止日期。

### GrowthEvent

保存用户真实成长事实。

关键字段：

- userId
- taskId
- projectId
- type
- title
- description
- importance
- createdAt

## Data Rules

- 状态变化和成长事件尽量在服务端事务或同一 API 流程中完成。
- 使用 taskId/projectId 与事件类型防重复。
- 所有用户数据查询必须限定当前用户。
- 删除项目或任务前应明确成长记录的保留策略。
