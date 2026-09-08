import {createFileRoute} from "@tanstack/react-router";

import {HeroBackground} from "#/components/layout/hero-background.tsx";
import {HomeHero} from "#/components/layout/home-hero.tsx";
import {ScrollPlaceholder} from "#/components/layout/scroll-placeholder.tsx";

export const Route = createFileRoute("/")({component: App});

function App() {
  return (
    <main>
      <HeroBackground>
        <HomeHero />
      </HeroBackground>
      <ScrollPlaceholder />
    </main>
  );
}
