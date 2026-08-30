import Image from "next/image";
import Link from "next/link";
import { requireProfile } from "@/lib/auth-guard";

type SettingsItem = {
  href: string;
  icon: string;
  title: string;
  description: string;
  value?: string;
  available?: boolean;
};

export default async function SettingsPage() {
  const { user } = await requireProfile();
  const zh = user.preferredLanguage === "zh";
  const displayName = user.displayName || user.name || (zh ? "用户" : "User");
  const companionName = user.companionName || (zh ? "尚未选择" : "Not selected");

  const settingsItems: SettingsItem[] = [
    {
      href: "/settings/profile",
      icon: "👤",
      title: zh ? "个人资料" : "Profile",
      description: zh ? "管理目标、语言和所在地" : "Manage goals, language, and location",
      value: displayName,
      available: true,
    },
    {
      href: "/settings/companion",
      icon: "✨",
      title: zh ? "成长伙伴" : "Growth Companion",
      description: zh ? "查看或更换成长伙伴" : "Review or change your companion",
      value: companionName,
      available: false,
    },
    {
      href: "/settings/account",
      icon: "🔑",
      title: zh ? "账号" : "Account",
      description: zh ? "邮箱和登录方式" : "Email and sign-in methods",
      value: user.email || undefined,
      available: false,
    },
    {
      href: "/settings/security",
      icon: "🔐",
      title: zh ? "安全与隐私" : "Security & Privacy",
      description: zh ? "登录安全和数据控制" : "Login security and data controls",
      available: false,
    },
    {
      href: "/settings/notifications",
      icon: "🔔",
      title: zh ? "通知" : "Notifications",
      description: zh ? "提醒和消息偏好" : "Reminder and message preferences",
      available: false,
    },
    {
      href: "/settings/membership",
      icon: "💎",
      title: zh ? "会员" : "Membership",
      description: zh ? "套餐、额度和订阅" : "Plan, usage, and subscription",
      value: zh ? "免费版" : "Free",
      available: false,
    },
  ];

  return (
    <main className="dark min-h-dvh bg-slate-950 px-4 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] text-white sm:px-6">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-blue-400">Time100</p>
            <h1 className="mt-1 text-3xl font-black tracking-tight">
              {zh ? "设置" : "Settings"}
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              {zh ? "管理账号、个人资料和使用偏好。" : "Manage your account, profile, and preferences."}
            </p>
          </div>

          <Link
            href="/dashboard"
            className="shrink-0 rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold transition hover:bg-slate-800"
          >
            {zh ? "返回" : "Back"}
          </Link>
        </header>

        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-xl shadow-black/20 sm:p-6">
          <div className="flex min-w-0 items-center gap-4">
            {user.image ? (
              <Image
                src={user.image}
                alt={displayName}
                width={72}
                height={72}
                unoptimized
                className="h-[72px] w-[72px] shrink-0 rounded-full object-cover ring-2 ring-blue-500/50"
              />
            ) : (
              <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-2xl font-black ring-2 ring-blue-500/50">
                {displayName.slice(0, 1).toUpperCase()}
              </div>
            )}

            <div className="min-w-0">
              <h2 className="truncate text-xl font-bold">{displayName}</h2>
              {user.email && <p className="mt-1 truncate text-sm text-slate-400">{user.email}</p>}
              <p className="mt-2 text-xs text-slate-500">
                {zh ? "头像由登录账号提供" : "Avatar provided by your sign-in account"}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
          {settingsItems.map((item, index) => {
            const classes = `flex min-h-[76px] items-center justify-between gap-4 px-5 py-4 text-left transition sm:px-6 ${
              index > 0 ? "border-t border-slate-800" : ""
            } ${item.available ? "hover:bg-slate-800/70" : "opacity-75"}`;

            const content = (
              <>
                <div className="flex min-w-0 items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-800 text-xl" aria-hidden="true">
                    {item.icon}
                  </span>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="font-bold">{item.title}</h2>
                      {!item.available && (
                        <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                          {zh ? "即将推出" : "Soon"}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-slate-400">{item.description}</p>
                  </div>
                </div>

                <div className="flex min-w-0 shrink-0 items-center gap-3">
                  {item.value && (
                    <span className="hidden max-w-36 truncate text-xs text-slate-500 sm:block">
                      {item.value}
                    </span>
                  )}
                  <span className="text-lg text-slate-500" aria-hidden="true">›</span>
                </div>
              </>
            );

            return item.available ? (
              <Link key={item.href} href={item.href} className={classes}>
                {content}
              </Link>
            ) : (
              <div key={item.href} className={classes} aria-disabled="true">
                {content}
              </div>
            );
          })}
        </section>

        <section className="mt-6 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-blue-950/40 p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-400">
            {zh ? "当前成长伙伴" : "Current Growth Companion"}
          </p>

          <div className="mt-4 flex items-center gap-4">
            {user.companionAvatar ? (
              <Image
                src={user.companionAvatar}
                alt={companionName}
                width={80}
                height={80}
                className="h-20 w-20 shrink-0"
              />
            ) : (
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-slate-800 text-3xl">✨</div>
            )}

            <div>
              <h2 className="text-2xl font-black">{companionName}</h2>
              <p className="mt-1 text-sm capitalize text-slate-400">
                {user.companionType || (zh ? "成长伙伴" : "Growth companion")}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                {zh ? "成长伙伴平时会在小屋中陪伴你。" : "Your companion lives in the House and grows with you."}
              </p>
            </div>
          </div>
        </section>

        <footer className="py-8 text-center text-xs text-slate-600">
          <p>Time100 · Version 1.0 RC1</p>
          <p className="mt-1">© 2026 eSeeSKy Inc.</p>
        </footer>
      </div>
    </main>
  );
}
