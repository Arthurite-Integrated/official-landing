import {cn} from "@/lib/utils";
import type {AwsService} from "#/components/layout/aws-services.ts";

type AwsServiceBackdropProps = {
  readonly active: boolean;
  readonly service: AwsService;
};

export function AwsServiceBackdrop({active, service}: AwsServiceBackdropProps) {
  return (
    <div
      data-slot="aws-backdrop"
      data-aws-accent={service.slug}
      aria-hidden
      className={cn("absolute inset-0 overflow-hidden transition-opacity duration-1000 ease-out", active ? "opacity-100" : "opacity-0")}
    >
      <div className="aws-backdrop-glow absolute inset-0" />

      <img
        src={service.icon}
        alt=""
        className={cn(
          "aws-backdrop-logo absolute w-auto transition-transform duration-[1600ms] ease-out",
          service.spot,
          active ? "scale-100" : "scale-[1.06]"
        )}
      />

      <div className="aws-backdrop-scrim absolute inset-0" />
    </div>
  );
}
