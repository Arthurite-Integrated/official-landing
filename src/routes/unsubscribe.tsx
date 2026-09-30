import {createFileRoute} from "@tanstack/react-router";

import {UnsubscribePage} from "#/components/newsletter/unsubscribe-page.tsx";

export const Route = createFileRoute("/unsubscribe")({
  component: UnsubscribePage,
});
