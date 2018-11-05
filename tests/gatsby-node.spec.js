const { exists, remove, readFile } = require('fs-extra');
const { onPostBuild } = require('../gatsby-node');

describe('onPostBuild', () => {
  const tempFolderPath = './public';

  const assertRedirectFile = async (redirects, expectedPath) => {
    await onPostBuild({
      store: {
        getState: () => ({
          redirects,
          program: {
            directory: './'
          }
        })
      }
    });

    expect(await exists(expectedPath)).toBe(true);
    expect(await readFile(expectedPath, 'utf-8')).toMatchSnapshot();
  };

  beforeEach(async () => {
    await remove(tempFolderPath);
  });

  // cleanup
  afterAll(async () => {
    await remove(tempFolderPath);
  });

  it('writes redirects from root', async () => {
    await assertRedirectFile(
      [
        {
          fromPath: '/',
          toPath: '/hello'
        }
      ],
      `${tempFolderPath}/index.html`
    );
  });

  it('writes redirects to root', async () => {
    await assertRedirectFile(
      [
        {
          fromPath: '/hello',
          toPath: '/'
        }
      ],
      `${tempFolderPath}/hello/index.html`
    );
  });

  it('writes deep path redirects', async () => {
    await assertRedirectFile(
      [
        {
          fromPath: '/a/b/c/d',
          toPath: '/x/y/z'
        }
      ],
      `${tempFolderPath}/a/b/c/d/index.html`
    );
  });

  it('handles external redirects', async () => {
    await assertRedirectFile(
      [
        {
          fromPath: '/a/b',
          toPath: 'http://example.com/'
        }
      ],
      `${tempFolderPath}/a/b/index.html`
    );
  });
});
