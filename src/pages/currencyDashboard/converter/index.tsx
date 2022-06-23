import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ChangeEvent, useState } from 'react';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import LoadingButton from '@mui/lab/LoadingButton';
import { useQuery } from 'react-query';
import { RefreshOutlined } from '@mui/icons-material';
import { CurrencyInput, SupportedCurrencies } from '../../../shared/types';
import {
  ConvertCurrenciesQueryParams,
  ConvertCurrenciesResponse
} from '../../../api/types';
import { getConvertCurrencies } from '../../../api';
import { readablePriceWithoutSymbol } from '../../../shared/helpers';

export default function Converter() {
  const supportedCurrencies = Object.keys(SupportedCurrencies) as Array<
    keyof typeof SupportedCurrencies
  >;
  const [fromCurrency, setFromCurrency] = useState<CurrencyInput>({
    currency: SupportedCurrencies.EUR,
    amount: ''
  });
  const [targetCurrency, setTargetCurrency] = useState<SupportedCurrencies>(
    SupportedCurrencies.USD
  );
  const { isLoading, data, refetch } = useQuery<ConvertCurrenciesResponse>(
    [
      'getConvertCurrencies',
      {
        amount: fromCurrency.amount,
        from: fromCurrency.currency,
        to: targetCurrency
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
      <Paper
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200 }}
      >
        <Select
          value={fromCurrency.currency}
          onChange={handleFromCurrencyChange('currency')}
          size="small"
          sx={{ fontSize: 12, width: 70, height: 30 }}
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
          inputProps={{ 'aria-label': 'Amount' }}
          value={fromCurrency.amount}
          onChange={handleFromCurrencyChange('amount')}
        />
      </Paper>
      <Paper
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200 }}
      >
        <Select
          value={targetCurrency}
          onChange={handleTargetCurrencyChange}
          size="small"
          sx={{ fontSize: 12, width: 70, height: 30 }}
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
          inputProps={{ 'aria-label': 'Amount' }}
          value={
            data?.result
              ? readablePriceWithoutSymbol(data.result, targetCurrency)
              : ''
          }
          disabled
        />
      </Paper>
      <LoadingButton
        loading={isLoading}
        startIcon={<RefreshOutlined />}
        onClick={handleConversion}
      >
        Convert
      </LoadingButton>
    </Box>
  );
}
