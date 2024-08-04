import { cn } from "@/lib/utils";
import { EyeIcon, EyeOff } from "lucide-react";
import React from "react";
import { Input } from "./input";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pe-10", className)}
          ref={ref}
          {...props}
        />
        <button
          title={showPassword ? "Hide password" : "Show password"}
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 transform text-muted-foreground"
        >
          {showPassword ? (
            <EyeIcon className="size-5 shrink-0" />
          ) : (
            <EyeOff className="size-5 shrink-0" />
          )}
        </button>
      </div>
    );
  },
);

export { PasswordInput };
