const crypto = require('crypto')
const { generateToken } = require('../lib/auth')
const User = require('../models/user')

exports.handleUserSignup = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password
    } = req.body;

    try {
        const salt = crypto.randomBytes(256).toString('hex')
        const hashedPassword = crypto.createHmac('sha256', salt).update(password).digest('hex');
        const user = await User.create({ firstName, lastName, email, salt, password: hashedPassword })
        return res.json({ status: 'success', data: { _id: user._id } })
    } catch (err) {
        return res.json({ err })
    }

}

exports.handleUserSignin = async (req, res) => {
    const { email, password } = req.body;

    const userInDb = await User.findOne({ email });

    if (!userInDb) {
        return res.status(401).json({ error: 'Incorrect email or password.' });
    }

    const salt = userInDb.salt;
    const passwordInDb = userInDb.password;

    const hashedPassword = crypto.createHmac('sha256', salt).update(password).digest('hex');

    if (hashedPassword !== passwordInDb) {
        return res.status(401).json({ error: 'Incorrect email or password.' });
    }

    const token = generateToken({ _id: userInDb._id, blah: 'stuff' });

    return res.status(200).json({ status: 'success', data: { token } });
};
