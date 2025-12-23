import { useMutation } from "@tanstack/react-query";
import { signUpWIthEmailAndPassword } from "../functions/auth.function";

export const useMutateSignUpWithEmailAndPassword = () => {
  return useMutation({
    mutationFn: signUpWIthEmailAndPassword,
  });
};
