import rawg from "@/lib/rawg";
import type { Game, MutateGame } from "@/types/game.type";
import type { Pagination } from "@/types/util.type";
import supabase from "@/utils/supabase.util";
import { getCurrentUser } from "./auth.function";

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

export const addGameToBacklog = async ({
  id: rawg_id,
  name,
  slug,
  background_image,
  backlog_id,
  raw_json
}: MutateGame) => {
  const user = await getCurrentUser();
  const { data, error } = await supabase.from("games").insert({
    rawg_id,
    name,
    slug,
    background_image,
    backlog_id,
    user_id: user?.id,
    raw_json
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
