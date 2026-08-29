import { prisma } from "@/lib/prisma";

export async function createGrowthEvent({
  userId,
  type,
  title,
  description,
}: {
  userId: string;
  type: string;
  title: string;
  description?: string;
}) {
  return prisma.growthEvent.create({
    data: {
      userId,
      type,
      title,
      description,
    },
  });
}