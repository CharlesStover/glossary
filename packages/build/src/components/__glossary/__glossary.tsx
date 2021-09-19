import type { ReactElement } from 'react';
import { useCallback, useLayoutEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

/*
This file is a placeholder for `@glossary/react` during development.
*/

interface Props {
  readonly children: Readonly<
    Record<string, () => Promise<{ default: Record<string, string> }>>
  >;
}

const getDefaultDefinitions = (): Map<
  () => Promise<{ default: Record<string, string> }>,
  Record<string, string>
> => new Map();

const FIRST_CHARACTER = 1;
const mapHashToWord = (hash: string): string | undefined => {
  if (!hash.startsWith('#') || hash.length === FIRST_CHARACTER) {
    return;
  }
  return hash.substring(FIRST_CHARACTER);
};

export default function Glossary({ children }: Props): ReactElement {
  // Contexts
  const { hash } = useLocation();

  // States
  const [definitions, setDefinitions] = useState(getDefaultDefinitions);
  const [loading, setLoading] = useState(false);

  const loadDefinitionFile = useCallback(
    async (
      getDefinitionFile: () => Promise<{ default: Record<string, string> }>,
    ): Promise<void> => {
      setLoading(true);
      const newDefinitionFile: { default: Record<string, string> } =
        await getDefinitionFile();
      setDefinitions(
        (
          oldDefinitions: Readonly<
            Map<
              () => Promise<{
                default: Record<string, string>;
              }>,
              Record<string, string>
            >
          >,
        ): Map<
          () => Promise<{
            default: Record<string, string>;
          }>,
          Record<string, string>
        > => {
          const newDefinitions = new Map(oldDefinitions);
          newDefinitions.set(getDefinitionFile, newDefinitionFile.default);
          return newDefinitions;
        },
      );
      setLoading(false);
    },
    [],
  );

  useLayoutEffect((): void => {
    const word: string | undefined = mapHashToWord(hash);
    if (typeof word === 'undefined') {
      return;
    }

    const getDefinitionFile = children[word];
    if (typeof getDefinitionFile === 'undefined') {
      return;
    }

    void loadDefinitionFile(getDefinitionFile);
  }, [children, hash, loadDefinitionFile]);

  const mapDefinitionFileGetterToClickHandler = (
    getDefinitionFile: () => Promise<{ default: Record<string, string> }>,
  ): (() => Promise<void>) | undefined => {
    if (loading) {
      return;
    }

    const definitionFile: Record<string, string> | undefined =
      definitions.get(getDefinitionFile);
    if (typeof definitionFile !== 'undefined') {
      return;
    }

    return async (): Promise<void> => {
      await loadDefinitionFile(getDefinitionFile);
    };
  };

  const mapRecordEntryToElement = ([key, getDefinitionFile]: readonly [
    string,
    () => Promise<{ default: Record<string, string> }>,
  ]): ReactElement => {
    const definitionFile: Record<string, string> | undefined =
      definitions.get(getDefinitionFile);

    const getDefinition = (): string | undefined => {
      if (typeof definitionFile === 'undefined') {
        return;
      }
      const definition: string | undefined = definitionFile[key];
      if (typeof definition === 'undefined') {
        throw new Error(`Expected to find ${key} in definition file.`);
      }
      return definition;
    };

    const definition: string | undefined = getDefinition();
    const handleClick =
      mapDefinitionFileGetterToClickHandler(getDefinitionFile);

    const definitionStr = ((): string | undefined => {
      if (`#${key}` !== hash) {
        return;
      }
      if (loading) {
        return 'Loading...';
      }
      if (typeof definition === 'undefined') {
        return;
      }
      return `: ${definition}`;
    })();
    return (
      <li key={key}>
        <Link onClick={handleClick} to={`#${key}`}>
          {key}
        </Link>
        {definitionStr}
      </li>
    );
  };

  return (
    <>
      <h1>Glossary</h1>
      <ul>{Object.entries(children).map(mapRecordEntryToElement)}</ul>
    </>
  );
}
