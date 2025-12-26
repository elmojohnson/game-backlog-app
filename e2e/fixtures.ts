import { test as base } from "@playwright/test";
import { BasePage } from "./page-objects/base.pom";
import { SignInPage } from "./page-objects/sign-in.pom";
import { BacklogsPage } from "./page-objects/backlogs.pom";
import { SignUpPage } from "./page-objects/sign-up.pom";
import { AccountPage } from "./page-objects/account.pom";

type Fixtures = {
  basePage: BasePage;
  signInPage: SignInPage;
  signUpPage: SignUpPage;
  backlogsPage: BacklogsPage;
  accountPage: AccountPage;
};

export const test = base.extend<Fixtures>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },

  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },

  signUpPage: async ({ page }, use) => {
    await use(new SignUpPage(page));
  },

  backlogsPage: async ({ page }, use) => {
    await use(new BacklogsPage(page));
  },

  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
});
