/* eslint-disable */
const { readdirSync, statSync } = require('fs');
const { join } = require('path');

module.exports = function mapDirToJsonFiles(dir) {
  const jsonFiles = [];
  for (const name of readdirSync(dir)) {
    const filePath = join(dir, name);
    const stats = statSync(filePath);
    if (stats.isFile() && name.endsWith('.json')) {
      jsonFiles.push(filePath);
    }
  }
  return jsonFiles;
};
