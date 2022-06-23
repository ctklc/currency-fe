import {
  ConvertCurrenciesQueryParams,
  ConvertCurrenciesResponse,
  HistoricalCurrenciesQueryParams,
  HistoricalCurrenciesResponse,
  LatestRatesResponse
} from './types';
import {
  fetchWithAuth,
  latestRates,
  convertCurrencies,
  historicalCurrencies
} from './config';

const responseHandler = (response: Response) => {
  if (response.ok) {
    return response.json();
  }

  throw new Error(response.statusText);
};

export const getLatestRates = (): Promise<LatestRatesResponse> =>
  fetchWithAuth(latestRates()).then(responseHandler);

export const getConvertCurrencies = (
  queryParams: ConvertCurrenciesQueryParams
): Promise<ConvertCurrenciesResponse> =>
  fetchWithAuth(convertCurrencies(queryParams)).then(responseHandler);

export const getHistoricalCurrencies = (
  queryParams: HistoricalCurrenciesQueryParams
): Promise<HistoricalCurrenciesResponse> =>
  fetchWithAuth(historicalCurrencies(queryParams)).then(responseHandler);
