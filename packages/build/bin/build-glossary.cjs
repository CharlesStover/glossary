/* eslint-disable */
const {
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} = require('fs');
const { join } = require('path');

const ROOT_PATH = join(process.cwd(), '.glossary');

const jsonFiles = [];
for (const name of readdirSync(ROOT_PATH)) {
  const filePath = join(ROOT_PATH, name);
  const stats = statSync(filePath);
  if (stats.isFile() && name.endsWith('.json')) {
    jsonFiles.push(filePath);
  }
}

const mainJson = Object.create(null);
for (const jsonFile of jsonFiles) {
  const jsonFileContent = readFileSync(jsonFile, 'utf8');
  const jsonFileContentJson = JSON.parse(jsonFileContent);
  for (const [word, definition] of Object.entries(jsonFileContentJson)) {
    if (Object.prototype.hasOwnProperty.call(mainJson, word)) {
      throw new Error(`Duplicate key: ${word}`);
    }
    mainJson[word] = definition;
  }
}

const mapDefinitionToWordsInDefinition = definition => {
  const words = definition.match(/\${{ [\d\w ]+ }}/g);
  if (words === null) {
    return [];
  }
  return words.map(word => word.slice(4, -3));
};

const map = new Map();
for (const [word, definition] of Object.entries(mainJson)) {
  let set;
  if (map.has(word)) {
    set = map.get(word);
  } else {
    set = new Set([word]);
    map.set(word, set);
  }

  const wordsInDefinition = mapDefinitionToWordsInDefinition(definition);
  for (const wordInDefinition of wordsInDefinition) {
    set.add(wordInDefinition);

    if (!map.has(wordInDefinition)) {
      map.set(wordInDefinition, set);
      continue;
    }

    for (const relatedWord of map.get(wordInDefinition)) {
      set.add(relatedWord);
      map.set(relatedWord, set);
    }
    map.set(wordInDefinition, set);
  }
}

const TEMP_PATH = join(ROOT_PATH, '.temp');
try {
  rmSync(TEMP_PATH, { recursive: true });
} catch (err) {}
mkdirSync(TEMP_PATH);

let defaultExports = [];
let imports = [];
let index = 0;
for (const set of new Set(map.values())) {
  index++;
  const batchJson = Object.create(null);
  for (const word of set) {
    batchJson[word] = mainJson[word];
  }

  writeFileSync(
    join(TEMP_PATH, `${index}.json`),
    JSON.stringify(batchJson, null, 2),
  );
  imports.push(
    `const _${index} = async (): Promise<{ default: Record<string, string> }> =>
  import('./${index}.json');`,
  );
  for (const word of set) {
    defaultExports.push(`"${word}": _${index},`);
  }
}

writeFileSync(
  join(TEMP_PATH, 'glossary.ts'),
  `${imports.join('\n')}

export default {
  ${defaultExports.join('\n')}
};
`,
);

writeFileSync(
  join(TEMP_PATH, 'index.tsx'),
  `import Glossary from '@glossary/react';
import { render } from 'react-dom';
import GLOSSARY from './glossary';

render(
  <Glossary>{GLOSSARY}</Glossary>,
  document.getElementById('glossary_root'),
);
`,
);
