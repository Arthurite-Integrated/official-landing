import type {IndustryItem} from "#/components/layout/who-we-serve-data.ts";

type WhoWeServeCardProps = {
  readonly index: number;
  readonly item: IndustryItem;
};

export function WhoWeServeCard({index, item}: WhoWeServeCardProps) {
  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-foreground/10 bg-[#f2f2f0] p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 sm:p-7">
      <div>
        <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5 sm:h-52">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
          <span className="absolute left-3 top-3 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-mono font-medium tracking-wider text-primary backdrop-blur-md">
            {formattedIndex}
          </span>
        </div>

        <h3 className="mt-6 text-2xl font-medium tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
          {item.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-foreground/65">{item.description}</p>
      </div>

      <div className="mt-6 flex items-center gap-2 text-xs font-semibold tracking-wider text-primary/80 uppercase">
        <span className="size-1.5 rounded-full bg-primary" />
        Industry Solution
      </div>
    </article>
  );
}
