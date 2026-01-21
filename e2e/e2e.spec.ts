import { SignUpDto } from "../src/schemas/auth.schema";
import { test } from "./fixtures";
import { faker } from "@faker-js/faker";

const user: SignUpDto = {
  name: faker.person.fullName(),
  email: faker.internet.email().toLocaleLowerCase(),
  password: faker.internet.password(),
};

test.describe.serial("E2E test", { tag: "@e2e" }, () => {
  test("Account", async ({
    basePage,
    signUpPage,
    backlogsPage,
    accountPage,
    signInPage,
  }) => {
    await test.step("Create an account", async () => {
      await signUpPage.goTo();
      await signUpPage.signUp(user);
      await basePage.assertToast("Account created!");
      await basePage.assertBacklogsPage(true);
    });

    await test.step("Account page", async () => {
      await backlogsPage.accountLink.click();
      await backlogsPage.assertAccountPage();
      await accountPage.assertAccountInfo(user.name, user.email);
    });

    await test.step("Sign out", async () => {
      await accountPage.signOut();
      await signInPage.assertSignInPage();
    });
  });

  test("Backlog management", async ({
    basePage,
    signInPage,
    backlogsPage,
    viewBacklogPage,
  }) => {
    await test.step("Sign in", async () => {
      await signInPage.goTo();
      await signInPage.signIn({
        email: user.email,
        password: user.password,
      });
      await basePage.assertToast("Logged in");
      await basePage.assertBacklogsPage(true);
    });

    await test.step("Create a backlog", async () => {
      await backlogsPage.createBacklog({
        name: "Test 123",
        description: "This is a test description!",
      });
      await backlogsPage.assertToast("Backlog created!");
      await viewBacklogPage.assertNavTitle("Test 123");
    });

    await test.step("Update backlog", async () => {
      await viewBacklogPage.openDropdownMenu();
      await viewBacklogPage.openUpdateDialog();
      await viewBacklogPage.updateBacklog({
        name: "My Backlog 123",
        description: "This is an updated backlog",
      });
      await viewBacklogPage.assertToast("Updated!");
      await viewBacklogPage.assertNavTitle("My Backlog 123");
    });

    await test.step("Delete backlog", async () => {
      await viewBacklogPage.openDropdownMenu();
      await viewBacklogPage.openDeleteDialog();
      await viewBacklogPage.deleteBacklog();
      await viewBacklogPage.assertToast("Backlog deleted");
      await basePage.assertBacklogsPage(true);
    });
  });
});
