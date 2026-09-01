interface Props {
  name: string;
  avatar: string | null;
}

export default function CompanionAvatar({ name, avatar }: Props) {
  const isImage = Boolean(avatar && /^https?:\/\//i.test(avatar));

  return (
    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-violet-400/30 bg-gradient-to-br from-violet-500/20 to-cyan-500/10 text-5xl shadow-xl shadow-violet-950/30 sm:h-28 sm:w-28">
      {isImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={avatar!} alt="" className="h-full w-full object-cover" />
      ) : avatar ? (
        <span aria-hidden="true">{avatar}</span>
      ) : (
        <span aria-hidden="true">{name.slice(0, 1).toUpperCase()}</span>
      )}
    </div>
  );
}
