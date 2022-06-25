import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ChangeEvent, useState } from 'react';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import LoadingButton from '@mui/lab/LoadingButton';
import { useQuery } from 'react-query';
import RefreshOutlined from '@mui/icons-material/RefreshOutlined';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import { format } from 'date-fns';
import ArrowRightAltOutlined from '@mui/icons-material/ArrowRightAltOutlined';
import { CurrencyInput, SupportedCurrencies } from '../../../shared/types';
import {
  ConvertCurrenciesQueryParams,
  ConvertCurrenciesResponse
} from '../../../api/types';
import { getConvertCurrencies } from '../../../api';
import { readablePriceWithoutSymbol } from '../../../shared/helpers';
import { defaultBase, defaultSymbols } from '../../../api/config';

export type ConverterProps = {
  supportedCurrencies: Array<keyof typeof SupportedCurrencies>;
};

export default function Converter({ supportedCurrencies }: ConverterProps) {
  const [date, setDate] = useState<Date | null>(null);
  const [fromCurrency, setFromCurrency] = useState<CurrencyInput>({
    currency: defaultBase,
    amount: ''
  });
  const [targetCurrency, setTargetCurrency] = useState<SupportedCurrencies>(
    defaultSymbols[0]
  );
  const { isLoading, data, refetch } = useQuery<ConvertCurrenciesResponse>(
    [
      'getConvertCurrencies',
      {
        amount: fromCurrency.amount,
        from: fromCurrency.currency,
        to: targetCurrency,
        date: date ? format(date, 'yyyy-MM-dd') : undefined
      }
    ],
    ({ queryKey }) =>
      getConvertCurrencies(queryKey[1] as ConvertCurrenciesQueryParams),
    { enabled: false }
  );

  const handleFromCurrencyChange =
    (field: keyof CurrencyInput) =>
    ({
      target: { value }
    }:
      | ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | SelectChangeEvent) =>
      setFromCurrency((prev) => ({
        ...prev,
        [field]: value
      }));

  const handleTargetCurrencyChange = ({
    target: { value }
  }: SelectChangeEvent) => setTargetCurrency(value as SupportedCurrencies);

  const handleConversion = () => {
    if (fromCurrency.amount && fromCurrency.currency && targetCurrency)
      refetch();
  };

  return (
    <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          disableFuture
          label="Historical Rates"
          value={date}
          onChange={(newValue) => setDate(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              inputProps={{
                ...params.inputProps,
                'data-testid': 'ConverterDateInput'
              }}
            />
          )}
          disabled={isLoading}
        />
      </LocalizationProvider>
      <Paper
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 210 }}
      >
        <Select
          value={fromCurrency.currency}
          onChange={handleFromCurrencyChange('currency')}
          size="small"
          sx={{ fontSize: 14, width: 75, height: 35 }}
          disabled={isLoading}
          data-testid="FromCurrencySelect"
        >
          {supportedCurrencies.map((key) => (
            <MenuItem key={key} value={key}>
              {SupportedCurrencies[key]}
            </MenuItem>
          ))}
        </Select>
        <InputBase
          disabled={isLoading}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Amount"
          inputProps={{
            'aria-label': 'Amount',
            'data-testid': 'FromCurrencyInput'
          }}
          value={fromCurrency.amount}
          onChange={handleFromCurrencyChange('amount')}
        />
      </Paper>
      <ArrowRightAltOutlined />
      <Paper
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 210 }}
      >
        <Select
          value={targetCurrency}
          onChange={handleTargetCurrencyChange}
          size="small"
          sx={{ fontSize: 14, width: 75, height: 35 }}
          disabled={isLoading}
          data-testid="TargetCurrencySelect"
        >
          {supportedCurrencies.map((key) => (
            <MenuItem key={key} value={key}>
              {SupportedCurrencies[key]}
            </MenuItem>
          ))}
        </Select>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Amount"
          inputProps={{
            'aria-label': 'Amount',
            'data-testid': 'TargetCurrencyInput'
          }}
          value={data?.result ? readablePriceWithoutSymbol(data.result) : ''}
          disabled
        />
      </Paper>
      <LoadingButton
        loading={isLoading}
        startIcon={<RefreshOutlined />}
        onClick={handleConversion}
        data-testid="ConvertButton"
      >
        Convert
      </LoadingButton>
    </Box>
  );
}
