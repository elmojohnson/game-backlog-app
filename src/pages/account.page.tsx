import Layout from "@/components/layouts/main/layout";
import { Button } from "@/components/ui/button";
import { FullScreenSpinner, Spinner } from "@/components/ui/spinner";
import { useSignOutMutation } from "@/queries/mutations/auth.mutation";
import { useCurrentUserQuery } from "@/queries/queries/auth.query";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Account = () => {
  const { data: user, isPending, isError, error } = useCurrentUserQuery(); // TODO: Avoid user query duplication from protected route check
  const mutation = useSignOutMutation();
  const navigate = useNavigate();

  if (isPending) {
    return <FullScreenSpinner />;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  useEffect(() => {
    if (mutation.isError) {
      toast(mutation.error.message);
    }

    if (mutation.isSuccess) {
      navigate("/auth/sign-in");
    }
  }, [mutation.status]);

  return (
    <Layout>
      <div className="mb-4">
        <h5 className="font-bold text-lg">{user?.user_metadata.name}</h5>
        <span>Email: {user?.email}</span>
      </div>
      <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
        {mutation.isPending && <Spinner />}Sign out
      </Button>
    </Layout>
  );
};

export default Account;
