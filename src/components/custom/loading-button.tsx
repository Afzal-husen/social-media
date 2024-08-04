import React from "react";
import { Button, ButtonProps } from "../ui/button";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}

const LoadingButton = ({
  className,
  loading,
  disabled,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button disabled={loading || disabled} className="w-full" {...props}>
      {loading ? <Loader2 className="shring-0 animate-spin" /> : props.children}
    </Button>
  );
};

export default LoadingButton;
