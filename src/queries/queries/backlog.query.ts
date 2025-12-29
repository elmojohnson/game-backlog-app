import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getBacklogById, getBacklogs } from "../functions/backlog.function";
import type { Backlog } from "@/types/backlog.type";

export const userBacklogInfiniteQuery = () => {
  return useInfiniteQuery({
    queryKey: ["myBacklogs"],
    queryFn: getBacklogs,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (Math.ceil(lastPage.totalPages! / lastPageParam) <= 1) {
        return undefined;
      }

      return lastPageParam + 1;
    },
  });
};

export const useBacklogByIdQuery = (id: Backlog["id"]) => {
  return useQuery({
    queryKey: ["backlog", id],
    queryFn: () => getBacklogById(id),
  });
};
