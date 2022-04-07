
const express = require('express')
const Post = require('./post')
const Auth = require('./auth')

const router = express.Router()

// LOGIN - Open route
router.use(Auth)

// POST - close routes
router.use(Post)

module.exports = router
