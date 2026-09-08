import {type SendStatus} from "#/hooks/use-prompt-submission.ts";

const MESSAGES = {
  sent: "Thanks — your request is on its way. An engineer replies within one business day.",
  failed: "We could not send that just now. Please try again.",
} as const;

export function ComposerStatus({status}: {readonly status: SendStatus}) {
  if (status === "sent") {
    return (
      <p role="status" className="px-3 pt-3 text-center text-xs text-white/80">
        {MESSAGES.sent}
      </p>
    );
  }

  if (status === "failed") {
    return (
      <p role="alert" className="px-3 pt-3 text-center text-xs text-red-200">
        {MESSAGES.failed}
      </p>
    );
  }

  return null;
}
