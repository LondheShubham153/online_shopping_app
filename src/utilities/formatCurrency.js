const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency'
});

export function formatCurrency(number) {
    return CURRENCY_FORMATTER.format(number);
}