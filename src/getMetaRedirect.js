module.exports = function getMetaRedirect(toPath) {
  let url = toPath.trim();

  if (!toPath.includes('://')) {
    url = `/${url}/`.replace(/\/\/+/g, '/');
  }

  return `<meta http-equiv="refresh" content="0; URL='${url}'" />`;
};
