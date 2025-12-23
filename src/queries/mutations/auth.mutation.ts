import { useMutation } from "@tanstack/react-query";
import {
  signInWithPassword,
  signUpWIthEmailAndPassword,
} from "../functions/auth.function";

export const useSignUpWithEmailAndPasswordMutation = () => {
  return useMutation({
    mutationFn: signUpWIthEmailAndPassword,
  });
};

export const useSignInWithPasswordMutation = () => {
  return useMutation({
    mutationFn: signInWithPassword,
  });
};
