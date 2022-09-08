const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    firstname: String,
    middlename: String,
    lastname: String,
    avatar: String,
    data: Map,
}, { timestamps: true });

schema.virtual('id').get(function () {
    return this._id.toHexString();
});

schema.virtual('fullname').get(function () {
    return `${this.firstname} ${this.lastname}`;
});

schema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;

    }
});

schema.post('save', async function (doc) {
});


const model = mongoose.model('User', schema);

module.exports = model;