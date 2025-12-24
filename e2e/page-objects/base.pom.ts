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

  assertBacklogPage = async () => {
    await expect(this.page).toHaveURL("/backlogs");
    await expect(
      this.page.getByRole("heading", { name: "My Backlogs", exact: true })
    ).toBeVisible();
  };

  assertToast = async (message: string) => {
    await expect(this.toast).toHaveText(message);
  };
}
