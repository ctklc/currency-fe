export enum SupportedCurrencies {
  EUR = 'EUR',
  CHF = 'CHF',
  USD = 'USD'
}

export type SupportedCurrencyShorts = keyof typeof SupportedCurrencies;

export type CurrencyInput = {
  currency?: SupportedCurrencies;
  amount: number | '';
};
