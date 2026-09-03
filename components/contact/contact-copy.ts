import type { HomeLanguage } from "@/components/home/home-copy";

export function getContactCopy(language: HomeLanguage) {
  const zh = language === "zh";

  return {
    hero: {
      eyebrow: zh ? "联系 TIME100" : "CONTACT TIME100",
      title: zh ? "我们期待听到你的声音。" : "We'd love to hear from you.",
      description: zh
        ? "无论是问题、建议、功能想法、错误报告，还是合作咨询，都欢迎随时联系我们。"
        : "Questions, feedback, feature ideas, bug reports, and partnership inquiries are always welcome.",
      action: zh ? "发送邮件" : "Email us",
      response: zh ? "通常会在 1 至 3 个工作日内回复" : "We typically reply within 1–3 business days",
    },
    email: {
      eyebrow: zh ? "直接联系" : "DIRECT CONTACT",
      title: "hello@time100.ca",
      description: zh
        ? "可用于产品支持、建议反馈、功能提议和合作咨询。"
        : "For product support, feedback, feature suggestions, and partnership opportunities.",
      action: zh ? "写邮件给我们" : "Write to us",
    },
    feedback: {
      eyebrow: zh ? "选择主题" : "CHOOSE A TOPIC",
      title: zh ? "怎样可以帮助你？" : "How can we help?",
      description: zh
        ? "选择最接近的主题，我们会自动为邮件准备标题和基本内容。"
        : "Choose the closest topic and we'll prepare a helpful email subject and starter message.",
      items: [
        {
          icon: "💡",
          title: zh ? "建议新功能" : "Suggest a feature",
          text: zh
            ? "告诉我们什么功能可以让 Time100 的成长体验更好。"
            : "Tell us what could make the Time100 growth experience better.",
          action: zh ? "分享想法" : "Share an idea",
          subject: zh ? "Time100 功能建议" : "Time100 feature suggestion",
          body: zh
            ? "你好 Time100 团队，\n\n我想建议一个功能：\n\n这个功能可以帮助我：\n\n其他说明："
            : "Hello Time100 team,\n\nI'd like to suggest a feature:\n\nThis would help me:\n\nAdditional context:",
        },
        {
          icon: "🐞",
          title: zh ? "报告问题" : "Report a bug",
          text: zh
            ? "如果某个功能没有正常工作，请提供重现步骤和设备信息。"
            : "If something is not working, please include reproduction steps and device details.",
          action: zh ? "报告错误" : "Report an issue",
          subject: zh ? "Time100 错误报告" : "Time100 bug report",
          body: zh
            ? "你好 Time100 团队，\n\n出现问题的页面：\n\n发生了什么：\n\n重现步骤：\n1. \n2. \n3. \n\n设备与浏览器："
            : "Hello Time100 team,\n\nPage where the issue occurred:\n\nWhat happened:\n\nSteps to reproduce:\n1. \n2. \n3. \n\nDevice and browser:",
        },
        {
          icon: "❤️",
          title: zh ? "一般反馈" : "General feedback",
          text: zh
            ? "分享使用体验、意见或任何希望我们知道的内容。"
            : "Share your experience, thoughts, or anything you'd like us to know.",
          action: zh ? "发送反馈" : "Send feedback",
          subject: zh ? "Time100 使用反馈" : "Time100 feedback",
          body: zh
            ? "你好 Time100 团队，\n\n我想分享以下反馈："
            : "Hello Time100 team,\n\nI'd like to share the following feedback:",
        },
      ],
    },
    listen: {
      eyebrow: zh ? "为什么我们重视反馈" : "WHY WE LISTEN",
      title: zh ? "每一次改进，都从真实反馈开始。" : "Every improvement starts with real feedback.",
      description: zh
        ? "Time100 围绕真实用户的成长体验而构建。许多改进都来自用户提出的问题、想法和建议。"
        : "Time100 is built around real growth experiences. Many improvements begin with questions, ideas, and suggestions from people using the product.",
      flow: [
        { icon: "✉️", title: zh ? "你发送反馈" : "You send feedback" },
        { icon: "👀", title: zh ? "我们认真查看" : "We review it" },
        { icon: "💡", title: zh ? "想法进入规划" : "Ideas inform the roadmap" },
        { icon: "🚀", title: zh ? "Time100 持续成长" : "Time100 keeps growing" },
      ],
    },
    promise: {
      eyebrow: zh ? "回复承诺" : "RESPONSE PROMISE",
      title: zh ? "每一封邮件都会被认真对待" : "Every message is treated with care",
      items: [
        {
          icon: "📬",
          title: zh ? "一般咨询" : "General support",
          value: zh ? "1 至 3 个工作日" : "1–3 business days",
        },
        {
          icon: "💡",
          title: zh ? "功能建议" : "Feature requests",
          value: zh ? "定期评审" : "Reviewed regularly",
        },
        {
          icon: "🐞",
          title: zh ? "错误报告" : "Bug reports",
          value: zh ? "优先调查" : "Priority investigation",
        },
      ],
    },
    cta: {
      eyebrow: zh ? "共同建设" : "BUILD WITH US",
      title: zh ? "帮助塑造 Time100 的未来" : "Help shape the future of Time100",
      description: zh
        ? "每一个想法、错误报告和建议，都在帮助我们打造更好的个人成长操作系统。"
        : "Every idea, bug report, and suggestion helps us build a better Growth Operating System.",
      primary: zh ? "分享反馈" : "Share feedback",
      secondary: "hello@time100.ca",
    },
  };
}
