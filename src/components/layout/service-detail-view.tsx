import {useState} from "react";
import {Link} from "@tanstack/react-router";
import {ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Cpu, Layers, ShieldCheck, Sparkles} from "lucide-react";

import type {ServiceItem} from "#/lib/services-data.ts";

function ServiceNotFoundView() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-5 py-24 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Service Not Found</h1>
      <p className="mt-4 max-w-md text-base text-foreground/70">
        The requested service could not be found. Please check our services directory for available offerings.
      </p>
      <Link
        to="/services"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary/90"
      >
        <ArrowLeft className="size-4" />
        <span>Back to All Services</span>
      </Link>
    </main>
  );
}

function ServiceTopHeaderNav({service}: {readonly service: ServiceItem}) {
  return (
    <div className="flex flex-col gap-4 border-b border-foreground/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-foreground/60 sm:text-sm">
        <Link to="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="size-3.5" />
        <Link to="/services" className="hover:text-primary transition-colors">
          Services
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground font-semibold">{service.title}</span>
      </nav>

      <Link
        to="/contact"
        className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-primary px-5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-primary/90"
      >
        <span>Book Consultation</span>
        <ArrowRight className="size-3.5" />
      </Link>
    </div>
  );
}

function ServiceShowcaseStage({service}: {readonly service: ServiceItem}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-[#f4f4f2] p-2.5 shadow-xl dark:bg-neutral-900 sm:p-4">
      <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl bg-neutral-900">
        <img src={service.image} alt={service.title} className="h-full w-full object-cover object-center" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>
    </div>
  );
}

function ServiceTabSelector({activeTab, onTabChange}: {readonly activeTab: string; readonly onTabChange: (tab: string) => void}) {
  const tabs = ["Overview", "Capabilities", "Key Benefits", "AWS Stack"];

  return (
    <div className="flex items-center gap-2 border-b border-foreground/10 pb-3 overflow-x-auto no-scrollbar">
      {tabs.map((tab) => {
        const isSelected = activeTab === tab;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={`rounded-full px-5 py-2 text-xs font-semibold transition-all ${
              isSelected
                ? "bg-primary text-white shadow-sm"
                : "border border-foreground/10 bg-foreground/5 text-foreground/70 hover:bg-foreground/10 hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

function ServiceOverviewTab({service}: {readonly service: ServiceItem}) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold tracking-tight text-foreground">Overview & Architectural Approach</h3>
      <p className="text-base leading-relaxed text-foreground/75 sm:text-lg">{service.description}</p>
      <div className="rounded-2xl border border-foreground/10 bg-[#f4f4f2] p-6 dark:bg-neutral-900">
        <h4 className="text-sm font-semibold tracking-wider text-primary uppercase">AWS Well-Architected Guarantee</h4>
        <p className="mt-2 text-sm leading-relaxed text-foreground/70">
          All solution blueprints are designed in accordance with AWS operational excellence, security, reliability, performance efficiency,
          and cost optimization standards.
        </p>
      </div>
    </div>
  );
}

function ServiceCapabilitiesTab({service}: {readonly service: ServiceItem}) {
  return (
    <div className="space-y-6">
      <h3 className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground">
        <Layers className="size-5 text-primary" />
        <span>Core Technical Capabilities</span>
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {service.features.map((feature) => (
          <div key={feature.title} className="rounded-2xl border border-foreground/10 bg-[#f4f4f2] p-5 dark:bg-neutral-900">
            <h4 className="text-base font-semibold text-foreground">{feature.title}</h4>
            <p className="mt-2 text-xs leading-relaxed text-foreground/70 sm:text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServiceBenefitsTab({service}: {readonly service: ServiceItem}) {
  return (
    <div className="space-y-6">
      <h3 className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground">
        <ShieldCheck className="size-5 text-primary" />
        <span>Key Enterprise Benefits</span>
      </h3>
      <ul className="grid gap-3 sm:grid-cols-2">
        {service.keyBenefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-3 rounded-xl border border-foreground/10 bg-[#f4f4f2] p-4 dark:bg-neutral-900">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
            <span className="text-sm font-medium text-foreground/80">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ServiceAwsStackTab({service}: {readonly service: ServiceItem}) {
  return (
    <div className="space-y-6">
      <h3 className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground">
        <Cpu className="size-5 text-primary" />
        <span>AWS Technologies & Integration</span>
      </h3>
      <div className="flex flex-wrap gap-2.5">
        {service.awsServicesUsed.map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center gap-1.5 rounded-xl border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary"
          >
            <Sparkles className="size-3.5" />
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

function ServiceTabContent({activeTab, service}: {readonly activeTab: string; readonly service: ServiceItem}) {
  switch (activeTab) {
    case "Capabilities":
      return <ServiceCapabilitiesTab service={service} />;
    case "Key Benefits":
      return <ServiceBenefitsTab service={service} />;
    case "AWS Stack":
      return <ServiceAwsStackTab service={service} />;
    default:
      return <ServiceOverviewTab service={service} />;
  }
}

function ServiceSidebarCard({service}: {readonly service: ServiceItem}) {
  return (
    <div className="space-y-6 rounded-3xl border border-foreground/10 bg-[#f4f4f2] p-6 shadow-xl dark:bg-neutral-900 sm:p-8">
      <div>
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">A</div>
          <span className="text-xs font-bold text-foreground">Arthurite Integrated</span>
          <span className="rounded bg-primary/90 px-1.5 py-0.5 text-[10px] font-semibold text-white">{service.category}</span>
        </div>

        <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{service.title}</h1>
        <p className="mt-3 text-xs leading-relaxed text-foreground/75 sm:text-sm font-medium">{service.tagline}</p>
      </div>

      <div className="border-t border-b border-foreground/10 py-4 space-y-2.5 text-xs">
        <div className="flex items-center justify-between text-foreground/70">
          <span>SLA & Delivery</span>
          <span className="font-semibold text-foreground">Enterprise 24/7</span>
        </div>
        <div className="flex items-center justify-between text-foreground/70">
          <span>Framework</span>
          <span className="font-semibold text-foreground">AWS Well-Architected</span>
        </div>
        <div className="flex items-center justify-between text-foreground/70">
          <span>Security Baseline</span>
          <span className="font-semibold text-foreground">IAM & KMS Encrypted</span>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <Link
          to="/contact"
          className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary/90"
        >
          <span>Book Consultation</span>
          <ArrowRight className="size-4" />
        </Link>

        <Link
          to="/services"
          className="flex h-10 w-full items-center justify-center gap-2 rounded-full border border-foreground/15 bg-background/80 px-6 text-xs font-semibold text-foreground transition-all hover:bg-foreground/5"
        >
          <span>Back to All Services</span>
        </Link>
      </div>
    </div>
  );
}

export function ServiceDetailView({service}: {readonly service?: ServiceItem}) {
  const [activeTab, setActiveTab] = useState("Overview");

  if (!service) {
    return <ServiceNotFoundView />;
  }

  return (
    <main className="w-full bg-background pt-24 pb-20 sm:pt-28">
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 xl:px-10">
        <ServiceTopHeaderNav service={service} />

        <div className="mt-8 grid gap-8 lg:grid-cols-12 xl:gap-10">
          <div className="space-y-8 lg:col-span-8">
            <ServiceShowcaseStage service={service} />
            <ServiceTabSelector activeTab={activeTab} onTabChange={setActiveTab} />
            <ServiceTabContent activeTab={activeTab} service={service} />
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-28">
              <ServiceSidebarCard service={service} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
