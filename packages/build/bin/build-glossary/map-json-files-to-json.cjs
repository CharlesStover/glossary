/* eslint-disable */
const { readFileSync } = require('fs');

module.exports = function mapJsonFilesToJson(files) {
  const json = Object.create(null);
  for (const file of files) {
    const content = readFileSync(file, 'utf8');
    const parsedContent = JSON.parse(content);
    for (const [word, definition] of Object.entries(parsedContent)) {
      if (Object.prototype.hasOwnProperty.call(json, word)) {
        throw new Error(`Duplicate key: ${word}`);
      }
      json[word] = definition;
    }
  }
  return json;
};
