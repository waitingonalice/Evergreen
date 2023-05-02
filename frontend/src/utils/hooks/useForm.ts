import { useRef } from "react";
import type { z } from "zod";
import { isNumber } from "~/constants";

/**
 * @description
 * useForm is a custom hook that is used to handle form submissions.
 * @params zod - the zod object schema to be used for validation
 * @returns {function} addRefs - an array of references to be used in the form elements, each ref from an element is pushed into this array.
 * @returns {function} onSubmit - a function that takes in an event and a callback function to be executed after the form submission is handled.
 * @returns {function} validate - a function that takes in an id and a value to be validated.
 */
export const useForm = (zod?: ReturnType<typeof z.object>) => {
  const refs = useRef<Array<HTMLElement | null>>([]);

  /**
   * @param node - the node to be added to the refs array
   * @example ref={(node) => addRefs(node)}
   */
  const addRefs = <T>(node: T extends HTMLElement ? T : null) =>
    refs.current.push(node);

  /**
   * @params id - the id of the element to be validated
   * @params value - the value of the element to be validated
   */
  const validate = (id: string, value: string) => {
    const checkValue = isNumber.test(value) ? +value : value;
    const subsetSchema = zod?.pick({ [id]: true });
    const result = subsetSchema?.safeParse({
      [id]: checkValue === "" ? undefined : checkValue,
    });

    if (result && !result.success) {
      const {
        error: { issues: data },
      } = result;
      return data[0].message;
    }
    return "";
  };

  const submitActions = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
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

  /**
   * @param callback - the callback function to be executed after the form submission is handled.
   * @param e - the event object
   * @example onSubmit(() => console.log("Form submitted!"));
   */
  const onSubmit = (
    callback: () => void,
    e?: React.FormEvent<HTMLFormElement>
  ) => {
    submitActions(e);
    callback();
  };

  return { addRefs, onSubmit, validate };
};
