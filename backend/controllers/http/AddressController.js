const Address = require('../../models/address');

class AddessController {
    async list(req, res) {
        var data = req.body;
        var get = data.get;
        delete data.get;
        var addresses = await Address.aggregate([
            {
                $match: data
            },
            {
                $group: {
                    _id: `$${get}`,
                }
            },
            { $sort: { _id: 1 } }
        ])

        var newAddresses = [];

        for (var i of addresses) {
            newAddresses.push(i._id);
        }

        res.send({
            'status': 'success',
            'message': 'Query success',
            'data': {
                'addresses': newAddresses,
            },
        });
    }
}

module.exports = new AddessController();