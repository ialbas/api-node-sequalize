const { Model, DataTypes } = require('sequelize')

const definitions = {
  title: {
    min: 5,
    max: 10
  },
  description: {
    min: 10,
    max: 100
  }
}
class Post extends Model {
  static init (sequelize) {
    const count = 0
    super.init(
      {
        title: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: '`title` is required'
            },
            isLength: {
              min: definitions.title.min,
              max: definitions.title.max,
              msg: `title has to be between ${definitions.title.min} and ${definitions.title.max} characters long`
            }
          }
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
            notNull: {
              msg: '`description` is required'
            },
            isLength: {
              min: definitions.description.min,
              max: definitions.description.max,
              msg: `description has to be between ${definitions.description.min} and ${definitions.description.max} characters long`
            }
          }
        },
        tags: {
          type: DataTypes.JSON,
          allowNull: true,
          validate: {
            notContains: {
              args: ['invalid_tag', 'invalid_tag_outher'],
              msg: 'There are  any invalid tag'
            },
            customTagValidate (tags) {
              if (tags) {
                if (!Array.isArray(tags)) {
                  throw new Error('the field `tags` has malformed, only array is allowed')
                }
              }
            }
          }
        }
      },
      {
        sequelize,
        validate: {

        }
      })
  }
}

module.exports = Post
