import type {ReactNode} from "react";

import {cn} from "@/lib/utils";

type FieldControlProps = {
  readonly "aria-describedby": string | undefined;
  readonly "aria-invalid": boolean;
  readonly id: string;
  readonly name: string;
  readonly required: boolean;
};

type ContactFieldProps = {
  readonly children: (control: FieldControlProps) => ReactNode;
  readonly error: string | undefined;
  readonly label: string;
  readonly name: string;
  readonly optional?: boolean;
  readonly wide?: boolean;
};

export function ContactField({children, error, label, name, optional = false, wide = false}: ContactFieldProps) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;

  return (
    <div className={cn("flex flex-col gap-2", wide && "sm:col-span-2")}>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {optional ? (
          <span className="font-normal text-foreground/50"> (optional)</span>
        ) : (
          <span aria-hidden className="text-primary">
            *
          </span>
        )}
      </label>

      {children({
        "aria-describedby": error === undefined ? undefined : errorId,
        "aria-invalid": error !== undefined,
        id,
        name,
        required: !optional,
      })}

      {error === undefined ? null : (
        <p id={errorId} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
