/* eslint-disable */

// Keep this file in sync with `@glossary/react`'s
//   `src/utils/map-word-to-id.ts`.

module.exports = function mapWordToId(word) {
  return word.toLowerCase().replace(/[^\d\w]+/g, '-');
};
