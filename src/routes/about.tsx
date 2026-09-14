import {createFileRoute} from "@tanstack/react-router";

import {AboutHero} from "#/components/about/about-hero.tsx";
import {FounderStatement} from "#/components/about/founder-statement.tsx";
import {MeetTheTeam} from "#/components/about/meet-the-team.tsx";
import {VisionMission} from "#/components/about/vision-mission.tsx";
import {WhoWeAre} from "#/components/about/who-we-are.tsx";
import {AwardsAndRecognition} from "#/components/layout/awards-recognition.tsx";
import {InTheSpotlight} from "#/components/layout/in-the-spotlight.tsx";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <main className="bg-background">
      <AboutHero />
      <FounderStatement />
      <MeetTheTeam />
      <WhoWeAre />
      <VisionMission />
      <AwardsAndRecognition />
      <InTheSpotlight />
    </main>
  );
}
