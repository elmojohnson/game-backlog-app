import Layout from "@/components/layouts/backlog/layout";
import { useBacklogByIdQuery } from "@/queries/queries/backlog.query";
import type { Backlog } from "@/types/backlog.type";
import { createContext, useState } from "react";
import { useParams } from "react-router";

type UseQuery<T> = {
  data: T | undefined;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
};

type Dialogs = {
  isEditDialogOpen: boolean;
  setEditDialogOpen: (value: boolean) => void;
  isDeleteDialogOpen: boolean;
  setDeleteDialogOpen: (value: boolean) => void;
  isAddGamesDialogOpen: boolean;
  setAddGamesDialogOpen: (value: boolean) => void;
};

type BacklogContextType = {
  backlogDetails: UseQuery<Backlog>;
  dialogs: Dialogs;
};

export const BacklogContext = createContext<BacklogContextType | null>(null);

const BacklogProvider = ({ children }: { children: React.ReactNode }) => {
  const { id } = useParams();
  const backlogDetailsQuery = useBacklogByIdQuery(parseInt(id!));

  const [isEditDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [isAddGamesDialogOpen, setAddGamesDialogOpen] = useState<boolean>(false);

  return (
    <BacklogContext.Provider
      value={{
        backlogDetails: backlogDetailsQuery,
        dialogs: {
          isEditDialogOpen,
          setEditDialogOpen,
          isDeleteDialogOpen,
          setDeleteDialogOpen,
          isAddGamesDialogOpen,
          setAddGamesDialogOpen
        },
      }}
    >
      <Layout>{children}</Layout>
    </BacklogContext.Provider>
  );
};

export default BacklogProvider;
