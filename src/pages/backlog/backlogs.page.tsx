import CreateBacklogDialog from "@/components/dialogs/create-backlog.dialog";
import Layout from "@/components/layouts/main/layout";
import { Button } from "@/components/ui/button";
import { FullScreenSpinner } from "@/components/ui/spinner";
import { userBacklogInfiniteQuery } from "@/queries/queries/backlog.query";
import React from "react";

const Backlogs = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = userBacklogInfiniteQuery();

  if (status === "pending") {
    return <FullScreenSpinner />;
  }

  if (status === "error") {
    return <p>{error.message}</p>;
  }

  return (
    <Layout>
      <div className="flex justify-between">
        <h1 className="font-bold text-xl">My Backlogs</h1>
        <CreateBacklogDialog />
      </div>

      <div>
        {data.pages.map((backlogs, i) => (
          <React.Fragment key={i}>
            {backlogs.map((backlog) => {
              return <p key={backlog.id}>{backlog.name}</p>;
            })}
          </React.Fragment>
        ))}
      </div>

      {hasNextPage && (
        <Button disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
          Load more
        </Button>
      )}
    </Layout>
  );
};

export default Backlogs;
