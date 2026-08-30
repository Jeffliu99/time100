export const XP_PER_LEVEL = 100;
export const TASK_COMPLETION_XP = 10;
export function calculateCompanionLevel(totalXp:number){return Math.floor(Math.max(totalXp,0)/XP_PER_LEVEL)+1;}
