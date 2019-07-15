const readPkgUp = require('read-pkg-up')
const merge = require('@ianwalter/merge')
const writePkg = require('write-pkg')

module.exports = async (updates, options) => {
  // Read the package.json if it hasn't been passed.
  let path = options.cwd || '.'
  if (!options.package) {
    const readOpts = { cwd: options.cwd, normalize: false }
    const { package: readPackage, path: readPath } = await readPkgUp(readOpts)
    options.package = readPackage
    path = readPath
  }

  // Merge the updates with the existing package.json schema.
  merge(options.package, updates)

  // Write the updated schema back to the package.json.
  await writePkg(path, options.package)
}
