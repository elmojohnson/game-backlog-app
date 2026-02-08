import BacklogAddGamesDialog from "@/components/dialogs/backlog-add-games-dialog";
import BacklogGameItem from "@/components/items/backlog-game.item";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import BacklogProvider, { BacklogContext } from "@/contexts/backlog.context";
import { useGetBacklogGamesInfiniteQuery } from "@/queries/queries/game.query";
import { Gamepad, Plus } from "lucide-react";
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
    return <SkeletonContents />;
  }

  if (status === "error") {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="font-bold text-lg">Games</h1>
        {data.pages[0].count !== 0 && (
          <Button
            onClick={() => ctx?.dialogs.setAddGamesDialogOpen(true)}
            data-testid="add-games-button"
          >
            <Plus />
            Add games
          </Button>
        )}
      </div>

      {data.pages[0].count === 0 ? (
        <EmptyContents />
      ) : (
        <>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4"
            data-testid="game-list"
          >
            {data.pages.map((games, i) => (
              <React.Fragment key={i}>
                {games.result.map((game) => {
                  return <BacklogGameItem key={game.id} {...game} />;
                })}
              </React.Fragment>
            ))}
          </div>

          {hasNextPage && (
            <Button
              disabled={isFetchingNextPage}
              onClick={() => fetchNextPage()}
              data-testid="load-more-button"
              className="w-full"
              variant="secondary"
            >
              {isFetchingNextPage && <Spinner />}
              Load more
            </Button>
          )}
        </>
      )}
    </div>
  );
};

const EmptyContents = () => {
  const ctx = useContext(BacklogContext);

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Gamepad />
        </EmptyMedia>
        <EmptyTitle data-testid="empty-backlog-title">
          No games found
        </EmptyTitle>
        <EmptyDescription>No games listed on this backlog</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button
          onClick={() => ctx?.dialogs.setAddGamesDialogOpen(true)}
          data-testid="add-games-button"
        >
          <Plus />
          Add games
        </Button>
      </EmptyContent>
    </Empty>
  );
};

const SkeletonContents = () => {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <Skeleton className="h-7 w-18" />
        <Skeleton className="h-10 w-30" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
        {[...Array(15)].map((_, i) => {
          return (
            <Card
              key={i}
              className="flex flex-col justify-between pt-0 overflow-hidden"
              data-testid="game-item"
            >
              <Skeleton className="aspect-video w-full object-cover" />
              <CardHeader>
                <Skeleton className="h-5 w-50" />
                <Skeleton className="h-5 w-32" />
              </CardHeader>
              <CardFooter className="flex flex-col items-start gap-2">
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
                <Skeleton className="h-3 w-32" />
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ViewBacklog;
