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

    // DTI
    var auth = new Auth({
        email: 'dti@gmail.com',
        role: 'office',
        password: bcrypt.hashSync('$UHack2022', 10),
    });
    await auth.save();
    var user = new User({
        _id: auth._id,
        firstname: 'Department of',
        lastname: 'Trade and Industry',
        avatar: 'http://www.officialgazette.gov.ph/images/uploads/logo-DTI.png',
    })
    await user.save()

    // Barangay
    var auth = new Auth({
        email: 'barangay@gmail.com',
        role: 'office',
        password: bcrypt.hashSync('$UHack2022', 10),
    });
    await auth.save();
    var user = new User({
        _id: auth._id,
        firstname: 'City',
        lastname: 'Hall',
        avatar: 'https://sf.gov/sites/default/files/styles/default/public/2021-06/pink%20over%20city%20hall_sergio%20ruiz.jpg?itok=9VkWJOBR',
    })
    await user.save()

    // City Hall
    var auth = new Auth({
        email: 'cityhall@gmail.com',
        role: 'office',
        password: bcrypt.hashSync('$UHack2022', 10),
    });
    await auth.save();
    var user = new User({
        _id: auth._id,
        firstname: 'City',
        lastname: 'Hall',
        avatar: 'https://sf.gov/sites/default/files/styles/default/public/2021-06/pink%20over%20city%20hall_sergio%20ruiz.jpg?itok=9VkWJOBR',
    })
    await user.save()

    // BIR
    var auth = new Auth({
        email: 'bir@gmail.com',
        role: 'office',
        password: bcrypt.hashSync('$UHack2022', 10),
    });
    await auth.save();
    var user = new User({
        _id: auth._id,
        firstname: 'Bureau of',
        lastname: 'Internal Revenue',
        avatar: 'https://www.yugatech.com/wp-content/uploads/2020/03/bir_logo.jpg',
    })
    await user.save()

    // RDO
    var auth = new Auth({
        email: 'rdo@gmail.com',
        role: 'office',
        password: bcrypt.hashSync('$UHack2022', 10),
    });
    await auth.save();
    var user = new User({
        _id: auth._id,
        firstname: 'Revenue District',
        lastname: 'Office',
        avatar: 'http://www.officialgazette.gov.ph/images/uploads/logo-DTI.png',
    })
    await user.save()

    console.log('User migration successful.')
    process.exit()
})