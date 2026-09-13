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
          isActive ? "bg-emerald-400/20 text-emerald-400" : "bg-white/5 text-white/70 group-hover:bg-white/10 group-hover:text-white"
        )}
      >
        <img src={icon} alt={name} className="size-8 object-contain" />
      </div>

      <span
        className={cn(
          "size-3 rounded-full transition-all duration-300",
          isActive ? "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" : "bg-white/20 group-hover:bg-white/40"
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
        "group relative flex h-full w-full flex-col justify-between rounded-3xl p-6 text-left transition-all duration-300 sm:p-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
        isActive
          ? "border-2 border-emerald-400/80 bg-gradient-to-b from-[#06301a] to-[#03180c] shadow-[0_0_35px_rgba(52,211,153,0.18)] scale-[1.02] z-10"
          : "border border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06] hover:scale-[1.01]"
      )}
    >
      <CardIconHeader icon={service.icon} isActive={isActive} name={service.name} />

      <div className="mt-8 space-y-3">
        <h3
          className={cn(
            "text-xl font-medium tracking-tight transition-colors sm:text-2xl",
            isActive ? "text-white" : "text-white/90 group-hover:text-white"
          )}
        >
          {service.name}
        </h3>
        <p
          className={cn(
            "text-sm leading-relaxed transition-colors sm:text-base",
            isActive ? "text-white/80" : "text-white/60 group-hover:text-white/75"
          )}
        >
          {service.description}
        </p>
      </div>
    </button>
  );
}
