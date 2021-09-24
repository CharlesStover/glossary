import type { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import type DefinitionFileGetter from '../../types/definition-file-getter';
import Main from './glossary.main.view';
import './glossary.root.module.scss';

interface Props {
  readonly children: Readonly<Record<string, DefinitionFileGetter>>;
}

export default function Glossary({ children }: Props): ReactElement {
  return (
    <BrowserRouter>
      <Main>{children}</Main>
    </BrowserRouter>
  );
}
