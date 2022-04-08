const Sequelize = require('sequelize')
const config = require('../database/config/config.json')
const Post = require('./models/Post')

const newConn = (type) => {
  const connection = new Sequelize(config[type])

  Post.init(connection)
  return connection
}

module.exports = newConn
