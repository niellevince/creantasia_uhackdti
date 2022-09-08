const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        sparse: true,
    },
    emailVerifiedAt: Date,
    mobile: {
        type: Map,
        trim: true,
        unique: true,
        sparse: true,
    },
    mobileVerifiedAt: Date,
    password: {
        type: String,
        required: true,
        select: false,
        trim: true,
    },
    role: {
        type: String,
        default: 'user',
    },
    permissions: {
        type: Array,
        default: []
    },
    lastActive: Date,
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

const model = mongoose.model('Auth', schema);

module.exports = model;