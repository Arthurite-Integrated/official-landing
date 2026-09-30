import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import type {ReactElement, ReactNode} from "react";
import {render} from "@testing-library/react";

export function createTestQueryClient() {
  return new QueryClient({defaultOptions: {queries: {retry: false, staleTime: Number.POSITIVE_INFINITY}}});
}

export function renderWithQueryClient(ui: ReactElement) {
  const queryClient = createTestQueryClient();
  return {
    queryClient,
    ...render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>),
  };
}

export function QueryClientWrapper({children}: {readonly children: ReactNode}) {
  return <QueryClientProvider client={createTestQueryClient()}>{children}</QueryClientProvider>;
}
