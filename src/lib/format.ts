const LOCALE = 'en-IE' // Irish English — uses € symbol naturally

export const fmt = {
  currency: (v: number) =>
    new Intl.NumberFormat(LOCALE, {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(v),

  currencyCompact: (v: number) =>
    new Intl.NumberFormat(LOCALE, {
      style: 'currency',
      currency: 'EUR',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(v),

  currencyMonthly: (v: number) =>
    `${new Intl.NumberFormat(LOCALE, {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(v)}/mo`,

  percent: (v: number) => `${(v * 100).toFixed(1)}%`,
}
