import { useMutation } from "@tanstack/react-query";
import { addGameToBacklog } from "../functions/game.function";
import { toast } from "sonner";

export const useAddGameToBacklogMutation = () => {
  return useMutation({
    mutationFn: addGameToBacklog,
    onSuccess: () => {
      toast.success("Game added");
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
};
