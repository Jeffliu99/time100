下面是 Time100 Blog 项目上下文，请基于此继续开发：

项目：Time100

技术栈：
- Next.js
- TypeScript
- Prisma 7
- PostgreSQL (Neon)
- Cloudflare R2
- Cloudflare CDN

Prisma:
generator client {
  provider = "prisma-client"
  output   = "../lib/generated/prisma"
}

当前已完成：

✅ time100_blog_categories
✅ time100_blog_category_translations

✅ time100_blog_posts
✅ time100_blog_post_translations

✅ 多语言架构
language:
- en
- zh

✅ Category数据

learning
career-growth
startup
personal-growth
productivity
time100-guides

✅ 第一篇测试文章

canonical_group:
language-learning

EN:
How to Learn a Language Consistently

ZH:
如何长期坚持学习一门语言

✅ Prisma查询验证成功

prisma.time100BlogCategory.findMany()

✅ Post + Translation查询验证成功

数据库设计：

time100_blog_categories
    ↓
time100_blog_category_translations

time100_blog_posts
    ↓
time100_blog_post_translations

Blog图片方案：

- 图片存 Cloudflare R2
- 数据库仅保存 URL
- featured_image
- featured_image_alt
- image_prompt（计划添加）

URL规划：

前台：
/blog
/blog/[slug]

后台：
/admin/blog/posts
/admin/blog/categories

当前开发目标：

实现 /admin/blog/posts
实现文章创建和编辑
支持：
- title
- slug
- category
- excerpt
- content
- featured_image
- featured_image_alt
- seo_title
- seo_description

