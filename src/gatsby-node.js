const writeRedirectsFile = require('./writeRedirectsFile');

exports.onPostBuild = ({ store }) => {
  const { redirects, program } = store.getState();
  const folder = path.join(program.directory, 'public');
  return writeRedirectsFile(redirects, folder);
};
