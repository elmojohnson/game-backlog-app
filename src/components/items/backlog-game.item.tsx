import type { GameTable } from "@/types/game.type";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useNavigate } from "react-router";
import moment from "moment";
import { NotebookPenIcon, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

const BacklogGameItem = (game: GameTable) => {
  const navigate = useNavigate();
  return (
    <Card
      className="flex flex-col justify-between pt-0 overflow-hidden"
      test-dataid="game-item"
    >
      <img
        className="aspect-video w-full object-cover"
        src={game.background_image}
      />
      <CardHeader>
        <CardTitle
          className="hover:text-primary hover:cursor-pointer w-fit"
          onClick={() => navigate("/games/" + game.id)}
          data-testid="game-item-title"
        >
          {game.name}
        </CardTitle>
        <CardDescription>
          <p>{game.raw_json.genres.map((gen) => gen.name).join(", ")}</p>
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col items-start gap-2">
        <div className="flex gap-2">
          <Button variant="secondary" size="icon-sm" title="Delete">
            <Trash2 />
          </Button>
          <Button variant="secondary" size="icon-sm" title="Take a note">
            <NotebookPenIcon />
          </Button>
        </div>
        <label className="text-xs text-muted-foreground">
          Last updated:{" "}
          {game.updated_at
            ? moment(game.updated_at).calendar()
            : moment(game.created_at).calendar()}
        </label>
      </CardFooter>
    </Card>
  );
};

export default BacklogGameItem;
