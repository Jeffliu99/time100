这是 Time100 当前项目交接文档。请先完整阅读，并以仓库实际代码为准继续开发。当前目标：开发 /admin/blog/posts 第一版 CMS。

# Time100 项目上下文与开发交接文档

> 用途：在新的 Copilot 聊天中上传或粘贴本文件，让新聊天快速了解 Time100 当前架构、已完成功能、技术决策、数据库状态和下一步开发目标。
>
> 更新时间：2026-09-04
>
> 说明：本文件根据当前聊天记录整理。开始下一项开发前，请以 GitHub 仓库、`prisma/schema.prisma`、数据库实际结构和本地构建结果为最终依据。

---

## 1. 项目概述

Time100 是一个个人成长管理 SaaS，核心定位不是普通待办事项工具，而是：

```text
Growth Operating System
个人成长操作系统
```

核心品牌表达：

```text
Turn Ideas Into Reality.

Most apps help you remember tasks.
Time100 helps you remember growth.
```

产品试图连接完整成长路径：

```text
Goal / Idea
→ Project
→ Task
→ Completion
→ Growth Timeline
→ Companion
```

---

## 2. 技术栈

```text
Frontend: Next.js App Router
Language: TypeScript
Styling: Tailwind CSS
Authentication: NextAuth, Google Sign In
ORM: Prisma 7.10.0
Database: PostgreSQL on Neon
Database adapter: @prisma/adapter-pg
Storage: Cloudflare R2, planned for Blog images
Version control: GitHub
Email: Microsoft 365 through GoDaddy
Domain email: hello@time100.ca
```

### Prisma Client 配置

`prisma/schema.prisma`：

```prisma
generator client {
  provider = "prisma-client"
  output   = "../lib/generated/prisma"
}
```

Prisma 7 Client 不从 `@prisma/client` 直接实例化，而从自定义输出目录导入。

### Prisma 单例

当前 `lib/prisma.ts`：

