import {Sparkles} from "lucide-react";

type DataEmptyStateProps = {
  readonly title: string;
  readonly description?: string;
};

export function DataEmptyState({title, description}: DataEmptyStateProps) {
  return (
    <div
      role="status"
      className="flex flex-col items-center rounded-2xl border border-foreground/10 bg-foam px-6 py-9 text-center sm:px-10 sm:py-11"
    >
      <span className="mb-4 grid size-11 place-items-center rounded-full bg-primary/10 text-primary">
        <Sparkles className="size-5" aria-hidden="true" />
      </span>
      <p className="text-lg font-medium tracking-tight text-foreground">{title}</p>
      {description ? <p className="mt-2 max-w-lg text-sm leading-relaxed text-foreground/65">{description}</p> : null}
    </div>
  );
}
