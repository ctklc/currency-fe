import {
  ConvertCurrenciesQueryParams,
  HistoricalCurrenciesQueryParams
} from './types';
import { SupportedCurrencies } from '../shared/types';

export const apiURL = process.env.REACT_APP_API_URL;
export const apiKey = process.env.REACT_APP_API_KEY;

export const fetchWithAuth = (input: RequestInfo | URL, init?: RequestInit) =>
  fetch(input, {
    ...init,
    headers: new Headers({
      ...init?.headers,
      Apikey: apiKey as string
    })
  });

export const defaultBase = SupportedCurrencies.EUR;

export const defaultSymbols = [
  SupportedCurrencies.CHF,
  SupportedCurrencies.USD
];

export const convertCurrencies = (queryParams: ConvertCurrenciesQueryParams) =>
  `${apiURL}/convert?${new URLSearchParams(queryParams)}`;

export const historicalCurrencies = ({
  base = defaultBase,
  symbols = defaultSymbols,
  startDate,
  endDate
}: HistoricalCurrenciesQueryParams) =>
  `${apiURL}/timeseries?${new URLSearchParams({
    start_date: startDate,
    end_date: endDate,
    base,
    symbols: symbols.join(',')
  })}`;
