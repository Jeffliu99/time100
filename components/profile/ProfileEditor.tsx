"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Profile = {
  displayName: string;
  email: string;
  image: string;
  goal: string;
  ageGroup: string;
  preferredLanguage: "en" | "zh";
  country: string;
  city: string;
  companionName: string;
  companionType: string;
  companionAvatar: string;
};

export default function ProfileEditor({ initialProfile }: { initialProfile: Profile }) {
  const [profile, setProfile] = useState(initialProfile);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const zh = profile.preferredLanguage === "zh";

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: profile.displayName,
          goal: profile.goal,
          ageGroup: profile.ageGroup,
          preferredLanguage: profile.preferredLanguage,
          country: profile.country,
          city: profile.city,
        }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Failed to save profile");
      setMessage(zh ? "个人资料已保存。" : "Profile saved.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to save profile");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="dark min-h-dvh bg-slate-950 px-4 py-6 text-white sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black">{zh ? "我的资料" : "My Profile"}</h1>
            <p className="mt-1 text-sm text-slate-400">{zh ? "管理你的成长资料和偏好。" : "Manage your growth profile and preferences."}</p>
          </div>
          <Link href="/dashboard" className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold">{zh ? "返回" : "Back"}</Link>
        </div>

        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-7">
          <div className="flex items-center gap-4">
            {profile.image ? (
              <Image src={profile.image} alt={profile.displayName || "Account avatar"} width={72} height={72} className="h-[72px] w-[72px] rounded-full object-cover" unoptimized />
            ) : (
              <div className="h-[72px] w-[72px] justify-center rounded-full bg-blue-600 text-2xl font-black">{(profile.displayName || profile.email || "U").slice(0, 1).toUpperCase()}</div>
            )}
            <div className="min-w-0">
              <p className="truncate text-xl font-bold">{profile.displayName || profile.email}</p>
              <p className="truncate text-sm text-slate-400">{profile.email}</p>
              <p className="mt-1 text-xs text-slate-500">{zh ? "头像与登录账号保持一致" : "Avatar is provided by your login account"}</p>
            </div>
          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <Field label={zh ? "显示名称" : "Display name"} value={profile.displayName} onChange={(value) => setProfile({ ...profile, displayName: value })} />
            <SelectField label={zh ? "语言" : "Language"} value={profile.preferredLanguage} onChange={(value) => setProfile({ ...profile, preferredLanguage: value as "en" | "zh" })} options={[["en", "English"], ["zh", "中文"]]} />
            <SelectField label={zh ? "主要目标" : "Primary goal"} value={profile.goal} onChange={(value) => setProfile({ ...profile, goal: value })} options={[["business", zh ? "创业" : "Business"], ["career", zh ? "职业发展" : "Career"], ["study", zh ? "学习" : "Study"], ["health", zh ? "健康" : "Health"], ["family", zh ? "家庭" : "Family"], ["other", zh ? "其他" : "Other"]]} />
            <SelectField label={zh ? "年龄段" : "Age range"} value={profile.ageGroup} onChange={(value) => setProfile({ ...profile, ageGroup: value })} options={[["under-18", zh ? "18岁以下" : "Under 18"], ["18-24", "18-24"], ["25-34", "25-34"], ["35-44", "35-44"], ["45-54", "45-54"], ["55+", "55+"]]} />
            <SelectField label={zh ? "国家" : "Country"} value={profile.country} onChange={(value) => setProfile({ ...profile, country: value })} options={[["Canada", "Canada"], ["United States", "United States"], ["China", zh ? "中国" : "China"], ["Other", zh ? "其他" : "Other"]]} />
            <Field label={zh ? "城市（可选）" : "City (optional)"} value={profile.city} onChange={(value) => setProfile({ ...profile, city: value })} />
          </div>

          <button type="button" onClick={() => void save()} disabled={saving} className="mt-7 min-h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 font-bold disabled:opacity-50">
            {saving ? (zh ? "正在保存..." : "Saving...") : (zh ? "保存资料" : "Save Profile")}
          </button>
          {message && <p role="status" className="mt-3 text-center text-sm text-slate-300">{message}</p>}
        </section>

        <section className="mt-6 rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-7">
          <h2 className="text-xl font-black">{zh ? "我的成长伙伴" : "My Growth Companion"}</h2>
          <div className="mt-5 flex items-center gap-4">
            {profile.companionAvatar && <Image src={profile.companionAvatar} alt={profile.companionName} width={96} height={96} className="h-24 w-24" />}
            <div>
              <p className="text-2xl font-black">{profile.companionName}</p>
              <p className="mt-1 capitalize text-slate-400">{profile.companionType}</p>
              <p className="mt-2 text-xs text-slate-500">{zh ? "成长伙伴平时会在小屋中陪伴你。" : "Your companion lives in the House and grows with you."}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="grid gap-2 text-sm font-semibold text-slate-300"><span>{label}</span><input value={value} onChange={(event) => onChange(event.target.value)} className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500" /></label>;
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[][] }) {
  return <label className="grid gap-2 text-sm font-semibold text-slate-300"><span>{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500">{options.map(([optionValue, text]) => <option key={optionValue} value={optionValue}>{text}</option>)}</select></label>;
}
