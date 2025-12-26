import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.pom";
import { SignUpDto } from "../../src/schemas/auth.schema";

export class SignUpPage extends BasePage {
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signUpButton: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = page.getByTestId("name-input");
    this.emailInput = page.getByTestId("email-input");
    this.passwordInput = page.getByTestId("password-input");
    this.signUpButton = page.getByTestId("sign-up-button");
  }

  goTo = async () => {
    await this.page.goto("/auth/sign-up");
  };

  signUp = async ({ name, email, password }: SignUpDto) => {
    await this.nameInput.click();
    await this.nameInput.pressSequentially(name);
    await this.emailInput.click();
    await this.emailInput.pressSequentially(email);
    await this.passwordInput.click();
    await this.passwordInput.pressSequentially(password);

    await this.signUpButton.click();
  };
}
