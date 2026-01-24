import BacklogAddGamesDialog from "@/components/dialogs/backlog-add-games-dialog";
import { Button } from "@/components/ui/button";
import BacklogProvider, { BacklogContext } from "@/contexts/backlog.context";
import { Plus } from "lucide-react";
import { useContext } from "react";

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

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-bold text-lg">Games</h1>
        <Button onClick={() => ctx?.dialogs.setAddGamesDialogOpen(true)}>
          <Plus />
          Add games
        </Button>
      </div>

      <div></div>
    </div>
  );
};

export default ViewBacklog;
