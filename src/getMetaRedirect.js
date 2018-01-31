module.exports = function getMetaRedirect(toPath) {
  let url;

  if (toPath.includes('://')) {
    url = toPath.trim();
  } else {
    url = `/${toPath.trim()}/`;
    if (url.includes('//')) {
      url = url.replace(/\/\//g, '/');
    }
  }

  return `<meta http-equiv="refresh" content="0; URL='${url}'" />`;
};
