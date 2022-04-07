module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['**/src/**/*.js', '!src/*.js', '!src/routes/**.js', '!src/middlewares/**.js', '!src/database/migrations/**.js', '!src/database/migrations/**.js', '!src/database/models/index.js', '!src/database/seeders/**.js'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config']
}
