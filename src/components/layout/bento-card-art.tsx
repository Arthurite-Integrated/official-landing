import type {LucideIcon} from "lucide-react";

type BentoCardArtProps = {
  readonly icon: LucideIcon;
};

export function BentoCardArt({icon: Icon}: BentoCardArtProps) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:34px_34px] [mask-image:radial-gradient(120%_120%_at_50%_0%,#000_10%,transparent_70%)] transition-transform duration-700 ease-out group-hover:scale-110" />
      <div className="absolute -top-28 -right-24 size-64 rounded-full bg-white/14 blur-3xl transition-transform duration-700 ease-out group-hover:translate-x-6 group-hover:translate-y-4" />
      <Icon
        className="absolute top-1/2 right-[-2.5rem] size-56 -translate-y-1/2 text-white/8 transition-transform duration-700 ease-out group-hover:-translate-x-2 @md:right-[-3rem] @md:size-72"
        strokeWidth={0.6}
      />
      <div className="absolute inset-x-0 -bottom-1/3 h-2/3 bg-[radial-gradient(closest-side,rgba(255,255,255,0.10),transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_38%,rgba(4,22,12,0.58)_74%,rgba(4,22,12,0.88)_100%)]" />
    </div>
  );
}
