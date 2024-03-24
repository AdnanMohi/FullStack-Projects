const crpto = require('crypto')
const JWT = require('jsonwebtoken')
const { z } = require('zod')
const { v4: uuidv4 } = require('uuid')

// Define a schema for the user token
const userTokenSchema = z.object({
    _id: z.string(),
    role: z.string()
})

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) throw new Error('JWT_SECRET is required!')

// Define a schema for the signup 
function validateUserSignup(data) {
    const schema = z.object({
        firstName: z.string(),
        lastName: z.string().optional(),
        email: z.string().email(),
        password: z.string().min(3)
    })
    return schema.safeParse(data)
}

// Define a schema for the signin
function validateUserSignin(data) {
    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(3)
    })

    return schema.safeParse(data)
}

// Define a schema for the candidate
function validateCandidate(data) {
    const schema = z.object({
        jobName: z.string(),
        location: z.string(),
        minSalary: z.number(),
        maxSalary: z.number(),
        minExperience: z.number(),
        maxExperience: z.number(),
    })
    return schema.safeParse(data)
}


// Generate a hash for the password
function generatehash(password, salt = uuidv4()) {
    const hash = crpto.createHmac('sha256', salt)
        .update(password)
        .digest('hex');
    return { salt, hash }

}

// Generate a token for the user
function generateUserToken(data) {
    const safeParseResult = userTokenSchema.safeParse(data);
    if (safeParseResult.error) throw new Error(safeParseResult.error)

// Generate a token for the user using the JWT_SECRET
    const token = JWT.sign(JSON.stringify(safeParseResult.data), JWT_SECRET)

    return token
}

// Validate the user token
function validateUserToken(token) {
    try {
        const payload = JWT.verify(token, JWT_SECRET);
        const safeParseResult = userTokenSchema.safeParse(payload);

        if (safeParseResult.error) throw new Error(safeParseResult.error)

        return safeParseResult.data

    } catch (error) {
        return null
    }
}

module.exports = { validateUserSignup, generatehash, generateUserToken, validateUserToken, validateUserSignin, validateCandidate}