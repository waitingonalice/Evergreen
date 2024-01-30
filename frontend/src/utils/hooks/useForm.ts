/* eslint-disable no-underscore-dangle */
import { findKey } from "@expense-tracker/shared";
import { useRef } from "react";
import isNumber from "lodash/isNumber";
import union from "lodash/union";
import type { ZodEffects, ZodObject, ZodSchema } from "zod";

interface UseFormType<T> {
  zod: ZodObject<any> | ZodEffects<ZodObject<any>>;
  data: T;
}

export const useForm = <T extends Record<string, any>>({
  zod,
  data,
}: UseFormType<T>) => {
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
              schemaCheck.message = "This field is required.";
            }

            if (schemaCheck.kind === "max" && !hasCustomMessage) {
              schemaCheck.message = `This field cannot be longer than ${schemaCheck.value} characters.`;
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
    ref: <T>(node: T extends HTMLElement ? T : null) => {
      refs.current = union(refs.current, [node]);
    },

    /**
     * @param customSchema - optional custom schema to be used for validation instead of the default schema provided.
     * E.g. To evaluate data in the form of an array of objects
     */
    onSubmitValidate: <P extends ZodSchema>(customSchema?: P) => {
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
      const result = customSchema
        ? customSchema.safeParse(data)
        : zod.safeParse(data);

      return result.success;
    },

    /**
     * @params id - the id of the element to be validated
     * @params value - the value of the element to be validated
     */
    validate: (id: string, value: string) => {
      if (!zod) return "";
      const checkValue = isNumber(value) ? Number(value) : value ?? "";
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
