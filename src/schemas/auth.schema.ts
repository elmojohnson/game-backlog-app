import * as z from "zod";

export const SignInSchema = z.object({
  email: z.email().nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

export type SignInDto = z.infer<typeof SignInSchema>;
