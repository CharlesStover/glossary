import type { Theme } from '@mui/material/styles';
import type {
  Attributes,
  ChangeEvent,
  ComponentType,
  MutableRefObject,
} from 'react';
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type AsyncState from '../../types/async-state';
import type DefinitionFileGetter from '../../types/definition-file-getter';
import type ItemProps from '../../types/item-props';
import getDefaultAsyncState from '../../utils/get-default-async-state';
import mapWordToId from '../../utils/map-word-to-id';
import useItemsProps from './glossary.main.hook.items-props';
import useTheme from './glossary.main.hook.theme';

interface State {
  readonly asyncEffectRef: MutableRefObject<Promise<unknown> | undefined>;
  readonly handleThemeToggle: () => void;
  readonly itemsProps: readonly (Required<Attributes> & ItemProps)[];
  readonly search: string;
  readonly ThemeIcon: ComponentType<unknown>;
  readonly theme: Theme;
  readonly handleSearchChange: (
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

const FIRST_CHARACTER = 1;

export default function useGlossary(
  glossaryFileRecord: Readonly<Record<string, DefinitionFileGetter>>,
): State {
  // Contexts
  const { hash } = useLocation();

  // States
  const asyncEffectRef: MutableRefObject<Promise<unknown> | undefined> =
    useRef();
  const [asyncStateMap, setAsyncStateMap] = useState(getDefaultAsyncState);
  const [search, setSearch] = useState('');
  const { handleThemeToggle, ThemeIcon, theme } = useTheme();

  const selectedWord: string | undefined = useMemo((): string | undefined => {
    if (!hash.startsWith('#') || hash.length === FIRST_CHARACTER) {
      return;
    }

    const selectedId: string = hash.substring(FIRST_CHARACTER);
    for (const word of Object.keys(glossaryFileRecord)) {
      if (mapWordToId(word) !== selectedId) {
        continue;
      }
      return word;
    }

    return;
  }, [glossaryFileRecord, hash]);

  const loadDefinitionFile = useMemo(():
    | (() => Promise<unknown>)
    | undefined => {
    if (typeof selectedWord === 'undefined') {
      return;
    }

    const getDefinitionFile = glossaryFileRecord[selectedWord];
    if (typeof getDefinitionFile === 'undefined') {
      return;
    }

    // If this definition has already loaded, failed to load, or is loading,
    //   do nothing.
    // If this definition has not yet loaded, continue.
    const asyncState: AsyncState | undefined =
      asyncStateMap.get(getDefinitionFile);
    if (
      typeof asyncState !== 'undefined' &&
      (typeof asyncState.data !== 'undefined' ||
        typeof asyncState.error !== 'undefined' ||
        asyncState.loading)
    ) {
      return;
    }

    return async (): Promise<void> => {
      setAsyncStateMap(
        (
          oldAsyncStateMap: Readonly<Map<DefinitionFileGetter, AsyncState>>,
        ): Map<DefinitionFileGetter, AsyncState> => {
          const newAsyncStateMap: Map<DefinitionFileGetter, AsyncState> =
            new Map(oldAsyncStateMap);
          newAsyncStateMap.set(getDefinitionFile, {
            loading: true,
          });
          return newAsyncStateMap;
        },
      );
      const definitionFile: { default: Record<string, string> } =
        await getDefinitionFile();
      setAsyncStateMap(
        (
          oldAsyncStateMap: Readonly<Map<DefinitionFileGetter, AsyncState>>,
        ): Map<DefinitionFileGetter, AsyncState> => {
          const newAsyncStateMap: Map<DefinitionFileGetter, AsyncState> =
            new Map(oldAsyncStateMap);
          newAsyncStateMap.set(getDefinitionFile, {
            data: definitionFile.default,
            loading: false,
          });
          return newAsyncStateMap;
        },
      );
    };
  }, [asyncStateMap, glossaryFileRecord, selectedWord]);

  // We use a layout effect so that the loading state updates the view
  //   synchronously.
  useLayoutEffect((): void => {
    if (typeof loadDefinitionFile === 'undefined') {
      return;
    }
    asyncEffectRef.current = loadDefinitionFile();
  }, [loadDefinitionFile]);

  return {
    asyncEffectRef,
    handleThemeToggle,
    search,
    ThemeIcon,
    theme,

    handleSearchChange: useCallback(
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearch(e.target.value);
      },
      [],
    ),

    itemsProps: useItemsProps({
      asyncStateMap,
      glossaryFileRecord,
      search,
      selectedWord,
    }),
  };
}
