import {FooterBottomBar} from "#/components/layout/footer-bottom-bar.tsx";
import {FooterCta} from "#/components/layout/footer-cta.tsx";
import {FooterDirectory} from "#/components/layout/footer-directory.tsx";
import {FooterFacts} from "#/components/layout/footer-facts.tsx";

export function SiteFooter() {
  return (
    <footer className="bg-background px-3 pt-24 pb-6 sm:px-5 lg:pt-32">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-primary text-primary-bg">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(55%_60%_at_85%_0%,rgba(251,255,224,0.16),transparent_70%)]"
        />

        <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 lg:pt-24 xl:max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <FooterCta />
            <FooterFacts />
          </div>

          <FooterDirectory />
        </div>

        {/* Pushed past the panel's bottom edge so the clipped letters read as a brand band, as on matic.com. */}
        <p
          aria-hidden
          className="mt-16 translate-y-[14%] text-center text-[21vw] leading-[0.72] font-semibold tracking-[-0.06em] whitespace-nowrap select-none lg:mt-24"
        >
          Arthurite
        </p>
      </div>

      <FooterBottomBar />
    </footer>
  );
}
