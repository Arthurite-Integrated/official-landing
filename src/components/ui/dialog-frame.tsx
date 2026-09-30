import {Dialog} from "@base-ui/react/dialog";
import {X} from "lucide-react";
import type {ReactNode} from "react";

import {cn} from "@/lib/utils";

type DialogFrameProps = {
  readonly labelledBy: string;
  readonly onClose: () => void;
  readonly children: ReactNode;
};

export function DialogFrame({labelledBy, onClose, children}: DialogFrameProps) {
  return (
    <Dialog.Root
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop
          data-testid="dialog-backdrop"
          className="fixed inset-0 z-[100] bg-[#0a1418]/75 backdrop-blur-sm animate-in fade-in duration-200"
        />
        <Dialog.Popup
          aria-labelledby={labelledBy}
          className="fixed top-1/2 left-1/2 z-[100] max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl bg-primary-bg p-6 shadow-2xl outline-none animate-in fade-in zoom-in-95 duration-200 sm:p-8"
        >
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
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
