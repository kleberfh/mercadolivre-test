import {get} from "lodash";

export const convertIntToMoney = (value, currency) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency,
  }).format(value / 100);

export const getProductImage = (thumb_id, picture) => {
  if (!thumb_id) return picture;
  return `https://http2.mlstatic.com/D_${thumb_id}-L.webp`;
}