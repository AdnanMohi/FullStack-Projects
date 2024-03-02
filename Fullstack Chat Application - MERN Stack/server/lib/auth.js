const JWT = require('jsonwebtoken')

const JWT_SECRET = '@superman@batman123abc@xyz'

exports.generateToken = (data) => {
    const payload = JSON.stringify(data)
    const token = JWT.sign(payload, JWT_SECRET)
    return token
}

exports.validateToken = (token) => {
    try {
        const data = JWT.verify(token, JWT_SECRET)
        return data
    } catch (err) {
        console.log(err)
        return null
    }

}