import type { LinkProps } from '@mui/material/Link';
import Link from '@mui/material/Link';
import type { Attributes, PropsWithChildren } from 'react';
import { Fragment } from 'react';
import type MetaComponent from '../types/meta-component';
import isEven from '../utils/is-even';
import mapWordToId from '../utils/map-word-to-id';

const WORD = /\${{ ([\d\w\- ]+) }}/g;

export default function mapDefinitionToMetaComponents(
  definition: string,
): (
  | MetaComponent<PropsWithChildren<unknown>, Required<Attributes>>
  | MetaComponent<LinkProps, Required<Attributes>>
)[] {
  const metaComponents: (
    | MetaComponent<PropsWithChildren<unknown>, Required<Attributes>>
    | MetaComponent<LinkProps, Required<Attributes>>
  )[] = [];
  const words: string[] = definition.split(WORD);
  const wordsCount: number = words.length;

  for (let i = 0; i < wordsCount; i++) {
    const word: string | undefined = words[i];
    if (typeof word === 'undefined') {
      throw new Error(
        `Unexpected error: Missing index ${i} in array ${words.join(', ')}`,
      );
    }

    if (isEven(i)) {
      if (word === '') {
        continue;
      }

      metaComponents.push({
        Component: Fragment,
        props: {
          children: word,
          key: i,
        },
      });
      continue;
    }

    metaComponents.push({
      Component: Link,
      props: {
        children: word,
        href: `#${mapWordToId(word)}`,
        key: i,
      },
    });
  }

  return metaComponents;
}
