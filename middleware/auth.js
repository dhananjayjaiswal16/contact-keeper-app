const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async function (req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        res.json({ msg: "Authorisation denied" });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;

        next();
    } catch (error) {
        res.json({ msg: "Invalid Token " })
    }
}
