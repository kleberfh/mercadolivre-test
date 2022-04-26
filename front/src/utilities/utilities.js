export const convertIntToMoney = (value, currency) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency,
  }).format(value / 100);

export const convertFloatToCents = (value) =>
  Number(value.toFixed(2).toString().replace('.', ''));