import { useCurrentUserQuery } from "@/queries/queries/auth.query";
import { FullScreenSpinner } from "./ui/spinner";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isPending } = useCurrentUserQuery();

  if (isPending) {
    return <FullScreenSpinner />;
  }

  if (!user) {
    return <Navigate to="/auth/sign-in" />;
  }

  return children;
};

export default ProtectedRoute;
