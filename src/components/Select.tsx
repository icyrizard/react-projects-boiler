import * as RSelect from "@radix-ui/react-select";

type SelectProps = {
  items: string[];
  onValueChange: (value: string) => void;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

export const Select = ({
  value,
  onValueChange,
  items,
  icon,
  disabled,
}: SelectProps) => {
  const handleChange = (newValue: string) => {
    onValueChange(newValue);
  };
  return (
    <RSelect.Root value={value} onValueChange={handleChange}>
      <RSelect.Trigger
        disabled={disabled}
        className="SelectTrigger text-theme-gray-900 w-[3.75rem] h-10 border-theme-gray-500 border rounded-[2px] flex items-center justify-between px-2 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50"
      >
        <RSelect.Value aria-label={value}>
          <span className="mr-2">{value}</span>
        </RSelect.Value>
        {icon && icon}
      </RSelect.Trigger>
      <RSelect.Portal>
        <RSelect.Content
          position="popper"
          className="bg-white shadow top-20 right-2 min-w-[5rem] px-2 py-2"
        >
          <RSelect.Viewport>
            {items.map((item) => (
              <RSelect.Item
                key={item}
                className="hover:bg-gray-100 hover:text-gray-900 rounded-[2px] px-4 cursor-pointer py-4 w-full flex items-center gap-2 outline-none focus-visible:bg-gray-100"
                value={item}
              >
                {item}
              </RSelect.Item>
            ))}
          </RSelect.Viewport>
        </RSelect.Content>
      </RSelect.Portal>
    </RSelect.Root>
  );
};
