-- CreateTable
CREATE TABLE "time100_blog_categories" (
    "id" TEXT NOT NULL,
    "slug" VARCHAR(120) NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "time100_blog_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "time100_blog_category_translations" (
    "id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "language" VARCHAR(10) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "time100_blog_category_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "time100_blog_posts" (
    "id" TEXT NOT NULL,
    "category_id" TEXT,
    "canonical_group" VARCHAR(120),
    "status" VARCHAR(20) NOT NULL DEFAULT 'draft',
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "current_version" INTEGER NOT NULL DEFAULT 1,
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "time100_blog_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "time100_blog_post_translations" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "language" VARCHAR(10) NOT NULL,
    "slug" VARCHAR(120) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "excerpt" TEXT,
    "content" JSONB NOT NULL,
    "featured_image" TEXT,
    "seo_title" VARCHAR(255),
    "seo_description" TEXT,
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "time100_blog_post_translations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "time100_blog_categories_slug_key" ON "time100_blog_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "time100_blog_category_translations_category_id_language_key" ON "time100_blog_category_translations"("category_id", "language");

-- CreateIndex
CREATE INDEX "time100_blog_posts_status_idx" ON "time100_blog_posts"("status");

-- CreateIndex
CREATE INDEX "time100_blog_posts_category_id_idx" ON "time100_blog_posts"("category_id");

-- CreateIndex
CREATE INDEX "time100_blog_posts_published_at_idx" ON "time100_blog_posts"("published_at");

-- CreateIndex
CREATE INDEX "time100_blog_post_translations_language_published_at_idx" ON "time100_blog_post_translations"("language", "published_at");

-- CreateIndex
CREATE UNIQUE INDEX "time100_blog_post_translations_post_id_language_key" ON "time100_blog_post_translations"("post_id", "language");

-- CreateIndex
CREATE UNIQUE INDEX "time100_blog_post_translations_language_slug_key" ON "time100_blog_post_translations"("language", "slug");

-- AddForeignKey
ALTER TABLE "time100_blog_category_translations" ADD CONSTRAINT "time100_blog_category_translations_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "time100_blog_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time100_blog_posts" ADD CONSTRAINT "time100_blog_posts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "time100_blog_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time100_blog_post_translations" ADD CONSTRAINT "time100_blog_post_translations_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "time100_blog_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
