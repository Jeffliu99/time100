import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL was not loaded from .env.local",
    );
  }

  const { prisma } = await import("../lib/prisma");

  try {
    const categories =
      await prisma.time100BlogCategory.findMany({
        orderBy: {
          sortOrder: "asc",
        },
        include: {
          translations: {
            orderBy: {
              language: "asc",
            },
          },
        },
      });

    console.dir(categories, {
      depth: null,
    });
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(
    "Failed to load blog categories:",
    error,
  );

  process.exitCode = 1;
});