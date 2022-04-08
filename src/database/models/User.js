const { Model, DataTypes } = require('sequelize')

const definitions = {
  name: {
    min: 4,
    max: 100
  },
  email: {
    min: 6,
    max: 100
  },
  password: {
    min: 6,
    max: 20
  }
}
class User extends Model {
  static init (sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: '`name` is required'
            },
            isLength: {
              min: definitions.name.min,
              max: definitions.name.max,
              msg: `name has to be between ${definitions.name.min} and ${definitions.name.max} characters long`
            }
          }
        },
        email: {
          type: DataTypes.TEXT,
          allowNull: false,
          unique: true,
          validate: {
            notNull: {
              msg: '`email` is required'
            },
            isLength: {
              min: definitions.email.min,
              max: definitions.email.max,
              msg: `email has to be between ${definitions.email.min} and ${definitions.email.max} characters long`
            }
          }
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: '`password` is required'
            }
          }
        },
        roles: {
          type: DataTypes.JSON,
          allowNull: true,
          validate: {
            notContains: {
              args: ['invalid_role', 'invalid_role_outher'],
              msg: 'There are  any invalid role'
            },
            customTagValidate (roles) {
              if (roles) {
                if (!Array.isArray(roles)) {
                  throw new Error('the field `roles` has malformed, only array is allowed')
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

module.exports = User
