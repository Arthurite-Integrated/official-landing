import {Check, Minus} from "lucide-react";

import type {FeatureRow} from "#/components/layout/services-feature-compare-data.ts";

type CompareTableProps = {
  readonly rows: readonly FeatureRow[];
};

function FeatureCell({value}: {readonly value: boolean | string}) {
  if (typeof value === "boolean") {
    return value ? (
      <span className="inline-flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Check className="size-4" aria-hidden />
        <span className="sr-only">Included</span>
      </span>
    ) : (
      <span className="inline-flex size-6 items-center justify-center rounded-full bg-foreground/5 text-foreground/20">
        <Minus className="size-4" aria-hidden />
        <span className="sr-only">Not included</span>
      </span>
    );
  }

  return <span className="text-xs font-medium text-foreground/80 sm:text-sm">{value}</span>;
}

export function ServicesFeatureCompareTable({rows}: CompareTableProps) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-foreground/10 bg-[#f2f2f0] shadow-sm">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-foreground/10 bg-foreground/5 text-xs font-semibold uppercase tracking-wider text-foreground/60">
            <th scope="col" className="p-4 sm:p-5">
              Feature
            </th>
            <th scope="col" className="p-4 text-center sm:p-5">
              Starter
            </th>
            <th scope="col" className="relative p-4 text-center text-primary sm:p-5">
              <div aria-hidden className="absolute inset-0 bg-primary/5" />
              <span className="relative z-10 flex items-center justify-center gap-1.5">
                Growth
                <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold text-primary">POPULAR</span>
              </span>
            </th>
            <th scope="col" className="p-4 text-center sm:p-5">
              Enterprise
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-foreground/5 text-sm">
          {rows.map((row) => (
            <tr key={row.name} className="transition-colors hover:bg-foreground/[0.03]">
              <th scope="row" className="p-4 font-normal text-foreground sm:p-5">
                {row.name}
              </th>
              <td className="p-4 text-center sm:p-5">
                <FeatureCell value={row.starter} />
              </td>
              <td className="relative p-4 text-center sm:p-5">
                <div aria-hidden className="absolute inset-0 bg-primary/[0.03]" />
                <span className="relative z-10">
                  <FeatureCell value={row.growth} />
                </span>
              </td>
              <td className="p-4 text-center sm:p-5">
                <FeatureCell value={row.enterprise} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
