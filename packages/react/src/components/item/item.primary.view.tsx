import type { ReactElement, ReactNode } from 'react';
import { Fragment } from 'react';

interface PrimaryProps {
  readonly children: string;
  readonly search: string;
}

const FIRST = 0;
const NEXT = 1;
const OFFSET_MULTIPLIER = 2;

export default function Primary({
  children,
  search,
}: PrimaryProps): ReactElement {
  if (search === '') {
    return <>{children}</>;
  }

  const split: string[] = children.split(search);
  const newChildren: ReactNode[] = [split[FIRST]];
  for (let i = 1; i < split.length; i++) {
    newChildren.push(
      <strong key={i * OFFSET_MULTIPLIER + NEXT}>{search}</strong>,
    );
    newChildren.push(
      <Fragment key={i * OFFSET_MULTIPLIER}>{split[i]}</Fragment>,
    );
  }

  return <>{newChildren}</>;
}
