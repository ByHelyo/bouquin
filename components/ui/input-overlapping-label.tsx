import React, { forwardRef } from "react";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

type InputWithOverlappingLabelProps = {
  label: string;
  className?: string;
};

const InputWithOverlappingLabel = forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & InputWithOverlappingLabelProps
>(({ label, className, ...props }, ref) => {
  return (
    <div className="group relative">
      <label
        htmlFor="input-31"
        className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-xs font-medium text-foreground group-has-[:disabled]:opacity-50"
      >
        {label}
      </label>
      <Input
        ref={ref}
        id="input-31"
        className={cn("h-10", className)}
        {...props}
      />
    </div>
  );
});

export default InputWithOverlappingLabel;
