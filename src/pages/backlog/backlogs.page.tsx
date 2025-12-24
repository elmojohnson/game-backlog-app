import CreateBacklogDialog from "@/components/dialogs/create-backlog.dialog";
import BacklogItem from "@/components/items/backlog.item";
import Layout from "@/components/layouts/main/layout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { userBacklogInfiniteQuery } from "@/queries/queries/backlog.query";
import React from "react";

const Backlogs = () => {
  return (
    <Layout>
      <div className="flex justify-between mb-4">
        <h1 className="font-bold text-xl">My Backlogs</h1>
        <CreateBacklogDialog />
      </div>
      <BacklogList />
    </Layout>
  );
};

const BacklogList = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = userBacklogInfiniteQuery();

  if (status === "pending") {
    return <SkeletonContents />;
  }

  if (status === "error") {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {data.pages.map((backlogs, i) => (
          <React.Fragment key={i}>
            {backlogs.map((backlog) => {
              return <BacklogItem key={backlog.id} backlog={backlog} />;
            })}
          </React.Fragment>
        ))}
      </div>

      {hasNextPage && (
        <Button disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
          {isFetchingNextPage && <Spinner />}
          Load more
        </Button>
      )}
    </>
  );
};

const SkeletonContents = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {[...Array(5)].map((_, i) => {
          return <Skeleton key={i} className="h-25" />;
        })}
      </div>
    </div>
  );
};

export default Backlogs;
