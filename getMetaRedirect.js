module.exports = function getMetaRedirect(toPath, disableTrailingSlash) {
  let url = toPath.trim();

  const hasProtocol = url.includes('://');
  if (!hasProtocol) {
    const hasLeadingSlash = url.startsWith('/');
    if (!hasLeadingSlash) {
      url = `/${url}`;
    }

    const resemblesFile = url.includes('.') || disableTrailingSlash;
    if (!resemblesFile) {
      url = `${url}/`.replace(/\/\/+/g, '/');
    }
  }

  return `<meta http-equiv="refresh" content="0; URL='${url}'" />`;
};
