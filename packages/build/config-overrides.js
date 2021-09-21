/* eslint-disable */
const path = require('path');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

const glossaryBuildIndex = require.resolve('@glossary/build');
const glossaryBuildDir = path.dirname(glossaryBuildIndex);

const filterByModuleScopePlugin = plugin => plugin instanceof ModuleScopePlugin;
const filterNotByModuleScopePlugin = plugin =>
  !filterByModuleScopePlugin(plugin);

module.exports = {
  paths: paths => ({
    ...paths,
    appHtml: path.resolve(glossaryBuildDir, 'public', 'index.html'),
    appIndexJs: path.resolve('.glossary', '.temp', 'index.tsx'),
    appPublic: path.resolve(glossaryBuildDir, 'public'),
    appSrc: path.resolve('.glossary', '.temp'),
    appTsConfig: path.resolve(glossaryBuildDir, 'tsconfig.json'),
    yarnLockFile: path.resolve('..', '..', 'yarn.lock'),
    appTypeDeclarations: path.resolve(
      glossaryBuildDir,
      'src',
      'react-app-env.d.ts',
    ),
  }),

  // Remove `ModuleScopePlugin` so that we can import `@glossary/react` from
  //   Yarn PNP.
  resolve: resolve => ({
    ...resolve,
    plugins: resolve.plugins.filter(filterNotByModuleScopePlugin),
  }),
};
