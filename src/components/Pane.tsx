import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface PaneProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const Pane = forwardRef<HTMLDivElement, PaneProps>((props, ref) => {
  const { className, children, ...rest } = props;

  const classes = twMerge("pane", className);

  return (
    <div ref={ref} {...rest} className={classes}>
      {children}
    </div>
  );
});

export default Pane;
