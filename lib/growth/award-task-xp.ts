import { prisma } from "@/lib/prisma";
import { calculateCompanionLevel, TASK_COMPLETION_XP } from "@/lib/growth/xp";

// Call only after an owned task changes from non-DONE to DONE.
export async function awardTaskCompletionXp(userId:string){
  return prisma.$transaction(async(tx)=>{
    const user=await tx.user.update({where:{id:userId},data:{companionXp:{increment:TASK_COMPLETION_XP}},select:{companionName:true,companionXp:true,companionLevel:true}});
    const level=calculateCompanionLevel(user.companionXp);
    const leveledUp=level>user.companionLevel;
    if(leveledUp) await tx.user.update({where:{id:userId},data:{companionLevel:level}});
    return {companionName:user.companionName||"Companion",totalXp:user.companionXp,level,gainedXp:TASK_COMPLETION_XP,leveledUp};
  });
}
