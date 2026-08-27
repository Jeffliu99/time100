import type { Project, Task, UserPreferences } from "@/types";

export const seedProjects: Project[] = [
  { id: "time100", name: "Time100", color: "#2563eb", phases: [{ id: "t1", title: "Phase 1 MVP" }, { id: "t2", title: "Phase 2 Database" }] },
  { id: "yuezicanada", name: "YueziCanada", color: "#0f766e", phases: [{ id: "y1", title: "Phase 1 Launch" }, { id: "y2", title: "Phase 2 Growth" }] },
  { id: "jiahuameal", name: "JiahuaMeal", color: "#b45309", phases: [{ id: "j1", title: "Phase 1 Commerce" }, { id: "j2", title: "Phase 2 Delivery" }] },
  { id: "name-generator", name: "Name Generator", color: "#7c3aed", phases: [{ id: "n1", title: "Phase 1 Prototype" }] },
  { id: "chinese-learning", name: "Chinese Learning", color: "#dc2626", phases: [{ id: "c1", title: "Phase 1 Pinyin" }] },
  { id: "delivery-saas", name: "Delivery SaaS", color: "#0891b2", phases: [{ id: "d1", title: "Phase 1 Internal" }] },
  { id: "ai-customer-service", name: "AI Customer Service", color: "#4f46e5", phases: [{ id: "a1", title: "Phase 1 Knowledge Base" }] },
];

export const seedTasks: Task[] = [
  { id: "1", title: "Time100 dashboard MVP", projectId: "time100", phaseId: "t1", status: "doing", priority: "high", order: 0, estimatedHours: 6, actualHours: 2, dueDate: "", createdAt: new Date().toISOString() },
  { id: "2", title: "YueziCanada remove remaining 404 pages", projectId: "yuezicanada", phaseId: "y1", status: "todo", priority: "high", order: 0, estimatedHours: 4, actualHours: 0, dueDate: "", createdAt: new Date().toISOString() },
  { id: "3", title: "JiahuaMeal package pricing and $100 deposit", projectId: "jiahuameal", phaseId: "j1", status: "todo", priority: "high", order: 1, estimatedHours: 12, actualHours: 0, dueDate: "", createdAt: new Date().toISOString() },
  { id: "4", title: "YueziCanada logo, header and favicon", projectId: "yuezicanada", phaseId: "y1", status: "done", priority: "medium", order: 0, estimatedHours: 4, actualHours: 5, dueDate: "", createdAt: new Date().toISOString() },
];

export const defaultPreferences: UserPreferences = {
  language: "zh",
  theme: "light",
  defaultProjectId: "time100",
};
