import {useMemo} from "react";
import {useQuery} from "@tanstack/react-query";
import {Link} from "@tanstack/react-router";
import {ArrowRight} from "lucide-react";

import {TeamCarousel} from "#/components/about/team-carousel.tsx";
import {toTeamMembers} from "#/components/about/team-content.ts";
import {Eyebrow} from "#/components/layout/eyebrow.tsx";
import {staffQueryOptions} from "#/lib/api/endpoints.ts";

const TEAM_TITLE_ID = "meet-the-team-title";

function TeamBody() {
  const {data, isPending, isError} = useQuery(staffQueryOptions());
  const members = useMemo(() => toTeamMembers(data ?? []), [data]);

  if (isPending) {
    return (
      <div
        aria-busy="true"
        aria-label="Loading team"
        className="aspect-3/4 w-60 animate-pulse rounded-2xl bg-foreground/5 md:w-[360px] lg:rounded-3xl min-[1600px]:w-[480px]"
      />
    );
  }

  if (isError) {
    return (
      <p role="alert" className="text-base text-foreground/50">
        We couldn't load the team right now. Please try again later.
      </p>
    );
  }

  return members.length > 0 ? <TeamCarousel members={members} /> : null;
}

export function MeetTheTeam() {
  return (
    <section
      aria-labelledby={TEAM_TITLE_ID}
      className="flex flex-col items-center gap-12 bg-background px-5 pb-24 text-center sm:px-8 lg:gap-16 lg:pb-32"
    >
      <h2 id={TEAM_TITLE_ID}>
        <Eyebrow label="Meet the team" />
      </h2>

      <TeamBody />

      <Link to="/careers" className="group inline-flex items-center gap-3 text-lg text-foreground">
        Join our team
        <span className="grid size-6 place-items-center rounded-full border border-transparent bg-foreground text-background transition-colors duration-150 group-hover:border-foreground group-hover:bg-transparent group-hover:text-foreground">
          <ArrowRight className="size-3.5" aria-hidden />
        </span>
      </Link>
    </section>
  );
}
