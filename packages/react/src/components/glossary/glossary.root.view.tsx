import type { ReactElement, ReactNode } from 'react';

interface Props {
  readonly children: ReactNode;
}

export default function Glossary({ children }: Props): ReactElement {
  return <>{children}</>;
}
