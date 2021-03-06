import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { memo, useCallback } from 'react';
import { HistoricalCurrenciesResponse } from '../../../api/types';
import { randomHexColor } from '../../../shared/helpers';
import {
  SupportedCurrencies,
  SupportedCurrencyShorts
} from '../../../shared/types';

export type RatesChartProps = {
  data?: HistoricalCurrenciesResponse;
};

function RatesChart({ data }: RatesChartProps) {
  const requestedCurrencies = (
    rates: Record<string, Record<SupportedCurrencies, number>>
  ) => Object.keys(Object.values(rates)[0]);

  const generateChartData = useCallback(
    () =>
      data?.rates
        ? Object.entries(data.rates).map(([date, currencyRates]) => ({
            name: date,
            ...(Object.keys(currencyRates) as SupportedCurrencyShorts[]).reduce(
              (prevCurr, curr) => ({
                ...prevCurr,
                [curr]: currencyRates[curr] as number
              }),
              {}
            )
          }))
        : [],
    [data]
  );

  return data ? (
    <ResponsiveContainer width="100%" height="100%" aspect={2}>
      <LineChart data={generateChartData()}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {requestedCurrencies(data.rates).map((curr) => (
          <Line
            key={curr}
            type="monotone"
            dataKey={curr}
            stroke={randomHexColor()}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  ) : null;
}

export default memo(RatesChart);
