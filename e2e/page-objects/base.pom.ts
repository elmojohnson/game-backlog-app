import { expect, Locator, Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly backlogsLink: Locator;
  readonly accountLink: Locator;
  readonly toast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backlogsLink = page.getByRole("link", {
      name: "Backlogs",
      exact: true,
    });
    this.accountLink = page.getByRole("link", { name: "Account", exact: true });
    this.toast = page.locator(".toast").first();
  }

  assertBacklogsPage = async (isEmpty: boolean = false) => {
    await expect(this.page).toHaveURL("/backlogs");

    if (isEmpty) {
      await expect(this.page.getByTestId("empty-backlog-title")).toHaveText(
        "Your backlog is empty"
      );
    } else {
      await expect(
        this.page.getByRole("heading", { name: "My Backlogs", exact: true })
      ).toBeVisible();
    }
  };

  assertAccountPage = async () => {
    await expect(this.page).toHaveURL("/account");
  };

  assertToast = async (message: string) => {
    await this.toast.waitFor();
    await expect(this.toast).toHaveText(message);
  };

  assertToastDismissed = () => async () => {
    await expect(this.toast).not.toBeVisible();
  };
}
