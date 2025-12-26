import { expect, Page } from "@playwright/test";
import { BasePage } from "./base.pom";

export class AccountPage extends BasePage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  assertAccountInfo = async (name: string, email: string) => {
    await expect(this.page.getByTestId("name")).toHaveText(name);
    await expect(this.page.getByTestId("email")).toContainText(email);
  };

  signOut = async () => {
    await this.page.getByTestId("sign-out-button").click();
  };
}
