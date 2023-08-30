import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import Pane, { PaneProps } from "@/components/Pane.tsx";
import InputField from "@/components/form/InputField.tsx";
import { useDebounce } from "@/hooks/useDebounce.ts";
import { AiOutlineSearch } from "react-icons/ai";
import Loader from "@/components/Loader.tsx";

type SearchFieldProps = PaneProps & {
  inputFieldProps: React.ComponentProps<typeof InputField>;
  onChangeText?: (value: string) => void;
  onSearch?: (value: string) => void;
  isLoading: boolean;
  className?: string;
};

const SearchField = React.forwardRef<HTMLDivElement, SearchFieldProps>(
  (props, forwardedRef) => {
    const {
      isLoading,
      className,
      onSearch,
      onChangeText,
      inputFieldProps,
      ...rest
    } = props;

    const classes = twMerge("relative", className);

    const [value, setValue] = useState<string>("");
    const debouncedValue = useDebounce<string>(value, 100);

    function onChangeTextCb(event: React.FormEvent<HTMLInputElement>) {
      setValue(event.currentTarget.value);

      onChangeText?.(event.currentTarget.value);
    }

    useEffect(() => {
      onSearch?.(value);
    }, [debouncedValue]);

    return (
      <Pane ref={forwardedRef} className={classes} {...rest}>
        <InputField
          onChange={onChangeTextCb}
          className="pl-10"
          {...inputFieldProps}
        />
        {!isLoading && (
          <AiOutlineSearch className="absolute top-4 left-4" size={20} />
        )}
        {isLoading && <Loader className="absolute top-4 left-4" size={20} />}
      </Pane>
    );
  },
);

export default SearchField;
