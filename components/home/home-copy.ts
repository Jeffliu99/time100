export type HomeLanguage = "en" | "zh";

export function getHomeCopy(language: HomeLanguage) {
  const zh = language === "zh";

  return {
    nav: {
      workflow: zh ? "产品流程" : "How it works",
      features: zh ? "核心功能" : "Features",
      compare: zh ? "产品对比" : "Compare",
      pricing: zh ? "价格" : "Pricing",
      faq: zh ? "常见问题" : "FAQ",
      login: zh ? "登录" : "Log in",
      start: zh ? "免费开始" : "Start free",
    },
    hero: {
      eyebrow: zh ? "个人成长操作系统" : "A GROWTH OPERATING SYSTEM",
      title: zh ? "把想法变成持续成长" : "Turn ideas into consistent growth",
      description: zh
        ? "Time100 把目标、项目、任务、成长记录和成长伙伴连接在一个清晰的系统中。"
        : "Time100 connects goals, projects, tasks, growth records, and a personal companion in one clear system.",
      primary: zh ? "免费开始" : "Start free",
      secondary: zh ? "了解工作方式" : "See how it works",
      note: zh ? "无需信用卡。先体验完整成长流程。" : "No credit card required. Explore the complete growth flow first.",
    },
    workflow: {
      eyebrow: zh ? "TIME100 方法" : "THE TIME100 METHOD",
      title: zh ? "从一个想法，到可见的成长" : "From one idea to visible growth",
      description: zh
        ? "每一步都简单明确，并自然连接到下一步。"
        : "Each step is simple, clear, and naturally connected to the next.",
      steps: [
        { icon: "💡", title: zh ? "捕捉" : "Capture", text: zh ? "记录重要目标和想法。" : "Capture meaningful goals and ideas." },
        { icon: "📋", title: zh ? "规划" : "Plan", text: zh ? "把目标整理为项目。" : "Turn goals into organized projects." },
        { icon: "✅", title: zh ? "行动" : "Act", text: zh ? "把项目拆成具体任务。" : "Break projects into clear actions." },
        { icon: "🌱", title: zh ? "成长" : "Grow", text: zh ? "完成任务，形成成长记录。" : "Complete work and build a growth record." },
        { icon: "🏡", title: zh ? "陪伴" : "Companion", text: zh ? "与成长伙伴一起回顾旅程。" : "Reflect on the journey with a companion." },
      ],
    },
    features: {
      eyebrow: zh ? "核心体验" : "CORE EXPERIENCES",
      title: zh ? "不只是待办事项" : "More than a to-do list",
      description: zh
        ? "Time100 帮助用户查看当前、推动行动，并保留长期成长轨迹。"
        : "Time100 helps people review the present, move forward, and preserve a long-term growth journey.",
      cards: [
        { icon: "📊", title: zh ? "清晰总览" : "Clear Dashboard", text: zh ? "项目、任务、状态、进度和剩余时间集中展示。" : "See projects, tasks, status, progress, and remaining time together." },
        { icon: "🌱", title: zh ? "成长时间线" : "Growth Timeline", text: zh ? "把完成的任务、项目和里程碑沉淀为成长记录。" : "Turn completed tasks, projects, and milestones into a visible record." },
        { icon: "🏡", title: zh ? "成长伙伴" : "Growth Companion", text: zh ? "在专属小屋中查看伙伴、经验值和共同成长。" : "Visit a personal house for companion status, XP, and shared growth." },
      ],
    },
    difference: {
      eyebrow: zh ? "为什么选择 TIME100" : "WHY TIME100",
      title: zh ? "其他工具管理任务，Time100 记录成长" : "Other tools manage tasks. Time100 records growth.",
      description: zh
        ? "不同产品有不同重点。Time100 的核心定位是把执行与长期成长连接起来。"
        : "Different products serve different priorities. Time100 is designed to connect execution with long-term growth.",
    },
    pricing: {
      eyebrow: zh ? "简单价格" : "SIMPLE PRICING",
      title: zh ? "先免费体验，再按需要升级" : "Start free, then upgrade when needed",
      monthly: zh ? "月付" : "Monthly",
      yearly: zh ? "年付" : "Yearly",
      save: zh ? "年付更划算" : "Best annual value",
      free: {
        name: zh ? "免费版" : "Free",
        description: zh ? "适合完整体验 Time100 的核心流程。" : "A complete way to explore the core Time100 workflow.",
        price: "$0",
        period: zh ? "永久免费" : "forever",
        features: zh
          ? ["1 个项目", "最多 10 个任务", "Dashboard 总览", "成长时间线", "1 位成长伙伴", "基础成长记录"]
          : ["1 project", "Up to 10 tasks", "Dashboard overview", "Growth Timeline", "1 companion", "Basic growth records"],
        action: zh ? "免费开始" : "Start free",
      },
      pro: {
        name: "Pro",
        description: zh ? "适合希望长期使用和持续成长的用户。" : "For people ready to use Time100 as a long-term growth system.",
        monthlyPrice: "$9.99",
        yearlyPrice: "$39.99",
        monthlyPeriod: zh ? "/月" : "/mo",
        yearlyPeriod: zh ? "/年" : "/year",
        features: zh
          ? ["无限项目", "无限任务", "无限成长记录", "高级时间线", "伙伴成长与经验值", "里程碑与分析", "未来 AI 功能", "优先支持"]
          : ["Unlimited projects", "Unlimited tasks", "Unlimited growth records", "Advanced Timeline", "Companion growth and XP", "Milestones and analytics", "Future AI features", "Priority support"],
        action: zh ? "选择 Pro" : "Choose Pro",
      },
    },
    faq: {
      eyebrow: zh ? "常见问题" : "FAQ",
      title: zh ? "开始前需要了解的内容" : "What to know before starting",
      items: [
        { q: zh ? "Time100 是普通任务管理器吗？" : "Is Time100 a standard task manager?", a: zh ? "Time100 包含项目和任务管理，但重点是把行动、成长记录、时间线和成长伙伴连接起来。" : "Time100 includes project and task management, but its focus is connecting action, growth records, a Timeline, and a companion." },
        { q: zh ? "免费版可以使用什么？" : "What is included in Free?", a: zh ? "免费版包含 1 个项目、最多 10 个任务、Dashboard、时间线、1 位伙伴和基础成长记录。" : "Free includes 1 project, up to 10 tasks, the Dashboard, Timeline, 1 companion, and basic growth records." },
        { q: zh ? "可以以后再升级吗？" : "Can I upgrade later?", a: zh ? "可以。先免费体验，达到项目或任务上限后再决定是否升级 Pro。" : "Yes. Start free and decide whether to upgrade after reaching the project or task limit." },
        { q: zh ? "月付和年付价格是多少？" : "What are the monthly and annual prices?", a: zh ? "Pro 计划为每月 $9.99 或每年 $39.99。" : "Pro is $9.99 per month or $39.99 per year." },
      ],
    },
    cta: {
      title: zh ? "准备好把想法变成现实了吗？" : "Ready to turn ideas into reality?",
      description: zh ? "免费建立第一个项目，开始记录真正属于你的成长旅程。" : "Create your first project for free and begin a growth journey that belongs to you.",
      action: zh ? "创建免费账户" : "Create free account",
      login: zh ? "已有账户？登录" : "Already have an account? Log in",
    },
    footer: {
      description: zh ? "从目标到行动，再到长期成长。" : "From goals to action, and from action to long-term growth.",
      product: zh ? "产品" : "Product",
      company: zh ? "公司" : "Company",
      legal: zh ? "法律" : "Legal",
      about: zh ? "关于" : "About",
      contact: zh ? "联系我们" : "Contact",
      privacy: zh ? "隐私" : "Privacy",
      terms: zh ? "条款" : "Terms",
    },
  };
}
