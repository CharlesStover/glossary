import type { LinkProps } from '@mui/material/Link';
import type { Attributes, PropsWithChildren } from 'react';
import { useMemo } from 'react';
import type { RedirectProps } from 'react-router-dom';
import { Redirect, useHistory } from 'react-router-dom';
import type AsyncState from '../../types/async-state';
import type DefinitionFileGetter from '../../types/definition-file-getter';
import type ItemProps from '../../types/item-props';
import type MetaComponent from '../../types/meta-component';
import mapAsyncStateToLoading from '../../utils/map-async-state-to-loading';
import mapDefinitionToMetaComponents from '../../utils/map-definition-to-meta-components';
import mapRecordToSortedKeys from '../../utils/map-record-to-sorted-keys';
import mapWordToId from '../../utils/map-word-to-id';

interface Props {
  readonly asyncStateMap: Readonly<Map<DefinitionFileGetter, AsyncState>>;
  readonly glossaryFileRecord: Readonly<Record<string, DefinitionFileGetter>>;
  readonly search: string;
  readonly selectedWord?: string | undefined;
}

const DEFINITION_REDIRECT = /^\${{ ([\d\w ]+) }}$/;
const FIRST_MATCH = 1;

const mapDefinitionToRedirectWord = (
  definition: string,
): string | undefined => {
  const redirect: RegExpMatchArray | null =
    DEFINITION_REDIRECT.exec(definition);
  if (redirect === null) {
    return;
  }
  const redirectWord: string | undefined = redirect[FIRST_MATCH];
  return redirectWord;
};

export default function useItemsProps({
  asyncStateMap,
  glossaryFileRecord,
  search,
  selectedWord,
}: Props): readonly (Required<Attributes> & ItemProps)[] {
  const history = useHistory();

  return useMemo((): readonly (Required<Attributes> & ItemProps)[] => {
    const filterBySearchOrSelected = (word: string): boolean =>
      search === '' ||
      word === selectedWord ||
      word.toLowerCase().includes(search.toLowerCase());

    const words: readonly string[] = mapRecordToSortedKeys(
      glossaryFileRecord,
    ).filter(filterBySearchOrSelected);

    const mapWordToItemProps = (
      word: string,
    ): Required<Attributes> & ItemProps => {
      const getDefinitionFile: DefinitionFileGetter | undefined =
        glossaryFileRecord[word];
      if (typeof getDefinitionFile === 'undefined') {
        throw new Error(`Expected definition file getter for word "${word}".`);
      }

      const asyncState: AsyncState | undefined =
        asyncStateMap.get(getDefinitionFile);

      const getDefinition = ():
        | (
            | MetaComponent<LinkProps, Required<Attributes>>
            | MetaComponent<PropsWithChildren<unknown>, Required<Attributes>>
            | MetaComponent<RedirectProps, Required<Attributes>>
          )[]
        | undefined => {
        if (typeof asyncState === 'undefined') {
          return;
        }
        if (typeof asyncState.data === 'undefined') {
          return;
        }

        const definition: string | undefined = asyncState.data[word];
        if (typeof definition === 'undefined') {
          throw new Error(`Expected word to be defined: ${word}`);
        }

        // A definitions that is only one other words should redirect to that
        //   word.
        const redirectWord: string | undefined =
          mapDefinitionToRedirectWord(definition);
        if (typeof redirectWord === 'string') {
          const redirectId: string = mapWordToId(redirectWord);
          return [
            {
              Component: Redirect,
              props: {
                key: 'redirect',
                to: `#${redirectId}`,
              },
            },
          ];
        }

        return mapDefinitionToMetaComponents(definition);
      };

      const getRedirect = (): string | undefined => {
        if (
          typeof asyncState === 'undefined' ||
          typeof asyncState.data === 'undefined'
        ) {
          return;
        }
        const definition: string | undefined = asyncState.data[word];
        if (typeof definition === 'undefined') {
          return;
        }
        return mapDefinitionToRedirectWord(definition);
      };

      const id: string = mapWordToId(word);
      return {
        definition: getDefinition(),
        id,
        key: id,
        loading: mapAsyncStateToLoading(asyncState),
        redirect: getRedirect(),
        search,
        selected: word === selectedWord,
        word,
        onClick: (): void => {
          history.push(`#${id}`);
        },
      };
    };

    return words.map(mapWordToItemProps);
  }, [asyncStateMap, glossaryFileRecord, history, search, selectedWord]);
}
