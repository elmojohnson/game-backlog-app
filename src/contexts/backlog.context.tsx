import Layout from "@/components/layouts/backlog/layout";
import { useBacklogByIdQuery } from "@/queries/queries/backlog.query";
import type { Backlog } from "@/types/backlog.type";
import { createContext } from "react";
import { useParams } from "react-router";

type UseQuery<T> = {
  data: T | undefined;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
};

type BacklogContextType = {
  backlogDetails: UseQuery<Backlog>;
};

export const BacklogContext = createContext<BacklogContextType | null>(null);

const BacklogProvider = ({ children }: { children: React.ReactNode }) => {
  const { id } = useParams();
  const backlogDetailsQuery = useBacklogByIdQuery(parseInt(id!));

  return (
    <BacklogContext.Provider value={{ backlogDetails: backlogDetailsQuery }}>
      <Layout>{children}</Layout>
    </BacklogContext.Provider>
  );
};

export default BacklogProvider;