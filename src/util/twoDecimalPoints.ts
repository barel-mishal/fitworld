export function formatToTwoDecimalPoints(input: string | number | undefined) {
    if (input === undefined) return 0.00;
    const num = typeof input === 'string' ? parseFloat(input) : input;
    if (isNaN(num)) return 0.00;
    return parseFloat(num.toFixed(2));
  }

export function formatNumber(input: string | number): string {
    const num = typeof input === 'string' ? parseFloat(input) : input;
    if (isNaN(num)) {
      throw new Error('Invalid input: not a number');
    }
  
    const formatter = new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    });
  
    return formatter.format(num);
  }