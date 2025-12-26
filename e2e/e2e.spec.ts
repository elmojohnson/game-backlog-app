import { SignUpDto } from "../src/schemas/auth.schema";
import { test } from "./fixtures";
import { randomUUID } from "crypto";
import { userData } from "./data/user.data";

const user: SignUpDto = {
  name: "Automation Tester",
  email: `automation+${randomUUID()}@test.com`,
  password: userData.commonPassword,
};

test.describe("E2E test", { tag: "@e2e" }, () => {
  test("Sign up, account details, and sign out", async ({
    basePage,
    signUpPage,
    backlogsPage,
    accountPage,
    signInPage,
  }) => {
    await signUpPage.goTo();
    await signUpPage.signUp(user);
    await basePage.assertToast("Account created!");

    await basePage.assertBacklogPage(true);
    await backlogsPage.accountLink.click();
    await backlogsPage.assertAccountPage();

    await accountPage.assertAccountInfo(user.name, user.email);
    await accountPage.signOut();
    await signInPage.assertSignInPage();
  });

  test("Sign in and create backlog", async ({
    basePage,
    signInPage,
    backlogsPage,
  }) => {
    await signInPage.goTo();
    await signInPage.signIn({
      email: user.email,
      password: user.password,
    });
    await basePage.assertToast("Logged in");
    await basePage.assertBacklogPage(true);

    await backlogsPage.createBacklog({
      name: "Test 123",
      description: "This is a test description!",
    });
    await backlogsPage.assertToast("Backlog created!");

    await backlogsPage.page.goBack();
    await backlogsPage.assertBacklogPage();
    await backlogsPage.assertBacklogItem("Test 123");
  });
});
