import { BacklogContext } from "@/contexts/backlog.context";
import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useGamesInfiniteQuery } from "@/queries/queries/game.query";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import AddGameItem from "../items/add-game.item";
import { Skeleton } from "../ui/skeleton";

const BacklogAddGamesDialog = () => {
  const ctx = useContext(BacklogContext);

  return (
    <Dialog
      open={ctx?.dialogs.isAddGamesDialogOpen}
      onOpenChange={ctx?.dialogs.setAddGamesDialogOpen}
    >
      <DialogContent data-testid="add-games-dialog">
        <DialogHeader>
          <DialogTitle>Add games</DialogTitle>
          <DialogDescription>
            Browse games and add it to your backlog
          </DialogDescription>
        </DialogHeader>
        <Games />
      </DialogContent>
    </Dialog>
  );
};

const Games = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useGamesInfiniteQuery();

  if (status === "pending") {
    return <SkeletonContents />;
  }

  if (status === "error") {
    return <p>{error.message}</p>;
  }

  return (
    <div
      className="-mx-4 max-h-[50vh] overflow-y-auto px-4"
      data-testid="add-games-list"
    >
      {data.pages.map((games, i) => (
        <React.Fragment key={i}>
          {games.results.map((game) => {
            return <AddGameItem key={game.id} {...game} />;
          })}
        </React.Fragment>
      ))}

      {hasNextPage && (
        <Button
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          data-testid="load-more-button"
          className="w-full my-4"
          variant="secondary"
        >
          {isFetchingNextPage && <Spinner />}Load more
        </Button>
      )}
    </div>
  );
};

const SkeletonContents = () => {
  return (
    <div className="-mx-4 max-h-[50vh] overflow-y-auto px-4">
      {[...Array(15)].map((_, i) => {
        return (
          <div className="flex justify-between py-4 gap-3 group" key={i}>
            <div>
              <Skeleton className="h-4 w-50 mb-3" />
              <Skeleton className="h-3 w-32" />
            </div>

            <Skeleton className="h-10 w-10" />
          </div>
        );
      })}
    </div>
  );
};

export default BacklogAddGamesDialog;
