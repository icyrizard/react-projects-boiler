import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import Pane from "@/components/Pane.tsx";

interface PaneProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const Page = forwardRef<HTMLDivElement, PaneProps>((props, ref) => {
  const { className, children, ...rest } = props;

  const classes = twMerge("content w-full", className);

  return (
    <Pane ref={ref} {...rest} className={classes}>
      {children}
    </Pane>
  );
});

export default Page;
