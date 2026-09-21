import {useCallback, useEffect, useState} from "react";
import {Menu} from "lucide-react";

import {cn} from "@/lib/utils";
import {MobileNavDrawer} from "#/components/layout/mobile-nav-drawer.tsx";

type MobileNavProps = {
  readonly solid: boolean;
};

export function MobileNav({solid}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={handleOpen}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        className={cn(
          "rounded-lg p-2 transition-colors focus:outline-none",
          solid ? "text-primary hover:bg-primary/10" : "text-white hover:bg-white/10"
        )}
      >
        <Menu className="h-6 w-6" />
      </button>

      {isOpen ? <MobileNavDrawer onClose={handleClose} /> : null}
    </div>
  );
}
