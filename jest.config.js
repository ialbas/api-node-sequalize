module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['**/src/**/*.js', '!src/app.js', '!src/routes/**.js'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config']
}
