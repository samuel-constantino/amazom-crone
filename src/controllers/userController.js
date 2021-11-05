const rescue = require('express-rescue');

const create = rescue(async (req, res) => {
    res.status(200).json({message: 'userController create OK'});
});

const login = rescue(async (req, res) => {
    res.status(200).json({message: 'userController login OK'});
});

const buy = rescue(async (req, res) => {
    res.status(200).json({message: 'userController buy OK'});
});

module.exports = {
    create,
    login,
    buy
};