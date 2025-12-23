import { useMutation } from "@tanstack/react-query";
import {
  signInWithPassword,
  signOut,
  signUpWIthEmailAndPassword,
} from "../functions/auth.function";

// SIGN UP
export const useSignUpWithEmailAndPasswordMutation = () => {
  return useMutation({
    mutationFn: signUpWIthEmailAndPassword,
  });
};

// SIGN IN
export const useSignInWithPasswordMutation = () => {
  return useMutation({
    mutationFn: signInWithPassword,
  });
};

// SIGN OUT
export const useSignOutMutation = () => {
  return useMutation({
    mutationFn: signOut,
  });
};
