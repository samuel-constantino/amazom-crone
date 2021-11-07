const express = require('express');
require('dotenv').config()

const logReport = require('./schemas/logReport');

const { userRouter, categoryRouter, productRouter } = require('./routes');

const error = require('./middlewares/error');

const app = express();

app.use(express.json());

app.use('/user', userRouter);

app.use('/category', categoryRouter);

app.use('/product', productRouter);

app.use(error);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logReport('info', 200, `Ouvindo a porta ${PORT}`));