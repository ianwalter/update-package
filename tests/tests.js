const { promises: fs } = require('fs')
const path = require('path')
const { test } = require('@ianwalter/bff')
const updatePackage = require('..')

const cwd = 'tests/tmp'

test('updating package.json', async ({ expect }) => {
  const release = { logLevel: 'debug', registries: ['foo', 'bar'] }
  await updatePackage({ release }, { cwd })
  const packagePath = path.resolve('tests/tmp/package.json')
  expect(await fs.readFile(packagePath, 'utf8')).toMatchSnapshot()
})

test('updating package.json with existing data', async ({ expect }) => {
  const $package = { bff: { logLevel: 'debug' }, num: 8 }
  const bff = { logLevel: 'info', plugins: ['config.js'] }
  await updatePackage({ bff }, { cwd, package: $package })
  const packagePath = path.resolve('tests/tmp/package.json')
  expect(await fs.readFile(packagePath, 'utf8')).toMatchSnapshot()
})
