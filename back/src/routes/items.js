const express = require('express');
const router = express.Router();
const get = require('lodash/get');
const map = require('lodash/map');
const find = require('lodash/find');
const slice = require('lodash/slice');
const {
  getAuthor,
  getItemDecimals,
  getItemCondition
} = require("../utilities/utilities");
const {
  getItem,
  searchItems,
  getItemDescription
} = require("../services/mercadolibre");

router.get('/', function(req, res, next) {
  const query = get(req, 'query.q', null);
  if (!query) {
    res.status(400).send('Query needed for search items.');
  } else {
    searchItems(query)
      .then(({ data }) => {
        // Get and filter all categories values
        const categories = find(get(data, 'available_filters', null), ['id', 'category']);
        const categoriesValues = map(get(categories, 'values', []), 'name');

        // Construct each item in result items
        const items = slice(get(data, 'results', []), 0, 4).map(item => {

          // Get item attributes
          const attributes = get(item, 'attributes', []);

          // Get price
          const price = get(item, 'price', null);

          // Return new item
          return {
            "id": get(item, 'id', null),
            "title": get(item, 'title', null),
            "price":{
              "amount": price,
              "decimals": getItemDecimals(price),
              "currency": get(item, 'currency_id', null)
            },
            "seller_state": get(item, 'seller_address.state.name', null),
            "picture": get(item, 'thumbnail', null),
            "condition": getItemCondition(attributes),
            "free_shipping": get(item, 'shipping.free_shipping', false),
            "link": get(item, 'permalink', null)
          };
        });

        // Construct and send response
        res.json({
          author: getAuthor(),
          categories: categoriesValues,
          items,
        })
      })
      .catch(error => {
        res.status(500).send(error);
      });
  }
});

router.get('/:id', async function(req, res, next) {
  const id = get(req, 'params.id', null);
  try {
    // Fetch item from api
    const item = get(await getItem(id), 'data', null);

    // Fetch item description from api
    const description = get(await getItemDescription(id), 'data', null);

    // Get item price
    const price = get(item, 'price', null);

    // Construct and send response
    res.json({
      author: getAuthor(),
      item: {
        "id": get(item, 'id', null),
        "title": get(item, 'title', null),
        "price":{
          "currency": get(item, 'currency_id', null),
          "amount": price,
          "decimals": getItemDecimals(price)
        },
        "picture": get(item, 'secure_thumbnail', null),
        "condition": getItemCondition(get(item, 'attributes', null)),
        "free_shipping": get(item, 'shipping.free_shipping', false),
        "sold_quantity": get(item, 'sold_quantity', null),
        "description": get(description, 'plain_text', null)
      },
    })
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;