import { useMutation } from "@tanstack/react-query";
import { createBacklog } from "../functions/backlog.function";

export const useCreateBacklogMutation = () => {
  return useMutation({
    mutationFn: createBacklog,
  });
};
