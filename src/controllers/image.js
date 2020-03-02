const path = require('path');
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');
const md5 = require('md5');

const { Image, Comment } = require('../models');

const controller = {};

controller.index = async (req, res) => {
    console.log('params: ', req.params.image_id);

    /* ===
    doing a query to db using regex(regular expresions)
    === */
    const image = await Image.findOne({ filename: { $regex: req.params.image_id } });
    console.log(image);
    res.render('image', { image });
};

controller.create = (req, res) => {

    const saveImage = async () => {
        const imgUrl = randomNumber();

        // query to db
        const images = await Image.find({ filename: imgUrl });

        if (images.length > 0) {
            saveImage();
        } else {
            console.log(imgUrl);

            // get the image path
            const imgTempPath = req.file.path;

            // get image extension (example: png, jpg, jpge, etc...)
            const ext = path.extname(req.file.originalname).toLocaleLowerCase();

            // path where the images are gonna save them
            const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);

            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                // moving the file from a path to another one
                await fs.rename(imgTempPath, targetPath);
                // creating a new object to save a new image into db
                const newImg = new Image({
                    title: req.body.title,
                    filename: imgUrl + ext,
                    description: req.body.description,
                });
                const imageSaved = await newImg.save();
                
                res.redirect('/images/' + imgUrl);
            } else {
                await fs.unlink(imgTempPath);
                res.status(500).json({ error: 'Only images are allowed' });
            }
        }
    };

    saveImage();
};

controller.like = (req, res) => {

};

controller.comment = async (req, res) => {
    const image = await Image.findOne({ filename: { $regex: req.params.image_id }});

    if(image) {
        const newComment = new Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = image._id;
        console.log(newComment);
        await newComment.save();
        res.redirect('/images/' + image.uniqueId);
    }
};

controller.delete = (req, res) => {

};

module.exports = controller;