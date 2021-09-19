const path = require('path');

const glossaryBuildIndex = require.resolve('@glossary/build');
const glossaryBuildDir = path.dirname(glossaryBuildIndex);

module.exports = {
  paths: paths => ({
    ...paths,
    appHtml: path.resolve(glossaryBuildDir, 'public', 'index.html'),
    appIndexJs: path.resolve(glossaryBuildDir, 'src', 'index.tsx'),
    appPublic: path.resolve(glossaryBuildDir, 'public'),
    appSrc: path.resolve(glossaryBuildDir, 'src'),
    appTsConfig: path.resolve(glossaryBuildDir, 'tsconfig.json'),
    yarnLockFile: path.resolve('..', '..', 'yarn.lock'),
    appTypeDeclarations: path.resolve(
      glossaryBuildDir,
      'src',
      'react-app-env.d.ts',
    ),
  }),
};
