# Backend Project

Project made with NodeJs and Express.

It's main porpuse is to connect with ML Api and reconstruct some objetcs to use in the Frontend project.

**ML Api = Mercado Libre API.**

**By default, this api runs on port 3001.**

## Install

Use the package manager [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) to install project dependencies.

```bash
npm i
```
or
```bash
yarn install
```

## Run

After installing all project dependencies, you need to start the api server.

For this, you could simple run:

With npm
```bash
npm start
```
Or with yarn
```bash
yarn start
```
## Usage

This api uses 4 ML Api routes to search for products and get its details.

You should see a list with available routes and their description bellow.

## Routes

### List items

`GET /api/items`

#### Params:
- q - This is the query for search in ML Api.

#### Response:
- author: This object is present on all routes and returns the author of this API.
- categories: Return an Array of strings with the search categories provided by ML Api.
- items: Returns an Array of objects with the first 4 items received by ML Api.

*You will see all objects samples later on this doc.*

#### Example

`GET /api/items?q=ipod`

### Response
    {
      "author": {...},
      "categories": [...],
      "items": [...]
    }

### Get product details

`GET /api/items/:id`

#### Params:
- id - The id of the product you want in ML Api.

#### Response:
- author: This object is present on all routes and returns the author of this API.
- item: Returns a object with item details received by ML Api.

*You will see all objects samples later on this doc.*

#### Example

`GET /api/items/MLA935826998`

### Response
```
{
  "author": {...},
  "item": {...}
}
```

## Response Objects
Here you should see every object returned in all routes on this api with field description.


### author
**Provided by all routes.**
#### fields:
- name: Returns the first name of the author of this api.
- lastname: Returns the last name of the author of this api.

*It will never change, and the first name and lastname should aways be Kleber Canedo.*
#### example:
```
{
  name: "Kleber",
  lastname: "Canedo"
}
```
---
### categories
**Provided by ***/items*** and it`s inside item object of ***/items/:id***.**
#### As this is and array, it haves no fields, just a simple list of strings.

#### example:
```
[
    "Electrónica, Audio y Video",
    "Audio",
    "Audio Portátil y Accesorios",
    "Reproductores Portátiles"
]
```
---
### items
**Provided by ***/items***.**
#### fields:
- id (String): Product ID in ML Api.
- title (String): Product title.
- price (Object): Product prices object.
- seller_state (String): Address state from where the product was announced.
- thumbnail_id (String): The image ID of the product.
- picture (String): Thumbnail url of the product.
- condition (String): Product conditions, such as "new" or "used".
- free_shipping (Boolean): Returns if true if this product offers free shipping.
- link (String): Link of the product in MLA website.

#### example:
```
{
    "id": "...",
    "title": "...",
    "price": {
        "amount": 1234.56,
        "decimals": 56,
        "currency": "USD"
    },
    "seller_state": "...",
    "thumbnail_id": "...",
    "picture": "...",
    "condition": "...",
    "free_shipping": true,
    "link": "..."
}
```
---
### price
**Provided inside item object of ***/items*** and ***/items/:id***.**
#### fields:
- amount (Int): Item full price.
- decimals (Int): Item price cents.
- currency (String): Currecy ID of the amount returned.
#### example:
```
{
  "amount": 1234,
  "decimals": 56,
  "currency": "USD"
}
```
---
### item
**Provided by ***/items/:id***.**
#### fields:
- id (String): Product ID in ML Api.
- title (String): Product title.
- price (Object): Product prices object.
- categories (Array<String>): List of all product categories in ML Api.
- link (String): Link of the product in MLA website.
- picture (String): Thumbnail url of the product.
- thumbnail_id (String): The image ID of the product.
- condition (String): Product conditions, such as "new" or "used".
- free_shipping (Boolean): Returns if true if this product offers free shipping.
- sold_quantity (Int): Product sold quantity.
- description (String): Product description.

#### example:
```
{
  "id": "...",
  "title": "...",
  "price": {
    "currency": "USD",
    "amount": 1234.56,
    "decimals": 56
  },
  "categories": [...],
  "link": "...",
  "picture": "...",
  "thumbnail_id": "...",
  "condition": "...",
  "free_shipping": false,
  "sold_quantity": 0,
  "description": "..."
}
```

## Developer
**This project was developed by [Kleber Fernando](https://www.linkedin.com/in/kleber-fernando/) as a test for Mercado Libre.**