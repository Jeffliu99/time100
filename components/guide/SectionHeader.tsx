interface Props {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function SectionHeader({ eyebrow, title, description }: Props) {
  return (
    <header className="max-w-3xl ">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-300">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-7 text-slate-300">{description}</p>
      )}
    </header>
  );
}
