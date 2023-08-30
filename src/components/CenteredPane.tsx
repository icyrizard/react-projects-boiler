import React from "react";
import { twMerge } from "tailwind-merge";

import Pane from "@/components/Pane.tsx";

interface PaneProps {
  children?: React.ReactNode;
  className?: string;
  containerProps?: React.HTMLProps<HTMLDivElement>;
}

export default function CenteredPane({
  children,
  className,
  ...rest
}: PaneProps) {
  // const classes = classNames('flex justify-center grow', className ?? '')
  const classes = twMerge("h-full flex justify-center grow", className ?? "");

  const { containerProps, ...props } = rest;

  const { className: containerClasses, ...restContainerProps } =
    containerProps ?? {};

  const containerClassesMerged = twMerge(
    "flex flex-col items-center",
    containerClasses ?? "",
  );

  return (
    <Pane className={classes} {...props}>
      <Pane className={containerClassesMerged} {...restContainerProps}>
        {children}
      </Pane>
    </Pane>
  );
}
