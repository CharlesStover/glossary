/* eslint-disable */
const mapDirToJsonFiles = require('./map-dir-to-json-files.cjs');
const mapJsonFilesToJson = require('./map-json-files-to-json.cjs');

module.exports = function mapDirToJson(dir) {
  const jsonFiles = mapDirToJsonFiles(dir);
  return mapJsonFilesToJson(jsonFiles);
};
