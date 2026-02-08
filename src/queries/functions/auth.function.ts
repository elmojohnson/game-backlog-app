import type { SignInDto, SignUpDto } from "@/schemas/auth.schema";
import supabase from "@/utils/supabase.util";
import type { Session, User, WeakPassword } from "@supabase/supabase-js";

// SIGN UP
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

// SIGN IN
export const signInWithPassword = async ({
  email,
  password,
}: SignInDto): Promise<{
  user: User;
  session: Session;
  weakPassword?: WeakPassword;
}> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// CURRENT USER
export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return user;
};

// SIGN OUT
export const signOut = async () => {
  const { error } = await supabase.auth.signOut({ scope: "local" });

  if (error) {
    throw new Error(error.message);
  }

  return;
};
