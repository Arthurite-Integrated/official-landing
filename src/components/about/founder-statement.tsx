import {FounderStatementContent} from "#/components/about/founder-statement-content.ts";
import {PersonPortrait} from "#/components/about/person-portrait.tsx";
import {Eyebrow} from "#/components/layout/eyebrow.tsx";

const FOUNDER_TITLE_ID = "founder-statement-title";

export function FounderStatement() {
  const {eyebrow, heading, initials, name, paragraphs, photo, role} = FounderStatementContent;
  const [lede, ...body] = paragraphs;

  return (
    <section aria-label={eyebrow} className="bg-background px-5 pb-24 sm:px-8 lg:pb-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-20 xl:max-w-7xl">
        <div className="mx-auto w-full max-w-xl lg:sticky lg:top-28 lg:max-w-none lg:self-start">
          <PersonPortrait className="aspect-4/5 rounded-3xl" photo={photo} name={name} initials={initials} />
        </div>

        <div>
          <Eyebrow label={eyebrow} />
          <h2
            id={FOUNDER_TITLE_ID}
            className="mt-6 text-4xl leading-[1.05] font-medium tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl"
          >
            {heading}
          </h2>

          <figure className="mt-12 border-t border-foreground/10 pt-12">
            <blockquote className="space-y-6 text-base leading-relaxed text-foreground/70 sm:text-lg">
              <p className="text-xl leading-relaxed text-foreground sm:text-2xl">{lede}</p>
              {body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </blockquote>

            <figcaption className="mt-10 flex items-center gap-4">
              <span aria-hidden className="h-px w-10 bg-primary" />
              <span>
                <span className="block font-medium text-foreground">{name}</span>
                <span className="block text-sm text-foreground/60">{role}</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
