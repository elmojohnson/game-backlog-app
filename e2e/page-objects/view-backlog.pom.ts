import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.pom";
import { BacklogDto } from "../../src/schemas/backlog.schema";
import { TestGame } from "../../src/types/game.type";

export class ViewBacklogPage extends BasePage {
  readonly page: Page;
  readonly addGameButton: Locator;

  // Backlog info dialog
  readonly nameInput: Locator;
  readonly descriptionInput: Locator;
  readonly updateButton: Locator;

  //Add games dialog
  readonly addGamesDialog: Locator;
  readonly addGamesList: Locator;
  readonly loadMoreAddGamesButton: Locator;

  // Game list
  readonly gameItem: Locator;
  readonly loadMoreGamesButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.addGameButton = page.getByTestId("add-games-button");

    // Backlog info dialog
    this.nameInput = page.getByTestId("name-input");
    this.descriptionInput = page.getByTestId("description-input");
    this.updateButton = page.getByTestId("update-button");

    // Add games dialog
    this.addGamesDialog = page.getByTestId("add-games-dialog");
    this.addGamesList = page.getByTestId("add-games-list");
    this.loadMoreAddGamesButton =
      this.addGamesDialog.getByTestId("load-more-button");

    // Game list
    this.gameItem = page.getByTestId("game-item");
    this.loadMoreGamesButton = page.getByTestId("load-more-button");
  }

  assertNavTitle = async (name: string) => {
    await expect(this.page.getByTestId("nav-title")).toHaveText(name);
  };

  openDropdownMenu = async () => {
    await this.page.getByTestId("dropdown-menu").click();
  };

  openUpdateDialog = async () => {
    await this.page.getByTestId("update-dialog-trigger").click();
  };

  openDeleteDialog = async () => {
    await this.page.getByTestId("delete-dialog-trigger").click();
  };

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
  };

  openAddGamesDialog = async () => {
    await this.addGameButton.click();
    await expect(this.addGamesList).toBeVisible({ timeout: 80000 });
  };

  closeAddGamesDialog = async () => {
    await this.addGamesDialog
      .locator("button[data-slot='dialog-close']")
      .click();
    await expect(this.addGamesList).not.toBeVisible();
  };

  getAddGamesItem = (
    game: TestGame,
  ): {
    root: Locator;
    addButton: Locator;
  } => {
    const root = this.addGamesDialog.getByTestId("add-game-item").filter({
      has: this.page.getByText(game.name, { exact: true }),
    });

    return {
      root,
      addButton: root.getByTestId("add-button"),
    };
  };

  addGames = async (games: TestGame[]) => {
    for (const game of games) {
      let isGameSeen = false;
      const item = this.getAddGamesItem(game);

      while (!isGameSeen) {
        if (await item.root.isVisible()) {
          await item.root.scrollIntoViewIfNeeded();
          await item.root.getByTestId("add-button").click();
          await expect(item.addButton).toBeDisabled();
          await expect(
            item.addButton.locator("svg.lucide-check"),
          ).toBeVisible();
          isGameSeen = true;
        } else {
          await this.loadMoreAddGamesButton.click();
        }
      }
    }
  };

  getGameItem = (
    game: TestGame,
  ): {
    root: Locator;
    name: Locator;
    genres: Locator;
  } => {
    const root = this.gameItem.filter({
      has: this.page.getByText(game.name, { exact: true }),
    });

    return {
      root,
      name: root.getByTestId("name"),
      genres: root.getByTestId("genres"),
    };
  };

  assertGames = async (games: TestGame[]) => {
    for (const game of games.reverse()) {
      let isGameSeen = false;
      const item = this.getGameItem(game);

      while (!isGameSeen) {
        if (await item.root.isVisible()) {
          await item.root.scrollIntoViewIfNeeded();
          await expect(item.name).toBeVisible();
          expect(item.genres).toHaveText(game.genres.join(", "));
          isGameSeen = true;
        } else {
          await this.loadMoreGamesButton.click();
        }
      }
    }
  };
}
