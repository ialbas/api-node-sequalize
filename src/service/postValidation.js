const PostModel = require('../database/models/Post')
const validateBody = async (body) => {
  try {
    const result = PostModel.build(body)
    await result.validate()
    return { isValid: true, errors: null }
  } catch (e) {
    return { isValid: false, errors: e.message.replace('\n', ' ') }
  }
}

module.exports = validateBody
