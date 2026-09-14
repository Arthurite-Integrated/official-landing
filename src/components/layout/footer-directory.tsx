import {Link} from "@tanstack/react-router";

import {FooterContact} from "#/components/layout/footer-contact.tsx";
import {FooterLinkGroups} from "#/components/layout/footer-content.ts";

export function FooterDirectory() {
  return (
    <div className="mt-20 grid gap-12 border-t border-primary-bg/15 pt-12 sm:grid-cols-2 lg:mt-28 lg:grid-cols-[repeat(3,minmax(0,1fr))_1.4fr]">
      {FooterLinkGroups.map((group) => (
        <div key={group.title}>
          <h3 className="text-sm font-semibold">{group.title}</h3>
          <ul className="mt-5 space-y-3">
            {group.links.map((item) => (
              <li key={item.label}>
                <Link to={item.link} className="text-sm text-primary-bg/65 transition-colors hover:text-primary-bg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <FooterContact />
    </div>
  );
}
