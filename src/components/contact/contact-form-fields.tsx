import {ChevronDown} from "lucide-react";

import {cn} from "@/lib/utils";
import {ContactField} from "#/components/contact/contact-field.tsx";
import {COMPANY_SIZES} from "#/lib/contact-request.ts";
import type {ContactFieldErrors} from "#/lib/contact-request.ts";

const CONTROL =
  "w-full rounded-xl border border-foreground/10 bg-foam px-4 text-base text-foreground transition-[border-color,box-shadow] outline-none placeholder:text-foreground/35 focus:border-primary focus:ring-4 focus:ring-primary/15 aria-invalid:border-destructive";

const TEXT_FIELDS = [
  {name: "firstName", label: "First name", type: "text", autoComplete: "given-name", placeholder: "Ada"},
  {name: "lastName", label: "Last name", type: "text", autoComplete: "family-name", placeholder: "Okafor"},
  {name: "workEmail", label: "Work email", type: "email", autoComplete: "email", placeholder: "ada@company.com"},
  {name: "phone", label: "Phone", type: "tel", autoComplete: "tel", placeholder: "+2348012345678"},
  {name: "jobTitle", label: "Job title", type: "text", autoComplete: "organization-title", placeholder: "Head of Engineering"},
  {name: "companyName", label: "Company name", type: "text", autoComplete: "organization", placeholder: "Acme Logistics"},
] as const;

type ContactFormFieldsProps = {
  readonly errors: ContactFieldErrors;
};

export function ContactIdentityFields({errors}: ContactFormFieldsProps) {
  return (
    <>
      {TEXT_FIELDS.map((field) => (
        <ContactField key={field.name} name={field.name} label={field.label} error={errors[field.name]}>
          {(control) => (
            <input
              {...control}
              type={field.type}
              autoComplete={field.autoComplete}
              placeholder={field.placeholder}
              className={cn(CONTROL, "h-12")}
            />
          )}
        </ContactField>
      ))}

      <ContactField name="companySize" label="Company size" error={errors.companySize} wide>
        {(control) => (
          <div className="relative">
            <select {...control} defaultValue="" className={cn(CONTROL, "h-12 appearance-none pr-10")}>
              <option value="">Select</option>
              {COMPANY_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-foreground/50" aria-hidden />
          </div>
        )}
      </ContactField>
    </>
  );
}

export function ContactFormFields({errors}: ContactFormFieldsProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <ContactIdentityFields errors={errors} />

      <ContactField name="message" label="Message" error={errors.message} wide>
        {(control) => (
          <textarea {...control} rows={5} placeholder="Tell us about your cloud goals…" className={cn(CONTROL, "resize-y py-3")} />
        )}
      </ContactField>
    </div>
  );
}
