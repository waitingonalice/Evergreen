import { useState } from "react";
import { z } from "zod";
import { isNumber } from "~/constants";

/**
 * @returns {string} `error` - the error message to be displayed based on zod schema validation
 * @returns {function} `validate` - a function that takes in the zod object schema, the id of the element and the value from the element and validates it.
 */
export const useValidate = () => {
  const [error, setError] = useState("");

  /**
   * @oarams zod - the zod object schema to be used for validation
   * @params id - the id of the element to be validated
   * @params value - the value of the element to be validated
   */
  const validate = (
    zod: ReturnType<typeof z.object>,
    id: string,
    value: string
  ) => {
    const checkValue = isNumber.test(value) ? +value : value;
    const subsetSchema = zod.pick({ [id]: true });
    const result = subsetSchema.safeParse({
      [id]: checkValue === "" ? undefined : checkValue,
    });

    if (result && !result.success) {
      const {
        error: { issues: data },
      } = result;
      setError(data[0].message);
    } else {
      setError("");
    }
  };

  return { error, validate };
};
