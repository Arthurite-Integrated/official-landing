import {AwsServiceBackdrop} from "#/components/layout/aws-service-backdrop.tsx";
import {AwsServiceNav} from "#/components/layout/aws-service-nav.tsx";
import {AwsServicePanel} from "#/components/layout/aws-service-panel.tsx";
import {AwsServices} from "#/components/layout/aws-services.ts";
import {scrollItemIntoView, useFocusedIndex} from "#/hooks/use-focused-index.ts";

const SECTION_TITLE_ID = "core-aws-services-title";

export function CoreAwsServices() {
  const {activeIndex, listRef} = useFocusedIndex();

  return (
    <section aria-labelledby={SECTION_TITLE_ID} className="relative bg-[#040c08]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {AwsServices.map((service, index) => (
          <AwsServiceBackdrop key={service.slug} service={service} active={index === activeIndex} />
        ))}

        <div className="relative hidden h-full lg:grid lg:grid-cols-[minmax(0,1fr)_46%] lg:items-start lg:px-14 lg:pt-32 xl:px-20">
          <div />
          <AwsServicePanel service={AwsServices[activeIndex]} />
        </div>
      </div>

      <div className="relative -mt-[100vh] px-5 pt-24 pb-28 sm:px-8 lg:px-14 lg:pt-32 lg:pb-[62vh] xl:px-20">
        <header className="lg:max-w-md">
          <h2 id={SECTION_TITLE_ID} className="text-3xl leading-tight font-medium tracking-tight text-white sm:text-4xl">
            Our core AWS services
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
            We deliver essential AWS services that help businesses build reliable, secure, and scalable cloud environments.
          </p>
        </header>

        <div className="mt-12 lg:mt-16 lg:w-[54%]">
          <AwsServiceNav activeIndex={activeIndex} listRef={listRef} onSelect={(index) => scrollItemIntoView(listRef.current, index)} />
        </div>
      </div>
    </section>
  );
}
