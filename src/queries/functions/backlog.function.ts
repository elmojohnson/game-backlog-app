import type { BacklogDto } from "@/schemas/backlog.schema";
import supabase from "@/utils/supabase.util";
import { getCurrentUser } from "./auth.function";
import { getRange, getTotalPages } from "@/utils/paginate.util";
import type { Backlog } from "@/tpes/backlog.type";

export const createBacklog = async ({ name, description }: BacklogDto) => {
  const user = await getCurrentUser();
  const { data, error } = await supabase
    .from("backlogs")
    .insert({ name, description, user_id: user?.id })
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getBacklogs = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<{
  result: Backlog[];
  count: number | null;
  totalPages: number | null;
}> => {
  const limitPerPage = 5;
  const range = getRange(pageParam, limitPerPage);

  const user = await getCurrentUser();
  const { data, error, count } = await supabase
    .from("backlogs")
    .select("*", { count: "exact", head: false })
    .eq("user_id", user?.id)
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
