const User = require('../../models/user');
const FileController = require('./FileController');
const Validator = require('validatorjs');

class UserController {
    async currentUser(req, res) {
        var user = await User.findById(req.auth.id);
        if (user == null) user = new User();

        res.send({
            'status': 'success',
            'message': 'Query success',
            'data': {
                ...req.auth.toJSON(),
                ...user.toJSON(),
            }
        });
    }

    async list(req, res) {
        var users = await User.find();
        res.send({
            'status': 'success',
            'message': 'Query success',
            'data': users,
        });
    }

    async get(req, res) {
        var user = await User.findById(req.body.id);
        res.send({
            'status': 'success',
            'message': 'Query success',
            'data': {
                ...req.auth.toJSON(),
                ...user.toJSON()
            }
        });
    }

    async update(req, res) {
        var data = req.body;
        let rules = {
            firstname: 'required',
            lastname: 'required',
        };
        let validation = new Validator(data, rules);

        if (validation.fails()) {
            return res.send({
                'status': 'validation_error',
                'message': 'Some fields are missing',
                'data': validation.errors.errors,
            })
        }

        var user = await User.findByIdAndUpdate(req.auth.id, {
            $set: {
                ...data
            },
        }, { upsert: true });

        var userData = await User.findById(req.auth.id);
        userData.save()

        res.send({
            'status': 'success',
            'message': 'Profiled updated successfully.',
            'data': {
                ...req.auth.toJSON(),
                ...userData.toJSON(),
            }
        });
    }

    async uploadAvatar(req, res) {
        var user = await User.findById(req.auth.id);

        // console.log(user)

        var data = req.files;
        let rules = {
            avatar: 'required',
        };
        let validation = new Validator(data, rules);

        if (validation.fails()) {
            return res.send({
                'status': 'validation_error',
                'message': 'Some fields are missing',
                'data': validation.errors.errors,
            })
        }

        let avatar = req.files.avatar;
        var folder = `/${user.id}/avatars`;
        var file = await FileController.saveFile(avatar, folder, req);
        user.avatar = file.url;
        await user.save()

        res.send({
            'status': 'success',
            'message': 'Uploaded an avatar successfully.',
            'data': {
                ...req.auth.toJSON(),
                ...user.toJSON(),
            }
        })
    }
}

module.exports = new UserController();