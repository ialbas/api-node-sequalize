'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users',
      {
        id: {
          type: 'UNIQUEIDENTIFIER',
          defaultValue: Sequelize.literal('NEWID()'),
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        roles: {
          type: Sequelize.STRING,
          allowNull: true
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: true
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true
        }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users')
  }
}
