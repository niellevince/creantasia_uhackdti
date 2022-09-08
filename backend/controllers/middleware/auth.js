const jwt = require('jsonwebtoken');
const Auth = require('../../models/auth');
const auth = async (req, res, next) => {
    var token;
    if (req.cookies.jwt != null) {
        token = req.cookies.jwt;
    } else {
        token = (req.header('Authorization') ?? '').replace('Bearer ', '');
    }
    try {
        var data = jwt.verify(token, process.env.APP_KEY);
        req.auth = await Auth.findById(data.auth);
        if (req.auth == null) {
            return res.send({
                'status': 'unauthorized',
                'message': 'Session expired.',
            });
        }
        next()
    } catch (err) {
        res.clearCookie("jwt");
        return res.send({
            'status': 'unauthorized',
            'message': 'Access denied.',
        });
    }

}

module.exports = auth;