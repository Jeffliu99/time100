import type { Language } from "@/types";

export type GuideCopy = ReturnType<typeof getGuideCopy>;

export function getGuideCopy(language: Language) {
  const zh = language === "zh";

  return {
    hero: {
      eyebrow: zh ? "TIME100 使用指南" : "TIME100 GUIDE",
      title: zh ? "把想法变成持续行动" : "Turn ideas into consistent action",
      description: zh
        ? "了解如何把目标转化为项目，把项目拆分为任务，并通过时间线和成长伙伴持续前进。"
        : "Learn how to turn goals into projects, projects into tasks, and daily action into a visible growth journey.",
      dashboard: zh ? "前往首页" : "Go to Dashboard",
      companion: zh ? "访问伙伴小屋" : "Visit Companion House",
    },
    workflow: {
      eyebrow: zh ? "核心流程" : "CORE WORKFLOW",
      title: zh ? "Time100 如何运作" : "How Time100 works",
      description: zh
        ? "从一个想法开始，经过规划和行动，逐步形成可见的成长记录。"
        : "Start with an idea, turn it into a plan, take action, and build a visible record of growth.",
      steps: [
        { icon: "💡", title: zh ? "捕捉" : "Capture", text: zh ? "记录重要目标和想法。" : "Capture important goals and ideas." },
        { icon: "📋", title: zh ? "规划" : "Plan", text: zh ? "把目标组织成项目。" : "Organize goals into projects." },
        { icon: "✅", title: zh ? "行动" : "Act", text: zh ? "把项目拆成可完成的任务。" : "Break projects into achievable tasks." },
        { icon: "🌱", title: zh ? "成长" : "Grow", text: zh ? "完成任务并积累成长记录。" : "Complete tasks and build a growth record." },
        { icon: "🏡", title: zh ? "陪伴" : "Companion", text: zh ? "与成长伙伴一起回顾旅程。" : "Reflect on the journey with your companion." },
      ],
    },
    features: {
      eyebrow: zh ? "核心功能" : "CORE FEATURES",
      title: zh ? "探索 Time100" : "Explore Time100",
      description: zh ? "三个核心区域帮助用户查看、行动和持续成长。" : "Three core areas help users review, act, and keep growing.",
      items: [
        {
          icon: "📊",
          title: zh ? "首页" : "Dashboard",
          text: zh ? "集中查看项目、任务、进度和剩余时间。" : "Review projects, tasks, progress, and remaining time in one place.",
          bullets: zh ? ["创建项目和任务", "更新任务状态", "查看项目进度"] : ["Create projects and tasks", "Update task status", "Review project progress"],
          href: "/",
          action: zh ? "打开首页" : "Open Dashboard",
        },
        {
          icon: "🌱",
          title: zh ? "时间线" : "Timeline",
          text: zh ? "查看已经完成的任务、项目和重要里程碑。" : "Review completed tasks, projects, and important milestones.",
          bullets: zh ? ["回顾已完成事项", "查看成长记录", "记录重要里程碑"] : ["Review completed work", "See growth records", "Track important milestones"],
          href: "/timeline",
          action: zh ? "查看成长旅程" : "View Growth Journey",
        },
        {
          icon: "🏡",
          title: zh ? "伙伴小屋" : "Companion House",
          text: zh ? "在专属空间里查看伙伴等级、经验值和共同成长。" : "Visit a personal space for companion level, XP, and shared growth.",
          bullets: zh ? ["查看伙伴状态", "进入成长旅程", "个性化伙伴设置"] : ["Review companion status", "Enter the growth journey", "Customize the companion"],
          href: "/companion",
          action: zh ? "进入伙伴小屋" : "Visit Companion House",
        },
      ],
    },
    routine: {
      eyebrow: zh ? "每日使用" : "DAILY ROUTINE",
      title: zh ? "一个简单的日常节奏" : "A simple daily rhythm",
      description: zh ? "不需要复杂流程，每天用几个小步骤保持方向。" : "Keep direction with a few small steps instead of a complicated routine.",
      items: [
        { icon: "☀️", title: zh ? "早晨查看" : "Morning review", text: zh ? "打开首页，确认今天最重要的任务。" : "Open the Dashboard and identify today's most important task." },
        { icon: "🎯", title: zh ? "专注行动" : "Focused action", text: zh ? "推进一个任务，并及时更新状态。" : "Move one task forward and keep its status current." },
        { icon: "🌱", title: zh ? "晚上回顾" : "Evening reflection", text: zh ? "查看时间线，确认今天完成了什么。" : "Review the Timeline and see what was completed." },
        { icon: "🏡", title: zh ? "伙伴陪伴" : "Companion moment", text: zh ? "进入伙伴小屋，回顾共同成长。" : "Visit the Companion House and reflect on shared growth." },
      ],
    },
    faq: {
      eyebrow: zh ? "快速解答" : "QUICK ANSWERS",
      title: zh ? "常见问题" : "Frequently asked questions",
      items: [
        {
          question: zh ? "Time100 是什么？" : "What is Time100?",
          answer: zh ? "Time100 是一个帮助用户组织项目、任务和成长记录的个人成长系统。" : "Time100 is a personal growth system for organizing projects, tasks, and growth records.",
        },
        {
          question: zh ? "项目和任务有什么区别？" : "What is the difference between a project and a task?",
          answer: zh ? "项目代表较大的目标或阶段，任务是推进项目的具体行动。" : "A project represents a larger goal or phase. A task is a specific action that moves the project forward.",
        },
        {
          question: zh ? "时间线记录什么？" : "What does the Timeline record?",
          answer: zh ? "时间线展示完成的任务、项目以及重要里程碑。" : "The Timeline shows completed tasks, completed projects, and important milestones.",
        },
        {
          question: zh ? "成长伙伴有什么作用？" : "What does the companion do?",
          answer: zh ? "成长伙伴提供一个个性化空间，用来查看伙伴状态并回顾共同成长。" : "The companion provides a personalized space for reviewing companion status and shared growth.",
        },
        {
          question: zh ? "在哪里修改语言和伙伴？" : "Where can language and companion settings be changed?",
          answer: zh ? "进入个人资料页面即可修改语言和伙伴相关设置。" : "Open the Profile page to update language and companion-related settings.",
        },
      ],
    },
    links: {
      eyebrow: zh ? "快速入口" : "QUICK LINKS",
      title: zh ? "继续探索" : "Continue exploring",
      items: [
        { icon: "📊", label: zh ? "首页" : "Dashboard", href: "/" },
        { icon: "🌱", label: zh ? "时间线" : "Timeline", href: "/timeline" },
        { icon: "🏡", label: zh ? "伙伴小屋" : "Companion", href: "/companion" },
        { icon: "👤", label: zh ? "个人资料" : "Profile", href: "/settings/profile" },
        { icon: "❓", label: zh ? "常见问题" : "FAQs", href: "/faqs" },
        { icon: "✉️", label: zh ? "联系我们" : "Contact", href: "/contact" },
      ],
    },
  };
}
