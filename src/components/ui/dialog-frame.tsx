import {useEffect, type ReactNode} from "react";
import {X} from "lucide-react";

import {cn} from "@/lib/utils";

type DialogFrameProps = {
  readonly labelledBy: string;
  readonly onClose: () => void;
  readonly children: ReactNode;
};

export function DialogFrame({labelledBy, onClose, children}: DialogFrameProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-[#0a1418]/75 backdrop-blur-sm animate-in fade-in duration-200"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-primary-bg p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 sm:p-8"
      >
        {children}
      </div>
    </div>
  );
}

export function DialogCloseButton({onClose, className}: {readonly onClose: () => void; readonly className?: string}) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="Close dialog"
      className={cn("rounded-lg p-2 text-foreground/60 transition-colors hover:bg-foreground/5 hover:text-foreground", className)}
    >
      <X className="size-5" />
    </button>
  );
}
