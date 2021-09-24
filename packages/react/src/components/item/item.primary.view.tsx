import type { ReactElement } from 'react';
import validateString from '../../utils/validate-string';
import PrimaryHighlight from './item.primary-highlight.view';
import styles from './item.primary.module.scss';

interface Props {
  readonly children: string;
  readonly redirect?: string | undefined;
  readonly search: string;
}

const redirectClassName: string = validateString(styles.redirect);

export default function Primary({
  children,
  redirect,
  search,
}: Props): ReactElement {
  if (typeof redirect === 'undefined') {
    return <PrimaryHighlight search={search}>{children}</PrimaryHighlight>;
  }

  return (
    <>
      <span className={redirectClassName}>
        <PrimaryHighlight search={search}>{children}</PrimaryHighlight>
      </span>{' '}
      - See: {redirect}
    </>
  );
}
