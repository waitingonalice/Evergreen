/* eslint-disable @typescript-eslint/no-empty-function */

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-empty-interface */
import { useMutation } from "react-query";
import { apiRoutes } from "~/constants";
import { request } from "~/utils";

interface AddCollectionResponseType {
  result: string;
}
interface AddCollectionInputType {
  input: string;
}
type AddCollectionSideEffectsType = {
  onSuccess?: (data: AddCollectionResponseType) => void;
  onError?: (error: Error) => void;
};
export const useAddToCollection = (
  sideEffects: AddCollectionSideEffectsType
) => {
  const { mutate, ...rest } = useMutation(
    (input: AddCollectionInputType) =>
      request<AddCollectionResponseType>({
        url: apiRoutes.collections.addCollection,
        method: "POST",
        input,
      }),
    {
      ...sideEffects,
    }
  );
  const mutation = async (input: string) => mutate({ input });

  return [mutation, rest] as const;
};
