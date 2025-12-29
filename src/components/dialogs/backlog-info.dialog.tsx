import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { AlertCircleIcon, InfoIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BacklogSchema, type BacklogDto } from "@/schemas/backlog.schema";
import { useUpdateBacklogMutation } from "@/queries/mutations/backlog.mutation";
import { useContext } from "react";
import { BacklogContext } from "@/contexts/backlog.context";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Spinner } from "../ui/spinner";

const BacklogInfoDialog = () => {
  const ctx = useContext(BacklogContext);
  const mutation = useUpdateBacklogMutation();
  const form = useForm<BacklogDto>({
    resolver: zodResolver(BacklogSchema),
    defaultValues: {
      name: ctx?.backlogDetails.data?.name,
      description: ctx?.backlogDetails.data?.description,
    },
  });

  const onSubmit = (data: BacklogDto) => {
    mutation.mutate({ id: ctx?.backlogDetails.data?.id!, ...data });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <InfoIcon />
        </Button>
      </DialogTrigger>

      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Backlog info</DialogTitle>
        </DialogHeader>

        <div className="overflow-x-auto">
          <form
            id="update-backlog-form"
            data-testid="update-backlog-form"
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
            form="update-backlog-form"
            id="update-button"
            data-testid="update-button"
            disabled={mutation.isPending}
          >
            {mutation.isPending && <Spinner />}
            Update
          </Button>
          <Button variant="outline" disabled={mutation.isPending}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BacklogInfoDialog;
