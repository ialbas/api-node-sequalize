
const express = require('express')
const Post = require('./post')
const Auth = require('./auth')
const User = require('./user')

const router = express.Router()

// LOGIN - Open route
router.use(Auth)

// POST - close routes
router.use(Post)
router.use(User)

module.exports = router
