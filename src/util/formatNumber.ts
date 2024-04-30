import { z } from "@builder.io/qwik-city";

export function formatNumber(value: number, locale: string, options?: Intl.NumberFormatOptions): string {
    return new Intl.NumberFormat(locale, options).format(value);
  }

export function formatedNumber(value: number) {
    const options: Intl.NumberFormatOptions = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      };
    return formatNumber(value, 'en-US', options);
}
export const FormattedNumberSchema = z.number().transform((value) => {
  return Number(value.toFixed(2));
});
