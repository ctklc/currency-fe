import {
  ConvertCurrenciesQueryParams,
  HistoricalCurrenciesQueryParams,
  LatestRatesQueryParams
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

export const latestRates = ({
  base = SupportedCurrencies.EUR,
  symbols = [SupportedCurrencies.CHF, SupportedCurrencies.USD]
}: LatestRatesQueryParams = {}) =>
  `${apiURL}/latest?${new URLSearchParams({
    base,
    symbols: symbols.join(',')
  })}`;

export const convertCurrencies = (queryParams: ConvertCurrenciesQueryParams) =>
  `${apiURL}/convert?${new URLSearchParams(queryParams)}`;

export const historicalCurrencies = ({
  base = SupportedCurrencies.EUR,
  symbols = [SupportedCurrencies.CHF, SupportedCurrencies.USD],
  ...otherParams
}: HistoricalCurrenciesQueryParams) =>
  `${apiURL}/timeseries?${new URLSearchParams({
    ...otherParams,
    base,
    symbols: symbols.join(',')
  })}`;
