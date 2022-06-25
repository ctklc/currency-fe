import Container from '@mui/material/Container';
import { useMemo } from 'react';
import Converter from './converter';
import HistoricalChart from './historicalChart';
import {
  SupportedCurrencies,
  SupportedCurrencyShorts
} from '../../shared/types';

export default function CurrencyDashboard() {
  const supportedCurrencies = useMemo(
    () => Object.values(SupportedCurrencies) as SupportedCurrencyShorts[],
    [SupportedCurrencies]
  );

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 3, display: 'flex', flexDirection: 'column', gap: 4 }}
    >
      <Converter supportedCurrencies={supportedCurrencies} />
      <HistoricalChart supportedCurrencies={supportedCurrencies} />
    </Container>
  );
}
