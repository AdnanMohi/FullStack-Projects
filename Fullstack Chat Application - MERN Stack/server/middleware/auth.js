const { validateToken } = require('../lib/auth')

exports.checkForAuthentication = (req, res, next) => {
    const authroizationHeader = req.headers['Authorization'] || req.headers['authorization']


    if (!authroizationHeader) {
        req.user = null;
        return next();
    }

    const token = authroizationHeader.split('Bearer ')[1];


    const userPayload = validateToken(token);



    req.user = userPayload

    return next()

}

exports.ensureAuthenticated = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'You must be authenticated!' })
    }

    return next()
}