# Time100 Design Spec v1.1

Last Updated: 2026-08-29

## 1. Vision

Time100 不是普通任务管理工具。Time100 是帮助用户规划未来、记录行动、沉淀成长和回顾人生轨迹的成长操作系统。

用户不是单纯完成任务，而是在建设自己的成长世界。

## 2. Product Philosophy

- 成长感 > 炫酷感
- 陪伴感 > 功能堆叠
- 流畅感 > 动画数量
- 长期价值 > 短期刺激
- 用户控制 > 系统替用户决定
- 高级感 = 克制 + 一致 + 节奏

## 3. Mobile First

- 第一屏优先展示当前重点，而不是全部任务。
- 核心操作应可单手完成。
- 次要信息默认折叠或进入详情。
- 桌面端可以增加信息密度，但不改变核心流程。

## 4. Core Systems

1. Project
2. Task
3. GrowthEvent
4. Timeline / Growth Tree
5. Companion
6. Companion House
7. Companion Memory
8. XP and Level
9. Feedback System
10. AI Planning

## 5. GrowthEvent

GrowthEvent 是 Time100 的成长事实层。

当前事件类型：

- `TASK_COMPLETED`
- `PROJECT_COMPLETED`
- `MILESTONE`

记录规则：

- 只记录真实发生的事件。
- 不推断用户情绪。
- 使用 `taskId`、`projectId` 防止重复。
- 成长记录属于用户，可查看、导出和删除。

## 6. Timeline and Growth Tree

```text
个人成长
  └── 项目
        └── 任务
              └── 成长事件
```

### Global Timeline

显示用户全部项目、重要任务、项目完成和里程碑。项目默认收起，可逐层展开项目、任务和事件。

### Project Timeline

显示单个项目从创建、任务推进到项目完成的过程。

### Task Timeline

显示单个任务的创建、开始、修改、暂停、恢复和完成。

### Tree Interaction

- 项目默认收起。
- 任务默认收起。
- 同时只操作当前节点。
- 子节点展开时才渲染。
- 当前项目或最近成长可以自动展开。

### Tree Animation

- 展开：180 至 220ms
- 收起：可略快
- 箭头：`transform: rotate()`
- 节点：`transform` + `opacity`
- 子节点：可错开 20 至 40ms 出现
- 支持 `prefers-reduced-motion`

## 7. Companion System

产品名称统一为“成长伙伴”。成长伙伴不是普通 AI 助手，也不暗示拥有真实情感。

候选伙伴：

- Nova：成长型
- Luna：安静陪伴型
- Aria：积极激励型
- Hana：温暖型
- Leo：行动型
- Kai：沉稳型
- Atlas：挑战型
- Noah：平衡型

每个伙伴必须拥有独立语言节奏、常用词汇、鼓励方式、回忆方式、动画权重和视觉主题。

### Setup Wizard

```text
欢迎
→ 选择伙伴类型
→ 选择名字与人格
→ 预览形象
→ 用户确认
→ 保存至 User
→ 进入 Dashboard
```

### Message Types

- `WELCOME`
- `TASK_COMPLETED`
- `PROJECT_COMPLETED`
- `MEMORY`
- `LEVEL_UP`
- `GOODBYE`

对话必须基于真实成长数据，不猜测用户情绪，不制造焦虑或情感依赖。

## 8. Companion House

- 固定悬浮在视口右下角。
- 使用 `position: fixed`。
- 页面滚动不改变位置。
- 手机端缩小并避开底部安全区域。
- 点击后伙伴出现，显示简短对话，约 5 秒后自动回屋。

小屋等级：

- Lv1：小木屋
- Lv2：温馨小屋
- Lv3：成长小院
- Lv4：成长庄园
- Lv5：成长城堡

## 9. Companion Memory

记忆来源：GrowthEvent、项目完成、重要任务、里程碑、用户主动填写的反思、伙伴与小屋升级。

```text
真实成长事实
+ 用户自己的反思
+ 伙伴人格
= 有温度的成长记忆
```

用户可以编辑、删除或禁止伙伴引用某条记忆。

## 10. XP and Levels

建议经验值：

- 完成任务：+2 XP
- 完成项目：+20 XP
- 重要里程碑：+30 XP

伙伴等级：

- Lv1：成长种子
- Lv2：成长萌芽
- Lv3：成长旅者
- Lv4：成长探索者
- Lv5：成长守护者

经验值必须由服务端计算与保存，避免重复奖励。

## 11. Animation Language

统一原则：轻、快、稳、克制。

- Growth Tree：180 至 220ms
- Companion 出场：250 至 350ms
- 对话气泡：180 至 250ms
- 任务粒子：600 至 800ms
- 项目完成仪式：约 1.5 至 2 秒
- 小屋升级：约 2 至 2.5 秒

优先动画 `transform` 与 `opacity`；临时效果结束后应卸载；低性能设备提供 2D 降级；隐藏伙伴不持续占用 GPU。

## 12. 3D Companion

3D 是增强体验，不阻塞核心功能。

V1 使用 2D 或伪 3D 小屋、透明伙伴形象、CSS 过渡和气泡。V2 再加入 GLB/glTF 模型和 Idle、Walk、Wave、Talk、Celebrate、WalkHome 动作。

## 13. Privacy and Safety

- 所有成长内容默认私密。
- 成长属于用户。
- AI 只读取获得授权的内容。
- 分享前默认隐藏敏感信息。
- 伙伴不能被设计成替代现实关系的角色。

品牌承诺：

> Time100 记录成长，但成长属于用户。

## 14. Specification First Development

Time100 采用 SFD 开发模式。

```text
Idea
→ Design Spec
→ Feature Spec
→ Implementation
→ Build
→ Mobile Review
→ Design Review
→ Commit
→ Push
```

所有重大功能必须先有 Spec，后有 Code。Spec 是唯一事实来源。当代码与 Spec 不一致时，应优先修改代码以符合 Spec，或通过评审正式更新 Spec。

### Development Checklist

- [ ] 是否符合 Time100 Vision？
- [ ] 是否强化成长、陪伴或回顾价值？
- [ ] 手机第一屏是否清晰？
- [ ] 动画是否符合统一规范？
- [ ] 是否需要 GrowthEvent？
- [ ] 是否需要防重复来源 ID？
- [ ] 是否影响 Timeline、Memory、XP 或 Companion？
- [ ] `npm run build` 是否通过？
- [ ] Console、Dark Mode、Mobile、未登录状态是否正常？
- [ ] 数据权限是否正确？
