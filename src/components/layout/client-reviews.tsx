import {ClientReviewWall} from "#/components/layout/client-review-wall.tsx";
import {ClientReviewsContent} from "#/components/layout/client-reviews-content.ts";
import {Eyebrow} from "#/components/layout/eyebrow.tsx";

const CLIENT_REVIEWS_TITLE_ID = "client-reviews-heading";

export function ClientReviews() {
  return (
    <section id="client-reviews" aria-labelledby={CLIENT_REVIEWS_TITLE_ID} className="bg-primary-bg">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-9 overflow-hidden px-6 py-16 md:px-10 lg:py-25">
        <div className="flex max-w-[624px] flex-col items-center gap-3.5 text-center">
          <Eyebrow label={ClientReviewsContent.eyebrow} />
          <h2
            id={CLIENT_REVIEWS_TITLE_ID}
            className="text-[32px] leading-[1.1] font-bold tracking-[-0.01em] text-foreground sm:text-[38px] lg:text-[42px]"
          >
            {ClientReviewsContent.heading}
          </h2>
        </div>

        <ClientReviewWall />
      </div>
    </section>
  );
}
