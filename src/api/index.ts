import {
  ConvertCurrenciesQueryParams,
  ConvertCurrenciesResponse,
  HistoricalCurrenciesQueryParams,
  HistoricalCurrenciesResponse
} from './types';
import {
  convertCurrencies,
  fetchWithAuth,
  historicalCurrencies
} from './config';

const responseHandler = (response: Response) => {
  if (response.ok) {
    return response.json();
  }

  throw new Error(response.statusText);
};

export const getConvertCurrencies = (
  queryParams: ConvertCurrenciesQueryParams
): Promise<ConvertCurrenciesResponse> =>
  fetchWithAuth(convertCurrencies(queryParams)).then(responseHandler);

export const getHistoricalCurrencies = (
  queryParams: HistoricalCurrenciesQueryParams
): Promise<HistoricalCurrenciesResponse> =>
  fetchWithAuth(historicalCurrencies(queryParams)).then(responseHandler);
