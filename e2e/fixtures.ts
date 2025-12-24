import { test as base } from "@playwright/test";
import { BasePage } from "./page-objects/base.pom";
import { SignInPage } from "./page-objects/sign-in.pom";
import { BacklogsPage } from "./page-objects/backlogs.pom";

type Fixtures = {
  basePage: BasePage;
  signInPage: SignInPage;
  backlogsPage: BacklogsPage;
};

export const test = base.extend<Fixtures>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },

  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },

  backlogsPage: async ({ page }, use) => {
    await use(new BacklogsPage(page));
  },
});
