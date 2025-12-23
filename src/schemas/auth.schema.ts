import * as z from "zod";

export const SignInSchema = z.object({
  email: z.email().nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

export type SignInDto = z.infer<typeof SignInSchema>;

export const SignUpSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.email().nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password is too short")
    .nonempty("Password is required"),
});

export type SignUpDto = z.infer<typeof SignUpSchema>;
