const path = require('path');
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');
const md5 = require('md5');

const { Image, Comment } = require('../models');

const controller = {};

controller.index = async (req, res) => {
    const viewModel = { image: {}, comments: {} };

    /* ===
    doing a query to db using regex(regular expresions)
    === */
    const image = await Image.findOne({ filename: { $regex: req.params.image_id } });
    
    if(image) {
        // update the number of view in image
        image.views = image.views + 1;
        viewModel.image = image;
        await image.save();

        // get comments from bd
        const comments = await Comment.find({ image_id: image._id });
        viewModel.comments = comments;
        res.render('image', viewModel);
    } else {
        res.redirect('/');
    }
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

controller.like = async (req, res) => {
    const image = await Image.findOne({ filename: { $regex: req.params.image_id } });

    if(image) {
        image.likes =  image.likes + 1;
        await image.save();
        res.json({ likes: image.likes });
    } else {
        res.status(500).json({ error: 'Internal Error' });
    }
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
    } else {
        res.redirect('/');
    }
};

controller.delete = async (req, res) => {
    const image =  await Image.findOne({ filename: { $regex: req.params.image_id } });
    if(image) {
        // remove the image from the path
        await fs.unlink(path.resolve('./src/public/upload/' + image.filename));
        // remove the comments from the image
        await Comment.deleteOne({ image_id: image.id });
        // remove the image from file
        await image.remove();

        res.json(true);
    }
};

module.exports = controller;