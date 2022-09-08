const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Auth = require('../../models/auth');
const User = require('../../models/user');
const Validator = require('validatorjs');

class AuthController {
    async login(req, res) {
        const data = req.body;

        let rules = {
            email: 'required_without:mobile',
            mobile: 'required_without:email',
            country_code: 'required_with:mobile',
            password: 'required',
        };

        let validation = new Validator(data, rules);

        if (validation.fails()) {
            return res.send({
                'status': 'validation_error',
                'message': 'Some fields are missing',
                'data': validation.errors.errors,
            })
        }

        var auth = null;

        if (data.email != null) {
            console.log('Finding email...');
            auth = await Auth.findOne({ email: data.email }).select('+password');
        } else if (data.mobile != null) {
            console.log('Finding mobile...');
            auth = await Auth.findOne({
                'mobile.cc': data.country_code.toString(),
                'mobile.m': data.mobile.toString(),
            }).select('+password');
        }

        console.log(auth);

        if (auth == null) {
            return res.send({
                'status': 'failed',
                'message': 'We can\'t find an account associated with this credential.'
            });
        }

        if (!await bcrypt.compare(data.password, auth.password)) {
            return res.send({
                'status': 'failed',
                'message': 'Credentials are incorrect.'
            });
        }

        const token = jwt.sign({ auth: auth.id.toString() }, process.env.APP_KEY, {
            expiresIn: '30d'
        });

        res.cookie("jwt", token, {
            secure: process.env.APP_ENV !== "development",
            httpOnly: true,
            sameSite: 'strict'
        });

        res.send({
            'status': 'success',
            'message': 'Login success',
            'data': {
                'token': token,
                'auth': auth,
            },
        });
    }

    async registerWithEmail(req, res) {
        const data = req.body;

        let rules = {
            email: 'required|email',
            password: 'required',
        };

        let validation = new Validator(data, rules);

        if (validation.fails()) {
            return res.send({
                'status': 'validation_error',
                'message': 'Some fields are missing',
                'data': validation.errors.errors,
            })
        }

        var existingAuth = await Auth.find({ email: data.email });
        if (existingAuth.length != 0) {
            return res.send({
                'status': 'failed',
                'message': 'This email is already being used by another account',
            });
        }

        var auth = new Auth({
            email: data.email,
            password: bcrypt.hashSync(data.password, 10),
        });

        await auth.save()

        const token = jwt.sign({ auth: auth.id }, process.env.APP_KEY, {
            expiresIn: '30d'
        });

        res.cookie("jwt", token, {
            secure: process.env.APP_ENV !== "development",
            httpOnly: true,
            sameSite: 'strict'
        });

        res.send({
            'status': 'success',
            'message': 'Registered successfully.',
            'data': {
                'auth': auth,
                'token': token,
            },
        });
    }

    async logout(req, res) {
        res.clearCookie('jwt');
        res.send({
            'status': 'success',
            'message': 'Logout success',
        });
    }

    async refresh(req, res) {
        res.json({
            'status': 'verified',
            'message': 'Access granted.',
            'data': req.auth
        });
    }
}

module.exports = new AuthController();