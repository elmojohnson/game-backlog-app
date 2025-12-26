import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, type SignUpDto } from "@/schemas/auth.schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useSignUpWithEmailAndPasswordMutation } from "@/queries/mutations/auth.mutation";
import { useEffect } from "react";
import { toast } from "sonner";
import { useCurrentUserQuery } from "@/queries/queries/auth.query";

const SignUp = () => {
  const navigate = useNavigate();
  const { data: user } = useCurrentUserQuery();

  type FormInput = {
    name: keyof SignUpDto;
    label: string;
    placeholder: string;
    type: string;
  };

  const formInputs: FormInput[] = [
    {
      name: "name",
      label: "Name",
      placeholder: "Name",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Email",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Password",
      type: "password",
    },
  ];

  const form = useForm<SignUpDto>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const mutation = useSignUpWithEmailAndPasswordMutation();

  const onSubmit = (data: SignUpDto) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    if (user) {
      navigate("/backlogs");
    }
  }, [user]);

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success("Account created!");
      navigate("/backlogs");
    }
  }, [mutation.status]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card className="w-full md:w-75 mx-4 md:mx-0">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>Create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="sign-up-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {formInputs.map((input) => {
              return (
                <Controller
                  key={input.label}
                  name={input.name}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={input.label + "-input"}>
                        {input.label}
                      </FieldLabel>
                      <Input
                        {...field}
                        id={input.name + "-input"}
                        data-testid={input.name + "-input"}
                        aria-invalid={fieldState.invalid}
                        placeholder={input.label}
                        autoComplete="off"
                        type={input.type}
                        disabled={mutation.isPending}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              );
            })}
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          {mutation.isError && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                <p>{mutation.error.message}</p>
              </AlertDescription>
            </Alert>
          )}
          <Button
            className="w-full"
            type="submit"
            form="sign-up-form"
            id="sign-up-button"
            data-testid="sign-up-button"
            disabled={mutation.isPending}
          >
            {mutation.isPending && <Spinner />}
            Sign up
          </Button>
          <Button
            className="w-full"
            variant="outline"
            asChild
            disabled={mutation.isPending}
          >
            <Link to="/auth/sign-in">I already have an account</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
