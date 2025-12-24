import { useInfiniteQuery } from "@tanstack/react-query";
import { getBacklogs } from "../functions/backlog.function";

export const userBacklogInfiniteQuery = () => {
  return useInfiniteQuery({
    queryKey: ["myBacklogs"],
    queryFn: getBacklogs,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if(Math.ceil(lastPage.totalPages! / lastPageParam) <= 1) {
        return undefined;
      }

      return lastPageParam + 1;
    },
  });
};
