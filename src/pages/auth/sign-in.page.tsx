import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, type SignInDto } from "@/schemas/auth.schema";
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
import { Link } from "react-router";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

const SignIn = () => {
  type FormInput = {
    name: keyof SignInDto;
    label: string;
    placeholder: string;
    type: string;
  };

  const formInputs: FormInput[] = [
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

  const form = useForm<SignInDto>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignInDto) => {
    if (data.email === "error@test.com") {
      form.setError("root", { type: "custom", message: "Invalid credentials" });
    }

    console.log(data);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card className="w-full md:w-75 mx-4 md:mx-0">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Sign in to continue using the app</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="sign-in-form"
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
                        id={input.label + "-input"}
                        aria-invalid={fieldState.invalid}
                        placeholder={input.label}
                        autoComplete="off"
                        type={input.type}
                        disabled={form.formState.isSubmitting}
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
          {form.formState.errors.root?.type == "custom" && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                <p>{form.formState.errors.root.message}</p>
              </AlertDescription>
            </Alert>
          )}
          <Button
            className="w-full"
            type="submit"
            form="sign-in-form"
            id="sign-in-button"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && <Spinner />}
            Sign in
          </Button>
          <Button
            className="w-full"
            variant="outline"
            asChild
            disabled={form.formState.isSubmitting}
          >
            <Link to="/auth/sign-up">Create an account</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
