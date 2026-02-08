import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

function FullScreenSpinner() {
  return (
    <div className="w-screen h-100 flex items-center justify-center">
      <Spinner className="size-10" />
    </div>
  );
}

export { Spinner, FullScreenSpinner };
