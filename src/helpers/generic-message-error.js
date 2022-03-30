module.exports = class GenericMessageError extends Error {
  constructor (paramName) {
    super(paramName)
    this.name = paramName
  }
}
