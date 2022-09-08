const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    uid: String,
    // Owner Contact
    ownerNumber: String,
    ownerEmail: String,
    // Owner Details
    ownerFirstName: String,
    ownerMiddleName: String,
    ownerLastName: String,
    ownerSuffix: String,
    ownerFullName: String,
    ownerCitizenShip: String,
    ownerStateless: Boolean,
    ownerRefugee: Boolean,
    ownerDateOfBirth: Date,
    ownerCivilStatus: String,
    ownerGender: String,
    // Business Details
    name: String,
    nature: String,
    scope: String,
    region: String,
    province: String,
    city: String,
    barangay: String,
    // DTI Payment Fee
    dtiFee: String,
    dtiCertificateOfRegistration: String,
    dtiApprovedDate: Date,
    dtiSchedule: String,
    dtiNotes: String,
    // Barangay
    firstId: Array,
    secondId: Array,
    proofOfAddress: Array,
    barangayBusinessApplicationForm: Array,
    barangayBusinessApplicationFee: String,
    barangayBusinessClearance: String,
    barangayApprovedDate: Date,
    barangaySchedule: String,
    barangayNotes: String,
    // Mayors
    mayorsPermitApplicationForm: Array,
    mayorsPermitFee: String,
    mayorsPermit: String,
    mayorsApprovedDate: Date,
    mayorsSchedule: String,
    mayorsNotes: String,
    // RDO
    birForm101: Array,
    rdoOtherRequirements: Array,
    rdoRegistrationFee: String,
    rdoCertificateOfRegistration: String,
    rdoApprovedDate: Date,
    rdoNotes: String,
    rdoSchedule: String,

    status: String,
}, { timestamps: true, collection: 'lgu_businesses' });

schema.virtual('id').get(function () {
    return this._id.toHexString();
});

schema.pre('save', function (next) {
    this.ownerFullName = `${this.ownerFirstName} ${this.ownerMiddleName} ${this.ownerLastName}`;
    next();
});


schema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
    }
});

const model = mongoose.model('Business', schema);

module.exports = model;