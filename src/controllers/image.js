const path = require('path');
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');

const controller = {};

controller.index = (req, res) => {

};

controller.create = async (req, res) => {
    const imgUrl = randomNumber();
    console.log(imgUrl);

    // get the image path
    const imgTempPath =  req.file.path;

    // get image extension (example: png, jpg, jpge, etc...)
    const ext = path.extname(req.file.originalname).toLocaleLowerCase();

    // path where the images are gonna save them
    const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);

    if(ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
        // moving the file from a path to another one
        await fs.rename(imgTempPath, targetPath);
    }

    res.send('works');
};

controller.like = (req, res) => {

};

controller.comment = (req, res) => {

};

controller.delete = (req, res) => {

};

module.exports = controller;