
require('dotenv').config()
const Encrypter = require('../../src/helpers/encrypter')
const TokenHelper = require('../../src/helpers/token-helper')
const MissingParamError = require('../../src/helpers/missing-param-error')

const env = process.env
describe('Ensure works of Encrypter', () => {
  test('Should retrun MissinParam if no params is provided', async () => {
    const encrypter = new Encrypter()

    expect(async () => {
      await encrypter.compare()
    }).rejects.toThrow(new MissingParamError('value'))
    expect(async () => {
      await encrypter.compare(null, 'any_hash')
    }).rejects.toThrow(new MissingParamError('value'))
  })
  test('Should retrun MissinParam if no params is provided', async () => {
    const encrypter = new Encrypter()

    expect(encrypter.compare()).rejects.toThrow(new MissingParamError('value'))
    expect(encrypter.compare('any_value')).rejects.toThrow(new MissingParamError('hash'))
  })
  test('Should retrun MissinParam in Encrypter if no params is provided', async () => {
    const encrypter = new Encrypter()
    const promise = encrypter.compare()
    expect(promise).rejects.toThrow(new MissingParamError('value'))
  })
  test('Should retrun MissinParam in Encrypter if no hash is provided', async () => {
    const encrypter = new Encrypter()
    const promise = encrypter.compare('any_value', null)
    expect(promise).rejects.toThrow(new MissingParamError('hash'))
  })
})

describe('Ensure works of TokenValidator', () => {
  test('Should retrun MissinParam if no secret is provided', async () => {
    const token = new TokenHelper()
    const promise = token.generate('any_id')
    expect(promise).rejects.toThrow(new MissingParamError('secret'))
  })
  test('Should retrun MissinParam if no id is provided', async () => {
    const token = new TokenHelper()
    const promise = token.generate()
    expect(promise).rejects.toThrow(new MissingParamError('secret'))
  })
  test('Should retrun err if tokenVerify has err', async () => {
    const secret = 'any_secret'
    const token = new TokenHelper(secret)
    const id = 'any_value_id'
    const accessToken = await token.generate(id)

    const verify = await token.tokenVerify(accessToken, secret)
    expect(verify._id).toBe(id)
  })
  test('Should retrun MissingParamError if id no has provided', async () => {
    const secret = 'any_secret'
    const token = new TokenHelper(secret)
    expect(async () => {
      await token.generate()
    }).rejects.toThrow(new MissingParamError('id'))
  })
  test('Should retrun JsonWebTokenError if has any error', async () => {
    const secret = 'any_secret'
    const accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE0MzcwMTg1ODIsImV4cCI6MTQzNzAxODU5Mn0.3aR3vocmgRpG05rsI9MpR6z2T_BGtMQaPq2YR6QaroU'
    const tk = new TokenHelper(secret)
    const verify = await tk.tokenVerify(accessToken, secret)
    expect(verify.name).toBe('JsonWebTokenError')
  })
})

describe('TEST Database Connection', () => {
  let sec
  const dbType = 'development'
  beforeAll(async () => {
    sec = require('../../src/database')(dbType)
  })
  afterAll(async () => {
    sec.close()
  })
  test('Should error if connection failure', async () => {
    expect(sec.close()).resolves.toBe(undefined)
  })
  test('Should error if connection failure', async () => {
    const conn = sec.authenticate()
    expect(conn).rejects.toThrow(new Error('ConnectionManager.getConnection was called after the connection manager was closed!'))
  })
})
