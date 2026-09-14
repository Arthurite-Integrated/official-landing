import {VisionMissionCard} from "#/components/about/vision-mission-card.tsx";
import {VisionMissionContent} from "#/components/about/vision-mission-content.ts";
import {Eyebrow} from "#/components/layout/eyebrow.tsx";

const VISION_MISSION_TITLE_ID = "vision-mission-title";

export function VisionMission() {
  const {eyebrow, heading, statements} = VisionMissionContent;

  return (
    <section aria-labelledby={VISION_MISSION_TITLE_ID} className="bg-background px-5 pb-24 sm:px-8 lg:pb-32">
      <div className="mx-auto max-w-6xl xl:max-w-7xl">
        <header className="mb-12 max-w-2xl lg:mb-16">
          <Eyebrow label={eyebrow} />
          <h2
            id={VISION_MISSION_TITLE_ID}
            className="mt-6 text-4xl leading-[1.05] font-medium tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            {heading}
          </h2>
        </header>

        <div className="grid gap-5 lg:grid-cols-2">
          {statements.map((statement, index) => (
            <VisionMissionCard key={statement.title} number={String(index + 1).padStart(2, "0")} statement={statement} />
          ))}
        </div>
      </div>
    </section>
  );
}
