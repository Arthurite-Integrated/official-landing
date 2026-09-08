import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {describe, expect, it, vi} from "vitest";

import {HeroComposer} from "#/components/layout/hero-composer.tsx";

function renderComposer(onSubmit = vi.fn(() => Promise.resolve())) {
  const user = userEvent.setup();
  render(<HeroComposer onSubmit={onSubmit} />);

  return {
    onSubmit,
    user,
    field: screen.getByRole("textbox", {name: /what do you need/i}),
    submit: screen.getByRole("button", {name: /send/i}),
  };
}

describe("HeroComposer", () => {
  it("offers a ghost suggestion while the field is empty", () => {
    renderComposer();

    expect(screen.getByTestId("composer-ghost")).not.toBeEmptyDOMElement();
  });

  it("accepts the ghost suggestion when Tab is pressed", async () => {
    const {field, user} = renderComposer();
    const suggestion = screen.getByTestId("composer-ghost").textContent;

    await user.click(field);
    await user.keyboard("{Tab}");

    expect(field).toHaveValue(suggestion);
  });

  it("hides the ghost suggestion once the visitor types", async () => {
    const {field, user} = renderComposer();

    await user.type(field, "Move us off on-prem");

    expect(screen.queryByTestId("composer-ghost")).not.toBeInTheDocument();
  });

  it("disables sending while the field is empty", () => {
    const {submit} = renderComposer();

    expect(submit).toBeDisabled();
  });

  it("sends the trimmed prompt to the endpoint", async () => {
    const {field, onSubmit, submit, user} = renderComposer();

    await user.type(field, "  Audit our AWS spend  ");
    await user.click(submit);

    expect(onSubmit).toHaveBeenCalledWith("Audit our AWS spend");
  });

  it("clears the field after the endpoint accepts the request", async () => {
    const {field, submit, user} = renderComposer();

    await user.type(field, "Audit our AWS spend");
    await user.click(submit);

    await waitFor(() => expect(field).toHaveValue(""));
  });

  it("confirms delivery once the endpoint accepts the request", async () => {
    const {field, submit, user} = renderComposer();

    await user.type(field, "Audit our AWS spend");
    await user.click(submit);

    expect(await screen.findByRole("status")).toHaveTextContent(/on its way/i);
  });

  it("reports a failure when the endpoint rejects the request", async () => {
    const onSubmit = vi.fn(() => Promise.reject(new Error("boom")));
    const {field, submit, user} = renderComposer(onSubmit);

    await user.type(field, "Audit our AWS spend");
    await user.click(submit);

    expect(await screen.findByRole("alert")).toHaveTextContent(/could not send/i);
  });

  it("keeps the prompt in the field when sending fails", async () => {
    const onSubmit = vi.fn(() => Promise.reject(new Error("boom")));
    const {field, submit, user} = renderComposer(onSubmit);

    await user.type(field, "Audit our AWS spend");
    await user.click(submit);

    await screen.findByRole("alert");
    expect(field).toHaveValue("Audit our AWS spend");
  });

  it("sends on Enter", async () => {
    const {field, onSubmit, user} = renderComposer();

    await user.type(field, "Audit our AWS spend");
    await user.keyboard("{Enter}");

    expect(onSubmit).toHaveBeenCalledWith("Audit our AWS spend");
  });

  it("inserts a newline instead of sending on Shift+Enter", async () => {
    const {field, onSubmit, user} = renderComposer();

    await user.type(field, "Audit our AWS spend");
    await user.keyboard("{Shift>}{Enter}{/Shift}");

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("does not send twice while a request is in flight", async () => {
    const onSubmit = vi.fn(() => new Promise<void>(() => {}));
    const {field, submit, user} = renderComposer(onSubmit);

    await user.type(field, "Audit our AWS spend");
    await user.click(submit);
    await user.click(submit);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("fills the field from a quick-start chip", async () => {
    const {field, user} = renderComposer();
    const chip = screen.getByRole("button", {name: "Cloud migration"});

    await user.click(chip);

    expect(field).toHaveValue("Cloud migration");
  });
});
