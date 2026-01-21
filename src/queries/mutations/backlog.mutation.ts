import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createBacklog,
  deleteBacklog,
  updateBacklog,
} from "../functions/backlog.function";
import { toast } from "sonner";

export const useCreateBacklogMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBacklog,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myBacklogs"],
      });
    },
  });
};

export const useUpdateBacklogMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBacklog,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ["backlog", id],
      });
      toast.success("Updated!");
    },
  });
};

export const useDeleteBacklogMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBacklog,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myBacklogs"],
      });
      toast.success("Backlog deleted");
    },
  });
};
