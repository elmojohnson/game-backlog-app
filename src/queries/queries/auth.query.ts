import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../functions/auth.function";

export const useCurrentUserQuery = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });
};
