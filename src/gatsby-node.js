const path = require('path')
const fs = require('fs')
const { promisify } = require('util')

const stat = promisify(fs.stat)
const writeFile = promisify(fs.writeFile)

const { mkdirp } = require('fs-extra')

const getMetaRedirect = require('./getMetaRedirect')

async function writeRedirectsFile(redirects, folder, pathPrefix) {
  if (!redirects.length) return

  for (const redirect of redirects) {
    const { fromPath, toPath } = redirect

    const FILE_PATH = path.join(folder, fromPath.replace(pathPrefix, ''), 'index.html')

    const fileExists = await stat(FILE_PATH)
      .then(stat => stat.isFile())
      .catch(() => false)

    if (!fileExists) {
      const dirExists = await stat(path.dirname(FILE_PATH))
        .then(stat => stat.isDirectory())
        .catch(() => false)

      if (!dirExists) await mkdirp(path.dirname(FILE_PATH))

      const data = getMetaRedirect(toPath)
      await writeFile(FILE_PATH, Buffer.from(data))
    }
  }
}

exports.onPostBuild = ({ store }) => {
  const { redirects, program, config } = store.getState()

  let pathPrefix = ''
  if (program.prefixPaths) {
    pathPrefix = config.pathPrefix
  }

  const folder = path.join(program.directory, 'public')
  return writeRedirectsFile(redirects, folder, pathPrefix)
}
