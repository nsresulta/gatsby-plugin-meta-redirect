const { exists, ensureDir, remove, readFile } = require('fs-extra');
const writeRedirects = require('../src/writeRedirectsFile');

describe('writeRedirectsFile', () => {
  const tempFolderPath = './tmp';

  const assertRedirectFile = async expectedPath => {
    expect(await exists(expectedPath)).toBe(true);
    expect(await readFile(expectedPath, 'utf-8')).toMatchSnapshot(true);
  };

  beforeEach(async () => {
    await remove(tempFolderPath);
    await ensureDir(tempFolderPath);
  });

  // cleanup
  afterAll(async () => {
    await remove(tempFolderPath);
  });

  it('writes redirects', async () => {
    await writeRedirects(
      [
        {
          fromPath: '/',
          toPath: '/hello'
        }
      ],
      tempFolderPath
    );

    await assertRedirectFile(`${tempFolderPath}/index.html`);
  });

  it('writes redirects', async () => {
    await writeRedirects(
      [
        {
          fromPath: '/hello',
          toPath: '/'
        }
      ],
      tempFolderPath
    );

    await assertRedirectFile(`${tempFolderPath}/hello/index.html`);
  });

  it('writes deep path redirects', async () => {
    await writeRedirects(
      [
        {
          fromPath: '/a/b/c/d',
          toPath: '/x/y/z'
        }
      ],
      tempFolderPath
    );

    await assertRedirectFile(`${tempFolderPath}/a/b/c/d/index.html`);
  });

  it('handles external redirects', async () => {
    await writeRedirects(
      [
        {
          fromPath: '/a/b',
          toPath: 'http://example.com/'
        }
      ],
      tempFolderPath
    );

    await assertRedirectFile(`${tempFolderPath}/a/b/index.html`);
  });
});
