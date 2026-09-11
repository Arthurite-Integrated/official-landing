import {PartnerLogoList} from "#/components/layout/partner-logo-list.tsx";

export function PartnerMarquee() {
  return (
    <section aria-label="Our partners and clients" className="py-16 sm:py-20">
      <p className="text-center text-[0.95rem] text-neutral-500">The teams that can't afford downtime build with us.</p>

      <div className="partner-marquee mt-12 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]">
        <div className="partner-marquee-track flex w-max items-center">
          <PartnerLogoList />
          <PartnerLogoList duplicate />
        </div>
      </div>
    </section>
  );
}
