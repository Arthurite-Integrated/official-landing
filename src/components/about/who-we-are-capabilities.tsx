import {cn} from "@/lib/utils";
import type {WhoWeAreContent} from "#/components/about/who-we-are-content.ts";

type WhoWeAreCapabilitiesProps = {
  readonly capabilities: (typeof WhoWeAreContent)["capabilities"];
  readonly className?: string;
};

export function WhoWeAreCapabilities({capabilities, className}: WhoWeAreCapabilitiesProps) {
  return (
    <ol className={cn("border-t border-foreground/10", className)}>
      {capabilities.map((capability, index) => (
        <li key={capability.title} className="grid grid-cols-[auto_1fr] gap-x-5 border-b border-foreground/10 py-6">
          <span aria-hidden className="pt-1 font-mono text-xs tracking-widest text-primary">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">{capability.title}</h3>
            <p className="mt-2 text-base leading-relaxed text-foreground/70">{capability.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
