import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBacklog } from "../functions/backlog.function";

export const useCreateBacklogMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createBacklog,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myBacklogs"]
      })
    }
  });
};
