import { useQuery } from 'react-query';
import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  SupportedCurrencies,
  SupportedCurrencyShorts
} from '../../../shared/types';
import { getHistoricalCurrencies } from '../../../api';
import {
  HistoricalCurrenciesQueryParams,
  HistoricalCurrenciesResponse
} from '../../../api/types';
import { formatDate } from '../../../shared/helpers';
import RatesChart from './ratesChart';
import { defaultBase, defaultSymbols } from '../../../api/config';

type HistoricalChartProps = {
  base?: SupportedCurrencies;
  supportedCurrencies: SupportedCurrencyShorts[];
};

export default function HistoricalChart({
  base = defaultBase,
  supportedCurrencies
}: HistoricalChartProps) {
  const supportedCurrenciesWithoutBase = useMemo(
    () => supportedCurrencies.filter((value) => value !== defaultBase),
    [supportedCurrencies]
  );
  const [selectedCurrencies, setSelectedCurrencies] = useState<
    SupportedCurrencyShorts[]
  >([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { isLoading, data, refetch } = useQuery<HistoricalCurrenciesResponse>(
    [
      'getHistoricalCurrencies',
      {
        base,
        symbols: selectedCurrencies.length ? selectedCurrencies : undefined,
        startDate: formatDate(startDate),
        endDate: formatDate(endDate)
      }
    ],
    ({ queryKey }) =>
      getHistoricalCurrencies(queryKey[1] as HistoricalCurrenciesQueryParams),
    { enabled: false }
  );

  const handleFetchRates = () => {
    if (startDate && endDate) refetch();
  };

  const handleCurrencySelect = ({
    target: { value }
  }: SelectChangeEvent<SupportedCurrencyShorts[]>) => {
    setSelectedCurrencies(
      typeof value === 'string'
        ? (value.split(',') as SupportedCurrencyShorts[])
        : value
    );
  };

  return (
    <Box
      sx={{
        gap: 2,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
        <Select<SupportedCurrencyShorts[]>
          size="small"
          multiple
          displayEmpty
          value={selectedCurrencies}
          onChange={handleCurrencySelect}
          input={<OutlinedInput size="small" />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return (
                <em style={{ color: '#ababab' }}>
                  {defaultSymbols.join(', ')}
                </em>
              );
            }

            return (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip size="small" key={value} label={value} />
                ))}
              </Box>
            );
          }}
          sx={{ minWidth: 230 }}
        >
          {supportedCurrenciesWithoutBase.map((currency) => (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </Select>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            disableFuture
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => <TextField {...params} size="small" />}
            disabled={isLoading}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            disableFuture
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => <TextField {...params} size="small" />}
            disabled={isLoading}
            shouldDisableDate={(day) => !!startDate && day <= startDate}
          />
        </LocalizationProvider>
        <LoadingButton loading={isLoading} onClick={handleFetchRates}>
          Show Historical Rates
        </LoadingButton>
      </Box>
      <RatesChart data={data} />
    </Box>
  );
}
