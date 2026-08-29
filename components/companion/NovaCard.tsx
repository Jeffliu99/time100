import Image from "next/image";

export function NovaCard() {
  return (
    <article className="mx-auto max-w-sm rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur">
      <div className="relative mx-auto aspect-square w-40 overflow-hidden rounded-full bg-cyan-300/10">
        <Image
          src="/companions/nova.png"
          alt="Nova companion"
          fill
          priority
          sizes="160px"
          className="object-contain"
        />
      </div>

      <h2 className="mt-5 text-2xl font-semibold">Nova</h2>
      <p className="mt-2 text-sm leading-6 text-slate-300">
        A calm, growth-oriented companion who notices meaningful progress
        without pressure or judgment.
      </p>
    </article>
  );
}
