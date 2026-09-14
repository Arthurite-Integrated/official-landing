import {cn} from "@/lib/utils";
import type {ClientReview} from "#/components/layout/client-reviews-content.ts";

const HEX_TILE = "block aspect-125/140 w-[72px] max-w-none [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)]";

type ClientReviewHexProps = {
  readonly onSelect: (person: ClientReview) => void;
  readonly person: ClientReview | null;
  readonly selected: boolean;
};

export function ClientReviewHex({onSelect, person, selected}: ClientReviewHexProps) {
  if (person === null) {
    return <span data-slot="review-filler" aria-hidden className={cn(HEX_TILE, "bg-foreground/15 opacity-60")} />;
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(person)}
      aria-pressed={selected}
      aria-label={`Read ${person.name}'s testimonial`}
      className={cn(
        "rounded-full outline-none transition-transform focus-visible:ring-2 focus-visible:ring-primary",
        selected ? "z-10 scale-110" : "grayscale hover:grayscale-0"
      )}
    >
      <img src={person.avatar} alt={person.name} className={cn(HEX_TILE, "object-cover")} />
    </button>
  );
}
