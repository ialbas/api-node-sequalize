'use strict'
const faker = require('faker')
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Posts', [{
      id: faker.random.uuid(),
      title: faker.lorem.word(1).substring(0, 9),
      description: faker.lorem.words(15),
      tags: faker.random.arrayElement(['valid_tag_one', 'valid_tag_two', 'valid_tag_three', 'valid_tag_four', 'valid_tag_five']),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Posts', null, {})
  }
}
