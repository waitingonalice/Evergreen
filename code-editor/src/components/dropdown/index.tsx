import { Menu, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { Option } from "~/components/forms/FormSelect";
import { Text } from "../text";

interface ExtendedOption extends Option {
  renderLabel?: (label: string) => React.ReactNode;
}
export interface DropdownProps {
  button: React.ReactNode;
  options: ExtendedOption[];
  onSelect?: (value: string) => void;
  selectedValue: string;
  withCheckmark?: boolean;
}
export const Dropdown = ({
  button,
  options,
  onSelect,
  selectedValue,
  withCheckmark,
}: DropdownProps) => {
  const handleSelect = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: string
  ) => {
    e.stopPropagation();
    if (onSelect) onSelect(value);
  };
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="items-center flex transition duration-100 ease-out">
        {typeof button === "string" ? (
          <Text type="body-bold" className="text-dark">
            {button}
          </Text>
        ) : (
          button
        )}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-50"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-50"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 mt-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-80 overflow-y-auto">
          {options?.map(({ label, value, renderLabel }) => (
            <Menu.Item key={value}>
              <button
                type="button"
                className="hover:bg-gray-100 min-w-[200px] flex justify-between p-2 truncate items-center gap-x-2"
                onClick={(e) => handleSelect(e, value)}
              >
                {renderLabel ? (
                  renderLabel(label)
                ) : (
                  <Text type="body">{label}</Text>
                )}
                {withCheckmark && value === selectedValue && (
                  <CheckIcon className="h-4 w-4 text-primary" />
                )}
              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
