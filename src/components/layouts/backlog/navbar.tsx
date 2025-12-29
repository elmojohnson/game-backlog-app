import BacklogInfoDialog from "@/components/dialogs/backlog-info.dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BacklogContext } from "@/contexts/backlog.context";
import { ArrowLeft } from "lucide-react";
import { useContext } from "react";

const Navbar = () => {
  const ctx = useContext(BacklogContext);

  if (ctx?.backlogDetails.isPending) {
    return (
      <div className="py-3">
        <div className="wrapper flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-32" />
          </div>
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    );
  }

  return (
    <div className="py-3 shadow">
      <div className="wrapper flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <ArrowLeft />
          </Button>
          <h1 className="font-bold text-xl">
            {ctx?.backlogDetails.data?.name}
          </h1>
        </div>
        <BacklogInfoDialog />
      </div>
    </div>
  );
};

export default Navbar;
