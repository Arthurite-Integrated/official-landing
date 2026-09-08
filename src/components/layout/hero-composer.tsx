import {useState, type FormEvent, type KeyboardEvent} from "react";

import {ComposerChips} from "#/components/layout/composer-chips.tsx";
import {ComposerField} from "#/components/layout/composer-field.tsx";
import {ComposerStatus} from "#/components/layout/composer-status.tsx";
import {usePromptSubmission} from "#/hooks/use-prompt-submission.ts";
import {useRotatingSuggestion} from "#/hooks/use-rotating-suggestion.ts";

const FIELD_ID = "hero-composer-field";

const GHOST_SUGGESTIONS = [
  "Migrate our workloads to AWS",
  "Audit our cloud spend",
  "Modernise a legacy application",
  "Set up managed cloud operations",
];

const QUICK_STARTS = ["Cloud migration", "Cost optimisation", "Security review"];

type HeroComposerProps = {
  readonly onSubmit: (prompt: string) => Promise<void>;
};

export function HeroComposer({onSubmit}: HeroComposerProps) {
  const [prompt, setPrompt] = useState("");
  const {status, send} = usePromptSubmission(onSubmit);
  const suggestion = useRotatingSuggestion(GHOST_SUGGESTIONS, prompt !== "");
  const trimmed = prompt.trim();
  const ghost = prompt === "" ? suggestion : "";
  const sending = status === "sending";

  async function sendPrompt() {
    if (trimmed === "") return;
    if (await send(trimmed)) setPrompt("");
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    void sendPrompt();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Tab" && ghost !== "") {
      event.preventDefault();
      setPrompt(ghost);
      return;
    }

    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendPrompt();
    }
  }

  return (
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
        onKeyDown={handleKeyDown}
      />

      <ComposerStatus status={status} />
      <ComposerChips items={QUICK_STARTS} onSelect={setPrompt} />
    </form>
  );
}
