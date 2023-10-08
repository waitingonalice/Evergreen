interface currencyHandlerType {
  value: number;
  encode?: boolean;
}

export const currencyHandler = ({ value, encode }: currencyHandlerType) => {
  const multiplier = 100;
  if (encode) return value * multiplier;
  return value / multiplier;
};

interface formatCurrencyType {
  value: number;
  country: string;
}

// TODO: Add support for more countries and map to their respective currency code
export const formatCurrency = ({ value, country }: formatCurrencyType) =>
  // Alpha3 country code
  value.toLocaleString(country, {
    style: "currency",
    currency: "placeholder",
    currencyDisplay: "code",
  });
