import BacklogAddGamesDialog from "@/components/dialogs/backlog-add-games-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import BacklogProvider, { BacklogContext } from "@/contexts/backlog.context";
import { useGetBacklogGamesInfiniteQuery } from "@/queries/queries/game.query";
import { Plus } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

const ViewBacklog = () => {
  return (
    <BacklogProvider>
      <GameList />
      <BacklogAddGamesDialog />
    </BacklogProvider>
  );
};

const GameList = () => {
  const ctx = useContext(BacklogContext);
  const [backlogId, setBacklogId] = useState<number>(0);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useGetBacklogGamesInfiniteQuery(backlogId);

  useEffect(() => {
    if (ctx?.backlogDetails.data?.id) {
      setBacklogId(ctx?.backlogDetails.data?.id);
    }
  }, [ctx?.backlogDetails.data?.id]);

  if (status === "pending") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-bold text-lg">Games</h1>
        <Button onClick={() => ctx?.dialogs.setAddGamesDialogOpen(true)}>
          <Plus />
          Add games
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {data.pages.map((games, i) => (
          <React.Fragment key={i}>
            {games.result.map((game) => {
              return <p key={game.id}>{game.name}</p>;
            })}
          </React.Fragment>
        ))}
      </div>

      {hasNextPage && (
        <Button
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          data-testid="load-more-button"
        >
          {isFetchingNextPage && <Spinner />}
          Load more
        </Button>
      )}
    </div>
  );
};

export default ViewBacklog;
