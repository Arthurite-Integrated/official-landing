import {useState} from "react";
import {ArrowLeft, ArrowRight} from "lucide-react";

import type {TeamMember} from "#/components/about/team-content.ts";
import {TeamStack} from "#/components/about/team-stack.tsx";
import {stepIndex} from "#/lib/projects-schema.ts";

const ARROW_BUTTON =
  "hidden size-11 shrink-0 place-items-center rounded-full border border-foreground/20 text-foreground transition-[color,background-color,border-color,scale] duration-150 hover:border-transparent hover:bg-foreground hover:text-background active:scale-[0.97] motion-reduce:active:scale-100 md:grid";

type TeamCarouselProps = {
  readonly members: readonly TeamMember[];
};

export function TeamCarousel({members}: TeamCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const member = members[activeIndex];

  function step(delta: number) {
    setActiveIndex((index) => stepIndex(index, delta, members.length));
  }

  return (
    <>
      <div className="flex w-full items-center justify-center md:max-w-[74.5%] md:justify-between xl:max-w-[49.25%]">
        <button type="button" aria-label="Previous team member" onClick={() => step(-1)} className={ARROW_BUTTON}>
          <ArrowLeft className="size-5" aria-hidden />
        </button>
        <TeamStack activeIndex={activeIndex} members={members} onAdvance={() => step(1)} />
        <button type="button" aria-label="Next team member" onClick={() => step(1)} className={ARROW_BUTTON}>
          <ArrowRight className="size-5" aria-hidden />
        </button>
      </div>

      <div aria-live="polite" className="flex max-w-2xl flex-col items-center">
        <h3 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{member.name}</h3>
        <p className="mt-2 text-lg font-semibold text-primary">{member.position}</p>
        <blockquote className="mt-6 text-lg leading-relaxed text-foreground/75 sm:text-xl">“{member.quote}”</blockquote>
      </div>
    </>
  );
}
