require('dotenv').config();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
var Address = require('../models/address');
console.log('Running address migrations...');

console.log(__filename)

const dbUri = process.env.MONGODB_URI;
mongoose.connect(dbUri, async (err) => {
    if (err != null) return console.error(err);

    // Run migration here
    var addresses = require('./data/addresses.json');

    var data = await Address.create(addresses);

    console.log('Address migration successful.');
    process.exit()
})