import { Button, Tooltip } from "~/components";
import { useHover } from "../hooks/useHover";

interface UnsavedChangesProps {
  onAdd: () => void;
  disabled: boolean;
}
export const AddCollection = ({ onAdd, disabled }: UnsavedChangesProps) => {
  const { show, onHover, ref } = useHover();

  return (
    <div
      ref={ref}
      onMouseEnter={() => onHover("in")}
      onMouseLeave={() => onHover("out")}
    >
      <Button
        className="relative"
        size="small"
        onClick={onAdd}
        disabled={disabled}
      >
        Add to collection
      </Button>
      <Tooltip
        description="Press Ctrl + S to add to collection"
        show={show}
        targetElement={ref.current}
        position="bottom"
        className="w-fit whitespace-nowrap pt-2 -right-[160px]"
      />
    </div>
  );
};
