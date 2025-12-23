import { useMutation } from "@tanstack/react-query";
import { signUpWIthEmailAndPassword } from "../functions/auth.function";

export const useMutateSignInWithEmailAndPassword = () => {
  return useMutation({
    mutationFn: signUpWIthEmailAndPassword,
  });
};
