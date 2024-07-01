import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import { expect } from "vitest";
import userEvent from "@testing-library/user-event";

test("Initial conditions", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole("button");
  expect(confirmButton).toBeDisabled();
});

test("Checkbox enables button on first click and disables on second click", async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", {
    name: /confirm order/i,
  });

  await user.click(checkbox);
  expect(confirmButton).toBeEnabled();

  await user.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test("Popover responds hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  // Popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream actually will be delivery/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // Popover appears on mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream actually will be delivery/i);
  expect(popover).toBeInTheDocument();

  // Popover disappears when we mouse out
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
