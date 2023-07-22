/* eslint-disable no-underscore-dangle */
import { useRef } from "react";
import isNumber from "lodash/isNumber";
import type { ZodEffects, ZodObject } from "zod";
import { findKey } from "../formatting";

interface UseFormType {
  zod: ZodObject<any> | ZodEffects<ZodObject<any>>;
  data: Record<string, any>;
}

/**
 * @description
 * useForm is a custom hook that is used to handle form submissions.
 * @params zod - the zod object schema to be used for validation
 * @returns {function} addRefs - an array of references to be used in the form elements, each ref from an element is pushed into this array.
 * @returns {function} onSubmit - a function that takes in an event and a callback function to be executed after the form submission is handled.
 * @returns {function} validate - a function that takes in an id and a value to be validated.
 */
export const useForm = ({ zod, data }: UseFormType) => {
  const refs = useRef<Array<HTMLElement | null>>([]);

  const schemaKeys: string[] =
    "keyof" in zod
      ? zod.keyof()._def.values
      : zod._def.schema.keyof()._def.values;

  const subsetSchema = (key: string) =>
    "pick" in zod
      ? zod.pick({ [key]: true })
      : zod._def.schema.pick({ [key]: true });

  // zod middleware to customise default error messages
  const middleware = () => {
    schemaKeys.forEach((key) => {
      const singleSchema = subsetSchema(key);
      if (singleSchema) {
        const { shape } = singleSchema._getCached();
        const schemaDefinitions = findKey("checks", shape) as
          | Array<{
              kind: string;
              value: number;
              message?: string;
            }>
          | undefined;
        if (schemaDefinitions && schemaDefinitions.length > 0) {
          for (let i = 0; i < schemaDefinitions.length; i += 1) {
            const schemaCheck = schemaDefinitions[i];
            const hasCustomMessage = "message" in schemaCheck;
            // custom message goes here
            if (schemaCheck.kind === "min" && !hasCustomMessage) {
              schemaCheck.message = "This field is required";
            }

            if (schemaCheck.kind === "max" && !hasCustomMessage) {
              schemaCheck.message = `This field cannot be longer than ${schemaCheck.value} characters`;
            }
          }
        }
      }
    });
  };

  middleware();

  return {
    /**
     * @param node - the node to be added to the refs array
     * @example ref={(node) => addRefs(node)}
     */
    ref: <T>(node: T extends HTMLElement ? T : null) => refs.current.push(node),

    /**
     * @param callback - the callback function to be executed after the form submission is handled.
     * @param e - the event object
     * @example onSubmit(() => console.log("Form submitted!"));
     */
    onSubmitValidate: () => {
      if (refs.current.length > 0) {
        refs.current.forEach((element) => {
          if (!element) return;
          element.focus();
          element.blur();
          element.scrollIntoView({
            block: "nearest",
            inline: "center",
          });
        });
        // clean up
        refs.current = [];
      }
      const result = zod.safeParse(data);
      return result.success;
    },

    /**
     * @params id - the id of the element to be validated
     * @params value - the value of the element to be validated
     */
    validate: (id: string, value: string) => {
      if (!zod) return "";
      const checkValue = isNumber(value) ? +value : value ?? "";
      const singleSchema = subsetSchema(id);
      const result = singleSchema.safeParse({
        [id]: checkValue,
      });
      if (result && !result.success) {
        const {
          error: { issues: data },
        } = result;
        return data[0].message;
      }
      return "";
    },
  };
};
