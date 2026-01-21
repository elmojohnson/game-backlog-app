import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.pom";
import { BacklogDto } from "../../src/schemas/backlog.schema";

export class ViewBacklogPage extends BasePage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly descriptionInput: Locator;
  readonly updateButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.nameInput = page.getByTestId("name-input");
    this.descriptionInput = page.getByTestId("description-input");
    this.updateButton = page.getByTestId("update-button");
  }

  assertNavTitle = async (name: string) => {
    await expect(this.page.getByTestId("nav-title")).toHaveText(name);
  };

  openDropdownMenu = async () => {
    await this.page.getByTestId("dropdown-menu").click();
  }

  openUpdateDialog = async () => {
    await this.page.getByTestId("update-dialog-trigger").click();
  };

  openDeleteDialog = async () => {
    await this.page.getByTestId("delete-dialog-trigger").click();
  }

  updateBacklog = async ({ name, description }: BacklogDto) => {
    await this.nameInput.click();
    await this.page.keyboard.press("Control+A");
    await this.nameInput.pressSequentially(name);
    await this.descriptionInput.click();
    await this.page.keyboard.press("Control+A");
    await this.descriptionInput.pressSequentially(description!);

    await this.updateButton.click();
  };

  deleteBacklog = async () => {
    await this.page.getByTestId("delete-button").click();
  }
}
