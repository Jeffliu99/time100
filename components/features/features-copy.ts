import type { HomeLanguage } from "@/components/home/home-copy";

export function getFeaturesCopy(language: HomeLanguage) {
  const zh = language === "zh";

  return {
    hero: {
      eyebrow: zh ? "TIME100 核心功能" : "TIME100 FEATURES",
      title: zh ? "把想法变成现实所需的一切" : "Everything you need to turn ideas into reality",
      description: zh
        ? "捕捉目标、管理项目、完成有意义的行动，并把每一步沉淀为长期成长记录。"
        : "Capture goals, manage projects, complete meaningful work, and turn every step into a lasting growth journey.",
      primary: zh ? "免费开始" : "Start free",
      secondary: zh ? "查看价格" : "View pricing",
    },
    value: {
      eyebrow: zh ? "不只是待办事项" : "MORE THAN A TO-DO LIST",
      title: zh ? "大多数工具管理任务，Time100 管理成长" : "Most tools manage tasks. Time100 manages growth.",
      description: zh
        ? "目标、项目、任务、完成记录、时间线和成长伙伴构成一个相互连接的系统。"
        : "Goals, projects, tasks, completed work, a Timeline, and a companion form one connected system.",
    },
    capabilities: {
      eyebrow: zh ? "完整能力" : "COMPLETE CAPABILITIES",
      title: zh ? "一个系统，覆盖完整成长过程" : "One system for the complete growth process",
      description: zh
        ? "从第一个想法到长期回顾，每个功能都服务于持续行动和可见成长。"
        : "From the first idea to long-term reflection, every feature supports consistent action and visible growth.",
      items: [
        { icon: "💡", title: zh ? "目标与想法" : "Goals and ideas", text: zh ? "在重要想法消失前记录下来，并把方向转化为清晰目标。" : "Capture meaningful ideas before they disappear and turn direction into clear goals." },
        { icon: "📋", title: zh ? "项目管理" : "Project management", text: zh ? "把较大的目标组织成可以推进、衡量和完成的项目。" : "Organize larger goals into projects that can be advanced, measured, and completed." },
        { icon: "✅", title: zh ? "可执行任务" : "Actionable tasks", text: zh ? "把项目拆分成明确的日常行动，并通过状态流转保持进度。" : "Break projects into clear daily actions and keep progress current through task status." },
        { icon: "🌱", title: zh ? "成长时间线" : "Growth Timeline", text: zh ? "查看已经完成的任务、项目和里程碑，而不只关注剩余事项。" : "Review completed tasks, projects, and milestones instead of only seeing what remains." },
        { icon: "🏡", title: zh ? "成长伙伴" : "Growth companion", text: zh ? "在专属小屋里查看伙伴等级、经验值和共同成长旅程。" : "Visit a personal house for companion level, XP, and a shared growth journey." },
        { icon: "📖", title: zh ? "回顾与记忆" : "Reflection and memory", text: zh ? "保留成就、过程和重要经验，让成长不随清单清空而消失。" : "Preserve achievements, process, and lessons so growth does not disappear with a cleared list." },
      ],
    },
    flow: {
      eyebrow: zh ? "连接式系统" : "A CONNECTED SYSTEM",
      title: zh ? "每一次行动都有去处" : "Every action has somewhere to go",
      description: zh
        ? "任务完成后不会简单消失，而是进入成长记录，丰富时间线，并成为伙伴旅程的一部分。"
        : "Completed work does not simply disappear. It becomes a growth record, enriches the Timeline, and contributes to the companion journey.",
      steps: [
        { icon: "🎯", title: zh ? "目标" : "Goal" },
        { icon: "📋", title: zh ? "项目" : "Project" },
        { icon: "✅", title: zh ? "任务" : "Task" },
        { icon: "✨", title: zh ? "完成" : "Completion" },
        { icon: "🌱", title: zh ? "时间线" : "Timeline" },
        { icon: "🏡", title: zh ? "伙伴" : "Companion" },
      ],
      closing: zh ? "没有一步被遗忘。每一次行动都成为长期成长的一部分。" : "Nothing is lost. Every action becomes part of long-term growth.",
    },
    dashboard: {
      eyebrow: zh ? "清晰总览" : "CLEAR DASHBOARD",
      title: zh ? "为成长设计的 Dashboard" : "A Dashboard designed for growth",
      description: zh
        ? "在一个页面中查看项目、未完成任务、已完成事项、预计时间和项目进度。"
        : "Review projects, open tasks, completed work, estimated time, and project progress in one place.",
      points: zh
        ? ["项目与任务集中管理", "待办、进行中、已完成状态", "预计时间与实际时间", "项目进度概览"]
        : ["Projects and tasks together", "To do, doing, and done status", "Estimated and actual time", "Project progress overview"],
    },
    timeline: {
      eyebrow: zh ? "成长有历史" : "GROWTH HAS A HISTORY",
      title: zh ? "不仅看下一步，也看已经走了多远" : "See not only what is next, but how far you have come",
      description: zh
        ? "传统待办工具主要关注下一项任务。Time100 还会保留完成的任务、项目和里程碑，让用户可以回顾长期成长。"
        : "Traditional to-do tools mainly focus on the next task. Time100 also preserves completed tasks, projects, and milestones for long-term reflection.",
      points: zh
        ? ["完成任务记录", "项目完成记录", "重要里程碑", "按时间回顾成长"]
        : ["Completed-task records", "Completed-project records", "Important milestones", "Growth organized over time"],
    },
    companion: {
      eyebrow: zh ? "成长伙伴" : "GROWTH COMPANION",
      title: zh ? "成长不必独自发生" : "Growth does not have to happen alone",
      description: zh
        ? "伙伴不仅是一个头像，而是把行动、经验值、等级和长期旅程连接起来的个性化体验。"
        : "A companion is more than an avatar. It connects action, XP, levels, and the long-term journey in a personal experience.",
      points: zh
        ? ["伙伴专属小屋", "等级与经验值", "共同成长记录", "未来伙伴进化体验"]
        : ["A personal companion house", "Levels and XP", "Shared growth records", "Future companion evolution"],
      action: zh ? "认识 Luna" : "Meet Luna",
    },
    compare: {
      eyebrow: zh ? "核心区别" : "THE DIFFERENCE",
      title: zh ? "从短期清单，到长期成长旅程" : "From a short-term checklist to a long-term growth journey",
      traditional: {
        title: zh ? "传统任务工具" : "Traditional task tools",
        items: zh ? ["关注待办事项", "任务完成后被清理", "短期执行视角", "独立使用体验"] : ["Focus on pending tasks", "Completed work is cleared", "Short-term execution view", "A mostly solo experience"],
      },
      time100: {
        title: "Time100",
        items: zh ? ["连接目标、项目和任务", "完成事项进入成长时间线", "长期成长视角", "成长伙伴共同陪伴"] : ["Connect goals, projects, and tasks", "Completed work enters the Growth Timeline", "Long-term growth perspective", "A companion shares the journey"],
      },
      action: zh ? "查看完整对比" : "View full comparison",
    },
    cta: {
      eyebrow: zh ? "开始成长" : "START GROWING",
      title: zh ? "准备把每一次行动变成成长了吗？" : "Ready to turn every action into growth?",
      description: zh
        ? "免费创建第一个项目，体验从目标、任务到时间线和成长伙伴的完整流程。"
        : "Create your first project for free and experience the complete flow from goals and tasks to the Timeline and companion.",
      primary: zh ? "免费开始" : "Start free",
      secondary: zh ? "查看使用指南" : "Explore the Guide",
    },
  };
}
