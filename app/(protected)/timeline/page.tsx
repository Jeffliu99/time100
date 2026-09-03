import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

function getEventStyle(importance: number) {
  if (importance >= 10) {
    return "border-yellow-500 bg-yellow-500/5";
  }

  if (importance >= 5) {
    return "border-blue-500 bg-blue-500/5";
  }

  return "border-slate-700 bg-slate-900/40";
}

function getEventIcon(type: string) {
  switch (type) {
    case "TASK_COMPLETED":
      return "✅";
    case "PROJECT_COMPLETED":
      return "🚀";
    case "MILESTONE":
      return "🏆";
    default:
      return "🌱";
  }
}

function getEventLabel(type: string, zh: boolean) {
  switch (type) {
    case "MILESTONE":
      return zh ? "🏆 里程碑" : "🏆 Milestone";
    case "TASK_COMPLETED":
      return zh ? "✅ 完成任务" : "✅ Task Completed";
    case "PROJECT_COMPLETED":
      return zh ? "🚀 项目完成" : "🚀 Project Completed";
    default:
      return zh ? "🌱 成长记录" : "🌱 Growth Record";
  }
}

export default async function TimelinePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const [user, events] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { preferredLanguage: true },
    }),
    prisma.growthEvent.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  if (!user) {
    redirect("/login");
  }

  const zh = user.preferredLanguage === "zh";

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-white sm:text-4xl">
          🌱 {zh ? "成长旅程" : "Growth Journey"}
        </h1>
        <p className="mt-2 text-base text-slate-300">
          {zh
            ? "记录完成的任务、项目与重要里程碑。"
            : "A record of completed tasks, projects, and important milestones."}
        </p>
      </header>

      {events.length === 0 ? (
        <section className="rounded-3xl border border-slate-700 bg-slate-900/70 p-8 text-center">
          <div className="text-4xl" aria-hidden="true">🌱</div>
          <h2 className="mt-4 text-xl font-bold text-white">
            {zh ? "成长旅程即将开始" : "Your growth journey starts here"}
          </h2>
          <p className="mt-2 text-slate-300">
            {zh
              ? "完成任务或项目后，成长记录会显示在这里。"
              : "Completed tasks and projects will appear here."}
          </p>
        </section>
      ) : (
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-5 top-0 w-0.5 bg-slate-700"
          />

          <div className="space-y-6">
            {events.map((event) => (
              <article key={event.id} className="relative pl-14">
                <div className="absolute left-0 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-slate-600 bg-slate-900 shadow-md">
                  <span aria-hidden="true">{getEventIcon(event.type)}</span>
                </div>

                <div
                  className={`rounded-2xl border p-4 shadow-sm sm:p-5 ${getEventStyle(
                    event.importance,
                  )}`}
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <h2 className="min-w-0 break-words text-lg font-bold text-white">
                      {event.title}
                    </h2>

                    <time
                      dateTime={event.createdAt.toISOString()}
                      className="shrink-0 text-sm font-medium text-slate-400"
                    >
                      {event.createdAt.toLocaleDateString(
                        zh ? "zh-CN" : "en-CA",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </time>
                  </div>

                  {event.description && (
                    <p className="mt-3 leading-6 text-slate-300">
                      {event.description}
                    </p>
                  )}

                  <div className="mt-4 text-sm font-semibold text-slate-400">
                    {getEventLabel(event.type, zh)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
