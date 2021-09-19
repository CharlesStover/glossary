// import Glossary from '@glossary/react';
import Glossary from '../__glossary/__glossary';
import type { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import GLOSSARY from '../../glossary';

export default function App(): ReactElement {
  return (
    <BrowserRouter>
      <Glossary>{GLOSSARY}</Glossary>
    </BrowserRouter>
  );
}
