const axios = require('axios');

const mercadolibre = axios.create({
  baseURL: `https://api.mercadolibre.com/`
})

const getItem = (id) => mercadolibre.get(`items/${id}`);

const searchItems = (query) => mercadolibre.get(`sites/MLA/search?q=${query}`);

const getItemDescription = (id) => mercadolibre.get(`items/${id}/description`);

module.exports = {
  getItem,
  searchItems,
  getItemDescription
};