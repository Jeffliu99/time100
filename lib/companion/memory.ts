import { prisma } from "@/lib/prisma";

export async function createMemory({
  userId,
  title,
  content,
  type,
  importance = 1,
}: {
  userId: string;
  title: string;
  content: string;
  type: string;
  importance?: number;
}) {
  return prisma.companionMemory.create({
    data: {
      userId,
      title,
      content,
      type,
      importance,
    },
  });
}