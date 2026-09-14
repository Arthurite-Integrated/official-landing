import {cn} from "@/lib/utils";
import type {ManagedService} from "#/components/layout/managed-services-data.ts";

type ManagedServiceCardProps = {
  readonly isActive: boolean;
  readonly onClick: () => void;
  readonly service: ManagedService;
};

function CardIconHeader({icon, isActive, name}: {readonly icon: string; readonly isActive: boolean; readonly name: string}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div
        className={cn(
          "flex size-14 items-center justify-center rounded-2xl p-3 transition-colors duration-300",
          isActive
            ? "bg-primary/15 text-primary"
            : "bg-foreground/5 text-foreground/70 group-hover:bg-foreground/10 group-hover:text-foreground"
        )}
      >
        <img src={icon} alt={name} className="size-8 object-contain" />
      </div>

      <span
        className={cn(
          "size-3 rounded-full transition-all duration-300",
          isActive ? "bg-primary shadow-[0_0_12px_rgba(0,103,89,0.6)]" : "bg-foreground/20 group-hover:bg-foreground/40"
        )}
        aria-hidden="true"
      />
    </div>
  );
}

export function ManagedServiceCard({isActive, onClick, service}: ManagedServiceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        "group relative flex h-full w-full flex-col justify-between rounded-3xl p-6 text-left transition-all duration-300 sm:p-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        isActive
          ? "border-2 border-primary/60 bg-primary/5 shadow-[0_0_30px_rgba(0,103,89,0.12)] scale-[1.02] z-10"
          : "border border-foreground/10 bg-[#f2f2f0] hover:border-foreground/25 hover:bg-[#eaeae8] hover:scale-[1.01]"
      )}
    >
      <CardIconHeader icon={service.icon} isActive={isActive} name={service.name} />

      <div className="mt-8 space-y-3">
        <h3
          className={cn(
            "text-xl font-medium tracking-tight transition-colors sm:text-2xl",
            isActive ? "text-foreground" : "text-foreground/90 group-hover:text-foreground"
          )}
        >
          {service.name}
        </h3>
        <p
          className={cn(
            "text-sm leading-relaxed transition-colors sm:text-base",
            isActive ? "text-foreground/80" : "text-foreground/60 group-hover:text-foreground/75"
          )}
        >
          {service.description}
        </p>
      </div>
    </button>
  );
}
