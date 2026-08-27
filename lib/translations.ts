import type { Language, Priority, TaskStatus } from "@/types";

const messages = {
  zh: {
    slogan: "把想法变成现实",
    projects: "项目",
    openTasks: "未完成任务",
    completed: "已完成",
    addTask: "添加任务",
    taskTitle: "任务名称",
    project: "项目",
    phase: "阶段",
    priority: "优先级",
    dueDate: "截止日期",
    estimatedHours: "预计工时",
    actualHours: "实际工时",
    save: "保存",
    cancel: "取消",
    delete: "删除",
    moveBack: "退回",
    start: "开始",
    finish: "完成",
    empty: "暂无任务",
    progress: "阶段进度",
    preferences: "偏好",
    language: "语言",
    theme: "主题",
    light: "浅色",
    dark: "深色",
    defaultProject: "默认项目",
    hours: "小时",
    remaining: "剩余预计",
    todayFocus: "今日重点",
  },
  en: {
    slogan: "Turn Ideas Into Reality",
    projects: "Projects",
    openTasks: "Open Tasks",
    completed: "Completed",
    addTask: "Add Task",
    taskTitle: "Task title",
    project: "Project",
    phase: "Phase",
    priority: "Priority",
    dueDate: "Due date",
    estimatedHours: "Estimated hours",
    actualHours: "Actual hours",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    moveBack: "Move back",
    start: "Start",
    finish: "Finish",
    empty: "No tasks",
    progress: "Phase progress",
    preferences: "Preferences",
    language: "Language",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    defaultProject: "Default project",
    hours: "hours",
    remaining: "Estimated remaining",
    todayFocus: "Today’s Focus",
  },
} as const;

export function getMessages(language: Language) {
  return messages[language];
}

export const statusLabels: Record<Language, Record<TaskStatus, string>> = {
  zh: { todo: "待办", doing: "进行中", done: "已完成" },
  en: { todo: "To Do", doing: "In Progress", done: "Completed" },
};

export const priorityLabels: Record<Language, Record<Priority, string>> = {
  zh: { high: "高", medium: "中", low: "低" },
  en: { high: "High", medium: "Medium", low: "Low" },
};
