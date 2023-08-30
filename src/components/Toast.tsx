import React, { forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Pane from "@/components/Pane.tsx";
import * as Toast from "@radix-ui/react-toast";
import { AiFillCheckCircle, AiFillExclamationCircle } from "react-icons/ai";

const appearanceMap = {
  default: "bg-primary text-white",
  success: "bg-success text-white",
  error: "bg-error text-white",
};

type ShowToastFunctionProps = {
  message: string;
};

export type DaToastElement = {
  success: ({ message }: ShowToastFunctionProps) => void;
  error: ({ message }: ShowToastFunctionProps) => void;
};

const iconMap = {
  error: <AiFillExclamationCircle size={24} className="text-white" />,
  success: <AiFillCheckCircle size={24} className="text-white" />,
  default: null,
};

const AppToast = forwardRef<DaToastElement>((_, forwardedRef) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const [appearance, setAppearance] =
    useState<keyof typeof appearanceMap>("success");

  React.useImperativeHandle(forwardedRef, () => {
    return {
      success({ message }: ShowToastFunctionProps) {
        setIsOpen(true);
        setMessage(message);
        setAppearance("success");
      },
      error({ message }: ShowToastFunctionProps) {
        setIsOpen(true);
        setMessage(message);
        setAppearance("error");
      },
    };
  });
  //
  const classes = twMerge(
    "rounded-md p-[15px] shadow-lg grid grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut",
    appearanceMap[appearance],
  );

  const icon = iconMap[appearance];

  return (
    <>
      <Toast.Root className={classes} open={isOpen} onOpenChange={setIsOpen}>
        <Pane className="flex gap-1">
          {icon && icon}
          <Toast.Title className="mb-[5px] font-medium text-[15px]">
            {message}
          </Toast.Title>
        </Pane>
        <Toast.Description asChild>{message}</Toast.Description>
        <Toast.Close aria-label="Close">
          <span aria-hidden>×</span>
        </Toast.Close>
      </Toast.Root>
      <Toast.Viewport className="[--viewport-padding:_25px] fixed top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col p-[var(--viewport-padding)] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </>
  );
});

export default AppToast;
