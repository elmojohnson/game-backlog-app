import { test } from "./fixtures";

test.describe("E2E test", () => {
  test("Happy path", async ({ signInPage, backlogsPage }) => {
    await signInPage.goTo();
    await signInPage.signIn({ email: "test@test.com", password: "pass123" });
    await signInPage.assertToast("Logged in");
    await signInPage.assertBacklogPage();

    await backlogsPage.createBacklog({
      name: "Test 123",
      description: "This is a test description!",
    });
    await backlogsPage.assertToast("Backlog created!");

    await backlogsPage.page.goBack();
    await backlogsPage.assertBacklogPage();
    await backlogsPage.assertBacklogItem("Test 123");

    await backlogsPage.assertNumberOfItems(5);
    await backlogsPage.loadMoreData();
    await backlogsPage.assertNumberOfItems(10);
  });
});
