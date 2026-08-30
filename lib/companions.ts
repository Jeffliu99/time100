export const companions = [
  {
    id: "luna",
    name: "Luna",
    type: "supporter",
    avatar: "/companions/luna.svg",
    title: { en: "Warm and supportive", zh: "温暖、耐心、支持型" },
    description: {
      en: "A calm companion who encourages steady progress.",
      zh: "用温和的方式陪伴你持续前进。",
    },
  },
  {
    id: "orion",
    name: "Orion",
    type: "achiever",
    avatar: "/companions/orion.svg",
    title: { en: "Focused and action-oriented", zh: "专注、直接、行动型" },
    description: {
      en: "A direct companion who keeps the next action clear.",
      zh: "帮助你聚焦下一步，并推动行动。",
    },
  },
] as const;

export type CompanionId = (typeof companions)[number]["id"];

export function findCompanion(id: unknown) {
  return companions.find((item) => item.id === id);
}
