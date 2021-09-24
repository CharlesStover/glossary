import type { LinkProps } from '@mui/material/Link';
import type { Attributes, PropsWithChildren } from 'react';
import type { RedirectProps } from 'react-router-dom';
import type MetaComponent from './meta-component';

export default interface ItemProps {
  readonly id: string;
  readonly loading: boolean;
  readonly onClick: () => void;
  readonly redirect?: string | undefined;
  readonly search: string;
  readonly selected: boolean;
  readonly word: string;
  readonly definition?:
    | (
        | MetaComponent<LinkProps, Required<Attributes>>
        | MetaComponent<PropsWithChildren<unknown>, Required<Attributes>>
        | MetaComponent<RedirectProps, Required<Attributes>>
      )[]
    | undefined;
}
