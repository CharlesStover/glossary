import type { Attributes, ReactElement } from 'react';
import type MetaComponent from '../types/meta-component';

export default function mapMetaComponentToElement<T, P extends Attributes>({
  Component,
  props,
}: MetaComponent<T, Readonly<P>>): ReactElement {
  return <Component {...props} />;
}
