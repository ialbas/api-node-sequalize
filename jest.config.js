module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['**/src/**/*.js', '!src/app.js', '!src/routes/**.js', '!src/database/migrations/**.js', '!src/database/migrations/**.js', '!src/database/models/index.js'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config']
}
