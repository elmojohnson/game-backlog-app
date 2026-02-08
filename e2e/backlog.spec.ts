import { user, games } from "./data/test.data";
import { test } from "./fixtures";

let userId: string;

test.beforeEach(async ({ apiUtil }) => {
  const existingUser = await apiUtil.signIn(user.email, user.password);

  if (existingUser.error && existingUser.error.code === "invalid_credentials") {
    const newUser = await apiUtil.signUp(user.email, user.password);
    await apiUtil.deleteAllBacklogs(newUser.data.user!.id);
    userId = newUser.data.user!.id;
  } else {
    await apiUtil.deleteAllBacklogs(existingUser.data.user!.id);
    userId = existingUser.data.user!.id;
  }
});

test.afterEach(async ({ page, apiUtil }) => {
  await apiUtil.deleteAllBacklogs(userId);
  await page.close();
});

test(
  "Backlog management",
  { tag: "@backlog" },
  async ({ basePage, signInPage, backlogsPage, viewBacklogPage }) => {
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

    await test.step("Add games", async () => {
      await viewBacklogPage.openAddGamesDialog();
      await viewBacklogPage.addGames(games);
      await viewBacklogPage.closeAddGamesDialog();
    });

    await test.step("Browse games", async () => {
      await viewBacklogPage.assertGames(games);
    });

    await test.step("Delete backlog", async () => {
      await viewBacklogPage.openDropdownMenu();
      await viewBacklogPage.openDeleteDialog();
      await viewBacklogPage.deleteBacklog();
      await viewBacklogPage.assertToast("Backlog deleted");
      await basePage.assertBacklogsPage(true);
    });
  },
);
