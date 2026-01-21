import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useContext, useEffect } from "react";
import { BacklogContext } from "@/contexts/backlog.context";
import { useDeleteBacklogMutation } from "@/queries/mutations/backlog.mutation";
import { Spinner } from "../ui/spinner";
import { useNavigate } from "react-router";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";

const BacklogDeleteDialog = () => {
  const navigate = useNavigate();
  const ctx = useContext(BacklogContext);
  const mutation = useDeleteBacklogMutation();

  const handleDelete = () => {
    mutation.mutate(ctx?.backlogDetails.data?.id!);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      navigate("/backlogs");
    }
  }, [mutation.status]);

  return (
    <Dialog
      open={ctx?.dialogs.isDeleteDialogOpen}
      onOpenChange={ctx?.dialogs.setDeleteDialogOpen}
    >
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Delete this backlog?</DialogTitle>
        </DialogHeader>
        <div>
          {mutation.isError && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                <p>{mutation.error.message}</p>
              </AlertDescription>
            </Alert>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleDelete} disabled={mutation.isPending} data-testid="delete-button">
            {mutation.isPending && <Spinner />}Yes
          </Button>
          <Button
            variant="outline"
            onClick={() => ctx?.dialogs.setDeleteDialogOpen(false)}
            disabled={mutation.isPending}
          >
            No
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BacklogDeleteDialog;
