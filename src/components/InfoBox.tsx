import React from "react";
import Paragraph from "@/components/Typography/Paragraph.tsx";
import Pane from "@/components/Pane.tsx";
import {
  AiFillExclamationCircle,
  AiFillInfoCircle,
  AiFillWarning,
} from "react-icons/ai";
import { twMerge } from "tailwind-merge";

const appearanceMap = {
  info: "bg-theme-50 border-theme-200 text-theme-500",
  error: "bg-red-50 border-red-500 text-red-500",
  warning: "bg-yellow-50 border-orange-200 text-yellow-400",
};

const textAppearanceMap = {
  info: "text-theme-600",
  error: "text-red-600",
  warning: "text-yellow-600",
};

const descriptionAppearanceMap = {
  info: "text-primary",
  error: "text-red-900",
  warning: "text-yellow-900",
};

type InfoBoxProps = {
  appearance?: keyof typeof appearanceMap;
  message?: string;
  description?: string;
  className?: string;
};

const iconMap = {
  error: <AiFillExclamationCircle size={24} />,
  info: <AiFillInfoCircle size={24} />,
  warning: <AiFillWarning size={24} />,
};

export default function InfoBox(props: InfoBoxProps) {
  const {
    message,
    description,
    className,
    appearance = "info",
    ...rest
  } = props;

  const classes = twMerge(
    "flex gap-3 rounded border py-4 px-3",
    className,
    appearanceMap[appearance],
  );

  const messageClasses = twMerge(textAppearanceMap[appearance]);
  const descriptionClasses = twMerge(descriptionAppearanceMap[appearance]);

  const icon = iconMap[appearance];

  return (
    <Pane {...rest} className={classes}>
      {icon && icon}
      <Pane>
        <Paragraph className={messageClasses} size="small">
          {message}
        </Paragraph>
        <Paragraph className={descriptionClasses} size="xsmall">
          {description}
        </Paragraph>
      </Pane>
    </Pane>
  );
}
