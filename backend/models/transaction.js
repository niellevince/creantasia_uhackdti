const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    uid: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    merchant: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    paymentMethod: String,
    amount: Number,
    items: Array,
    ref: String,
    status: String,
}, { timestamps: true });

schema.virtual('id').get(function () {
    return this._id.toHexString();
});

// schema.virtual('user', {
//     ref: 'User',
//     localField: 'uid',
//     foreignField: '_id',
//     justOne: true
// });

// schema.virtual('merchantData', {
//     ref: 'User',
//     localField: 'merchant',
//     foreignField: '_id',
//     justOne: true
// });

schema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
    }
});

const model = mongoose.model('Transaction', schema);

module.exports = model;