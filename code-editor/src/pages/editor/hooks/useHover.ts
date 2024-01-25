import { useRef, useState } from "react";
import { useDebouncedCallback } from "~/utils";

export const useHover = (arg?: { delay?: number }) => {
  const { delay = 500 } = arg || {};
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const handleHover = (movement: "in" | "out") => {
    setShow(movement === "in");
  };

  const debounceHover = useDebouncedCallback(handleHover, delay);

  return {
    onHover: debounceHover,
    show,
    ref,
  };
};
