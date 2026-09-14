import {cn} from "@/lib/utils";

type PersonPortraitProps = {
  readonly className?: string;
  readonly initials: string;
  readonly name: string;
  readonly photo: string | null;
};

export function PersonPortrait({className, initials, name, photo}: PersonPortraitProps) {
  return (
    <div className={cn("@container relative isolate overflow-hidden bg-primary", className)}>
      {photo === null ? (
        <div
          aria-hidden
          className="absolute inset-0 grid place-items-center bg-[radial-gradient(120%_90%_at_15%_0%,rgba(255,255,255,0.2),transparent_60%),linear-gradient(160deg,#006759_0%,#01332c_100%)]"
        >
          <span className="text-[42cqw] leading-none font-medium tracking-tighter text-white/15 select-none">{initials}</span>
        </div>
      ) : (
        <img src={photo} alt={name} className="absolute inset-0 size-full object-cover" />
      )}

      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/30 to-transparent" />
    </div>
  );
}
