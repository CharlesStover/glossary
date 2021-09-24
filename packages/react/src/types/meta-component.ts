import type { Attributes, ComponentType } from 'react';

export default interface MetaComponent<T, P extends Attributes = Attributes> {
  readonly Component: ComponentType<T>;
  readonly props: T & P;
}
