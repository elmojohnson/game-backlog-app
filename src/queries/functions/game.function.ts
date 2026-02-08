import rawg from "@/lib/rawg";
import type { Game, GameTable, MutateGame } from "@/types/game.type";
import type { Pagination } from "@/types/util.type";
import supabase from "@/utils/supabase.util";
import { getCurrentUser } from "./auth.function";
import { getRange, getTotalPages } from "@/utils/paginate.util";

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

export const getBacklogGames = async ({
  pageParam,
  backlogId,
}: {
  pageParam: number;
  backlogId: number;
}): Promise<{
  result: GameTable[];
  count: number | null;
  totalPages: number | null;
}> => {
  const limitPerPage = 25;
  const range = getRange(pageParam, limitPerPage);

  const user = await getCurrentUser();
  const { data, error, count } = await supabase
    .from("games")
    .select("*", { count: "exact", head: false })
    .eq("user_id", user?.id)
    .eq("backlog_id", backlogId)
    .order("created_at", { ascending: false })
    .range(range[0], range[1]);

  if (error) {
    throw new Error(error.message);
  }

  const totalPages = getTotalPages(count, limitPerPage);

  return {
    result: data,
    count,
    totalPages,
  };
};

export const addGameToBacklog = async ({
  id: rawg_id,
  name,
  slug,
  background_image,
  backlog_id,
  raw_json,
}: MutateGame) => {
  const user = await getCurrentUser();
  const { error: searchError, count } = await supabase
    .from("games")
    .select("*", { count: "exact", head: true })
    .eq("rawg_id", rawg_id)
    .eq("user_id", user?.id)
    .eq("backlog_id", backlog_id);

  if (searchError) {
    throw new Error(searchError.message);
  }

  if(count! >= 1) {
    throw new Error("Game already exist in the backlog")
  }

  const { data, error } = await supabase.from("games").insert({
    rawg_id,
    name,
    slug,
    background_image,
    backlog_id,
    user_id: user?.id,
    raw_json,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
