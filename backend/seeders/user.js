require('dotenv').config();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
var User = require('../models/user');
var Auth = require('../models/auth');
console.log('Running user migrations...');

console.log(__filename)

const dbUri = process.env.MONGODB_URI;
mongoose.connect(dbUri, async (err) => {
    if (err != null) return console.error(err);

    var auth = new Auth({
        email: 'niellevince@gmail.com',
        password: bcrypt.hashSync('$Nartel650', 10),
        mobile: { c: '+63', m: '9608903107' },
    });
    await auth.save();

    var user = new User({
        _id: auth._id,
        firstname: 'Core',
        middlename: 'Vince',
        lastname: 'User',
        avatar: 'https://faces-img.xcdn.link/image-lorem-face-5968.jpg',
    })
    await user.save()

    console.log(auth, user);

    console.log('User migration successful.')
    process.exit()
})