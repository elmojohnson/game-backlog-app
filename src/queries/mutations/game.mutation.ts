import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addGameToBacklog } from "../functions/game.function";
import { toast } from "sonner";

export const useAddGameToBacklogMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addGameToBacklog,
    onSuccess: (_, { backlog_id }) => {
      toast.success("Game added");
      queryClient.invalidateQueries({
        queryKey: ["backlogGames", backlog_id],
      });
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
};
