const express = require('express');
require('dotenv').config()

const { userRouter, productRouter } = require('./routes');

const app = express();

app.use(express.json());

app.use('/user', userRouter);

app.use('/category', categoryRouter);

app.use('/product', productRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));