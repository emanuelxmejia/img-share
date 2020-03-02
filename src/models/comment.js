const { Schema, model } = require('mongoose');
const ObjectId = Schema.ObjectId;

const CommentSchema = new Schema({
    image_id: { type: ObjectId },
    name: { type: String },
    email: { type: String },
    comment: { type: String },
    gravatar: { type: String },
    timeStamp: { type: Date, default: Date.now },
});

module.exports = model('Comment', CommentSchema)