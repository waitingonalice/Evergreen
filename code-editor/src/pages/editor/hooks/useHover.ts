import { useRef, useState } from "react";
import { useDebouncedCallback } from "~/utils";

export const useHover = () => {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const handleHover = (movement: "in" | "out") => {
    setShow(movement === "in");
  };

  const debounceHover = useDebouncedCallback(handleHover, 500);

  return {
    onHover: debounceHover,
    show,
    ref,
  };
};
