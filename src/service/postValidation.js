const PostModel = require('../database/models/Post')
const validateBody = async (body) => {
  const validate = { isValid: true, errors: null }
  try {
    const result = PostModel.build(body)
    await result.validate()
    return validate
  } catch (e) {
    const msg = e.message.split('\n')
    validate.isValid = false
    validate.errors = msg[0]
    return validate
  }
}

module.exports = validateBody
