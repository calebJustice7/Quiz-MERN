const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        let token = req.headers['authorization'].split(' ')[2];
        const decoded = jwt.verify(token, process.env.APP_SECRET);
        req.userData = decoded;
        next();
    } catch (er) {
        return res.status(401).json({ "message": "Not authorized" });
    }
}