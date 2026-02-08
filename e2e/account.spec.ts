import { SignUpDto } from "../src/schemas/auth.schema";
import { test } from "./fixtures";
import { faker } from "@faker-js/faker";

const user: SignUpDto = {
  name: faker.person.fullName(),
  email: faker.internet.email().toLocaleLowerCase(),
  password: faker.internet.password(),
};

test(
  "Account",
  { tag: "@account" },
  async ({ basePage, signUpPage, backlogsPage, accountPage, signInPage }) => {
    await test.step("Sign up", async () => {
      await signUpPage.goTo();
      await signUpPage.signUp(user);
      await basePage.assertToast("Account created!");
      await basePage.assertBacklogsPage(true);
    });

    await test.step("View account", async () => {
      await backlogsPage.accountLink.click();
      await backlogsPage.assertAccountPage();
      await accountPage.assertAccountInfo(user.name, user.email);
    });

    await test.step("Sign out", async () => {
      await accountPage.signOut();
      await signInPage.assertSignInPage();
    });

    await test.step("Sign in", async () => {
      await signInPage.goTo();
      await signInPage.signIn({
        email: user.email,
        password: user.password,
      });
      await basePage.assertToast("Logged in");
      await basePage.assertBacklogsPage(true);
    });
  },
);
