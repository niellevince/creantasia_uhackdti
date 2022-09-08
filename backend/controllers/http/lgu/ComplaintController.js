const Complaint = require('../../../models/lgu/complaint');

class AddessController {
    async list(req, res) {
        var data = req.body;
        var complaints = await Complaint.find(data);
        res.send({
            'status': 'success',
            'message': 'Query success',
            'data': {
                'complaints': complaints,
            },
        });
    }

    async create(req, res) {
        var data = req.body;

        let rules = {
            email: 'required',
            mobile: 'required',
            category: 'required',
            subject: 'required',
            message: 'required',
            files: 'required',
        };

        let validation = new Validator(data, rules);

        if (validation.fails()) {
            return res.send({
                'status': 'validation_error',
                'message': 'Some fields are missing',
                'data': validation.errors.errors,
            })
        }

        var complaint = new Complaint({

        });
        await complaint.save();

        res.send({
            'status': 'success',
            'message': 'Complaint submitted',
            'data': complaint,
        })
    }
}

module.exports = new AddessController();