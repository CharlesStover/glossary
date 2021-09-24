/* eslint-disable */
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

const contents = readFileSync(join(__dirname, 'src-index-file.tsx'));

module.exports = function writeIndexFile(dir) {
  const indexPath = join(dir, 'index.tsx');
  writeFileSync(indexPath, contents);
};
