type SuccessfulResponse = Record<"data", unknown>;
type ErrorResponse = Record<"code", string>;
type ResponseType = SuccessfulResponse | ErrorResponse;
interface FetchType<T> {
  url: string;
  input?: T;
  method?: "GET" | "POST";
  type?: "application/json" | "multipart/form-data";
}

/** Helper function to fetch data from the backend, can be used in conjunction with React-Query */
export const request = async <Response extends ResponseType, Variables>({
  url,
  input,
  method = "GET",
  type = "application/json",
}: FetchType<Variables>) => {
  const response = await fetch(url, {
    method,
    body: JSON.stringify(input),
    headers: {
      "Content-Type": type,
    },
  });
  const res: Response = await response.json();
  if ("code" in res) {
    throw new Error(res.code);
  } else if (!response.ok) throw new Error(`${response.status}`);
  return res;
};
