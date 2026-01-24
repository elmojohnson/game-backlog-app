import { useInfiniteQuery } from "@tanstack/react-query";
import { getGames } from "../functions/game.function";

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
