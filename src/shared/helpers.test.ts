import {
  formatDate,
  randomHexColor,
  readablePriceWithoutSymbol
} from './helpers';

describe('Helpers', () => {
  it('should return proper formatted price according locale', () => {
    const price = 15000.87;

    expect(readablePriceWithoutSymbol(price)).toStrictEqual('15.000,87');
    expect(readablePriceWithoutSymbol(price, 'en-GB')).toStrictEqual(
      '15,000.87'
    );
  });

  it('should return proper formatted date string according to given date', () => {
    const formattedDate = '2022-06-25';

    expect(formatDate(new Date(formattedDate))).toStrictEqual(formattedDate);
    expect(formatDate(new Date(''))).toStrictEqual(undefined);
    expect(formatDate()).toStrictEqual(undefined);
  });

  it('should return a random hex color formatted string', () => {
    expect(randomHexColor()).toHaveLength(7);
  });
});
