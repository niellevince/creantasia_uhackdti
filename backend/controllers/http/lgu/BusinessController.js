const Business = require('../../../models/lgu/business');
const User = require('../../../models/user');
const Validator = require('validatorjs');
const TransactionController = require('../TransactionController');

class BusinessController {
    async list(req, res) {
        console.log(req.body.status)
        var businesses = await Business.find(req.body);
        res.send({
            'status': 'success',
            'message': 'Query success',
            'data': {
                'businesses': businesses,
            },
        });
    }

    async get(req, res) {
        var data = req.body;
        var business = await Business.findById(data.id);
        res.send({
            'status': 'success',
            'message': 'Query success',
            'data': business,
        });
    }

    async add(req, res) {
        var user = await User.findById(req.auth.id);

        var business = new Business({
            uid: req.auth.id,
            ownerEmail: req.auth.email,
            ownerFirstName: user.firstname,
            ownerMiddleName: user.middlename,
            ownerFullName: `${user.firstname} ${user.lastname}`,
            ownerLastName: user.lastname,
        });

        await business.save();

        res.send({
            'status': 'success',
            'message': 'Business created successfully.',
            'data': business,
        });
    }

    async save(req, res) {
        var data = req.body;
        let rules = {
            id: 'required',
        };

        let validation = new Validator(data, rules);

        if (validation.fails()) {
            return res.send({
                'status': 'validation_error',
                'message': 'Some fields are missing',
                'data': validation.errors.errors,
            })
        }

        var business = await Business.findByIdAndUpdate(data.id, data);

        res.send({
            'status': 'success',
            'message': 'Saved business form successfully.',
            'data': business,
        });
    }

    async payFee(req, res) {
        var data = req.body;
        let rules = {
            id: 'required',
            paymentMethod: 'required',
            field: 'required',
            merchant: 'required',
            items: 'required|array',
            total: 'required|numeric',
            status: 'required',
        };

        let validation = new Validator(data, rules);

        if (validation.fails()) {
            return res.send({
                'status': 'validation_error',
                'message': 'Some fields are missing',
                'data': validation.errors.errors,
            })
        }

        var merchant = await User.findById(data.merchant);
        if (merchant == null) {
            return res.send({
                'status': 'failed',
                'message': 'This merchant is not available.',
            })
        }

        var transaction = await TransactionController.create({
            uid: req.auth.id,
            paymentMethod: data.paymentMethod,
            merchant: data.merchant,
            items: data.items,
            amount: data.total,
            status: 'complete',
        });

        var fee = {};
        fee[data.field] = transaction.ref;
        var status = data.status;

        var business = await Business.findByIdAndUpdate(data.id, {
            ...fee,
            status: status, // 1 Draft, 2 Pending for DTI Approval, 2 Approved by DTI, 3 Pending for Barangay Approval
        });

        console.log(fee);


        res.send({
            'status': 'success',
            'message': 'Payment Successful.',
            'data': business,
        });
    }
}

module.exports = new BusinessController();