export const readablePriceWithSymbol = (
  price: number,
  currency: string,
  locales: string = 'de-DE'
) =>
  new Intl.NumberFormat(locales, {
    style: 'currency',
    maximumFractionDigits: 2,
    currency
  }).format(price);

export const readablePriceWithoutSymbol = (
  price: number,
  currency: string,
  locales: string = 'de-DE'
) =>
  new Intl.NumberFormat(locales, { currency, maximumFractionDigits: 2 }).format(
    price
  );
