import { Button } from "@waitingonalice/design-system/components/button";
import { Spinner, Tooltip } from "~/components";
import { useHover } from "../hooks/useHover";

interface UnsavedChangesProps {
  onAdd: () => void;
  disabled?: boolean;
  loading?: boolean;
}
export const AddCollection = ({
  onAdd,
  disabled,
  loading,
}: UnsavedChangesProps) => {
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
        {loading ? <Spinner /> : "Add to collection"}
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
