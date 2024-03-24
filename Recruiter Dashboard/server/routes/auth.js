const express = require('express');
const controller = require('../controller/auth');

// Create a new router
const router = express.Router();


router.post('/signup', controller.handleSignup)
router.post('/signin', controller.handleSignin)
router.post('/candidate', controller.handleCandidate)
router.get('/candidateData', controller.getCandidates)

module.exports = router;