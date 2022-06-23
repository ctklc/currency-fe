export const readablePrice = (
  price: number,
  currency: string,
  locales: string = 'de-DE'
) =>
  new Intl.NumberFormat(locales, {
    style: 'currency',
    maximumSignificantDigits: 2,
    currency
  }).format(price);

export default { readablePrice };
