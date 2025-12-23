import type { SignInDto, SignUpDto } from "@/schemas/auth.schema";
import supabase from "@/utils/supabase.util";

export const signUpWIthEmailAndPassword = async ({
  email,
  password,
  name,
}: SignUpDto) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const signInWithPassword = async ({ email, password }: SignInDto) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
