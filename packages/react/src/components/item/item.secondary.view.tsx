import type { ReactElement } from 'react';
import type MetaComponent from '../../types/meta-component';
import mapMetaComponentToElement from '../../utils/map-meta-component-to-element';

interface Props {
  readonly children: readonly unknown[] | undefined;
  readonly loading: boolean;
}

export default function Secondary({
  children,
  loading,
}: Props): ReactElement | null {
  if (loading) {
    return <>Loading...</>;
  }

  if (typeof children === 'undefined') {
    return null;
  }

  return (
    // `Secondary` won't mount when the `children` prop is typed as
    //   `MetaComponent<unknown>[]`, so we type it as `unknown[]` in `Props` and
    //   make it more accurate here.
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    <>{(children as MetaComponent<unknown>[]).map(mapMetaComponentToElement)}</>
  );
}
