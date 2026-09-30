import {render, screen, waitFor, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {describe, expect, it, vi} from "vite-plus/test";

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

async function fillDetails(user: ReturnType<typeof userEvent.setup>, dialog: HTMLElement) {
  const form = within(dialog);
  await user.type(form.getByLabelText(/first name/i), "Ada");
  await user.type(form.getByLabelText(/last name/i), "Okafor");
  await user.type(form.getByLabelText(/work email/i), "ada@acme.com");
  await user.type(form.getByLabelText(/phone/i), "+2348012345678");
  await user.type(form.getByLabelText(/job title/i), "CTO");
  await user.type(form.getByLabelText(/company name/i), "Acme Logistics");
  await user.selectOptions(form.getByLabelText(/company size/i), "51-200");
}

const submittedRequest = {
  companyName: "Acme Logistics",
  companySize: "51-200",
  workEmail: "ada@acme.com",
  firstName: "Ada",
  jobTitle: "CTO",
  lastName: "Okafor",
  message: "Audit our AWS spend",
  phone: "+2348012345678",
};

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

  it("asks for contact details instead of sending the prompt directly", async () => {
    const {field, onSubmit, submit, user} = renderComposer();

    await user.type(field, "Audit our AWS spend");
    await user.click(submit);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("shows the typed prompt inside the details dialog", async () => {
    const {field, submit, user} = renderComposer();

    await user.type(field, "Audit our AWS spend");
    await user.click(submit);

    expect(within(screen.getByRole("dialog")).getByText(/Audit our AWS spend/)).toBeInTheDocument();
  });

  it("opens the details dialog on Enter", async () => {
    const {field, user} = renderComposer();

    await user.type(field, "Audit our AWS spend");
    await user.keyboard("{Enter}");

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("inserts a newline instead of opening the dialog on Shift+Enter", async () => {
    const {field, user} = renderComposer();

    await user.type(field, "Audit our AWS spend");
    await user.keyboard("{Shift>}{Enter}{/Shift}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes the dialog without sending when dismissed", async () => {
    const {field, onSubmit, submit, user} = renderComposer();

    await user.type(field, "Audit our AWS spend");
    await user.click(submit);
    await user.click(within(screen.getByRole("dialog")).getByRole("button", {name: /close dialog/i}));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("keeps the dialog open and explains missing details", async () => {
    const {field, onSubmit, submit, user} = renderComposer();

    await user.type(field, "Audit our AWS spend");
    await user.click(submit);

    const dialog = screen.getByRole("dialog");
    await user.click(within(dialog).getByRole("button", {name: /send message/i}));

    expect(within(dialog).getByText("Enter your first name")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("sends the prompt as the message with the visitor's details", async () => {
    const {field, onSubmit, submit, user} = renderComposer();

    await user.type(field, "  Audit our AWS spend  ");
    await user.click(submit);

    const dialog = screen.getByRole("dialog");
    await fillDetails(user, dialog);
    await user.click(within(dialog).getByRole("button", {name: /send message/i}));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith(submittedRequest));
  });

  it("clears the field and closes the dialog after the request is sent", async () => {
    const {field, submit, user} = renderComposer();

    await user.type(field, "Audit our AWS spend");
    await user.click(submit);

    const dialog = screen.getByRole("dialog");
    await fillDetails(user, dialog);
    await user.click(within(dialog).getByRole("button", {name: /send message/i}));

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(field).toHaveValue("");
    expect(await screen.findByRole("status")).toHaveTextContent(/on its way/i);
  });

  it("keeps the dialog and the prompt when sending fails", async () => {
    const onSubmit = vi.fn(() => Promise.reject(new Error("boom")));
    const {field, submit, user} = renderComposer(onSubmit);

    await user.type(field, "Audit our AWS spend");
    await user.click(submit);

    const dialog = screen.getByRole("dialog");
    await fillDetails(user, dialog);
    await user.click(within(dialog).getByRole("button", {name: /send message/i}));

    expect(await within(dialog).findByRole("alert")).toHaveTextContent(/couldn't send/i);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(field).toHaveValue("Audit our AWS spend");
  });

  it("does not send twice while a request is in flight", async () => {
    const onSubmit = vi.fn(() => new Promise<unknown>(() => {}));
    const {field, submit, user} = renderComposer(onSubmit);

    await user.type(field, "Audit our AWS spend");
    await user.click(submit);

    const dialog = screen.getByRole("dialog");
    await fillDetails(user, dialog);
    const sendButton = within(dialog).getByRole("button", {name: /send message|sending/i});
    await user.click(sendButton);
    await user.click(sendButton);

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  });

  it("fills the field from a quick-start chip", async () => {
    const {field, user} = renderComposer();
    const chip = screen.getByRole("button", {name: "Cloud migration"});

    await user.click(chip);

    expect(field).toHaveValue("Cloud migration");
  });
});
