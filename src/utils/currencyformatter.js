// create currencyFormatter for en-EG

export const currencyFormatter = new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: 'EGP',
    minimumFractionDigits: 2
})