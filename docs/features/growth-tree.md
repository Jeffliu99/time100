# Feature Spec: Growth Tree

Status: Planning

## Goal

在一个页面中展示个人成长、项目、任务和事件的层级关系，并支持逐层展开。

## Requirements

- 项目默认收起。
- 任务默认收起。
- 子节点展开时才渲染。
- 每个节点独立控制状态。
- 展开 180 至 220ms。
- 使用 transform 与 opacity。
- 支持 reduced motion。

## Acceptance Criteria

- 10 个以上项目时页面仍清晰。
- 展开一个节点不会导致整棵树明显重渲染。
- 可以从项目进入任务，再查看事件详情。
- 手机端可单手操作。
