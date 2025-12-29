import type { Backlog } from "@/types/backlog.type";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useNavigate } from "react-router";
import moment from "moment";

const BacklogItem = ({ backlog }: { backlog: Backlog }) => {
  const navigate = useNavigate();

  return (
    <Card className="flex flex-col justify-between" test-dataid="backlog-item">
      <CardHeader>
        <CardTitle
          className="hover:text-primary hover:cursor-pointer w-fit"
          onClick={() => navigate("/backlogs/" + backlog.id)}
          data-testid="backlog-item-title"
        >
          {backlog.name}
        </CardTitle>
        <CardDescription>
          {backlog.updated_at
            ? moment(backlog.updated_at).calendar()
            : moment(backlog.created_at).calendar()}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default BacklogItem;
