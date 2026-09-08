import {type ChangeEvent, type KeyboardEvent} from "react";

import {ArrowUp, Loader2} from "lucide-react";

type ComposerFieldProps = {
  readonly id: string;
  readonly value: string;
  readonly ghost: string;
  readonly sending: boolean;
  readonly canSubmit: boolean;
  readonly onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  readonly onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
};

export function ComposerField({id, value, ghost, sending, canSubmit, onChange, onKeyDown}: ComposerFieldProps) {
  return (
    <div className="relative rounded-2xl bg-white/95 px-4 pt-4 pb-11">
      {ghost !== "" && (
        <span
          aria-hidden
          data-testid="composer-ghost"
          className="pointer-events-none absolute inset-x-4 top-4 truncate text-base text-primary/35"
        >
          {ghost}
        </span>
      )}

      <textarea
        id={id}
        rows={2}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="relative w-full resize-none bg-transparent text-base leading-relaxed text-primary outline-none"
      />

      {ghost !== "" && (
        <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-primary/35">tab to accept</span>
      )}

      <button
        type="submit"
        aria-label="Send"
        disabled={!canSubmit}
        className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full bg-primary text-white transition-opacity hover:bg-primary/90 disabled:opacity-30"
      >
        {sending ? <Loader2 aria-hidden className="size-4 animate-spin" /> : <ArrowUp aria-hidden className="size-4" />}
      </button>
    </div>
  );
}
