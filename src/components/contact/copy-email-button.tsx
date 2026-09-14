import {useState} from "react";
import {Check, Copy} from "lucide-react";

import {CONTACT_EMAIL} from "#/components/layout/footer-content.ts";

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
  }

  return (
    <button
      type="button"
      onClick={() => void copyEmail()}
      className="inline-flex items-center gap-1.5 align-middle font-medium text-foreground underline-offset-4 hover:underline"
    >
      {copied ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}
