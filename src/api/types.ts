import { SupportedCurrencies } from '../shared/types';

export type APIResponse = {
  success: boolean;
};

export type DefaultQueryParams = {
  base?: SupportedCurrencies;
  symbols?: SupportedCurrencies[];
};

export type ConvertCurrenciesQueryParams = {
  amount: string;
  from: SupportedCurrencies;
  to: SupportedCurrencies;
  /**
   * format YYYY-MM-DD
   */
  date?: string;
};

export type ConvertCurrenciesResponse = APIResponse & {
  /**
   * format YYYY-MM-DD
   */
  date: string;
  historical?: boolean;
  result: number;
  info: {
    rate: number;
  };
  query: Pick<ConvertCurrenciesQueryParams, 'from' | 'to'> & { amount: number };
};

export type HistoricalCurrenciesQueryParams = DefaultQueryParams & {
  /**
   * format YYYY-MM-DD
   */
  startDate: string;
  /**
   * format YYYY-MM-DD
   */
  endDate: string;
};

export type HistoricalCurrenciesResponse = APIResponse &
  DefaultQueryParams & {
    /**
     * format YYYY-MM-DD
     */
    startDate: string;
    /**
     * format YYYY-MM-DD
     */
    endDate: string;
    rates: Record<string, Record<SupportedCurrencies, number>>;
  };
