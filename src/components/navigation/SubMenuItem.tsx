import { twMerge } from "tailwind-merge";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React from "react";

type SubMenuProps = React.ComponentProps<typeof DropdownMenu.Item> & {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  isDisabled?: boolean;
};

export default function SubMenuItem({ children, ...props }: SubMenuProps) {
  const { isDisabled, isActive, className, ...rest } = props;

  const classes = twMerge(
    "hover:bg-gray-100 hover:text-gray-900 px-4 cursor-pointer py-4 w-full flex items-center gap-2",
    className,
    isActive &&
      "font-bold bg-theme-700 hover:bg-theme-700 hover:text-white text-white",
    isDisabled && "cursor-not-allowed",
  );

  return (
    <DropdownMenu.Item className={classes} {...rest}>
      {children}
    </DropdownMenu.Item>
  );
}
