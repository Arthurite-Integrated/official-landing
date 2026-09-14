import {cn} from "@/lib/utils";
import {PersonPortrait} from "#/components/about/person-portrait.tsx";
import type {TeamMember} from "#/components/about/team-content.ts";
import {stepIndex} from "#/lib/projects-schema.ts";

/** Matic's stack: the front card, then two cards fanned out behind it. Any further cards wait hidden at the back. */
const LAYER_BY_DEPTH = [
  "z-30 opacity-100",
  "z-20 translate-x-[6%] scale-96 rotate-2 opacity-85",
  "z-10 translate-x-[12%] scale-92 rotate-3 opacity-70",
];

const HIDDEN_LAYER = "z-0 translate-x-[12%] scale-92 rotate-3 opacity-0";

type TeamStackProps = {
  readonly activeIndex: number;
  readonly members: readonly TeamMember[];
  readonly onAdvance: () => void;
};

export function TeamStack({activeIndex, members, onAdvance}: TeamStackProps) {
  return (
    <button
      type="button"
      aria-label="Show next team member"
      onClick={onAdvance}
      className="relative aspect-3/4 w-60 shrink-0 md:w-[360px] min-[1600px]:w-[480px]"
    >
      {members.map((member, index) => (
        <div
          key={member.id}
          data-slot="team-card"
          className={cn(
            "absolute inset-0 transition-[translate,scale,rotate,opacity] duration-500 ease-out motion-reduce:transition-none",
            LAYER_BY_DEPTH[stepIndex(index, -activeIndex, members.length)] ?? HIDDEN_LAYER
          )}
        >
          <PersonPortrait
            className="size-full rounded-2xl lg:rounded-3xl"
            photo={member.photo}
            name={member.name}
            initials={member.initials}
          />
        </div>
      ))}
    </button>
  );
}
