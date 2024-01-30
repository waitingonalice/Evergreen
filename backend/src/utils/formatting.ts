interface currencyHandlerType {
  value: number | string;
  encode?: boolean;
}

export const currencyHandler = ({ value, encode }: currencyHandlerType) => {
  const multiplier = 100;
  const toNumber = Number(value);
  if (encode) return toNumber * multiplier;
  return toNumber / multiplier;
};

export const toBase64 = (input: string) => {
  const buff = Buffer.from(input);
  return buff.toString("base64");
};

export const fromBase64 = (input: string) => {
  const buff = Buffer.from(input, "base64");
  return buff.toString("utf8");
};
