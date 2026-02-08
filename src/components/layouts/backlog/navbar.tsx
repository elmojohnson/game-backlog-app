import BacklogDeleteDialog from "@/components/dialogs/backlog-delete-dialog";
import BacklogEditDialog from "@/components/dialogs/backlog-edit.dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { BacklogContext } from "@/contexts/backlog.context";
import { ArrowLeft } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router";

const Navbar = () => {
  const ctx = useContext(BacklogContext);
  const navigate = useNavigate();

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
    <div className="py-3 shadow sticky top-0 z-50 bg-accent">
      <div className="wrapper flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft />
          </Button>
          <h1 className="font-bold text-xl" data-testid="nav-title">
            {ctx?.backlogDetails.data?.name}
          </h1>
        </div>
        <NavMenu />
      </div>
    </div>
  );
};

const NavMenu = () => {
  const ctx = useContext(BacklogContext);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" data-testid="dropdown-menu">Menu</Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem
              data-testid="update-dialog-trigger"
              onClick={() => ctx?.dialogs.setEditDialogOpen(true)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              data-testid="delete-dialog-trigger"
              onClick={() => ctx?.dialogs.setDeleteDialogOpen(true)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <BacklogEditDialog />
      <BacklogDeleteDialog />
    </>
  );
};

export default Navbar;
