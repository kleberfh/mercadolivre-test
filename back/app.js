const cors = require('cors');
const express = require('express');

const indexRouter = require('./src/routes/index');
const itemsRouter = require('./src/routes/items');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', indexRouter);
app.use('/api/items', itemsRouter);

module.exports = app;