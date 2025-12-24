import type { BacklogDto } from "@/schemas/backlog.schema";
import supabase from "@/utils/supabase.util";
import { getCurrentUser } from "./auth.function";
import { getRange } from "@/utils/paginate.util";
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
}): Promise<Backlog[]> => {
  const user = await getCurrentUser();

  const range = getRange(pageParam, 5);
  const { data, error } = await supabase
    .from("backlogs")
    .select("*")
    .eq("user_id", user?.id)
    .range(range[0], range[1]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
