import { twMerge } from "tailwind-merge";

const sizes = {
  small: "text-gray-600 font-bold",
  medium: "text-2xl",
  large: "text-3xl",
  xsmall: "text-sm text-gray-500",
  default: "",
};

interface ParagraphProps {
  children?: React.ReactNode;
  size?: keyof typeof sizes;
  className?: string;
}

export default function Paragraph({
  children,
  size,
  className,
  ...rest
}: ParagraphProps) {
  const sizeClass = size ? sizes[size] ?? sizes.default : sizes.default;

  const classes = twMerge(
    sizeClass,
    "text-sm md:text-default",
    className ?? "",
  );

  return (
    <p className={classes} {...rest}>
      {children}
    </p>
  );
}
