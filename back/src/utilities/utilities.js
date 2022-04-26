const get = require("lodash/get");
const find = require("lodash/find");

// Static author object
const getAuthor = () => {
  return {
    name: "Kleber",
    lastname: "Canedo"
  }
}

// Fixes split and fixes prices decimals
const getItemDecimals = (price) => {
  const value = price.toString().split('.')[1];
  if (!value) return 0;
  if (value <= 9) {
    return value * 10;
  }
  return value;
}

// Itinerate in attributes to find item condition and get its value
const getItemCondition = (attributes) => get(find(attributes, ['id', 'ITEM_CONDITION']), 'value_name', null);

module.exports = {
  getAuthor,
  getItemDecimals,
  getItemCondition
}