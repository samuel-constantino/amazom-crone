const express = require('express');
require('dotenv').config()

const { userRouter } = require('./routes');

const app = express();

app.get('/ping', (_req, res) => res.status(200).json({message: 'pong'}))

app.use('/user', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));