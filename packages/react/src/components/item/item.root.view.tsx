import CircularProgress from '@mui/material/CircularProgress';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import type { MutableRefObject, ReactElement } from 'react';
import { useEffect, useRef } from 'react';
import type ItemProps from '../../types/item-props';
import Primary from './item.primary.view';
import Secondary from './item.secondary.view';

export default function Item({
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
    const refCurrent: HTMLDivElement | null = ref.current;
    if (refCurrent === null || !selected) {
      return;
    }

    refCurrent.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });
  }, [selected]);

  return (
    <ListItemButton onClick={onClick} ref={ref} selected={selected}>
      <ListItemIcon>{loading && <CircularProgress size="1rem" />}</ListItemIcon>
      <ListItemText
        id={id}
        primary={<Primary search={search}>{word}</Primary>}
        secondary={<Secondary loading={loading}>{definition}</Secondary>}
      />
    </ListItemButton>
  );
}
