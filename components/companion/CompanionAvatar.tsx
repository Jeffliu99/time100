interface Props {
  name: string;
  avatar: string | null;
}

export default function CompanionAvatar({ name, avatar }: Props) {
  let imageSrc: string | null = null;

  if (avatar) {
    if (/^https?:\/\//i.test(avatar)) {
      imageSrc = avatar;
    } else if (avatar.startsWith("/")) {
      imageSrc = avatar;
    } else if (avatar.includes("/")) {
      imageSrc = `/${avatar.replace(/^\/+/, "")}`;
    } else {
      imageSrc = `/companions/${avatar}/avatar.png`;
    }
  }

  return (
    <div className="mx-auto flex h-36 w-36 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-violet-400/30 bg-gradient-to-br from-violet-500/20 to-cyan-500/10 shadow-xl shadow-violet-950/30 sm:h-44 sm:w-44 lg:mx-0 lg:h-64 lg:w-64">
      {imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt={name}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="text-5xl font-black text-white" aria-hidden="true">
          {name.slice(0, 1).toUpperCase()}
        </span>
      )}
    </div>
  );
}
