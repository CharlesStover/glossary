import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import type { MutableRefObject, ReactElement, ReactNode } from 'react';
import { Fragment, useEffect, useRef } from 'react';
import type ItemProps from '../../types/item-props';
import mapWordToId from '../../utils/map-word-to-id';

interface PrimaryProps {
  readonly children: string;
  readonly search: string;
}

interface SecondaryProps {
  readonly children: string | undefined;
}

const FIRST = 0;
const NEXT = 1;
const OFFSET_MULTIPLIER = 2;

function Primary({ children, search }: PrimaryProps): ReactElement {
  if (search === '') {
    return <>{children}</>;
  }

  const split: string[] = children.split(search);
  const newChildren: ReactNode[] = [split[FIRST]];
  for (let i = 1; i < split.length; i++) {
    newChildren.push(
      <Fragment key={i * OFFSET_MULTIPLIER}>{split[i]}</Fragment>,
    );
    newChildren.push(
      <strong key={i * OFFSET_MULTIPLIER + NEXT}>{search}</strong>,
    );
  }

  return <>{newChildren}</>;
}

const BASE = 2;
const WORD = /\${{ ([\d\w ]+) }}/g;
const ZERO = 0;

const isEven = (value: number): boolean => value % BASE === ZERO;

function Secondary({ children }: SecondaryProps): null | ReactElement {
  if (typeof children === 'undefined') {
    return null;
  }

  const newChildren: ReactNode[] = [];
  const words: string[] = children.split(WORD);
  const wordsCount: number = words.length;
  for (let i = 0; i < wordsCount; i++) {
    const word: string | undefined = words[i];
    if (typeof word === 'undefined') {
      throw new Error('Expected word to be defined.');
    }
    if (isEven(i)) {
      if (word !== '') {
        newChildren.push(<Fragment key={i}>{word}</Fragment>);
      }
      continue;
    }
    newChildren.push(
      <Link href={`#${mapWordToId(word)}`} key={i}>
        {word}
      </Link>,
    );
  }
  return <>{newChildren}</>;
}

export default function GlossaryItem({
  definition,
  id,
  loading,
  onClick,
  search,
  selected,
  word,
}: ItemProps): ReactElement {
  const ref: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);

  useEffect((): void => {
    const refCurrent: HTMLSpanElement | null = ref.current;
    if (refCurrent === null || !selected) {
      return;
    }

    refCurrent.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
    });
  }, [selected]);

  return (
    <ListItemButton onClick={onClick} selected={selected}>
      <ListItemIcon>{loading && <CircularProgress size="1rem" />}</ListItemIcon>
      <ListItemText
        id={id}
        primary={<Primary search={search}>{word}</Primary>}
        secondary={<Secondary>{definition}</Secondary>}
      />
    </ListItemButton>
  );
}
