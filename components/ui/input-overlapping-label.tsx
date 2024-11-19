import React from "react";
import { Input } from "~/components/ui/input";

type InputWithOverlappingLabelProps = {
  label: string;
  placeholder?: string;
  type?: string;
};

const InputWithOverlappingLabel: React.FC<InputWithOverlappingLabelProps> = ({
  label,
  placeholder,
  type,
}) => {
  return (
    <div className="group relative">
      <label
        htmlFor="input-31"
        className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-xs font-medium text-foreground group-has-[:disabled]:opacity-50"
      >
        {label}
      </label>
      <Input
        id="input-31"
        className="h-10"
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
};

export default InputWithOverlappingLabel;
