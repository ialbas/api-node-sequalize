'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Posts',
      {
        id: {
          type: 'UNIQUEIDENTIFIER',
          defaultValue: Sequelize.literal('NEWID()'),
          primaryKey: true
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false
        },
        tags: {
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
    await queryInterface.dropTable('Posts')
  }
}
