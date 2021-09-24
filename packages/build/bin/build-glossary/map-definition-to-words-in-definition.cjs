/* eslint-disable */

module.exports = function mapDefinitionToWordsInDefinition(definition) {
  const words = definition.match(/\${{ [\d\w\- ]+ }}/g);
  if (words === null) {
    return [];
  }
  return words.map(word => word.slice('${{ '.length, -' }}'.length));
};
