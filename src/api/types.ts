import { SupportedCurrencies } from '../shared/types';

export type APIResponse = {
  success: boolean;
};

export type LatestRatesQueryParams = {
  base?: SupportedCurrencies;
  symbols?: SupportedCurrencies[];
};

export type LatestRatesResponse = APIResponse & {
  base: SupportedCurrencies;
  rates: Record<SupportedCurrencies, number>;
};

export type ConvertCurrenciesQueryParams = {
  amount: string;
  from: SupportedCurrencies;
  to: SupportedCurrencies;
  /**
   * YYYY-MM-DD
   */
  date?: string;
};

export type ConvertCurrenciesResponse = APIResponse & {
  /**
   * YYYY-MM-DD
   */
  date: string;
  historical?: boolean;
  info: {
    rate: number;
  };
  query: Pick<ConvertCurrenciesQueryParams, 'from' | 'to'> & { amount: number };
};

export type HistoricalCurrenciesQueryParams = LatestRatesQueryParams & {
  /**
   * YYYY-MM-DD
   */
  startDate: string;
  /**
   * YYYY-MM-DD
   */
  endDate: string;
};

export type HistoricalCurrenciesResponse = APIResponse &
  LatestRatesQueryParams & {
    /**
     * YYYY-MM-DD
     */
    startDate: string;
    /**
     * YYYY-MM-DD
     */
    endDate: string;
    base: SupportedCurrencies;
    rates: Record<string, Record<SupportedCurrencies, number>>;
  };
