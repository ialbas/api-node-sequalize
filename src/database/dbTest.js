const Sequelize = require('sequelize')
const config = require('./config/config.json')
const Post = require('./models/Post')

const connection = new Sequelize(config.test)

Post.init(connection)

module.exports = connection
