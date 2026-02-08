import { SignInDto } from "../../src/schemas/auth.schema";
import { TestGame } from "../../src/types/game.type";

export const user: SignInDto = {
  email: process.env.TEST_REGISTERED_USER_EMAIL as string,
  password: process.env.TEST_USER_COMMON_PASSWORD as string,
};

export const games: TestGame[] = [
  {
    name: "Grand Theft Auto V",
    genres: ["Action"],
  },
  {
    name: "Portal",
    genres: ["Action", "Puzzle"],
  },
  {
    name: "Portal 2",
    genres: ["Shooter", "Puzzle"],
  },
  {
    name: "Red Dead Redemption 2",
    genres: ["Action"],
  },
  {
    name: "Borderlands 2",
    genres: ["Action", "Shooter", "RPG"],
  },
  {
    name: "Fallout 4",
    genres: ["Action", "RPG"],
  },
  {
    name: "Cyberpunk 2077",
    genres: ["Action", "Shooter", "RPG"],
  },
  {
    name: "Dota 2",
    genres: ["Action", "Massively Multiplayer"],
  },
  {
    name: "Stardew Valley",
    genres: ["RPG", "Simulation", "Indie"],
  },
  {
    name: "Dark Souls III",
    genres: ["Action", "RPG"],
  },
  {
    name: "Half-Life 2: Deathmatch",
    genres: ["Action"],
  },
];
