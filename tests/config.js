const execa = require('execa')

module.exports = {
  async beforeEach () {
    await execa('cp', ['tests/fixtures/package.json', 'tests/tmp'])
  }
}
