const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    uid: String,
    email: String,
    mobile: String,
    category: String,
    subject: String,
    message: String,
    files: Array,
    status: String,
}, { timestamps: true, collection: 'lgu_complaints' });

schema.virtual('id').get(function () {
    return this._id.toHexString();
});

schema.virtual('user', {
    ref: 'User',
    localField: 'uid',
    foreignField: '_id',
    justOne: true
});

schema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
    }
});

const model = mongoose.model('Complaints', schema);

module.exports = model;