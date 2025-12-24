import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.pom";
import { BacklogDto } from "../../src/schemas/backlog.schema";

export class BacklogsPage extends BasePage {
  readonly page: Page;
  readonly createDialogTrigger: Locator;
  readonly nameInput: Locator;
  readonly descriptionInput: Locator;
  readonly createButton: Locator;
  readonly backlogItemTitle: Locator;
  readonly loadMoreButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.createDialogTrigger = page.getByTestId("create-dialog-trigger");
    this.nameInput = page.getByTestId("name-input");
    this.descriptionInput = page.getByTestId("description-input");
    this.createButton = page.getByTestId("create-button");
    this.backlogItemTitle = page.getByTestId("backlog-item-title");
    this.loadMoreButton = page.getByTestId("load-more-button");
  }

  createBacklog = async ({ name, description }: BacklogDto) => {
    await this.createDialogTrigger.click();

    await this.nameInput.click();
    await this.nameInput.pressSequentially(name);
    await this.descriptionInput.click();
    await this.descriptionInput.pressSequentially(description!);

    await this.createButton.click();
  };

  assertBacklogItem = async (name: string) => {
    await expect(this.backlogItemTitle.first()).toHaveText(name);
  };

  loadMoreData = async () => {
    await this.loadMoreButton.click();
    await expect(this.loadMoreButton).toBeDisabled();
    await expect(this.loadMoreButton).toBeEnabled();
  };

  assertNumberOfItems = async (value: number) => {
    expect((await this.backlogItemTitle.all()).length).toBe(value);
  };
}
