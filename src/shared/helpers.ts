import { format, isValid } from 'date-fns';

export const readablePriceWithoutSymbol = (
  price: number,
  currency: string,
  locales: string = 'de-DE'
) =>
  new Intl.NumberFormat(locales, { currency, maximumFractionDigits: 2 }).format(
    price
  );

export const formatDate = (date?: Date | null) =>
  date && isValid(date) ? format(date, 'yyyy-MM-dd') : undefined;

/**
 * Taken from https://css-tricks.com/snippets/javascript/random-hex-color/
 */
export const randomHexColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;
