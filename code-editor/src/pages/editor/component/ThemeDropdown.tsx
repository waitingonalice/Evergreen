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
          className="w-5 h-auto text-subtext hover:text-important transition duration-300"
          onMouseEnter={() => onHover("in")}
          onMouseLeave={() => onHover("out")}
        />
      </div>
      <Tooltip
        description="Theme"
        show={show}
        targetElement={ref.current}
        position="bottom"
        className="w-fit whitespace-nowrap pt-1"
      />
    </>
  );
};

export const ThemeDropdown = (props: ThemeDropdownProps) => (
  <Dropdown {...props} button={<ThemeButton />} />
);
