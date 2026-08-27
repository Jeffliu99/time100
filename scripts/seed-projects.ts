import { prisma } from "../lib/prisma";

async function main() {
  await prisma.project.createMany({
    data: [
      { title: "YueziCanada" },
      { title: "JiahuaMeal" },
      { title: "Time100" },
      { title: "Name Generator" },
      { title: "Chinese Learning" },
      { title: "Delivery SaaS" },
      { title: "AI Customer Service" },
    ],
  });

  console.log("Seed complete");
}

main();