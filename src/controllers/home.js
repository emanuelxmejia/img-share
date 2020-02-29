// a controller is a object with functions

const { Image } = require('../models');

const controller = {};

controller.index = async (req, res) => {
    // get the images and order them by create time
    // Ordenar ascendente: 1
    // Ordenar de mayor a menor(desendente): -1
    const images = await Image.find().sort({ timeStamp: -1 });
    res.render('index', { images });
};

module.exports = controller;