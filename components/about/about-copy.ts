import type { HomeLanguage } from "@/components/home/home-copy";

export function getAboutCopy(language: HomeLanguage) {
  const zh = language === "zh";

  return {
    hero: {
      eyebrow: zh ? "关于 TIME100" : "ABOUT TIME100",
      titleLine1: zh ? "大多数应用帮助用户记住任务。" : "Most apps help you remember tasks.",
      titleLine2: zh ? "Time100 帮助用户记住成长。" : "Time100 helps you remember growth.",
      description: zh
        ? "一个为希望把想法变成现实的人打造的个人成长操作系统。"
        : "A Growth Operating System for people who want to turn ideas into reality.",
      start: zh ? "免费开始" : "Start free",
      guide: zh ? "查看使用指南" : "Explore the Guide",
    },
    story: {
      eyebrow: zh ? "为什么创建 TIME100" : "WHY TIME100 EXISTS",
      title: zh ? "完成事项，不应该意味着忘记旅程" : "Finishing the work should not erase the journey",
      paragraphs: zh
        ? [
            "每天，人们都会设定目标。目标变成项目，项目被拆分成任务。",
            "任务完成后，清单被清空，项目被归档，而一路走来的努力往往被遗忘。",
            "Time100 的诞生，是为了连接行动与长期成长，让每一步都成为可以回顾的旅程。",
          ]
        : [
            "Every day, people set goals. Goals become projects, and projects become tasks.",
            "When the work is finished, lists are cleared and projects are archived, while the effort behind them is often forgotten.",
            "Time100 was created to connect action with long-term growth, so every step can become part of a journey worth remembering.",
          ],
      quote: zh ? "成长应该被看见。" : "Growth should be visible.",
    },
    method: {
      eyebrow: zh ? "TIME100 方法" : "THE TIME100 METHOD",
      title: zh ? "从想法到成长的完整路径" : "A complete path from idea to growth",
      description: zh
        ? "Time100 不只是记录下一件要做的事，而是连接整个成长过程。"
        : "Time100 does not only record the next thing to do. It connects the complete growth process.",
      steps: [
        { icon: "💡", title: zh ? "捕捉" : "Capture", text: zh ? "记录有意义的目标与想法。" : "Capture meaningful goals and ideas." },
        { icon: "📋", title: zh ? "规划" : "Plan", text: zh ? "把目标组织成清晰的项目。" : "Organize goals into clear projects." },
        { icon: "✅", title: zh ? "行动" : "Act", text: zh ? "把项目拆分成可以执行的任务。" : "Break projects into achievable actions." },
        { icon: "🌱", title: zh ? "成长" : "Grow", text: zh ? "完成任务，记录进步和里程碑。" : "Complete work and record progress and milestones." },
        { icon: "🏡", title: zh ? "陪伴" : "Companion", text: zh ? "与成长伙伴一起回顾长期旅程。" : "Reflect on the long-term journey with a companion." },
      ],
    },
    comparison: {
      eyebrow: zh ? "不只是效率" : "MORE THAN PRODUCTIVITY",
      title: zh ? "完成任务，与建立人生，是两件不同的事" : "Finishing tasks and building a life are not the same thing",
      traditionalTitle: zh ? "传统效率工具" : "Traditional productivity",
      traditional: zh
        ? ["创建任务", "完成任务", "清空列表", "忘记过程"]
        : ["Create a task", "Complete the task", "Clear the list", "Forget the process"],
      time100Title: "Time100",
      time100: zh
        ? ["捕捉目标", "建立项目", "持续行动", "记录成长", "保留旅程"]
        : ["Capture a goal", "Build a project", "Take consistent action", "Record growth", "Preserve the journey"],
      closing: zh
        ? "效率帮助用户完成工作，成长帮助用户建立值得回顾的人生。"
        : "Productivity helps people finish work. Growth helps people build a life worth looking back on.",
    },
    companion: {
      eyebrow: zh ? "成长伙伴" : "MEET YOUR COMPANION",
      title: zh ? "成长不必独自发生" : "Growth does not have to happen alone",
      description: zh
        ? "每一个完成的任务、每一个完成的项目、每一个重要里程碑，都可以成为用户与伙伴共同旅程的一部分。"
        : "Every completed task, every finished project, and every important milestone can become part of a shared journey with a companion.",
      points: zh
        ? ["查看伙伴等级与经验值", "回顾成长时间线", "保留共同成长的记忆"]
        : ["Review companion level and XP", "Reflect on the Growth Timeline", "Preserve memories of shared growth"],
      action: zh ? "访问 Luna 的小屋" : "Visit Luna's House",
    },
    roadmap: {
      eyebrow: zh ? "发展路线" : "ROADMAP",
      title: zh ? "从清晰行动，到更丰富的成长系统" : "From clear action to a richer growth system",
      available: {
        title: zh ? "现在可用" : "Available today",
        icon: "✓",
        items: zh
          ? ["公开产品首页", "项目与任务 Dashboard", "成长时间线", "成长伙伴小屋", "双语使用指南"]
          : ["Public product home", "Project and task Dashboard", "Growth Timeline", "Companion House", "Bilingual Guide"],
      },
      next: {
        title: zh ? "正在推进" : "In progress",
        icon: "…",
        items: zh
          ? ["成长成就", "伙伴升级体验", "高级成长分析", "完整帮助与支持中心"]
          : ["Growth achievements", "Companion evolution", "Advanced growth analytics", "Complete help and support center"],
      },
      future: {
        title: zh ? "未来愿景" : "Future vision",
        icon: "✦",
        items: zh
          ? ["AI 成长伙伴", "家庭账户", "原生移动应用", "社区成长挑战"]
          : ["AI growth companion", "Family accounts", "Native mobile apps", "Community growth challenges"],
      },
    },
    vision: {
      eyebrow: zh ? "我们的愿景" : "OUR VISION",
      title: zh ? "把想法变成现实。" : "Turn Ideas Into Reality.",
      lines: zh
        ? ["成长应该被看见。", "不仅是今天。", "也包括多年以后。"]
        : ["Growth should be visible.", "Not only today.", "But years from now."],
    },
    cta: {
      title: zh ? "准备开始成长旅程了吗？" : "Ready to begin your growth journey?",
      description: zh
        ? "免费创建第一个项目，让每一次行动都成为值得保留的成长记录。"
        : "Create your first project for free and turn every action into a growth record worth keeping.",
      start: zh ? "创建免费账户" : "Create free account",
      guide: zh ? "查看使用指南" : "Explore the Guide",
    },
  };
}
