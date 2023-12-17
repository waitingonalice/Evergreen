import { SwatchIcon } from "@heroicons/react/20/solid";
import { useRef, useState } from "react";
import { Tooltip } from "~/components";
import { Dropdown, DropdownProps } from "~/components/dropdown";
import { useDebouncedCallback } from "~/utils";

type ThemeDropdownProps = Omit<DropdownProps, "button">;

const ThemeButton = () => {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const handleHover = (movement: "in" | "out") => {
    setShow(movement === "in");
  };

  const debounceHover = useDebouncedCallback(handleHover, 800);

  return (
    <>
      <div ref={ref}>
        <SwatchIcon
          className="w-6 h-auto text-primary"
          onMouseEnter={() => debounceHover("in")}
          onMouseLeave={() => debounceHover("out")}
        />
      </div>
      <Tooltip
        description="Select theme"
        show={show}
        targetElement={ref.current}
        position="bottom"
        className="w-fit whitespace-nowrap"
      />
    </>
  );
};

export const ThemeDropdown = (props: ThemeDropdownProps) => (
  <Dropdown {...props} button={<ThemeButton />} withCheckmark />
);
