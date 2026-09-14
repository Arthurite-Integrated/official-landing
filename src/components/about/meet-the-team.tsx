import {useState} from "react";
import {Link} from "@tanstack/react-router";
import {ArrowLeft, ArrowRight} from "lucide-react";

import {TeamMembers} from "#/components/about/team-content.ts";
import {TeamStack} from "#/components/about/team-stack.tsx";
import {Eyebrow} from "#/components/layout/eyebrow.tsx";
import {stepIndex} from "#/lib/projects-schema.ts";

const TEAM_TITLE_ID = "meet-the-team-title";

const ARROW_BUTTON =
  "hidden size-11 shrink-0 place-items-center rounded-full border border-foreground/20 text-foreground transition-[color,background-color,border-color,scale] duration-150 hover:border-transparent hover:bg-foreground hover:text-background active:scale-[0.97] motion-reduce:active:scale-100 md:grid";

export function MeetTheTeam() {
  const [activeIndex, setActiveIndex] = useState(0);
  const member = TeamMembers[activeIndex];

  function step(delta: number) {
    setActiveIndex((index) => stepIndex(index, delta, TeamMembers.length));
  }

  return (
    <section
      aria-labelledby={TEAM_TITLE_ID}
      className="flex flex-col items-center gap-12 bg-background px-5 pb-24 text-center sm:px-8 lg:gap-16 lg:pb-32"
    >
      <h2 id={TEAM_TITLE_ID}>
        <Eyebrow label="Meet the team" />
      </h2>

      <div className="flex w-full items-center justify-center md:max-w-[74.5%] md:justify-between xl:max-w-[49.25%]">
        <button type="button" aria-label="Previous team member" onClick={() => step(-1)} className={ARROW_BUTTON}>
          <ArrowLeft className="size-5" aria-hidden />
        </button>
        <TeamStack activeIndex={activeIndex} members={TeamMembers} onAdvance={() => step(1)} />
        <button type="button" aria-label="Next team member" onClick={() => step(1)} className={ARROW_BUTTON}>
          <ArrowRight className="size-5" aria-hidden />
        </button>
      </div>

      <div aria-live="polite" className="flex max-w-2xl flex-col items-center">
        <h3 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{member.name}</h3>
        <p className="mt-2 text-lg font-semibold text-primary">{member.position}</p>
        <blockquote className="mt-6 text-lg leading-relaxed text-foreground/75 sm:text-xl">“{member.quote}”</blockquote>
      </div>

      <Link to="/careers" className="group inline-flex items-center gap-3 text-lg text-foreground">
        Join our team
        <span className="grid size-6 place-items-center rounded-full border border-transparent bg-foreground text-background transition-colors duration-150 group-hover:border-foreground group-hover:bg-transparent group-hover:text-foreground">
          <ArrowRight className="size-3.5" aria-hidden />
        </span>
      </Link>
    </section>
  );
}
