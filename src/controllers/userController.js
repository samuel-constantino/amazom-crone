const rescue = require('express-rescue');

const userController = rescue(async (req, res) => {
    res.status(200).json({message: 'userController OK'});
});

module.exports = userController;