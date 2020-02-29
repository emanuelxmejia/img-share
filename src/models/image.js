const mongoose = require('mongoose');
const { Schema } = mongoose;
const path = require('path');

const ImageSchema = new Schema({
    title: { type: String },
    description: { type: String },
    filename: { type: String },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    timeStamp: { type: Date, default: Date.now }
});

/* ===
Creating a virtual variable, is not gonna save it into database
'uniqueId' is gonna remove the extension to filename and
is gonna get only the file name without extension
=== */
ImageSchema.virtual('uniqueId')
    .get(() => {
        return this.filename.replace(path.extname(this.filename), '')
    });

// creating the model 'image' from 'imageSchema'
module.exports = mongoose.model('Image', ImageSchema);