const path = require('path');
const { exists, writeFile, ensureDir } = require('fs-extra');

const getMetaRedirect = require('./getMetaRedirect');

async function writeRedirectsFile(redirects, folder) {
  if (!redirects.length) return;

  for (const redirect of redirects) {
    const { fromPath, toPath } = redirect;

    const FILE_PATH = path.join(folder, fromPath, 'index.html');

    const fileExists = await exists(FILE_PATH);
    if (!fileExists) {
      try {
        await ensureDir(path.dirname(FILE_PATH));
      } catch (err) {
        // ignore if the directory already exists;
      }

      const data = getMetaRedirect(toPath);
      await writeFile(FILE_PATH, data);
    }
  }
}

exports.onPostBuild = ({ store }) => {
  const { redirects, program } = store.getState();
  const folder = path.join(program.directory, 'public');
  return writeRedirectsFile(redirects, folder);
};
