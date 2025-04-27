// Add this helper at the top (after imports)
export function formatMoney(
  amount: number,
  locale = 'en-NG',
  currency = 'NGN'
) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount)
}
