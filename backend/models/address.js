const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    region: String,
    province: String,
    city: String,
    barangay: String,
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

const model = mongoose.model('Address', schema);

module.exports = model;