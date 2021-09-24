/* eslint-disable */
const { mkdirSync, rmSync, writeFileSync } = require('fs');
const { join } = require('path');

const ROOT_PATH = join(process.cwd(), '.glossary');
const TEMP_PATH = join(ROOT_PATH, '.temp');

const mapDirToJson = require('./map-dir-to-json.cjs');
const json = mapDirToJson(ROOT_PATH);

const mapDefinitionToWordsInDefinition = require('./map-definition-to-words-in-definition.cjs');

const mapWordToId = require('./map-word-to-id.cjs');
const idToWordMap = new Map();

class RelatedStringsMap {
  constructor() {
    this._map = new Map();
  }

  get(str) {
    if (this._map.has(str)) {
      return this._map.get(str);
    }
    const set = new Set([str]);
    this._map.set(str, set);
    return set;
  }

  has(str) {
    return this._map.has(str);
  }

  set(str, set) {
    this._map.set(str, set);
  }

  values() {
    return new Set(this._map.values());
  }
}

const relatedIdsMap = new RelatedStringsMap();

for (const [word, definition] of Object.entries(json)) {
  const id = mapWordToId(word);
  if (idToWordMap.has(id)) {
    throw new Error(
      `Duplicated ID "${id}" for "${word}" and "${idToWordMap.get(id)}"`,
    );
  }
  idToWordMap.set(id, word);

  const relatedIds = relatedIdsMap.get(id);

  const wordsInDefinition = mapDefinitionToWordsInDefinition(definition);
  for (const wordInDefinition of wordsInDefinition) {
    const idInDefinition = mapWordToId(wordInDefinition);
    relatedIds.add(idInDefinition);

    // If the word in the definition has no relations, add this one.
    if (!relatedIdsMap.has(idInDefinition)) {
      relatedIdsMap.set(idInDefinition, relatedIds);
      continue;
    }

    // If the word in the definition already has relations, merge them into this
    //   one, then replace the original with this one.
    for (const relatedId of relatedIdsMap.get(idInDefinition)) {
      relatedIds.add(relatedId);
      relatedIdsMap.set(relatedId, relatedIds);
    }

    // This shouldn't be necessary, because the related words for a word should
    //   contain itself.
    // relatedIdsMap.set(idInDefinition, relatedIds);
  }
}

const rmRf = require('./rm-rf.cjs');
rmRf(TEMP_PATH);
mkdirSync(TEMP_PATH);

const mapIdToWord = id => {
  if (!idToWordMap.has(id)) {
    throw new Error(`Could not find word for ID: ${id}`);
  }
  return idToWordMap.get(id);
};

let defaultExports = [];
let imports = [];
let index = 0;
for (const relatedIds of relatedIdsMap.values()) {
  index++;

  const batchJson = Object.create(null);
  const relatedWords = [...relatedIds].map(mapIdToWord);

  imports.push(
    `const _${index} = async (): Promise<{ default: Record<string, string> }> =>
  import('./${index}.json');`,
  );

  for (const word of relatedWords) {
    batchJson[word] = json[word];
    defaultExports.push(`"${word}": _${index},`);
  }

  writeFileSync(
    join(TEMP_PATH, `${index}.json`),
    JSON.stringify(batchJson, null, 2),
  );
}

writeFileSync(
  join(TEMP_PATH, 'glossary.ts'),
  `${imports.join('\n')}

export default {
  ${defaultExports.join('\n')}
};
`,
);

const writeIndexFile = require('./write-index-file.cjs');
writeIndexFile(TEMP_PATH);
