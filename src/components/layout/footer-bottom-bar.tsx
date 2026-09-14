import {FooterSocials} from "#/components/layout/footer-content.ts";

export function FooterBottomBar() {
  const year = new Date().getFullYear();

  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 pt-6 text-sm text-foreground/60 sm:flex-row sm:justify-between sm:px-8 xl:max-w-7xl">
      <p>© {year} Arthurite Integrated. All rights reserved.</p>

      <ul className="flex items-center gap-1">
        {FooterSocials.map((social) => {
          const Icon = social.icon;

          return (
            <li key={social.name}>
              <a
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Arthurite Integrated on ${social.name}`}
                className="grid size-9 place-items-center rounded-full transition-colors hover:bg-primary/8 hover:text-primary"
              >
                <Icon className="size-4" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
