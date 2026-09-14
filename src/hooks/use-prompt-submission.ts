import {useState} from "react";

export type SendStatus = "idle" | "sending" | "sent" | "failed";

export function usePromptSubmission<T = string>(onSubmit: (payload: T) => Promise<void>) {
  const [status, setStatus] = useState<SendStatus>("idle");

  async function send(payload: T): Promise<boolean> {
    if (status === "sending") return false;

    setStatus("sending");

    try {
      await onSubmit(payload);
      setStatus("sent");
      return true;
    } catch {
      setStatus("failed");
      return false;
    }
  }

  return {status, send};
}
