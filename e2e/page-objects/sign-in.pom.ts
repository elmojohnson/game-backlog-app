import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.pom";
import { SignInDto } from "../../src/schemas/auth.schema";

export class SignInPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByTestId("email-input");
    this.passwordInput = page.getByTestId("password-input");
    this.signInButton = page.getByTestId("sign-in-button");
  }

  goTo = async () => {
    await this.page.goto("/auth/sign-in");
  };

  signIn = async ({ email, password }: SignInDto) => {
    await this.emailInput.click();
    await this.emailInput.pressSequentially(email);
    await this.passwordInput.click();
    await this.passwordInput.pressSequentially(password);

    await this.signInButton.click();
  };
}
