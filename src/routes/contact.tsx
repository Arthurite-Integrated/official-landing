import {createFileRoute} from "@tanstack/react-router";

import {ContactPage} from "#/components/contact/contact-page.tsx";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});
