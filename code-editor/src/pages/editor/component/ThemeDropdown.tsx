import { SwatchIcon } from "@heroicons/react/20/solid";
import { Tooltip } from "~/components";
import { Dropdown, DropdownProps } from "~/components/dropdown";
import { useHover } from "../hooks/useHover";

type ThemeDropdownProps = Omit<DropdownProps, "button">;

const ThemeButton = () => {
  const { show, onHover, ref } = useHover();

  return (
    <>
      <div ref={ref}>
        <SwatchIcon
          className="w-5 h-auto text-primary"
          onMouseEnter={() => onHover("in")}
          onMouseLeave={() => onHover("out")}
        />
      </div>
      <Tooltip
        description="Theme"
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
