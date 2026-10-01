import {useState, type FormEvent, type KeyboardEvent} from "react";

import {ComposerField} from "#/components/layout/composer-field.tsx";
import {ComposerStatus} from "#/components/layout/composer-status.tsx";
import {HeroContactModal} from "#/components/layout/hero-contact-modal.tsx";
import {usePromptSubmission} from "#/hooks/use-prompt-submission.ts";
import {useRotatingSuggestion} from "#/hooks/use-rotating-suggestion.ts";
import type {ContactRequest, EnquiryDetails} from "#/lib/contact-request.ts";

const FIELD_ID = "hero-composer-field";

const GHOST_SUGGESTIONS = [
  "Migrate our workloads to AWS",
  "Audit our cloud spend",
  "Modernise a legacy application",
  "Set up managed cloud operations",
];

type HeroComposerProps = {
  readonly onSubmit: (request: ContactRequest) => Promise<unknown>;
};

type ComposerKeys = {
  readonly ghost: string;
  readonly onOpenDetails: () => void;
  readonly onSetPrompt: (value: string) => void;
};

function handleComposerKeyDown(event: KeyboardEvent<HTMLTextAreaElement>, {ghost, onOpenDetails, onSetPrompt}: ComposerKeys) {
  if (event.key === "Tab" && ghost !== "") {
    event.preventDefault();
    onSetPrompt(ghost);
    return;
  }

  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    onOpenDetails();
  }
}

export function HeroComposer({onSubmit}: HeroComposerProps) {
  const [prompt, setPrompt] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const {status, send} = usePromptSubmission<ContactRequest>(onSubmit);
  const suggestion = useRotatingSuggestion(GHOST_SUGGESTIONS, prompt !== "");
  const trimmed = prompt.trim();
  const ghost = prompt === "" ? suggestion : "";
  const sending = status === "sending";
  const openDetails = () => setDetailsOpen(trimmed !== "");

  async function sendRequest(details: EnquiryDetails) {
    if (await send({...details, message: trimmed})) {
      setDetailsOpen(false);
      setPrompt("");
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    openDetails();
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl rounded-[28px] border border-white/18 bg-white/12 p-3 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
      >
        <label htmlFor={FIELD_ID} className="block px-3 pt-2 pb-3 text-center text-sm font-medium text-white/85">
          What do you need from your cloud team?
        </label>

        <ComposerField
          id={FIELD_ID}
          value={prompt}
          ghost={ghost}
          sending={sending}
          canSubmit={trimmed !== "" && !sending}
          onChange={(event) => setPrompt(event.target.value)}
          onKeyDown={(event) => handleComposerKeyDown(event, {ghost, onOpenDetails: openDetails, onSetPrompt: setPrompt})}
        />

        <ComposerStatus status={status} />
      </form>

      {detailsOpen ? (
        <HeroContactModal prompt={trimmed} status={status} onClose={() => setDetailsOpen(false)} onSubmit={sendRequest} />
      ) : null}
    </>
  );
}
