export enum SupportedCurrencies {
  EUR = 'EUR',
  CHF = 'CHF',
  USD = 'USD'
}

export type CurrencyInput = {
  currency?: SupportedCurrencies;
  amount: number | '';
};
