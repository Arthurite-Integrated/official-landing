import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {describe, expect, it, vi} from "vite-plus/test";

import {DialogFrame} from "#/components/ui/dialog-frame.tsx";

function renderDialog(onClose = vi.fn()) {
  const view = render(
    <section data-testid="host">
      <DialogFrame labelledBy="title" onClose={onClose}>
        <h2 id="title">Apply</h2>
        <button type="button">Inside</button>
      </DialogFrame>
    </section>
  );
  return {onClose, ...view};
}

describe("DialogFrame", () => {
  it("is labelled by the given heading", () => {
    renderDialog();

    expect(screen.getByRole("dialog", {name: "Apply"})).toBeInTheDocument();
  });

  it("renders outside the section that opened it so it can cover the whole page", () => {
    renderDialog();

    expect(screen.getByTestId("host")).not.toContainElement(screen.getByRole("dialog"));
  });

  it("closes on Escape", async () => {
    const {onClose} = renderDialog();

    await userEvent.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes when the backdrop is clicked", async () => {
    const {onClose} = renderDialog();

    await userEvent.click(screen.getByTestId("dialog-backdrop"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("stays open when the content is clicked", async () => {
    const {onClose} = renderDialog();

    await userEvent.click(screen.getByRole("button", {name: "Inside"}));

    expect(onClose).not.toHaveBeenCalled();
  });
});
