import type {RefObject} from "react";

import {cn} from "@/lib/utils";
import {AwsServices} from "#/components/layout/aws-services.ts";

type AwsServiceNavProps = {
  readonly activeIndex: number;
  readonly listRef: RefObject<HTMLUListElement | null>;
  readonly onSelect: (index: number) => void;
};

export function AwsServiceNav({activeIndex, listRef, onSelect}: AwsServiceNavProps) {
  return (
    <ul ref={listRef} className="flex flex-col gap-10 lg:gap-0">
      {AwsServices.map((service, index) => (
        <li key={service.slug} className="lg:flex lg:min-h-[17vh] lg:flex-col lg:justify-center">
          <div className="flex items-center gap-3">
            <img src={service.icon} alt={service.name} className="size-9 shrink-0 lg:hidden" />

            <button
              type="button"
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => onSelect(index)}
              className={cn(
                "block cursor-pointer text-left text-2xl font-medium tracking-tight transition-colors duration-500 sm:text-3xl lg:w-full lg:text-[3.15rem] lg:leading-[1.1] xl:text-[3.6rem]",
                index === activeIndex ? "text-white" : "text-white/70 hover:text-white/80 lg:text-white/25"
              )}
            >
              {service.name}
            </button>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-white/60 lg:hidden">{service.description}</p>
        </li>
      ))}
    </ul>
  );
}
