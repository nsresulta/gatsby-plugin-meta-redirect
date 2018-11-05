const getMetaRedirect = require('../getMetaRedirect');

describe('getMetaRedirect', () => {
  it('wraps path in forward slashes', () => {
    expect(getMetaRedirect('toPath')).toMatchSnapshot();
  });

  it('allows existing leading and trailing forward slashes', () => {
    expect(getMetaRedirect('/toPath/')).toMatchSnapshot();
  });

  it('trims leading and trailing whitespace', () => {
    expect(getMetaRedirect(' toPath ')).toMatchSnapshot();
  });

  it('handles deep paths', () => {
    expect(getMetaRedirect('a/b/c/d')).toMatchSnapshot();
  });

  it('handles offset wrapping forward slashes', () => {
    expect(getMetaRedirect('a/b/c/')).toMatchSnapshot();
  });

  it('replaces duplicate slashes with single slash', () => {
    expect(getMetaRedirect('topath//a')).toMatchSnapshot();
  });

  it('leaves full urls untouched', () => {
    expect(getMetaRedirect('http://example.com')).toMatchSnapshot();
    expect(getMetaRedirect('http://example.com/')).toMatchSnapshot();
    expect(getMetaRedirect('http://example.com/a/b/c')).toMatchSnapshot();
  });

  it('handles redirecting to root', () => {
    expect(getMetaRedirect('/')).toMatchSnapshot();
  });

  it('handles redirecting to a file', () => {
    expect(getMetaRedirect('/test.txt')).toMatchSnapshot();
  });

  it('handles redirecting to a file in a folder', () => {
    expect(getMetaRedirect('a/b/test.txt')).toMatchSnapshot();
  });
});
