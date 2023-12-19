import { CodeBracketIcon } from "@heroicons/react/20/solid";
import { Tooltip } from "~/components";
import { useHover } from "../hooks/useHover";

export const Language = () => {
  const { show, onHover, ref } = useHover();
  return (
    <>
      <div ref={ref}>
        <CodeBracketIcon
          className="w-5 h-auto text-primary"
          onMouseEnter={() => onHover("in")}
          onMouseLeave={() => onHover("out")}
        />
        <Tooltip
          show={show}
          targetElement={ref.current}
          position="bottom"
          description="Typescript"
        />
      </div>
    </>
  );
};
