const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    uid: String,
    type: {
        type: String,
        default: 'file',
    },
    reference: {
        type: String,
        unique: true,
        sparse: true,
    },
    filename: String,
    folder: String,
    path: {
        type: String,
        select: false,
    },
    url: String,
    size: Number,
    mimetype: String,
}, { timestamps: true });

schema.virtual('id').get(function () {
    return this._id.toHexString();
});

schema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;

    }
});

const model = mongoose.model('File', schema);

module.exports = model;