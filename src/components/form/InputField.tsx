import React from "react";
import { twMerge } from "tailwind-merge";

export type InputFieldProps = React.ComponentProps<"input">;

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (props, forwardedRef) => {
    const { className, placeholder, ...rest } = props;

    const classes = twMerge(
      "w-full inline-flex h-12 border border-theme-gray-500 px-3 text-sm selection:color-black rounded-sm",
      className,
    );

    return (
      <input
        {...rest}
        ref={forwardedRef}
        className={classes}
        placeholder={placeholder}
      />
    );
  },
);

export default InputField;
