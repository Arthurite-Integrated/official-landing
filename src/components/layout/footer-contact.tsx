import {ArrowRight, Mail} from "lucide-react";

import {CONTACT_EMAIL, FooterOffices, HEAD_OFFICE_ADDRESS} from "#/components/layout/footer-content.ts";

export function FooterContact() {
  return (
    <div>
      <h3 className="text-sm font-semibold">Offices</h3>
      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-primary-bg/65">
        {FooterOffices.map((office) => (
          <li key={office}>{office}</li>
        ))}
      </ul>
      <address className="mt-4 text-sm leading-relaxed text-primary-bg/65 not-italic">Head office: {HEAD_OFFICE_ADDRESS}</address>

      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="group mt-10 flex items-center justify-between gap-3 border-b border-primary-bg/40 pb-3 text-base transition-colors hover:border-primary-bg"
      >
        <span className="flex items-center gap-3">
          <Mail className="size-4" aria-hidden />
          {CONTACT_EMAIL}
        </span>
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
      </a>
    </div>
  );
}
