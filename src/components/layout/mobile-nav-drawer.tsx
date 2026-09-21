import {Link} from "@tanstack/react-router";
import {ChevronRight, X} from "lucide-react";

import atrLogo from "@/assets/atr-logo.svg";
import {Button} from "#/components/ui/button.tsx";

type MobileNavDrawerProps = {
  readonly onClose: () => void;
};

const MobileItems = [
  {hasChevron: true, label: "Services", link: "/services"},
  {hasChevron: true, label: "About", link: "/about"},
  {hasChevron: true, label: "Blog", link: "/blog"},
  {hasChevron: true, label: "Events", link: "/events"},
  {hasChevron: true, label: "Join Us", link: "/careers"},
];

function MobileNavSocials() {
  return (
    <div className="mt-auto flex items-center justify-between pt-6 text-sm text-slate-400">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600">
        Facebook
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600">
        Instagram
      </a>
      <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600">
        Twitter
      </a>
    </div>
  );
}

export function MobileNavDrawer({onClose}: MobileNavDrawerProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
      className="fixed inset-0 z-50 flex flex-col bg-white px-6 pt-5 pb-8 animate-in fade-in duration-200"
    >
      <div className="flex items-center justify-between pb-6">
        <Link to="/" onClick={onClose} className="flex items-center">
          <img src={atrLogo} alt="Arthurite Logo" className="h-7 w-auto" />
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:outline-none"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <nav className="flex flex-col gap-1 pt-4">
        {MobileItems.map((item) => (
          <Link
            to={item.link}
            key={item.label}
            onClick={onClose}
            className="flex items-center justify-between py-3.5 text-lg font-medium text-slate-900 transition-colors hover:text-slate-600"
          >
            <span>{item.label}</span>
            {item.hasChevron ? <ChevronRight className="h-5 w-5 text-slate-400" /> : null}
          </Link>
        ))}
      </nav>

      <div className="mt-8">
        <Link to="/contact" onClick={onClose} className="block w-full">
          <Button className="h-12 w-full rounded-xl bg-slate-900 text-base font-semibold text-white shadow-none hover:bg-slate-800">
            Book Free
          </Button>
        </Link>
      </div>

      <MobileNavSocials />
    </div>
  );
}
