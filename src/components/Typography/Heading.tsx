import { twMerge } from "tailwind-merge";

const sizes = {
  small: "text-md uppercase text-gray-600",
  medium: "text-xl text-primary font-bold ",
  large: "text-3xl font-bold",
  xsmall: "text-sm text-gray-500",
};

interface HeaderProps {
  children?: React.ReactNode;
  size?: keyof typeof sizes;
  className?: string;
}

export default function Heading({
  children,
  size,
  className,
  ...rest
}: HeaderProps) {
  const sizeClass = size ? sizes[size] ?? sizes.large : sizes.large;

  const classes = twMerge(sizeClass, className ?? "");

  return (
    <h1 className={classes} {...rest}>
      {children}
    </h1>
  );
}
