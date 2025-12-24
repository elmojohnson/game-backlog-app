import CreateBacklogDialog from "@/components/dialogs/create-backlog.dialog";
import BacklogItem from "@/components/items/backlog.item";
import Layout from "@/components/layouts/main/layout";
import { Button } from "@/components/ui/button";
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
import { userBacklogInfiniteQuery } from "@/queries/queries/backlog.query";
import { Ghost } from "lucide-react";
import React from "react";

const Backlogs = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = userBacklogInfiniteQuery();

  if (status === "pending") {
    return (
      <Layout>
        <SkeletonContents />
      </Layout>
    );
  }

  if (status === "error") {
    return (
      <Layout>
        <p>{error.message}</p>
      </Layout>
    );
  }

  if (data.pages[0].count === 0) {
    return (
      <Layout>
        <EmptyContents />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex justify-between mb-4">
        <h1 className="font-bold text-xl">My Backlogs</h1>
        <CreateBacklogDialog />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {data.pages.map((backlogs, i) => (
          <React.Fragment key={i}>
            {backlogs.result.map((backlog) => {
              return <BacklogItem key={backlog.id} backlog={backlog} />;
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
    </Layout>
  );
};

const EmptyContents = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Ghost />
        </EmptyMedia>
        <EmptyTitle>Your backlog is empty</EmptyTitle>
        <EmptyDescription>Create your backlog now!</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <CreateBacklogDialog />
      </EmptyContent>
    </Empty>
  );
};

const SkeletonContents = () => {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-24" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {[...Array(5)].map((_, i) => {
          return <Skeleton key={i} className="h-25" />;
        })}
      </div>
    </div>
  );
};

export default Backlogs;
