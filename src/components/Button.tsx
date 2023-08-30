import React from "react";
import { twMerge } from "tailwind-merge";
import { RiLoader4Fill } from "react-icons/ri";

const appearanceMap = {
  primary: "btn-primary px-4 py-2 rounded-[2px] hover:bg-opacity-90",
  minimal: "btn-minimal px-4 py-2 rounded-[2px]",
  default: "btn-default px-4 py-2 rounded-[2px]",
  outline:
    "btn-primary wireframe px-4 py-2 rounded-[2px] hover:bg-opacity-100 outline-none text-primary",
};

type ButtonProps = React.ComponentProps<"button"> & {
  appearance?: keyof typeof appearanceMap;
  icon?: React.ReactNode;
  isError?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    const {
      appearance = "primary",
      className,
      icon,
      isError = false,
      isLoading = false,
      isSuccess = false,
      ...rest
    } = props;

    const classes = twMerge(
      "font-bold",
      appearanceMap[appearance],
      className,
      isError ? "error" : "",
      isSuccess ? "success" : "",
      isLoading
        ? "cursor-loading !hover:bg-unset !hover:bg-opacity-95 !bg-opacity-95"
        : "",
      rest.disabled ? "!bg-neutral !text-neutral-dark" : "",
    );

    return (
      <button disabled={isLoading} ref={ref} className={classes} {...rest}>
        <span className="flex gap-2 items-center">
          {icon && icon}
          {isLoading && <RiLoader4Fill className="animate-spin" />}
          {children}
        </span>
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;
