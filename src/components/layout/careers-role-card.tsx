import {ArrowUpRight} from "lucide-react";

import type {OpenRole} from "#/components/layout/careers-data.ts";

type CareersRoleRowProps = {
  readonly role: OpenRole;
  readonly onApply: (role: OpenRole) => void;
};

export function CareersRoleRow({role, onApply}: CareersRoleRowProps) {
  return (
    <button
      type="button"
      onClick={() => onApply(role)}
      className="group flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl border border-foreground/10 px-5 py-4 text-left transition-colors duration-200 hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <div className="flex items-center gap-3">
        <h4 className="text-[15px] font-medium text-foreground/90 transition-colors duration-200 group-hover:text-primary sm:text-base">
          {role.title}
        </h4>
        <ArrowUpRight className="size-4 text-foreground/30 transition-colors duration-200 group-hover:text-primary" aria-hidden="true" />
      </div>
      <span className="shrink-0 text-xs text-foreground/40 sm:text-sm">{role.location}</span>
    </button>
  );
}
