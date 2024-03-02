const express = require('express')
const { handleUserSignup, handleUserSignin } = require('../controllers/auth')

const router = express.Router();

router.post('/signup', handleUserSignup);

router.post('/signin', handleUserSignin);

module.exports = router