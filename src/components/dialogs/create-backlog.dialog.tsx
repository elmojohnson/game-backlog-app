import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateBacklogMutation } from "@/queries/mutations/backlog.mutation";
import { BacklogSchema, type BacklogDto } from "@/schemas/backlog.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon, Plus } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Spinner } from "../ui/spinner";

const CreateBacklogDialog = () => {
  const navigate = useNavigate();
  const mutation = useCreateBacklogMutation();

  const form = useForm<BacklogDto>({
    resolver: zodResolver(BacklogSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (data: BacklogDto) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success("Backlog created!");
      navigate("/backlogs/" + mutation.data[0].id);
    }
  }, [mutation.status]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button data-testid="create-dialog-trigger">
          <Plus />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Create a new backlog</DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <form
            id="create-backlog-form"
            data-testid="create-backlog-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name-input">Name</FieldLabel>
                  <Input
                    {...field}
                    id="name-input"
                    data-testid="name-input"
                    aria-invalid={fieldState.invalid}
                    placeholder="Name"
                    autoComplete="off"
                    disabled={mutation.isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description-input">
                    Description
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="description-input"
                    data-testid="description-input"
                    aria-invalid={fieldState.invalid}
                    placeholder="Description"
                    autoComplete="off"
                    disabled={mutation.isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {mutation.isError && (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  <p>{mutation.error.message}</p>
                </AlertDescription>
              </Alert>
            )}
          </form>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            form="create-backlog-form"
            id="create-button"
            data-testid="create-button"
            disabled={mutation.isPending}
          >
            {mutation.isPending && <Spinner />}
            Create
          </Button>
          <Button variant="outline" disabled={mutation.isPending}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBacklogDialog;
