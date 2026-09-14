import type {ClientReview} from "#/components/layout/client-reviews-content.ts";

type ClientReviewCardProps = {
  readonly person: ClientReview;
};

export function ClientReviewCard({person}: ClientReviewCardProps) {
  return (
    <figure className="flex max-w-[490px] flex-col items-center gap-4 rounded-2xl bg-white/60 p-6 text-center backdrop-blur-sm">
      <blockquote className="text-lg leading-[1.4] tracking-[0.01em] text-foreground">“{person.quote}”</blockquote>
      <figcaption className="flex items-center gap-1 text-base tracking-[0.01em]">
        <span className="font-medium text-primary">{person.name}</span>
        <span className="text-[#98a2b3]">/ {person.role}</span>
      </figcaption>
    </figure>
  );
}
