import { test as base } from "@playwright/test";
import { ApiUtil } from "./api.util";
import { BasePage } from "./page-objects/base.pom";
import { SignInPage } from "./page-objects/sign-in.pom";
import { BacklogsPage } from "./page-objects/backlogs.pom";
import { SignUpPage } from "./page-objects/sign-up.pom";
import { AccountPage } from "./page-objects/account.pom";
import { ViewBacklogPage } from "./page-objects/view-backlog.pom";

type Fixtures = {
  apiUtil: ApiUtil;
  basePage: BasePage;
  signInPage: SignInPage;
  signUpPage: SignUpPage;
  backlogsPage: BacklogsPage;
  viewBacklogPage: ViewBacklogPage;
  accountPage: AccountPage;
};

export const test = base.extend<Fixtures>({
  apiUtil: async ({ page }, use) => {
    await use(new ApiUtil());
  },

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

  viewBacklogPage: async ({ page }, use) => {
    await use(new ViewBacklogPage(page));
  },

  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
});
