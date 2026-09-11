import type {IndustryItem} from "#/components/layout/who-we-serve-data.ts";

type WhoWeServeCardProps = {
  readonly index: number;
  readonly item: IndustryItem;
};

export function WhoWeServeCard({index, item}: WhoWeServeCardProps) {
  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#041209]/80 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-emerald-500/40 hover:bg-[#061a0d]/90 hover:shadow-[0_0_50px_rgba(16,185,129,0.18)] sm:p-7">
      <div
        aria-hidden
        className="absolute -right-12 -top-12 size-36 rounded-full bg-emerald-500/10 blur-2xl transition-all duration-500 group-hover:bg-emerald-500/20"
      />

      <div>
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60 sm:h-52">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#041209]/90 via-transparent to-transparent" />
          <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs font-mono font-medium tracking-wider text-emerald-400 backdrop-blur-md">
            {formattedIndex}
          </span>
        </div>

        <h3 className="mt-6 text-2xl font-medium tracking-tight text-white transition-colors duration-300 group-hover:text-emerald-400">
          {item.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-white/65">{item.description}</p>
      </div>

      <div className="mt-6 flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-400/80 uppercase">
        <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        Industry Solution
      </div>
    </article>
  );
}
