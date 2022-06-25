import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import Converter, { ConverterProps } from './index';
import {
  SupportedCurrencies,
  SupportedCurrencyShorts
} from '../../../shared/types';

describe('Currency Converter', () => {
  const renderCurrencyConverter = (
    { supportedCurrencies }: ConverterProps = {
      supportedCurrencies: Object.values(
        SupportedCurrencies
      ) as SupportedCurrencyShorts[]
    }
  ) => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          cacheTime: Infinity
        }
      }
    });

    setLogger({
      // eslint-disable-next-line no-console
      log: console.log,
      // eslint-disable-next-line no-console
      warn: console.warn,
      error: () => {}
    });

    return render(
      <QueryClientProvider client={queryClient}>
        <Converter supportedCurrencies={supportedCurrencies} />
      </QueryClientProvider>
    );
  };

  it('should render default components inside the converter', () => {
    // when the component rendered
    renderCurrencyConverter();

    expect(screen.getByTestId('ConverterDateInput')).toBeInTheDocument();
    expect(screen.getByTestId('FromCurrencySelect')).toBeInTheDocument();
    expect(screen.getByTestId('FromCurrencyInput')).toBeInTheDocument();
    expect(screen.getByTestId('TargetCurrencySelect')).toBeInTheDocument();
    expect(screen.getByTestId('TargetCurrencyInput')).toBeInTheDocument();
    expect(screen.getByTestId('ConvertButton')).toBeInTheDocument();
  });
});
