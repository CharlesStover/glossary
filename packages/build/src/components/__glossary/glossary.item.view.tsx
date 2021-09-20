import CircularProgress from '@mui/material/CircularProgress';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import type { ReactElement, ReactNode } from 'react';
import { Fragment } from 'react';
import type ItemProps from './types/item-props';

interface PrimaryProps {
  readonly children: string;
  readonly search: string;
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

export default function GlossaryItem({
  definition,
  loading,
  onClick,
  search,
  selected,
  word,
}: ItemProps): ReactElement {
  return (
    <ListItemButton onClick={onClick} selected={selected}>
      <ListItemIcon>{loading && <CircularProgress size="1rem" />}</ListItemIcon>
      <a name={word}>
        <ListItemText
          primary={<Primary search={search}>{word}</Primary>}
          secondary={definition}
        />
      </a>
    </ListItemButton>
  );
}
