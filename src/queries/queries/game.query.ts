import { useInfiniteQuery } from "@tanstack/react-query";
import { getBacklogGames, getGames } from "../functions/game.function";

export const useGamesInfiniteQuery = () => {
  return useInfiniteQuery({
    queryKey: ["games"],
    queryFn: getGames,
    initialPageParam: "/games?page=1",
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) {
        return undefined;
      }

      return lastPage.next;
    },
  });
};

export const useGetBacklogGamesInfiniteQuery = (backlogId: number) => {
  return useInfiniteQuery({
    queryKey: ["backlogGames", backlogId],
    queryFn: ({ pageParam }) => getBacklogGames({ pageParam, backlogId }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (Math.ceil(lastPage.totalPages! / lastPageParam) <= 1) {
        return undefined;
      }

      return lastPageParam + 1;
    },
  });
};
