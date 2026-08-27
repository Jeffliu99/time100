import { prisma } from "../lib/prisma";

async function main() {
  const projects = await prisma.project.findMany();

  const time100 = projects.find(p => p.title === "Time100");
  const yuezicanada = projects.find(p => p.title === "YueziCanada");
  const jiahuameal = projects.find(p => p.title === "JiahuaMeal");

  await prisma.task.createMany({
    data: [
      {
        title: "Time100 dashboard MVP",
        projectId: time100!.id,
        status: "DOING",
        priority: "HIGH",
        order: 0,
        estimated: 6,
        actual: 2,
      },
      {
        title: "YueziCanada remove remaining 404 pages",
        projectId: yuezicanada!.id,
        status: "TODO",
        priority: "HIGH",
        order: 0,
        estimated: 4,
        actual: 0,
      },
      {
        title: "JiahuaMeal package pricing and $100 deposit",
        projectId: jiahuameal!.id,
        status: "TODO",
        priority: "HIGH",
        order: 1,
        estimated: 12,
        actual: 0,
      },
      {
        title: "YueziCanada logo, header and favicon",
        projectId: yuezicanada!.id,
        status: "DONE",
        priority: "MEDIUM",
        order: 0,
        estimated: 4,
        actual: 5,
      },
    ],
  });

  console.log("Task seed complete");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });