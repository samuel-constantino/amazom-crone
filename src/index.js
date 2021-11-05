const express = require('express');
require('dotenv').config()

const app = express();

app.get('/ping', (_req, res) => res.status(200).json({message: 'pong'}))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));