import { useInfiniteQuery } from "@tanstack/react-query";
import { getBacklogs } from "../functions/backlog.function";

export const userBacklogInfiniteQuery = () => {
  return useInfiniteQuery({
    queryKey: ["myBacklogs"],
    queryFn: getBacklogs,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const nextPage: number | undefined = lastPage?.length
        ? pages?.length
        : undefined;
      return nextPage;
    },
  });
};
