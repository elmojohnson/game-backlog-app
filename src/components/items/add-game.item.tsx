import type { Game } from "@/types/game.type";
import { Button } from "../ui/button";
import { Check, Plus } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useAddGameToBacklogMutation } from "@/queries/mutations/game.mutation";
import { BacklogContext } from "@/contexts/backlog.context";
import { Spinner } from "../ui/spinner";

const AddGameItem = (game: Game) => {
  const ctx = useContext(BacklogContext);
  const [isAdded, setAdded] = useState<boolean>(false);
  const mutation = useAddGameToBacklogMutation();

  const handleAddGame = (game: Game) => {
    if (ctx?.backlogDetails.data?.id) {
      mutation.mutate({
        backlog_id: ctx?.backlogDetails.data?.id,
        raw_json: game,
        ...game,
      });
    }
  };

  useEffect(() => {
    if (mutation.status === "success") {
      setAdded(true);
    } else if(mutation.status === "error" && mutation.error.message === "Game already exist in the backlog") {
      setAdded(true);
    }
  }, [mutation.status]);

  return (
    <div className="flex justify-between py-4 gap-3 group">
      <div>
        <label className="font-bold group-hover:text-primary">
          {game.name}
        </label>
        <p className="text-xs text-slate-500">
          {game.genres.map((gen) => gen.name).join(", ")}
        </p>
      </div>
      <Button
        size="icon-sm"
        onClick={() => handleAddGame(game)}
        disabled={isAdded || mutation.isPending}
        variant={isAdded ? "secondary" : "default"}
      >
        {mutation.isPending ? <Spinner /> : isAdded ? <Check /> : <Plus />}
      </Button>
    </div>
  );
};

export default AddGameItem;
