import { RiLoader4Fill } from "react-icons/ri";
import React from "react";
import { IconBaseProps } from "react-icons/lib/cjs/iconBase";
import { twMerge } from "tailwind-merge";

export default function Loader(props: IconBaseProps) {
  const { className, ...rest } = props;

  const classes = twMerge("animate-spin text-primary", className);

  return <RiLoader4Fill {...rest} className={classes} />;
}
