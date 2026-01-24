import rawg from "@/lib/rawg";
import type { Game } from "@/types/game.type";
import type { Pagination } from "@/types/util.type";

export const getGames = async ({
  pageParam,
}: {
  pageParam: string;
}): Promise<Pagination<Game>> => {
  try {
    const result = await rawg.get(pageParam);
    return result.data;
  } catch (error) {
    throw new Error("Error: " + error);
  }
};
