// a controller is a object with functions

const controller = {};

controller.index = (req, res) => {
    res.send('Index page');
};

module.exports = controller;