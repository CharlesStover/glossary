import Glossary from '@glossary/react';
import { render } from 'react-dom';
import GLOSSARY from './glossary';

render(
  <Glossary>{GLOSSARY}</Glossary>,
  document.getElementById('glossary_root'),
);
