import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

async function main() {
  const { prisma } = await import("../lib/prisma");

  const learningCategory =
    await prisma.time100BlogCategory.findFirst({
      where: {
        slug: "learning",
      },
    });

  if (!learningCategory) {
    throw new Error("Learning category not found");
  }

  const post = await prisma.time100BlogPost.create({
    data: {
      categoryId: learningCategory.id,

      canonicalGroup: "language-learning",

      status: "published",

      translations: {
        create: [
          {
            language: "en",

            slug: "learn-language-consistently",

            title:
              "How to Learn a Language Consistently",

            excerpt:
              "A practical guide to building a sustainable language learning habit.",

            content: {
              blocks: [],
            },

            seoTitle:
              "How to Learn a Language Consistently",

            seoDescription:
              "Build a sustainable language learning routine and track long-term progress."
          },

          {
            language: "zh",

            slug: "learn-language-consistently",

            title:
              "如何长期坚持学习一门语言",

            excerpt:
              "建立持续语言学习习惯的实用指南。",

            content: {
              blocks: [],
            },

            seoTitle:
              "如何长期坚持学习一门语言",

            seoDescription:
              "建立长期稳定的语言学习习惯，并持续追踪成长进度。"
          }
        ]
      }
    },

    include: {
      translations: true,
      category: true,
    }
  });

  console.dir(post, {
    depth: null,
  });

  await prisma.$disconnect();
}

main().catch(console.error);