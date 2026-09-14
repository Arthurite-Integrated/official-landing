import {ArrowUpRight} from "lucide-react";

import type {OpenRole} from "#/components/layout/careers-data.ts";

type CareersRoleRowProps = {
  readonly role: OpenRole;
};

export function CareersRoleRow({role}: CareersRoleRowProps) {
  return (
    <a
      href={`#apply-${role.id}`}
      className="group flex items-center justify-between border-b border-foreground/10 py-4 transition-colors duration-200 hover:border-primary/30"
    >
      <div className="flex items-center gap-3">
        <h4 className="text-[15px] font-medium text-foreground/90 transition-colors duration-200 group-hover:text-primary sm:text-base">
          {role.title}
        </h4>
        <ArrowUpRight className="size-4 text-primary/0 transition-all duration-200 group-hover:text-primary" aria-hidden="true" />
      </div>
      <span className="shrink-0 text-xs text-foreground/40 sm:text-sm">{role.location}</span>
    </a>
  );
}
