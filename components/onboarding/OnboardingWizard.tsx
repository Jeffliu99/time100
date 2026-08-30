"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { companions, type CompanionId } from "@/lib/companions";

type Language = "en" | "zh";

type FormState = {
  goal: string;
  ageGroup: string;
  preferredLanguage: Language;
  country: string;
  city: string;
  companionId: CompanionId | "";
};

const goals = [
  ["business", "🚀", "Business", "创业"],
  ["career", "💼", "Career", "职业发展"],
  ["study", "📚", "Study", "学习"],
  ["health", "🌿", "Health", "健康"],
  ["family", "🏡", "Family", "家庭"],
  ["other", "✨", "Other", "其他"],
] as const;

const ages = ["under-18", "18-24", "25-34", "35-44", "45-54", "55+"];
const countries = ["Canada", "United States", "China", "Other"];

export default function OnboardingWizard({
  initialLanguage,
  userName,
}: {
  initialLanguage: Language;
  userName: string;
}) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormState>({
    goal: "",
    ageGroup: "",
    preferredLanguage: initialLanguage,
    country: "",
    city: "",
    companionId: "",
  });

  const zh = form.preferredLanguage === "zh";
  const totalSteps = 7;
  const selectedCompanion = useMemo(
    () => companions.find((item) => item.id === form.companionId),
    [form.companionId],
  );

  const canContinue =
    step === 0 ||
    (step === 1 && Boolean(form.goal)) ||
    (step === 2 && Boolean(form.ageGroup)) ||
    step === 3 ||
    (step === 4 && Boolean(form.country)) ||
    step === 5 ||
    (step === 6 && Boolean(form.companionId));

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function finish() {
    if (!selectedCompanion || saving) return;
    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/profile/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Failed to save profile");
      }

      router.replace("/dashboard");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Failed to save profile");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="dark min-h-dvh bg-slate-950 text-white">
      <div className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] sm:px-6">
        <header className="flex items-center justify-between py-3">
          <div>
            <p className="text-lg font-black tracking-tight">Time100</p>
            <p className="text-xs text-slate-500">Turn Ideas Into Reality</p>
          </div>
          <span className="rounded-full border border-slate-800 px-3 py-1 text-xs text-slate-400">
            {Math.min(step + 1, totalSteps)} / {totalSteps}
          </span>
        </header>

        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 transition-[width] duration-500"
            style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
          />
        </div>

        <section className="flex flex-1 items-center py-8">
          <div className="w-full rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-2xl shadow-blue-950/30 sm:p-8">
            {step === 0 && (
              <div className="text-center">
                <div className="text-6xl">👋</div>
                <h1 className="mt-5 text-3xl font-black sm:text-4xl">
                  {zh ? `欢迎${userName ? `，${userName}` : ""}` : `Welcome${userName ? `, ${userName}` : ""}`}
                </h1>
                <p className="mx-auto mt-4 max-w-md text-slate-400">
                  {zh ? "用几十秒设置你的目标，并选择一位成长伙伴。" : "Take a moment to set your goal and choose a growth companion."}
                </p>
              </div>
            )}

            {step === 1 && (
              <ChoiceStep title={zh ? "你的主要目标是什么？" : "What is your primary goal?"}>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {goals.map(([id, icon, en, cn]) => (
                    <ChoiceButton key={id} selected={form.goal === id} onClick={() => update("goal", id)}>
                      <span className="text-2xl">{icon}</span>
                      <span>{zh ? cn : en}</span>
                    </ChoiceButton>
                  ))}
                </div>
              </ChoiceStep>
            )}

            {step === 2 && (
              <ChoiceStep title={zh ? "请选择年龄段" : "Choose your age range"}>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {ages.map((age) => (
                    <ChoiceButton key={age} selected={form.ageGroup === age} onClick={() => update("ageGroup", age)}>
                      {age === "under-18" ? (zh ? "18岁以下" : "Under 18") : age}
                    </ChoiceButton>
                  ))}
                </div>
              </ChoiceStep>
            )}

            {step === 3 && (
              <ChoiceStep title={zh ? "选择偏好语言" : "Choose your preferred language"}>
                <div className="grid gap-3 sm:grid-cols-2">
                  <ChoiceButton selected={form.preferredLanguage === "en"} onClick={() => update("preferredLanguage", "en")}>English</ChoiceButton>
                  <ChoiceButton selected={form.preferredLanguage === "zh"} onClick={() => update("preferredLanguage", "zh")}>中文</ChoiceButton>
                </div>
              </ChoiceStep>
            )}

            {step === 4 && (
              <ChoiceStep title={zh ? "你目前在哪个国家？" : "Which country are you in?"}>
                <div className="grid grid-cols-2 gap-3">
                  {countries.map((country) => (
                    <ChoiceButton key={country} selected={form.country === country} onClick={() => update("country", country)}>
                      {country === "United States" && zh ? "美国" : country === "China" && zh ? "中国" : country === "Other" && zh ? "其他" : country}
                    </ChoiceButton>
                  ))}
                </div>
              </ChoiceStep>
            )}

            {step === 5 && (
              <ChoiceStep title={zh ? "你在哪个城市？" : "Which city are you in?"} subtitle={zh ? "可选，之后可以修改。" : "Optional. You can change this later."}>
                <input
                  value={form.city}
                  onChange={(event) => update("city", event.target.value)}
                  placeholder={zh ? "例如：Aurora" : "For example: Aurora"}
                  maxLength={80}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                />
              </ChoiceStep>
            )}

            {step === 6 && (
              <ChoiceStep title={zh ? "选择你的成长伙伴" : "Choose your growth companion"} subtitle={zh ? "之后可以在个人资料中查看和更换。" : "You can review or change this later in Profile."}>
                <div className="grid gap-4 sm:grid-cols-2">
                  {companions.map((companion) => {
                    const selected = form.companionId === companion.id;
                    return (
                      <button
                        key={companion.id}
                        type="button"
                        onClick={() => update("companionId", companion.id)}
                        aria-pressed={selected}
                        className={`relative rounded-3xl border p-5 text-left transition duration-200 ${
                          selected
                            ? "border-blue-400 bg-blue-500/10 ring-2 ring-blue-400 shadow-lg shadow-blue-500/20"
                            : "border-slate-700 bg-slate-950 hover:border-slate-500"
                        }`}
                      >
                        {selected && <span className="absolute right-4 top-4 rounded-full bg-blue-500 px-2 py-1 text-xs font-bold">✓</span>}
                        <Image src={companion.avatar} alt={companion.name} width={160} height={160} className="mx-auto h-32 w-32" />
                        <h2 className="mt-4 text-center text-2xl font-black">{companion.name}</h2>
                        <p className="mt-1 text-center text-sm font-semibold text-blue-300">{companion.title[form.preferredLanguage]}</p>
                        <p className="mt-3 text-center text-sm leading-6 text-slate-400">{companion.description[form.preferredLanguage]}</p>
                      </button>
                    );
                  })}
                </div>
              </ChoiceStep>
            )}

            {error && <p role="alert" className="mt-5 rounded-xl border border-red-900 bg-red-950/50 p-3 text-sm text-red-300">{error}</p>}
          </div>
        </section>

        <footer className="flex items-center gap-3 pb-2">
          {step > 0 && (
            <button type="button" onClick={() => setStep((value) => value - 1)} disabled={saving} className="min-h-12 rounded-xl border border-slate-700 px-5 font-semibold text-slate-300 disabled:opacity-50">
              {zh ? "返回" : "Back"}
            </button>
          )}
          <button
            type="button"
            onClick={() => (step === totalSteps - 1 ? void finish() : setStep((value) => value + 1))}
            disabled={!canContinue || saving}
            className="min-h-12 flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 font-bold shadow-lg shadow-blue-950/40 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {saving ? (zh ? "正在保存..." : "Saving...") : step === totalSteps - 1 ? (zh ? "开始我的旅程" : "Start My Journey") : step === 0 ? (zh ? "开始设置" : "Get Started") : (zh ? "继续" : "Continue")}
          </button>
        </footer>
      </div>
    </main>
  );
}

function ChoiceStep({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div>
      <h1 className="text-2xl font-black sm:text-3xl">{title}</h1>
      {subtitle && <p className="mt-2 text-sm text-slate-400">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function ChoiceButton({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex min-h-20 items-center justify-center gap-2 rounded-2xl border p-4 text-center font-semibold transition ${
        selected ? "border-blue-400 bg-blue-500/10 ring-2 ring-blue-400" : "border-slate-700 bg-slate-950 hover:border-slate-500"
      }`}
    >
      {children}
    </button>
  );
}
