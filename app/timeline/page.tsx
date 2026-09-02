import { auth } from "@/auth";
import MobileAppShell from "@/components/mobile/MobileAppShell";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

function getEventStyle(importance: number) {
  if (importance >= 10) {
    return "border-yellow-500 bg-yellow-500/5";
  }

  if (importance >= 5) {
    return "border-blue-500 bg-blue-500/5";
  }

  return "border-slate-700";
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

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { preferredLanguage: true },
  });

  const language = user?.preferredLanguage === "zh" ? "zh" : "en";
  const zh = language === "zh";

  const events = await prisma.growthEvent.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <MobileAppShell language={language}>
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:p-6">
          <h1 className="mb-8 text-3xl font-bold sm:text-4xl">
            🌱 {zh ? "成长旅程" : "Growth Journey"}
          </h1>

          <div className="relative">
            <div className="absolute left-5 top-0 h-full w-0.5 bg-slate-700" />

            <div className="space-y-6">
              {events.map((event) => (
                <div key={event.id} className="relative pl-14">
                  <div className="absolute left-0 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-slate-600 bg-slate-900">
                    {getEventIcon(event.type)}
                  </div>

                  <div
                    className={`rounded-2xl border p-5 ${getEventStyle(
                      event.importance,
                    )}`}
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <h2 className="text-lg font-semibold">{event.title}</h2>

                      <span className="text-sm text-slate-500">
                        {new Date(event.createdAt).toLocaleDateString(
                          zh ? "zh-CN" : "en-CA",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </span>
                    </div>

                    {event.description && (
                      <p className="mt-3 text-slate-300">
                        {event.description}
                      </p>
                    )}

                    <div className="mt-3 text-xs text-slate-500">
                      {getEventLabel(event.type, zh)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </MobileAppShell>
  );
}