```ts
import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

独立脚本应复用：

```ts
const { prisma } = await import("../lib/prisma");
```

脚本需先加载 `.env.local`：

```ts
import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});
```

然后再动态导入 Prisma，避免 `DATABASE_URL` 在 adapter 初始化后才加载。

---

## 3. GitHub 状态

曾确认过以下提交已存在并与远端同步：

```text
fcba5b4 feat: add public homepage and shared user menu
```

此后还完成了 Header、About、Contact、Footer、Features 与 Blog 数据库相关修改。新聊天开始后，请运行以下命令确认最新状态：

```bash
git status
git log -5 --oneline
```

推送标准流程：

```bash
npm run build
git add -A
git commit -m "<clear commit message>"
git push origin main
git status
```

---

## 4. 已完成的公开网站功能

### 4.1 Home

公开首页路由：

```text
/
```

首页已经从过去的 Dashboard 路由调整为公开产品首页。

登录用户和未登录用户都可以访问 Home。

### 4.2 登录流程

登录页：

```text
/login
```

已修复登录后返回 Home 的问题：

```ts
callbackUrl: "/dashboard"
```

登录页检测到已登录 Session 后：

```ts
router.replace("/dashboard");
```

正确流程：

```text
Home
→ Login
→ Google Sign In
→ /dashboard
```

### 4.3 Dashboard

Dashboard 独立路由：

```text
/dashboard
```

### 4.4 共享用户菜单

首页 PublicHeader 与产品 AppHeader 共用用户下拉菜单：

```text
components/layout/UserMenu.tsx
```

菜单包含：

```text
My Profile / 我的资料
Settings / 设置
Companion House / 伙伴小屋
Guide / 使用指南
Contact Us / 联系我们
Log out / 退出登录
```

退出登录返回：

```text
/
```

### 4.5 AppHeader

主要文件：

```text
components/layout/AppHeader.tsx
components/layout/nav.config.ts
```

导航规划：

```text
Home        /
Dashboard   /dashboard
Timeline    /timeline
Companion   /companion
Guide       /guide
About       /about
```

`isActive()` 必须特殊处理 `/`，否则 `pathname.startsWith("/")` 会让 Home 在所有页面都高亮：

```ts
function isActive(href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
```

### 4.6 PublicHeader

主要文件：

```text
components/home/PublicHeader.tsx
```

未登录显示：

```text
Language
Log in
Start free
```

已登录显示：

```text
Language
Dashboard
UserMenu
```

首页和公开页面均允许登录用户返回，不应强制跳转到 Dashboard。

### 4.7 About 页面

公开路由：

```text
/about
```

文件结构：

```text
app/about/page.tsx
components/about/AboutLanding.tsx
components/about/about-copy.ts
```

页面内容：

```text
Hero
Why Time100 Exists
The Time100 Method
Traditional Productivity vs Time100
Meet Your Companion
Roadmap
Vision
CTA
```

重要：About 应位于公开路由：

```text
app/about/page.tsx
```

不要同时保留：

```text
app/(protected)/about/page.tsx
```

否则可能产生重复 `/about` 路由冲突。

### 4.8 Contact 页面

公开路由：

```text
/contact
```

文件结构：

```text
app/contact/page.tsx
components/contact/ContactLanding.tsx
components/contact/contact-copy.ts
```

功能：

```text
中英文切换
hello@time100.ca 邮件入口
Suggest a Feature
Report a Bug
General Feedback
预填邮件 Subject 与 Body
反馈流程
Response Promise
移动端全宽 CTA
```

当前 Contact 使用 `mailto:`，第一版不依赖后端 Contact Form。

### 4.9 Features 页面

公开路由：

```text
/features
```

文件结构：

```text
app/features/page.tsx
components/features/FeaturesLanding.tsx
components/features/features-copy.ts
```

页面内容：

```text
SEO Metadata
Hero + CTA
Time100 Value Proposition
Six Core Capabilities
Connected Growth Flow
Dashboard Preview
Timeline Preview
Luna Companion
Comparison Preview
Final CTA
```

页面链接到：

```text
/pricing
/compare
```

如果这些页面尚未创建，链接会暂时 404。

### 4.10 PublicFooter

主要文件：

```text
components/home/PublicFooter.tsx
```

旧 Footer 使用：

```text
#workflow
#features
#compare
#pricing
#faq
```

在 About、Contact 等页面上会变成当前页面的锚点，例如 `/about#workflow`，但页面不存在对应节点。

已调整为独立路由方向：

```text
/
/features
/compare
/pricing
/guide
/about
/contact
/faqs
/privacy
/terms
/login
```

并显示品牌邮箱：

```text
hello@time100.ca
```

注意：未创建的路由仍会 404。发布前应创建页面，或暂时从 Footer 隐藏尚未完成的链接。

---

## 5. 已存在或已讨论的产品区域

根据当前项目与导航，Time100 已包含或正在使用：

```text
Authentication
Dashboard
Projects
Tasks
Timeline
Growth Events
Mood Logs
Companion
Companion Memory
Guide
Profile
Settings
Public Home
About
Contact
Features
Shared User Menu
```

数据库已有核心模型在聊天中被提及：

```text
Account
Project
Task
GrowthEvent
MoodLog
CompanionMemory
```

具体字段和实现请以 `prisma/schema.prisma` 为准。

---

## 6. 品牌邮箱

已申请：

```text
hello@time100.ca
```

邮箱服务：

```text
Microsoft 365 Email through GoDaddy
```

用途：

```text
Contact 页面
Footer
产品反馈
功能建议
Bug 报告
合作咨询
Google OAuth 联系邮箱
```

未来可考虑：

```text
support@time100.ca
noreply@time100.ca
```

但当前 `hello@time100.ca` 已足够。

---

## 7. 数据库领域隔离决策

当前 Neon 数据库暂时由多个网站共用：

```text
Time100
jiahuameal.com
yuezicanada.com
```

已有 Blog 系统由：

```text
jiahuameal.com
yuezicanada.com
```

共同使用。

长期命名规则决定：

### Time100 核心表

Time100 已有核心表可保留现状，Blog 使用明确前缀：

```text
time100_blog_*
```

### JiaHua / YueziCanada 表

未来月子餐业务表统一使用：

```text
jiahua_*
```

例如：

```text
jiahua_blog_posts
jiahua_blog_categories
jiahua_customers
jiahua_orders
```

目的：未来拆分数据库、仓库或部署时更容易迁移。

---

## 8. Time100 Blog 最终数据模型

第一版已经创建并迁移以下 4 张表：

```text
time100_blog_categories
time100_blog_category_translations
time100_blog_posts
time100_blog_post_translations
```

### 8.1 Prisma Models

模型名称：

```text
Time100BlogCategory
Time100BlogCategoryTranslation
Time100BlogPost
Time100BlogPostTranslation
```

数据库表名用 `@@map()` 映射为 snake_case。

当前推荐结构：

```prisma
model Time100BlogCategory {
  id           String   @id @default(uuid())
  slug         String   @unique @db.VarChar(120)
  sortOrder    Int      @default(0) @map("sort_order")
  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @updatedAt @map("updated_at")

  translations Time100BlogCategoryTranslation[]
  posts        Time100BlogPost[]

  @@map("time100_blog_categories")
}

model Time100BlogCategoryTranslation {
  id          String   @id @default(uuid())
  categoryId  String   @map("category_id")
  language    String   @db.VarChar(10)
  name        String   @db.VarChar(100)
  description String?
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  category Time100BlogCategory @relation(fields: [categoryId], references: [id], onDelete: Cascade)

  @@unique([categoryId, language])
  @@map("time100_blog_category_translations")
}

model Time100BlogPost {
  id             String    @id @default(uuid())
  categoryId     String?   @map("category_id")
  canonicalGroup String?   @map("canonical_group") @db.VarChar(120)
  status         String    @default("draft") @db.VarChar(20)
  viewCount      Int       @default(0) @map("view_count")
  currentVersion Int       @default(1) @map("current_version")
  publishedAt    DateTime? @map("published_at")
  createdAt      DateTime  @default(now()) @map("created_at")
  updatedAt      DateTime  @updatedAt @map("updated_at")

  category     Time100BlogCategory?        @relation(fields: [categoryId], references: [id], onDelete: SetNull)
  translations Time100BlogPostTranslation[]

  @@index([status])
  @@index([categoryId])
  @@index([publishedAt])
  @@map("time100_blog_posts")
}

model Time100BlogPostTranslation {
  id               String    @id @default(uuid())
  postId           String    @map("post_id")
  language         String    @db.VarChar(10)
  slug             String    @db.VarChar(120)
  title            String    @db.VarChar(255)
  excerpt          String?
  content          Json
  featuredImage    String?   @map("featured_image")
  featuredImageAlt String?   @map("featured_image_alt")
  imagePrompt      String?   @map("image_prompt")
  seoTitle         String?   @map("seo_title") @db.VarChar(255)
  seoDescription   String?   @map("seo_description")
  publishedAt      DateTime? @map("published_at")
  createdAt        DateTime  @default(now()) @map("created_at")
  updatedAt        DateTime  @updatedAt @map("updated_at")

  post Time100BlogPost @relation(fields: [postId], references: [id], onDelete: Cascade)

  @@unique([postId, language])
  @@unique([language, slug])
  @@index([language, publishedAt])
  @@map("time100_blog_post_translations")
}
```

注意：`imagePrompt` 最后被讨论为计划/新增字段。新聊天必须检查当前 `schema.prisma` 和 migration，确认该字段是否已经迁移。`featuredImageAlt` 已确认迁移成功。

### 8.2 Migration 状态

Blog 基础表 migration 已成功应用：

```text
20260904021342_add_time100_blog
```

`featured_image_alt` migration 已成功应用：

```text
20260904030335_add_featured_image_alt
```

执行成功输出：

```text
Your database is now in sync with your schema.
```

### 8.3 多语言规则

第一版语言代码：

```text
en
zh
```

暂时不使用：

```text
zh-Hans
zh-Hant
```

未来增加简体与繁体区分时，可以升级语言代码，但数据库字段长度无需改变。

### 8.4 分类翻译设计

分类主体与翻译分离：

```text
time100_blog_categories
→ language independent

time100_blog_category_translations
→ localized name and description
```

这样一个 `learning` 分类只有一条主体记录，并有两条翻译：

```text
en: Learning
zh: 学习成长
```

### 8.5 文章翻译设计

文章主体与语言内容分离：

```text
time100_blog_posts
→ category, status, canonical_group, views, version, publish dates

time100_blog_post_translations
→ language, slug, title, excerpt, content, images, SEO
```

英文和中文共用一个 `postId`，但标题、摘要、内容、SEO 和 Alt 文本完全独立。

---

## 9. 已插入 Blog 分类

已经通过 SQL 插入 6 个分类主体和 12 条翻译，并通过 Prisma 查询验证成功。

### 9.1 分类主体

```text
1. learning
2. career-growth
3. startup
4. personal-growth
5. productivity
6. time100-guides
```

### 9.2 英文翻译

```text
Learning
Career Growth
Startup
Personal Growth
Productivity
Time100 Guides
```

### 9.3 中文翻译

```text
学习成长
职业发展
创业成长
个人成长
效率管理
Time100 指南
```

### 9.4 分类描述

英文和中文描述均已插入，并通过以下 Prisma 查询返回：

```ts
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
```

验证结果：

```text
6 categories
12 translations
Category → translations relation works
```

---

## 10. 第一篇测试文章

已经通过 Prisma nested create 成功创建第一篇双语测试文章。

### 10.1 Post 主体

```text
id: 6bfe0910-d2bf-44e9-bbad-21bdaffa341f
category: learning
canonicalGroup: language-learning
status: published
viewCount: 0
currentVersion: 1
publishedAt: null
```

注意：虽然 `status = published`，但 `publishedAt = null`。正式前台查询时应明确发布条件，最好未来发布动作同时设置：

```text
status = published
publishedAt = current timestamp
```

### 10.2 英文翻译

```text
language: en
slug: learn-language-consistently
title: How to Learn a Language Consistently
excerpt: A practical guide to building a sustainable language learning habit.
content: { blocks: [] }
seoTitle: How to Learn a Language Consistently
seoDescription: Build a sustainable language learning routine and track long-term progress.
```

### 10.3 中文翻译

```text
language: zh
slug: learn-language-consistently
title: 如何长期坚持学习一门语言
excerpt: 建立持续语言学习习惯的实用指南。
content: { blocks: [] }
seoTitle: 如何长期坚持学习一门语言
seoDescription: 建立长期稳定的语言学习习惯，并持续追踪成长进度。
```

### 10.4 测试结论

已经验证：

```text
Prisma nested create
Post → translations relation
Post → category relation
EN/ZH translations
JSON content
SEO fields
```

---

## 11. Slug 规则

### 11.1 长度

数据库：

```text
VARCHAR(120)
```

建议长度：

```text
20–60 characters
```

最大长度：

```text
120 characters
```

### 11.2 允许字符

统一限制：

```regex
^[a-z0-9-]{3,120}$
```

只允许：

```text
a-z
0-9
-
```

### 11.3 中文文章 slug

不使用中文字符或拼音长 slug。

推荐英文和中文语言版本使用同一个简洁英文 slug：

```text
English:
time100.ca/blog/learn-language-consistently

Chinese:
zh.time100.ca/blog/learn-language-consistently
```

### 11.4 唯一性

当前约束：

```prisma
@@unique([language, slug])
```

因此：

```text
en + same-slug
zh + same-slug
```

可以共存，但同一语言内不能重复。

### 11.5 canonicalGroup

用于把不同语言或相关内容归入同一个主题：

```text
canonicalGroup: language-learning
```

不要把 `canonicalGroup` 当作 SEO canonical URL。它是内部内容主题关联键。

---

## 12. 多语言站点与 SEO 规划

规划站点：

```text
English: time100.ca
Chinese: zh.time100.ca
```

当前语言数据库值：

```text
en
zh
```

未来每个翻译版本应拥有：

```text
独立 URL
独立 slug
独立 title
独立 excerpt
独立 content
独立 seo_title
独立 seo_description
独立 featured_image_alt
```

SEO 原则：

```text
每个语言 URL self-canonical
已发布的语言版本互相输出 hreflang
英文作为 x-default，除非未来另作决定
页面主要内容和导航保持单一语言
不存在的翻译不要生成 URL、hreflang 或 sitemap entry
```

建议 URL：

```text
https://time100.ca/blog/<slug>
https://zh.time100.ca/blog/<slug>
```

如果子域名尚未启用，也可先在同一域名使用 `/zh/`，但当前长期规划为 `zh.time100.ca`。

---

## 13. Blog 图片与 Cloudflare R2

所有 Blog 图片计划存放在 Cloudflare R2。

数据库不保存图片 Blob 或 Base64，只保存 URL 和描述。

建议字段：

```text
featured_image
featured_image_alt
image_prompt
```

### 13.1 R2 目录规划

```text
blog/
├── covers/
├── content/
├── generated/
└── thumbnails/
```

例子：

```text
blog/covers/learn-language-consistently.webp
blog/content/language-learning/workflow.webp
blog/generated/cover-20260904.webp
blog/thumbnails/learn-language-consistently.webp
```

### 13.2 数据库存储示例

```text
featured_image:
https://images.time100.ca/blog/covers/learn-language-consistently.webp
```

```text
featured_image_alt (en):
Language learner tracking daily progress and study milestones.
```

```text
featured_image_alt (zh):
学习者通过成长时间线记录每日语言学习进度。
```

### 13.3 前端 fallback

```tsx
alt={translation.featuredImageAlt || translation.title}
```

### 13.4 AI 图片工作流规划

未来流程：

```text
Title + Excerpt + Category
→ Generate imagePrompt
→ Generate cover visual
→ Upload to R2
→ Save featuredImage URL
→ Generate featuredImageAlt
→ Human review
```

第一版：

```text
封面非必填
支持手动 R2 URL
支持 Alt 文本
计划加入 Generate Alt 按钮
暂不强制实现 AI Cover
```

---

## 14. AI 自动生成 Alt 文本规划

后台字段：

```text
Featured Image
Featured Image Alt
Image Prompt
```

按钮：

```text
Generate Alt
```

AI 输入：

```text
language
title
category
excerpt
imagePrompt
```

英文规则：

```text
Maximum about 125 characters
Describe visible/expected cover content
Avoid "image of" and "picture of"
Natural accessible language
Return only the alt text
```

中文规则：

```text
简洁描述封面内容
避免“图片”“照片”“插图展示”等冗余词
输出当前文章语言
返回 Alt 文本本身
```

如果文章语言为 `zh`，Prompt 可以使用中文，AI 输出也要求中文；文章语言为 `en` 时使用英文。

AI 输出的 Alt 必须允许人工编辑，不应直接不可修改地发布。

---

## 15. Blog 版本历史规划

第一版暂未确认创建 `time100_blog_revisions` 表。

计划中的结构：

```text
time100_blog_revisions
```

可能字段：

```text
id
post_id
version
change_type
change_source
change_reason
summary
details
ai_model
ai_prompt
content_snapshot
created_by
created_at
```

建议枚举值：

```text
change_source:
human
ai
ai_reviewed
system

change_type:
publish
update
content_expansion
seo_update
translation
ai_refresh
fact_check
```

前台第一版只需显示：

```text
Published
Last Updated
```

后续可以显示：

```text
What's New
View History
```

---

## 16. Blog 前台与后台路由规划

### 16.1 公开前台

```text
/blog
/blog/[slug]
```

用途：

```text
SEO
Google indexing
Article reading
Category filtering
Signup conversion
```

### 16.2 管理后台

```text
/admin/blog
/admin/blog/posts
/admin/blog/posts/new
/admin/blog/posts/[id]/edit
/admin/blog/categories
```

用途：

```text
Create
Edit
Publish
Archive
Category management
Translation management
SEO fields
Cover image management
```

### 16.3 后台 Posts 第一版范围

列表页：

```text
Title
Category
Status
Language count
Updated at
Edit
Delete or Archive
```

编辑页：

```text
Canonical Group
Category
Status
Published At

EN panel:
Title
Slug
Excerpt
Content
Featured Image
Featured Image Alt
Image Prompt
SEO Title
SEO Description

ZH panel:
Title
Slug
Excerpt
Content
Featured Image
Featured Image Alt
Image Prompt
SEO Title
SEO Description
```

第一版 Content 可以先用 textarea 或 JSON-compatible editor。不要一开始就把富文本、AI 写作、版本历史、标签、评论全部加入。

---

## 17. Blog 内容策略

Time100 Blog 定位不是产品新闻，而是 Use Case 驱动的成长内容库。

目标：

```text
Use Cases Library
→ Public Blog Articles
→ SEO traffic
→ Features / Compare / Guide internal links
→ Signup
```

### 17.1 分类

```text
Learning
Career Growth
Startup
Personal Growth
Productivity
Time100 Guides
```

### 17.2 首批文章方向

```text
How to Learn a Language Consistently
How to Prepare for an Exam
How to Build a Side Business
How to Track Personal Growth
How to Stay Motivated During Long-Term Projects
How to Write a Book Step by Step
How to Build Better Habits That Last
How to Plan Long-Term Goals
How to Launch a Product from Scratch
How to Keep Track of Multiple Projects
```

### 17.3 文章模板

```text
The Goal
Common Challenges
Why Typical Approaches Fall Short
A Growth-Based Approach
Suggested Time100 Workflow
Recommended Milestones
Reflection
FAQ
CTA
```

### 17.4 原创案例原则

不要伪造具体用户评价或虚构客户故事。

优先使用真实、通用的场景：

```text
Preparing for a certification
Building a side business
Learning a language
Writing a book
Tracking a fitness journey
Managing multiple projects
```

每个场景采用：

```text
Scenario
Challenge
How Traditional Tools Help
How Time100 Differs
Who It Fits
```

---

## 18. Compare 页面规划

尚未确定是否已经创建 `/compare` 页面。Footer 和 Features 已经链接到 `/compare`。

推荐信息架构：

```text
/compare
/compare/time100-vs-todoist
/compare/time100-vs-microsoft-to-do
/compare/time100-vs-google-tasks
/compare/time100-vs-notion
```

Compare 原则：

```text
客观分析
不贬低竞争产品
说明各自适合谁
使用真实场景
注明更新时间
竞品能力基于官方资料确认
```

核心表达：

```text
Most productivity tools help people complete tasks.
Time100 helps people remember growth.
```

---

## 19. Pricing、FAQs、Privacy、Terms 状态

Footer 已有或计划链接：

```text
/pricing
/faqs
/privacy
/terms
```

当前聊天没有确认这些页面已经完成。

新聊天必须先检查仓库再决定是否创建，避免重复开发。

推荐优先级此前讨论过：

```text
Blog CMS + Blog frontend
Compare
Pricing
FAQs
Privacy
Terms
```

但公开上线前至少要避免 Footer 指向 404。

---

## 20. 测试脚本

建议保留或移入：

```text
scripts/dev/
```

现有/讨论过的脚本：

```text
scripts/test-blog-categories.ts
scripts/seed-first-blog-post.ts
```

### 20.1 分类测试脚本关键点

```ts
import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

async function main() {
  const { prisma } = await import("../lib/prisma");

  const categories = await prisma.time100BlogCategory.findMany({
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

  console.dir(categories, { depth: null });

  await prisma.$disconnect();
}
```

### 20.2 已解决的错误

曾遇到：

```text
Cannot find module '.prisma/client/default'
```

原因：Prisma 7 使用自定义生成目录，不应在测试脚本中从 `@prisma/client` 导入。

曾遇到：

```text
Expected 1 arguments, but got 0
```

原因：Prisma 7 PostgreSQL Client 需要 adapter，不应直接 `new PrismaClient()`。

曾遇到：

```text
ECONNREFUSED
```

原因：脚本没有在创建 adapter 前加载 `.env.local`。

最终解决：

```text
先 dotenv.config({ path: ".env.local" })
再动态 import("../lib/prisma")
```

---

## 21. 当前已验证的命令

```bash
npx prisma format
npx prisma validate
npx prisma migrate dev --name add_time100_blog
npx prisma generate
npx tsx scripts/test-blog-categories.ts
npx tsx scripts/seed-first-blog-post.ts
```

Prisma Client 生成位置：

```text
./lib/generated/prisma
```

---

## 22. 下一步开发目标

当前最合理的下一步：

```text
1. 确认 imagePrompt 是否已加入 schema 并 migration
2. 建立 /admin/blog/posts 列表页
3. 建立 /admin/blog/posts/new
4. 建立 /admin/blog/posts/[id]/edit
5. 建立 Blog Server Actions 或 API
6. 支持 EN/ZH Translation Upsert
7. 支持 R2 Cover URL、Alt、Prompt
8. 实现 Draft / Published 状态与 publishedAt
9. 建立公开 /blog
10. 建立公开 /blog/[slug]
11. 实现 SEO metadata、canonical、hreflang、sitemap
```

第一版 Admin Blog 不要过度设计。优先完成：

```text
Create
Read
Update
Publish
Archive
EN/ZH content
SEO fields
Basic image fields
```

后续再加入：

```text
Rich text editor
R2 direct upload
Generate Alt
AI Cover
Revisions
Tags
Related posts
Analytics
```

---

## 23. 新聊天开始时建议执行的检查

请新聊天中的 Copilot 不要只依赖本文档，先要求或检查以下实际文件：

```text
prisma/schema.prisma
lib/prisma.ts
package.json
app/ 目录结构
components/home/PublicHeader.tsx
components/home/PublicFooter.tsx
components/layout/AppHeader.tsx
components/layout/UserMenu.tsx
```

并运行：

```bash
git status
git log -5 --oneline
npx prisma validate
npm run build
```

如果开发 Blog Admin，还应检查现有权限模型：

```text
NextAuth session fields
User / Account role fields
middleware.ts
protected route layout
```

不要假设 `/admin` 已正确限制管理员访问。

---

## 24. 给新聊天的直接指令

将本文件上传到新聊天后发送：

```text
这是 Time100 当前项目交接文档。请先阅读并以仓库实际代码为准继续开发。

当前目标：开发 /admin/blog/posts 第一版 CMS，包括文章列表、新建、编辑、EN/ZH 翻译、SEO 字段，以及 R2 封面 URL、Image Alt 和 Image Prompt。请先检查现有目录与权限结构，再直接生成可替换文件。
```

---

## 25. 重要开发偏好

用户偏好：

```text
快速交付
直接生成可下载或可替换文件
少解释
保持尊重、清晰、真实
存在风险时给出建设性建议
```

开发文件应尽量：

```text
可直接替换
提供明确路径
避免破坏现有功能
先构建验证
再提交 GitHub
```
