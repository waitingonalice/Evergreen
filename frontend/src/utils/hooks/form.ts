import { useRef } from "react";

/**
 * @description
 * useForm is a custom hook that is used to handle form submission.
 * It is used to handle form submission in the following way:
 * 1. Prevent default form submission
 * 2. Iterate through all the form elements and focus on them
 * 3. Scroll to the form element
 * @returns {object} refs - an array of references to be used in the form elements, each ref from an element is pushed into this array.
 * @example ref={(node) => refs.curent.push(node)}
 *
 * @returns {function} onSubmit - a function that takes in the event and a callback function to be executed after the form submission is handled.
 * @example onSubmit={(e) => onSubmit(e, callback)}
 */
export const useForm = () => {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const submitActions = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refs.current.forEach((element) => {
      if (!element) return;
      element.focus();
      element.blur();
      element.scrollIntoView({
        block: "nearest",
        inline: "center",
      });
    });
  };

  const addRefs = <T>(node: T extends HTMLInputElement ? T : null) =>
    refs.current.push(node);

  const onSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    callback: () => void
  ) => {
    submitActions(e);
    callback();
  };
  return { addRefs, onSubmit };
};
