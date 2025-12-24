import type { BacklogDto } from "@/schemas/backlog.schema";
import supabase from "@/utils/supabase.util";
import { getCurrentUser } from "./auth.function";

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
