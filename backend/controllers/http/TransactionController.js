const Transaction = require('../../models/transaction');
const User = require('../../models/user');
const Validator = require('validatorjs');

class TransactionController {
    async list(req, res) {
        var transactions = await Transaction.find(req.body).populate('uid').populate('merchant');
        res.send({
            'status': 'success',
            'message': 'Query success',
            'data': {
                'transactions': transactions,
            },
        });
    }

    async get(req, res) {
        var data = req.body;
        var transaction = await Transaction.findById(data.id);
        res.send({
            'status': 'success',
            'message': 'Query success',
            'data': transaction,
        });
    }

    async create(data, res) {
        let rules = {
            uid: 'required|string',
            paymentMethod: 'required|string',
            merchant: 'required|string',
            amount: 'required|numeric',
            items: 'required|array',
            status: 'required',
        };
        let validation = new Validator(data, rules);
        if (validation.fails()) {
            throw Error(JSON.stringify(validation.errors.errors));
        }

        var transaction = new Transaction({
            uid: data.uid,
            paymentMethod: data.paymentMethod,
            merchant: data.merchant,
            amount: data.amount,
            items: data.items,
            ref: Math.floor(100000000000 + Math.random() * 900000000000),
            status: data.status,
        });

        await transaction.save();

        return transaction;
    }
}

module.exports = new TransactionController();