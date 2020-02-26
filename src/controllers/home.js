// a controller is a object with functions

const controller = {};

controller.index = (req, res) => {
    res.render('index');
};

module.exports = controller;