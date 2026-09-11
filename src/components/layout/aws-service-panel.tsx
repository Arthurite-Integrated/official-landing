import type {AwsService} from "#/components/layout/aws-services.ts";

type AwsServicePanelProps = {
  readonly service: AwsService;
};

export function AwsServicePanel({service}: AwsServicePanelProps) {
  return (
    <div data-slot="aws-service-panel" className="hidden lg:block">
      <div
        data-slot="aws-service-card"
        data-aws-accent={service.slug}
        key={service.name}
        className="relative flex h-[42vh] min-h-72 animate-in items-center justify-center overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#040b07]/94 backdrop-blur-2xl duration-700 fade-in"
      >
        <div aria-hidden className="aws-card-halo absolute inset-0" />
        <img src={service.icon} alt={service.name} className="relative size-40 xl:size-48" />
      </div>

      <h3 key={`${service.name}-title`} className="mt-6 animate-in text-xl font-medium text-white duration-500 fade-in">
        {service.name}
      </h3>
      <p className="mt-2 max-w-xl text-[0.95rem] leading-relaxed text-white/75">{service.description}</p>
    </div>
  );
}
