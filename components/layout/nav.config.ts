import type { Language } from "@/types";

export const NAV_ITEMS = [
  { href: "/", zh: "首页", en: "Dashboard" },
  { href: "/timeline", zh: "时间线", en: "Timeline" },
  { href: "/companion", zh: "成长伙伴", en: "Companion" },
  { href: "/guide", zh: "使用指南", en: "Guide" },
  { href: "/about", zh: "关于我们", en: "About" },
] as const;

export function getNavLabel(
  item: (typeof NAV_ITEMS)[number],
  language: Language,
) {
  return language === "zh" ? item.zh : item.en;
}
