import {useState} from "react";

export type SendStatus = "idle" | "sending" | "sent" | "failed";

export function usePromptSubmission(onSubmit: (prompt: string) => Promise<void>) {
  const [status, setStatus] = useState<SendStatus>("idle");

  async function send(prompt: string): Promise<boolean> {
    if (status === "sending") return false;

    setStatus("sending");

    try {
      await onSubmit(prompt);
      setStatus("sent");
      return true;
    } catch {
      setStatus("failed");
      return false;
    }
  }

  return {status, send};
}
