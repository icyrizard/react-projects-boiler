import React from "react";
import * as Form from "@radix-ui/react-form";
import {
  FormFieldProps as RadixFormFieldProps,
  FormLabelProps as RadixFormLabelProps,
} from "@radix-ui/react-form";
import Pane from "@/components/Pane.tsx";
import { twMerge } from "tailwind-merge";

export interface FormLabelProps extends RadixFormLabelProps {
  isDisabled?: boolean;
  isRequired?: boolean;
}

export interface FormFieldProps extends RadixFormFieldProps {
  invalidTypeText?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  isSaving?: boolean;
  label: string;
  typeMatchFn?: (value: string) => boolean;
  valueMissingText?: string;
}

function FormLabel({ children, ...props }: FormLabelProps) {
  const { isRequired, ...rest } = props;

  return (
    <Form.Label {...rest}>
      {children}
      {isRequired && <span className="pl-1 text-error">*</span>}
    </Form.Label>
  );
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (props, forwardedRef) => {
    const {
      isSaving,
      label,
      name,
      className,
      children,
      invalidTypeText,
      isRequired,
      valueMissingText,
      typeMatchFn,
    } = props;

    return (
      <Form.Field
        ref={forwardedRef}
        className={twMerge("mb-[10px]", isSaving && "opacity-50", className)}
        name={name}
      >
        <Pane className="flex items-baseline justify-between">
          <FormLabel isRequired={isRequired}>{label}</FormLabel>
        </Pane>
        <Pane>{children}</Pane>
        {valueMissingText && (
          <Form.Message className="text-[13px] text-error" match="valueMissing">
            {valueMissingText}
          </Form.Message>
        )}
        {invalidTypeText && (
          <Form.Message
            className="text-[13px] text-error"
            match={typeMatchFn ?? "typeMismatch"}
          >
            {invalidTypeText}
          </Form.Message>
        )}
        {/*)}*/}
      </Form.Field>
    );
  },
);

export default FormField;
