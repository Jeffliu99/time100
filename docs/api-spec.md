# Time100 API Spec

## Authentication

所有写入个人数据的接口必须验证当前 Session。

未登录返回：

```json
{ "error": "Unauthorized" }
```

状态码：401。

## Tasks

- `GET /api/tasks`
- `POST /api/tasks`
- `PATCH /api/tasks/[id]`
- `DELETE /api/tasks/[id]`

当任务从非 DONE 变为 DONE 时，自动创建唯一的 `TASK_COMPLETED` GrowthEvent。

## Projects

- `GET /api/projects`
- `PATCH /api/projects/[id]`
- `DELETE /api/projects/[id]`

当项目从非 DONE 变为 DONE 时，自动创建唯一的 `PROJECT_COMPLETED` GrowthEvent。

## Companion

- `POST /api/companion`

保存用户确认的伙伴配置。服务端必须验证伙伴类型是否属于允许列表，不直接信任客户端传入的任意名称、类型或资源路径。
