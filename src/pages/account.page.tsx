import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useSignOutMutation } from "@/queries/mutations/auth.mutation";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Account = () => {
  const mutation = useSignOutMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (mutation.isError) {
      toast(mutation.error.message);
    }

    if (mutation.isSuccess) {
      navigate("/auth/sign-in");
    }
  }, [mutation.status]);

  return (
    <div>
      <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
        {mutation.isPending && <Spinner />}Sign out
      </Button>
    </div>
  );
};

export default Account;
