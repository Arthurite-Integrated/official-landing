import {CompanyFacts} from "#/components/layout/footer-content.ts";

export function FooterFacts() {
  return (
    <dl className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:justify-items-end">
      {CompanyFacts.map((fact) => (
        <div key={fact.label} className="flex items-baseline gap-3">
          <dt className="order-last font-mono text-xs tracking-widest text-primary-bg/65 uppercase">{fact.label}</dt>
          <dd className="font-mono text-5xl font-semibold tracking-tighter tabular-nums lg:text-7xl">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
